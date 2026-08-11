import type { DetectInput, DetectorConfig, Fiction } from "./types.js";
import { DEFAULT_DETECTOR_CONFIG } from "./types.js";
import { detectGhostExpansion } from "./rules/ghostExpansion.js";
import { detectRenewalBlindspot } from "./rules/renewalBlindspot.js";
import { detectStaleMomentum } from "./rules/staleMomentum.js";

const SEVERITY_RANK: Record<Fiction["severity"], number> = {
  high: 0,
  medium: 1,
  low: 2,
};

/**
 * Pure and deterministic: `asOf` is always an explicit parameter, never
 * `Date.now()`/`new Date()` called internally, so callers (and tests) fully
 * control time instead of this being wall-clock-dependent.
 */
export function detectFictions(
  input: DetectInput,
  config: DetectorConfig = DEFAULT_DETECTOR_CONFIG,
  asOf: Date = new Date(),
): Fiction[] {
  const fictions = [
    ...detectGhostExpansion(input, config),
    ...detectRenewalBlindspot(input, config, asOf),
    ...detectStaleMomentum(input, config, asOf),
  ];
  return fictions.sort((a, b) => {
    const bySeverity = SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity];
    return bySeverity !== 0 ? bySeverity : a.id.localeCompare(b.id);
  });
}

export { DEFAULT_DETECTOR_CONFIG };
export type { DetectInput, DetectorConfig, Fiction };
