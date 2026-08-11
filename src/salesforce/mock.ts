import type { Opportunity, SalesforceClient } from "./types.js";
import { assertSalesforceId, likeTerm } from "./soql.js";
import { FIXTURES } from "./fixtures.js";

/**
 * Fixture-backed client for local dev and tests. Runs input through the same
 * validators as the live path so a term the live adapter would reject also
 * fails here.
 */
export class MockSalesforce implements SalesforceClient {
  constructor(private readonly data: Opportunity[] = FIXTURES) {}

  async findOpportunities(query: string, limit: number): Promise<Opportunity[]> {
    const term = likeTerm(query).toLowerCase();
    const words = term.split(" ");
    return this.data
      .filter((o) => {
        const hay = `${o.name} ${o.accountName ?? ""}`.toLowerCase();
        return words.some((w) => hay.includes(w));
      })
      .slice(0, Math.min(limit, 10));
  }

  async getOpportunity(id: string): Promise<Opportunity | null> {
    assertSalesforceId(id);
    return this.data.find((o) => o.id === id) ?? null;
  }

  async listOpportunities(limit: number): Promise<Opportunity[]> {
    return this.data.slice(0, Math.min(Math.max(Math.trunc(limit), 1), 200));
  }
}
