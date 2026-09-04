import { renderPage } from "./layout.js";
import { JS_DOM_HELPERS, JS_FIND_FIELD, JS_NAV_HELPERS, JS_RICH_HTML, JS_SLACK_ACTIVITY_FIELD } from "./shared.js";

const BODY = `
    <div class="card">
      <p class="section-label">Clinical Connect customers</p>
      <p class="hint">Fallon, Capital Health Plan, Viva Health, Zing Health — what's going well, what isn't, recent meetings, and customer insights. Research fields are static (point-in-time); meetings and Slack activity are live reads.</p>
    </div>
    <div id="ccRoot"></div>
`;

const SCRIPT = String.raw`
${JS_DOM_HELPERS}
${JS_NAV_HELPERS}
${JS_RICH_HTML}
${JS_SLACK_ACTIVITY_FIELD}
${JS_FIND_FIELD}

  function loadClinicalConnect() {
    var root = document.getElementById("ccRoot");
    root.innerHTML = "";
    root.appendChild(el("p", { class: "empty" }, ["Loading…"]));

    fetch("/dashboard/api/portfolio").then(function (r) { return r.json(); }).then(function (summary) {
      Promise.all(
        summary.clinicalConnectIds.map(function (id) {
          return fetch("/dashboard/api/portfolio/accounts/" + encodeURIComponent(id)).then(function (r) { return r.json(); });
        }),
      ).then(renderClinicalConnect);
    });
  }

  function renderClinicalConnect(accounts) {
    var root = document.getElementById("ccRoot");
    root.innerHTML = "";
    accounts.forEach(function (a) {
      if (a.error) return;
      var card = el("div", { class: "card cc-account" }, []);

      var head = el("div", { class: "cc-head" }, [
        el("h2", {}, [a.name]),
        el("span", { class: "seg-pill" }, [el("span", { class: "sdot", style: "background:var(--seg-" + a.seg + ")" }, []), a.seglabel]),
      ]);
      if (a.sf && a.sf.health !== null) {
        head.appendChild(el("span", { class: "badge outcome-ok" }, ["Health " + a.sf.health + "/10"]));
      }
      if (a.liveDealMatch) {
        var liveBtn = el("button", { class: "action" }, ["Open in Deal lookup →"]);
        liveBtn.addEventListener("click", function () { goToDeal(a.liveDealMatch.id); });
        head.appendChild(liveBtn);
      }
      card.appendChild(head);

      var grid = el("div", { class: "cc-grid" }, []);

      // What's going well: implementation momentum + active expansion plays.
      var goingWell = el("div", { class: "cc-bucket good" }, [el("p", { class: "cc-bucket-h" }, ["What's going well"])]);
      var implField = findField(a.fields, "Implementation Status");
      if (implField) {
        var implBody = el("div", {}, []);
        renderRichHtml(implBody, implField.html);
        goingWell.appendChild(implBody);
      }
      if (a.expansionPlays.length > 0) {
        a.expansionPlays.forEach(function (pl) {
          var fit = (pl.fit || "").toLowerCase();
          var cls = fit === "high" ? "hi" : fit === "medium" ? "medium" : fit === "low" ? "lo" : "unrated";
          goingWell.appendChild(el("div", { class: "playc " + cls, style: "margin-top:8px" }, [
            el("div", { class: "ph" }, [el("span", { class: "pn" }, [pl.play]), el("span", { class: "fitbadge " + cls }, [fit || "unrated"])]),
            el("div", { class: "pr" }, [pl.rationale]),
          ]));
        });
      }
      if (!implField && a.expansionPlays.length === 0) goingWell.appendChild(el("p", { class: "cc-empty" }, ["Nothing on file."]));
      grid.appendChild(goingWell);

      // What isn't: the research's own risks/blockers write-up + any Salesforce health flags.
      var notWell = el("div", { class: "cc-bucket bad" }, [el("p", { class: "cc-bucket-h" }, ["What isn't going well"])]);
      var risksField = findField(a.fields, "Risks & Blockers");
      if (risksField) {
        var risksBody = el("div", {}, []);
        renderRichHtml(risksBody, risksField.html);
        notWell.appendChild(risksBody);
      }
      if (a.sf && a.sf.flags && a.sf.flags.length > 0) {
        var flagsRow = el("div", { class: "rflags", style: "margin-top:8px" }, []);
        a.sf.flags.forEach(function (f) { flagsRow.appendChild(el("span", { class: "rflag" }, [f])); });
        notWell.appendChild(flagsRow);
      }
      if (!risksField && (!a.sf || !a.sf.flags || a.sf.flags.length === 0)) {
        notWell.appendChild(el("p", { class: "cc-empty" }, ["Nothing flagged on file."]));
      }
      grid.appendChild(notWell);

      // Meetings: recent Gong calls, only reachable through a resolved live deal.
      var meetings = el("div", { class: "cc-bucket" }, [el("p", { class: "cc-bucket-h" }, ["Meetings"])]);
      if (!a.meetings.available) {
        meetings.appendChild(el("p", { class: "cc-empty" }, ["No live Salesforce opportunity matched — recent calls unavailable."]));
      } else if (a.meetings.calls.length === 0) {
        meetings.appendChild(el("p", { class: "cc-empty" }, ["No Gong calls associated with the matched deal."]));
      } else {
        a.meetings.calls.forEach(function (c) {
          meetings.appendChild(el("div", { class: "msg-line" }, [
            el("span", { class: "from" }, [c.durationMinutes + " min"]),
            el("span", {}, [c.title + " — " + c.participants.map(function (p) { return p.name + (p.isExternal ? " (ext)" : ""); }).join(", ")]),
          ]));
        });
        if (a.meetings.withheld) meetings.appendChild(el("p", { class: "hint" }, ["Summaries withheld — metadata only (PRD decision D)."]));
      }
      grid.appendChild(meetings);

      // Customer insights: key people, points of interest, live Slack activity, sources.
      var insights = el("div", { class: "cc-bucket" }, [el("p", { class: "cc-bucket-h" }, ["Customer insights"])]);
      ["Key People", "Points of Interest"].forEach(function (label) {
        var f = findField(a.fields, label);
        if (!f) return;
        insights.appendChild(el("p", { class: "section-label", style: "margin-top:10px" }, [label]));
        var body = el("div", {}, []);
        renderRichHtml(body, f.html);
        insights.appendChild(body);
      });
      if (a.slackActivity) {
        insights.appendChild(buildSlackActivityField(a.slackActivity));
      }
      if (a.sources.length > 0) {
        insights.appendChild(el("p", { class: "section-label", style: "margin-top:10px" }, ["Sources"]));
        var chips = el("div", { class: "srcchips" }, []);
        a.sources.forEach(function (s) { chips.appendChild(el("span", { class: "s" }, [s])); });
        insights.appendChild(chips);
      }
      grid.appendChild(insights);

      card.appendChild(grid);
      root.appendChild(card);
    });
  }

  loadClinicalConnect();
`;

export function renderClinicalConnectPage(): string {
  return renderPage({
    active: "clinical-connect",
    title: "Clinical Connect — Clearinghouse dashboard",
    body: BODY,
    script: SCRIPT,
  });
}
