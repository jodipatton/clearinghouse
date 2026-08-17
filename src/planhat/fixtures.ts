import type { PlanhatCompany } from "./types.js";

/**
 * Keyed to line up with salesforce/fixtures.ts's three accounts (MMM Health,
 * BigCo Payer, Sunrise Health Plan) plus one Planhat-only company with no SF
 * presence at all — engineered so each fiction rule has exactly one fixture
 * that fires it and at least one that doesn't.
 */
export const FIXTURES: PlanhatCompany[] = [
  {
    id: "ph_mmm",
    name: "MMM Health",
    ownerEmail: "dana@1uphealth.com",
    healthScore: 8.2,
    expansionSignal: false,
    renewalDate: null,
    arr: 480000,
    lastActivityDate: "2026-08-05T10:00:00Z",
  },
  {
    id: "ph_bigco",
    name: "BigCo Payer",
    ownerEmail: "sam@1uphealth.com",
    // Middling score, but no recent activity in either system — exercises
    // stale_momentum against the open Contracting-stage SF opportunity.
    healthScore: 4.0,
    expansionSignal: false,
    renewalDate: null,
    arr: 250000,
    lastActivityDate: "2026-06-01T00:00:00Z",
  },
  {
    id: "ph_sunrise",
    name: "Sunrise Health Plan",
    ownerEmail: "dana@1uphealth.com",
    healthScore: 6.8,
    expansionSignal: false,
    // Renewal coming up; SF's only opportunity for this account is Closed Won
    // with a closeDate months earlier — exercises renewal_blindspot.
    renewalDate: "2026-09-20",
    arr: 120000,
    lastActivityDate: "2026-07-20T00:00:00Z",
  },
  {
    id: "ph_acme",
    name: "Acme Health Systems",
    ownerEmail: "sam@1uphealth.com",
    // Healthy, expanding, no matching SF opportunity at all —
    // exercises ghost_expansion.
    healthScore: 9.1,
    expansionSignal: true,
    renewalDate: null,
    arr: 90000,
    lastActivityDate: "2026-08-09T00:00:00Z",
  },
];
