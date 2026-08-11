import type { Opportunity } from "../salesforce/types.js";
import type { PlanhatCompany } from "../planhat/types.js";

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
