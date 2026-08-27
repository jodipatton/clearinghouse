import { describe, expect, it } from "vitest";
import { MockSalesforce } from "../src/salesforce/mock.js";
import { MockSlack } from "../src/slack/mock.js";
import { MockGong } from "../src/gong/mock.js";
import { portfolioAccount } from "../src/tools/portfolioAccount.js";
import { clinicalConnectStatus } from "../src/tools/clinicalConnectStatus.js";
import { PORTFOLIO_DATA } from "../src/portfolio/data.js";

function clients() {
  return { sf: new MockSalesforce(), slack: new MockSlack(), gong: new MockGong() };
}

describe("portfolio_account tool", () => {
  it("resolves an unambiguous fuzzy name to one account's dossier", async () => {
    const { sf, slack, gong } = clients();
    const result = await portfolioAccount(sf, slack, gong, { name: "Fallon" });
    expect(result.name).toBe("Fallon Community Health Plan");
    const fields = result.fields as { label: string; text: string }[];
    expect(fields.length).toBeGreaterThan(0);
    // Free text is enveloped, same discipline as every other tool's external-data fields.
    expect(fields[0].text).toContain("[external-data source=portfolio:");
  });

  it("returns candidates instead of guessing on an ambiguous name", async () => {
    const { sf, slack, gong } = clients();
    const result = await portfolioAccount(sf, slack, gong, { name: "Health" });
    expect(Array.isArray(result.matches)).toBe(true);
    expect((result.matches as unknown[]).length).toBeGreaterThan(1);
  });

  it("returns an error for a name with no match", async () => {
    const { sf, slack, gong } = clients();
    const result = await portfolioAccount(sf, slack, gong, { name: "Nonexistent Health Co" });
    expect(result.error).toBeTruthy();
  });

  it("has no meetings when no live Salesforce opportunity resolves (mock data doesn't cover portfolio accounts)", async () => {
    const { sf, slack, gong } = clients();
    const result = await portfolioAccount(sf, slack, gong, { name: "Fallon" });
    const meetings = result.meetings as { available: boolean; calls: unknown[] };
    expect(meetings.available).toBe(false);
    expect(meetings.calls).toEqual([]);
  });
});

describe("clinical_connect_status tool", () => {
  it("covers exactly the four named Clinical Connect accounts", async () => {
    const { sf, slack, gong } = clients();
    const result = await clinicalConnectStatus(sf, slack, gong);
    const accounts = result.accounts as { name: string }[];
    expect(accounts.map((a) => a.name).sort()).toEqual(
      ["Capital Health Plan", "Fallon Community Health Plan", "Viva Health", "Zing Health"].sort(),
    );
  });

  it("splits going-well vs not-well from the account's own research fields, not a generated verdict", async () => {
    const { sf, slack, gong } = clients();
    const result = await clinicalConnectStatus(sf, slack, gong);
    const accounts = result.accounts as {
      goingWell: { implementationStatus: string | null };
      notGoingWell: { risksAndBlockers: string | null; salesforceFlags: string[] };
    }[];
    for (const a of accounts) {
      if (a.goingWell.implementationStatus) {
        expect(a.goingWell.implementationStatus).toContain("[external-data source=portfolio:implementation_status");
      }
      if (a.notGoingWell.risksAndBlockers) {
        expect(a.notGoingWell.risksAndBlockers).toContain("[external-data source=portfolio:risks_and_blockers");
      }
      expect(Array.isArray(a.notGoingWell.salesforceFlags)).toBe(true);
    }
  });

  it("stamps the static research's pull date so it's never confused with the live fields", async () => {
    const { sf, slack, gong } = clients();
    const result = await clinicalConnectStatus(sf, slack, gong);
    expect(result.researchPulledAt).toBe(PORTFOLIO_DATA.sfSummary.pulled);
  });
});
