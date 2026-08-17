export interface PlanhatCompany {
  id: string;
  name: string;
  /**
   * Real Planhat's `owner` is a User reference (objectId), not an email --
   * resolving one requires a separate User lookup LivePlanhat doesn't do, so
   * this is always null in live mode. Confirmed against real schema
   * 2026-08; revisit only if something actually needs it.
   */
  ownerEmail: string | null;
  /** 0-10 -- Planhat's own scale (raw field `h`). Confirmed against real schema 2026-08. */
  healthScore: number | null;
  /**
   * Derived, not a real field: true when Planhat's lifecycle `phase` is
   * "Expansion" (Alignment → Onboarding → Adoption → Value Realization →
   * Expansion). No literal expansion-signal-shaped field exists on the real
   * Company model -- this is the closest proxy, not validated against real
   * customer data.
   */
  expansionSignal: boolean | null;
  /** ISO date of next contract renewal/end. Matches real field name `renewalDate`. */
  renewalDate: string | null;
  arr: number | null;
  /**
   * Mapped from real Planhat's `lastTouch` (most recent interaction across
   * all conversations) -- deliberately not `lastActive` (end-user product
   * login, a different signal entirely).
   */
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
