import type { GongCall, GongClient, GongContentMode } from "./types.js";
import { FIXTURES } from "./fixtures.js";
import { assertSalesforceId } from "../salesforce/soql.js";

/** Fixture-backed client for local dev and tests. Runs the opportunity Id
 * through the same validator as the live path, and honours the same content
 * gate, so a metadata-mode run looks here exactly as it does in production. */
export class MockGong implements GongClient {
  constructor(
    readonly contentMode: GongContentMode = "metadata",
    private readonly data: Record<string, GongCall[]> = FIXTURES,
  ) {}

  async getCallsForOpportunity(
    opportunityId: string,
    limit: number,
  ): Promise<GongCall[]> {
    assertSalesforceId(opportunityId);
    const bounded = Math.min(Math.max(Math.trunc(limit), 1), 10);
    return (this.data[opportunityId] ?? []).slice(0, bounded).map((c) => ({
      ...c,
      summary: this.contentMode === "summaries" ? c.summary : null,
    }));
  }
}
