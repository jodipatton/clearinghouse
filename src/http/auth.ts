import type { NextFunction, Request, Response } from "express";
import { createRemoteJWKSet, jwtVerify } from "jose";
import type { Config } from "../config.js";
import type { Roster } from "../roster.js";
import type { AuditSink } from "../audit.js";

/**
 * Clearinghouse is only an OAuth 2.1 resource server — the authorization
 * server is rented and external. The load-bearing handshake: every
 * unauthorized response is a 401 carrying WWW-Authenticate with
 * resource_metadata, because Claude ignores that header on any other status.
 */
export function metadataUrl(cfg: Config): string {
  return `${cfg.publicOrigin}/.well-known/oauth-protected-resource`;
}

function challenge(cfg: Config, res: Response, description: string): void {
  res
    .status(401)
    .set(
      "WWW-Authenticate",
      `Bearer resource_metadata="${metadataUrl(cfg)}", error="invalid_token", error_description="${description}"`,
    )
    .json({ error: "unauthorized", error_description: description });
}

export function bearerAuth(cfg: Config, roster: Roster, audit: AuditSink) {
  const jwks =
    cfg.AUTH_MODE === "oauth"
      ? createRemoteJWKSet(new URL(cfg.AUTH_JWKS_URL!))
      : null;

  return async (req: Request, res: Response, next: NextFunction) => {
    let email: string | undefined;

    if (cfg.AUTH_MODE === "dev") {
      email = cfg.DEV_USER_EMAIL;
    } else {
      const header = req.headers.authorization ?? "";
      const token = header.startsWith("Bearer ") ? header.slice(7) : null;
      if (!token) {
        challenge(cfg, res, "bearer token required");
        return;
      }
      try {
        const { payload } = await jwtVerify(token, jwks!, {
          issuer: cfg.AUTH_ISSUER!,
          audience: cfg.audience,
        });
        email =
          typeof payload.email === "string"
            ? payload.email
            : typeof payload.sub === "string"
              ? payload.sub
              : undefined;
      } catch {
        challenge(cfg, res, "token rejected");
        return;
      }
    }

    // Gate 06: identity alone grants nothing — the roster decides.
    if (!roster.isAuthorized(email)) {
      audit({
        actor: email ?? "unknown",
        tool: "(auth)",
        args: {},
        systems: [],
        outcome: "denied",
      });
      res.status(403).json({
        error: "forbidden",
        error_description:
          "Signed in, but not on the Clearinghouse roster. Ask GTM ops to add you.",
      });
      return;
    }

    res.locals.actor = email;
    next();
  };
}
