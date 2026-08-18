import type { Opportunity } from "../salesforce/types.js";
import type { PlanhatCompany } from "../planhat/types.js";

export type PipelineCategory = "new_sales" | "upsell" | "renewal";

/**
 * Case-insensitive account-name join between SF and Planhat records.
 *
 * Known limitation, not fixed in this slice: this breaks on renames,
 * abbreviations, or duplicate account names. If a Planhat tenant stores a
 * Salesforce id per Company, that should replace this join before any of
 * this runs against real data.
 */
export function normalizeName(name: string): string {
  return name.trim().toLowerCase();
}

export function findCompanyForAccount(
  companies: PlanhatCompany[],
  accountName: string | null,
): PlanhatCompany | null {
  if (!accountName) return null;
  const target = normalizeName(accountName);
  return companies.find((c) => normalizeName(c.name) === target) ?? null;
}

export function findOpportunitiesForAccount(
  opportunities: Opportunity[],
  companyName: string,
): Opportunity[] {
  const target = normalizeName(companyName);
  return opportunities.filter(
    (o) => o.accountName !== null && normalizeName(o.accountName) === target,
  );
}

/**
 * Heuristic, not a real field: Opportunity has no IsClosed boolean, only a
 * free-text stage name, so "open" is inferred from the stage not starting
 * with "Closed" (matches this repo's own fixture naming: "Closed Won").
 */
export function isOpenStage(stage: string): boolean {
  return !/^closed/i.test(stage.trim());
}

/**
 * Confirmed against real data, not a guess: Opportunity.Type is too sparse
 * (72% null on real open opportunities) and partly corrupted (a RecordTypeId
 * string was found written into the Type field itself on closed-won renewal
 * records) to segment new-sales vs. renewal pipeline. Every real renewal
 * lives in a StageName starting with "Renewal " (Renewal Anticipated/Not
 * Anticipated/Contract Issued) and no "New Business" Type ever appears
 * outside a renewal-flavored stage or "Contracting" -- so the stage name
 * itself is the reliable signal.
 */
export function isRenewalStage(stage: string): boolean {
  return /^renewal/i.test(stage.trim());
}

/**
 * "Upsell" vs. "new sales" isn't a real field anywhere -- there is no
 * Opportunity-level marker for it (see isRenewalStage's doc comment on why
 * Type doesn't work either). Derived instead from Planhat's real `status`
 * lifecycle field on the account: a non-renewal-stage opportunity on a
 * company already marked "customer" is expansion revenue, not a new logo.
 * An account that's still a "prospect," or has no Planhat record at all
 * (never onboarded, most likely a true net-new deal), counts as new sales.
 */
export function classifyPipelineCategory(
  stage: string,
  companyStatus: PlanhatCompany["status"],
): PipelineCategory {
  if (isRenewalStage(stage)) return "renewal";
  return companyStatus === "customer" ? "upsell" : "new_sales";
}
