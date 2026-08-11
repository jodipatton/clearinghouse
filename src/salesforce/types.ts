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
}
