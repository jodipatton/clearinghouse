/**
 * Shared page shell for every /dashboard/* route: head/fonts/CSS + the
 * cross-page nav (real <a href> links, current page marked active
 * server-side via `active`, not client JS) + a per-page <script> body.
 *
 * Split out of the old single-URL DASHBOARD_HTML (src/http/dashboardPage.ts,
 * pre-2026-09 route refactor) so each /dashboard/<tab> route can ship only
 * the markup and client JS that one tab actually needs. Vanilla JS, no
 * build step — same constraint as before.
 *
 * Every value that came from an external system (deal descriptions, Slack
 * messages, Gong titles, roster names, free-text research fields) must still
 * reach the DOM via textContent / the renderRichHtml allowlist builder in
 * shared.ts, never server-side string interpolation or client innerHTML —
 * everything in this file and every page/*.ts file is static markup we
 * wrote, not data from Salesforce/Slack/Gong/Planhat/roster/research.
 */

export type NavId =
  | "overview"
  | "deal-lookup"
  | "recent-activity"
  | "coverage-check"
  | "pipeline-pulse"
  | "portfolio"
  | "customers"
  | "analytics-fit"
  | "clinical-connect"
  | "admin"
  | "l10";

export interface NavItem {
  id: NavId;
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview", href: "/dashboard/overview" },
  { id: "deal-lookup", label: "Deal lookup", href: "/dashboard/deal-lookup" },
  { id: "recent-activity", label: "Recent activity", href: "/dashboard/recent-activity" },
  { id: "coverage-check", label: "Coverage check", href: "/dashboard/coverage-check" },
  { id: "pipeline-pulse", label: "Pipeline-pulse", href: "/dashboard/pipeline-pulse" },
  { id: "portfolio", label: "Portfolio", href: "/dashboard/portfolio" },
  { id: "customers", label: "Customers", href: "/dashboard/customers" },
  { id: "analytics-fit", label: "Analytics fit", href: "/dashboard/analytics-fit" },
  { id: "clinical-connect", label: "Clinical Connect", href: "/dashboard/clinical-connect" },
  { id: "admin", label: "Admin & audit", href: "/dashboard/admin" },
  { id: "l10", label: "L10", href: "/dashboard/l10" },
];

const PAGE_STYLE = String.raw`
  :root {
    --bg: #F3FAFA;
    --surface: #FFFFFF;
    --surface-2: #E7F6F5;
    --ink: #071A22;
    --ink-dim: #45606B;
    --ink-faint: #7C9298;
    --border: #DCEAEC;
    --accent: #00B6BE;
    --accent-ink: #00767D;
    --accent-soft: #DFFAF5;
    --warn: #A8672A;
    --warn-soft: #F3E5D2;
    --bad: #B5484A;
    --bad-soft: #F5DEDE;
    --seg-medicaid: #00969F;
    --seg-medadv: #B4690E;
    --seg-commercial: #5257C8;
    --seg-bespoke: #B0446A;
    --font-mono: ui-monospace, "SF Mono", "Cascadia Code", Menlo, Consolas, monospace;
    --font-body: "Nunito Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    --font-display: "Urbanist", var(--font-body);
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #010B13;
      --surface: #0B1E27;
      --surface-2: #102A34;
      --ink: #E9F7F6;
      --ink-dim: #9DC1C4;
      --ink-faint: #628185;
      --border: #1E3941;
      --accent: #5EEAD4;
      --accent-ink: #BFF7EC;
      --accent-soft: #103733;
      --warn: #E6AC66;
      --warn-soft: #3A2A18;
      --bad: #E38385;
      --bad-soft: #3A1E1F;
      --seg-medicaid: #2AC7C2;
      --seg-medadv: #CE7F30;
      --seg-commercial: #8489EE;
      --seg-bespoke: #D5678B;
    }
  }
  body { font-family: var(--font-body); }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: var(--bg);
    color: var(--ink);
    font-family: var(--font-body);
    padding: 32px 24px 80px;
  }
  .page { max-width: 920px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
  header.masthead { display: flex; flex-direction: column; gap: 4px; }
  header.masthead h1 {
    font-family: var(--font-display); font-size: 23px; font-weight: 700; margin: 0;
  }
  header.masthead p { margin: 0; color: var(--ink-dim); font-size: 13.5px; }
  nav.tabs { display: flex; flex-wrap: wrap; gap: 6px 14px; border-bottom: 1px solid var(--border); }
  nav.tabs a {
    font-family: var(--font-display); font-size: 13px; font-weight: 600; letter-spacing: 0.01em;
    background: none; border: none; color: var(--ink-faint); cursor: pointer; text-decoration: none;
    padding: 10px 4px; border-bottom: 2px solid transparent; margin-bottom: -1px;
  }
  nav.tabs a.active { color: var(--accent-ink); border-bottom-color: var(--accent); }
  .page-body { display: flex; flex-direction: column; gap: 16px; }
  .card {
    background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
    padding: 18px 20px;
  }
  .row { display: flex; gap: 10px; align-items: center; }
  input[type="text"], select {
    flex: 1; font-family: var(--font-body); font-size: 14px; padding: 9px 12px;
    border-radius: 8px; border: 1px solid var(--border); background: var(--surface);
    color: var(--ink);
  }
  button.action {
    font-family: var(--font-display); font-size: 13.5px; font-weight: 700;
    color: var(--accent-ink); background: var(--accent-soft); border: 1px solid var(--border);
    border-radius: 999px; padding: 9px 18px; cursor: pointer; white-space: nowrap;
  }
  button.action:disabled { opacity: 0.6; cursor: default; }
  .hint { font-size: 12.5px; color: var(--ink-faint); }
  table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
  th { text-align: left; font-family: var(--font-display); font-size: 11px; text-transform: uppercase;
    letter-spacing: 0.05em; color: var(--ink-faint); font-weight: 600; padding: 6px 10px;
    border-bottom: 1px solid var(--border); }
  td { padding: 9px 10px; border-bottom: 1px solid var(--border); vertical-align: top; }
  tr.clickable { cursor: pointer; }
  tr.clickable:hover td { background: var(--surface-2); }
  .badge {
    font-family: var(--font-display); font-weight: 600; font-size: 11px; padding: 2px 7px; border-radius: 5px;
    display: inline-block;
  }
  .badge.severity-high { background: var(--bad-soft); color: var(--bad); }
  .badge.severity-medium { background: var(--warn-soft); color: var(--warn); }
  .badge.severity-low { background: var(--surface-2); color: var(--ink-faint); }
  .badge.external { background: var(--warn-soft); color: var(--warn); }
  .badge.outcome-ok { background: var(--accent-soft); color: var(--accent-ink); }
  .badge.outcome-denied, .badge.outcome-error { background: var(--bad-soft); color: var(--bad); }
  .kv { display: grid; grid-template-columns: 130px 1fr; gap: 6px 12px; font-size: 13.5px; }
  .kv dt { color: var(--ink-faint); font-family: var(--font-display); font-weight: 600; font-size: 11.5px; }
  .kv dd { margin: 0; }
  .msg-line { display: flex; gap: 8px; font-size: 13.5px; padding: 6px 0; border-bottom: 1px solid var(--border); }
  .msg-line:last-child { border-bottom: none; }
  .msg-line .from { font-weight: 600; flex: none; width: 120px; }
  .empty { color: var(--ink-faint); font-size: 13.5px; padding: 8px 2px; }
  .section-label {
    font-family: var(--font-display); font-weight: 700; font-size: 11.5px; text-transform: uppercase;
    letter-spacing: 0.05em; color: var(--ink-faint); margin: 0 0 8px;
  }
  .clickable-row { cursor: pointer; }
  .clickable-row:hover { background: var(--surface-2); }
  code.mono { font-family: var(--font-mono); font-size: 12.5px; color: var(--ink-dim); }

  /* ---------- overview ---------- */
  .kpi-row {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px;
  }
  .kpi-tile {
    background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
    padding: 14px 16px; display: flex; flex-direction: column; gap: 4px;
  }
  .kpi-tile .value {
    font-family: var(--font-display); font-size: 25px; font-weight: 700;
    font-variant-numeric: tabular-nums; line-height: 1.1;
  }
  .kpi-tile .label { font-size: 12px; color: var(--ink-faint); }
  .kpi-tile .sub { display: block; font-size: 10.5px; color: var(--ink-faint); margin-top: 3px; line-height: 1.35; }
  .kpi-tile.tone-bad .value { color: var(--bad); }
  .kpi-tile.tone-warn .value { color: var(--warn); }

  .overview-grid {
    display: grid; grid-template-columns: 1.3fr 1fr; gap: 16px; align-items: start;
  }
  @media (max-width: 720px) { .overview-grid { grid-template-columns: 1fr; } }

  .bar-row { display: grid; grid-template-columns: 130px 1fr 90px; align-items: center; gap: 10px; padding: 5px 0; }
  .bar-row .bar-label { font-size: 12.5px; color: var(--ink-dim); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .bar-row .bar-track { background: var(--surface-2); border-radius: 5px; height: 10px; overflow: hidden; }
  .bar-row .bar-fill { background: var(--accent); height: 100%; border-radius: 5px 0 0 5px; }
  .bar-row .bar-value { font-family: var(--font-display); font-weight: 600; font-size: 12px; color: var(--ink-faint); text-align: right; font-variant-numeric: tabular-nums; }

  .severity-tiles { display: flex; gap: 10px; }
  .severity-tile {
    flex: 1; border-radius: 10px; padding: 10px 12px; display: flex; flex-direction: column; gap: 2px;
    border: 1px solid var(--border);
  }
  .severity-tile .count { font-family: var(--font-display); font-size: 20px; font-weight: 700; font-variant-numeric: tabular-nums; }
  .severity-tile .label { font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.04em; }
  .severity-tile.high { background: var(--bad-soft); }
  .severity-tile.high .count, .severity-tile.high .label { color: var(--bad); }
  .severity-tile.medium { background: var(--warn-soft); }
  .severity-tile.medium .count, .severity-tile.medium .label { color: var(--warn); }
  .severity-tile.low { background: var(--surface-2); }
  .severity-tile.low .count, .severity-tile.low .label { color: var(--ink-faint); }

  .renewal-row.overdue td:nth-child(3) { color: var(--bad); font-weight: 600; }

  .attention-item { display: flex; gap: 10px; padding: 8px 0; border-bottom: 1px solid var(--border); font-size: 13px; }
  .attention-item:last-child { border-bottom: none; }
  .attention-item .badge { flex: none; margin-top: 1px; }

  /* ---------- portfolio / customers / analytics fit ---------- */
  .tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; }
  .tile {
    text-align: left; background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
    padding: 14px 16px; cursor: pointer; font-family: var(--font-body);
  }
  .tile:hover { border-color: var(--accent); }
  .tile .n { font-family: var(--font-display); font-size: 24px; font-weight: 700; font-variant-numeric: tabular-nums; }
  .tile .cap { display: flex; align-items: center; gap: 6px; margin-top: 5px; font-size: 11.5px; color: var(--ink-dim); }
  .tile .cap .sdot { width: 8px; height: 8px; border-radius: 3px; flex: none; }
  .tile.hero { background: linear-gradient(155deg, var(--accent-soft), var(--surface)); border-color: var(--accent); }
  .tile.hero .n { color: var(--accent-ink); }

  .riskstrip { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; }
  .riskcard { border: 1px solid var(--border); border-radius: 10px; background: var(--surface); padding: 10px 14px; }
  .riskcard .rt { font-family: var(--font-display); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--ink-faint); }
  .riskcard .rv { font-size: 13px; font-weight: 600; margin-top: 4px; }
  .riskcard.bad .rv { color: var(--bad); }
  .riskcard.warn .rv { color: var(--warn); }

  .op-row {
    display: grid; grid-template-columns: 30px 1fr auto; gap: 12px; align-items: start; width: 100%; text-align: left;
    background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 12px 14px; cursor: pointer;
  }
  .op-row:hover { border-color: var(--accent); }
  .op-row .rk { font-family: var(--font-display); font-size: 15px; font-weight: 700; color: var(--accent-ink); }
  .op-row .acct { font-weight: 700; font-size: 13.5px; display: flex; align-items: center; gap: 7px; }
  .op-row .play { font-size: 13px; margin-top: 3px; }
  .op-row .why { color: var(--ink-faint); font-size: 12px; margin-top: 4px; }
  .op-row .size { font-family: var(--font-display); font-weight: 600; font-size: 12px; color: var(--ink-dim); white-space: nowrap; }

  .rich p { margin: 0 0 8px; }
  .rich p:last-child { margin-bottom: 0; }
  .rich ol { margin: 4px 0 0; padding-left: 20px; }
  .rich li { margin: 5px 0; }
  .rich .cite { font-family: var(--font-mono); font-size: 11px; color: var(--ink-faint); background: var(--surface-2); padding: 1px 4px; border-radius: 4px; }

  .filterchip {
    font-family: var(--font-display); font-size: 11.5px; font-weight: 600; padding: 5px 12px; border-radius: 999px;
    border: 1px solid var(--border); background: var(--surface); color: var(--ink-dim); cursor: pointer;
  }
  .filterchip[aria-pressed="true"] { background: var(--ink); color: var(--bg); border-color: var(--ink); }
  .filterchip .sdot { width: 7px; height: 7px; border-radius: 2px; display: inline-block; margin-right: 5px; }

  .cust-grid { display: grid; grid-template-columns: 280px 1fr; gap: 16px; align-items: start; }
  @media (max-width: 780px) { .cust-grid { grid-template-columns: 1fr; } }
  .cust-list { display: flex; flex-direction: column; gap: 2px; max-height: 640px; overflow-y: auto; }
  .cust-qgroup-h { font-family: var(--font-display); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--ink-faint); padding: 10px 6px 4px; }
  .cust-row {
    display: flex; align-items: center; gap: 8px; width: 100%; text-align: left; padding: 7px 8px;
    border-radius: 8px; cursor: pointer; background: none; border: none; font-family: var(--font-body);
  }
  .cust-row:hover { background: var(--surface-2); }
  .cust-row[aria-current="true"] { background: var(--accent-soft); }
  .cust-row .sdot { width: 8px; height: 8px; border-radius: 3px; flex: none; }
  .cust-row .rn { font-size: 13px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }
  .cust-row .rarr { font-family: var(--font-display); font-size: 11px; color: var(--ink-faint); flex: none; }

  .dossier .seg-pill { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-display); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em; color: var(--ink-dim); }
  .dossier h2 { font-family: var(--font-display); font-size: 21px; font-weight: 700; margin: 6px 0 2px; }
  .dossier .full { color: var(--ink-faint); font-size: 12.5px; }
  .dossier .badges { display: flex; flex-wrap: wrap; gap: 7px; margin: 12px 0 0; }
  .dossier .field { margin-top: 18px; }
  .dossier .field .fl { font-family: var(--font-display); font-weight: 700; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent-ink); margin-bottom: 6px; }
  .playc { border: 1px solid var(--border); border-radius: 10px; padding: 11px 14px; margin-bottom: 8px; border-left: 3px solid var(--ink-faint); }
  .playc.hi { border-left-color: var(--accent); }
  .playc.medium { border-left-color: var(--warn); }
  .playc .ph { display: flex; justify-content: space-between; gap: 10px; align-items: baseline; }
  .playc .pn { font-weight: 700; font-size: 13px; }
  .fitbadge { font-family: var(--font-display); font-size: 10px; font-weight: 700; text-transform: uppercase; padding: 2px 8px; border-radius: 999px; }
  .fitbadge.hi { background: var(--accent-soft); color: var(--accent-ink); }
  .fitbadge.medium { background: var(--warn-soft); color: var(--warn); }
  .fitbadge.lo, .fitbadge.unrated { background: var(--surface-2); color: var(--ink-faint); }
  .playc .pr { color: var(--ink-dim); font-size: 12.5px; margin-top: 5px; }
  .srcchips { display: flex; flex-wrap: wrap; gap: 6px; }
  .srcchips .s { font-family: var(--font-mono); font-size: 10.5px; color: var(--ink-faint); background: var(--surface-2); padding: 3px 8px; border-radius: 6px; }

  .sfpanel { margin-top: 16px; border: 1px solid var(--accent); border-radius: 10px; background: var(--accent-soft); padding: 14px 16px; }
  .sfpanel .sfhead { font-family: var(--font-display); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent-ink); margin-bottom: 10px; }
  .sfgrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px 16px; }
  .sfgrid .k { font-family: var(--font-display); font-size: 9px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--ink-faint); }
  .sfgrid .v { font-size: 14px; font-weight: 700; font-variant-numeric: tabular-nums; }
  .rflags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
  .rflag { font-family: var(--font-display); font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 999px; background: var(--warn-soft); color: var(--warn); }

  .theme-bars { display: flex; flex-direction: column; gap: 9px; }
  .theme-bar { display: grid; grid-template-columns: 260px 1fr auto; gap: 10px; align-items: center; }
  .theme-bar .tb-label { font-size: 12.5px; color: var(--ink-dim); }
  .theme-bar .tb-track { height: 7px; background: var(--surface-2); border-radius: 99px; overflow: hidden; }
  .theme-bar .tb-fill { height: 100%; background: var(--accent); border-radius: 99px; }
  .theme-bar .tb-count { font-family: var(--font-display); font-size: 11.5px; color: var(--ink-faint); }
  @media (max-width: 640px) { .theme-bar { grid-template-columns: 1fr; } }

  .tiergroup { margin: 22px 0 4px; }
  .tiergroup-h { display: flex; align-items: baseline; gap: 10px; margin-bottom: 3px; flex-wrap: wrap; }
  .tiergroup-h .tn { font-family: var(--font-display); font-weight: 800; font-size: 11px; text-transform: uppercase; }
  .tiergroup-h .tc { font-family: var(--font-display); font-size: 11px; color: var(--ink-faint); margin-left: auto; }
  .tiergroup-d { color: var(--ink-faint); font-size: 12.5px; margin: 2px 0 10px; }

  .arow {
    display: grid; grid-template-columns: 1fr auto; gap: 12px; width: 100%; text-align: left; align-items: start;
    background: var(--surface); border: 1px solid var(--border); border-left: 3px solid var(--ink-faint);
    border-radius: 10px; padding: 11px 14px; margin-bottom: 7px; cursor: pointer;
  }
  .arow.t1 { border-left-color: var(--accent); }
  .arow.t2 { border-left-color: var(--warn); }
  .arow:hover { border-color: var(--accent); }
  .arow .acct { font-weight: 700; font-size: 13.5px; display: flex; align-items: center; gap: 7px; flex-wrap: wrap; }
  .arow .ask { font-size: 12.5px; margin-top: 4px; }
  .arow .ev { color: var(--ink-faint); font-size: 11.5px; margin-top: 5px; }
  .arow .rt { text-align: right; white-space: nowrap; font-family: var(--font-display); font-weight: 600; font-size: 11.5px; color: var(--ink-dim); }
  .gongbadge { font-family: var(--font-display); font-size: 9px; font-weight: 700; text-transform: uppercase; padding: 2px 7px; border-radius: 999px; margin-left: 6px; }
  .gongbadge.strong { background: var(--accent-soft); color: var(--accent-ink); }
  .gongbadge.moderate { background: var(--warn-soft); color: var(--warn); }
  .gongbadge.weak, .gongbadge.none { background: var(--surface-2); color: var(--ink-faint); }

  .pricegrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; }
  .pricecard { border: 1px solid var(--border); border-radius: 10px; background: var(--surface); padding: 12px 14px; }
  .pricecard .pn { font-weight: 700; font-size: 13px; }
  .pricecard .ps { color: var(--ink-faint); font-size: 12px; margin-top: 5px; }
  .pricecard .pp { font-family: var(--font-display); font-weight: 700; font-size: 15px; color: var(--accent-ink); margin-top: 8px; }
  .measurec { border: 1px solid var(--border); border-radius: 10px; background: var(--surface); padding: 12px 14px; margin-bottom: 8px; }
  .measurec .mn { font-weight: 700; font-size: 13px; margin-bottom: 5px; }
  .measurec .mq { font-style: italic; font-size: 12.5px; }
  .measurec .mt { color: var(--ink-dim); font-size: 12px; margin-top: 6px; }
  .backbtn { display: none; }
  body.detail-open .backbtn { display: inline-block; margin-bottom: 12px; }

  /* ---------- clinical connect ---------- */
  .cc-account { display: flex; flex-direction: column; gap: 14px; }
  .cc-head { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; }
  .cc-head h2 { font-family: var(--font-display); font-size: 19px; font-weight: 700; margin: 0; }
  .cc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  @media (max-width: 780px) { .cc-grid { grid-template-columns: 1fr; } }
  .cc-bucket { border: 1px solid var(--border); border-radius: 10px; padding: 13px 15px; border-left: 3px solid var(--ink-faint); background: var(--surface); }
  .cc-bucket.good { border-left-color: var(--accent); }
  .cc-bucket.bad { border-left-color: var(--bad); }
  .cc-bucket-h { font-family: var(--font-display); font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--ink-dim); margin: 0 0 8px; }
  .cc-bucket.good .cc-bucket-h { color: var(--accent-ink); }
  .cc-bucket.bad .cc-bucket-h { color: var(--bad); }
  .cc-empty { color: var(--ink-faint); font-size: 12.5px; }

  /* ---------- L10 ---------- */
  .l10-top { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
  .l10-top label { font-family: var(--font-display); font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--ink-faint); display: block; margin-bottom: 4px; }
  .l10-top input[type="text"] { min-width: 160px; }
  .l10-subnav { display: flex; gap: 6px; flex-wrap: wrap; }
  .l10-subnav button { font-family: var(--font-display); font-size: 12.5px; font-weight: 700; padding: 7px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--ink-dim); cursor: pointer; }
  .l10-subnav button.active { background: var(--accent-soft); color: var(--accent-ink); border-color: var(--accent); }
  .l10-section { display: none; flex-direction: column; gap: 14px; }
  .l10-section.active { display: flex; }
  .l10-row { display: grid; grid-template-columns: 1fr auto auto; gap: 12px; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--border); }
  .l10-row:last-child { border-bottom: none; }
  .l10-row .l10-name { font-weight: 700; font-size: 13.5px; }
  .l10-row .l10-meta { color: var(--ink-dim); font-size: 12px; margin-top: 2px; }
  .l10-owner { font-family: var(--font-mono); font-size: 11px; color: var(--ink-faint); white-space: nowrap; }
  .l10-toggle { display: inline-flex; border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
  .l10-toggle button { border: none; background: var(--surface); padding: 6px 12px; font-size: 12px; font-weight: 700; color: var(--ink-faint); cursor: pointer; }
  .l10-toggle button.on-ok.sel { background: var(--accent); color: #06322F; }
  .l10-toggle button.on-off.sel { background: var(--bad); color: #fff; }
  .l10-live-link { font-size: 11.5px; color: var(--accent-ink); cursor: pointer; background: none; border: none; padding: 0; font-weight: 700; }
  .l10-live { font-size: 12px; color: var(--ink-dim); background: var(--surface-2); border-radius: 8px; padding: 8px 10px; margin-top: 6px; }
  .l10-issue { border: 1px solid var(--border); border-radius: 10px; margin-bottom: 10px; background: var(--surface); overflow: hidden; }
  .l10-issue.solved { opacity: 0.6; }
  .l10-issue.struck { opacity: 0.45; }
  .l10-issue-head { display: grid; grid-template-columns: auto 1fr auto; gap: 12px; align-items: center; padding: 12px 14px; }
  .l10-rank { display: flex; flex-direction: column; align-items: center; gap: 2px; }
  .l10-rank select { font-family: var(--font-mono); font-size: 12px; font-weight: 700; border: 1px solid var(--border); border-radius: 6px; padding: 3px 4px; background: var(--surface); color: var(--ink); }
  .l10-issue-title { font-weight: 700; font-size: 14px; }
  .l10-issue-title.struck-through { text-decoration: line-through; }
  .l10-issue-meta { color: var(--ink-faint); font-size: 12px; margin-top: 3px; display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
  .l10-ids-body { border-top: 1px dashed var(--border); padding: 12px 14px; background: var(--surface-2); display: grid; gap: 10px; }
  .l10-ids-body label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--ink-faint); display: block; margin-bottom: 4px; }
  .l10-ids-body textarea { width: 100%; border: 1px solid var(--border); border-radius: 8px; padding: 8px; min-height: 52px; resize: vertical; font-family: var(--font-body); font-size: 13px; background: var(--surface); color: var(--ink); }
  .l10-solverow { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
  .l10-solverow input[type="text"] { flex: 1; min-width: 200px; }
  .l10-divider { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; margin: 2px 0 12px; padding: 7px 12px; border-radius: 8px; background: var(--accent-soft); border: 1px dashed var(--accent); font-size: 11.5px; }
  .l10-divider b { font-family: var(--font-display); text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent-ink); }
  .l10-todo { display: grid; grid-template-columns: auto 1fr auto; gap: 11px; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--border); }
  .l10-todo:last-child { border-bottom: none; }
  .l10-check { width: 22px; height: 22px; border-radius: 6px; border: 1.5px solid var(--border); background: var(--surface); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 13px; cursor: pointer; }
  .l10-check.done { background: var(--accent); border-color: var(--accent); }
  .l10-todo-text.done { text-decoration: line-through; color: var(--ink-faint); }
  .l10-scoreset { display: flex; gap: 3px; flex-wrap: wrap; }
  .l10-scoreset button { width: 28px; height: 28px; border: 1px solid var(--border); background: var(--surface); border-radius: 7px; font-family: var(--font-mono); font-weight: 700; font-size: 12px; color: var(--ink-faint); cursor: pointer; }
  .l10-scoreset button.sel { background: var(--accent); color: #06322F; border-color: var(--accent); }
  .l10-avg { font-family: var(--font-display); font-size: 32px; font-weight: 800; color: var(--accent-ink); }
  .l10-recap { width: 100%; min-height: 180px; border: 1px solid var(--border); border-radius: 10px; padding: 12px; font-family: var(--font-mono); font-size: 12px; background: var(--surface-2); color: var(--ink); white-space: pre-wrap; }
  .l10-warn { background: var(--warn-soft); color: var(--warn); border-radius: 8px; padding: 8px 10px; font-size: 12px; }
`;

function renderNav(active: NavId): string {
  return NAV_ITEMS.map((item) => {
    const cls = item.id === active ? "active" : "";
    return `<a class="${cls}" data-tab="${item.id}" href="${item.href}">${item.label}</a>`;
  }).join("\n    ");
}

export interface RenderPageOptions {
  active: NavId;
  /** Page <title> — the masthead heading stays constant across pages. */
  title: string;
  /** Inner markup for this tab's <div class="page-body">...</div>. */
  body: string;
  /** This tab's own client JS, wrapped by this function in a `(function(){"use strict"; ... }());` IIFE. */
  script: string;
}

/**
 * Wraps one tab's body + script with the shared head/CSS/nav. Every
 * /dashboard/<tab> route calls this once. `body` and `script` are markup and
 * JS this codebase wrote (page structure + DOM-building logic) — never raw
 * external-system content, which client-side code must still insert via
 * textContent / renderRichHtml (see shared.ts), same rule the old
 * single-file dashboard followed.
 */
export function renderPage(opts: RenderPageOptions): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${opts.title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@500;600;700;800&family=Nunito+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
<style>${PAGE_STYLE}</style>
</head>
<body>
<div class="page">

  <header class="masthead">
    <h1>Clearinghouse dashboard</h1>
    <p>Pipeline overview, deal lookup, pipeline-pulse review, the CMS-0057 portfolio, and roster/audit — the same data as the Claude connector, browsed directly.</p>
  </header>

  <nav class="tabs">
    ${renderNav(opts.active)}
  </nav>

  <div class="page-body">
${opts.body}
  </div>

</div>
<script>
(function () {
  "use strict";
${opts.script}
}());
</script>
</body>
</html>
`;
}
