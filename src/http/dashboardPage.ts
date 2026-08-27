/**
 * Single self-contained page for /dashboard — vanilla JS, no build step, no
 * dependency beyond what the browser already has. Every value that came from
 * an external system (deal descriptions, Slack messages, Gong titles, roster
 * names) is inserted with textContent, never innerHTML, since it's untrusted
 * free text same as it is everywhere else in this codebase.
 */
export const DASHBOARD_HTML = String.raw`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Clearinghouse dashboard</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@500;600;700;800&family=Nunito+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
<style>
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
  nav.tabs button {
    font-family: var(--font-display); font-size: 13px; font-weight: 600; letter-spacing: 0.01em;
    background: none; border: none; color: var(--ink-faint); cursor: pointer;
    padding: 10px 4px; border-bottom: 2px solid transparent; margin-bottom: -1px;
  }
  nav.tabs button.active { color: var(--accent-ink); border-bottom-color: var(--accent); }
  .panel { display: none; flex-direction: column; gap: 16px; }
  .panel.active { display: flex; }
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
</style>
</head>
<body>
<div class="page">

  <header class="masthead">
    <h1>Clearinghouse dashboard</h1>
    <p>Pipeline overview, deal lookup, pipeline-pulse review, the CMS-0057 portfolio, and roster/audit — the same data as the Claude connector, browsed directly.</p>
  </header>

  <nav class="tabs">
    <button data-tab="overview" class="active">Overview</button>
    <button data-tab="lookup">Deal lookup</button>
    <button data-tab="activity">Recent activity</button>
    <button data-tab="coverage">Coverage check</button>
    <button data-tab="pulse">Pipeline-pulse</button>
    <button data-tab="portfolio">Portfolio</button>
    <button data-tab="customers">Customers</button>
    <button data-tab="analytics">Analytics fit</button>
    <button data-tab="clinicalconnect">Clinical Connect</button>
    <button data-tab="admin">Admin &amp; audit</button>
  </nav>

  <section class="panel active" id="panel-overview">
    <div class="card">
      <div class="row">
        <select id="filterSalesRep"><option value="">All sales reps</option></select>
        <select id="filterCsm"><option value="">All CSMs</option></select>
        <select id="filterImplementationManager"><option value="">All implementation managers</option></select>
        <button class="action" id="filterClearBtn">Clear</button>
      </div>
    </div>
    <div id="overviewRoot"></div>
  </section>

  <section class="panel" id="panel-lookup">
    <div class="card">
      <div class="row">
        <input type="text" id="dealQuery" placeholder="Search a deal or account, e.g. &quot;MMM&quot;" />
        <button class="action" id="dealSearchBtn">Search</button>
      </div>
      <p class="hint">Same fuzzy match as find_deal.</p>
    </div>
    <div class="card" id="dealResultsCard" style="display:none">
      <p class="section-label">Matches</p>
      <table><tbody id="dealResultsBody"></tbody></table>
    </div>
    <div class="card" id="dealDetailCard" style="display:none"></div>
  </section>

  <section class="panel" id="panel-activity">
    <div class="card">
      <div class="row">
        <input type="text" id="activityOwner" placeholder="Filter by owner, e.g. &quot;Dana&quot; (optional)" />
        <input type="text" id="activityDays" value="14" style="max-width:90px" />
        <button class="action" id="activityRunBtn">Show recent activity</button>
      </div>
      <p class="hint">Days back that counts as "recent." No deal Id needed — this is recent_activity across every deal (or one owner's).</p>
    </div>
    <div class="card" id="activityResultsCard" style="display:none"></div>
  </section>

  <section class="panel" id="panel-coverage">
    <div class="card">
      <div class="row">
        <input type="text" id="coverageOwner" placeholder="Filter by owner, e.g. &quot;Dana&quot; (optional)" />
        <button class="action" id="coverageRunBtn">Run coverage check</button>
      </div>
      <p class="hint">Open deals only. Flags: no Slack activity synced, no next step, no Gong call on file.</p>
    </div>
    <div class="card" id="coverageResultsCard" style="display:none"></div>
  </section>

  <section class="panel" id="panel-pulse">
    <div class="card">
      <div class="row">
        <button class="action" id="pulseRunBtn">Run pipeline-pulse (dry run)</button>
        <span class="hint">Always dry-run from here — nothing is ever written to Planhat by this button.</span>
      </div>
    </div>
    <div class="card" id="pulseResultsCard" style="display:none"></div>
  </section>

  <section class="panel" id="panel-portfolio">
    <div class="card">
      <p class="section-label">CMS-0057 portfolio — static research, not live</p>
      <p class="hint" id="portfolioPulledHint"></p>
    </div>
    <div class="tiles" id="portfolioTiles"></div>
    <div class="riskstrip" id="portfolioRiskStrip"></div>
    <div class="card" id="portfolioRiskDetailCard" style="display:none"></div>
    <div class="card">
      <p class="section-label">Top expansion opportunities</p>
      <div id="portfolioOps"></div>
    </div>
    <div class="card">
      <p class="section-label">Portfolio briefing</p>
      <div class="rich" id="portfolioBriefing"></div>
    </div>
  </section>

  <section class="panel" id="panel-customers">
    <div class="card">
      <div class="row">
        <input type="text" id="custQuery" placeholder="Search 43 customers…" />
      </div>
      <div class="row" id="custSegChips" style="margin-top:10px; flex-wrap:wrap"></div>
      <div class="row" id="custQuarterChips" style="margin-top:6px; flex-wrap:wrap"></div>
      <p class="hint" id="custCount"></p>
    </div>
    <div class="cust-grid">
      <div class="card cust-list" id="custList"></div>
      <div class="card dossier" id="custDossier">
        <p class="empty">Select a customer to open its research dossier.</p>
      </div>
    </div>
  </section>

  <section class="panel" id="panel-analytics">
    <div class="card">
      <p class="section-label">Analytics fit — Gong-sourced demand signal</p>
      <p class="hint" id="analyticsMetaHint"></p>
    </div>
    <div class="tiles" id="analyticsTiles"></div>
    <div class="card">
      <p class="section-label">What customers are asking for</p>
      <div class="theme-bars" id="analyticsThemes"></div>
    </div>
    <div class="card" id="themeDetailCard" style="display:none"></div>
    <div class="card">
      <p class="section-label">Ranked fit — all accounts</p>
      <div id="analyticsTiers"></div>
    </div>
    <div class="card">
      <p class="section-label">Proposed product — Project Prism</p>
      <p class="hint" id="prismPitch"></p>
      <div class="pricegrid" id="prismPricing" style="margin-top:12px"></div>
      <div id="prismMeasures" style="margin-top:12px"></div>
    </div>
    <div class="card">
      <p class="section-label">Closing the gaps</p>
      <div id="gapsRoot"></div>
    </div>
  </section>

  <section class="panel" id="panel-clinicalconnect">
    <div class="card">
      <p class="section-label">Clinical Connect customers</p>
      <p class="hint">Fallon, Capital Health Plan, Viva Health, Zing Health — what's going well, what isn't, recent meetings, and customer insights. Research fields are static (point-in-time); meetings and Slack activity are live reads.</p>
    </div>
    <div id="ccRoot"></div>
  </section>

  <section class="panel" id="panel-admin">
    <div class="card">
      <p class="section-label">Roster (roster.json)</p>
      <table><thead><tr><th>Email</th><th>Name</th></tr></thead><tbody id="rosterBody"></tbody></table>
    </div>
    <div class="card">
      <div class="row" style="justify-content: space-between">
        <p class="section-label" style="margin:0">Recent audit events</p>
        <button class="action" id="auditRefreshBtn">Refresh</button>
      </div>
      <p class="hint">Live tail only, most-recent-first, lost on server restart — the durable trail is Cloud Logging.</p>
      <table>
        <thead><tr><th>Time</th><th>Actor</th><th>Tool</th><th>Systems</th><th>Outcome</th><th>ms</th></tr></thead>
        <tbody id="auditBody"></tbody>
      </table>
    </div>
  </section>

</div>

<script>
(function () {
  "use strict";

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    for (var k in (attrs || {})) {
      if (k === "class") node.className = attrs[k];
      else node.setAttribute(k, attrs[k]);
    }
    (children || []).forEach(function (c) {
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function td(text) { return el("td", {}, [String(text === null || text === undefined || text === "" ? "—" : text)]); }

  function money(n) {
    if (n === null || n === undefined) return "—";
    return "$" + Math.round(n).toLocaleString();
  }

  /** A KPI tile with an optional muted explainer line (opts.sub) and an optional click-through (opts.onClick). */
  function kpiTile(value, label, opts) {
    opts = opts || {};
    var cls = "kpi-tile" + (opts.tone ? " tone-" + opts.tone : "") + (opts.onClick ? " clickable-row" : "");
    var children = [
      el("span", { class: "value" }, [value]),
      el("span", { class: "label" }, [label]),
    ];
    if (opts.sub) children.push(el("span", { class: "sub" }, [opts.sub]));
    var tile = el("div", { class: cls }, children);
    if (opts.onClick) tile.addEventListener("click", opts.onClick);
    return tile;
  }

  // ---------- overview ----------
  function currentFilters() {
    return {
      salesRep: document.getElementById("filterSalesRep").value,
      csm: document.getElementById("filterCsm").value,
      implementationManager: document.getElementById("filterImplementationManager").value,
    };
  }

  function loadOverview() {
    var f = currentFilters();
    var params = [];
    if (f.salesRep) params.push("salesRep=" + encodeURIComponent(f.salesRep));
    if (f.csm) params.push("csm=" + encodeURIComponent(f.csm));
    if (f.implementationManager) params.push("implementationManager=" + encodeURIComponent(f.implementationManager));
    var url = "/dashboard/api/overview" + (params.length ? "?" + params.join("&") : "");
    fetch(url).then(function (r) { return r.json(); }).then(function (o) {
      populateFilterOptions(o.filterOptions);
      renderOverview(o);
    });
  }

  function populateFilterOptions(opts) {
    [
      ["filterSalesRep", opts.salesReps],
      ["filterCsm", opts.csms],
      ["filterImplementationManager", opts.implementationManagers],
    ].forEach(function (pair) {
      var select = document.getElementById(pair[0]);
      var current = select.value;
      var placeholder = select.options[0];
      select.innerHTML = "";
      select.appendChild(placeholder);
      pair[1].forEach(function (name) {
        select.appendChild(el("option", { value: name }, [name]));
      });
      select.value = current;
    });
  }

  ["filterSalesRep", "filterCsm", "filterImplementationManager"].forEach(function (id) {
    document.getElementById(id).addEventListener("change", loadOverview);
  });
  document.getElementById("filterClearBtn").addEventListener("click", function () {
    document.getElementById("filterSalesRep").value = "";
    document.getElementById("filterCsm").value = "";
    document.getElementById("filterImplementationManager").value = "";
    loadOverview();
  });

  function renderOverview(o) {
    var root = document.getElementById("overviewRoot");
    root.innerHTML = "";
    root.style.display = "flex";
    root.style.flexDirection = "column";
    root.style.gap = "20px";

    // ---- inline "show me the deals/accounts behind this number" panel ----
    var detailCard = el("div", { class: "card", style: "display:none" }, []);

    function openDetailCard(title) {
      detailCard.innerHTML = "";
      detailCard.style.display = "block";
      var closeBtn = el("button", { class: "action" }, ["Close"]);
      closeBtn.addEventListener("click", function () { detailCard.style.display = "none"; });
      detailCard.appendChild(el("div", { class: "row", style: "justify-content:space-between; align-items:baseline; margin-bottom:10px" }, [
        el("p", { class: "section-label", style: "margin:0" }, [title]),
        closeBtn,
      ]));
      return detailCard;
    }

    function showDealsList(list, title) {
      var card = openDetailCard(title + " — " + list.length + " deal(s)");
      if (list.length === 0) {
        card.appendChild(el("p", { class: "empty" }, ["No deals in this slice."]));
      } else {
        var table = el("table", {}, [
          el("thead", {}, [el("tr", {}, [el("th", {}, ["Deal"]), el("th", {}, ["Account"]), el("th", {}, ["Stage"]), el("th", {}, ["Owner"]), el("th", {}, ["Amount"])])]),
        ]);
        var tbody = el("tbody", {}, []);
        list.forEach(function (d) {
          var tr = el("tr", { class: "clickable-row" }, [td(d.name), td(d.account), td(d.stage), td(d.owner), td(money(d.amount))]);
          tr.addEventListener("click", function () { goToDeal(d.id); });
          tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        card.appendChild(table);
      }
      card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    function showAccountsList(list, title) {
      var card = openDetailCard(title + " — " + list.length + " account(s)");
      if (list.length === 0) {
        card.appendChild(el("p", { class: "empty" }, ["No accounts in this slice."]));
      } else {
        var table = el("table", {}, [el("thead", {}, [el("tr", {}, [el("th", {}, ["Account"]), el("th", {}, ["Health"])])])]);
        var tbody = el("tbody", {}, []);
        list.forEach(function (c) {
          var tr = el("tr", { class: "clickable-row" }, [td(c.name), td(c.healthScore === null ? "—" : c.healthScore + " / 10")]);
          tr.addEventListener("click", function () { goToAccountByName(c.name); });
          tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        card.appendChild(table);
      }
      card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    // KPI row -- every tile is clickable through to the deals/accounts behind its number.
    var kpis = el("div", { class: "kpi-row" }, [
      kpiTile(money(o.pipeline.openPipelineAmount), "Open pipeline", {
        onClick: function () { showDealsList(o.pipeline.deals, "Open pipeline"); },
      }),
      kpiTile(String(o.pipeline.openDealCount), "Open deals", {
        onClick: function () { showDealsList(o.pipeline.deals, "Open deals"); },
      }),
      kpiTile(money(o.pipeline.newSales.amount), "New sales (" + o.pipeline.newSales.count + ")", {
        onClick: function () {
          showDealsList(o.pipeline.deals.filter(function (d) { return d.category === "new_sales"; }), "New sales");
        },
      }),
      kpiTile(money(o.pipeline.upsell.amount), "Upsell (" + o.pipeline.upsell.count + ")", {
        onClick: function () {
          showDealsList(o.pipeline.deals.filter(function (d) { return d.category === "upsell"; }), "Upsell");
        },
      }),
      kpiTile(money(o.pipeline.renewal.amount), "Renewal (" + o.pipeline.renewal.count + ")", {
        onClick: function () {
          showDealsList(o.pipeline.deals.filter(function (d) { return d.category === "renewal"; }), "Renewal");
        },
      }),
      kpiTile(String(o.fictions.totalCount), "Fictions flagged", {
        tone: o.fictions.totalCount > 0 ? "warn" : null,
        sub: "Deals that look fine in Salesforce but probably aren't",
        onClick: function () { activateTab("pulse"); document.getElementById("pulseRunBtn").click(); },
      }),
      kpiTile(String(o.coverage.flaggedCount) + " / " + String(o.coverage.scannedCount), "Coverage gaps", {
        tone: o.coverage.flaggedCount > 0 ? "warn" : null,
        sub: "Open deals missing Slack activity, a next step, or a Gong call",
        onClick: function () { activateTab("coverage"); document.getElementById("coverageRunBtn").click(); },
      }),
      kpiTile(String(o.customerHealth.atRiskCount), "At-risk customers", {
        tone: o.customerHealth.atRiskCount > 0 ? "bad" : null,
        sub: "Planhat health score below 5 out of 10",
        onClick: function () { showAccountsList(o.customerHealth.atRiskCompanies, "At-risk customers"); },
      }),
    ]);
    root.appendChild(kpis);
    root.appendChild(detailCard);

    var grid = el("div", { class: "overview-grid" }, []);

    // left column: pipeline by stage + attention needed
    var leftCol = el("div", { style: "display:flex; flex-direction:column; gap:16px" }, []);

    var stageCard = el("div", { class: "card" }, [el("p", { class: "section-label" }, ["Open pipeline by stage"])]);
    if (o.pipeline.byStage.length === 0) {
      stageCard.appendChild(el("p", { class: "empty" }, ["No open deals."]));
    } else {
      var maxAmount = Math.max.apply(null, o.pipeline.byStage.map(function (s) { return s.amount; }));
      o.pipeline.byStage.forEach(function (s) {
        var pct = maxAmount > 0 ? Math.max(4, Math.round((s.amount / maxAmount) * 100)) : 0;
        var row = el("div", { class: "bar-row clickable-row" }, [
          el("span", { class: "bar-label" }, [s.stage + " (" + s.count + ")"]),
          el("div", { class: "bar-track" }, [el("div", { class: "bar-fill", style: "width:" + pct + "%" }, [])]),
          el("span", { class: "bar-value" }, [money(s.amount)]),
        ]);
        row.addEventListener("click", function () {
          showDealsList(o.pipeline.deals.filter(function (d) { return d.stage === s.stage; }), s.stage);
        });
        stageCard.appendChild(row);
      });
    }
    leftCol.appendChild(stageCard);

    var attentionCard = el("div", { class: "card" }, [el("p", { class: "section-label" }, ["Needs attention"])]);
    if (o.fictions.top.length === 0) {
      attentionCard.appendChild(el("p", { class: "empty" }, ["Nothing flagged in the last scan."]));
    } else {
      o.fictions.top.forEach(function (f) {
        var item = el("div", { class: "attention-item clickable-row" }, [
          el("span", { class: "badge severity-" + f.severity }, [f.severity]),
          el("span", {}, [f.summary]),
        ]);
        item.addEventListener("click", function () {
          if (f.salesforceOpportunityId) goToDeal(f.salesforceOpportunityId);
          else goToAccountByName(f.accountName);
        });
        attentionCard.appendChild(item);
      });
    }
    leftCol.appendChild(attentionCard);
    grid.appendChild(leftCol);

    // right column: fictions by severity + upcoming renewals
    var rightCol = el("div", { style: "display:flex; flex-direction:column; gap:16px" }, []);

    var sevCard = el("div", { class: "card" }, [
      el("p", { class: "section-label" }, ["Fictions by severity"]),
      el("p", { class: "hint", style: "margin:-4px 0 10px" }, [
        "A “fiction” is pipeline data that looks fine on the surface but probably isn’t: a Planhat expansion signal with no real activity behind it, a renewal coming due with nothing tracking it in Salesforce, or a late-stage deal that’s gone quiet everywhere. Severity is how urgent each one is — see the Pipeline-pulse tab for the actual list.",
      ]),
    ]);
    function severityTile(cls, count, label) {
      var tile = el("div", { class: "severity-tile clickable-row " + cls }, [
        el("span", { class: "count" }, [String(count)]), el("span", { class: "label" }, [label]),
      ]);
      tile.addEventListener("click", function () {
        activateTab("pulse");
        document.getElementById("pulseRunBtn").click();
      });
      return tile;
    }
    var sevRow = el("div", { class: "severity-tiles" }, [
      severityTile("high", o.fictions.bySeverity.high, "High"),
      severityTile("medium", o.fictions.bySeverity.medium, "Medium"),
      severityTile("low", o.fictions.bySeverity.low, "Low"),
    ]);
    sevCard.appendChild(sevRow);
    rightCol.appendChild(sevCard);

    var renewalCard = el("div", { class: "card" }, [el("p", { class: "section-label" }, ["Upcoming renewals"])]);
    if (o.upcomingRenewals.length === 0) {
      renewalCard.appendChild(el("p", { class: "empty" }, ["No renewal dates on file."]));
    } else {
      var table = el("table", {}, [
        el("thead", {}, [el("tr", {}, [el("th", {}, ["Company"]), el("th", {}, ["Renewal"]), el("th", {}, ["Days"]), el("th", {}, ["ARR"])])]),
      ]);
      var tbody = el("tbody", {}, []);
      o.upcomingRenewals.forEach(function (r) {
        var overdue = r.daysUntil < 0;
        var daysLabel = overdue ? (Math.abs(r.daysUntil) + " overdue") : (r.daysUntil + " left");
        var cls = "renewal-row clickable-row" + (overdue ? " overdue" : "");
        var tr = el("tr", { class: cls }, [
          td(r.name), td(r.renewalDate), td(daysLabel), td(money(r.arr)),
        ]);
        tr.addEventListener("click", function () { goToAccountByName(r.name); });
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      renewalCard.appendChild(table);
    }
    rightCol.appendChild(renewalCard);

    var healthCard = el("div", { class: "card" }, [el("p", { class: "section-label" }, ["Customer health"])]);
    healthCard.appendChild(el("p", { class: "hint" }, [
      "Average health: " + (o.customerHealth.averageHealth === null ? "—" : o.customerHealth.averageHealth.toFixed(1) + " / 10"),
    ]));
    if (o.customerHealth.atRiskCompanies.length === 0) {
      healthCard.appendChild(el("p", { class: "empty" }, ["No at-risk accounts in scope."]));
    } else {
      o.customerHealth.atRiskCompanies.forEach(function (c) {
        var line = el("div", { class: "msg-line clickable-row" }, [
          el("span", { class: "from" }, [c.name]),
          el("span", {}, ["health " + (c.healthScore === null ? "—" : c.healthScore) + " / 10"]),
        ]);
        line.addEventListener("click", function () { goToAccountByName(c.name); });
        healthCard.appendChild(line);
      });
    }
    rightCol.appendChild(healthCard);

    var activityCard = el("div", { class: "card" }, [el("p", { class: "section-label" }, ["Slack activity, last " + o.activity.windowDays + " days"])]);
    if (o.activity.byAccount.length === 0) {
      activityCard.appendChild(el("p", { class: "empty" }, ["No accounts in scope."]));
    } else {
      var maxMsgs = Math.max.apply(null, o.activity.byAccount.map(function (a) { return a.messageCount; }));
      o.activity.byAccount.forEach(function (a) {
        var pct = maxMsgs > 0 ? Math.max(4, Math.round((a.messageCount / maxMsgs) * 100)) : 0;
        var row = el("div", { class: "bar-row clickable-row" }, [
          el("span", { class: "bar-label" }, [a.accountName]),
          el("div", { class: "bar-track" }, [el("div", { class: "bar-fill", style: "width:" + pct + "%" }, [])]),
          el("span", { class: "bar-value" }, [String(a.messageCount)]),
        ]);
        row.addEventListener("click", function () { goToAccountByName(a.accountName); });
        activityCard.appendChild(row);
      });
    }
    rightCol.appendChild(activityCard);

    grid.appendChild(rightCol);

    root.appendChild(grid);
  }

  // ---------- tabs ----------
  var tabButtons = document.querySelectorAll("nav.tabs button");
  var tabLoaders = {
    portfolio: function () { loadPortfolioSummary(); },
    customers: function () { loadPortfolioSummary(); },
    analytics: function () { loadAnalyticsFit(); },
    clinicalconnect: function () { loadClinicalConnect(); },
  };

  /** Each loader below caches its fetch, so revisiting a tab re-renders (picking up any filter/selection change) without a repeat network call. */
  function activateTab(tabId) {
    tabButtons.forEach(function (b) { b.classList.remove("active"); });
    document.querySelectorAll(".panel").forEach(function (p) { p.classList.remove("active"); });
    document.querySelector('nav.tabs button[data-tab="' + tabId + '"]').classList.add("active");
    document.getElementById("panel-" + tabId).classList.add("active");
    if (tabLoaders[tabId]) tabLoaders[tabId]();
  }

  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () { activateTab(btn.dataset.tab); });
  });

  /** Universal drill-through: jump to Deal lookup and load a real opportunity by Id. */
  function goToDeal(id) {
    if (!id) return;
    activateTab("lookup");
    loadDeal(id);
  }

  /**
   * Universal drill-through by account name, used everywhere a row only
   * carries a name (not a Salesforce Id): opens the portfolio dossier if
   * this account has one, otherwise runs a real Deal lookup search on the
   * name so there's always *something* to land on.
   */
  function goToAccountByName(name) {
    if (!name) return;
    var profile = portfolioDirectoryByName(name);
    if (profile) {
      activateTab("customers");
      openDossier(profile.id);
      return;
    }
    activateTab("lookup");
    dealQuery.value = name;
    runDealSearch();
  }

  // ---------- deal lookup ----------
  var dealQuery = document.getElementById("dealQuery");
  var dealResultsCard = document.getElementById("dealResultsCard");
  var dealResultsBody = document.getElementById("dealResultsBody");
  var dealDetailCard = document.getElementById("dealDetailCard");

  function runDealSearch() {
    var q = dealQuery.value.trim();
    if (q.length < 2) return;
    fetch("/dashboard/api/deals?q=" + encodeURIComponent(q))
      .then(function (r) { return r.json(); })
      .then(function (body) {
        dealResultsBody.innerHTML = "";
        dealDetailCard.style.display = "none";
        if (!body.matches || body.matches.length === 0) {
          dealResultsCard.style.display = "block";
          dealResultsBody.appendChild(el("tr", {}, [el("td", { colspan: "5" }, ["No matches."])]));
          return;
        }
        dealResultsCard.style.display = "block";
        body.matches.forEach(function (m) {
          var tr = el("tr", { class: "clickable" }, [
            td(m.name), td(m.account), td(m.stage), td(m.owner), td(m.closeDate),
          ]);
          tr.addEventListener("click", function () { loadDeal(m.id); });
          dealResultsBody.appendChild(tr);
        });
      });
  }
  document.getElementById("dealSearchBtn").addEventListener("click", runDealSearch);
  dealQuery.addEventListener("keydown", function (e) { if (e.key === "Enter") runDealSearch(); });

  function loadDeal(id) {
    fetch("/dashboard/api/deals/" + encodeURIComponent(id))
      .then(function (r) { return r.json(); })
      .then(renderDeal);
  }

  function renderDeal(body) {
    dealDetailCard.innerHTML = "";
    dealDetailCard.style.display = "block";
    if (body.error) {
      dealDetailCard.appendChild(el("p", { class: "empty" }, [body.error]));
      return;
    }
    var d = body.deal;
    var kv = el("dl", { class: "kv" }, []);
    [
      ["Account", d.account], ["Stage", d.stage],
      ["Amount", d.amount ? ("$" + Number(d.amount).toLocaleString()) : null],
      ["Close date", d.closeDate], ["Owner", d.owner], ["Last modified", d.lastModified],
      ["Next step", d.nextStep], ["Description", d.description],
    ].forEach(function (pair) {
      kv.appendChild(el("dt", {}, [pair[0]]));
      kv.appendChild(el("dd", {}, [pair[1] === null || pair[1] === undefined ? "—" : String(pair[1])]));
    });
    dealDetailCard.appendChild(el("p", { class: "section-label" }, [d.name]));
    dealDetailCard.appendChild(kv);

    dealDetailCard.appendChild(el("p", { class: "section-label", style: "margin-top:18px" }, ["Gong calls"]));
    if (body.calls.items.length === 0) {
      dealDetailCard.appendChild(el("p", { class: "empty" }, ["No Gong calls associated with this deal."]));
    } else {
      body.calls.items.forEach(function (c) {
        var line = el("div", { class: "msg-line" }, [
          el("span", { class: "from" }, [c.durationMinutes + " min"]),
          el("span", {}, [c.title + " — " + c.participants.map(function (p) { return p.name + (p.isExternal ? " (ext)" : ""); }).join(", ")]),
        ]);
        dealDetailCard.appendChild(line);
      });
      if (body.calls.withheld) {
        dealDetailCard.appendChild(el("p", { class: "hint" }, ["Summaries withheld — metadata only (PRD decision D)."]));
      }
    }

    dealDetailCard.appendChild(el("p", { class: "section-label", style: "margin-top:18px" }, ["Slack activity"]));
    if (body.slack.messages.length === 0) {
      dealDetailCard.appendChild(el("p", { class: "empty" }, ["No Slack activity synced for this deal."]));
    } else {
      body.slack.messages.forEach(function (m) {
        var fromChildren = [m.from];
        if (m.external) fromChildren.push(" ");
        var fromSpan = el("span", { class: "from" }, [m.from]);
        var line = el("div", { class: "msg-line" }, [fromSpan, el("span", {}, [m.text])]);
        if (m.external) {
          fromSpan.appendChild(el("span", { class: "badge external", style: "margin-left:6px" }, ["external"]));
        }
        dealDetailCard.appendChild(line);
      });
    }
  }

  // ---------- recent activity ----------
  document.getElementById("activityRunBtn").addEventListener("click", function () {
    var owner = document.getElementById("activityOwner").value.trim();
    var days = document.getElementById("activityDays").value.trim() || "14";
    var params = "days=" + encodeURIComponent(days);
    if (owner) params += "&ownerName=" + encodeURIComponent(owner);
    fetch("/dashboard/api/recent-activity?" + params)
      .then(function (r) { return r.json(); })
      .then(renderActivity);
  });

  function renderActivity(body) {
    var card = document.getElementById("activityResultsCard");
    card.innerHTML = "";
    card.style.display = "block";
    if (body.error) {
      card.appendChild(el("p", { class: "empty" }, [body.error]));
      return;
    }
    card.appendChild(el("p", { class: "section-label" }, [body.dealCount + " deal(s) touched in the last " + body.windowDays + " day(s)"]));
    if (body.deals.length === 0) {
      card.appendChild(el("p", { class: "empty" }, ["Nothing recent in this window."]));
      return;
    }
    var table = el("table", {}, [
      el("thead", {}, [el("tr", {}, [el("th", {}, ["Deal"]), el("th", {}, ["Owner"]), el("th", {}, ["Days ago"]), el("th", {}, ["Slack msgs"]), el("th", {}, ["Gong calls"])])]),
    ]);
    var tbody = el("tbody", {}, []);
    body.deals.forEach(function (d) {
      var tr = el("tr", { class: "clickable-row" }, [td(d.name), td(d.owner), td(d.daysSinceModified), td(d.slackMessagesInWindow), td(d.gongCallsInWindow)]);
      tr.addEventListener("click", function () { goToDeal(d.id); });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    card.appendChild(table);
  }

  // ---------- coverage check ----------
  document.getElementById("coverageRunBtn").addEventListener("click", function () {
    var owner = document.getElementById("coverageOwner").value.trim();
    var params = owner ? "ownerName=" + encodeURIComponent(owner) : "";
    fetch("/dashboard/api/coverage-check" + (params ? "?" + params : ""))
      .then(function (r) { return r.json(); })
      .then(renderCoverage);
  });

  function renderCoverage(body) {
    var card = document.getElementById("coverageResultsCard");
    card.innerHTML = "";
    card.style.display = "block";
    if (body.error) {
      card.appendChild(el("p", { class: "empty" }, [body.error]));
      return;
    }
    card.appendChild(el("p", { class: "section-label" }, [body.flaggedCount + " of " + body.scannedCount + " open deal(s) flagged"]));
    if (body.deals.length === 0) {
      card.appendChild(el("p", { class: "empty" }, ["Nothing flagged — every open deal scanned has full coverage."]));
      return;
    }
    var table = el("table", {}, [
      el("thead", {}, [el("tr", {}, [el("th", {}, ["Deal"]), el("th", {}, ["Owner"]), el("th", {}, ["Missing"])])]),
    ]);
    var tbody = el("tbody", {}, []);
    body.deals.forEach(function (d) {
      var missing = [];
      if (d.missing.slackActivity) missing.push("Slack activity");
      if (d.missing.nextStep) missing.push("next step");
      if (d.missing.gongCall) missing.push("Gong call");
      var tr = el("tr", { class: "clickable-row" }, [td(d.name), td(d.owner), td(missing.join(", "))]);
      tr.addEventListener("click", function () { goToDeal(d.id); });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    card.appendChild(table);
  }

  // ---------- pipeline-pulse ----------
  var pulseResultsCard = document.getElementById("pulseResultsCard");
  document.getElementById("pulseRunBtn").addEventListener("click", function () {
    var btn = this;
    btn.disabled = true;
    btn.textContent = "Running…";
    fetch("/dashboard/api/pipeline-pulse", { method: "POST" })
      .then(function (r) { return r.json(); })
      .then(function (body) {
        btn.disabled = false;
        btn.textContent = "Run pipeline-pulse (dry run)";
        renderPulse(body);
      });
  });

  function renderPulse(body) {
    pulseResultsCard.innerHTML = "";
    pulseResultsCard.style.display = "block";
    pulseResultsCard.appendChild(el("p", { class: "section-label" }, [body.candidateCount + " candidate(s) found"]));
    if (!body.candidates || body.candidates.length === 0) {
      pulseResultsCard.appendChild(el("p", { class: "empty" }, ["Nothing flagged in this scan."]));
      return;
    }
    var table = el("table", {}, [
      el("thead", {}, [el("tr", {}, [el("th", {}, ["Severity"]), el("th", {}, ["Type"]), el("th", {}, ["Account"]), el("th", {}, ["Summary"]), el("th", {}, ["Action"])])]),
    ]);
    var tbody = el("tbody", {}, []);
    body.candidates.forEach(function (c) {
      var tr = el("tr", { class: "clickable-row" }, [
        el("td", {}, [el("span", { class: "badge severity-" + c.severity }, [c.severity])]),
        td(c.type),
        td(c.accountName),
        td(c.summary),
        td(c.suggestedAction),
      ]);
      tr.addEventListener("click", function () {
        if (c.salesforceOpportunityId) goToDeal(c.salesforceOpportunityId);
        else goToAccountByName(c.accountName);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    pulseResultsCard.appendChild(table);

    if (body.proposedProjects && body.proposedProjects.length > 0) {
      pulseResultsCard.appendChild(el("p", { class: "section-label", style: "margin-top:18px" }, ["Proposed Planhat projects (not created — dry run)"]));
      body.proposedProjects.forEach(function (p) {
        var owner = body.candidates.find(function (c) { return c.planhatCompanyId === p.companyId; });
        var line = el("div", { class: "msg-line" + (owner ? " clickable-row" : "") }, [
          el("span", { class: "from" }, [owner ? owner.accountName : p.companyId]), el("span", {}, [p.name]),
        ]);
        if (owner) line.addEventListener("click", function () { goToAccountByName(owner.accountName); });
        pulseResultsCard.appendChild(line);
      });
    }
  }

  // ---------- admin & audit ----------
  function loadRoster() {
    fetch("/dashboard/api/roster").then(function (r) { return r.json(); }).then(function (body) {
      var tbody = document.getElementById("rosterBody");
      tbody.innerHTML = "";
      (body.members || []).forEach(function (m) {
        tbody.appendChild(el("tr", {}, [td(m.email), td(m.name)]));
      });
    });
  }

  function loadAudit() {
    fetch("/dashboard/api/audit").then(function (r) { return r.json(); }).then(function (body) {
      var tbody = document.getElementById("auditBody");
      tbody.innerHTML = "";
      (body.events || []).forEach(function (e) {
        var tr = el("tr", { class: "clickable-row" }, [
          td(new Date(e.ts).toLocaleTimeString()),
          td(e.actor),
          el("td", {}, [el("code", { class: "mono" }, [e.tool])]),
          td((e.systems || []).join(", ")),
          el("td", {}, [el("span", { class: "badge outcome-" + e.outcome }, [e.outcome])]),
          td(e.ms),
        ]);
        var detailRow = el("tr", {}, [
          el("td", { colspan: "6" }, [el("code", { class: "mono", style: "white-space:pre-wrap; display:block" }, [JSON.stringify(e, null, 2)])]),
        ]);
        detailRow.style.display = "none";
        tr.addEventListener("click", function () {
          detailRow.style.display = detailRow.style.display === "none" ? "table-row" : "none";
        });
        tbody.appendChild(tr);
        tbody.appendChild(detailRow);
      });
    });
  }

  document.getElementById("auditRefreshBtn").addEventListener("click", loadAudit);

  // ---------- portfolio / customers / analytics fit (static CMS-0057 research) ----------
  var portfolioCache = null;
  var analyticsCache = null;
  var custState = { q: "", seg: null, quarter: null, sel: null };

  function portfolioDirectoryByName(name) {
    if (!portfolioCache) return null;
    var target = name.trim().toLowerCase();
    var hit = null;
    portfolioCache.directory.forEach(function (p) {
      if (!hit && p.name.toLowerCase() === target) hit = p;
    });
    return hit;
  }

  var RICH_ALLOWED_TAGS = {
    p: 1, h3: 1, h4: 1, ul: 1, ol: 1, li: 1, strong: 1, em: 1,
    table: 1, thead: 1, tbody: 1, tr: 1, th: 1, td: 1, code: 1, span: 1,
  };
  function cloneRichNode(node) {
    if (node.nodeType === 3) return document.createTextNode(node.textContent);
    if (node.nodeType !== 1) return null;
    var tag = node.tagName.toLowerCase();
    var out;
    if (!RICH_ALLOWED_TAGS[tag]) {
      out = document.createDocumentFragment();
    } else {
      out = document.createElement(tag);
      if (tag === "span" && node.className === "cite") out.className = "cite";
    }
    Array.prototype.forEach.call(node.childNodes, function (c) {
      var cc = cloneRichNode(c);
      if (cc) out.appendChild(cc);
    });
    return out;
  }
  /**
   * Renders a small HTML string (built server-side by fmtToHtml, or ported
   * verbatim from the original research write-up) as DOM nodes without ever
   * assigning it to innerHTML: parse into a detached document, then rebuild
   * only allowlisted tags one node at a time, dropping every attribute
   * except a citation span's class. Same "untrusted-sourced text never goes
   * through raw innerHTML" rule the rest of this file follows.
   */
  function renderRichHtml(container, html) {
    container.innerHTML = "";
    container.classList.add("rich");
    if (!html) return;
    var doc = new DOMParser().parseFromString("<div>" + html + "</div>", "text/html");
    var root = doc.body.firstChild;
    if (!root) return;
    Array.prototype.forEach.call(root.childNodes, function (c) {
      var cc = cloneRichNode(c);
      if (cc) container.appendChild(cc);
    });
  }

  function loadPortfolioSummary() {
    if (portfolioCache) {
      renderPortfolioTab(portfolioCache);
      renderCustomersTab(portfolioCache);
      return;
    }
    fetch("/dashboard/api/portfolio").then(function (r) { return r.json(); }).then(function (o) {
      portfolioCache = o;
      renderPortfolioTab(o);
      renderCustomersTab(o);
    });
  }

  function renderPortfolioTab(o) {
    document.getElementById("portfolioPulledHint").textContent =
      o.accountCount + " accounts · Salesforce snapshot pulled " + o.pulledAt + " — static research, refreshed manually, not a live read.";

    var tiles = document.getElementById("portfolioTiles");
    tiles.innerHTML = "";
    var hero = el("button", { class: "tile hero" }, [
      el("div", { class: "n" }, [money(o.totalArr)]),
      el("div", { class: "cap" }, ["Portfolio ARR · " + o.accountCount + " customers"]),
    ]);
    hero.addEventListener("click", function () { activateTab("customers"); });
    tiles.appendChild(hero);
    o.bySegment.forEach(function (s) {
      var tile = el("button", { class: "tile" }, [
        el("div", { class: "n" }, [String(s.count)]),
        el("div", { class: "cap" }, [
          el("span", { class: "sdot", style: "background:var(--seg-" + s.seg + ")" }, []),
          s.label + " · " + money(s.arr),
        ]),
      ]);
      tile.addEventListener("click", function () {
        custState.seg = s.seg;
        activateTab("customers");
        syncCustChips();
        renderCustList();
      });
      tiles.appendChild(tile);
    });
    var hiTile = el("button", { class: "tile" }, [
      el("div", { class: "n" }, [String(o.highFitPlayCount)]),
      el("div", { class: "cap" }, [
        el("span", { class: "sdot", style: "background:var(--accent)" }, []),
        "High-fit expansion plays",
      ]),
    ]);
    hiTile.addEventListener("click", function () { activateTab("customers"); });
    tiles.appendChild(hiTile);

    var strip = document.getElementById("portfolioRiskStrip");
    strip.innerHTML = "";
    var rs = o.riskStrip;

    function riskCard(cls, label, valueText, names) {
      var card = el("div", { class: "riskcard " + cls + (names ? " clickable-row" : "") }, [
        el("div", { class: "rt" }, [label]),
        el("div", { class: "rv" }, [valueText]),
      ]);
      if (names) card.addEventListener("click", function () { showRiskAccountList(label, names); });
      return card;
    }
    strip.appendChild(riskCard("bad", "Known churn", (rs.knownChurn.names.join(" · ") || "None") + " (" + money(rs.knownChurn.arr) + ")", rs.knownChurn.names));
    strip.appendChild(riskCard("bad", "Health ≤ 3", (rs.lowHealth.names.join(" · ") || "None") + " (" + money(rs.lowHealth.arr) + ")", rs.lowHealth.names));
    strip.appendChild(riskCard("warn", "Competitor engaged", rs.competitorEngaged.count + " accounts (" + money(rs.competitorEngaged.arr) + ")", rs.competitorEngaged.names));
    // "Any risk flag" is an aggregate count across flag types this dataset doesn't break out by name -- left non-interactive rather than fabricate a list.
    strip.appendChild(riskCard("warn", "Any risk flag", rs.flaggedCount + " of " + rs.matched + " accounts", null));

    function showRiskAccountList(label, names) {
      var card = document.getElementById("portfolioRiskDetailCard");
      card.innerHTML = "";
      card.style.display = "block";
      var closeBtn = el("button", { class: "action" }, ["Close"]);
      closeBtn.addEventListener("click", function () { card.style.display = "none"; });
      card.appendChild(el("div", { class: "row", style: "justify-content:space-between; align-items:baseline; margin-bottom:8px" }, [
        el("p", { class: "section-label", style: "margin:0" }, [label]),
        closeBtn,
      ]));
      if (names.length === 0) {
        card.appendChild(el("p", { class: "empty" }, ["None."]));
      } else {
        names.forEach(function (name) {
          var row = el("div", { class: "msg-line clickable-row" }, [el("span", { class: "from" }, [name])]);
          row.addEventListener("click", function () { goToAccountByName(name); });
          card.appendChild(row);
        });
      }
      card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    var ops = document.getElementById("portfolioOps");
    ops.innerHTML = "";
    o.topPlays.forEach(function (t) {
      var row = el("button", { class: "op-row" }, [
        el("div", { class: "rk" }, [String(t.rank)]),
        el("div", {}, [
          el("div", { class: "acct" }, [
            t.seg ? el("span", { class: "sdot", style: "width:8px;height:8px;border-radius:3px;background:var(--seg-" + t.seg + ")" }, []) : "",
            t.accountName,
          ]),
          el("div", { class: "play" }, [t.play]),
          el("div", { class: "why" }, [t.why]),
        ]),
        el("div", { class: "size" }, [t.size]),
      ]);
      if (t.ref !== null) row.addEventListener("click", function () { activateTab("customers"); openDossier(t.ref); });
      ops.appendChild(row);
    });

    renderRichHtml(document.getElementById("portfolioBriefing"), o.synthesisHtml);
  }

  function renderCustomersTab(o) {
    var segChips = document.getElementById("custSegChips");
    segChips.innerHTML = "";
    o.bySegment.forEach(function (s) {
      var chip = el("button", { class: "filterchip", "aria-pressed": "false" }, [
        el("span", { class: "sdot", style: "background:var(--seg-" + s.seg + ")" }, []),
        s.label,
      ]);
      chip.dataset.seg = s.seg;
      chip.addEventListener("click", function () {
        custState.seg = custState.seg === s.seg ? null : s.seg;
        syncCustChips();
        renderCustList();
      });
      segChips.appendChild(chip);
    });

    var qChips = document.getElementById("custQuarterChips");
    qChips.innerHTML = "";
    o.qorder.forEach(function (q) {
      var chip = el("button", { class: "filterchip", "aria-pressed": "false" }, [o.qlabels[q]]);
      chip.dataset.quarter = q;
      chip.addEventListener("click", function () {
        custState.quarter = custState.quarter === q ? null : q;
        syncCustChips();
        renderCustList();
      });
      qChips.appendChild(chip);
    });

    syncCustChips();
    renderCustList();
  }

  function syncCustChips() {
    document.querySelectorAll("#custSegChips .filterchip").forEach(function (c) {
      c.setAttribute("aria-pressed", c.dataset.seg === custState.seg ? "true" : "false");
    });
    document.querySelectorAll("#custQuarterChips .filterchip").forEach(function (c) {
      c.setAttribute("aria-pressed", c.dataset.quarter === custState.quarter ? "true" : "false");
    });
  }

  function filteredDirectory() {
    if (!portfolioCache) return [];
    var q = custState.q.trim().toLowerCase();
    return portfolioCache.directory.filter(function (p) {
      if (custState.seg && p.seg !== custState.seg) return false;
      if (custState.quarter && p.quarter !== custState.quarter) return false;
      if (q && (p.name + " " + (p.note || "")).toLowerCase().indexOf(q) === -1) return false;
      return true;
    });
  }

  function renderCustList() {
    var list = filteredDirectory();
    var container = document.getElementById("custList");
    container.innerHTML = "";
    document.getElementById("custCount").textContent =
      list.length + " of " + (portfolioCache ? portfolioCache.accountCount : 0) + " customers";
    if (list.length === 0) {
      container.appendChild(el("p", { class: "empty" }, ["No matches."]));
      return;
    }
    var groups = {};
    list.forEach(function (p) { (groups[p.quarter] = groups[p.quarter] || []).push(p); });
    portfolioCache.qorder.forEach(function (q) {
      if (!groups[q] || groups[q].length === 0) return;
      container.appendChild(el("div", { class: "cust-qgroup-h" }, [portfolioCache.qlabels[q] + " (" + groups[q].length + ")"]));
      groups[q].forEach(function (p) {
        var row = el("button", { class: "cust-row", "aria-current": String(custState.sel === p.id) }, [
          el("span", { class: "sdot", style: "background:var(--seg-" + p.seg + ")" }, []),
          el("span", { class: "rn" }, [p.name]),
          el("span", { class: "rarr" }, [money(p.arr)]),
        ]);
        row.addEventListener("click", function () { openDossier(p.id); });
        container.appendChild(row);
      });
    });
  }

  document.getElementById("custQuery").addEventListener("input", function (e) {
    custState.q = e.target.value;
    renderCustList();
  });

  function openDossier(id) {
    custState.sel = id;
    renderCustList();
    var container = document.getElementById("custDossier");
    container.innerHTML = "";
    container.appendChild(el("p", { class: "empty" }, ["Loading…"]));
    fetch("/dashboard/api/portfolio/accounts/" + encodeURIComponent(id))
      .then(function (r) { return r.json(); })
      .then(renderDossier);
  }

  function buildSfPanel(sf, pulledAt) {
    var panel = el("div", { class: "sfpanel" }, [
      el("div", { class: "sfhead" }, ["Salesforce · synced " + (pulledAt || "—")]),
    ]);
    var grid = el("div", { class: "sfgrid" }, []);
    [
      ["ARR", money(sf.arr)], ["Cumulative revenue", money(sf.cumulative)],
      ["Health", sf.health === null ? "—" : sf.health + "/10"],
      ["Renewal", sf.renewal || "—"], ["Customer since", sf.customer_since || "—"],
      ["Impl level", sf.impl_level || "—"], ["Owner", sf.owner || "—"], ["CSM", sf.csm || "—"],
    ].forEach(function (pair) {
      grid.appendChild(el("div", {}, [el("div", { class: "k" }, [pair[0]]), el("div", { class: "v" }, [String(pair[1])])]));
    });
    panel.appendChild(grid);
    if (sf.flags && sf.flags.length > 0) {
      var flags = el("div", { class: "rflags" }, []);
      sf.flags.forEach(function (f) { flags.appendChild(el("span", { class: "rflag" }, [f])); });
      panel.appendChild(flags);
    }
    if (sf.opps && sf.opps.length > 0) {
      var oppsTable = el("table", { style: "margin-top:12px" }, [
        el("thead", {}, [el("tr", {}, [el("th", {}, ["Closed"]), el("th", {}, ["Opportunity"]), el("th", {}, ["Type"]), el("th", {}, ["Amount"]), el("th", {}, ["Owner"])])]),
      ]);
      var oppsBody = el("tbody", {}, []);
      sf.opps.forEach(function (o) {
        var tr = el("tr", { class: "clickable-row" }, [
          td(o.closed), td(o.name), td(o.type), td(money(o.amount)), td(o.owner),
        ]);
        tr.addEventListener("click", function () {
          activateTab("lookup");
          dealQuery.value = o.name;
          runDealSearch();
        });
        oppsBody.appendChild(tr);
      });
      oppsTable.appendChild(oppsBody);
      panel.appendChild(oppsTable);
    }
    return panel;
  }

  /**
   * Live Slack activity for this account -- unlike the rest of the dossier
   * (static, point-in-time research), this is a real-time read via the same
   * getMessagesForAccount/countRecentMessages the Overview tab's 60-day
   * activity card and Deal lookup's Slack section use.
   */
  function buildSlackActivityField(activity) {
    var field = el("div", { class: "field" }, [
      el("div", { class: "fl" }, ["Slack activity, last " + activity.windowDays + " days"]),
    ]);
    field.appendChild(el("p", { class: "hint", style: "margin:0 0 8px" }, [
      String(activity.messageCount) + " message(s) in the last " + activity.windowDays + " days.",
    ]));
    if (activity.messages.length === 0) {
      field.appendChild(el("p", { class: "empty" }, ["No Slack activity synced for this account."]));
      return field;
    }
    activity.messages.forEach(function (m) {
      var fromSpan = el("span", { class: "from" }, [m.from || "—"]);
      if (m.external) fromSpan.appendChild(el("span", { class: "badge external", style: "margin-left:6px" }, ["external"]));
      field.appendChild(el("div", { class: "msg-line" }, [fromSpan, el("span", {}, [m.text])]));
    });
    return field;
  }

  function renderDossier(a) {
    var container = document.getElementById("custDossier");
    container.innerHTML = "";
    if (a.error) {
      container.appendChild(el("p", { class: "empty" }, [a.error]));
      return;
    }
    container.appendChild(el("span", { class: "seg-pill" }, [
      el("span", { class: "sdot", style: "background:var(--seg-" + a.seg + ")" }, []), a.seglabel,
    ]));
    container.appendChild(el("h2", {}, [a.name]));
    container.appendChild(el("div", { class: "full" }, [a.full]));

    var badges = el("div", { class: "badges" }, [
      el("span", { class: "badge outcome-ok" }, ["Timeline: " + a.qlabel]),
      el("span", { class: "badge outcome-ok" }, ["Research: " + a.dq]),
      el("span", { class: "badge outcome-ok" }, [a.expansionPlays.length + " plays · " + a.playsHi + " high-fit"]),
    ]);
    if (a.note) badges.appendChild(el("span", { class: "badge severity-medium" }, [a.note]));
    container.appendChild(badges);

    if (a.liveDealMatch) {
      var liveBtn = el("button", { class: "action", style: "margin-top:14px" }, ["Open in Deal lookup →"]);
      liveBtn.addEventListener("click", function () { goToDeal(a.liveDealMatch.id); });
      container.appendChild(liveBtn);
    } else {
      var searchBtn = el("button", { class: "action", style: "margin-top:14px" }, ["Search Deal lookup for this account →"]);
      searchBtn.addEventListener("click", function () {
        activateTab("lookup");
        dealQuery.value = a.name;
        runDealSearch();
      });
      container.appendChild(searchBtn);
    }

    if (a.sf) container.appendChild(buildSfPanel(a.sf, a.sfPulledAt));

    if (a.slackActivity) container.appendChild(buildSlackActivityField(a.slackActivity));

    a.fields.forEach(function (f) {
      var field = el("div", { class: "field" }, [el("div", { class: "fl" }, [f.label])]);
      var body = el("div", {}, []);
      renderRichHtml(body, f.html);
      field.appendChild(body);
      container.appendChild(field);
    });

    if (a.expansionPlays.length > 0) {
      var playsField = el("div", { class: "field" }, [el("div", { class: "fl" }, ["Post-0057 Expansion Plays"])]);
      a.expansionPlays.forEach(function (pl) {
        var fit = (pl.fit || "").toLowerCase();
        var cls = fit === "high" ? "hi" : fit === "medium" ? "medium" : fit === "low" ? "lo" : "unrated";
        playsField.appendChild(el("div", { class: "playc " + cls }, [
          el("div", { class: "ph" }, [el("span", { class: "pn" }, [pl.play]), el("span", { class: "fitbadge " + cls }, [fit || "unrated"])]),
          el("div", { class: "pr" }, [pl.rationale]),
        ]));
      });
      container.appendChild(playsField);
    }

    if (a.sources.length > 0) {
      var srcField = el("div", { class: "field" }, [el("div", { class: "fl" }, ["Sources"])]);
      var chips = el("div", { class: "srcchips" }, []);
      a.sources.forEach(function (s) { chips.appendChild(el("span", { class: "s" }, [s])); });
      srcField.appendChild(chips);
      container.appendChild(srcField);
    }
  }

  function loadAnalyticsFit() {
    if (analyticsCache) { renderAnalyticsTab(analyticsCache); return; }
    fetch("/dashboard/api/portfolio/analytics").then(function (r) { return r.json(); }).then(function (a) {
      analyticsCache = a;
      renderAnalyticsTab(a);
    });
  }

  function renderAnalyticsTab(a) {
    var s = a.stats;
    document.getElementById("analyticsMetaHint").textContent =
      s.withSignal + " of " + s.covered + " accounts show a live Gong signal for an analytics offering.";

    function scrollToSelector(sel) {
      var el2 = document.querySelector(sel);
      if (el2) el2.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    var tiles = document.getElementById("analyticsTiles");
    tiles.innerHTML = "";
    var heroTile = el("div", { class: "tile hero" }, [
      el("div", { class: "n" }, [s.withSignal + "/" + s.covered]),
      el("div", { class: "cap" }, ["Accounts with a live analytics ask"]),
    ]);
    heroTile.addEventListener("click", function () { scrollToSelector("#analyticsTiers"); });
    tiles.appendChild(heroTile);
    var tier1CountTile = el("div", { class: "tile" }, [
      el("div", { class: "n" }, [String(s.tier1Count)]),
      el("div", { class: "cap" }, ["Design-partner ready (Tier 1)"]),
    ]);
    tier1CountTile.addEventListener("click", function () { scrollToSelector(".tiergroup.tier1"); });
    tiles.appendChild(tier1CountTile);
    var tier1ArrTile = el("div", { class: "tile" }, [
      el("div", { class: "n" }, [money(s.tier1Arr)]),
      el("div", { class: "cap" }, ["Tier 1 combined ARR"]),
    ]);
    tier1ArrTile.addEventListener("click", function () { scrollToSelector(".tiergroup.tier1"); });
    tiles.appendChild(tier1ArrTile);
    var topThemeTile = el("div", { class: "tile" }, [
      el("div", { class: "n" }, [String(s.topThemeCount)]),
      el("div", { class: "cap" }, ["Asking for: " + s.topThemeLabel]),
    ]);
    topThemeTile.addEventListener("click", function () { scrollToSelector("#analyticsThemes"); });
    tiles.appendChild(topThemeTile);

    var themes = document.getElementById("analyticsThemes");
    themes.innerHTML = "";
    a.themes.forEach(function (t) {
      var pct = s.covered > 0 ? Math.round((t.count / s.covered) * 100) : 0;
      var row = el("div", { class: "theme-bar clickable-row" }, [
        el("div", { class: "tb-label" }, [t.label]),
        el("div", { class: "tb-track" }, [el("div", { class: "tb-fill", style: "width:" + pct + "%" }, [])]),
        el("div", { class: "tb-count" }, [t.count + "/" + s.covered]),
      ]);
      row.addEventListener("click", function () { showThemeAccountList(t.label, t.accounts); });
      themes.appendChild(row);
    });

    function showThemeAccountList(label, names) {
      var card = document.getElementById("themeDetailCard");
      card.innerHTML = "";
      card.style.display = "block";
      var closeBtn = el("button", { class: "action" }, ["Close"]);
      closeBtn.addEventListener("click", function () { card.style.display = "none"; });
      card.appendChild(el("div", { class: "row", style: "justify-content:space-between; align-items:baseline; margin-bottom:8px" }, [
        el("p", { class: "section-label", style: "margin:0" }, [label + " — " + names.length + " account(s)"]),
        closeBtn,
      ]));
      names.forEach(function (name) {
        var row = el("div", { class: "msg-line clickable-row" }, [el("span", { class: "from" }, [name])]);
        row.addEventListener("click", function () { goToAccountByName(name); });
        card.appendChild(row);
      });
      card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    var tiersRoot = document.getElementById("analyticsTiers");
    tiersRoot.innerHTML = "";
    a.tiers.forEach(function (tg) {
      var group = el("div", { class: "tiergroup" }, [
        el("div", { class: "tiergroup-h" }, [
          el("span", { class: "tn" }, ["Tier " + tg.tier]),
          el("span", {}, [tg.label]),
          el("span", { class: "tc" }, [tg.count + " accounts · " + money(tg.arr) + " ARR"]),
        ]),
        el("div", { class: "tiergroup-d" }, [tg.desc]),
      ]);
      tg.items.forEach(function (it) {
        var row = el("button", { class: "arow t" + tg.tier }, [
          el("div", {}, [
            el("div", { class: "acct" }, [
              it.seg ? el("span", { class: "sdot", style: "width:8px;height:8px;border-radius:3px;background:var(--seg-" + it.seg + ")" }, []) : "",
              it.name,
              el("span", { class: "gongbadge " + it.gongSignal }, [it.gongSignal]),
            ]),
            el("div", { class: "ask" }, [it.ask]),
            it.evidence.length > 0
              ? el("div", { class: "ev" }, [it.evidence.map(function (e) { return "“" + e + "”"; }).join("  ·  ")])
              : "",
          ]),
          el("div", { class: "rt" }, [money(it.arr)]),
        ]);
        if (it.ref !== null) row.addEventListener("click", function () { activateTab("customers"); openDossier(it.ref); });
        group.appendChild(row);
      });
      tiersRoot.appendChild(group);
    });

    document.getElementById("prismPitch").textContent = a.product.pitch;
    var pricing = document.getElementById("prismPricing");
    pricing.innerHTML = "";
    a.product.pricing.forEach(function (p) {
      pricing.appendChild(el("div", { class: "pricecard" }, [
        el("div", { class: "pn" }, [p.name]), el("div", { class: "ps" }, [p.scope]), el("div", { class: "pp" }, [p.price]),
      ]));
    });
    var measures = document.getElementById("prismMeasures");
    measures.innerHTML = "";
    a.product.measures.forEach(function (m) {
      measures.appendChild(el("div", { class: "measurec" }, [
        el("div", { class: "mn" }, [m.name]),
        el("div", { class: "mq" }, [m.question]),
        el("div", { class: "mt" }, [m.takeaway]),
      ]));
    });

    renderGaps(a.gaps);
  }

  function renderGaps(g) {
    var root = document.getElementById("gapsRoot");
    root.innerHTML = "";
    root.appendChild(el("p", { class: "section-label" }, ["Market sizing"]));
    g.market.funnel.forEach(function (f) {
      root.appendChild(el("div", { class: "bar-row", style: "grid-template-columns:1fr auto" }, [
        el("span", { class: "bar-label" }, [f.label]), el("span", { class: "bar-value" }, [f.value]),
      ]));
    });
    root.appendChild(el("p", { class: "hint", style: "margin-top:8px" }, [g.market.finding]));

    root.appendChild(el("p", { class: "section-label", style: "margin-top:18px" }, ["Pricing"]));
    root.appendChild(el("p", { class: "hint" }, [g.pricing.anchor]));
    var table = el("table", {}, [
      el("thead", {}, [el("tr", {}, [el("th", {}, ["Segment"]), el("th", {}, ["Bundle"]), el("th", {}, ["Themed package"])])]),
    ]);
    var tbody = el("tbody", {}, []);
    g.pricing.tiers.forEach(function (t) { tbody.appendChild(el("tr", {}, [td(t.seg), td(t.bundle), td(t.pkg)])); });
    table.appendChild(tbody);
    root.appendChild(table);

    root.appendChild(el("p", { class: "section-label", style: "margin-top:18px" }, ["Rollout roadmap"]));
    g.implRoadmap.forEach(function (r) {
      root.appendChild(el("div", { class: "msg-line" }, [el("span", { class: "from" }, [r.phase]), el("span", {}, [r.desc])]));
    });
  }

  // ---------- clinical connect ----------
  function loadClinicalConnect() {
    var root = document.getElementById("ccRoot");
    root.innerHTML = "";
    root.appendChild(el("p", { class: "empty" }, ["Loading…"]));

    function withPortfolioSummary(cb) {
      if (portfolioCache) { cb(portfolioCache); return; }
      fetch("/dashboard/api/portfolio").then(function (r) { return r.json(); }).then(function (o) {
        portfolioCache = o;
        cb(o);
      });
    }

    withPortfolioSummary(function (summary) {
      Promise.all(
        summary.clinicalConnectIds.map(function (id) {
          return fetch("/dashboard/api/portfolio/accounts/" + encodeURIComponent(id)).then(function (r) { return r.json(); });
        }),
      ).then(renderClinicalConnect);
    });
  }

  function findField(fields, label) {
    var hit = null;
    fields.forEach(function (f) { if (!hit && f.label === label) hit = f; });
    return hit;
  }

  function renderClinicalConnect(accounts) {
    var root = document.getElementById("ccRoot");
    root.innerHTML = "";
    accounts.forEach(function (a) {
      if (a.error) return;
      var card = el("div", { class: "card cc-account" }, []);

      var head = el("div", { class: "cc-head" }, [
        el("h2", {}, [a.name]),
        el("span", { class: "seg-pill" }, [el("span", { class: "sdot", style: "background:var(--seg-" + a.seg + ")" }, []), a.seglabel]),
      ]);
      if (a.sf && a.sf.health !== null) {
        head.appendChild(el("span", { class: "badge outcome-ok" }, ["Health " + a.sf.health + "/10"]));
      }
      if (a.liveDealMatch) {
        var liveBtn = el("button", { class: "action" }, ["Open in Deal lookup →"]);
        liveBtn.addEventListener("click", function () { goToDeal(a.liveDealMatch.id); });
        head.appendChild(liveBtn);
      }
      card.appendChild(head);

      var grid = el("div", { class: "cc-grid" }, []);

      // What's going well: implementation momentum + active expansion plays.
      var goingWell = el("div", { class: "cc-bucket good" }, [el("p", { class: "cc-bucket-h" }, ["What's going well"])]);
      var implField = findField(a.fields, "Implementation Status");
      if (implField) {
        var implBody = el("div", {}, []);
        renderRichHtml(implBody, implField.html);
        goingWell.appendChild(implBody);
      }
      if (a.expansionPlays.length > 0) {
        a.expansionPlays.forEach(function (pl) {
          var fit = (pl.fit || "").toLowerCase();
          var cls = fit === "high" ? "hi" : fit === "medium" ? "medium" : fit === "low" ? "lo" : "unrated";
          goingWell.appendChild(el("div", { class: "playc " + cls, style: "margin-top:8px" }, [
            el("div", { class: "ph" }, [el("span", { class: "pn" }, [pl.play]), el("span", { class: "fitbadge " + cls }, [fit || "unrated"])]),
            el("div", { class: "pr" }, [pl.rationale]),
          ]));
        });
      }
      if (!implField && a.expansionPlays.length === 0) goingWell.appendChild(el("p", { class: "cc-empty" }, ["Nothing on file."]));
      grid.appendChild(goingWell);

      // What isn't: the research's own risks/blockers write-up + any Salesforce health flags.
      var notWell = el("div", { class: "cc-bucket bad" }, [el("p", { class: "cc-bucket-h" }, ["What isn't going well"])]);
      var risksField = findField(a.fields, "Risks & Blockers");
      if (risksField) {
        var risksBody = el("div", {}, []);
        renderRichHtml(risksBody, risksField.html);
        notWell.appendChild(risksBody);
      }
      if (a.sf && a.sf.flags && a.sf.flags.length > 0) {
        var flagsRow = el("div", { class: "rflags", style: "margin-top:8px" }, []);
        a.sf.flags.forEach(function (f) { flagsRow.appendChild(el("span", { class: "rflag" }, [f])); });
        notWell.appendChild(flagsRow);
      }
      if (!risksField && (!a.sf || !a.sf.flags || a.sf.flags.length === 0)) {
        notWell.appendChild(el("p", { class: "cc-empty" }, ["Nothing flagged on file."]));
      }
      grid.appendChild(notWell);

      // Meetings: recent Gong calls, only reachable through a resolved live deal.
      var meetings = el("div", { class: "cc-bucket" }, [el("p", { class: "cc-bucket-h" }, ["Meetings"])]);
      if (!a.meetings.available) {
        meetings.appendChild(el("p", { class: "cc-empty" }, ["No live Salesforce opportunity matched — recent calls unavailable."]));
      } else if (a.meetings.calls.length === 0) {
        meetings.appendChild(el("p", { class: "cc-empty" }, ["No Gong calls associated with the matched deal."]));
      } else {
        a.meetings.calls.forEach(function (c) {
          meetings.appendChild(el("div", { class: "msg-line" }, [
            el("span", { class: "from" }, [c.durationMinutes + " min"]),
            el("span", {}, [c.title + " — " + c.participants.map(function (p) { return p.name + (p.isExternal ? " (ext)" : ""); }).join(", ")]),
          ]));
        });
        if (a.meetings.withheld) meetings.appendChild(el("p", { class: "hint" }, ["Summaries withheld — metadata only (PRD decision D)."]));
      }
      grid.appendChild(meetings);

      // Customer insights: key people, points of interest, live Slack activity, sources.
      var insights = el("div", { class: "cc-bucket" }, [el("p", { class: "cc-bucket-h" }, ["Customer insights"])]);
      ["Key People", "Points of Interest"].forEach(function (label) {
        var f = findField(a.fields, label);
        if (!f) return;
        insights.appendChild(el("p", { class: "section-label", style: "margin-top:10px" }, [label]));
        var body = el("div", {}, []);
        renderRichHtml(body, f.html);
        insights.appendChild(body);
      });
      if (a.slackActivity) {
        insights.appendChild(buildSlackActivityField(a.slackActivity));
      }
      if (a.sources.length > 0) {
        insights.appendChild(el("p", { class: "section-label", style: "margin-top:10px" }, ["Sources"]));
        var chips = el("div", { class: "srcchips" }, []);
        a.sources.forEach(function (s) { chips.appendChild(el("span", { class: "s" }, [s])); });
        insights.appendChild(chips);
      }
      grid.appendChild(insights);

      card.appendChild(grid);
      root.appendChild(card);
    });
  }

  loadOverview();
  loadRoster();
  loadAudit();
}());
</script>
</body>
</html>
`;
