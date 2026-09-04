import { renderPage } from "./layout.js";
import { JS_DOM_HELPERS, JS_NAV_HELPERS } from "./shared.js";

const BODY = `
    <div class="card">
      <div class="row">
        <button class="action" id="pulseRunBtn">Run pipeline-pulse (dry run)</button>
        <span class="hint">Always dry-run from here — nothing is ever written to Planhat by this button.</span>
      </div>
    </div>
    <div class="card" id="pulseResultsCard" style="display:none"></div>
`;

const SCRIPT = String.raw`
${JS_DOM_HELPERS}
${JS_NAV_HELPERS}

  var pulseResultsCard = document.getElementById("pulseResultsCard");
  var pulseRunBtn = document.getElementById("pulseRunBtn");

  function runPulse() {
    pulseRunBtn.disabled = true;
    pulseRunBtn.textContent = "Running…";
    fetch("/dashboard/api/pipeline-pulse", { method: "POST" })
      .then(function (r) { return r.json(); })
      .then(function (body) {
        pulseRunBtn.disabled = false;
        pulseRunBtn.textContent = "Run pipeline-pulse (dry run)";
        renderPulse(body);
      });
  }
  pulseRunBtn.addEventListener("click", runPulse);

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

  // Deep-link entry point: /dashboard/pipeline-pulse?autorun=1, used by the
  // Overview "Fictions flagged" / severity tiles, which used to switch tabs
  // and click Run in one motion.
  if (qp("autorun")) runPulse();
`;

export function renderPipelinePulsePage(): string {
  return renderPage({
    active: "pipeline-pulse",
    title: "Pipeline-pulse — Clearinghouse dashboard",
    body: BODY,
    script: SCRIPT,
  });
}
