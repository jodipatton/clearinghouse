export interface Opportunity {
  id: string;
  name: string;
  stage: string;
  amount: number | null;
  closeDate: string | null;
  ownerName: string | null;
  accountName: string | null;
  lastModified: string | null;
  /** Free text authored partly by humans outside 1upHealth — always enveloped. */
  nextStep: string | null;
  description: string | null;
}

export interface SalesforceClient {
  /** Fuzzy name → candidate opportunities, bounded. */
  findOpportunities(query: string, limit: number): Promise<Opportunity[]>;
  /** Exact lookup by 15/18-char Salesforce Id. */
  getOpportunity(id: string): Promise<Opportunity | null>;
  /**
   * Unfiltered bulk read, most-recently-modified first, bounded. Used both
   * by scans (pipeline-pulse/pipeline_snapshot) and by the cross-deal MCP
   * tools (recent_activity, coverage_check) -- callers are responsible for
   * capping what they return to a caller, same discipline find_deal applies
   * to a single query.
   */
  listOpportunities(limit: number): Promise<Opportunity[]>;
}
