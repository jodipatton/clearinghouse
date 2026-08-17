import express, { type Express } from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import type { Config } from "../config.js";
import type { AuditSink, RecordedAuditEvent } from "../audit.js";
import type { SalesforceClient } from "../salesforce/types.js";
import type { SlackClient } from "../slack/types.js";
import type { GongClient } from "../gong/types.js";
import type { PlanhatClient } from "../planhat/types.js";
import { Roster } from "../roster.js";
import { bearerAuth, metadataUrl } from "./auth.js";
import { buildServer } from "../mcp/server.js";
import { buildRoutinesRouter } from "./routines.js";
import { buildDashboardRouter } from "./dashboard.js";

export interface AppDeps {
  sf: SalesforceClient;
  slack: SlackClient;
  gong: GongClient;
  planhat: PlanhatClient;
  audit: AuditSink;
  roster?: Roster;
  /** Backs /dashboard's audit tab; a no-op empty list if omitted (e.g. in tests). */
  recentAudit?: () => RecordedAuditEvent[];
}

export function createApp(cfg: Config, deps: AppDeps): Express {
  const app = express();
  app.use(express.json({ limit: "1mb" }));

  const roster = deps.roster ?? new Roster(cfg.ROSTER_PATH);

  app.get("/healthz", (_req, res) => {
    res.json({ ok: true });
  });

  // Service-to-service only (Cloud Scheduler), never the MCP/Claude path —
  // its own auth (serviceAuth), not bearerAuth/roster.
  app.use(
    "/routines",
    buildRoutinesRouter(cfg, {
      sf: deps.sf,
      planhat: deps.planhat,
      audit: deps.audit,
      dryRun: cfg.ROUTINES_DRY_RUN,
    }),
  );

  // RFC 9728 protected-resource metadata. `resource` must byte-match the URL
  // the user typed into Claude's connector settings, path included.
  app.get("/.well-known/oauth-protected-resource", (_req, res) => {
    res.json({
      resource: cfg.PUBLIC_URL,
      authorization_servers: cfg.AUTH_ISSUER ? [cfg.AUTH_ISSUER] : [],
      bearer_methods_supported: ["header"],
      resource_name: "1upHealth Clearinghouse",
    });
  });

  const auth = bearerAuth(cfg, roster, deps.audit);

  // Same auth/roster gate as /mcp — a second, human-browsable surface for
  // the same authorized 1upers, not a public or service-to-service path.
  app.use(
    "/dashboard",
    auth,
    buildDashboardRouter({
      sf: deps.sf,
      slack: deps.slack,
      gong: deps.gong,
      planhat: deps.planhat,
      roster,
      audit: deps.audit,
      recentAudit: deps.recentAudit ?? (() => []),
    }),
  );

  app.post("/mcp", auth, async (req, res) => {
    const server = buildServer({
      actor: res.locals.actor as string,
      sf: deps.sf,
      slack: deps.slack,
      gong: deps.gong,
      audit: deps.audit,
    });
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });
    res.on("close", () => {
      void transport.close();
      void server.close();
    });
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  });

  // Stateless server: no SSE stream to resume, no session to delete.
  const methodNotAllowed = (_req: express.Request, res: express.Response) => {
    res.status(405).json({ error: "method not allowed (stateless server)" });
  };
  app.get("/mcp", auth, methodNotAllowed);
  app.delete("/mcp", auth, methodNotAllowed);

  return app;
}

export { metadataUrl };
