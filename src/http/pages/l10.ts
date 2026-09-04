import { renderPage } from "./layout.js";
import { JS_DOM_HELPERS } from "./shared.js";

const BODY = `
    <div class="card">
      <div class="l10-top">
        <div>
          <label>Facilitator (rotates each meeting)</label>
          <input type="text" id="l10Facilitator" placeholder="Name…" />
        </div>
        <button class="action" id="l10RefreshBriefingBtn">Refresh live signal</button>
      </div>
      <p class="hint">Segue → Reporting → To-Do Review → IDS → Close. Bi-weekly, 60 min. "Refresh live signal" pulls current Slack/Salesforce/Gong evidence for the tracked accounts below — it never decides on-track/off-track for you.</p>
    </div>

    <div class="l10-subnav">
      <button data-l10sec="segue" class="active">1. Segue</button>
      <button data-l10sec="report">2. Reporting</button>
      <button data-l10sec="todo">3. To-Do Review</button>
      <button data-l10sec="ids">4. IDS</button>
      <button data-l10sec="close">5. Close</button>
    </div>

    <div class="l10-section active" id="l10sec-segue">
      <div class="card">
        <p class="section-label">Good news round — one personal + one professional highlight each</p>
        <div id="l10SegueRows"></div>
      </div>
    </div>

    <div class="l10-section" id="l10sec-report">
      <div class="card">
        <p class="hint"><b>No discussion.</b> Each owner says on-track or off-track only. Off-track drops straight to Issues for IDS.</p>
      </div>
      <div class="card">
        <p class="section-label">Scorecard — weekly metrics</p>
        <div id="l10Metrics"></div>
      </div>
      <div class="card">
        <p class="section-label">Quarterly Rocks</p>
        <div id="l10Rocks"></div>
      </div>
    </div>

    <div class="l10-section" id="l10sec-todo">
      <div class="card">
        <p class="section-label">Last week's to-dos</p>
        <div id="l10Todos"></div>
        <p class="hint">Done or not done — no explanations. Not-done items carry over or drop to Issues.</p>
      </div>
    </div>

    <div class="l10-section" id="l10sec-ids">
      <div class="card">
        <p class="hint">Facilitator: strike anything not cross-functional, then work top-down — Identify the root cause, Discuss all solutions, Solve with a to-do. IDS the top 3; the rest carry to next week.</p>
      </div>
      <div class="card">
        <p class="section-label">Issues list</p>
        <div id="l10Issues"></div>
        <div class="row" style="margin-top:10px; flex-wrap:wrap">
          <input type="text" id="l10NewIssueTitle" placeholder="Add an issue…" style="flex:2; min-width:200px" />
          <input type="text" id="l10NewIssueArea" placeholder="Area" style="flex:1; min-width:100px" />
          <select id="l10NewIssueTier"><option value="P1">P1</option><option value="P2" selected>P2</option><option value="P3">P3</option></select>
          <button class="action" id="l10AddIssueBtn">Add</button>
        </div>
      </div>
    </div>

    <div class="l10-section" id="l10sec-close">
      <div class="card">
        <p class="section-label">New to-dos this meeting</p>
        <div id="l10NewTodos"></div>
        <div class="row" style="margin-top:10px">
          <input type="text" id="l10NewTodoText" placeholder="Add a to-do…" />
          <input type="text" id="l10NewTodoOwner" placeholder="Owner" style="max-width:140px" />
          <button class="action" id="l10AddTodoBtn">Add</button>
        </div>
      </div>
      <div class="card">
        <div class="row" style="justify-content:space-between">
          <p class="section-label" style="margin:0">Rate the meeting (1–10)</p>
          <div class="l10-avg" id="l10Avg">—</div>
        </div>
        <div id="l10Scores"></div>
      </div>
      <div class="card">
        <div class="row" style="justify-content:space-between">
          <p class="section-label" style="margin:0">Meeting recap</p>
          <button class="action" id="l10CopyRecapBtn">Copy recap</button>
        </div>
        <textarea class="l10-recap" id="l10Recap" readonly></textarea>
        <p class="hint">Paste into Slack / your notes. Solved issues close out; open issues carry to next week's prioritization.</p>
      </div>
    </div>
`;

// Note: the "Solve & create to-do" flow below is this dashboard's one
// deliberate, scoped exception to "no writes from a browser click" — it
// performs a real Planhat Task write, gated on an explicit confirm() each
// time and only when the issue resolves to one real Planhat company. See
// the doc comment atop buildDashboardRouter in src/http/dashboard.ts. This
// route refactor changes nothing about that behavior or its API shape.
const SCRIPT = String.raw`
${JS_DOM_HELPERS}

  var l10State = null;
  var l10Briefing = null;
  var l10OpenIssueIds = {};
  var l10SolveDraft = {}; // issueId -> { text, owner, push }

  function l10Fetch(path, opts) {
    opts = opts || {};
    var init = { method: opts.method || "GET" };
    if (opts.body) {
      init.headers = { "content-type": "application/json" };
      init.body = JSON.stringify(opts.body);
    }
    return fetch("/dashboard/api/l10" + path, init).then(function (r) { return r.json(); });
  }

  function loadL10State() {
    l10Fetch("/state").then(function (res) {
      l10State = res.state;
      renderL10All();
    });
  }

  function loadL10Briefing() {
    var btn = document.getElementById("l10RefreshBriefingBtn");
    btn.disabled = true;
    btn.textContent = "Refreshing…";
    l10Fetch("/briefing").then(function (res) {
      l10Briefing = res.accounts;
      btn.disabled = false;
      btn.textContent = "Refresh live signal";
      renderL10Reporting();
    });
  }

  function l10BriefingFor(accountName) {
    if (!l10Briefing || !accountName) return null;
    for (var i = 0; i < l10Briefing.length; i++) {
      if (l10Briefing[i].name === accountName) return l10Briefing[i];
    }
    return null;
  }

  function renderL10All() {
    renderL10Segue();
    renderL10Reporting();
    renderL10Todos();
    renderL10Issues();
    renderL10Close();
    document.getElementById("l10Facilitator").value = l10State.facilitator || "";
  }

  // ---- sub-nav ----
  document.querySelectorAll(".l10-subnav button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".l10-subnav button").forEach(function (b) { b.classList.remove("active"); });
      document.querySelectorAll(".l10-section").forEach(function (s) { s.classList.remove("active"); });
      btn.classList.add("active");
      document.getElementById("l10sec-" + btn.dataset.l10sec).classList.add("active");
    });
  });

  document.getElementById("l10Facilitator").addEventListener("blur", function (e) {
    l10Fetch("/facilitator", { method: "POST", body: { facilitator: e.target.value } }).then(function (res) {
      l10State = res.state;
    });
  });

  document.getElementById("l10RefreshBriefingBtn").addEventListener("click", loadL10Briefing);

  // ---- segue ----
  function renderL10Segue() {
    var root = document.getElementById("l10SegueRows");
    root.innerHTML = "";
    Object.keys(l10State.segue).forEach(function (name) {
      var row = el("div", { class: "l10-row", style: "grid-template-columns:140px 1fr 1fr" }, []);
      row.appendChild(el("div", { class: "l10-name" }, [name]));
      var personal = el("input", { type: "text", placeholder: "Personal win…" }, []);
      personal.value = l10State.segue[name].personal || "";
      personal.addEventListener("blur", function () {
        l10Fetch("/segue", { method: "POST", body: { participant: name, personal: personal.value } })
          .then(function (res) { l10State = res.state; });
      });
      var professional = el("input", { type: "text", placeholder: "Professional win…" }, []);
      professional.value = l10State.segue[name].professional || "";
      professional.addEventListener("blur", function () {
        l10Fetch("/segue", { method: "POST", body: { participant: name, professional: professional.value } })
          .then(function (res) { l10State = res.state; });
      });
      row.appendChild(personal);
      row.appendChild(professional);
      root.appendChild(row);
    });
  }

  // ---- reporting ----
  function l10RenderMetricRow(row, kind) {
    var wrap = el("div", { class: "l10-row" }, []);
    var left = el("div", {}, [
      el("div", { class: "l10-name" }, [row.name]),
      el("div", { class: "l10-meta" }, [row.meta]),
    ]);
    var briefing = l10BriefingFor(row.accountName);
    if (briefing) {
      var bits = [];
      if (briefing.qlabel) bits.push("Portfolio status: " + briefing.qlabel);
      bits.push(briefing.slackMessageCount + " Slack messages (last 60d)");
      if (briefing.liveDeal) bits.push("live deal: " + briefing.liveDeal.stage);
      var live = el("div", { class: "l10-live" }, [bits.join(" · ") + " (as of " + new Date(briefing.asOf).toLocaleString() + ")"]);
      if (briefing.staticRisk) {
        var snippet = briefing.staticRisk.length > 220 ? briefing.staticRisk.slice(0, 220) + "…" : briefing.staticRisk;
        live.appendChild(el("div", { style: "margin-top:4px" }, [snippet]));
      }
      left.appendChild(live);
    } else if (row.accountName) {
      left.appendChild(el("div", { class: "l10-live" }, ["No live signal loaded yet for " + row.accountName + " — click \"Refresh live signal\" above."]));
    }
    wrap.appendChild(left);
    wrap.appendChild(el("div", { class: "l10-owner" }, [row.owner]));
    var toggle = el("div", { class: "l10-toggle" }, []);
    var okBtn = el("button", { class: "on-ok" + (row.status === "ok" ? " sel" : "") }, ["On track"]);
    var offBtn = el("button", { class: "on-off" + (row.status === "off" ? " sel" : "") }, ["Off track"]);
    function setStatus(status) {
      l10Fetch("/metrics/" + kind + "/" + row.id + "/status", { method: "POST", body: { status: status } })
        .then(function (res) { l10State = res.state; renderL10Reporting(); renderL10Issues(); });
    }
    okBtn.addEventListener("click", function () { setStatus("ok"); });
    offBtn.addEventListener("click", function () { setStatus("off"); });
    toggle.appendChild(okBtn);
    toggle.appendChild(offBtn);
    wrap.appendChild(toggle);
    return wrap;
  }

  function renderL10Reporting() {
    if (!l10State) return;
    var metrics = document.getElementById("l10Metrics");
    metrics.innerHTML = "";
    l10State.metrics.forEach(function (m) { metrics.appendChild(l10RenderMetricRow(m, "metric")); });
    var rocks = document.getElementById("l10Rocks");
    rocks.innerHTML = "";
    l10State.rocks.forEach(function (r) { rocks.appendChild(l10RenderMetricRow(r, "rock")); });
  }

  // ---- to-do review ----
  function renderL10Todos() {
    var root = document.getElementById("l10Todos");
    root.innerHTML = "";
    var lastWeek = l10State.todos.filter(function (t) { return !t.isNew; });
    lastWeek.forEach(function (t) {
      var row = el("div", { class: "l10-todo" }, []);
      var check = el("button", { class: "l10-check" + (t.done ? " done" : "") }, [t.done ? "✓" : ""]);
      check.addEventListener("click", function () {
        l10Fetch("/todos/" + t.id, { method: "PATCH", body: { done: !t.done } }).then(function (res) {
          l10State = res.state; renderL10Todos(); renderL10Close();
        });
      });
      row.appendChild(check);
      row.appendChild(el("div", {}, [
        el("div", { class: "l10-todo-text" + (t.done ? " done" : "") }, [t.text]),
        el("div", { class: "l10-owner" }, [t.owner]),
      ]));
      if (!t.done) {
        var carry = el("button", { class: "l10-live-link" }, ["Drop to Issues →"]);
        carry.addEventListener("click", function () {
          l10Fetch("/todos/" + t.id + "/carry-to-issue", { method: "POST", body: {} }).then(function (res) {
            l10State = res.state; renderL10Todos(); renderL10Issues();
          });
        });
        row.appendChild(carry);
      } else {
        row.appendChild(el("span", {}, [""]));
      }
      root.appendChild(row);
    });
  }

  // ---- IDS / issues ----
  var L10_TIER_RANK = { P1: 0, P2: 1, P3: 2 };

  function l10SortedIssues() {
    return l10State.issues.slice().sort(function (a, b) {
      if (a.struck !== b.struck) return a.struck ? 1 : -1;
      if (a.solved !== b.solved) return a.solved ? 1 : -1;
      return L10_TIER_RANK[a.tier] - L10_TIER_RANK[b.tier];
    });
  }

  function l10PatchIssue(id, patch, skipRerender) {
    return l10Fetch("/issues/" + id, { method: "PATCH", body: patch }).then(function (res) {
      l10State = res.state;
      if (!skipRerender) renderL10Issues();
      return res;
    });
  }

  function l10RenderIssueCard(issue) {
    var card = el("div", { class: "l10-issue" + (issue.solved ? " solved" : "") + (issue.struck ? " struck" : "") }, []);
    var head = el("div", { class: "l10-issue-head" }, []);

    var rank = el("div", { class: "l10-rank" }, []);
    var tierSelect = el("select", {}, ["P1", "P2", "P3"].map(function (t) {
      var opt = el("option", { value: t }, [t]);
      if (t === issue.tier) opt.setAttribute("selected", "selected");
      return opt;
    }));
    tierSelect.addEventListener("change", function () { l10PatchIssue(issue.id, { tier: tierSelect.value }); });
    rank.appendChild(tierSelect);
    head.appendChild(rank);

    var mid = el("div", {}, []);
    mid.appendChild(el("div", { class: "l10-issue-title" + (issue.struck ? " struck-through" : "") }, [issue.title]));
    var metaBits = [el("span", { class: "badge" }, [issue.area])];
    metaBits.push(el("span", { class: "badge" }, [issue.xfn ? "cross-fn" : "not x-fn"]));
    metaBits.push(el("span", {}, ["raised by " + issue.raised]));
    if (issue.accountName) metaBits.push(el("span", { class: "badge external" }, [issue.accountName]));
    if (issue.solved) metaBits.push(el("span", { class: "badge outcome-ok" }, ["solved"]));
    var meta = el("div", { class: "l10-issue-meta" }, []);
    metaBits.forEach(function (b) { meta.appendChild(b); });
    mid.appendChild(meta);
    head.appendChild(mid);

    var actions = el("div", { style: "display:flex; gap:6px; align-items:center" }, []);
    var toggleBtn = el("button", { class: "l10-live-link" }, [l10OpenIssueIds[issue.id] ? "Close" : "IDS"]);
    toggleBtn.addEventListener("click", function () {
      l10OpenIssueIds[issue.id] = !l10OpenIssueIds[issue.id];
      renderL10Issues();
    });
    actions.appendChild(toggleBtn);
    var strikeBtn = el("button", { class: "action" }, [issue.struck ? "Restore" : "Strike"]);
    strikeBtn.addEventListener("click", function () { l10PatchIssue(issue.id, { struck: !issue.struck }); });
    actions.appendChild(strikeBtn);
    head.appendChild(actions);

    card.appendChild(head);

    if (l10OpenIssueIds[issue.id] && !issue.struck) {
      var body = el("div", { class: "l10-ids-body" }, []);
      if (issue.note) body.appendChild(el("div", { class: "l10-meta" }, [issue.note]));

      var rootGroup = el("div", {}, [el("label", {}, ["Identify — root cause"])]);
      var rootArea = el("textarea", { placeholder: "What's actually driving this?" }, []);
      rootArea.value = issue.root || "";
      rootArea.addEventListener("blur", function () { l10PatchIssue(issue.id, { root: rootArea.value }, true); });
      rootGroup.appendChild(rootArea);
      body.appendChild(rootGroup);

      var solGroup = el("div", {}, [el("label", {}, ["Discuss — solution possibilities"])]);
      var solArea = el("textarea", { placeholder: "Options on the table…" }, []);
      solArea.value = issue.solutions || "";
      solArea.addEventListener("blur", function () { l10PatchIssue(issue.id, { solutions: solArea.value }, true); });
      solGroup.appendChild(solArea);
      body.appendChild(solGroup);

      if (!issue.solved) {
        var solveGroup = el("div", {}, [el("label", {}, ["Solve — assign a to-do"])]);
        var solveRow = el("div", { class: "l10-solverow" }, []);
        var draft = l10SolveDraft[issue.id] || { text: "", owner: "", push: false };
        var todoInput = el("input", { type: "text", placeholder: "Actionable to-do (owner + what)…" }, []);
        todoInput.value = draft.text;
        todoInput.addEventListener("input", function () { draft.text = todoInput.value; l10SolveDraft[issue.id] = draft; });
        solveRow.appendChild(todoInput);
        var ownerInput = el("input", { type: "text", placeholder: "Owner (optional)", style: "max-width:140px" }, []);
        ownerInput.value = draft.owner;
        ownerInput.addEventListener("input", function () { draft.owner = ownerInput.value; l10SolveDraft[issue.id] = draft; });
        solveRow.appendChild(ownerInput);

        var pushLabel = el("label", { style: "display:flex; align-items:center; gap:4px; font-size:12px; color:var(--ink-dim)" }, []);
        var pushCheck = el("input", { type: "checkbox" }, []);
        pushCheck.checked = !!draft.push;
        if (!issue.accountName) pushCheck.setAttribute("disabled", "disabled");
        pushCheck.addEventListener("change", function () { draft.push = pushCheck.checked; l10SolveDraft[issue.id] = draft; });
        pushLabel.appendChild(pushCheck);
        pushLabel.appendChild(document.createTextNode(issue.accountName ? "Also create a real Planhat Task for " + issue.accountName : "Not tied to one account — local only"));
        solveRow.appendChild(pushLabel);

        var solveBtn = el("button", { class: "action" }, ["Solve & create to-do"]);
        solveBtn.addEventListener("click", function () {
          if (!todoInput.value.trim()) return;
          var wantsPush = !!(draft.push && issue.accountName);
          if (wantsPush && !confirm("This will create a REAL Task in Planhat for " + issue.accountName + ". Continue?")) return;
          l10Fetch("/issues/" + issue.id + "/solve", {
            method: "POST",
            body: { todoText: todoInput.value.trim(), owner: ownerInput.value.trim() || undefined, writeToPlanhat: wantsPush },
          }).then(function (res) {
            delete l10SolveDraft[issue.id];
            l10State = res.state;
            renderL10Issues();
            renderL10Close();
            if (res.planhatPushed) {
              alert("Created a real Planhat Task for " + issue.accountName + ".");
            } else if (wantsPush && res.planhatSkippedReason) {
              alert("Saved locally, but not pushed to Planhat: " + res.planhatSkippedReason);
            }
          });
        });
        solveRow.appendChild(solveBtn);
        solveGroup.appendChild(solveRow);
        body.appendChild(solveGroup);
      } else if (issue.planhatTaskId) {
        body.appendChild(el("div", { class: "l10-meta" }, ["Pushed to Planhat as a real Task (" + issue.planhatTaskId + ")."]));
      }

      card.appendChild(body);
    }

    return card;
  }

  function renderL10Issues() {
    if (!l10State) return;
    var root = document.getElementById("l10Issues");
    root.innerHTML = "";
    var activeCount = 0;
    l10SortedIssues().forEach(function (issue) {
      var isActive = !issue.solved && !issue.struck;
      if (isActive) activeCount++;
      root.appendChild(l10RenderIssueCard(issue));
      if (isActive && activeCount === 3) {
        root.appendChild(el("div", { class: "l10-divider" }, [
          el("b", {}, ["Top 3 · IDS these this week"]),
          el("em", {}, ["everything below carries to next week's prioritization"]),
        ]));
      }
    });
  }

  document.getElementById("l10AddIssueBtn").addEventListener("click", function () {
    var title = document.getElementById("l10NewIssueTitle");
    var area = document.getElementById("l10NewIssueArea");
    var tier = document.getElementById("l10NewIssueTier");
    if (!title.value.trim()) return;
    l10Fetch("/issues", { method: "POST", body: { title: title.value.trim(), area: area.value.trim() || undefined, tier: tier.value } })
      .then(function (res) {
        l10State = res.state;
        title.value = "";
        area.value = "";
        renderL10Issues();
      });
  });

  // ---- close ----
  function renderL10Close() {
    if (!l10State) return;
    var newTodosRoot = document.getElementById("l10NewTodos");
    newTodosRoot.innerHTML = "";
    var newTodos = l10State.todos.filter(function (t) { return t.isNew; });
    if (!newTodos.length) newTodosRoot.appendChild(el("p", { class: "hint" }, ["No new to-dos yet. Solve issues in IDS to generate them."]));
    newTodos.forEach(function (t) {
      var row = el("div", { class: "l10-todo" }, []);
      var check = el("button", { class: "l10-check" + (t.done ? " done" : "") }, [t.done ? "✓" : ""]);
      check.addEventListener("click", function () {
        l10Fetch("/todos/" + t.id, { method: "PATCH", body: { done: !t.done } }).then(function (res) {
          l10State = res.state; renderL10Close();
        });
      });
      row.appendChild(check);
      row.appendChild(el("div", {}, [
        el("div", { class: "l10-todo-text" + (t.done ? " done" : "") }, [t.text]),
        el("div", { class: "l10-owner" }, [t.owner]),
      ]));
      row.appendChild(el("span", {}, [""]));
      newTodosRoot.appendChild(row);
    });

    var scoresRoot = document.getElementById("l10Scores");
    scoresRoot.innerHTML = "";
    Object.keys(l10State.segue).forEach(function (name) {
      var row = el("div", { class: "l10-row", style: "grid-template-columns:1fr auto" }, []);
      row.appendChild(el("div", { class: "l10-name" }, [name]));
      var set = el("div", { class: "l10-scoreset" }, []);
      for (var n = 1; n <= 10; n++) {
        (function (n) {
          var btn = el("button", { class: l10State.scores[name] === n ? "sel" : "" }, [String(n)]);
          btn.addEventListener("click", function () {
            l10Fetch("/scores", { method: "POST", body: { participant: name, score: n } }).then(function (res) {
              l10State = res.state; renderL10Close();
            });
          });
          set.appendChild(btn);
        })(n);
      }
      row.appendChild(set);
      scoresRoot.appendChild(row);
    });

    var scoreVals = Object.keys(l10State.scores).map(function (k) { return l10State.scores[k]; });
    var avg = scoreVals.length ? (scoreVals.reduce(function (a, b) { return a + b; }, 0) / scoreVals.length).toFixed(1) : "—";
    document.getElementById("l10Avg").textContent = avg;

    document.getElementById("l10Recap").value = l10BuildRecap(avg);
  }

  function l10BuildRecap(avg) {
    var lines = [];
    lines.push("L10 Implementation Review");
    lines.push("Facilitator: " + (l10State.facilitator || "(rotate)") + "   Meeting score: " + avg + "/10");
    lines.push("");
    lines.push("OFF-TRACK (reporting):");
    l10State.metrics.concat(l10State.rocks).filter(function (m) { return m.status === "off"; }).forEach(function (m) {
      lines.push("  • " + m.name + " — " + m.owner);
    });
    lines.push("");
    lines.push("ISSUES SOLVED:");
    var solved = l10State.issues.filter(function (i) { return i.solved; });
    if (!solved.length) lines.push("  (none yet)");
    solved.forEach(function (i) { lines.push("  • " + i.title + (i.root ? " | root: " + i.root : "")); });
    lines.push("");
    lines.push("NEW TO-DOS (7-day):");
    var newTodos = l10State.todos.filter(function (t) { return t.isNew; });
    if (!newTodos.length) lines.push("  (none yet)");
    newTodos.forEach(function (t) { lines.push("  • " + t.text + " — " + t.owner); });
    lines.push("");
    lines.push("CARRY-OVER ISSUES (top of next week):");
    l10State.issues
      .filter(function (i) { return !i.solved && !i.struck; })
      .sort(function (a, b) { return L10_TIER_RANK[a.tier] - L10_TIER_RANK[b.tier]; })
      .slice(0, 6)
      .forEach(function (i) { lines.push("  • [" + i.tier + "] " + i.title); });
    return lines.join("\n");
  }

  document.getElementById("l10AddTodoBtn").addEventListener("click", function () {
    var text = document.getElementById("l10NewTodoText");
    var owner = document.getElementById("l10NewTodoOwner");
    if (!text.value.trim()) return;
    l10Fetch("/todos", { method: "POST", body: { text: text.value.trim(), owner: owner.value.trim() || undefined } })
      .then(function (res) {
        l10State = res.state;
        text.value = "";
        owner.value = "";
        renderL10Close();
      });
  });

  document.getElementById("l10CopyRecapBtn").addEventListener("click", function () {
    var box = document.getElementById("l10Recap");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(box.value).catch(function () { box.select(); document.execCommand("copy"); });
    } else {
      box.select();
      document.execCommand("copy");
    }
  });

  loadL10State();
`;

export function renderL10Page(): string {
  return renderPage({
    active: "l10",
    title: "L10 — Clearinghouse dashboard",
    body: BODY,
    script: SCRIPT,
  });
}
