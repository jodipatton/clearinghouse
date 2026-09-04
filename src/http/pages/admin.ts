import { renderPage } from "./layout.js";
import { JS_DOM_HELPERS } from "./shared.js";

const BODY = `
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
`;

const SCRIPT = String.raw`
${JS_DOM_HELPERS}

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
        var tr = el("tr", { class: "clickable-row" }, [
          td(new Date(e.ts).toLocaleTimeString()),
          td(e.actor),
          el("td", {}, [el("code", { class: "mono" }, [e.tool])]),
          td((e.systems || []).join(", ")),
          el("td", {}, [el("span", { class: "badge outcome-" + e.outcome }, [e.outcome])]),
          td(e.ms),
        ]);
        var detailRow = el("tr", {}, [
          el("td", { colspan: "6" }, [el("code", { class: "mono", style: "white-space:pre-wrap; display:block" }, [JSON.stringify(e, null, 2)])]),
        ]);
        detailRow.style.display = "none";
        tr.addEventListener("click", function () {
          detailRow.style.display = detailRow.style.display === "none" ? "table-row" : "none";
        });
        tbody.appendChild(tr);
        tbody.appendChild(detailRow);
      });
    });
  }

  document.getElementById("auditRefreshBtn").addEventListener("click", loadAudit);

  loadRoster();
  loadAudit();
`;

export function renderAdminPage(): string {
  return renderPage({
    active: "admin",
    title: "Admin & audit — Clearinghouse dashboard",
    body: BODY,
    script: SCRIPT,
  });
}
