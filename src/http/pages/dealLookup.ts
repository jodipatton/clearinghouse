import { renderPage } from "./layout.js";
import { JS_DOM_HELPERS } from "./shared.js";

const BODY = `
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
`;

const SCRIPT = String.raw`
${JS_DOM_HELPERS}

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
        var fromSpan = el("span", { class: "from" }, [m.from]);
        var line = el("div", { class: "msg-line" }, [fromSpan, el("span", {}, [m.text])]);
        if (m.external) {
          fromSpan.appendChild(el("span", { class: "badge external", style: "margin-left:6px" }, ["external"]));
        }
        dealDetailCard.appendChild(line);
      });
    }
  }

  // Deep-link entry points: /dashboard/deal-lookup?dealId=<id> lands directly
  // on that deal's detail; ?dealQuery=<name> pre-fills the search box and
  // runs it, same as clicking through from another tab used to.
  (function () {
    var dealId = qp("dealId");
    var dealQueryParam = qp("dealQuery");
    if (dealId) {
      loadDeal(dealId);
    } else if (dealQueryParam) {
      dealQuery.value = dealQueryParam;
      runDealSearch();
    }
  }());
`;

export function renderDealLookupPage(): string {
  return renderPage({
    active: "deal-lookup",
    title: "Deal lookup — Clearinghouse dashboard",
    body: BODY,
    script: SCRIPT,
  });
}
