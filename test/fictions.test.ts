import { describe, expect, it } from "vitest";
import { detectFictions, DEFAULT_DETECTOR_CONFIG } from "../src/fictions/detect.js";
import type { DetectInput } from "../src/fictions/types.js";
import type { Opportunity } from "../src/salesforce/types.js";
import type { PlanhatCompany } from "../src/planhat/types.js";
import { FIXTURES as SF_FIXTURES } from "../src/salesforce/fixtures.js";
import { FIXTURES as PLANHAT_FIXTURES } from "../src/planhat/fixtures.js";

// Fixed so tests are deterministic, never wall-clock-dependent.
const ASOF = new Date("2026-08-15T00:00:00Z");

const SHARED_INPUT: DetectInput = {
  opportunities: SF_FIXTURES,
  companies: PLANHAT_FIXTURES,
};

function fictionsOfType(type: string, input = SHARED_INPUT) {
  return detectFictions(input, DEFAULT_DETECTOR_CONFIG, ASOF).filter(
    (f) => f.type === type,
  );
}

describe("ghost_expansion", () => {
  it("fires for Acme (expansion signal + healthy score, zero matching SF opportunities)", () => {
    const fictions = fictionsOfType("ghost_expansion");
    expect(fictions).toHaveLength(1);
    expect(fictions[0].accountName).toBe("Acme Health Systems");
    expect(fictions[0].suggestedAction).toBe("slack_nudge"); // arr 90k < 200k threshold
  });

  it("does not fire for a company without an expansion signal", () => {
    const fictions = fictionsOfType("ghost_expansion", {
      opportunities: [],
      companies: [PLANHAT_FIXTURES.find((c) => c.id === "ph_mmm")!],
    });
    expect(fictions).toHaveLength(0);
  });

  it("does not fire once a matching Salesforce opportunity exists", () => {
    const company: PlanhatCompany = {
      id: "c1",
      name: "Acme Health Systems",
      ownerEmail: null,
      healthScore: 9.1,
      expansionSignal: true,
      renewalDate: null,
      arr: 90000,
      lastActivityDate: null,
    };
    const opportunity: Opportunity = {
      id: "006000000000001AA",
      name: "Acme Health Systems — Expansion",
      stage: "Contracting",
      amount: 50000,
      closeDate: "2026-09-01",
      ownerName: null,
      accountName: "Acme Health Systems",
      lastModified: "2026-08-10T00:00:00Z",
      nextStep: null,
      description: null,
    };
    const fictions = fictionsOfType("ghost_expansion", {
      opportunities: [opportunity],
      companies: [company],
    });
    expect(fictions).toHaveLength(0);
  });

  it("severity is high at/above the ARR threshold, medium below it", () => {
    const base: PlanhatCompany = {
      id: "c",
      name: "Threshold Co",
      ownerEmail: null,
      healthScore: 8.0,
      expansionSignal: true,
      renewalDate: null,
      arr: 0,
      lastActivityDate: null,
    };
    const [high] = fictionsOfType("ghost_expansion", {
      opportunities: [],
      companies: [{ ...base, id: "c-high", arr: 200_000 }],
    });
    const [medium] = fictionsOfType("ghost_expansion", {
      opportunities: [],
      companies: [{ ...base, id: "c-medium", arr: 199_999 }],
    });
    expect(high.severity).toBe("high");
    expect(medium.severity).toBe("medium");
  });
});

describe("renewal_blindspot", () => {
  it("fires for Sunrise (renewal in 36 days, only SF opp is Closed Won)", () => {
    const fictions = fictionsOfType("renewal_blindspot");
    expect(fictions).toHaveLength(1);
    expect(fictions[0].accountName).toBe("Sunrise Health Plan");
    expect(fictions[0].evidence.daysUntilRenewal).toBe(36);
    expect(fictions[0].suggestedAction).toBe("planhat_project"); // always, per the design
    expect(fictions[0].summary).toContain("renews in 36 day(s)");
  });

  it("phrases an already-lapsed renewal date as overdue, not a negative countdown", () => {
    const company: PlanhatCompany = {
      id: "c1",
      name: "Lapsed Co",
      ownerEmail: null,
      healthScore: 5,
      expansionSignal: false,
      renewalDate: "2024-01-01", // long past ASOF (2026-08-15)
      arr: 50000,
      lastActivityDate: null,
    };
    const fictions = fictionsOfType("renewal_blindspot", {
      opportunities: [],
      companies: [company],
    });
    expect(fictions).toHaveLength(1);
    expect(fictions[0].evidence.daysUntilRenewal).toBeLessThan(0);
    expect(fictions[0].summary).toContain("was due");
    expect(fictions[0].summary).toContain("day(s) ago");
    expect(fictions[0].summary).not.toContain("renews in -");
  });

  it("does not fire when an open opportunity closes near the renewal date", () => {
    const company: PlanhatCompany = {
      id: "c1",
      name: "Covered Co",
      ownerEmail: null,
      healthScore: 7.0,
      expansionSignal: false,
      renewalDate: "2026-09-01",
      arr: 100000,
      lastActivityDate: null,
    };
    const opportunity: Opportunity = {
      id: "006000000000002AA",
      name: "Covered Co — Renewal",
      stage: "Negotiating",
      amount: 100000,
      closeDate: "2026-09-05",
      ownerName: null,
      accountName: "Covered Co",
      lastModified: "2026-08-01T00:00:00Z",
      nextStep: null,
      description: null,
    };
    const fictions = fictionsOfType("renewal_blindspot", {
      opportunities: [opportunity],
      companies: [company],
    });
    expect(fictions).toHaveLength(0);
  });

  it("severity is high at/inside the urgent window, medium just outside it", () => {
    const base: PlanhatCompany = {
      id: "c",
      name: "Urgency Co",
      ownerEmail: null,
      healthScore: 7.0,
      expansionSignal: false,
      renewalDate: null,
      arr: 50000,
      lastActivityDate: null,
    };
    const [high] = fictionsOfType("renewal_blindspot", {
      opportunities: [],
      companies: [{ ...base, id: "c-high", renewalDate: "2026-09-05" }], // 21 days out
    });
    const [medium] = fictionsOfType("renewal_blindspot", {
      opportunities: [],
      companies: [{ ...base, id: "c-medium", renewalDate: "2026-09-06" }], // 22 days out
    });
    expect(high.severity).toBe("high");
    expect(medium.severity).toBe("medium");
  });
});

describe("stale_momentum", () => {
  it("fires for BigCo (Contracting stage, stale in both Salesforce and Planhat)", () => {
    const fictions = fictionsOfType("stale_momentum");
    expect(fictions).toHaveLength(1);
    expect(fictions[0].accountName).toBe("BigCo Payer");
    expect(fictions[0].evidence.salesforceDaysSinceModified).toBe(45);
  });

  it("does not fire for MMM (SF opportunity is recent)", () => {
    const fictions = fictionsOfType("stale_momentum", {
      opportunities: [SF_FIXTURES.find((o) => o.accountName === "MMM Health")!],
      companies: [PLANHAT_FIXTURES.find((c) => c.id === "ph_mmm")!],
    });
    expect(fictions).toHaveLength(0);
  });

  it("does not fire when Planhat shows recent activity despite a stale SF opportunity", () => {
    const company: PlanhatCompany = {
      id: "c1",
      name: "Recent Co",
      ownerEmail: null,
      healthScore: 7.0,
      expansionSignal: false,
      renewalDate: null,
      arr: 50000,
      lastActivityDate: "2026-08-10T00:00:00Z", // 5 days before ASOF
    };
    const opportunity: Opportunity = {
      id: "006000000000003AA",
      name: "Recent Co — Deal",
      stage: "Negotiating",
      amount: 50000,
      closeDate: "2026-09-01",
      ownerName: null,
      accountName: "Recent Co",
      lastModified: "2026-06-01T00:00:00Z", // stale in SF
      nextStep: null,
      description: null,
    };
    const fictions = fictionsOfType("stale_momentum", {
      opportunities: [opportunity],
      companies: [company],
    });
    expect(fictions).toHaveLength(0);
  });

  it("is skipped entirely when there's no matching Planhat company", () => {
    const opportunity: Opportunity = {
      id: "006000000000004AA",
      name: "Orphan Co — Deal",
      stage: "Negotiating",
      amount: 50000,
      closeDate: "2026-09-01",
      ownerName: null,
      accountName: "Orphan Co",
      lastModified: "2026-06-01T00:00:00Z",
      nextStep: null,
      description: null,
    };
    const fictions = fictionsOfType("stale_momentum", {
      opportunities: [opportunity],
      companies: [],
    });
    expect(fictions).toHaveLength(0);
  });

  it("severity is high at/above the deal-amount threshold, medium below it", () => {
    const company: PlanhatCompany = {
      id: "c1",
      name: "Amount Co",
      ownerEmail: null,
      healthScore: 7.0,
      expansionSignal: false,
      renewalDate: null,
      arr: 50000,
      lastActivityDate: null,
    };
    const base = {
      stage: "Negotiating" as const,
      closeDate: "2026-09-01",
      ownerName: null,
      accountName: "Amount Co",
      lastModified: "2026-06-01T00:00:00Z",
      nextStep: null,
      description: null,
    };
    const [high] = fictionsOfType("stale_momentum", {
      opportunities: [{ ...base, id: "id-high", name: "high", amount: 200_000 }],
      companies: [company],
    });
    const [medium] = fictionsOfType("stale_momentum", {
      opportunities: [{ ...base, id: "id-medium", name: "medium", amount: 199_999 }],
      companies: [company],
    });
    expect(high.severity).toBe("high");
    expect(medium.severity).toBe("medium");
  });
});

describe("detectFictions", () => {
  it("produces stable, deterministic ids across repeated calls on identical input", () => {
    const first = detectFictions(SHARED_INPUT, DEFAULT_DETECTOR_CONFIG, ASOF).map(
      (f) => f.id,
    );
    const second = detectFictions(SHARED_INPUT, DEFAULT_DETECTOR_CONFIG, ASOF).map(
      (f) => f.id,
    );
    expect(first).toEqual(second);
    expect(first.length).toBeGreaterThan(0);
  });

  it("sorts by severity (high first), then by id", () => {
    const fictions = detectFictions(SHARED_INPUT, DEFAULT_DETECTOR_CONFIG, ASOF);
    for (let i = 1; i < fictions.length; i++) {
      const rank = { high: 0, medium: 1, low: 2 } as const;
      expect(rank[fictions[i - 1].severity]).toBeLessThanOrEqual(
        rank[fictions[i].severity],
      );
    }
  });
});
