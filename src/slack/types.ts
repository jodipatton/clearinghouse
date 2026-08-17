export interface SlackMessage {
  ts: string;
  userDisplay: string | null;
  text: string;
  /** True when the message resolved to an external Contact/Lead rather than an internal Slack user -- see LiveSlack's doc comment for the limits of this heuristic. */
  isExternal: boolean;
}

export interface SlackClient {
  /**
   * A deal's Slack messages, newest first, bounded. No channel-Id concept:
   * Slack activity is synced into Salesforce as slackv2__Slack_Message__c
   * rows joined directly to the Opportunity, so the opportunity Id alone is
   * the query key.
   */
  getMessagesForOpportunity(opportunityId: string, limit: number): Promise<SlackMessage[]>;
}
