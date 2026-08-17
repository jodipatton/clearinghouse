import type { SalesforceClient } from "../salesforce/types.js";
import type { SlackClient } from "../slack/types.js";
import type { GongClient } from "../gong/types.js";
import type { PlanhatClient } from "../planhat/types.js";
import type { Fiction } from "../fictions/types.js";
import { scanPipeline } from "../fictions/scan.js";
import { coverageCheck } from "../tools/coverageCheck.js";
import { isOpenStage } from "../fictions/match.js";
import { daysBetween } from "../fictions/dates.js";

const SCAN_LIMIT = 200;
const TOP_FICTIONS = 5;
const TOP_RENEWALS = 8;

export interface PipelineByStage {
  stage: string;
  count: number;
  amount: number;
}

export interface UpcomingRenewal {
  companyId: string;
  name: string;
  renewalDate: string;
  /** Negative means overdue -- see renewal_blindspot's same convention. */
  daysUntil: number;
  arr: number | null;
}

export interface Overview {
  generatedAt: string;
  pipeline: {
    openDealCount: number;
    openPipelineAmount: number;
    byStage: PipelineByStage[];
  };
  fictions: {
    totalCount: number;
    bySeverity: { high: number; medium: number; low: number };
    top: Fiction[];
  };
  coverage: {
    scannedCount: number;
    flaggedCount: number;
  };
  upcomingRenewals: UpcomingRenewal[];
}

/**
 * The RevOps one-page overview: everything else in the dashboard, rolled up.
 * Pure aggregation over data the other tools/routines already fetch -- no
 * new system calls beyond what scanPipeline/coverageCheck/listCompanies
 * already make, and no write path (same read-only guarantee as
 * pipeline_snapshot).
 */
export async function buildOverview(
  sf: SalesforceClient,
  slack: SlackClient,
  gong: GongClient,
  planhat: PlanhatClient,
  asOf: Date = new Date(),
): Promise<Overview> {
  const [opportunities, scan, coverage, companies] = await Promise.all([
    sf.listOpportunities(SCAN_LIMIT),
    scanPipeline(sf, planhat, undefined, asOf),
    coverageCheck(sf, slack, gong, {}) as Promise<{
      scannedCount: number;
      flaggedCount: number;
    }>,
    planhat.listCompanies(SCAN_LIMIT),
  ]);

  const openOpportunities = opportunities.filter((o) => isOpenStage(o.stage));

  const byStageMap = new Map<string, PipelineByStage>();
  for (const o of openOpportunities) {
    const entry = byStageMap.get(o.stage) ?? { stage: o.stage, count: 0, amount: 0 };
    entry.count += 1;
    entry.amount += o.amount ?? 0;
    byStageMap.set(o.stage, entry);
  }
  const byStage = [...byStageMap.values()].sort((a, b) => b.amount - a.amount);

  const bySeverity = { high: 0, medium: 0, low: 0 };
  for (const f of scan.candidates) bySeverity[f.severity] += 1;

  const upcomingRenewals = companies
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

  return {
    generatedAt: asOf.toISOString(),
    pipeline: {
      openDealCount: openOpportunities.length,
      openPipelineAmount: openOpportunities.reduce((sum, o) => sum + (o.amount ?? 0), 0),
      byStage,
    },
    fictions: {
      totalCount: scan.candidateCount,
      bySeverity,
      top: scan.candidates.slice(0, TOP_FICTIONS),
    },
    coverage,
    upcomingRenewals,
  };
}
