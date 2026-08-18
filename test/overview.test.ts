import { describe, expect, it } from "vitest";
import { MockSalesforce } from "../src/salesforce/mock.js";
import { MockSlack } from "../src/slack/mock.js";
import { MockGong } from "../src/gong/mock.js";
import { MockPlanhat } from "../src/planhat/mock.js";
import { buildOverview } from "../src/routines/overview.js";

// Fixed so tests are deterministic -- matches test/fictions.test.ts's ASOF.
const ASOF = new Date("2026-08-15T00:00:00Z");

function build(filters = {}) {
  return buildOverview(
    new MockSalesforce(),
    new MockSlack(),
    new MockGong(),
    new MockPlanhat(),
    ASOF,
    filters,
  );
}

describe("buildOverview (unfiltered)", () => {
  it("splits open pipeline into new-sales / upsell / renewal by stage + Planhat account status", async () => {
    const o = await build();
    // MMM (Negotiating, an existing "customer" account) is upsell.
    // BigCo (Contracting, still a "prospect" account) is new sales.
    // Neither is in a Renewal-prefixed stage.
    expect(o.pipeline.openDealCount).toBe(2);
    expect(o.pipeline.upsell).toEqual({ count: 1, amount: 480000 });
    expect(o.pipeline.newSales).toEqual({ count: 1, amount: 250000 });
    expect(o.pipeline.renewal).toEqual({ count: 0, amount: 0 });
  });

  it("exposes full filter option lists resolved from Planhat's User model", async () => {
    const o = await build();
    expect(o.filterOptions.salesReps).toEqual(["Dana Reyes", "Sam Okafor"]);
    expect(o.filterOptions.csms).toEqual(["Dana Reyes", "Sam Okafor"]);
    expect(o.filterOptions.implementationManagers).toEqual(["Priya Shah"]);
  });

  it("rolls up customer health: average score and an at-risk list", async () => {
    const o = await build();
    expect(o.customerHealth.averageHealth).toBeCloseTo(7.025, 3);
    expect(o.customerHealth.atRiskCount).toBe(1);
    expect(o.customerHealth.atRiskCompanies[0].name).toBe("BigCo Payer");
  });

  it("rolls up 60-day Slack activity per account, biggest accounts first, busiest first", async () => {
    const o = await build();
    expect(o.activity.windowDays).toBe(60);
    expect(o.activity.byAccount[0]).toEqual({ accountName: "MMM Health", messageCount: 3 });
    expect(o.activity.byAccount.map((a) => a.accountName)).toContain("BigCo Payer");
  });
});

describe("buildOverview (salesRep filter)", () => {
  it("narrows opportunities AND companies to the rep's accounts, keeping fictions/renewals consistent", async () => {
    const o = await build({ salesRep: "Dana Reyes" });
    expect(o.pipeline.openDealCount).toBe(1); // only MMM is open; Sunrise is Closed Won
    expect(o.pipeline.upsell.amount).toBe(480000); // MMM is an existing "customer" account
    // Sunrise's renewal_blindspot still shows -- Sunrise is one of Dana's accounts.
    expect(o.upcomingRenewals).toHaveLength(1);
    expect(o.upcomingRenewals[0].name).toBe("Sunrise Health Plan");
    expect(o.fictions.totalCount).toBe(1);
    expect(o.fictions.top[0].type).toBe("renewal_blindspot");
  });
});

describe("buildOverview (csm filter)", () => {
  it("narrows companies to the CSM's book, and opportunities to match", async () => {
    const o = await build({ csm: "Sam Okafor" });
    // Sam owns BigCo (has a real SF opp) and Acme (Planhat-only, no SF opp).
    expect(o.pipeline.openDealCount).toBe(1); // BigCo's Contracting opp
    expect(o.fictions.totalCount).toBe(2); // stale_momentum (BigCo) + ghost_expansion (Acme)
    const types = o.fictions.top.map((f) => f.type).sort();
    expect(types).toEqual(["ghost_expansion", "stale_momentum"]);
  });
});

describe("buildOverview (implementationManager filter)", () => {
  it("narrows to the one company with that implementation manager set", async () => {
    const o = await build({ implementationManager: "Priya Shah" });
    expect(o.pipeline.openDealCount).toBe(1); // MMM
    expect(o.coverage.scannedCount).toBe(1);
    expect(o.coverage.flaggedCount).toBe(0); // MMM is fully covered
  });
});

describe("buildOverview read-only guarantee", () => {
  it("never writes to Planhat", async () => {
    const planhat = new MockPlanhat();
    await buildOverview(new MockSalesforce(), new MockSlack(), new MockGong(), planhat, ASOF);
    expect(planhat.createdProjects).toEqual([]);
  });
});
