export interface SlackMessage {
  ts: string;
  userDisplay: string | null;
  text: string;
  /** True for a Slack Connect guest from outside 1upHealth's workspace. */
  isExternal: boolean;
}

export interface SlackClient {
  /**
   * A resolved account's most recent messages, newest first, bounded. The
   * channel isn't looked up by any stored Id on the deal -- it's resolved
   * from the account name against the real "#account-<name>" naming
   * convention (see LiveSlack's doc comment). Returns [] when no matching
   * channel is found, same as "no messages," never an error.
   */
  getMessagesForAccount(accountName: string, limit: number): Promise<SlackMessage[]>;
  /**
   * Message count on a resolved account's channel within the last `days` --
   * powers the 60-day activity overview. Bounded, not exhaustive: stops
   * paging after a fixed cap rather than counting forever on a very busy
   * channel.
   */
  countRecentMessages(accountName: string, days: number): Promise<number>;
}
