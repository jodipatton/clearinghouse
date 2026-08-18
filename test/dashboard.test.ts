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

const PUBLIC_URL = "https://mcp.example.com/mcp";
const DEAL_ID = "006Ru00000AbCdEfGh"; // MMM Health, from src/salesforce/fixtures.ts

function rosterFile(members: { email: string; name?: string }[]): string {
  const dir = mkdtempSync(join(tmpdir(), "ch-dash-roster-"));
  const path = join(dir, "roster.json");
  writeFileSync(path, JSON.stringify({ members }));
  return path;
}

function startServer() {
  const cfg = loadConfig({ PUBLIC_URL, AUTH_MODE: "dev", DEV_USER_EMAIL: "dana@1uphealth.com" });
  const roster = new Roster(rosterFile([{ email: "dana@1uphealth.com", name: "Dana Reyes" }]));
  const planhat = new MockPlanhat();
  const { sink: audit, recent } = recordingAudit(() => {}); // don't spam stdout in tests
  const app = createApp(cfg, {
    sf: new MockSalesforce(),
    slack: new MockSlack(),
    gong: new MockGong(),
    planhat,
    roster,
    audit,
    recentAudit: recent,
  });
  const server = app.listen(0);
  const { port } = server.address() as AddressInfo;
  return { server, base: `http://127.0.0.1:${port}`, recent, planhat };
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
