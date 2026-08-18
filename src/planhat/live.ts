import type {
  PlanhatClient,
  PlanhatCompany,
  PlanhatCompanyStatus,
  PlanhatProject,
  PlanhatProjectDraft,
  PlanhatUser,
} from "./types.js";

const VALID_STATUSES: readonly PlanhatCompanyStatus[] = [
  "prospect",
  "coming",
  "customer",
  "canceled",
  "lost",
];

/**
 * Planhat uses a static per-tenant bearer token, not Salesforce's JWT-bearer
 * OAuth dance — no token cache/refresh, and no retry-on-401 (a bad static
 * token won't fix itself on retry, unlike a rotating-token race).
 *
 * RawCompany's field names are confirmed against the real Company schema
 * (2026-08): `h` (0-10 health), `phase` (lifecycle enum), `status`
 * (prospect/coming/customer/canceled/lost lifecycle status), `renewalDate`,
 * `arr`, `lastTouch`, `owner`, and `custom["Implementation Manager"]` all
 * exist as named -- and `owner`/the custom "team member" field are plain
 * User _ids confirmed to resolve via listUsers(), not guesses. There is no
 * literal expansion-signal-shaped field at all; handled as a documented
 * proxy in toCompany() below. The write path (createProject) is still
 * unverified against a real tenant; don't flip ROUTINES_DRY_RUN=false until
 * that's checked too.
 */
interface LivePlanhatOptions {
  apiUrl: string;
  apiToken: string;
}

interface RawCompany {
  _id: string;
  name: string;
  owner?: string | null;
  custom?: Record<string, unknown>;
  status?: string | null;
  h?: number | null;
  phase?: string | null;
  renewalDate?: string | null;
  arr?: number | null;
  lastTouch?: string | null;
}

interface RawUser {
  _id: string;
  firstName?: string | null;
  lastName?: string | null;
  nickName?: string | null;
  email: string;
}

interface RawProject {
  _id: string;
  companyId: string;
  name: string;
}

export class LivePlanhat implements PlanhatClient {
  constructor(private readonly opts: LivePlanhatOptions) {}

  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const res = await fetch(`${this.opts.apiUrl}${path}`, {
      ...init,
      headers: {
        authorization: `Bearer ${this.opts.apiToken}`,
        "content-type": "application/json",
        ...init.headers,
      },
    });
    if (!res.ok) {
      throw new Error(`Planhat request failed: ${res.status} ${path}`);
    }
    return (await res.json()) as T;
  }

  private static toCompany(r: RawCompany): PlanhatCompany {
    return {
      id: r._id,
      name: r.name,
      csmOwnerId: r.owner ?? null,
      implementationManagerUserId:
        (r.custom?.["Implementation Manager"] as string | undefined) ?? null,
      status: VALID_STATUSES.includes(r.status as PlanhatCompanyStatus)
        ? (r.status as PlanhatCompanyStatus)
        : null,
      healthScore: r.h ?? null,
      expansionSignal: r.phase === "Expansion",
      renewalDate: r.renewalDate ?? null,
      arr: r.arr ?? null,
      lastActivityDate: r.lastTouch ?? null,
    };
  }

  private static toUser(r: RawUser): PlanhatUser {
    const name =
      [r.firstName, r.lastName].filter(Boolean).join(" ").trim() ||
      r.nickName ||
      r.email;
    return { id: r._id, name, email: r.email };
  }

  async listCompanies(limit: number): Promise<PlanhatCompany[]> {
    const bounded = Math.min(Math.max(Math.trunc(limit), 1), 200);
    const records = await this.request<RawCompany[]>(
      `/companies?limit=${bounded}`,
    );
    return records.map(LivePlanhat.toCompany);
  }

  async getCompany(id: string): Promise<PlanhatCompany | null> {
    try {
      const record = await this.request<RawCompany>(`/companies/${id}`);
      return LivePlanhat.toCompany(record);
    } catch {
      return null;
    }
  }

  async listUsers(limit: number): Promise<PlanhatUser[]> {
    const bounded = Math.min(Math.max(Math.trunc(limit), 1), 500);
    const records = await this.request<RawUser[]>(`/users?limit=${bounded}`);
    return records.map(LivePlanhat.toUser);
  }

  async createProject(draft: PlanhatProjectDraft): Promise<PlanhatProject> {
    const record = await this.request<RawProject>("/projects", {
      method: "POST",
      body: JSON.stringify({
        companyId: draft.companyId,
        name: draft.name,
        description: draft.description,
        ...draft.customFields,
      }),
    });
    return { id: record._id, companyId: record.companyId, name: record.name };
  }
}
