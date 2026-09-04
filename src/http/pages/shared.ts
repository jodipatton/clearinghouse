/**
 * Small, reusable client-JS snippets shared by more than one /dashboard/*
 * page. Each export is a fragment of plain (ES5-ish, no build step) JS —
 * pages compose the ones they actually need into their own <script> IIFE
 * rather than every page shipping all eleven tabs' worth of JS.
 *
 * JS_DOM_HELPERS/JS_NAV_HELPERS are cheap enough (a few hundred bytes) that
 * most pages include them; the untrusted-content-only-via-DOM-builder
 * pattern below (never innerHTML for external-system text) is the one rule
 * every page must keep, same as the pre-split dashboardPage.ts.
 */

/** el()/td()/money() — the DOM-builder trio nearly every page needs. */
export const JS_DOM_HELPERS = String.raw`
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    for (var k in (attrs || {})) {
      if (k === "class") node.className = attrs[k];
      else node.setAttribute(k, attrs[k]);
    }
    (children || []).forEach(function (c) {
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function td(text) { return el("td", {}, [String(text === null || text === undefined || text === "" ? "—" : text)]); }

  function money(n) {
    if (n === null || n === undefined) return "—";
    return "$" + Math.round(n).toLocaleString();
  }

  function qp(name) {
    return new URLSearchParams(window.location.search).get(name);
  }
`;

/** A KPI tile with an optional muted explainer line and an optional click-through. Needs JS_DOM_HELPERS. */
export const JS_KPI_TILE = String.raw`
  function kpiTile(value, label, opts) {
    opts = opts || {};
    var cls = "kpi-tile" + (opts.tone ? " tone-" + opts.tone : "") + (opts.onClick ? " clickable-row" : "");
    var children = [
      el("span", { class: "value" }, [value]),
      el("span", { class: "label" }, [label]),
    ];
    if (opts.sub) children.push(el("span", { class: "sub" }, [opts.sub]));
    var tile = el("div", { class: cls }, children);
    if (opts.onClick) tile.addEventListener("click", opts.onClick);
    return tile;
  }
`;

/**
 * Universal cross-page drill-throughs. Deep-linking replaced the old
 * in-memory activateTab()+load() jump with a real navigation to the target
 * route, which reads the query param on load and fetches/renders that
 * detail immediately (see deal-lookup.ts's dealId/dealQuery handling and
 * customers.ts's accountId/accountName handling).
 */
export const JS_NAV_HELPERS = String.raw`
  function goToDeal(id) {
    if (!id) return;
    window.location.href = "/dashboard/deal-lookup?dealId=" + encodeURIComponent(id);
  }
  function goToDealQuery(name) {
    if (!name) return;
    window.location.href = "/dashboard/deal-lookup?dealQuery=" + encodeURIComponent(name);
  }
  function goToAccountByName(name) {
    if (!name) return;
    window.location.href = "/dashboard/customers?accountName=" + encodeURIComponent(name);
  }
  function goToAccountId(id) {
    if (id === null || id === undefined) return;
    window.location.href = "/dashboard/customers?accountId=" + encodeURIComponent(id);
  }
`;

/**
 * Renders a small HTML string (built server-side by fmtToHtml, or ported
 * verbatim from the original research write-up) as DOM nodes without ever
 * assigning it to innerHTML: parse into a detached document, then rebuild
 * only allowlisted tags one node at a time, dropping every attribute except
 * a citation span's class. Untrusted-sourced text never goes through raw
 * innerHTML, same rule as the rest of this codebase.
 */
export const JS_RICH_HTML = String.raw`
  var RICH_ALLOWED_TAGS = {
    p: 1, h3: 1, h4: 1, ul: 1, ol: 1, li: 1, strong: 1, em: 1,
    table: 1, thead: 1, tbody: 1, tr: 1, th: 1, td: 1, code: 1, span: 1,
  };
  function cloneRichNode(node) {
    if (node.nodeType === 3) return document.createTextNode(node.textContent);
    if (node.nodeType !== 1) return null;
    var tag = node.tagName.toLowerCase();
    var out;
    if (!RICH_ALLOWED_TAGS[tag]) {
      out = document.createDocumentFragment();
    } else {
      out = document.createElement(tag);
      if (tag === "span" && node.className === "cite") out.className = "cite";
    }
    Array.prototype.forEach.call(node.childNodes, function (c) {
      var cc = cloneRichNode(c);
      if (cc) out.appendChild(cc);
    });
    return out;
  }
  function renderRichHtml(container, html) {
    container.innerHTML = "";
    container.classList.add("rich");
    if (!html) return;
    var doc = new DOMParser().parseFromString("<div>" + html + "</div>", "text/html");
    var root = doc.body.firstChild;
    if (!root) return;
    Array.prototype.forEach.call(root.childNodes, function (c) {
      var cc = cloneRichNode(c);
      if (cc) container.appendChild(cc);
    });
  }
`;

/** Live Slack activity field, shared by the customer dossier and Clinical Connect. */
export const JS_SLACK_ACTIVITY_FIELD = String.raw`
  function buildSlackActivityField(activity) {
    var field = el("div", { class: "field" }, [
      el("div", { class: "fl" }, ["Slack activity, last " + activity.windowDays + " days"]),
    ]);
    field.appendChild(el("p", { class: "hint", style: "margin:0 0 8px" }, [
      String(activity.messageCount) + " message(s) in the last " + activity.windowDays + " days.",
    ]));
    if (activity.messages.length === 0) {
      field.appendChild(el("p", { class: "empty" }, ["No Slack activity synced for this account."]));
      return field;
    }
    activity.messages.forEach(function (m) {
      var fromSpan = el("span", { class: "from" }, [m.from || "—"]);
      if (m.external) fromSpan.appendChild(el("span", { class: "badge external", style: "margin-left:6px" }, ["external"]));
      field.appendChild(el("div", { class: "msg-line" }, [fromSpan, el("span", {}, [m.text])]));
    });
    return field;
  }
`;

/** Finds one research field by label, used by Clinical Connect. */
export const JS_FIND_FIELD = String.raw`
  function findField(fields, label) {
    var hit = null;
    fields.forEach(function (f) { if (!hit && f.label === label) hit = f; });
    return hit;
  }
`;
