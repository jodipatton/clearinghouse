import type { SlackClient, SlackMessage } from "./types.js";
import { FIXTURES } from "./fixtures.js";

/** Fixture-backed client for local dev and tests, keyed by opportunity Id. */
export class MockSlack implements SlackClient {
  constructor(private readonly data: Record<string, SlackMessage[]> = FIXTURES) {}

  async getMessagesForOpportunity(
    opportunityId: string,
    limit: number,
  ): Promise<SlackMessage[]> {
    const bounded = Math.min(Math.max(Math.trunc(limit), 1), 30);
    return (this.data[opportunityId] ?? []).slice(0, bounded);
  }
}
