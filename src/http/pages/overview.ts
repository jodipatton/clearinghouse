import { renderPage } from "./layout.js";
import { JS_DOM_HELPERS, JS_KPI_TILE, JS_NAV_HELPERS } from "./shared.js";

const BODY = `
    <div class="card">
      <div class="row">
        <select id="filterSalesRep"><option value="">All sales reps</option></select>
        <select id="filterCsm"><option value="">All CSMs</option></select>
        <select id="filterImplementationManager"><option value="">All implementation managers</option></select>
        <button class="action" id="filterClearBtn">Clear</button>
      </div>
    </div>
    <div id="overviewRoot"></div>
`;

const SCRIPT = String.raw`
${JS_DOM_HELPERS}
${JS_KPI_TILE}
${JS_NAV_HELPERS}

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
        onClick: function () { window.location.href = "/dashboard/pipeline-pulse?autorun=1"; },
      }),
      kpiTile(String(o.coverage.flaggedCount) + " / " + String(o.coverage.scannedCount), "Coverage gaps", {
        tone: o.coverage.flaggedCount > 0 ? "warn" : null,
        sub: "Open deals missing Slack activity, a next step, or a Gong call",
        onClick: function () { window.location.href = "/dashboard/coverage-check?autorun=1"; },
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
        window.location.href = "/dashboard/pipeline-pulse?autorun=1";
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

  loadOverview();
`;

export function renderOverviewPage(): string {
  return renderPage({
    active: "overview",
    title: "Overview — Clearinghouse dashboard",
    body: BODY,
    script: SCRIPT,
  });
}
