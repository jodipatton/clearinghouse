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
  /** Below this Planhat health score (0-10 scale, Planhat's own), an expansion signal isn't trusted as "real" yet. */
  healthScoreFloor: number;
  /** ARR/deal-amount at or above this is "high" severity instead of "medium". */
  highArrThreshold: number;
  /** A renewal within this many days with no matching SF activity counts as a blindspot. */
  renewalWindowDays: number;
  /** Within this many days of renewal, severity escalates to "high". */
  renewalUrgentDays: number;
  /** An open, late-stage opportunity untouched this many days (in both SF and Planhat) is stale. */
  staleMomentumDays: number;
  /** SF stage names treated as "late" for stale_momentum. Must match real StageName picklist values exactly. */
  lateStages: string[];
}

export const DEFAULT_DETECTOR_CONFIG: DetectorConfig = {
  // 6/10: RevOps judgment call, same as the rest of this config -- not a
  // verified threshold, just rescaled correctly (Planhat's h is 0-10, not
  // the 0-100 this used to assume).
  healthScoreFloor: 6,
  highArrThreshold: 200_000,
  renewalWindowDays: 60,
  renewalUrgentDays: 21,
  staleMomentumDays: 30,
  // Confirmed against the real Opportunity StageName picklist (2026-08):
  // Engaging, Qualified to Win (QTW), Negotiating, Contracting, Renewal
  // Anticipated/Not Anticipated/Contract Issued, Closed Won/Lost. "Late" as
  // used here is a first cut, not confirmed with RevOps.
  lateStages: ["Negotiating", "Contracting"],
};
