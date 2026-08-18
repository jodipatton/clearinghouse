import type { SlackClient, SlackMessage } from "./types.js";
import { FIXTURES } from "./fixtures.js";

/** Fixture-backed client for local dev and tests, keyed by account name. */
export class MockSlack implements SlackClient {
  constructor(private readonly data: Record<string, SlackMessage[]> = FIXTURES) {}

  async getMessagesForAccount(accountName: string, limit: number): Promise<SlackMessage[]> {
    const bounded = Math.min(Math.max(Math.trunc(limit), 1), 30);
    return (this.data[accountName] ?? []).slice(0, bounded);
  }

  /** No `days` filtering on fixture data -- just the fixture's full message count. */
  async countRecentMessages(accountName: string, _days: number): Promise<number> {
    return (this.data[accountName] ?? []).length;
  }
}
