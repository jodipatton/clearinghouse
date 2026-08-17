import { describe, expect, it } from "vitest";
import { MockSalesforce } from "../src/salesforce/mock.js";
import { MockSlack } from "../src/slack/mock.js";
import { dealChannelActivity } from "../src/tools/dealChannelActivity.js";

const sf = new MockSalesforce();
const slack = new MockSlack();

describe("deal_channel_activity", () => {
  it("returns the mapped channel's recent messages, external ones flagged", async () => {
    const result = await dealChannelActivity(sf, slack, {
      opportunityId: "006Ru00000AbCdEfGh",
    });
    expect(result.channel).toBe("C0MMMDEAL1");
    const messages = result.messages as Record<string, unknown>[];
    expect(messages.length).toBeGreaterThan(0);
    expect(messages.some((m) => m.external === true)).toBe(true);
    expect(messages.some((m) => m.external === false)).toBe(true);
  });

  it("wraps message text in the external-data envelope", async () => {
    const result = await dealChannelActivity(sf, slack, {
      opportunityId: "006Ru00000AbCdEfGh",
    });
    const messages = result.messages as { text: string }[];
    expect(messages[0].text).toContain("[external-data source=slack:Message");
  });

  it("says so, not silently, when no channel is mapped", async () => {
    const result = await dealChannelActivity(sf, slack, {
      opportunityId: "006Ru00000JkLmNoPq",
    });
    expect(result.messages).toEqual([]);
    expect(result.coverage).toContain("no Slack channel is mapped");
  });

  it("reports an unknown id without erroring", async () => {
    const result = await dealChannelActivity(sf, slack, {
      opportunityId: "006Ru00000XxXxXxXx",
    });
    expect(result.error).toContain("No opportunity");
  });
});
