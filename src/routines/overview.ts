import type { SalesforceClient } from "../salesforce/types.js";
import type { SlackClient } from "../slack/types.js";
import type { GongClient } from "../gong/types.js";
import type { PlanhatClient, PlanhatCompany } from "../planhat/types.js";
import type { Fiction } from "../fictions/types.js";
import { detectFictions, DEFAULT_DETECTOR_CONFIG } from "../fictions/detect.js";
import { normalizeName, isOpenStage, classifyPipelineCategory, type PipelineCategory } from "../fictions/match.js";
import { daysBetween } from "../fictions/dates.js";
import { checkCoverage, type CoverageResult } from "../tools/coverageCheck.js";

const SCAN_LIMIT = 200;
const TOP_FICTIONS = 5;
const TOP_RENEWALS = 8;
const ACTIVITY_WINDOW_DAYS = 60;
/** Bounds Slack API calls -- one countRecentMessages call per account, so this caps cost, not just output. */
const MAX_ACTIVITY_ACCOUNTS = 15;
/** RevOps judgment call, same placeholder status as fictions/types.ts's thresholds: below this (0-10 scale), a company reads as "at risk" on the overview. */
const AT_RISK_HEALTH_FLOOR = 5;

export interface OverviewFilters {
  salesRep?: string;
  csm?: string;
  implementationManager?: string;
}

export interface PipelineByStage {
  stage: string;
  count: number;
  amount: number;
}

/** One open opportunity, tagged with the same category its amount was rolled up into -- lets the dashboard show "the deals behind $730k" instead of just the number. */
export interface PipelineDeal {
  id: string;
  name: string;
  account: string | null;
  stage: string;
  owner: string | null;
  amount: number | null;
  category: PipelineCategory;
}

export interface UpcomingRenewal {
  companyId: string;
  name: string;
  renewalDate: string;
  /** Negative means overdue -- see renewal_blindspot's same convention. */
  daysUntil: number;
  arr: number | null;
}

export interface AccountActivity {
  accountName: string;
  messageCount: number;
}

export interface Overview {
  generatedAt: string;
  filters: OverviewFilters;
  /** Always the full, unfiltered option set, so the dropdowns never shrink as you filter. */
  filterOptions: {
    salesReps: string[];
    csms: string[];
    implementationManagers: string[];
  };
  pipeline: {
    openDealCount: number;
    openPipelineAmount: number;
    newSales: { count: number; amount: number };
    upsell: { count: number; amount: number };
    renewal: { count: number; amount: number };
    byStage: PipelineByStage[];
    /** Every open deal in scope, tagged by category -- what the KPI tiles above are counting/summing. */
    deals: PipelineDeal[];
  };
  fictions: {
    totalCount: number;
    bySeverity: { high: number; medium: number; low: number };
    top: Fiction[];
  };
  coverage: CoverageResult;
  upcomingRenewals: UpcomingRenewal[];
  customerHealth: {
    averageHealth: number | null;
    atRiskCount: number;
    atRiskCompanies: { name: string; healthScore: number | null }[];
  };
  activity: {
    windowDays: number;
    byAccount: AccountActivity[];
  };
}

function distinctSorted(values: (string | null)[]): string[] {
  return [...new Set(values.filter((v): v is string => v !== null))].sort();
}

/**
 * The RevOps one-page overview: everything else in the dashboard, rolled up
 * and sliceable by sales rep, CSM, or implementation manager. Pure
 * aggregation -- no write path, same read-only guarantee as
 * pipeline_snapshot.
 *
 * CSM/implementation manager come from Planhat's owner/custom["Implementation
 * Manager"] fields, resolved against listUsers() -- confirmed against real
 * data to be reliable (plain User Ids, no dead ends). Slack's channel-topic
 * text was investigated as an alternative source for the same roles and
 * rejected: real topic/purpose text is inconsistent (conflicting values
 * between Topic and Purpose on the same channel, six different separator
 * conventions, most newer channels have no metadata at all) -- Planhat's
 * structured fields are the reliable source; Slack is used here only for
 * what it's actually good for, a 60-day activity signal.
 */
export async function buildOverview(
  sf: SalesforceClient,
  slack: SlackClient,
  gong: GongClient,
  planhat: PlanhatClient,
  asOf: Date = new Date(),
  filters: OverviewFilters = {},
): Promise<Overview> {
  const [opportunities, companies, users] = await Promise.all([
    sf.listOpportunities(SCAN_LIMIT),
    planhat.listCompanies(SCAN_LIMIT),
    planhat.listUsers(SCAN_LIMIT),
  ]);

  const userById = new Map(users.map((u) => [u.id, u]));
  const resolvedCompanies = companies.map((c) => ({
    ...c,
    csmName: c.csmOwnerId ? userById.get(c.csmOwnerId)?.name ?? null : null,
    implementationManagerName: c.implementationManagerUserId
      ? userById.get(c.implementationManagerUserId)?.name ?? null
      : null,
  }));

  const filterOptions = {
    salesReps: distinctSorted(opportunities.map((o) => o.ownerName)),
    csms: distinctSorted(resolvedCompanies.map((c) => c.csmName)),
    implementationManagers: distinctSorted(
      resolvedCompanies.map((c) => c.implementationManagerName),
    ),
  };

  let filteredOpportunities = filters.salesRep
    ? opportunities.filter((o) => o.ownerName === filters.salesRep)
    : opportunities;

  let filteredCompanies: (PlanhatCompany & {
    csmName: string | null;
    implementationManagerName: string | null;
  })[] = resolvedCompanies.filter((c) => {
    if (filters.csm && c.csmName !== filters.csm) return false;
    if (
      filters.implementationManager &&
      c.implementationManagerName !== filters.implementationManager
    ) {
      return false;
    }
    return true;
  });

  // Keep both lists mutually consistent: a rep filter narrows which accounts
  // are "theirs," so companies narrow to match; a CSM/IM filter narrows
  // which accounts are "theirs," so opportunities narrow to match.
  if (filters.salesRep) {
    const accountNames = new Set(
      filteredOpportunities
        .map((o) => o.accountName)
        .filter((n): n is string => n !== null)
        .map(normalizeName),
    );
    filteredCompanies = filteredCompanies.filter((c) => accountNames.has(normalizeName(c.name)));
  }
  if (filters.csm || filters.implementationManager) {
    const accountNames = new Set(filteredCompanies.map((c) => normalizeName(c.name)));
    filteredOpportunities = filteredOpportunities.filter(
      (o) => o.accountName !== null && accountNames.has(normalizeName(o.accountName)),
    );
  }

  const openOnly = filteredOpportunities.filter((o) => isOpenStage(o.stage));

  const companyByAccountName = new Map<string, (typeof filteredCompanies)[number]>();
  for (const c of filteredCompanies) companyByAccountName.set(normalizeName(c.name), c);

  const byStageMap = new Map<string, PipelineByStage>();
  const byCategory = {
    new_sales: { count: 0, amount: 0 },
    upsell: { count: 0, amount: 0 },
    renewal: { count: 0, amount: 0 },
  };
  const deals: PipelineDeal[] = [];
  for (const o of openOnly) {
    const entry = byStageMap.get(o.stage) ?? { stage: o.stage, count: 0, amount: 0 };
    entry.count += 1;
    entry.amount += o.amount ?? 0;
    byStageMap.set(o.stage, entry);

    const company = o.accountName ? companyByAccountName.get(normalizeName(o.accountName)) : undefined;
    const category: PipelineCategory = classifyPipelineCategory(o.stage, company?.status ?? null);
    byCategory[category].count += 1;
    byCategory[category].amount += o.amount ?? 0;
    deals.push({
      id: o.id,
      name: o.name,
      account: o.accountName,
      stage: o.stage,
      owner: o.ownerName,
      amount: o.amount,
      category,
    });
  }
  const byStage = [...byStageMap.values()].sort((a, b) => b.amount - a.amount);

  const candidates = detectFictions(
    { opportunities: filteredOpportunities, companies: filteredCompanies },
    DEFAULT_DETECTOR_CONFIG,
    asOf,
  );
  const bySeverity = { high: 0, medium: 0, low: 0 };
  for (const f of candidates) bySeverity[f.severity] += 1;

  const coverage = await checkCoverage(filteredOpportunities, slack, gong);

  const upcomingRenewals = filteredCompanies
    // Same "churned isn't a gap" exclusion as renewal_blindspot -- a lost
    // account's stale renewal date isn't a real upcoming renewal.
    .filter((c) => c.status !== "canceled" && c.status !== "lost")
    .filter((c): c is typeof c & { renewalDate: string } => c.renewalDate !== null)
    .map((c) => ({
      companyId: c.id,
      name: c.name,
      renewalDate: c.renewalDate,
      daysUntil: -daysBetween(c.renewalDate, asOf),
      arr: c.arr,
    }))
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, TOP_RENEWALS);

  const healthValues = filteredCompanies
    .map((c) => c.healthScore)
    .filter((h): h is number => h !== null);
  const atRiskCompanies = filteredCompanies
    .filter((c) => c.healthScore !== null && c.healthScore < AT_RISK_HEALTH_FLOOR)
    .map((c) => ({ name: c.name, healthScore: c.healthScore }));

  // Bounded to the biggest accounts in scope -- one Slack API call each.
  const accountPriority = new Map<string, number>();
  const accountDisplay = new Map<string, string>();
  for (const c of filteredCompanies) {
    const key = normalizeName(c.name);
    accountDisplay.set(key, c.name);
    accountPriority.set(key, Math.max(accountPriority.get(key) ?? 0, c.arr ?? 0));
  }
  for (const o of filteredOpportunities) {
    if (!o.accountName) continue;
    const key = normalizeName(o.accountName);
    if (!accountDisplay.has(key)) accountDisplay.set(key, o.accountName);
    accountPriority.set(key, Math.max(accountPriority.get(key) ?? 0, o.amount ?? 0));
  }
  const topAccountKeys = [...accountPriority.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_ACTIVITY_ACCOUNTS)
    .map(([key]) => key);
  const byAccount = await Promise.all(
    topAccountKeys.map(async (key) => {
      const accountName = accountDisplay.get(key) as string;
      const messageCount = await slack.countRecentMessages(accountName, ACTIVITY_WINDOW_DAYS);
      return { accountName, messageCount };
    }),
  );
  byAccount.sort((a, b) => b.messageCount - a.messageCount);

  return {
    generatedAt: asOf.toISOString(),
    filters,
    filterOptions,
    pipeline: {
      openDealCount: openOnly.length,
      openPipelineAmount: openOnly.reduce((sum, o) => sum + (o.amount ?? 0), 0),
      newSales: byCategory.new_sales,
      upsell: byCategory.upsell,
      renewal: byCategory.renewal,
      byStage,
      deals,
    },
    fictions: {
      totalCount: candidates.length,
      bySeverity,
      top: candidates.slice(0, TOP_FICTIONS),
    },
    coverage,
    upcomingRenewals,
    customerHealth: {
      averageHealth: healthValues.length
        ? healthValues.reduce((s, h) => s + h, 0) / healthValues.length
        : null,
      atRiskCount: atRiskCompanies.length,
      atRiskCompanies,
    },
    activity: {
      windowDays: ACTIVITY_WINDOW_DAYS,
      byAccount,
    },
  };
}
