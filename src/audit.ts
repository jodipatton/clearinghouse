/**
 * Every tool call: who, what, which systems, how much came back. Emitted as
 * one JSON line to stdout — Cloud Run forwards to Cloud Logging, which sinks
 * to BigQuery. This restores the per-person accountability that shared org
 * credentials would otherwise erase, and feeds the per-person volume
 * baseline query (week-two hardening).
 */
export interface AuditEvent {
  actor: string;
  tool: string;
  args: Record<string, unknown>;
  systems: string[];
  outcome: "ok" | "denied" | "error";
  resultBytes?: number;
  ms?: number;
}

export type AuditSink = (event: AuditEvent) => void;

export const stdoutAudit: AuditSink = (event) => {
  process.stdout.write(
    JSON.stringify({ ts: new Date().toISOString(), kind: "audit", ...event }) +
      "\n",
  );
};
