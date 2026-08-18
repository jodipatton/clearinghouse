import { describe, expect, it } from "vitest";
import type { AddressInfo } from "node:net";
import { loadConfig } from "../src/config.js";
import { createApp } from "../src/http/app.js";
import { MockSalesforce } from "../src/salesforce/mock.js";
import { MockPlanhat } from "../src/planhat/mock.js";
import type { PlanhatCompany } from "../src/planhat/types.js";

const PUBLIC_URL = "https://mcp.example.com/mcp";
const SECRET = "test-shared-secret-1234567890";

// Date-independent: ghost_expansion needs no matching SF opportunity and no
// date fields, so this fires deterministically regardless of real wall-clock
// time (unlike the renewal/staleness fixtures used in fictions.test.ts).
const PROJECT_TIER_COMPANY: PlanhatCompany = {
  id: "c1",
  name: "Test Co",
  csmOwnerId: null,
  implementationManagerUserId: null,
  status: null,
  healthScore: 9.0,
  expansionSignal: true,
  renewalDate: null,
  arr: 300_000, // >= highArrThreshold -> severity "high" -> suggestedAction "planhat_project"
  lastActivityDate: null,
};

function startServer(overrides: Record<string, string> = {}) {
  const cfg = loadConfig({
    PUBLIC_URL,
    AUTH_MODE: "dev",
    DEV_USER_EMAIL: "test@example.com",
    ROUTINES_SHARED_SECRET: SECRET,
    ...overrides,
  });
  const audit: { actor: string; tool: string; outcome: string }[] = [];
  const planhat = new MockPlanhat([PROJECT_TIER_COMPANY]);
  const app = createApp(cfg, {
    sf: new MockSalesforce([]),
    planhat,
    audit: (e) => audit.push(e),
  });
  const server = app.listen(0);
  const { port } = server.address() as AddressInfo;
  return { server, base: `http://127.0.0.1:${port}`, audit, planhat };
}

describe("POST /routines/pipeline-pulse", () => {
  it("returns 403 when no shared secret is provided", async () => {
    const { server, base } = startServer();
    const res = await fetch(`${base}/routines/pipeline-pulse`, {
      method: "POST",
    });
    server.close();
    expect(res.status).toBe(403);
  });

  it("returns 403 when the wrong shared secret is provided", async () => {
    const { server, base } = startServer();
    const res = await fetch(`${base}/routines/pipeline-pulse`, {
      method: "POST",
      headers: { "x-routines-secret": "wrong" },
    });
    server.close();
    expect(res.status).toBe(403);
  });

  it("returns 200 with the correct secret, and audits both the denial and the success", async () => {
    const { server, base, audit } = startServer();
    await fetch(`${base}/routines/pipeline-pulse`, { method: "POST" }); // denied, no header
    const res = await fetch(`${base}/routines/pipeline-pulse`, {
      method: "POST",
      headers: { "x-routines-secret": SECRET },
    });
    const body = await res.json();
    server.close();
    expect(res.status).toBe(200);
    expect(body.candidateCount).toBeGreaterThan(0);
    expect(audit.some((e) => e.outcome === "denied")).toBe(true);
    expect(
      audit.some(
        (e) => e.tool === "routines.pipeline_pulse" && e.outcome === "ok",
      ),
    ).toBe(true);
  });

  it("dry-run guarantee: computes proposed projects but writes nothing to Planhat", async () => {
    const { server, base, planhat } = startServer(); // ROUTINES_DRY_RUN defaults to true
    const res = await fetch(`${base}/routines/pipeline-pulse`, {
      method: "POST",
      headers: { "x-routines-secret": SECRET },
    });
    const body = await res.json();
    server.close();
    expect(body.dryRun).toBe(true);
    expect(body.proposedProjects.length).toBeGreaterThan(0);
    expect(body.createdProjects).toEqual([]);
    expect(planhat.createdProjects).toEqual([]);
  });

  it("with ROUTINES_DRY_RUN=false, a project-tier candidate is actually written to Planhat", async () => {
    const { server, base, planhat } = startServer({
      ROUTINES_DRY_RUN: "false",
    });
    const res = await fetch(`${base}/routines/pipeline-pulse`, {
      method: "POST",
      headers: { "x-routines-secret": SECRET },
    });
    const body = await res.json();
    server.close();
    expect(body.dryRun).toBe(false);
    expect(body.createdProjects.length).toBeGreaterThan(0);
    expect(planhat.createdProjects.length).toBeGreaterThan(0);
  });
});
