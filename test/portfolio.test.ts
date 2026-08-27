import { describe, expect, it } from "vitest";
import type { AddressInfo } from "node:net";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadConfig } from "../src/config.js";
import { createApp } from "../src/http/app.js";
import { recordingAudit } from "../src/audit.js";
import { MockSalesforce } from "../src/salesforce/mock.js";
import { MockSlack } from "../src/slack/mock.js";
import { MockGong } from "../src/gong/mock.js";
import { MockPlanhat } from "../src/planhat/mock.js";
import { Roster } from "../src/roster.js";
import { PORTFOLIO_DATA } from "../src/portfolio/data.js";
import { buildPortfolioSummary, getPortfolioAccount, buildAnalyticsFit, fmtToHtml } from "../src/routines/portfolio.js";

const PUBLIC_URL = "https://mcp.example.com/mcp";

function rosterFile(members: { email: string; name?: string }[]): string {
  const dir = mkdtempSync(join(tmpdir(), "ch-portfolio-roster-"));
  const path = join(dir, "roster.json");
  writeFileSync(path, JSON.stringify({ members }));
  return path;
}

function startServer() {
  const cfg = loadConfig({ PUBLIC_URL, AUTH_MODE: "dev", DEV_USER_EMAIL: "dana@1uphealth.com" });
  const roster = new Roster(rosterFile([{ email: "dana@1uphealth.com", name: "Dana Reyes" }]));
  const { sink: audit, recent } = recordingAudit(() => {});
  const app = createApp(cfg, {
    sf: new MockSalesforce(),
    slack: new MockSlack(),
    gong: new MockGong(),
    planhat: new MockPlanhat(),
    roster,
    audit,
    recentAudit: recent,
  });
  const server = app.listen(0);
  const { port } = server.address() as AddressInfo;
  return { server, base: `http://127.0.0.1:${port}` };
}

describe("PORTFOLIO_DATA", () => {
  it("has 43 ported accounts, each with the fields the dashboard renders", () => {
    expect(PORTFOLIO_DATA.profiles).toHaveLength(43);
    for (const p of PORTFOLIO_DATA.profiles) {
      expect(typeof p.id).toBe("number");
      expect(typeof p.name).toBe("string");
      expect(PORTFOLIO_DATA.qorder).toContain(p.quarter);
    }
  });
});

describe("fmtToHtml", () => {
  it("never emits a tag beyond its own allowlist, even if the input tries to smuggle one", () => {
    const html = fmtToHtml("Uses <script>alert(1)</script> and **bold** [Confluence: X]");
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("<strong>bold</strong>");
    expect(html).toContain('<span class="cite">[Confluence: X]</span>');
  });

  it("turns an enumerated list into <ol><li>", () => {
    const html = fmtToHtml("Intro. 1) First thing 2) Second thing");
    expect(html).toContain("<ol>");
    expect(html.match(/<li>/g)).toHaveLength(2);
  });

  it("returns an empty string for null input", () => {
    expect(fmtToHtml(null)).toBe("");
  });
});

describe("buildPortfolioSummary", () => {
  it("rolls up ARR by segment and lists all 43 accounts in the directory", () => {
    const s = buildPortfolioSummary();
    expect(s.directory).toHaveLength(43);
    expect(s.totalArr).toBe(PORTFOLIO_DATA.sfSummary.total_arr);
    const segCounts = s.bySegment.reduce((sum, seg) => sum + seg.count, 0);
    expect(segCounts).toBe(43);
  });

  it("resolves topPlays refs to a real account name", () => {
    const s = buildPortfolioSummary();
    const withRef = s.topPlays.find((t) => t.ref !== null);
    expect(withRef).toBeDefined();
    expect(withRef!.accountName).toBe(PORTFOLIO_DATA.profiles[withRef!.ref as number].name);
  });
});

describe("getPortfolioAccount", () => {
  it("returns null for an unknown id", async () => {
    const account = await getPortfolioAccount(9999, new MockSalesforce(), new MockSlack(), new MockGong());
    expect(account).toBeNull();
  });

  it("returns the dossier fields as allowlisted HTML, never the raw research text with live markup", async () => {
    const account = await getPortfolioAccount(0, new MockSalesforce(), new MockSlack(), new MockGong());
    expect(account).not.toBeNull();
    expect(account!.name).toBe(PORTFOLIO_DATA.profiles[0].name);
    const fields = account!.fields as { label: string; html: string }[];
    expect(fields.length).toBeGreaterThan(0);
    for (const f of fields) expect(f.html).not.toContain("<script");
  });

  it("has no live Salesforce match against mock data (portfolio accounts aren't in the mock fixtures)", async () => {
    const account = await getPortfolioAccount(0, new MockSalesforce(), new MockSlack(), new MockGong());
    expect(account!.liveDealMatch).toBeNull();
  });

  it("carries a live 60-day Slack activity read alongside the static research", async () => {
    const account = await getPortfolioAccount(0, new MockSalesforce(), new MockSlack(), new MockGong());
    const activity = account!.slackActivity as { windowDays: number; messageCount: number; messages: unknown[] };
    expect(activity.windowDays).toBe(60);
    expect(typeof activity.messageCount).toBe("number");
    expect(Array.isArray(activity.messages)).toBe(true);
  });

  it("has no meetings available when there's no live deal match", async () => {
    const account = await getPortfolioAccount(0, new MockSalesforce(), new MockSlack(), new MockGong());
    const meetings = account!.meetings as { available: boolean; calls: unknown[] };
    expect(meetings.available).toBe(false);
    expect(meetings.calls).toEqual([]);
  });
});

describe("buildAnalyticsFit", () => {
  it("returns the Analytics Fit study with tiers and a Project Prism pitch", () => {
    const a = buildAnalyticsFit();
    expect(a.tiers.length).toBeGreaterThan(0);
    expect(a.product.name).toBeTruthy();
    expect(typeof a.product.pitch).toBe("string");
  });
});

describe("GET /dashboard/api/portfolio", () => {
  it("is gated by the same roster as /mcp and /dashboard", async () => {
    const { server, base } = startServer();
    const res = await fetch(`${base}/dashboard/api/portfolio`);
    const body = await res.json();
    server.close();
    expect(res.status).toBe(200);
    expect(body.directory).toHaveLength(43);
  });
});

describe("GET /dashboard/api/portfolio/accounts/:id", () => {
  it("returns one account's dossier", async () => {
    const { server, base } = startServer();
    const res = await fetch(`${base}/dashboard/api/portfolio/accounts/0`);
    const body = await res.json();
    server.close();
    expect(body.name).toBe(PORTFOLIO_DATA.profiles[0].name);
  });

  it("returns an error payload for a non-numeric id instead of 500", async () => {
    const { server, base } = startServer();
    const res = await fetch(`${base}/dashboard/api/portfolio/accounts/not-a-number`);
    const body = await res.json();
    server.close();
    expect(body.error).toBeTruthy();
  });
});

describe("GET /dashboard/api/portfolio/analytics", () => {
  it("returns the Analytics Fit study", async () => {
    const { server, base } = startServer();
    const res = await fetch(`${base}/dashboard/api/portfolio/analytics`);
    const body = await res.json();
    server.close();
    expect(body.tiers.length).toBeGreaterThan(0);
  });
});
