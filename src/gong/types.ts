/**
 * How much of a call this server is allowed to ask Gong for.
 *
 * "metadata"  — who was on the call, when, how long. No spoken content.
 * "summaries" — additionally Gong's generated call brief.
 *
 * Decision D (PHI/BAA) is what moves this from metadata to summaries. Until it
 * lands the brief is never *requested*, not merely dropped after arrival: the
 * live adapter leaves it out of the Gong content selector entirely, so
 * call content never enters this process, its memory, or its logs.
 */
export type GongContentMode = "metadata" | "summaries";

export interface GongParticipant {
  name: string | null;
  /** True for someone outside 1upHealth — Gong's own party affiliation. */
  isExternal: boolean;
}

export interface GongCall {
  id: string;
  /** Usually inherited from the calendar invite, which an external attendee
   * can edit — free text, enveloped before it reaches the model. */
  title: string;
  startedAt: string;
  durationSec: number;
  participants: GongParticipant[];
  /** Gong's generated brief. Null whenever contentMode is "metadata". */
  summary: string | null;
}

export interface GongClient {
  /** What this client was configured to fetch — the tool reports it in
   * `coverage` so a metadata-only answer is never silently thin. */
  readonly contentMode: GongContentMode;

  /**
   * Calls Gong has associated with one CRM opportunity, newest first, bounded.
   * Gate 03 (no tenant walk) is structural: there is no list-all-calls and no
   * fetch-by-call-Id path on this interface, so the only calls reachable
   * through the tool surface are those hanging off a deal the caller already
   * resolved in Salesforce.
   */
  getCallsForOpportunity(opportunityId: string, limit: number): Promise<GongCall[]>;
}
