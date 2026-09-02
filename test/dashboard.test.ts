import { describe, expect, it } from "vitest";
import type { AddressInfo } from "node:net";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadConfig } from "../src/config.js";
import { createApp } from "../src/http/app.js";
import { recordingAudit, stdoutAudit } from "../src/audit.js";
import { MockSalesforce } from "../src/salesforce/mock.js";
import { MockSlack } from "../src/slack/mock.js";
import { MockGong } from "../src/gong/mock.js";
import { MockPlanhat } from "../src/planhat/mock.js";
import { Roster } from "../src/roster.js";
import { L10Store } from "../src/l10/store.js";

const PUBLIC_URL = "https://mcp.example.com/mcp";
const DEAL_ID = "006Ru00000AbCdEfGh"; // MMM Health, from src/salesforce/fixtures.ts

function rosterFile(members: { email: string; name?: string }[]): string {
  const dir = mkdtempSync(join(tmpdir(), "ch-dash-roster-"));
  const path = join(dir, "roster.json");
  writeFileSync(path, JSON.stringify({ members }));
  return path;
}

function tempL10Store(): L10Store {
  const dir = mkdtempSync(join(tmpdir(), "ch-dash-l10-"));
  return new L10Store(join(dir, "l10-state.json"));
}

function startServer() {
  const cfg = loadConfig({ PUBLIC_URL, AUTH_MODE: "dev", DEV_USER_EMAIL: "dana@1uphealth.com" });
  const roster = new Roster(rosterFile([{ email: "dana@1uphealth.com", name: "Dana Reyes" }]));
  const planhat = new MockPlanhat();
  const l10Store = tempL10Store();
  const { sink: audit, recent } = recordingAudit(() => {}); // don't spam stdout in tests
  const app = createApp(cfg, {
    sf: new MockSalesforce(),
    slack: new MockSlack(),
    gong: new MockGong(),
    planhat,
    roster,
    audit,
    recentAudit: recent,
    l10Store,
  });
  const server = app.listen(0);
  const { port } = server.address() as AddressInfo;
  return { server, base: `http://127.0.0.1:${port}`, recent, planhat, l10Store };
}

describe("GET /dashboard", () => {
  it("is gated by the same roster as /mcp", async () => {
    const cfg = loadConfig({ PUBLIC_URL, AUTH_MODE: "dev", DEV_USER_EMAIL: "stranger@1uphealth.com" });
    const app = createApp(cfg, {
      sf: new MockSalesforce(),
      slack: new MockSlack(),
      gong: new MockGong(),
      planhat: new MockPlanhat(),
      roster: new Roster(rosterFile([{ email: "dana@1uphealth.com" }])),
      audit: stdoutAudit,
    });
    const server = app.listen(0);
    const { port } = server.address() as AddressInfo;
    const res = await fetch(`http://127.0.0.1:${port}/dashboard`);
    server.close();
    expect(res.status).toBe(403);
  });

  it("serves the page to a roster member", async () => {
    const { server, base } = startServer();
    const res = await fetch(`${base}/dashboard`);
    server.close();
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/html");
    expect(await res.text()).toContain("Clearinghouse dashboard");
  });
});

describe("GET /dashboard/api/deals", () => {
  it("finds a deal by fuzzy query, same as find_deal", async () => {
    const { server, base } = startServer();
    const res = await fetch(`${base}/dashboard/api/deals?q=MMM`);
    const body = await res.json();
    server.close();
    expect(body.matches).toHaveLength(1);
    expect(body.matches[0].id).toBe(DEAL_ID);
    expect(body.matches[0].account).toBe("MMM Health");
  });
});

describe("GET /dashboard/api/deals/:id", () => {
  it("combines Salesforce, Gong, and Slack for one deal", async () => {
    const { server, base } = startServer();
    const res = await fetch(`${base}/dashboard/api/deals/${DEAL_ID}`);
    const body = await res.json();
    server.close();
    expect(body.deal.name).toBe("MMM Health — Platform Expansion");
    expect(body.calls.items).toHaveLength(2);
    expect(body.calls.withheld).toBe(true); // GONG_CONTENT defaults to metadata
    expect(body.calls.items[0].summary).toBeNull();
    expect(body.slack.messages.length).toBeGreaterThan(0);
  });

  it("returns 400 for a malformed opportunity Id rather than 500", async () => {
    const { server, base } = startServer();
    const res = await fetch(`${base}/dashboard/api/deals/not-an-id`);
    server.close();
    expect(res.status).toBe(400);
  });

  it("returns an error payload for an Id that doesn't resolve", async () => {
    const { server, base } = startServer();
    const res = await fetch(`${base}/dashboard/api/deals/006Ru00000NoSuchId`);
    const body = await res.json();
    server.close();
    expect(res.status).toBe(200);
    expect(body.error).toMatch(/not visible|No opportunity/);
  });
});

describe("GET /dashboard/api/recent-activity", () => {
  it("proxies the recent_activity tool, defaulting days to 14", async () => {
    const { server, base } = startServer();
    const res = await fetch(`${base}/dashboard/api/recent-activity`);
    const body = await res.json();
    server.close();
    expect(res.status).toBe(200);
    expect(body.windowDays).toBe(14);
    expect(Array.isArray(body.deals)).toBe(true);
  });

  it("returns 400 for an invalid days value instead of 500", async () => {
    const { server, base } = startServer();
    const res = await fetch(`${base}/dashboard/api/recent-activity?days=-5`);
    server.close();
    expect(res.status).toBe(400);
  });
});

describe("GET /dashboard/api/coverage-check", () => {
  it("proxies the coverage_check tool", async () => {
    const { server, base } = startServer();
    const res = await fetch(`${base}/dashboard/api/coverage-check`);
    const body = await res.json();
    server.close();
    expect(res.status).toBe(200);
    expect(body.scannedCount).toBe(2); // Sunrise (Closed Won) excluded
    expect(body.flaggedCount).toBe(1);
  });

  it("filters by owner name", async () => {
    const { server, base } = startServer();
    const res = await fetch(`${base}/dashboard/api/coverage-check?ownerName=Sam`);
    const body = await res.json();
    server.close();
    expect(body.scannedCount).toBe(1); // only BigCo (Sam Okafor) is open + owned by Sam
  });
});

describe("GET /dashboard/api/overview", () => {
  it("rolls up pipeline, fictions, coverage, and renewals in one response", async () => {
    const { server, base } = startServer();
    const res = await fetch(`${base}/dashboard/api/overview`);
    const body = await res.json();
    server.close();
    expect(res.status).toBe(200);
    expect(body.pipeline.openDealCount).toBeGreaterThan(0);
    expect(body.fictions.bySeverity).toHaveProperty("high");
    expect(body.coverage).toHaveProperty("flaggedCount");
    expect(Array.isArray(body.upcomingRenewals)).toBe(true);
    expect(body.filterOptions.salesReps).toContain("Dana Reyes");
    expect(body.customerHealth).toHaveProperty("averageHealth");
    expect(body.activity.windowDays).toBe(60);
    expect(body.pipeline.newSales).toHaveProperty("amount");
    expect(body.pipeline.upsell).toHaveProperty("amount");
    expect(body.pipeline.renewal).toHaveProperty("amount");
  });

  it("narrows the response by salesRep query param", async () => {
    const { server, base } = startServer();
    const res = await fetch(`${base}/dashboard/api/overview?salesRep=${encodeURIComponent("Dana Reyes")}`);
    const body = await res.json();
    server.close();
    expect(body.filters.salesRep).toBe("Dana Reyes");
    expect(body.pipeline.openDealCount).toBe(1);
  });
});

describe("GET /dashboard/api/roster", () => {
  it("lists the roster's members", async () => {
    const { server, base } = startServer();
    const res = await fetch(`${base}/dashboard/api/roster`);
    const body = await res.json();
    server.close();
    expect(body.members).toEqual([{ email: "dana@1uphealth.com", name: "Dana Reyes" }]);
  });
});

describe("GET /dashboard/api/audit", () => {
  it("reflects prior dashboard calls in the in-memory tail", async () => {
    const { server, base, recent } = startServer();
    await fetch(`${base}/dashboard/api/deals?q=MMM`);
    await fetch(`${base}/dashboard/api/audit`); // this call is itself audited too
    server.close();
    const events = recent();
    expect(events.some((e) => e.tool === "dashboard.find_deal" && e.outcome === "ok")).toBe(true);
  });
});

describe("POST /dashboard/api/pipeline-pulse", () => {
  it("always runs dry-run, even if ROUTINES_DRY_RUN=false in config", async () => {
    const cfg = loadConfig({
      PUBLIC_URL,
      AUTH_MODE: "dev",
      DEV_USER_EMAIL: "dana@1uphealth.com",
      ROUTINES_DRY_RUN: "false",
    });
    const planhat = new MockPlanhat();
    const app = createApp(cfg, {
      sf: new MockSalesforce(),
      slack: new MockSlack(),
      gong: new MockGong(),
      planhat,
      roster: new Roster(rosterFile([{ email: "dana@1uphealth.com" }])),
      audit: stdoutAudit,
    });
    const server = app.listen(0);
    const { port } = server.address() as AddressInfo;
    const res = await fetch(`http://127.0.0.1:${port}/dashboard/api/pipeline-pulse`, { method: "POST" });
    const body = await res.json();
    server.close();
    expect(body.dryRun).toBe(true);
    expect(body.createdProjects).toEqual([]);
    expect(planhat.createdProjects).toEqual([]);
  });
});

async function postJson(url: string, body: unknown, method = "POST") {
  const res = await fetch(url, {
    method,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  return { status: res.status, body: await res.json() };
}

describe("GET /dashboard/api/l10/state", () => {
  it("returns the seeded default state the first time, before anything is persisted", async () => {
    const { server, base } = startServer();
    const res = await fetch(`${base}/dashboard/api/l10/state`);
    const { state } = await res.json();
    server.close();
    expect(state.metrics).toHaveLength(8);
    expect(state.issues).toHaveLength(12);
    expect(state.todos).toHaveLength(6);
    expect(state.facilitator).toBe("");
  });
});

describe("L10 issues", () => {
  it("adds an issue and persists it", async () => {
    const { server, base } = startServer();
    const { body } = await postJson(`${base}/dashboard/api/l10/issues`, {
      title: "New cross-functional issue",
      area: "Test",
      tier: "P1",
    });
    server.close();
    expect(body.state.issues).toHaveLength(13);
    expect(body.state.issues.at(-1)).toMatchObject({ title: "New cross-functional issue", tier: "P1", touched: true });
  });

  it("patches root/discuss/tier and marks the issue touched", async () => {
    const { server, base } = startServer();
    const { body } = await postJson(
      `${base}/dashboard/api/l10/issues/i1`,
      { root: "Merger paperwork stuck in legal", tier: "P2" },
      "PATCH",
    );
    server.close();
    const patched = body.state.issues.find((i: { id: string }) => i.id === "i1");
    expect(patched).toMatchObject({ root: "Merger paperwork stuck in legal", tier: "P2", touched: true });
  });
});

describe("L10 Reporting: off-track auto-drops to Issues, on-track un-drops it", () => {
  it("creates a linked issue when a metric flips off-track, and removes it when flipped back", async () => {
    const { server, base } = startServer();

    const off = await postJson(`${base}/dashboard/api/l10/metrics/metric/m7/status`, { status: "off" });
    expect(off.body.state.metrics.find((m: { id: string }) => m.id === "m7").status).toBe("off");
    const dropped = off.body.state.issues.find((i: { autoFrom?: string }) => i.autoFrom === "metric:m7");
    expect(dropped).toBeTruthy();
    expect(dropped.touched).toBe(false);

    const on = await postJson(`${base}/dashboard/api/l10/metrics/metric/m7/status`, { status: "ok" });
    server.close();
    expect(on.body.state.issues.some((i: { autoFrom?: string }) => i.autoFrom === "metric:m7")).toBe(false);
  });

  it("keeps the auto-dropped issue once a human has touched it, even after flipping back on-track", async () => {
    const { server, base } = startServer();
    await postJson(`${base}/dashboard/api/l10/metrics/metric/m7/status`, { status: "off" });
    const state1 = (await (await fetch(`${base}/dashboard/api/l10/state`)).json()).state;
    const dropped = state1.issues.find((i: { autoFrom?: string }) => i.autoFrom === "metric:m7");

    await postJson(`${base}/dashboard/api/l10/issues/${dropped.id}`, { root: "Investigated it" }, "PATCH");
    const on = await postJson(`${base}/dashboard/api/l10/metrics/metric/m7/status`, { status: "ok" });
    server.close();
    expect(on.body.state.issues.some((i: { id: string }) => i.id === dropped.id)).toBe(true);
  });
});

describe("L10 to-dos", () => {
  it("adds a to-do and toggles it done", async () => {
    const { server, base } = startServer();
    const added = await postJson(`${base}/dashboard/api/l10/todos`, { text: "Follow up", owner: "Jodi" });
    const todoId = added.body.state.todos.at(-1).id;
    const toggled = await postJson(`${base}/dashboard/api/l10/todos/${todoId}`, { done: true }, "PATCH");
    server.close();
    expect(toggled.body.state.todos.find((t: { id: string }) => t.id === todoId).done).toBe(true);
  });

  it("carries an undone to-do into a new P3 Issue", async () => {
    const { server, base } = startServer();
    const { body } = await postJson(`${base}/dashboard/api/l10/todos/t4/carry-to-issue`, {});
    server.close();
    const carried = body.state.issues.find((i: { title: string }) => i.title === "Carried: Assign owner for DNA-2240 (batch-id data-loss blocker)");
    expect(carried).toMatchObject({ tier: "P3", area: "Carry-over" });
  });
});

describe("POST /dashboard/api/l10/issues/:id/solve", () => {
  it("solves an issue locally without touching Planhat when writeToPlanhat is false", async () => {
    const { server, base, planhat } = startServer();
    const { body } = await postJson(`${base}/dashboard/api/l10/issues/i2/solve`, {
      todoText: "Draft a triage model for ePA capacity",
      owner: "Jeremy",
      writeToPlanhat: false,
    });
    server.close();
    expect(body.planhatPushed).toBe(false);
    expect(planhat.createdTasks).toEqual([]);
    expect(body.state.issues.find((i: { id: string }) => i.id === "i2").solved).toBe(true);
    expect(body.state.todos.some((t: { text: string }) => t.text === "Draft a triage model for ePA capacity")).toBe(true);
  });

  it("skips the Planhat write with a reason when the issue isn't tied to one account", async () => {
    const { server, base, planhat } = startServer();
    const { body } = await postJson(`${base}/dashboard/api/l10/issues/i3/solve`, {
      todoText: "Assign an owner",
      writeToPlanhat: true,
    });
    server.close();
    expect(body.planhatPushed).toBe(false);
    expect(body.planhatSkippedReason).toMatch(/isn't tied to one specific account/);
    expect(planhat.createdTasks).toEqual([]);
  });

  it("skips with a reason when the account doesn't resolve to a real Planhat company", async () => {
    const { server, base, planhat } = startServer();
    // i1 is tied to "Vaya Health", which isn't one of MockPlanhat's fixture companies.
    const { body } = await postJson(`${base}/dashboard/api/l10/issues/i1/solve`, {
      todoText: "Get the SOW signed",
      writeToPlanhat: true,
    });
    server.close();
    expect(body.planhatPushed).toBe(false);
    expect(body.planhatSkippedReason).toMatch(/No Planhat company found/);
    expect(planhat.createdTasks).toEqual([]);
  });

  it("writes a real Planhat Task when the issue's account resolves to a fixture company", async () => {
    const { server, base, planhat } = startServer();
    const added = await postJson(`${base}/dashboard/api/l10/issues`, {
      title: "MMM Health renewal risk",
      accountName: "MMM Health", // matches MockPlanhat's ph_mmm fixture
      tier: "P1",
    });
    const issueId = added.body.state.issues.at(-1).id;

    const { body } = await postJson(`${base}/dashboard/api/l10/issues/${issueId}/solve`, {
      todoText: "Confirm renewal terms with MMM",
      owner: "Dana", // matches USER_FIXTURES' "Dana Reyes"
      writeToPlanhat: true,
    });
    server.close();

    expect(body.planhatPushed).toBe(true);
    expect(planhat.createdTasks).toHaveLength(1);
    expect(planhat.createdTasks[0]).toMatchObject({ companyId: "ph_mmm", action: "Confirm renewal terms with MMM" });
    const solvedIssue = body.state.issues.find((i: { id: string }) => i.id === issueId);
    expect(solvedIssue.planhatTaskId).toBe(planhat.createdTasks[0].id);
  });
});
