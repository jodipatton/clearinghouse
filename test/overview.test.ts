import { describe, expect, it } from "vitest";
import { MockSalesforce } from "../src/salesforce/mock.js";
import { MockSlack } from "../src/slack/mock.js";
import { MockGong } from "../src/gong/mock.js";
import { MockPlanhat } from "../src/planhat/mock.js";
import { buildOverview } from "../src/routines/overview.js";

// Fixed so tests are deterministic -- matches test/fictions.test.ts's ASOF,
// so the numbers here line up with that file's documented expectations.
const ASOF = new Date("2026-08-15T00:00:00Z");

function build() {
  return buildOverview(
    new MockSalesforce(),
    new MockSlack(),
    new MockGong(),
    new MockPlanhat(),
    ASOF,
  );
}

describe("buildOverview", () => {
  it("rolls up open pipeline by stage, sorted by amount descending", async () => {
    const o = await build();
    expect(o.pipeline.openDealCount).toBe(2); // Sunrise is Closed Won, excluded
    expect(o.pipeline.openPipelineAmount).toBe(730000); // 480000 (MMM) + 250000 (BigCo)
    expect(o.pipeline.byStage).toEqual([
      { stage: "Negotiating", count: 1, amount: 480000 },
      { stage: "Contracting", count: 1, amount: 250000 },
    ]);
  });

  it("rolls up fictions by severity, matching detectFictions on the same fixtures", async () => {
    const o = await build();
    expect(o.fictions.totalCount).toBe(3);
    expect(o.fictions.bySeverity).toEqual({ high: 1, medium: 2, low: 0 });
    expect(o.fictions.top.length).toBe(3);
    expect(o.fictions.top[0].severity).toBe("high"); // sorted severity-first
  });

  it("rolls up coverage_check's scan/flag counts", async () => {
    const o = await build();
    expect(o.coverage.scannedCount).toBe(2);
    expect(o.coverage.flaggedCount).toBe(1);
  });

  it("lists upcoming renewals sorted soonest-first, skipping companies with no renewal date", async () => {
    const o = await build();
    expect(o.upcomingRenewals).toEqual([
      {
        companyId: "ph_sunrise",
        name: "Sunrise Health Plan",
        renewalDate: "2026-09-20",
        daysUntil: 36,
        arr: 120000,
      },
    ]);
  });

  it("never writes to Planhat -- pure read rollup", async () => {
    const planhat = new MockPlanhat();
    await buildOverview(new MockSalesforce(), new MockSlack(), new MockGong(), planhat, ASOF);
    expect(planhat.createdProjects).toEqual([]);
  });
});
