import { Router } from "express";
import type { Config } from "../config.js";
import type { AuditSink } from "../audit.js";
import type { SalesforceClient } from "../salesforce/types.js";
import type { PlanhatClient } from "../planhat/types.js";
import { serviceAuth } from "./serviceAuth.js";
import { runPipelinePulse } from "../routines/pipelinePulse.js";

export interface RoutinesDeps {
  sf: SalesforceClient;
  planhat: PlanhatClient;
  audit: AuditSink;
  dryRun: boolean;
}

/**
 * Mounted under /routines — service-to-service only, never the MCP/Claude
 * path. This is the one place in the server allowed to write to Planhat
 * (still gated by dryRun), which is why it has its own auth (serviceAuth)
 * instead of bearerAuth.
 */
export function buildRoutinesRouter(cfg: Config, deps: RoutinesDeps): Router {
  const router = Router();
  const auth = serviceAuth(cfg, deps.audit);

  router.post("/pipeline-pulse", auth, async (_req, res) => {
    const started = Date.now();
    try {
      const result = await runPipelinePulse({
        sf: deps.sf,
        planhat: deps.planhat,
        dryRun: deps.dryRun,
      });
      deps.audit({
        actor: "(service)",
        tool: "routines.pipeline_pulse",
        args: {},
        systems: ["salesforce", "planhat"],
        outcome: "ok",
        resultBytes: JSON.stringify(result).length,
        ms: Date.now() - started,
      });
      res.json(result);
    } catch {
      deps.audit({
        actor: "(service)",
        tool: "routines.pipeline_pulse",
        args: {},
        systems: ["salesforce", "planhat"],
        outcome: "error",
        ms: Date.now() - started,
      });
      res.status(500).json({ error: "pipeline pulse failed" });
    }
  });

  return router;
}
