import type { Opportunity } from "./types.js";

/** Demo data mirroring the PRD walkthrough — used by SF_MODE=mock and tests. */
export const FIXTURES: Opportunity[] = [
  {
    id: "006Ru00000AbCdEfGh",
    name: "MMM Health — Platform Expansion",
    stage: "Negotiating",
    amount: 480000,
    closeDate: "2026-09-30",
    ownerName: "Dana Reyes",
    accountName: "MMM Health",
    lastModified: "2026-08-04T21:12:00Z",
    nextStep: "Resolve data-retention clause in BAA redlines",
    description:
      "Payer interoperability expansion. Counsel returned BAA redlines; pricing pushback on last call.",
  },
  {
    id: "006Ru00000JkLmNoPq",
    name: "BigCo Payer — FHIR Gateway",
    stage: "Contracting",
    amount: 250000,
    closeDate: "2026-10-15",
    ownerName: "Sam Okafor",
    accountName: "BigCo Payer",
    // Deliberately stale (paired with planhat/fixtures.ts's BigCo company)
    // to exercise the stale_momentum fiction rule in test/fictions.test.ts.
    lastModified: "2026-07-01T00:00:00Z",
    nextStep: "Security review call with their CISO",
    description: "CISO evaluating FHIR endpoint architecture.",
  },
  {
    id: "006Ru00000RsTuVwXy",
    name: "Sunrise Health Plan — Renewal",
    stage: "Closed Won",
    amount: 120000,
    closeDate: "2026-06-30",
    ownerName: "Dana Reyes",
    accountName: "Sunrise Health Plan",
    lastModified: "2026-07-01T09:00:00Z",
    nextStep: null,
    description: null,
  },
];
