import type { PlanhatCompany, PlanhatUser } from "./types.js";

/** Keyed to line up with the CSM names on the Salesforce fixtures' Owner field, for realism. */
export const USER_FIXTURES: PlanhatUser[] = [
  { id: "u_dana", name: "Dana Reyes", email: "dana@1uphealth.com" },
  { id: "u_sam", name: "Sam Okafor", email: "sam@1uphealth.com" },
  { id: "u_priya", name: "Priya Shah", email: "priya@1uphealth.com" },
];

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
    csmOwnerId: "u_dana",
    implementationManagerUserId: "u_priya",
    // Existing customer -- its open opportunity ("Platform Expansion") is
    // exactly the upsell case, not new sales.
    status: "customer",
    healthScore: 8.2,
    expansionSignal: false,
    renewalDate: null,
    arr: 480000,
    lastActivityDate: "2026-08-05T10:00:00Z",
  },
  {
    id: "ph_bigco",
    name: "BigCo Payer",
    csmOwnerId: "u_sam",
    implementationManagerUserId: null,
    // Still a prospect -- its open opportunity is the new-sales case.
    status: "prospect",
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
    csmOwnerId: "u_dana",
    implementationManagerUserId: null,
    status: "customer",
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
    csmOwnerId: "u_sam",
    implementationManagerUserId: null,
    status: "customer",
    // Healthy, expanding, no matching SF opportunity at all —
    // exercises ghost_expansion.
    healthScore: 9.1,
    expansionSignal: true,
    renewalDate: null,
    arr: 90000,
    lastActivityDate: "2026-08-09T00:00:00Z",
  },
];
