import { renderPage } from "./layout.js";
import { JS_DOM_HELPERS, JS_NAV_HELPERS } from "./shared.js";

const BODY = `
    <div class="card">
      <div class="row">
        <input type="text" id="activityOwner" placeholder="Filter by owner, e.g. &quot;Dana&quot; (optional)" />
        <input type="text" id="activityDays" value="14" style="max-width:90px" />
        <button class="action" id="activityRunBtn">Show recent activity</button>
      </div>
      <p class="hint">Days back that counts as "recent." No deal Id needed — this is recent_activity across every deal (or one owner's).</p>
    </div>
    <div class="card" id="activityResultsCard" style="display:none"></div>
`;

const SCRIPT = String.raw`
${JS_DOM_HELPERS}
${JS_NAV_HELPERS}

  function runActivity() {
    var owner = document.getElementById("activityOwner").value.trim();
    var days = document.getElementById("activityDays").value.trim() || "14";
    var params = "days=" + encodeURIComponent(days);
    if (owner) params += "&ownerName=" + encodeURIComponent(owner);
    fetch("/dashboard/api/recent-activity?" + params)
      .then(function (r) { return r.json(); })
      .then(renderActivity);
  }
  document.getElementById("activityRunBtn").addEventListener("click", runActivity);

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
`;

export function renderRecentActivityPage(): string {
  return renderPage({
    active: "recent-activity",
    title: "Recent activity — Clearinghouse dashboard",
    body: BODY,
    script: SCRIPT,
  });
}
