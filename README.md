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
- **`deal_channel_activity`** — a deal's Slack activity, resolved by account
  name against 1upHealth's real `#account-<name>` channel-naming convention
  (confirmed 2026-08 — no Salesforce or Planhat field stores this mapping,
  the channel name IS the mapping). Not a workspace-wide search: a bot token
  invited only into the account channels it needs. External senders are
  flagged, not hidden.
- **`call_details`** — recent Gong calls on a deal: when, how long, who was on
  them, and Gong's brief **only once Decision D is answered** (see below).
- **`recent_activity`** — no deal Id required: the most recently modified
  Salesforce opportunities in a window, each annotated with how many Slack
  messages and Gong calls landed on it in the same window. For "what should I
  catch up on."
- **`coverage_check`** — bulk data-hygiene sweep across open deals: which ones
  have no Slack activity synced, no next step, or no Gong call on file.
  `deal_status`'s own `coverage` field answers this one deal at a time; this
  is the many-deals-at-once version.
- **`pipeline_snapshot`** — the read-only, Claude-facing sibling of
  `pipeline-pulse`: same fiction detection (`ghost_expansion`,
  `renewal_blindspot`, `stale_momentum`), answered inline instead of on a
  schedule, and it never proposes or writes anything to Planhat.
- **`portfolio_account`** — fuzzy-name lookup of one of the 43 CMS-0057
  portfolio accounts: the hand-researched dossier (architecture, financial
  signals, key people, risks and blockers, points of interest, ranked
  expansion plays) plus a live layer on top — a matching Salesforce
  opportunity if one resolves, that deal's recent Gong calls, and 60-day
  Slack activity on the account channel. The Claude-facing sibling of the
  dashboard's Customers tab; see "Local dashboard" below for where the
  research itself comes from.
- **`clinical_connect_status`** — no input needed: status of the four
  Clinical Connect accounts (Fallon, Capital Health Plan, Viva Health, Zing
  Health), each split into what's going well (implementation momentum,
  active expansion plays), what isn't (the research's own "Risks &
  Blockers" write-up plus Salesforce health flags), meetings (live Gong
  calls, when a live deal resolved), and customer insights (key people,
  points of interest, live Slack activity, sources). The split groups this
  research's own fields — it is not a generated verdict. The Claude-facing
  sibling of the dashboard's Clinical Connect tab.
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
  a pipeline-pulse review board, the CMS-0057 portfolio and Clinical Connect
  views, roster/audit admin, and the L10 Implementation Review meeting tool.
  See below.

Not yet built (Week 5+): the Gong nightly index that replaces the window
scan, per-person budgets, directory sync.

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
| 05 Salesforce signing key | JWT bearer as one pre-authorized integration user (`src/salesforce/client.ts`); key generated in Cloud Shell, never a laptop; connected app locked to that user + static egress IP | Code + Salesforce setup runbook below |
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

## Slack live setup

1. Install a bot (`chat:read`/`channels:read`/`groups:read` scopes) to the
   workspace; invite it into every `#account-<name>` channel it needs — it
   can only ever read channels it's actually in, so this is the real access
   boundary, not a config flag.
2. Confirmed 2026-08 against the real workspace: customer channels follow
   `#account-<name>` (e.g. `#account-oscar`, `#account-empower-health`) —
   this **is** the deal↔channel mapping; no Salesforce or Planhat field
   stores it. `LiveSlack` resolves an account name to a channel by matching
   against this prefix, not a workspace-wide search.
   Two things to know before relying on it in production:
   - **Ambiguous/short account names can mismatch.** Same known-limitation
     shape as the account-name join in `fictions/match.ts` — verify against
     a sample of real accounts before trusting it broadly.
   - **Many accounts have no channel, or an empty one.** Newer
     `-implementation-` channels frequently have no topic/purpose at all,
     and not every account has a channel yet. `getMessagesForAccount` and
     `countRecentMessages` both return empty/zero in that case, same as "no
     activity" — never an error.
3. Put the bot token in Secret Manager as `SLACK_BOT_TOKEN`; set
   `SLACK_MODE=live`.

(Channel *topic/purpose* text was investigated as a source for CSM/Sales/
Implementation-Manager role assignment and rejected — see "CSM and
Implementation Manager" below for why Planhat is used instead.)

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

Styled to match 1up.health's own brand (Urbanist/Nunito Sans, teal-on-navy),
in both light and dark. Beyond each tab's own content, every row/tile that
represents a real deal or account is clickable straight through to its
detail — an Overview renewal, at-risk company, or flagged fiction; a Recent
activity, Coverage check, or Pipeline-pulse row; a Portfolio/Analytics-fit
account — landing on that deal in Deal lookup or that account's Portfolio
dossier (`goToDeal`/`goToAccountByName` in `dashboardPage.ts`).

Eleven tabs:

- **Overview** — the default landing tab: a RevOps one-page rollup instead of
  five separate places to look. Open pipeline split into new sales / upsell /
  renewal (see "Segmentation" below for where that split actually comes
  from), fictions by severity, a "needs attention" list, coverage-check's
  gap count, customer health (average + an at-risk list), 60-day Slack
  activity per account, and upcoming Planhat renewals sorted soonest-first
  (overdue sorts to the top, and churned accounts are excluded entirely —
  see "Segmentation"). Filterable by **sales rep**, **CSM**, and **implementation
  manager** — picking one narrows every section consistently (a rep filter
  also narrows which accounts show up; a CSM filter also narrows which
  opportunities show up). Pure rollup — `src/routines/overview.ts` — no
  write path.
- **Deal lookup** — search by name (`find_deal`), pick a result, see the same
  combined Salesforce + Gong + Slack picture `deal_status` /
  `deal_channel_activity` / `call_details` give Claude.
- **Recent activity** — `recent_activity` as a form: an owner filter and a
  day count instead of a deal Id.
- **Coverage check** — `coverage_check` as a form: which open deals have no
  Slack activity synced, no next step, or no Gong call.
- **Pipeline-pulse** — a "Run pipeline-pulse (dry run)" button that lists the
  fictions it finds and the Planhat projects it would propose. This button
  **always** forces `dryRun: true`, regardless of `ROUTINES_DRY_RUN` in
  config — a person clicking this particular button should never be the
  thing that writes to Planhat; only the Cloud Scheduler-triggered
  `/routines/pipeline-pulse` path can do that, and only once (1) in that
  section's runbook is done. (No separate tab for `pipeline_snapshot` —
  same underlying scan, so this tab already covers it; `pipeline_snapshot`
  exists as its own MCP tool because Claude needs a read-only-only version
  with no proposed-projects section at all. The L10 tab below is the one
  deliberate exception to "no writes from a browser click" — see its own
  entry.)
- **Portfolio**, **Customers**, **Analytics fit** — the "1upHealth Customer
  Intelligence — CMS-0057 Portfolio" research (43 accounts: architecture,
  financials, people, risks, ranked expansion plays, and a Gong-sourced
  analytics-demand study with a product pitch and gap analysis), folded into
  this server. **Static, point-in-time research, not a live read** — ported
  verbatim into `src/portfolio/data.ts`, refreshed by hand, not regenerated
  from the Salesforce/Planhat/Gong adapters the rest of this dashboard uses.
  Portfolio is the top-line rollup + top expansion plays; Customers is the
  searchable/filterable directory and per-account dossier; Analytics fit is
  the capability-tier study. A dossier cross-links to a **live** Salesforce
  opportunity by account name when one resolves (`getPortfolioAccount` in
  `src/routines/portfolio.ts`), same `normalizeName` join
  `src/fictions/match.ts` uses elsewhere — otherwise it offers a real Deal
  lookup search instead. Free-text research fields (Gong quotes, risk notes)
  render through an allowlist DOM builder (`renderRichHtml`), never raw
  `innerHTML`, matching this file's rule for anything ultimately grounded in
  external-system content.
- **Clinical Connect** — a fixed four-account cohort (Fallon, Capital Health
  Plan, Viva Health, Zing Health), each laid out in the same four buckets as
  the `clinical_connect_status` MCP tool: what's going well (implementation
  status, active expansion plays), what isn't (the research's own "Risks &
  Blockers" text, plus any Salesforce health flags), meetings (live Gong
  calls, only when a live Salesforce opportunity resolved), and customer
  insights (key people, points of interest, live 60-day Slack activity,
  sources). The account list itself is named by Jodi, not derived from any
  field (`clinicalConnectAccountIds` in `src/routines/portfolio.ts`) — the
  going-well/not-well split is a grouping of existing research fields, never
  a generated verdict.
- **Admin & audit** — the roster's members, and a live tail of the most
  recent audit events (in-memory, capped, lost on restart — the durable trail
  is still Cloud Logging → BigQuery; this is a convenience view, not a second
  source of truth). Audit rows expand on click to the full event JSON.
- **L10** — runs the bi-weekly cross-functional Implementation Review meeting
  (Segue → Reporting → To-Do Review → IDS → Close), ported from a standalone
  artifact. State (issues, to-dos, scores, facilitator) persists to
  `L10_STATE_PATH` (`l10-state.json`, gitignored — runtime data, not source),
  not `roster.json`'s Git-backed pattern. Reporting/Rocks rows carry a
  "Refresh live signal" pull of Slack/Salesforce/Gong evidence plus the
  Portfolio tab's own research, for a tracked set of accounts
  (`L10_TRACKED_ACCOUNTS` in `src/routines/l10.ts`) — it only ever surfaces
  evidence, never a computed on-/off-track verdict; that call stays human,
  same as the meeting format itself. **"Solve & create to-do" is this
  server's one write path reachable directly from a browser click** — a
  deliberate, scoped exception to "Deliberately not building" below,
  confirmed with Jodi 2026-09-01: it creates a real Planhat Task, gated on
  (a) the issue resolving to one real account (Task requires a `companyId`;
  an issue with no single account, e.g. most engineering/process issues,
  can only ever be solved locally) and (b) an explicit confirm-dialog
  acknowledgement in the browser each time. `PlanhatClient.createTask`'s
  field mapping is confirmed against Planhat's real Task schema (2026-09,
  via the Planhat MCP connector) but — same caveat as `createProject` —
  unverified against a real tenant end-to-end; check one real write before
  relying on it.

Free text from external systems (deal descriptions, Slack messages, Gong call
titles) is written into the page with `textContent`, never `innerHTML` — same
untrusted-data handling as everywhere else in this codebase, just for a human
reader instead of an LLM.

## Segmentation: sales rep, CSM, implementation manager, new sales / upsell / renewal

Fields the Overview tab filters/splits by, and where each one actually comes
from (checked against real data 2026-08, not assumed):

- **Sales rep** — Salesforce `Opportunity.Owner`. Already a real, reliable
  field; no change needed.
- **New sales vs. upsell vs. renewal** — not `Opportunity.Type`, which is
  72% null on real open opportunities and partly corrupted (a RecordTypeId
  string was found written into the Type field itself on closed-won renewal
  records). Renewal is `StageName` starting with "Renewal " (Anticipated /
  Not Anticipated / Contract Issued) — `isRenewalStage`. Splitting what's
  left into new sales vs. upsell needed a second real field, since Type
  can't do that either: Planhat's `status` (prospect/coming/**customer**/
  canceled/lost) on the account. A non-renewal-stage opportunity on an
  already-`"customer"` account is expansion revenue, not a new logo; on a
  `"prospect"` (or an account with no Planhat record at all) it's real new
  sales. `classifyPipelineCategory` in `src/fictions/match.ts` is the split.
  Same `status` field caught a real bug during testing: `renewal_blindspot`
  and the upcoming-renewals list were flagging a churned (`status: "lost"`)
  account's years-stale renewal date as an urgent gap — both now exclude
  `canceled`/`lost` accounts.
- **CSM and Implementation Manager** — Planhat's `owner` and
  `custom["Implementation Manager"]` fields, resolved against
  `PlanhatClient.listUsers()`. Two alternatives were investigated and
  rejected: Salesforce `UserRole` distinguishes AE-type roles from
  leadership but has no CSM label at all; Slack channel topic/purpose text
  (see "Slack live setup" above) often *does* document these roles in
  plain language, but real examples turned up six different separator
  conventions, Topic and Purpose disagreeing about who the CSM is on the
  same channel, and most newer channels with no metadata at all — too
  inconsistent to parse reliably. Planhat's fields are plain User Ids that
  resolve cleanly with no dead ends; that's the reliable source.

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
§06). This is still true of `/mcp` — nothing Claude can call ever writes
anywhere. Within `/dashboard` (a human, not Claude, in the browser) there are
two write paths, both narrow and both opt-in each time, never silent:
`pipeline-pulse` creating draft Planhat projects — a separate
service-to-service routine reachable only via `/routines/pipeline-pulse`
with `ROUTINES_SHARED_SECRET`, dry-run by default, and the dashboard's own
preview button always forces dry-run regardless of config — and the L10
tab's "Solve & create to-do," a deliberate exception that *does* write a
real Planhat Task straight from a browser click (see the L10 tab entry
above for its gating). Both remain gated on unverified field mappings — see
their respective sections above before relying on either against a real
tenant.
