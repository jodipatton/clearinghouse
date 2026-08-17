import { Router, type Request, type Response } from "express";
import { z } from "zod";
import type { AuditSink, RecordedAuditEvent } from "../audit.js";
import type { SalesforceClient } from "../salesforce/types.js";
import type { SlackClient } from "../slack/types.js";
import type { GongClient } from "../gong/types.js";
import type { PlanhatClient } from "../planhat/types.js";
import type { Roster } from "../roster.js";
import { runPipelinePulse } from "../routines/pipelinePulse.js";
import { recentActivity, recentActivityInput } from "../tools/recentActivity.js";
import { coverageCheck, coverageCheckInput } from "../tools/coverageCheck.js";
import { DASHBOARD_HTML } from "./dashboardPage.js";

// Reuses each MCP tool's own zod input shape for query-string validation, so
// the dashboard can never silently drift from what Claude itself enforces.
const recentActivitySchema = z.object(recentActivityInput);
const coverageCheckSchema = z.object(coverageCheckInput);

export interface DashboardDeps {
  sf: SalesforceClient;
  slack: SlackClient;
  gong: GongClient;
  planhat: PlanhatClient;
  roster: Roster;
  audit: AuditSink;
  recentAudit: () => RecordedAuditEvent[];
}

/**
 * Mounted under /dashboard, behind the same bearerAuth + roster gate as
 * /mcp — this is a second surface for the same authorized 1upers, not a
 * public or service-to-service path. Read-only except for the pipeline-pulse
 * preview button, which always runs with dryRun forced true regardless of
 * ROUTINES_SHARED_SECRET/ROUTINES_DRY_RUN — a person clicking a button in a
 * browser should never be the thing that writes to Planhat.
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

  router.get("/", (_req, res) => {
    res.type("html").send(DASHBOARD_HTML);
  });

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
        const messages = await deps.slack.getMessagesForOpportunity(opp.id, 20);

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

  return router;
}
