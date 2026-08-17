import type { SlackClient, SlackMessage } from "./types.js";
import { FIXTURES } from "./fixtures.js";

/** Fixture-backed client for local dev and tests. */
export class MockSlack implements SlackClient {
  constructor(private readonly data: Record<string, SlackMessage[]> = FIXTURES) {}

  async getChannelHistory(channelId: string, limit: number): Promise<SlackMessage[]> {
    const bounded = Math.min(Math.max(Math.trunc(limit), 1), 30);
    return (this.data[channelId] ?? []).slice(0, bounded);
  }
}
