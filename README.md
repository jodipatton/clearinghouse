# Clearinghouse

Single-auth GTM deal-intelligence MCP server for 1upHealth. One connector in
Claude (`https://mcp.1uphealth.com/mcp`), one "Continue with Google" sign-in,
and every deal answer the company already has in Gong, Salesforce, and Slack —
without anyone ever connecting those three systems themselves. The user's token
stops at this server; downstream systems are reached with org credentials that
never leave GCP.

PRD (v1.0 draft, 2026-08-05): the Claude artifact "Clearinghouse — PRD".

## Status — week-one scaffold

Implements the Weeks 1–2 slice of the PRD plan:

- **OAuth 2.1 resource server** — RFC 9728 metadata at
  `/.well-known/oauth-protected-resource`, the 401 + `WWW-Authenticate:
  resource_metadata` handshake Claude requires, JWT verification against the
  rented authorization server via JWKS.
- **`find_deal`** — fuzzy deal name → real Salesforce opportunities.
- **`deal_status`** — Salesforce-only for now; its `coverage` field says so
  explicitly instead of returning a silently thin answer.
- **Roster gate** — Git-backed `roster.json`, deny by default, denial audited.
- **Audit** — every tool call logged as one JSON line (actor, tool, args,
  systems, bytes, latency) for the Cloud Logging → BigQuery sink.
- **Injection guards** — typed enumerated inputs, one escape path for SOQL,
  Salesforce Ids validated by shape, LIMIT capped server-side; free-text
  fields returned inside a labeled external-data envelope.

Not yet built (Weeks 3–5): Gong nightly index + `call_details`,
Slack deal channels, `recent_activity`, `pipeline_snapshot`, `coverage_check`
as its own tool, per-person budgets, directory sync.

## Run locally

```bash
npm install
cp .env.example .env       # defaults: AUTH_MODE=dev, SF_MODE=mock
npm run dev
npm test
```

Smoke-test with MCP Inspector: `npx @modelcontextprotocol/inspector`, connect
to `http://localhost:8080/mcp` (streamable HTTP). In dev mode identity comes
from `DEV_USER_EMAIL`, which must be on `roster.json`. Dev mode refuses to
start when `NODE_ENV=production`.

## Launch gates → where they live

| Gate | What | Where |
| --- | --- | --- |
| 01 Fake-"Claude" phishing | DCR off, one pinned client, one redirect URI (`https://claude.ai/api/mcp/auth_callback`) | Auth-vendor dashboard — two settings, do this the day the tenant exists |
| 02 Lookalike connector URL | Host on `1uphealth.com` itself; connector-adding restricted to Claude org admins | Decision A + Claude admin console |
| 03 Gong tenant walk | Deal-index-only `call_details` | Weeks 3–4, not in this scaffold |
| 04 PHI on sales calls | BAA/retention confirmation + redaction pass | Decision D — answer before Gong lands |
| 05 Salesforce signing key | JWT bearer as one pre-authorized integration user (`src/salesforce/live.ts`); key generated in Cloud Shell, never a laptop; connected app locked to that user + static egress IP | Code + Salesforce setup runbook below |
| 06 Roster misconfiguration | Git-backed `roster.json`, service reads only, deny by default, denials audited | `src/roster.ts`, `src/http/auth.ts` |

## Salesforce live setup (Gate 05 runbook)

1. Create integration user `clearinghouse@1uphealth.com` with a read-only
   profile scoped to Opportunity + Account.
2. In **Cloud Shell** (so the key never touches a laptop):
   `openssl req -x509 -newkey rsa:2048 -nodes -keyout sf.key -out sf.crt -days 730`
3. Connected app: upload `sf.crt`, enable OAuth, scopes `api`; **Admin
   approved users are pre-authorized**; assign only the integration user's
   profile; set **Relax IP restrictions = Enforce**, allowlist the Cloud Run
   static egress IP (via Serverless VPC connector + Cloud NAT).
4. Put `sf.key` in Secret Manager as `SF_PRIVATE_KEY`; delete the local copy.
5. Set `SF_MODE=live`, `SF_CLIENT_ID` (consumer key), `SF_USERNAME`.

## Auth vendor setup (Decision C — vendor-agnostic checklist)

Whichever of WorkOS AuthKit / Auth0 / Stytch / Descope is chosen, on
`auth.1uphealth.com` (CNAME so the vendor stays swappable):

1. Federate to Google Workspace; restrict to the 1uphealth.com hosted domain.
2. **Disable dynamic client registration** (Gate 01).
3. Register exactly one client, redirect URI
   `https://claude.ai/api/mcp/auth_callback`, PKCE required.
4. Access tokens: JWT, audience = `https://mcp.1uphealth.com/mcp`, include
   `email`. Long-lived rotating refresh tokens with reuse detection — Claude's
   background refresh is unreliable, and a dead refresh token must return
   exactly `invalid_grant` or users get wedged.
5. Do not put a WAF in front of the IdP that blocks Anthropic egress
   (`160.79.104.0/21` must reach both this server and the AS).
6. Fill `AUTH_ISSUER` + `AUTH_JWKS_URL`, set `AUTH_MODE=oauth`.

## Deploy (Cloud Run)

- Stateless by construction: one MCP server instance per request, JSON
  responses, no sessions — safe under autoscaling.
- Public ingress; OAuth enforced in-app (Claude cannot mint Google IAM
  tokens, so Cloud Run IAM protection is unusable).
- `roster.json` ships in the image; the deploy pipeline is the only writer
  (Gate 06). CI syncs it from the repo — or from the restricted Google group
  if Decision E lands that way.

## Open decisions (PRD §08)

| | Decision | Recommendation | Where it lands here |
| --- | --- | --- | --- |
| A | Domain | `mcp.1uphealth.com` + `auth.1uphealth.com`; register lookalikes | `PUBLIC_URL`, `AUTH_ISSUER` |
| B | One access tier or two | One tier for v1, stated at consent | roster stays one flat list |
| C | Auth vendor | Any of the four; keep DNS ours | `AUTH_ISSUER`/`AUTH_JWKS_URL` only |
| D | PHI / BAA gate | Confirm Claude-plan retention terms + GCP BAA **before Gong lands**; only decision that can change the product | blocks Weeks 3–4, not this scaffold |
| E | Roster ownership | One restricted Google group, synced by CI | replaces hand-edits to `roster.json` |

## Deliberately not building

No workspace-wide Slack search, no stored Slack messages, **no write tools
ever**, no admin tools inside the connector (PRD §06).
