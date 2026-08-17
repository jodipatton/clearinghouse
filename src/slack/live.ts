import type { SlackClient, SlackMessage } from "./types.js";
import type { SalesforceRestClient } from "../salesforce/client.js";
import { opportunitySlackMessagesSoql } from "../salesforce/soql.js";

interface SoqlRecord {
  Id: string;
  slackv2__Content__c: string | null;
  slackv2__User_Name__c: string | null;
  slackv2__Time_Stamp__c: string | null;
  slackv2__Contact__c: string | null;
  slackv2__Lead__c: string | null;
}

/**
 * Not a Slack API client at all: Slack messages are synced into Salesforce
 * by a Slack managed package (slackv2__Slack_Message__c), so "live" here
 * means the same JWT-bearer Salesforce connection LiveSalesforce uses, just
 * a different object. There is no separate bot token, no separate outage
 * mode, and no separate credential to rotate.
 *
 * isExternal is a heuristic, not a real field: a message counts as external
 * when it resolved to a Contact or Lead record (an outside party Salesforce
 * already knows about) rather than an internal Slack user. A guest who
 * hasn't been added as a Contact/Lead will read as internal -- there is no
 * field on slackv2__Slack_Message__c that says so directly. Verify against
 * real messages before relying on this distinction anywhere it matters.
 */
export class LiveSlack implements SlackClient {
  constructor(private readonly rest: SalesforceRestClient) {}

  async getMessagesForOpportunity(
    opportunityId: string,
    limit: number,
  ): Promise<SlackMessage[]> {
    const records = await this.rest.query<SoqlRecord>(
      opportunitySlackMessagesSoql(opportunityId, limit),
    );
    return records.map((r) => ({
      ts: r.slackv2__Time_Stamp__c ?? "",
      userDisplay: r.slackv2__User_Name__c,
      text: r.slackv2__Content__c ?? "",
      isExternal: Boolean(r.slackv2__Contact__c || r.slackv2__Lead__c),
    }));
  }
}
