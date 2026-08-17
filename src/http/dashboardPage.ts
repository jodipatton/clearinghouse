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
<style>
  :root {
    --bg: #F2F6F5;
    --surface: #FFFFFF;
    --surface-2: #EAF1EF;
    --ink: #12211F;
    --ink-dim: #4E6663;
    --ink-faint: #7C918E;
    --border: #D7E3E0;
    --accent: #147D73;
    --accent-ink: #0D5A52;
    --accent-soft: #DCEFEB;
    --warn: #A8672A;
    --warn-soft: #F3E5D2;
    --bad: #B5484A;
    --bad-soft: #F5DEDE;
    --font-mono: ui-monospace, "SF Mono", "Cascadia Code", Menlo, Consolas, monospace;
    --font-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #0C1615;
      --surface: #10201E;
      --surface-2: #15302C;
      --ink: #E7F2EF;
      --ink-dim: #9FB9B4;
      --ink-faint: #6C8A85;
      --border: #234441;
      --accent: #55D6C4;
      --accent-ink: #B8F0E6;
      --accent-soft: #163A35;
      --warn: #E6AC66;
      --warn-soft: #3A2A18;
      --bad: #E38385;
      --bad-soft: #3A1E1F;
    }
  }
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
    font-family: var(--font-mono); font-size: 22px; font-weight: 600; margin: 0;
  }
  header.masthead p { margin: 0; color: var(--ink-dim); font-size: 13.5px; }
  nav.tabs { display: flex; gap: 6px; border-bottom: 1px solid var(--border); }
  nav.tabs button {
    font-family: var(--font-mono); font-size: 12.5px; letter-spacing: 0.03em;
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
  input[type="text"] {
    flex: 1; font-family: var(--font-body); font-size: 14px; padding: 9px 12px;
    border-radius: 8px; border: 1px solid var(--border); background: var(--surface);
    color: var(--ink);
  }
  button.action {
    font-family: var(--font-body); font-size: 13.5px; font-weight: 600;
    color: var(--accent-ink); background: var(--accent-soft); border: 1px solid var(--border);
    border-radius: 8px; padding: 9px 16px; cursor: pointer; white-space: nowrap;
  }
  button.action:disabled { opacity: 0.6; cursor: default; }
  .hint { font-size: 12.5px; color: var(--ink-faint); }
  table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
  th { text-align: left; font-family: var(--font-mono); font-size: 11px; text-transform: uppercase;
    letter-spacing: 0.05em; color: var(--ink-faint); font-weight: 600; padding: 6px 10px;
    border-bottom: 1px solid var(--border); }
  td { padding: 9px 10px; border-bottom: 1px solid var(--border); vertical-align: top; }
  tr.clickable { cursor: pointer; }
  tr.clickable:hover td { background: var(--surface-2); }
  .badge {
    font-family: var(--font-mono); font-size: 11px; padding: 2px 7px; border-radius: 5px;
    display: inline-block;
  }
  .badge.severity-high { background: var(--bad-soft); color: var(--bad); }
  .badge.severity-medium { background: var(--warn-soft); color: var(--warn); }
  .badge.severity-low { background: var(--surface-2); color: var(--ink-faint); }
  .badge.external { background: var(--warn-soft); color: var(--warn); }
  .badge.outcome-ok { background: var(--accent-soft); color: var(--accent-ink); }
  .badge.outcome-denied, .badge.outcome-error { background: var(--bad-soft); color: var(--bad); }
  .kv { display: grid; grid-template-columns: 130px 1fr; gap: 6px 12px; font-size: 13.5px; }
  .kv dt { color: var(--ink-faint); font-family: var(--font-mono); font-size: 11.5px; }
  .kv dd { margin: 0; }
  .msg-line { display: flex; gap: 8px; font-size: 13.5px; padding: 6px 0; border-bottom: 1px solid var(--border); }
  .msg-line:last-child { border-bottom: none; }
  .msg-line .from { font-weight: 600; flex: none; width: 120px; }
  .empty { color: var(--ink-faint); font-size: 13.5px; padding: 8px 2px; }
  .section-label {
    font-family: var(--font-mono); font-size: 11.5px; text-transform: uppercase;
    letter-spacing: 0.05em; color: var(--ink-faint); margin: 0 0 8px;
  }
  code.mono { font-family: var(--font-mono); font-size: 12.5px; color: var(--ink-dim); }

  /* ---------- overview ---------- */
  .kpi-row {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;
  }
  .kpi-tile {
    background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
    padding: 14px 16px; display: flex; flex-direction: column; gap: 4px;
  }
  .kpi-tile .value {
    font-family: var(--font-mono); font-size: 24px; font-weight: 600;
    font-variant-numeric: tabular-nums; line-height: 1.1;
  }
  .kpi-tile .label { font-size: 12px; color: var(--ink-faint); }
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
  .bar-row .bar-value { font-family: var(--font-mono); font-size: 12px; color: var(--ink-faint); text-align: right; font-variant-numeric: tabular-nums; }

  .severity-tiles { display: flex; gap: 10px; }
  .severity-tile {
    flex: 1; border-radius: 10px; padding: 10px 12px; display: flex; flex-direction: column; gap: 2px;
    border: 1px solid var(--border);
  }
  .severity-tile .count { font-family: var(--font-mono); font-size: 20px; font-weight: 600; font-variant-numeric: tabular-nums; }
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
</style>
</head>
<body>
<div class="page">

  <header class="masthead">
    <h1>Clearinghouse dashboard</h1>
    <p>Pipeline overview, deal lookup, pipeline-pulse review, and roster/audit — the same data as the Claude connector, browsed directly.</p>
  </header>

  <nav class="tabs">
    <button data-tab="overview" class="active">Overview</button>
    <button data-tab="lookup">Deal lookup</button>
    <button data-tab="activity">Recent activity</button>
    <button data-tab="coverage">Coverage check</button>
    <button data-tab="pulse">Pipeline-pulse</button>
    <button data-tab="admin">Admin &amp; audit</button>
  </nav>

  <section class="panel active" id="panel-overview">
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

  // ---------- overview ----------
  function loadOverview() {
    fetch("/dashboard/api/overview").then(function (r) { return r.json(); }).then(renderOverview);
  }

  function renderOverview(o) {
    var root = document.getElementById("overviewRoot");
    root.innerHTML = "";
    root.style.display = "flex";
    root.style.flexDirection = "column";
    root.style.gap = "20px";

    // KPI row
    var kpis = el("div", { class: "kpi-row" }, [
      el("div", { class: "kpi-tile" }, [
        el("span", { class: "value" }, [money(o.pipeline.openPipelineAmount)]),
        el("span", { class: "label" }, ["Open pipeline"]),
      ]),
      el("div", { class: "kpi-tile" }, [
        el("span", { class: "value" }, [String(o.pipeline.openDealCount)]),
        el("span", { class: "label" }, ["Open deals"]),
      ]),
      el("div", { class: "kpi-tile" + (o.fictions.totalCount > 0 ? " tone-warn" : "") }, [
        el("span", { class: "value" }, [String(o.fictions.totalCount)]),
        el("span", { class: "label" }, ["Fictions flagged"]),
      ]),
      el("div", { class: "kpi-tile" + (o.coverage.flaggedCount > 0 ? " tone-warn" : "") }, [
        el("span", { class: "value" }, [String(o.coverage.flaggedCount) + " / " + String(o.coverage.scannedCount)]),
        el("span", { class: "label" }, ["Coverage gaps"]),
      ]),
    ]);
    root.appendChild(kpis);

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
        stageCard.appendChild(el("div", { class: "bar-row" }, [
          el("span", { class: "bar-label" }, [s.stage + " (" + s.count + ")"]),
          el("div", { class: "bar-track" }, [el("div", { class: "bar-fill", style: "width:" + pct + "%" }, [])]),
          el("span", { class: "bar-value" }, [money(s.amount)]),
        ]));
      });
    }
    leftCol.appendChild(stageCard);

    var attentionCard = el("div", { class: "card" }, [el("p", { class: "section-label" }, ["Needs attention"])]);
    if (o.fictions.top.length === 0) {
      attentionCard.appendChild(el("p", { class: "empty" }, ["Nothing flagged in the last scan."]));
    } else {
      o.fictions.top.forEach(function (f) {
        attentionCard.appendChild(el("div", { class: "attention-item" }, [
          el("span", { class: "badge severity-" + f.severity }, [f.severity]),
          el("span", {}, [f.summary]),
        ]));
      });
    }
    leftCol.appendChild(attentionCard);
    grid.appendChild(leftCol);

    // right column: fictions by severity + upcoming renewals
    var rightCol = el("div", { style: "display:flex; flex-direction:column; gap:16px" }, []);

    var sevCard = el("div", { class: "card" }, [el("p", { class: "section-label" }, ["Fictions by severity"])]);
    var sevRow = el("div", { class: "severity-tiles" }, [
      el("div", { class: "severity-tile high" }, [el("span", { class: "count" }, [String(o.fictions.bySeverity.high)]), el("span", { class: "label" }, ["High"])]),
      el("div", { class: "severity-tile medium" }, [el("span", { class: "count" }, [String(o.fictions.bySeverity.medium)]), el("span", { class: "label" }, ["Medium"])]),
      el("div", { class: "severity-tile low" }, [el("span", { class: "count" }, [String(o.fictions.bySeverity.low)]), el("span", { class: "label" }, ["Low"])]),
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
        tbody.appendChild(el("tr", { class: overdue ? "renewal-row overdue" : "renewal-row" }, [
          td(r.name), td(r.renewalDate), td(daysLabel), td(money(r.arr)),
        ]));
      });
      table.appendChild(tbody);
      renewalCard.appendChild(table);
    }
    rightCol.appendChild(renewalCard);
    grid.appendChild(rightCol);

    root.appendChild(grid);
  }

  // ---------- tabs ----------
  var tabButtons = document.querySelectorAll("nav.tabs button");
  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      tabButtons.forEach(function (b) { b.classList.remove("active"); });
      document.querySelectorAll(".panel").forEach(function (p) { p.classList.remove("active"); });
      btn.classList.add("active");
      document.getElementById("panel-" + btn.dataset.tab).classList.add("active");
    });
  });

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
      tbody.appendChild(el("tr", {}, [td(d.name), td(d.owner), td(d.daysSinceModified), td(d.slackMessagesInWindow), td(d.gongCallsInWindow)]));
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
      tbody.appendChild(el("tr", {}, [td(d.name), td(d.owner), td(missing.join(", "))]));
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
      tbody.appendChild(el("tr", {}, [
        el("td", {}, [el("span", { class: "badge severity-" + c.severity }, [c.severity])]),
        td(c.type),
        td(c.accountName),
        td(c.summary),
        td(c.suggestedAction),
      ]));
    });
    table.appendChild(tbody);
    pulseResultsCard.appendChild(table);

    if (body.proposedProjects && body.proposedProjects.length > 0) {
      pulseResultsCard.appendChild(el("p", { class: "section-label", style: "margin-top:18px" }, ["Proposed Planhat projects (not created — dry run)"]));
      body.proposedProjects.forEach(function (p) {
        pulseResultsCard.appendChild(el("div", { class: "msg-line" }, [el("span", { class: "from" }, [p.companyId]), el("span", {}, [p.name])]));
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
        tbody.appendChild(el("tr", {}, [
          td(new Date(e.ts).toLocaleTimeString()),
          td(e.actor),
          el("td", {}, [el("code", { class: "mono" }, [e.tool])]),
          td((e.systems || []).join(", ")),
          el("td", {}, [el("span", { class: "badge outcome-" + e.outcome }, [e.outcome])]),
          td(e.ms),
        ]));
      });
    });
  }

  document.getElementById("auditRefreshBtn").addEventListener("click", loadAudit);

  loadOverview();
  loadRoster();
  loadAudit();
}());
</script>
</body>
</html>
`;
