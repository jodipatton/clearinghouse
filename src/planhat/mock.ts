import type {
  PlanhatClient,
  PlanhatCompany,
  PlanhatProject,
  PlanhatProjectDraft,
  PlanhatUser,
} from "./types.js";
import { FIXTURES, USER_FIXTURES } from "./fixtures.js";

/** Fixture-backed client for local dev and tests, mirroring MockSalesforce. */
export class MockPlanhat implements PlanhatClient {
  private nextSeq = 1;
  /** Inspectable in tests — the dry-run guarantee is asserted against this. */
  public readonly createdProjects: PlanhatProject[] = [];

  constructor(
    private readonly data: PlanhatCompany[] = FIXTURES,
    private readonly users: PlanhatUser[] = USER_FIXTURES,
  ) {}

  async listCompanies(limit: number): Promise<PlanhatCompany[]> {
    return this.data.slice(0, Math.min(Math.max(Math.trunc(limit), 1), 200));
  }

  async getCompany(id: string): Promise<PlanhatCompany | null> {
    return this.data.find((c) => c.id === id) ?? null;
  }

  async listUsers(limit: number): Promise<PlanhatUser[]> {
    return this.users.slice(0, Math.min(Math.max(Math.trunc(limit), 1), 500));
  }

  async createProject(draft: PlanhatProjectDraft): Promise<PlanhatProject> {
    const project: PlanhatProject = {
      id: `mock-project-${this.nextSeq++}`,
      companyId: draft.companyId,
      name: draft.name,
    };
    this.createdProjects.push(project);
    return project;
  }
}
