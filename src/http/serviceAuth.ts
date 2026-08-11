import type { NextFunction, Request, Response } from "express";
import { timingSafeEqual } from "node:crypto";
import type { Config } from "../config.js";
import type { AuditSink } from "../audit.js";

/**
 * Gates POST /routines/* — a service-to-service path (Cloud Scheduler, not
 * an end-user Claude session) that deliberately does not reuse bearerAuth's
 * JWT+roster machinery, which is shaped around end-user identity. Fails
 * closed whenever ROUTINES_SHARED_SECRET is unset, as a per-request check
 * rather than a startup hard-fail, so this feature stays fully decoupled
 * from whether the /mcp path even boots.
 */
function timingSafeEqualStrings(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function serviceAuth(cfg: Config, audit: AuditSink) {
  return (req: Request, res: Response, next: NextFunction) => {
    const provided = req.header("x-routines-secret") ?? "";
    const expected = cfg.ROUTINES_SHARED_SECRET ?? "";
    const ok =
      expected.length > 0 && timingSafeEqualStrings(provided, expected);
    if (!ok) {
      audit({
        actor: "(service)",
        tool: "(routines-auth)",
        args: {},
        systems: [],
        outcome: "denied",
      });
      res.status(403).json({ error: "forbidden" });
      return;
    }
    next();
  };
}
