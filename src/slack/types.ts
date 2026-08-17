export interface SlackMessage {
  ts: string;
  userDisplay: string | null;
  text: string;
  /** True for a Slack Connect guest from outside 1upHealth's workspace. */
  isExternal: boolean;
}

export interface SlackClient {
  /** Recent messages in one channel, newest first, bounded. Never searches
   * across channels -- the caller resolves the one channel mapped to a deal
   * before this is called. */
  getChannelHistory(channelId: string, limit: number): Promise<SlackMessage[]>;
}
