import { describe, expect, it } from "vitest";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { L10Store } from "../src/l10/store.js";
import { L10_TRACKED_ACCOUNTS, buildL10Briefing } from "../src/routines/l10.js";
import { MockSalesforce } from "../src/salesforce/mock.js";
import { MockSlack } from "../src/slack/mock.js";
import { MockGong } from "../src/gong/mock.js";

function tempStorePath(): string {
  const dir = mkdtempSync(join(tmpdir(), "ch-l10-"));
  return join(dir, "l10-state.json");
}

describe("L10Store", () => {
  it("returns the seed state when no file exists yet", () => {
    const store = new L10Store(tempStorePath());
    const state = store.read();
    expect(state.metrics).toHaveLength(8);
    expect(state.facilitator).toBe("");
  });

  it("persists a patch and returns it on the next read", () => {
    const store = new L10Store(tempStorePath());
    const patched = store.patch({ facilitator: "Maria" });
    expect(patched.facilitator).toBe("Maria");
    expect(store.read().facilitator).toBe("Maria");
  });

  it("shallow-merges a patch, leaving untouched fields alone", () => {
    const store = new L10Store(tempStorePath());
    store.patch({ facilitator: "Maria" });
    const after = store.patch({ scores: { Maria: 9 } });
    expect(after.facilitator).toBe("Maria");
    expect(after.scores).toEqual({ Maria: 9 });
  });
});

describe("buildL10Briefing", () => {
  it("returns one row per tracked account, live-augmented but never a computed on/off verdict", async () => {
    const briefing = await buildL10Briefing(new MockSalesforce(), new MockSlack(), new MockGong());
    expect(briefing).toHaveLength(L10_TRACKED_ACCOUNTS.length);
    for (const row of briefing) {
      expect(row).not.toHaveProperty("status");
      expect(typeof row.asOf).toBe("string");
    }
  });

  it("attaches the CMS-0057 portfolio's own risk research for accounts that are in that dataset", async () => {
    const briefing = await buildL10Briefing(new MockSalesforce(), new MockSlack(), new MockGong());
    const vaya = briefing.find((r) => r.name === "Vaya Health");
    expect(vaya?.portfolioId).not.toBeNull();
    expect(vaya?.staticRisk).toBeTruthy();
  });

  it("leaves portfolioId/staticRisk null for a tracked account outside the 43-account dataset", async () => {
    const briefing = await buildL10Briefing(new MockSalesforce(), new MockSlack(), new MockGong());
    const oscar = briefing.find((r) => r.name === "Oscar");
    expect(oscar?.portfolioId).toBeNull();
    expect(oscar?.staticRisk).toBeNull();
  });
});
