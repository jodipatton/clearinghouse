import { describe, expect, it } from "vitest";
import { MockSalesforce } from "../src/salesforce/mock.js";
import { MockSlack } from "../src/slack/mock.js";
import { MockGong } from "../src/gong/mock.js";
import { MockPlanhat } from "../src/planhat/mock.js";
import { recentActivity } from "../src/tools/recentActivity.js";
import { coverageCheck } from "../src/tools/coverageCheck.js";
import { pipelineSnapshot } from "../src/tools/pipelineSnapshot.js";

// Fixed so tests are deterministic, never wall-clock-dependent -- matches
// test/fictions.test.ts's convention. MMM was last modified ~10 days before
// this, BigCo ~45 days before, Sunrise (Closed Won) ~44 days before.
const ASOF = new Date("2026-08-15T00:00:00Z");
const MMM_ID = "006Ru00000AbCdEfGh";

describe("recent_activity", () => {
  it("defaults to a 14-day window: only MMM (10 days old) qualifies, BigCo/Sunrise don't", async () => {
    const result = await recentActivity(
      new MockSalesforce(),
      new MockSlack(),
      new MockGong(),
      { days: 14 },
      ASOF,
    );
    expect(result.dealCount).toBe(1);
    const deals = result.deals as { id: string; slackMessagesInWindow: number; gongCallsInWindow: number }[];
    expect(deals[0].id).toBe(MMM_ID);
    expect(deals[0].slackMessagesInWindow).toBe(3); // all 3 fixture messages land ~13 days back
    expect(deals[0].gongCallsInWindow).toBe(1); // only the Aug 4 call is within 14 days; Jul 28 isn't
  });

  it("widening the window surfaces older deals, sorted most-recent-first", async () => {
    const result = await recentActivity(
      new MockSalesforce(),
      new MockSlack(),
      new MockGong(),
      { days: 60 },
      ASOF,
    );
    const deals = result.deals as { id: string }[];
    expect(deals.map((d) => d.id)).toEqual([
      MMM_ID,
      "006Ru00000RsTuVwXy", // Sunrise, ~44 days
      "006Ru00000JkLmNoPq", // BigCo, ~45 days
    ]);
  });

  it("filters by owner name", async () => {
    const result = await recentActivity(
      new MockSalesforce(),
      new MockSlack(),
      new MockGong(),
      { ownerName: "Dana", days: 60 },
      ASOF,
    );
    const deals = result.deals as { owner: string }[];
    expect(deals.length).toBeGreaterThan(0);
    expect(deals.every((d) => d.owner === "Dana Reyes")).toBe(true);
  });
});

describe("coverage_check", () => {
  it("flags BigCo (no Slack channel, no Gong call) but not MMM (fully covered)", async () => {
    const result = await coverageCheck(new MockSalesforce(), new MockGong(), {});
    expect(result.scannedCount).toBe(2); // Sunrise is Closed Won, excluded
    expect(result.flaggedCount).toBe(1);
    const deals = result.deals as { id: string; missing: Record<string, boolean> }[];
    expect(deals[0].id).toBe("006Ru00000JkLmNoPq");
    expect(deals[0].missing).toEqual({ slackChannel: true, nextStep: false, gongCall: true });
  });

  it("excludes closed deals even when they'd otherwise be flagged", async () => {
    const result = await coverageCheck(new MockSalesforce(), new MockGong(), {});
    const deals = result.deals as { id: string }[];
    expect(deals.some((d) => d.id === "006Ru00000RsTuVwXy")).toBe(false); // Sunrise
  });
});

describe("pipeline_snapshot", () => {
  it("only returns severities at or above the threshold", async () => {
    const high = await pipelineSnapshot(new MockSalesforce(), new MockPlanhat(), {
      minSeverity: "high",
    });
    const highCandidates = high.candidates as { severity: string }[];
    expect(highCandidates.every((c) => c.severity === "high")).toBe(true);

    const low = await pipelineSnapshot(new MockSalesforce(), new MockPlanhat(), {
      minSeverity: "low",
    });
    const lowCandidates = low.candidates as { type: string; severity: string }[];
    // ghost_expansion on Acme fires regardless of wall-clock time (no date
    // fields involved) at severity "medium" -- present at "low", filtered at "high".
    expect(
      lowCandidates.some((c) => c.type === "ghost_expansion" && c.severity === "medium"),
    ).toBe(true);
    expect(lowCandidates.length).toBeGreaterThanOrEqual(highCandidates.length);
  });

  it("never proposes or writes to Planhat -- read-only by construction", async () => {
    const planhat = new MockPlanhat();
    const result = await pipelineSnapshot(new MockSalesforce(), planhat, { minSeverity: "low" });
    expect(result.proposedProjects).toBeUndefined();
    expect(result.createdProjects).toBeUndefined();
    expect(planhat.createdProjects).toEqual([]);
  });
});
