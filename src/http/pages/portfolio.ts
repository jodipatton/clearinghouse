import { renderPage } from "./layout.js";
import { JS_DOM_HELPERS, JS_NAV_HELPERS, JS_RICH_HTML } from "./shared.js";

const BODY = `
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
`;

const SCRIPT = String.raw`
${JS_DOM_HELPERS}
${JS_NAV_HELPERS}
${JS_RICH_HTML}

  function loadPortfolio() {
    fetch("/dashboard/api/portfolio").then(function (r) { return r.json(); }).then(renderPortfolioTab);
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
    hero.addEventListener("click", function () { window.location.href = "/dashboard/customers"; });
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
        window.location.href = "/dashboard/customers?seg=" + encodeURIComponent(s.seg);
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
    hiTile.addEventListener("click", function () { window.location.href = "/dashboard/customers"; });
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
      if (t.ref !== null) row.addEventListener("click", function () { goToAccountId(t.ref); });
      ops.appendChild(row);
    });

    renderRichHtml(document.getElementById("portfolioBriefing"), o.synthesisHtml);
  }

  loadPortfolio();
`;

export function renderPortfolioPage(): string {
  return renderPage({
    active: "portfolio",
    title: "Portfolio — Clearinghouse dashboard",
    body: BODY,
    script: SCRIPT,
  });
}
