import type { DetectInput, DetectorConfig, Fiction } from "../types.js";
import { findOpportunitiesForAccount } from "../match.js";

/**
 * Fires when Planhat shows a healthy, expanding account with zero matching
 * Salesforce opportunities — an expansion signal nobody in sales has picked
 * up yet. Only checkable now that Planhat is in scope; Salesforce alone
 * can't see it (there's nothing there to look at).
 */
export function detectGhostExpansion(
  input: DetectInput,
  config: DetectorConfig,
): Fiction[] {
  const fictions: Fiction[] = [];

  for (const company of input.companies) {
    if (!company.expansionSignal) continue;
    if (
      company.healthScore === null ||
      company.healthScore < config.healthScoreFloor
    ) {
      continue;
    }
    const matching = findOpportunitiesForAccount(
      input.opportunities,
      company.name,
    );
    if (matching.length > 0) continue;

    const severity =
      company.arr !== null && company.arr >= config.highArrThreshold
        ? "high"
        : "medium";

    fictions.push({
      id: `ghost_expansion:none:${company.id}`,
      type: "ghost_expansion",
      severity,
      accountName: company.name,
      salesforceOpportunityId: null,
      planhatCompanyId: company.id,
      evidence: {
        planhatHealthScore: company.healthScore,
        planhatArr: company.arr,
        planhatExpansionSignal: company.expansionSignal,
        salesforceOpportunityCount: 0,
      },
      suggestedAction: severity === "high" ? "planhat_project" : "slack_nudge",
      summary:
        `${company.name} shows an expansion signal in Planhat ` +
        `(health ${company.healthScore}) with no matching Salesforce opportunity.`,
    });
  }

  return fictions;
}
