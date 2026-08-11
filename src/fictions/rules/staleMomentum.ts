import type { DetectInput, DetectorConfig, Fiction } from "../types.js";
import { findCompanyForAccount, isOpenStage } from "../match.js";
import { daysBetween } from "../dates.js";

/**
 * Fires when a late-stage Salesforce opportunity hasn't moved in a while
 * AND Planhat shows no recent activity for that account either — the
 * cross-system check. An SF-only staleness heuristic could just mean the AE
 * logs activity elsewhere; agreement across both systems is the real signal.
 * Skipped entirely when there's no matching Planhat company at all.
 */
export function detectStaleMomentum(
  input: DetectInput,
  config: DetectorConfig,
  asOf: Date,
): Fiction[] {
  const fictions: Fiction[] = [];

  for (const opportunity of input.opportunities) {
    if (!isOpenStage(opportunity.stage)) continue;
    if (!config.lateStages.includes(opportunity.stage)) continue;
    if (!opportunity.lastModified) continue;

    const daysSinceModified = daysBetween(opportunity.lastModified, asOf);
    if (daysSinceModified < config.staleMomentumDays) continue;

    const company = findCompanyForAccount(
      input.companies,
      opportunity.accountName,
    );
    if (!company) continue;

    const planhatDaysSinceActivity =
      company.lastActivityDate === null
        ? null
        : daysBetween(company.lastActivityDate, asOf);
    const planhatAlsoStale =
      planhatDaysSinceActivity === null ||
      planhatDaysSinceActivity >= config.staleMomentumDays;
    if (!planhatAlsoStale) continue;

    const severity =
      opportunity.amount !== null &&
      opportunity.amount >= config.highArrThreshold
        ? "high"
        : "medium";

    fictions.push({
      id: `stale_momentum:${opportunity.id}:${company.id}`,
      type: "stale_momentum",
      severity,
      accountName: opportunity.accountName ?? company.name,
      salesforceOpportunityId: opportunity.id,
      planhatCompanyId: company.id,
      evidence: {
        salesforceStage: opportunity.stage,
        salesforceDaysSinceModified: daysSinceModified,
        planhatDaysSinceActivity,
        salesforceAmount: opportunity.amount,
      },
      suggestedAction: severity === "high" ? "planhat_project" : "slack_nudge",
      summary:
        `${opportunity.accountName ?? "This account"}'s ${opportunity.stage} ` +
        `opportunity hasn't moved in ${daysSinceModified} day(s), and Planhat ` +
        "shows no recent activity either.",
    });
  }

  return fictions;
}
