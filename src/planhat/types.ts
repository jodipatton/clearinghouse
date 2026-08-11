export interface PlanhatCompany {
  id: string;
  name: string;
  ownerEmail: string | null;
  /** 0-100 in fixtures/mock. Exact field + scale unverified against a real tenant. */
  healthScore: number | null;
  /** True when Planhat shows an active expansion/upsell/usage-growth signal. Field TBD. */
  expansionSignal: boolean | null;
  /** ISO date of next contract renewal/end. Field TBD. */
  renewalDate: string | null;
  arr: number | null;
  /** ISO datetime of last logged engagement. Field TBD. */
  lastActivityDate: string | null;
}

export interface PlanhatProjectDraft {
  companyId: string;
  name: string;
  description: string;
  /** Escape hatch for whatever custom fields a real tenant turns out to need. */
  customFields?: Record<string, unknown>;
}

export interface PlanhatProject {
  id: string;
  companyId: string;
  name: string;
}

export interface PlanhatClient {
  /** Unfiltered bulk read, bounded. For scans (e.g. pipeline-pulse), not for MCP tools. */
  listCompanies(limit: number): Promise<PlanhatCompany[]>;
  getCompany(id: string): Promise<PlanhatCompany | null>;
  /**
   * A real, visible write — must only ever be called when ROUTINES_DRY_RUN
   * is false. Callers must pass a name/description that's clearly labeled as
   * a draft/proposal, since Planhat's own draft/status concept (if any) is
   * unconfirmed against a real tenant.
   */
  createProject(draft: PlanhatProjectDraft): Promise<PlanhatProject>;
}
