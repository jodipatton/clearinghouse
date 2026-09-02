/** Confirmed against the real Company schema (2026-08) -- Planhat's own lifecycle status enum. */
export type PlanhatCompanyStatus = "prospect" | "coming" | "customer" | "canceled" | "lost";

export interface PlanhatCompany {
  id: string;
  name: string;
  /**
   * Real field, confirmed 2026-08: "Lifecycle status set automatically from
   * the most recent license." Used to tell an upsell/expansion opportunity
   * (open, non-renewal stage, on an account that's already a "customer")
   * apart from real new-sales (same stage shape, but the account is still a
   * "prospect" or has no Planhat record at all).
   */
  status: PlanhatCompanyStatus | null;
  /**
   * Raw `owner` User Id -- Planhat's own field description: "Person
   * responsible for the account, such as a CSM, Account Manager, or Sales
   * Rep." Confirmed against real data to resolve cleanly via
   * PlanhatClient.listUsers() (owner Ids are plain User _ids, not a dead
   * end) -- join it yourself; this client never resolves it inline so one
   * bulk users fetch can serve every company instead of N+1 lookups.
   */
  csmOwnerId: string | null;
  /**
   * Raw custom["Implementation Manager"] User Id -- same "team member" field
   * shape as owner, confirmed to resolve the same way via listUsers(). Often
   * null; most companies don't have one set.
   */
  implementationManagerUserId: string | null;
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

export interface PlanhatUser {
  id: string;
  /** firstName + lastName (falls back to nickName) -- confirmed against real data. */
  name: string;
  email: string;
}

/**
 * Confirmed against the real Task schema (2026-09, via the Planhat MCP
 * connector's get_model_action_parameters). Task's title field is `action`,
 * not `name` -- Task and Project/"Goal" are not the same shape. `companyId`
 * is the only field besides `mainType` the real schema marks required, so
 * every L10 to-do pushed here must resolve to a real Planhat company; there
 * is no company-less Task.
 */
export interface PlanhatTaskDraft {
  companyId: string;
  /** Maps to Task's `action` field (its title/synonym: "summary", "subject"). */
  action: string;
  description?: string;
  /** Task's `ownerId` -- a real Planhat User _id, resolved via listUsers(). Omit when no confident name match exists. */
  ownerId?: string;
  /** ISO date -- Task's `endTime` (due date). */
  dueDate?: string;
  /** Maps to Task's `custom.Priority` list field (Low/Medium/High). */
  priority?: "Low" | "Medium" | "High";
}

export interface PlanhatTask {
  id: string;
  companyId: string;
  action: string;
}

export interface PlanhatClient {
  /** Unfiltered bulk read, bounded. For scans (e.g. pipeline-pulse), not for MCP tools. */
  listCompanies(limit: number): Promise<PlanhatCompany[]>;
  getCompany(id: string): Promise<PlanhatCompany | null>;
  /**
   * Unfiltered bulk read, bounded -- for resolving PlanhatCompany's
   * csmOwnerId/implementationManagerUserId in one join rather than a lookup
   * per company. Confirmed against real data: owner/custom "team member"
   * Ids are plain User _ids that resolve this way, no dead ends.
   */
  listUsers(limit: number): Promise<PlanhatUser[]>;
  /**
   * A real, visible write — must only ever be called when ROUTINES_DRY_RUN
   * is false. Callers must pass a name/description that's clearly labeled as
   * a draft/proposal, since Planhat's own draft/status concept (if any) is
   * unconfirmed against a real tenant.
   */
  createProject(draft: PlanhatProjectDraft): Promise<PlanhatProject>;
  /**
   * A real, visible write, same caller discipline as createProject — except
   * this one IS reachable directly from a browser click (the L10 dashboard
   * tab's "Solve & create to-do" button), a deliberate, scoped exception to
   * this app's "no write tools ever reachable from the dashboard" rule (see
   * buildDashboardRouter's doc comment in src/http/dashboard.ts). Confirm
   * with the user before calling this outside of L10.
   */
  createTask(draft: PlanhatTaskDraft): Promise<PlanhatTask>;
}
