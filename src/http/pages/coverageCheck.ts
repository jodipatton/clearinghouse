import { renderPage } from "./layout.js";
import { JS_DOM_HELPERS, JS_NAV_HELPERS } from "./shared.js";

const BODY = `
    <div class="card">
      <div class="row">
        <input type="text" id="coverageOwner" placeholder="Filter by owner, e.g. &quot;Dana&quot; (optional)" />
        <button class="action" id="coverageRunBtn">Run coverage check</button>
      </div>
      <p class="hint">Open deals only. Flags: no Slack activity synced, no next step, no Gong call on file.</p>
    </div>
    <div class="card" id="coverageResultsCard" style="display:none"></div>
`;

const SCRIPT = String.raw`
${JS_DOM_HELPERS}
${JS_NAV_HELPERS}

  function runCoverage() {
    var owner = document.getElementById("coverageOwner").value.trim();
    var params = owner ? "ownerName=" + encodeURIComponent(owner) : "";
    fetch("/dashboard/api/coverage-check" + (params ? "?" + params : ""))
      .then(function (r) { return r.json(); })
      .then(renderCoverage);
  }
  document.getElementById("coverageRunBtn").addEventListener("click", runCoverage);

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

  // Deep-link entry point: /dashboard/coverage-check?autorun=1, used by the
  // Overview "Coverage gaps" tile, which used to switch tabs and click Run
  // in one motion.
  if (qp("autorun")) runCoverage();
`;

export function renderCoverageCheckPage(): string {
  return renderPage({
    active: "coverage-check",
    title: "Coverage check — Clearinghouse dashboard",
    body: BODY,
    script: SCRIPT,
  });
}
