import { z } from "zod";

/**
 * All five open PRD decisions (domain, tiers, auth vendor, PHI gate, roster
 * ownership) surface here as configuration — switching any of them must never
 * require a code change.
 */
const schema = z
  .object({
    PORT: z.coerce.number().int().positive().default(8080),

    // The exact URL users type into Claude's connector settings. The RFC 9728
    // metadata `resource` field must byte-match this, path included.
    PUBLIC_URL: z.string().url().default("http://localhost:8080/mcp"),

    // "oauth" = verify bearer JWTs from the rented authorization server.
    // "dev"   = no token; identity comes from DEV_USER_EMAIL. Refused in production.
    AUTH_MODE: z.enum(["oauth", "dev"]).default("oauth"),
    AUTH_ISSUER: z.string().url().optional(),
    AUTH_JWKS_URL: z.string().url().optional(),
    AUTH_AUDIENCE: z.string().optional(),
    DEV_USER_EMAIL: z.string().email().optional(),

    // "mock" = fixture-backed Salesforce for local dev and tests.
    // "live" = OAuth 2.0 JWT bearer flow as one pre-authorized integration user.
    SF_MODE: z.enum(["mock", "live"]).default("mock"),
    SF_LOGIN_URL: z.string().url().default("https://login.salesforce.com"),
    SF_CLIENT_ID: z.string().optional(),
    SF_USERNAME: z.string().optional(),
    // PEM PKCS8 private key. In Cloud Run this arrives as a Secret Manager
    // volume/env — it must never live in the repo or an image layer.
    SF_PRIVATE_KEY: z.string().optional(),

    // "mock" = fixture-backed Slack for local dev and tests.
    // "live" = bot token installed once to the workspace, read-only.
    SLACK_MODE: z.enum(["mock", "live"]).default("mock"),
    SLACK_BOT_TOKEN: z.string().optional(),

    // "mock" = fixture-backed Gong for local dev and tests.
    // "live" = read-only API key (access key + secret) issued to this service.
    GONG_MODE: z.enum(["mock", "live"]).default("mock"),
    GONG_ACCESS_KEY: z.string().optional(),
    GONG_ACCESS_KEY_SECRET: z.string().optional(),
    // Decision D in one switch. "metadata" asks Gong for who/when/how long and
    // nothing spoken; "summaries" additionally requests the call brief and may
    // only be set once the BAA/retention answer is in hand (Gate 04).
    GONG_CONTENT: z.enum(["metadata", "summaries"]).default("metadata"),
    GONG_LOOKBACK_DAYS: z.coerce.number().int().positive().max(730).default(180),
    // Deliberately a separate, explicitly-typed acknowledgement rather than a
    // second meaning for GONG_CONTENT: turning on call content should take two
    // hands, and should read as an assertion someone made.
    GONG_PHI_REVIEW_SIGNED_OFF: z.enum(["true", "false"]).default("false"),

    ROSTER_PATH: z.string().default("roster.json"),
    NODE_ENV: z.string().default("development"),
  })
  .superRefine((cfg, ctx) => {
    if (cfg.AUTH_MODE === "dev" && cfg.NODE_ENV === "production") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "AUTH_MODE=dev is refused in production",
      });
    }
    if (cfg.AUTH_MODE === "dev" && !cfg.DEV_USER_EMAIL) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "AUTH_MODE=dev requires DEV_USER_EMAIL",
      });
    }
    if (cfg.AUTH_MODE === "oauth" && (!cfg.AUTH_ISSUER || !cfg.AUTH_JWKS_URL)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "AUTH_MODE=oauth requires AUTH_ISSUER and AUTH_JWKS_URL",
      });
    }
    if (
      cfg.SF_MODE === "live" &&
      (!cfg.SF_CLIENT_ID || !cfg.SF_USERNAME || !cfg.SF_PRIVATE_KEY)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "SF_MODE=live requires SF_CLIENT_ID, SF_USERNAME, SF_PRIVATE_KEY",
      });
    }
    if (cfg.SLACK_MODE === "live" && !cfg.SLACK_BOT_TOKEN) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "SLACK_MODE=live requires SLACK_BOT_TOKEN",
      });
    }
    if (
      cfg.GONG_MODE === "live" &&
      (!cfg.GONG_ACCESS_KEY || !cfg.GONG_ACCESS_KEY_SECRET)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "GONG_MODE=live requires GONG_ACCESS_KEY and GONG_ACCESS_KEY_SECRET",
      });
    }
    // Gate 04 is a startup assertion, not a code path: real call summaries
    // cannot be turned on without someone also declaring the review signed off.
    if (
      cfg.GONG_MODE === "live" &&
      cfg.GONG_CONTENT === "summaries" &&
      cfg.GONG_PHI_REVIEW_SIGNED_OFF !== "true"
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "GONG_CONTENT=summaries against live Gong requires " +
          "GONG_PHI_REVIEW_SIGNED_OFF=true (PRD decision D / gate 04)",
      });
    }
  });

export type Config = z.infer<typeof schema> & {
  /** Audience expected in access tokens; defaults to the resource URL. */
  audience: string;
  /** Origin of PUBLIC_URL — where /.well-known metadata is served. */
  publicOrigin: string;
};

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const parsed = schema.parse(env);
  const url = new URL(parsed.PUBLIC_URL);
  return {
    ...parsed,
    audience: parsed.AUTH_AUDIENCE ?? parsed.PUBLIC_URL,
    publicOrigin: url.origin,
  };
}
