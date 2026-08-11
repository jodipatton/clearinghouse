import type { Opportunity } from "../salesforce/types.js";
import type { PlanhatCompany } from "../planhat/types.js";

export type FictionSeverity = "low" | "medium" | "high";

/** What happens to a fiction once detected — the escalation-ladder split. */
export type SuggestedAction = "slack_nudge" | "planhat_project";

export interface Fiction {
  /** Deterministic across repeated runs on identical input: `${type}:${salesforceOpportunityId ?? "none"}:${planhatCompanyId ?? "none"}`. */
  id: string;
  type: "ghost_expansion" | "renewal_blindspot" | "stale_momentum";
  severity: FictionSeverity;
  accountName: string;
  salesforceOpportunityId: string | null;
  planhatCompanyId: string | null;
  evidence: Record<string, string | number | boolean | null>;
  suggestedAction: SuggestedAction;
  summary: string;
}

export interface DetectInput {
  opportunities: Opportunity[];
  companies: PlanhatCompany[];
}

/**
 * Every threshold here is a placeholder RevOps judgment call, not a verified
 * fact — tune once real (non-fixture) output has been reviewed. None of this
 * blocks running against mock data.
 */
export interface DetectorConfig {
  /** Below this Planhat health score, an expansion signal isn't trusted as "real" yet. */
  healthScoreFloor: number;
  /** ARR/deal-amount at or above this is "high" severity instead of "medium". */
  highArrThreshold: number;
  /** A renewal within this many days with no matching SF activity counts as a blindspot. */
  renewalWindowDays: number;
  /** Within this many days of renewal, severity escalates to "high". */
  renewalUrgentDays: number;
  /** An open, late-stage opportunity untouched this many days (in both SF and Planhat) is stale. */
  staleMomentumDays: number;
  /** SF stage names treated as "late" for stale_momentum. */
  lateStages: string[];
}

export const DEFAULT_DETECTOR_CONFIG: DetectorConfig = {
  healthScoreFloor: 60,
  highArrThreshold: 200_000,
  renewalWindowDays: 60,
  renewalUrgentDays: 21,
  staleMomentumDays: 30,
  lateStages: ["Negotiation", "Proposal"],
};
