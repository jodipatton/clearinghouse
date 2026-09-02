/** A scorecard/rocks row. Cross-account rollups (most metrics) carry no accountName; a few rocks tie to one tracked account. */
export interface L10Metric {
  id: string;
  name: string;
  meta: string;
  owner: string;
  /** "ok" = on track, "off" = off track — same two states the original artifact's StatusToggle used. */
  status: "ok" | "off";
  accountName?: string | null;
}

export type L10Tier = "P1" | "P2" | "P3";

export interface L10Issue {
  id: string;
  title: string;
  raised: string;
  area: string;
  tier: L10Tier;
  xfn: boolean;
  note: string;
  root: string;
  solutions: string;
  solved: boolean;
  struck: boolean;
  /**
   * Which Planhat company this issue's to-do would post against, if solved.
   * Null for issues that aren't about one specific customer (most
   * engineering/process issues) -- Planhat's Task model requires a
   * companyId, so those issues can only ever be solved locally.
   */
  accountName?: string | null;
  /** Set when this issue was auto-dropped from an off-track Reporting row, keyed `${kind}:${rowId}` -- lets the auto-drop be un-done cleanly if the row flips back on-track before anyone touches the issue. */
  autoFrom?: string;
  /** Once a human edits an auto-dropped issue, it's no longer safe to silently remove. */
  touched?: boolean;
  /** Set once "Solve & create to-do" actually writes a real Planhat Task. */
  planhatTaskId?: string | null;
}

export interface L10Todo {
  id: string;
  text: string;
  owner: string;
  done: boolean;
  /** True for a to-do created during this meeting's IDS/Close, same "NEW TO-DOS" grouping the recap uses. */
  isNew: boolean;
  accountName?: string | null;
  planhatTaskId?: string | null;
}

export interface L10State {
  facilitator: string;
  metrics: L10Metric[];
  rocks: L10Metric[];
  issues: L10Issue[];
  todos: L10Todo[];
  segue: Record<string, { personal: string; professional: string }>;
  scores: Record<string, number>;
  updatedAt: string;
}
