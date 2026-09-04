import { renderPage } from "./layout.js";
import { JS_DOM_HELPERS, JS_NAV_HELPERS } from "./shared.js";

const BODY = `
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
`;

const SCRIPT = String.raw`
${JS_DOM_HELPERS}
${JS_NAV_HELPERS}

  function loadAnalyticsFit() {
    fetch("/dashboard/api/portfolio/analytics").then(function (r) { return r.json(); }).then(renderAnalyticsTab);
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
        if (it.ref !== null) row.addEventListener("click", function () { goToAccountId(it.ref); });
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

  loadAnalyticsFit();
`;

export function renderAnalyticsFitPage(): string {
  return renderPage({
    active: "analytics-fit",
    title: "Analytics fit — Clearinghouse dashboard",
    body: BODY,
    script: SCRIPT,
  });
}
