import type { Opportunity, SalesforceClient } from "./types.js";
import type { SalesforceRestClient } from "./client.js";
import {
  findOpportunitiesSoql,
  getOpportunitySoql,
  listOpportunitiesSoql,
} from "./soql.js";

interface SoqlRecord {
  Id: string;
  Name: string;
  StageName: string;
  Amount: number | null;
  CloseDate: string | null;
  Owner: { Name: string } | null;
  Account: { Name: string } | null;
  LastModifiedDate: string | null;
  NextStep: string | null;
  Description: string | null;
}

export class LiveSalesforce implements SalesforceClient {
  constructor(private readonly rest: SalesforceRestClient) {}

  private static toOpportunity(r: SoqlRecord): Opportunity {
    return {
      id: r.Id,
      name: r.Name,
      stage: r.StageName,
      amount: r.Amount,
      closeDate: r.CloseDate,
      ownerName: r.Owner?.Name ?? null,
      accountName: r.Account?.Name ?? null,
      lastModified: r.LastModifiedDate,
      nextStep: r.NextStep,
      description: r.Description,
    };
  }

  async findOpportunities(query: string, limit: number): Promise<Opportunity[]> {
    const records = await this.rest.query<SoqlRecord>(findOpportunitiesSoql(query, limit));
    return records.map(LiveSalesforce.toOpportunity);
  }

  async getOpportunity(id: string): Promise<Opportunity | null> {
    const records = await this.rest.query<SoqlRecord>(getOpportunitySoql(id));
    return records.length ? LiveSalesforce.toOpportunity(records[0]) : null;
  }

  async listOpportunities(limit: number): Promise<Opportunity[]> {
    const records = await this.rest.query<SoqlRecord>(listOpportunitiesSoql(limit));
    return records.map(LiveSalesforce.toOpportunity);
  }
}
