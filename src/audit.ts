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

export interface RecordedAuditEvent extends AuditEvent {
  ts: string;
}

/**
 * Wraps a sink with an in-memory ring buffer for the local dashboard's audit
 * tab — a read-only, most-recent-N view. Cloud Logging → BigQuery (the real
 * audit trail) stays the sink passed in; this never replaces it, and the
 * buffer is lost on restart by design (it's a live tail, not a durable log).
 */
export function recordingAudit(
  sink: AuditSink,
  capacity = 200,
): { sink: AuditSink; recent(): RecordedAuditEvent[] } {
  const buffer: RecordedAuditEvent[] = [];
  const wrapped: AuditSink = (event) => {
    buffer.push({ ts: new Date().toISOString(), ...event });
    if (buffer.length > capacity) buffer.shift();
    sink(event);
  };
  return { sink: wrapped, recent: () => [...buffer].reverse() };
}
