import { randomUUID } from "node:crypto";
import { Router, type Request, type Response } from "express";
import { z } from "zod";
import type { AuditSink, RecordedAuditEvent } from "../audit.js";
import type { SalesforceClient } from "../salesforce/types.js";
import type { SlackClient } from "../slack/types.js";
import type { GongClient } from "../gong/types.js";
import type { PlanhatClient } from "../planhat/types.js";
import type { Roster } from "../roster.js";
import { runPipelinePulse } from "../routines/pipelinePulse.js";
import { buildOverview } from "../routines/overview.js";
import { recentActivity, recentActivityInput } from "../tools/recentActivity.js";
import { coverageCheck, coverageCheckInput } from "../tools/coverageCheck.js";
import {
  buildPortfolioSummary,
  getPortfolioAccount,
  buildAnalyticsFit,
} from "../routines/portfolio.js";
import { buildL10Briefing } from "../routines/l10.js";
import { L10Store } from "../l10/store.js";
import type { L10Issue, L10Todo } from "../l10/types.js";
import { findCompanyForAccount } from "../fictions/match.js";
import { DASHBOARD_ROUTES } from "./pages/index.js";

// Reuses each MCP tool's own zod input shape for query-string validation, so
// the dashboard can never silently drift from what Claude itself enforces.
const recentActivitySchema = z.object(recentActivityInput);
const coverageCheckSchema = z.object(coverageCheckInput);
const overviewFiltersSchema = z.object({
  salesRep: z.string().min(1).max(120).optional(),
  csm: z.string().min(1).max(120).optional(),
  implementationManager: z.string().min(1).max(120).optional(),
});

const l10MetricStatusSchema = z.object({ status: z.enum(["ok", "off"]) });
const l10AddIssueSchema = z.object({
  title: z.string().min(1).max(300),
  area: z.string().max(120).optional(),
  tier: z.enum(["P1", "P2", "P3"]).optional(),
  accountName: z.string().max(200).optional(),
  raisedBy: z.string().max(120).optional(),
});
const l10PatchIssueSchema = z.object({
  root: z.string().max(2000).optional(),
  solutions: z.string().max(2000).optional(),
  tier: z.enum(["P1", "P2", "P3"]).optional(),
  struck: z.boolean().optional(),
});
const l10SolveIssueSchema = z.object({
  todoText: z.string().min(1).max(300),
  owner: z.string().max(120).optional(),
  writeToPlanhat: z.boolean().default(false),
});
const l10AddTodoSchema = z.object({
  text: z.string().min(1).max(300),
  owner: z.string().max(120).optional(),
  accountName: z.string().max(200).optional(),
});
const l10PatchTodoSchema = z.object({ done: z.boolean() });
const l10FacilitatorSchema = z.object({ facilitator: z.string().max(120) });
const l10SegueSchema = z.object({
  participant: z.string().min(1).max(120),
  personal: z.string().max(500).optional(),
  professional: z.string().max(500).optional(),
});
const l10ScoreSchema = z.object({
  participant: z.string().min(1).max(120),
  score: z.number().int().min(1).max(10),
});

export interface DashboardDeps {
  sf: SalesforceClient;
  slack: SlackClient;
  gong: GongClient;
  planhat: PlanhatClient;
  roster: Roster;
  audit: AuditSink;
  recentAudit: () => RecordedAuditEvent[];
  l10Store: L10Store;
}

/**
 * Mounted under /dashboard, behind the same bearerAuth + roster gate as
 * /mcp — this is a second surface for the same authorized 1upers, not a
 * public or service-to-service path. One route per tab (see
 * DASHBOARD_ROUTES in ./pages/index.ts), each serving a complete page from
 * ./pages/*.ts — /dashboard itself just redirects to /dashboard/overview.
 * The JSON /api/... routes below are unchanged by that split: every page's
 * client JS calls the same endpoints the old single-URL dashboard did.
 * Read-only except for two things:
 *
 * 1. The pipeline-pulse preview button, which always runs with dryRun forced
 *    true regardless of ROUTINES_SHARED_SECRET/ROUTINES_DRY_RUN — a person
 *    clicking a button in a browser should never be the thing that writes
 *    to Planhat.
 * 2. The L10 tab's "Solve & create to-do" button, a deliberate, scoped
 *    exception to that same rule (confirmed with Jodi 2026-09-01): it *does*
 *    perform a real Planhat Task write straight from a browser click, gated
 *    on the client sending an explicit confirm-dialog acknowledgement each
 *    time (l10SolveIssueSchema's writeToPlanhat) and only ever for an issue
 *    that resolves to one real Planhat company (Task.companyId is required
 *    and there is no company-less to-do) — see /api/l10/issues/:id/solve.
 *    Everything else the L10 tab writes (issues, to-dos, scores) lands only
 *    in l10-state.json, this dashboard's one other write surface.
 */
export function buildDashboardRouter(deps: DashboardDeps): Router {
  const router = Router();

  const withAudit =
    (tool: string, systems: string[], fn: (req: Request) => Promise<Record<string, unknown>>) =>
    async (req: Request, res: Response): Promise<void> => {
      const actor = (res.locals.actor as string) ?? "unknown";
      const started = Date.now();
      try {
        const payload = await fn(req);
        deps.audit({
          actor,
          tool,
          args: req.query as Record<string, unknown>,
          systems,
          outcome: "ok",
          resultBytes: JSON.stringify(payload).length,
          ms: Date.now() - started,
        });
        res.json(payload);
      } catch (err) {
        deps.audit({ actor, tool, args: {}, systems, outcome: "error", ms: Date.now() - started });
        const badInput = err instanceof RangeError || err instanceof z.ZodError;
        const message = err instanceof RangeError
          ? err.message
          : err instanceof z.ZodError
            ? err.issues.map((i) => i.message).join("; ")
            : "request failed";
        res.status(badInput ? 400 : 500).json({ error: message });
      }
    };

  // One canonical default: /dashboard redirects to the Overview tab's own
  // real, linkable URL rather than serving a page directly, so there's
  // exactly one URL anyone bookmarks for "the dashboard's home."
  router.get("/", (_req, res) => {
    res.redirect(302, "/dashboard/overview");
  });

  for (const { path, render } of DASHBOARD_ROUTES) {
    router.get(`/${path}`, (_req, res) => {
      res.type("html").send(render());
    });
  }

  router.get(
    "/api/overview",
    withAudit(
      "dashboard.overview",
      ["salesforce", "slack", "gong", "planhat"],
      async (req) => {
        const filters = overviewFiltersSchema.parse(req.query);
        return { ...(await buildOverview(deps.sf, deps.slack, deps.gong, deps.planhat, undefined, filters)) };
      },
    ),
  );

  router.get(
    "/api/deals",
    withAudit("dashboard.find_deal", ["salesforce"], async (req) => {
      const q = String(req.query.q ?? "");
      const matches = await deps.sf.findOpportunities(q, 10);
      return {
        matches: matches.map((o) => ({
          id: o.id,
          name: o.name,
          account: o.accountName,
          stage: o.stage,
          owner: o.ownerName,
          closeDate: o.closeDate,
        })),
      };
    }),
  );

  router.get(
    "/api/deals/:id",
    withAudit(
      "dashboard.deal_detail",
      ["salesforce", "slack", "gong"],
      async (req) => {
        const opp = await deps.sf.getOpportunity(req.params.id);
        if (!opp) {
          return { error: "No opportunity with that Id is visible to Clearinghouse." };
        }

        const calls = await deps.gong.getCallsForOpportunity(opp.id, 5);
        const messages = opp.accountName
          ? await deps.slack.getMessagesForAccount(opp.accountName, 20)
          : [];

        return {
          deal: {
            id: opp.id,
            name: opp.name,
            account: opp.accountName,
            stage: opp.stage,
            amount: opp.amount,
            closeDate: opp.closeDate,
            owner: opp.ownerName,
            lastModified: opp.lastModified,
            nextStep: opp.nextStep,
            description: opp.description,
          },
          calls: {
            items: calls.map((c) => ({
              id: c.id,
              at: c.startedAt,
              durationMinutes: Math.round(c.durationSec / 60),
              title: c.title,
              participants: c.participants,
              summary: c.summary,
            })),
            withheld: deps.gong.contentMode === "metadata",
          },
          slack: {
            messages: messages.map((m) => ({
              at: m.ts,
              from: m.userDisplay,
              external: m.isExternal,
              text: m.text,
            })),
          },
        };
      },
    ),
  );

  router.get(
    "/api/recent-activity",
    withAudit("dashboard.recent_activity", ["salesforce", "slack", "gong"], async (req) => {
      const args = recentActivitySchema.parse(req.query);
      return recentActivity(deps.sf, deps.slack, deps.gong, args);
    }),
  );

  router.get(
    "/api/coverage-check",
    withAudit("dashboard.coverage_check", ["salesforce", "slack", "gong"], async (req) => {
      const args = coverageCheckSchema.parse(req.query);
      return coverageCheck(deps.sf, deps.slack, deps.gong, args);
    }),
  );

  router.get(
    "/api/portfolio",
    withAudit("dashboard.portfolio", ["portfolio-research"], async () => ({
      ...buildPortfolioSummary(),
    })),
  );

  router.get(
    "/api/portfolio/accounts/:id",
    withAudit("dashboard.portfolio_account", ["portfolio-research", "salesforce", "slack", "gong"], async (req) => {
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) return { error: "Invalid account id." };
      const account = await getPortfolioAccount(id, deps.sf, deps.slack, deps.gong);
      if (!account) return { error: "No portfolio account with that id." };
      return account;
    }),
  );

  router.get(
    "/api/portfolio/analytics",
    withAudit("dashboard.portfolio_analytics", ["portfolio-research"], async () => ({
      ...buildAnalyticsFit(),
    })),
  );

  router.get(
    "/api/roster",
    withAudit("dashboard.roster", [], async () => ({
      members: deps.roster.listMembers(),
    })),
  );

  router.get(
    "/api/audit",
    withAudit("dashboard.audit", [], async () => ({
      events: deps.recentAudit(),
    })),
  );

  router.post(
    "/api/pipeline-pulse",
    withAudit("dashboard.pipeline_pulse", ["salesforce", "planhat"], async () => ({
      ...(await runPipelinePulse({
        sf: deps.sf,
        planhat: deps.planhat,
        dryRun: true, // forced — see buildDashboardRouter's doc comment
      })),
    })),
  );

  // ================= L10 Implementation Review =================

  router.get(
    "/api/l10/state",
    withAudit("dashboard.l10_state", [], async () => ({ state: deps.l10Store.read() })),
  );

  router.get(
    "/api/l10/briefing",
    withAudit(
      "dashboard.l10_briefing",
      ["salesforce", "slack", "gong", "portfolio-research"],
      async () => ({ accounts: await buildL10Briefing(deps.sf, deps.slack, deps.gong) }),
    ),
  );

  router.post(
    "/api/l10/facilitator",
    withAudit("dashboard.l10_facilitator", [], async (req) => {
      const { facilitator } = l10FacilitatorSchema.parse(req.body);
      return { state: deps.l10Store.patch({ facilitator }) };
    }),
  );

  router.post(
    "/api/l10/segue",
    withAudit("dashboard.l10_segue", [], async (req) => {
      const { participant, personal, professional } = l10SegueSchema.parse(req.body);
      const current = deps.l10Store.read();
      const prior = current.segue[participant] ?? { personal: "", professional: "" };
      const segue = {
        ...current.segue,
        [participant]: {
          personal: personal ?? prior.personal,
          professional: professional ?? prior.professional,
        },
      };
      return { state: deps.l10Store.patch({ segue }) };
    }),
  );

  router.post(
    "/api/l10/scores",
    withAudit("dashboard.l10_scores", [], async (req) => {
      const { participant, score } = l10ScoreSchema.parse(req.body);
      const current = deps.l10Store.read();
      return { state: deps.l10Store.patch({ scores: { ...current.scores, [participant]: score } }) };
    }),
  );

  router.post(
    "/api/l10/metrics/:kind/:id/status",
    withAudit("dashboard.l10_metric_status", [], async (req) => {
      const kind = req.params.kind === "rock" ? "rock" : "metric";
      const { status } = l10MetricStatusSchema.parse(req.body);
      const current = deps.l10Store.read();
      const listKey = kind === "rock" ? "rocks" : "metrics";
      const list = current[listKey];
      const row = list.find((r) => r.id === req.params.id);
      if (!row) return { error: "No matching row." };
      const nextList = list.map((r) => (r.id === row.id ? { ...r, status } : r));

      const autoFromKey = `${kind}:${row.id}`;
      let issues = current.issues;
      if (status === "off") {
        if (!issues.some((i) => i.autoFrom === autoFromKey)) {
          const autoIssue: L10Issue = {
            id: randomUUID(),
            title: row.name,
            raised: row.owner || "Reporting",
            area: kind === "rock" ? "Quarterly Rock" : "Scorecard",
            tier: "P2",
            xfn: true,
            note: row.meta || "Dropped from reporting as off-track.",
            root: "",
            solutions: "",
            solved: false,
            struck: false,
            accountName: row.accountName ?? null,
            autoFrom: autoFromKey,
            touched: false,
          };
          issues = [...issues, autoIssue];
        }
      } else {
        issues = issues.filter((i) => !(i.autoFrom === autoFromKey && !i.touched));
      }

      return { state: deps.l10Store.patch({ [listKey]: nextList, issues } as Record<string, unknown>) };
    }),
  );

  router.post(
    "/api/l10/issues",
    withAudit("dashboard.l10_add_issue", [], async (req) => {
      const body = l10AddIssueSchema.parse(req.body);
      const current = deps.l10Store.read();
      const issue: L10Issue = {
        id: randomUUID(),
        title: body.title,
        raised: body.raisedBy || current.facilitator || "Team",
        area: body.area || "—",
        tier: body.tier ?? "P2",
        xfn: true,
        note: "",
        root: "",
        solutions: "",
        solved: false,
        struck: false,
        accountName: body.accountName ?? null,
        touched: true,
      };
      return { state: deps.l10Store.patch({ issues: [...current.issues, issue] }) };
    }),
  );

  router.patch(
    "/api/l10/issues/:id",
    withAudit("dashboard.l10_patch_issue", [], async (req) => {
      const patch = l10PatchIssueSchema.parse(req.body);
      const current = deps.l10Store.read();
      if (!current.issues.some((i) => i.id === req.params.id)) return { error: "No matching issue." };
      const issues = current.issues.map((i) =>
        i.id === req.params.id ? { ...i, ...patch, touched: true } : i,
      );
      return { state: deps.l10Store.patch({ issues }) };
    }),
  );

  router.post(
    "/api/l10/issues/:id/solve",
    withAudit("dashboard.l10_solve_issue", ["planhat"], async (req) => {
      const body = l10SolveIssueSchema.parse(req.body);
      const current = deps.l10Store.read();
      const issue = current.issues.find((i) => i.id === req.params.id);
      if (!issue) return { error: "No matching issue." };

      const owner = body.owner || current.facilitator || "Team";
      const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

      let planhatTaskId: string | null = null;
      let planhatPushed = false;
      let planhatSkippedReason: string | null = null;

      if (body.writeToPlanhat) {
        if (!issue.accountName) {
          planhatSkippedReason = "This issue isn't tied to one specific account — nothing to attach a Planhat Task to.";
        } else {
          const companies = await deps.planhat.listCompanies(200);
          const company = findCompanyForAccount(companies, issue.accountName);
          if (!company) {
            planhatSkippedReason = `No Planhat company found matching "${issue.accountName}".`;
          } else {
            const users = await deps.planhat.listUsers(500);
            const ownerMatch = users.find((u) => u.name.toLowerCase().includes(owner.toLowerCase()));
            const priority = issue.tier === "P1" ? "High" : issue.tier === "P2" ? "Medium" : "Low";
            const task = await deps.planhat.createTask({
              companyId: company.id,
              action: body.todoText,
              description: `Solved from L10 issue: ${issue.title}${issue.root ? `\n\nRoot cause: ${issue.root}` : ""}`,
              ownerId: ownerMatch?.id,
              dueDate,
              priority,
            });
            planhatTaskId = task.id;
            planhatPushed = true;
          }
        }
      }

      const todo: L10Todo = {
        id: randomUUID(),
        text: body.todoText,
        owner,
        done: false,
        isNew: true,
        accountName: issue.accountName ?? null,
        planhatTaskId,
      };
      const issues = current.issues.map((i) =>
        i.id === issue.id ? { ...i, solved: true, touched: true, planhatTaskId: planhatTaskId ?? i.planhatTaskId } : i,
      );
      const state = deps.l10Store.patch({ issues, todos: [...current.todos, todo] });
      return { state, planhatPushed, planhatSkippedReason };
    }),
  );

  router.post(
    "/api/l10/todos",
    withAudit("dashboard.l10_add_todo", [], async (req) => {
      const body = l10AddTodoSchema.parse(req.body);
      const current = deps.l10Store.read();
      const todo: L10Todo = {
        id: randomUUID(),
        text: body.text,
        owner: body.owner || "—",
        done: false,
        isNew: true,
        accountName: body.accountName ?? null,
      };
      return { state: deps.l10Store.patch({ todos: [...current.todos, todo] }) };
    }),
  );

  router.patch(
    "/api/l10/todos/:id",
    withAudit("dashboard.l10_patch_todo", [], async (req) => {
      const { done } = l10PatchTodoSchema.parse(req.body);
      const current = deps.l10Store.read();
      if (!current.todos.some((t) => t.id === req.params.id)) return { error: "No matching to-do." };
      const todos = current.todos.map((t) => (t.id === req.params.id ? { ...t, done } : t));
      return { state: deps.l10Store.patch({ todos }) };
    }),
  );

  router.post(
    "/api/l10/todos/:id/carry-to-issue",
    withAudit("dashboard.l10_carry_todo", [], async (req) => {
      const current = deps.l10Store.read();
      const todo = current.todos.find((t) => t.id === req.params.id);
      if (!todo) return { error: "No matching to-do." };
      const issue: L10Issue = {
        id: randomUUID(),
        title: `Carried: ${todo.text}`,
        raised: todo.owner,
        area: "Carry-over",
        tier: "P3",
        xfn: true,
        note: "Not done last week — carried into Issues.",
        root: "",
        solutions: "",
        solved: false,
        struck: false,
        accountName: todo.accountName ?? null,
        touched: true,
      };
      return { state: deps.l10Store.patch({ issues: [...current.issues, issue] }) };
    }),
  );

  return router;
}
