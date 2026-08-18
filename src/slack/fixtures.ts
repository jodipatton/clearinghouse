import type { SlackMessage } from "./types.js";

/**
 * Demo data mirroring the PRD walkthrough — used by SLACK_MODE=mock and
 * tests. Keyed by account name (the real "#account-<name>" join key is a
 * channel-name match, not a stored field -- see LiveSlack), matching
 * src/salesforce/fixtures.ts's MMM Health account.
 */
export const FIXTURES: Record<string, SlackMessage[]> = {
  "MMM Health": [
    {
      ts: "1785700000.000100",
      userDisplay: "Dana Reyes",
      text: "Legal sent the BAA redlines back, reviewing now.",
      isExternal: false,
    },
    {
      ts: "1785690000.000200",
      userDisplay: "Alex Kim",
      text: "Can we get the data-retention clause finalized by Friday?",
      isExternal: true,
    },
    {
      ts: "1785680000.000300",
      userDisplay: "Dana Reyes",
      text: "Pricing pushback on the last call -- proposing a volume discount.",
      isExternal: false,
    },
  ],
};
