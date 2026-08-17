# Clearinghouse

Single-auth GTM deal-intelligence MCP server for 1upHealth. One connector in
Claude (`https://mcp.1uphealth.com/mcp`), one "Continue with Google" sign-in,
and every deal answer the company already has in Gong, Salesforce, and Slack —
without anyone ever connecting those three systems themselves. The user's token
stops at this server; downstream systems are reached with org credentials that
never leave GCP.

PRD (v1.0 draft, 2026-08-05): the Claude artifact "Clearinghouse — PRD".

## Status — Weeks 1–4 slice

- **OAuth 2.1 resource server** — RFC 9728 metadata at
  `/.well-known/oauth-protected-resource`, the 401 + `WWW-Authenticate:
  resource_metadata` handshake Claude requires, JWT verification against the
  rented authorization server via JWKS.
- **`find_deal`** — fuzzy deal name → real Salesforce opportunities.
- **`deal_status`** — the Salesforce picture of one deal. Its `coverage` field
  points at the two tools below rather than returning a silently thin answer.
- **`deal_channel_activity`** — recent messages in the one Slack channel mapped
  to a deal (`Slack_Channel_Id__c` on the Opportunity). No workspace-wide
  search; Slack Connect guests are flagged `external`, not hidden.
- **`call_details`** — recent Gong calls on a deal: when, how long, who was on
  them, and Gong's brief **only once Decision D is answered** (see below).
- **Roster gate** — Git-backed `roster.json`, deny by default, denial audited.
- **Audit** — every tool call logged as one JSON line (actor, tool, args,
  systems, bytes, latency) for the Cloud Logging → BigQuery sink.
- **Injection guards** — typed enumerated inputs, one escape path for SOQL,
  Salesforce Ids validated by shape, LIMIT capped server-side; free-text
  fields (deal descriptions, Slack messages, Gong call titles and briefs)
  returned inside a labeled external-data envelope.
- **`pipeline-pulse` routine** — a service-to-service job (not a Claude tool)
  that cross-references Salesforce opportunities against Planhat companies to
  flag "fictions": pipeline data that looks fine but isn't (`ghost_expansion`,
  `renewal_blindspot`, `stale_momentum`). See below.
- **`/dashboard`** — a browser UI behind the same roster gate as `/mcp`, for
  people who want the data directly instead of asking Claude: deal lookup,
  a pipeline-pulse review board, and roster/audit admin. See below.

Not yet built (Week 5+): the Gong nightly index that replaces the window scan,
`recent_activity`, `pipeline_snapshot` as an MCP tool, `coverage_check` as its
own tool, per-person budgets, directory sync.

## Run locally

```bash
npm install
cp .env.example .env       # defaults: AUTH_MODE=dev, SF_MODE=mock, PLANHAT_MODE=mock
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
| 03 Gong tenant walk | `call_details` reaches calls only through a resolved Salesforce opportunity; `GongClient` exposes no list-all and no by-call-Id path, and the live window scan is page-capped | `src/gong/types.ts`, `src/gong/live.ts` |
| 04 PHI on sales calls | `GONG_CONTENT=metadata` means the call brief is never *requested* — no redaction pass is load-bearing. Turning it on needs `GONG_PHI_REVIEW_SIGNED_OFF=true` or the server refuses to start | Decision D — `src/config.ts`, still unanswered |
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

## Gong live setup (Gates 03 + 04 runbook)

1. Gong admin → API key for this service only; store both halves in Secret
   Manager as `GONG_ACCESS_KEY` / `GONG_ACCESS_KEY_SECRET`.
2. Leave `GONG_CONTENT=metadata`. In this mode the content selector sent to
   Gong omits `content.brief` entirely, so no spoken content reaches this
   process, its memory, or its logs — the gate is the request, not a filter.
3. **Before flipping to `GONG_CONTENT=summaries`:** confirm the BAA and
   retention terms covering call recordings (Decision D), then set
   `GONG_PHI_REVIEW_SIGNED_OFF=true`. Live Gong refuses to boot with summaries
   on while that is false — deliberately two hands, not one flag.
4. **Verify the response shape first.** `src/gong/live.ts` follows Gong's
   documented `/v2/calls/extensive` payload (`metaData`,
   `parties[].affiliation`, `context[].objects[]`) but has never run against
   1upHealth's tenant. Check one real call before `GONG_MODE=live`.
5. `GONG_LOOKBACK_DAYS` (default 180) bounds the window scan. This is the
   direct-read stand-in for the PRD's nightly index; when call volume makes
   the scan slow, the index lands behind the same `GongClient` interface.

## Pipeline-pulse routine (Planhat)

`POST /routines/pipeline-pulse` is a separate, service-to-service path — not
part of the `/mcp` connector Claude talks to, and not reachable by an end-user
Claude session. It's meant to be triggered by Cloud Scheduler, not a person.

What it does: pulls Salesforce opportunities and Planhat companies, then runs
three deterministic detectors over them —

- **`ghost_expansion`** — a Planhat expansion signal with no real health behind
  it (see `src/fictions/rules/ghostExpansion.ts`)
- **`renewal_blindspot`** — a Planhat renewal coming due (or overdue) with no
  open Salesforce opportunity anywhere near that date
- **`stale_momentum`** — a late-stage opportunity that's gone quiet in both
  Salesforce and Planhat

High-confidence findings can propose a `[DRAFT]` Planhat project as a
follow-up; everything else surfaces as a Slack nudge (`suggestedAction`).
`ROUTINES_DRY_RUN=true` by default means the routine always computes and
returns what it *would* create in Planhat without ever calling the write
method — the preview response and the real write share the same code path
(`toProjectDraft` in `src/routines/pipelinePulse.ts`), so the preview can't
drift from reality.

**Before setting `PLANHAT_MODE=live` or `ROUTINES_DRY_RUN=false`:**

1. `src/planhat/live.ts`'s field mapping (`RawCompany`) is a best-effort guess
   at Planhat's schema — a real-tenant lookup was started but never finished.
   Verify it against one real company record first.
2. Generate a Planhat API token scoped to this service, store it as
   `PLANHAT_API_TOKEN` (Secret Manager in Cloud Run, never a file in the repo).
3. Generate a random secret ≥16 chars for `ROUTINES_SHARED_SECRET`; whoever
   calls the route (Cloud Scheduler) sends it as `x-routines-secret`. Unset =
   the route always 403s, independent of whether the rest of the server is
   configured.
4. Only after (1) is confirmed against real data, flip `ROUTINES_DRY_RUN=false`
   — until then, run it in dry-run and read the `proposedProjects` it returns.

## Local dashboard

`/dashboard` is a second, human-facing surface — same server, same
`bearerAuth` + roster gate as `/mcp`, just a browser tab instead of a Claude
conversation. For anyone who wants to look something up directly, or for
demoing/debugging without going through Claude at all. Vanilla JS, no build
step, no separate deploy.

Three tabs:

- **Deal lookup** — search by name (`find_deal`), pick a result, see the same
  combined Salesforce + Gong + Slack picture `deal_status` /
  `deal_channel_activity` / `call_details` give Claude.
- **Pipeline-pulse** — a "Run pipeline-pulse (dry run)" button that lists the
  fictions it finds and the Planhat projects it would propose. This button
  **always** forces `dryRun: true`, regardless of `ROUTINES_DRY_RUN` in
  config — a person clicking a button in a browser should never be the thing
  that writes to Planhat; only the Cloud Scheduler-triggered
  `/routines/pipeline-pulse` path can do that, and only once (1) in that
  section's runbook is done.
- **Admin & audit** — the roster's members, and a live tail of the most
  recent audit events (in-memory, capped, lost on restart — the durable trail
  is still Cloud Logging → BigQuery; this is a convenience view, not a second
  source of truth).

Free text from external systems (deal descriptions, Slack messages, Gong call
titles) is written into the page with `textContent`, never `innerHTML` — same
untrusted-data handling as everywhere else in this codebase, just for a human
reader instead of an LLM.

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
| D | PHI / BAA gate | Confirm Claude-plan retention terms + GCP BAA; only decision that can change the product | `GONG_CONTENT` + `GONG_PHI_REVIEW_SIGNED_OFF`. **Still open** — Gong ships metadata-only until it is answered |
| E | Roster ownership | One restricted Google group, synced by CI | replaces hand-edits to `roster.json` |

## Deliberately not building

No workspace-wide Slack search, no stored Slack messages, **no write tools in
the Claude-facing connector, ever**, no admin tools inside the connector (PRD
§06). The one write path in this repo — `pipeline-pulse` creating draft
Planhat projects — is a separate service-to-service routine Claude can never
reach, dry-run by default, and still gated on an unverified field mapping
(see above).
