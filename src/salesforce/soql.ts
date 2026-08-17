/**
 * Model-written arguments reach a query language here, so nothing is ever
 * string-built from raw input: values pass through one escape function,
 * identifiers only ever come from the allowlists below, and input that
 * doesn't match is rejected rather than sanitized.
 */

const SF_ID = /^[a-zA-Z0-9]{15}([a-zA-Z0-9]{3})?$/;

export function assertSalesforceId(id: string): string {
  if (!SF_ID.test(id)) {
    throw new RangeError("not a Salesforce Id");
  }
  return id;
}

export function escapeSoqlString(value: string): string {
  // Backslash first, then quote — order matters.
  return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

/** Strip control characters and wildcards, bound length, for LIKE terms. */
export function likeTerm(raw: string): string {
  const cleaned = raw
    .replace(/[\u0000-\u001f\u007f%_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
  if (cleaned.length < 2) {
    throw new RangeError("search term too short");
  }
  return escapeSoqlString(cleaned);
}

export const OPPORTUNITY_FIELDS = [
  "Id",
  "Name",
  "StageName",
  "Amount",
  "CloseDate",
  "Owner.Name",
  "Account.Name",
  "LastModifiedDate",
  "NextStep",
  "Description",
] as const;

/**
 * Slack activity is synced into Salesforce by a Slack package, not read from
 * a separate bot API: one row per message, joined to the deal by
 * slackv2__Opportunity__c. No channel-Id concept is needed on Opportunity at
 * all -- the join key is the opportunity Id itself.
 */
export const SLACK_MESSAGE_FIELDS = [
  "Id",
  "slackv2__Content__c",
  "slackv2__User_Name__c",
  "slackv2__Time_Stamp__c",
  "slackv2__Contact__c",
  "slackv2__Lead__c",
] as const;

export function opportunitySlackMessagesSoql(opportunityId: string, limit: number): string {
  const bounded = Math.min(Math.max(Math.trunc(limit), 1), 30);
  return (
    `SELECT ${SLACK_MESSAGE_FIELDS.join(", ")} FROM slackv2__Slack_Message__c ` +
    `WHERE slackv2__Opportunity__c = '${assertSalesforceId(opportunityId)}' ` +
    `ORDER BY slackv2__Time_Stamp__c DESC LIMIT ${bounded}`
  );
}

export function findOpportunitiesSoql(query: string, limit: number): string {
  const bounded = Math.min(Math.max(Math.trunc(limit), 1), 10);
  return (
    `SELECT ${OPPORTUNITY_FIELDS.join(", ")} FROM Opportunity ` +
    `WHERE Name LIKE '%${likeTerm(query)}%' ` +
    `ORDER BY LastModifiedDate DESC LIMIT ${bounded}`
  );
}

export function getOpportunitySoql(id: string): string {
  return (
    `SELECT ${OPPORTUNITY_FIELDS.join(", ")} FROM Opportunity ` +
    `WHERE Id = '${assertSalesforceId(id)}' LIMIT 1`
  );
}

export function listOpportunitiesSoql(limit: number): string {
  const bounded = Math.min(Math.max(Math.trunc(limit), 1), 200);
  return (
    `SELECT ${OPPORTUNITY_FIELDS.join(", ")} FROM Opportunity ` +
    `ORDER BY LastModifiedDate DESC LIMIT ${bounded}`
  );
}
