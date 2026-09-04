import { renderPage } from "./layout.js";
import { JS_DOM_HELPERS, JS_NAV_HELPERS, JS_RICH_HTML, JS_SLACK_ACTIVITY_FIELD } from "./shared.js";

const BODY = `
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
`;

const SCRIPT = String.raw`
${JS_DOM_HELPERS}
${JS_NAV_HELPERS}
${JS_RICH_HTML}
${JS_SLACK_ACTIVITY_FIELD}

  var portfolioCache = null;
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

  function loadCustomers() {
    fetch("/dashboard/api/portfolio").then(function (r) { return r.json(); }).then(function (o) {
      portfolioCache = o;
      renderCustomersTab(o);
      handleDeepLink();
    });
  }

  function handleDeepLink() {
    var accountId = qp("accountId");
    var accountName = qp("accountName");
    if (accountId !== null) {
      var n = Number(accountId);
      openDossier(isNaN(n) ? accountId : n);
      return;
    }
    if (accountName) {
      var profile = portfolioDirectoryByName(accountName);
      if (profile) {
        openDossier(profile.id);
      } else {
        // No portfolio dossier for this account -- same fallback the old
        // in-memory goToAccountByName used: a real Deal lookup search.
        window.location.replace("/dashboard/deal-lookup?dealQuery=" + encodeURIComponent(accountName));
      }
    }
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

    var segParam = qp("seg");
    if (segParam) custState.seg = segParam;

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
        tr.addEventListener("click", function () { goToDealQuery(o.name); });
        oppsBody.appendChild(tr);
      });
      oppsTable.appendChild(oppsBody);
      panel.appendChild(oppsTable);
    }
    return panel;
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
      searchBtn.addEventListener("click", function () { goToDealQuery(a.name); });
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

  loadCustomers();
`;

export function renderCustomersPage(): string {
  return renderPage({
    active: "customers",
    title: "Customers — Clearinghouse dashboard",
    body: BODY,
    script: SCRIPT,
  });
}
