import type { SalesforceClient } from "../salesforce/types.js";
import type { SlackClient } from "../slack/types.js";
import type { GongClient } from "../gong/types.js";
import { PORTFOLIO_DATA } from "../portfolio/data.js";
import { resolveLiveAccountContext } from "./portfolio.js";

/**
 * The account universe the L10 Implementation Review actually tracks --
 * named by Jodi (L10_Project_Knowledge_Base.md), not derived from any field.
 * Matched by exact name against the 43-account portfolio dataset where one
 * exists, same name-join discipline as clinicalConnectAccountIds() in
 * routines/portfolio.ts; "Oscar" isn't in that dataset (it's a renewal deal,
 * not a CMS-0057 portfolio account) so it's live-Salesforce-only.
 */
export const L10_TRACKED_ACCOUNTS = [
  "Vaya Health",
  "Empower",
  "Cook County Health (CountyCare)",
  "Johns Hopkins HealthCare",
  "Capital Blue Cross",
  "BCBST",
  "Jai Medical Center",
  "Oscar",
] as const;

export interface L10AccountBriefing {
  name: string;
  /** Non-null only when this account exists in the CMS-0057 portfolio dataset. */
  portfolioId: number | null;
  /** Portfolio's own status-tier label (e.g. "Live / Pre-Q1", "Q1 · Jan–Mar") -- a fact, not a verdict; the on-/off-track call still belongs to the meeting. */
  qlabel: string | null;
  /** Portfolio's own curated risks/blockers prose, last refreshed whenever data.ts was (a static snapshot, not live). */
  staticRisk: string | null;
  liveDeal: { id: string; name: string; stage: string; amount: number | null } | null;
  slackMessageCount: number;
  recentSlack: { at: string; from: string | null; text: string }[];
  recentCallTitles: { at: string; title: string }[];
  asOf: string;
}

/**
 * Refreshed evidence for the Reporting/IDS sections of the L10 tab -- per
 * the KB's "Where status comes from" section: Slack account channels first,
 * then Salesforce for commercial stage, Gong for sentiment/context. This
 * only ever supplies facts for a human to read; it never computes an
 * on-track/off-track verdict itself (there is no defined methodology for
 * that, and reporting mode's whole point is a human calling it live).
 */
export async function buildL10Briefing(
  sf: SalesforceClient,
  slack: SlackClient,
  gong: GongClient,
): Promise<L10AccountBriefing[]> {
  const asOf = new Date().toISOString();
  return Promise.all(
    L10_TRACKED_ACCOUNTS.map(async (name): Promise<L10AccountBriefing> => {
      const profile = PORTFOLIO_DATA.profiles.find((p) => p.name === name) ?? null;
      const live = await resolveLiveAccountContext(name, sf, slack, gong);
      return {
        name,
        portfolioId: profile?.id ?? null,
        qlabel: profile?.qlabel ?? null,
        staticRisk: profile?.risks_and_blockers ?? null,
        liveDeal: live.liveDealMatch,
        slackMessageCount: live.slackActivity.messageCount,
        recentSlack: live.slackActivity.messages
          .slice(0, 3)
          .map((m) => ({ at: m.at, from: m.from, text: m.text })),
        recentCallTitles: live.meetings.calls.slice(0, 2).map((c) => ({ at: c.at, title: c.title })),
        asOf,
      };
    }),
  );
}
