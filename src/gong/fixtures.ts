import type { GongCall } from "./types.js";

/**
 * Demo data mirroring the PRD walkthrough — used by GONG_MODE=mock and tests.
 * Keyed by Salesforce opportunity Id, which is how Gong itself associates a
 * call with a deal. Summaries are present here; the mock withholds them when
 * its content mode is "metadata", exactly as the live adapter does.
 */
export const FIXTURES: Record<string, GongCall[]> = {
  "006Ru00000AbCdEfGh": [
    {
      id: "7284419900000001",
      title: "MMM Health <> 1upHealth — BAA redlines",
      startedAt: "2026-08-04T15:00:00Z",
      durationSec: 2740,
      participants: [
        { name: "Dana Reyes", isExternal: false },
        { name: "Alex Kim", isExternal: true },
        { name: "Priya Raman", isExternal: true },
      ],
      summary:
        "Counsel walked through the data-retention clause. Their security lead " +
        "wants a 30-day deletion window; we proposed 90. Pricing came up again " +
        "at the end -- volume discount requested before signature.",
    },
    {
      id: "7284419900000002",
      title: "MMM Health <> 1upHealth — pricing follow-up",
      startedAt: "2026-07-28T18:30:00Z",
      durationSec: 1615,
      participants: [
        { name: "Dana Reyes", isExternal: false },
        { name: "Alex Kim", isExternal: true },
      ],
      summary:
        "Pushback on per-member pricing at their projected volume. Action: send " +
        "a tiered quote by Friday.",
    },
  ],
};
