import { describe, expect, it } from "vitest";
import { MockPlanhat } from "../src/planhat/mock.js";

describe("MockPlanhat", () => {
  it("clamps the listCompanies limit between 1 and 200", async () => {
    const planhat = new MockPlanhat();
    const capped = await planhat.listCompanies(1);
    expect(capped).toHaveLength(1);
    const all = await planhat.listCompanies(200);
    expect(all.length).toBeGreaterThan(1);
  });

  it("finds a company by id, and returns null when not found", async () => {
    const planhat = new MockPlanhat();
    const found = await planhat.getCompany("ph_mmm");
    expect(found?.name).toBe("MMM Health");
    expect(await planhat.getCompany("ph_nonexistent")).toBeNull();
  });

  it("records created projects for tests to assert against (the dry-run hook point)", async () => {
    const planhat = new MockPlanhat();
    const project = await planhat.createProject({
      companyId: "ph_acme",
      name: "[DRAFT] test",
      description: "test",
    });
    expect(project.companyId).toBe("ph_acme");
    expect(planhat.createdProjects).toHaveLength(1);
    expect(planhat.createdProjects[0]).toEqual(project);
  });
});
