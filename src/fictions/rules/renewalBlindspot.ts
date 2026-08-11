import type { DetectInput, DetectorConfig, Fiction } from "../types.js";
import { findOpportunitiesForAccount, isOpenStage } from "../match.js";
import { daysBetween } from "../dates.js";

/**
 * Fires when a Planhat renewal is coming up (or already overdue) and no open
 * Salesforce opportunity closes anywhere near that date — the account's
 * renewal has no owner in the pipeline that's actually tracking it.
 */
export function detectRenewalBlindspot(
  input: DetectInput,
  config: DetectorConfig,
  asOf: Date,
): Fiction[] {
  const fictions: Fiction[] = [];

  for (const company of input.companies) {
    const renewalDate = company.renewalDate;
    if (!renewalDate) continue;

    // daysBetween is "days since"; negate for "days until" a future date.
    const daysUntilRenewal = -daysBetween(renewalDate, asOf);
    if (daysUntilRenewal > config.renewalWindowDays) continue;

    const accountOpportunities = findOpportunitiesForAccount(
      input.opportunities,
      company.name,
    );
    const openOpportunities = accountOpportunities.filter((o) =>
      isOpenStage(o.stage),
    );
    const openNearRenewal = openOpportunities.some(
      (o) =>
        o.closeDate !== null &&
        Math.abs(daysBetween(o.closeDate, new Date(renewalDate))) <=
          config.renewalWindowDays,
    );
    if (openNearRenewal) continue;

    const severity =
      daysUntilRenewal <= config.renewalUrgentDays ? "high" : "medium";

    fictions.push({
      id: `renewal_blindspot:none:${company.id}`,
      type: "renewal_blindspot",
      // A missed renewal always needs real, ownable follow-up — never just a nudge.
      severity,
      accountName: company.name,
      salesforceOpportunityId: null,
      planhatCompanyId: company.id,
      evidence: {
        planhatRenewalDate: renewalDate,
        daysUntilRenewal,
        matchingOpenOpportunityCount: openOpportunities.length,
      },
      suggestedAction: "planhat_project",
      summary:
        `${company.name} renews in ${daysUntilRenewal} day(s) per Planhat ` +
        `with no open Salesforce opportunity covering it.`,
    });
  }

  return fictions;
}
