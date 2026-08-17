import type { SalesforceClient } from "../salesforce/types.js";
import type { PlanhatClient } from "../planhat/types.js";
import { detectFictions, DEFAULT_DETECTOR_CONFIG } from "./detect.js";
import type { DetectorConfig, Fiction } from "./types.js";

const SCAN_LIMIT = 200;

export interface PipelineScan {
  generatedAt: string;
  candidateCount: number;
  candidates: Fiction[];
}

/**
 * Shared fetch-and-detect core behind both the pipeline-pulse routine (which
 * layers dry-run/write behavior on top, in src/routines/pipelinePulse.ts) and
 * the read-only pipeline_snapshot MCP tool -- one place decides how
 * opportunities and companies become fictions, so the two surfaces can never
 * quietly drift apart.
 */
export async function scanPipeline(
  sf: SalesforceClient,
  planhat: PlanhatClient,
  config: DetectorConfig = DEFAULT_DETECTOR_CONFIG,
  asOf: Date = new Date(),
): Promise<PipelineScan> {
  const [opportunities, companies] = await Promise.all([
    sf.listOpportunities(SCAN_LIMIT),
    planhat.listCompanies(SCAN_LIMIT),
  ]);
  const candidates = detectFictions({ opportunities, companies }, config, asOf);
  return {
    generatedAt: asOf.toISOString(),
    candidateCount: candidates.length,
    candidates,
  };
}
