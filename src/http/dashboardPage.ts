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
</style>
</head>
<body>
<div class="page">

  <header class="masthead">
    <h1>Clearinghouse dashboard</h1>
    <p>Deal lookup, pipeline-pulse review, and roster/audit — the same data as the Claude connector, browsed directly.</p>
  </header>

  <nav class="tabs">
    <button data-tab="lookup" class="active">Deal lookup</button>
    <button data-tab="pulse">Pipeline-pulse</button>
    <button data-tab="admin">Admin &amp; audit</button>
  </nav>

  <section class="panel active" id="panel-lookup">
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

    dealDetailCard.appendChild(el("p", { class: "section-label", style: "margin-top:18px" }, ["Slack activity" + (body.slack.channel ? " — " + body.slack.channel : "")]));
    if (!body.slack.channel) {
      dealDetailCard.appendChild(el("p", { class: "empty" }, ["No Slack channel mapped to this deal."]));
    } else if (body.slack.messages.length === 0) {
      dealDetailCard.appendChild(el("p", { class: "empty" }, ["Channel is mapped but has no recent messages."]));
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

  loadRoster();
  loadAudit();
}());
</script>
</body>
</html>
`;
