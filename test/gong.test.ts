import { afterEach, describe, expect, it, vi } from "vitest";
import { MockSalesforce } from "../src/salesforce/mock.js";
import { MockGong } from "../src/gong/mock.js";
import { LiveGong } from "../src/gong/live.js";
import { callDetails } from "../src/tools/callDetails.js";
import { loadConfig } from "../src/config.js";

const sf = new MockSalesforce();
const MMM = "006Ru00000AbCdEfGh";

describe("call_details", () => {
  it("returns the deal's calls newest first, external attendees flagged", async () => {
    const result = await callDetails(sf, new MockGong(), { opportunityId: MMM });
    const calls = result.calls as { at: string; participants: { external: boolean }[] }[];
    expect(calls).toHaveLength(2);
    expect(calls[0].at > calls[1].at).toBe(true);
    expect(calls[0].participants.some((p) => p.external)).toBe(true);
    expect(calls[0].participants.some((p) => !p.external)).toBe(true);
  });

  it("wraps the call title in the external-data envelope", async () => {
    const result = await callDetails(sf, new MockGong(), { opportunityId: MMM });
    const calls = result.calls as { title: string }[];
    expect(calls[0].title).toContain("[external-data source=gong:CallTitle");
  });

  it("withholds summaries in metadata mode and says so in coverage", async () => {
    const result = await callDetails(sf, new MockGong("metadata"), {
      opportunityId: MMM,
    });
    const calls = result.calls as { summary: string | null }[];
    expect(calls.every((c) => c.summary === null)).toBe(true);
    expect(result.coverage).toContain("metadata only");
  });

  it("returns enveloped summaries once content is allowed", async () => {
    const result = await callDetails(sf, new MockGong("summaries"), {
      opportunityId: MMM,
    });
    const calls = result.calls as { summary: string }[];
    expect(calls[0].summary).toContain("[external-data source=gong:CallBrief");
    expect(calls[0].summary).toContain("data-retention clause");
    expect(result.coverage).toBe("answered");
  });

  it("says so, not silently, when a deal has no calls", async () => {
    const result = await callDetails(sf, new MockGong(), {
      opportunityId: "006Ru00000JkLmNoPq",
    });
    expect(result.calls).toEqual([]);
    expect(result.coverage).toContain("no Gong calls");
  });

  it("reports an unknown id without erroring", async () => {
    const result = await callDetails(sf, new MockGong(), {
      opportunityId: "006Ru00000XxXxXxXx",
    });
    expect(result.error).toContain("No opportunity");
  });
});

describe("gate 04 — call content is never requested until it is allowed", () => {
  afterEach(() => vi.unstubAllGlobals());

  function stubGong(): { bodies: Record<string, unknown>[] } {
    const bodies: Record<string, unknown>[] = [];
    vi.stubGlobal("fetch", async (_url: string, init: { body: string }) => {
      bodies.push(JSON.parse(init.body));
      return {
        ok: true,
        json: async () => ({
          calls: [
            {
              metaData: { id: "1", title: "call", started: "2026-08-01T00:00:00Z", duration: 600 },
              parties: [{ name: "Alex Kim", affiliation: "External" }],
              context: [{ system: "Salesforce", objects: [{ objectType: "Opportunity", objectId: MMM + "ABC" }] }],
              content: { brief: "should never be asked for in metadata mode" },
            },
          ],
          records: {},
        }),
      };
    });
    return { bodies };
  }

  it("omits the brief from the content selector in metadata mode", async () => {
    const { bodies } = stubGong();
    const gong = new LiveGong({
      accessKey: "k",
      accessKeySecret: "s",
      contentMode: "metadata",
      lookbackDays: 30,
    });
    await gong.getCallsForOpportunity(MMM, 5);
    const selector = (bodies[0].contentSelector as { exposedFields: Record<string, unknown> })
      .exposedFields;
    expect(selector.content).toBeUndefined();
  });

  it("asks for the brief only in summaries mode", async () => {
    const { bodies } = stubGong();
    const gong = new LiveGong({
      accessKey: "k",
      accessKeySecret: "s",
      contentMode: "summaries",
      lookbackDays: 30,
    });
    await gong.getCallsForOpportunity(MMM, 5);
    const selector = (bodies[0].contentSelector as { exposedFields: Record<string, unknown> })
      .exposedFields;
    expect(selector.content).toEqual({ brief: true });
  });

  it("matches a 15-character Salesforce Id against Gong's 18-character one", async () => {
    stubGong();
    const gong = new LiveGong({
      accessKey: "k",
      accessKeySecret: "s",
      contentMode: "metadata",
      lookbackDays: 30,
    });
    const calls = await gong.getCallsForOpportunity(MMM, 5);
    expect(calls).toHaveLength(1);
    expect(calls[0].participants[0].isExternal).toBe(true);
  });

  it("refuses to start with live summaries unless the review is signed off", () => {
    const env = {
      AUTH_MODE: "dev",
      DEV_USER_EMAIL: "jodi@1uphealth.com",
      GONG_MODE: "live",
      GONG_ACCESS_KEY: "k",
      GONG_ACCESS_KEY_SECRET: "s",
      GONG_CONTENT: "summaries",
    };
    expect(() => loadConfig(env as NodeJS.ProcessEnv)).toThrow(/GONG_PHI_REVIEW_SIGNED_OFF/);
    expect(() =>
      loadConfig({ ...env, GONG_PHI_REVIEW_SIGNED_OFF: "true" } as NodeJS.ProcessEnv),
    ).not.toThrow();
  });
});
