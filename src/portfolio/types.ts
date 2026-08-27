/**
 * Shapes for the static CMS-0057 portfolio research dataset (43 accounts),
 * ported from the "1upHealth Customer Intelligence — CMS-0057 Portfolio"
 * artifact. This is hand-authored due diligence as of a point in time
 * (Gong quotes, a Salesforce snapshot, judgment calls) -- it is never
 * regenerated from the live/mock Salesforce/Planhat/Gong adapters the rest
 * of this server uses. Cross-linking to a *live* deal happens by account
 * name at read time (see src/routines/portfolio.ts), the same
 * normalizeName-based join src/fictions/match.ts already relies on.
 */

export type Segment = "medicaid" | "medadv" | "commercial" | "bespoke";
export type Quarter = "live" | "q1" | "q2" | "q3" | "q4" | "pend";
export type Fit = "high" | "medium" | "low" | "" | null;
export type GongSignal = "strong" | "moderate" | "weak" | "none";

export interface ExpansionPlay {
  play: string;
  rationale: string;
  fit: Fit;
}

export interface SalesforceOppSnapshot {
  closed: string | null;
  name: string | null;
  type: string | null;
  arr: number | null;
  services: number | null;
  amount: number | null;
  months: number | null;
  owner: string | null;
  won_because: string | null;
  competitor: string | null;
}

/** A snapshot, not a live read -- see sfSummary.pulled for when this was taken. */
export interface SalesforceSnapshot {
  arr: number | null;
  cumulative: number | null;
  product_rev: number | null;
  services_rev: number | null;
  health: number | null;
  temperature: string | null;
  nps: number | null;
  renewal_sentiment: number | null;
  sentiment_notes: string | null;
  flags: string[];
  renewal: string | null;
  contract_exp: string | null;
  customer_since: string | null;
  go_live: string | null;
  impl_level: string | null;
  products_sold: string | null;
  lobs: string | null;
  members_contracted: number | null;
  members_current: number | null;
  competitors: string | null;
  pbm: string | null;
  owner: string | null;
  csm: string | null;
  exec_sponsor: string | null;
  tier: string | null;
  opps: SalesforceOppSnapshot[];
}

export interface PortfolioProfile {
  id: number;
  name: string;
  quarter: Quarter;
  qlabel: string;
  seg: Segment;
  seglabel: string;
  note: string | null;
  full: string;
  /** Data-quality label the original research assigned this account, e.g. "rich". */
  dq: string;
  products_and_scope: string | null;
  implementation_status: string | null;
  tech_architecture: string | null;
  financial_signals: string | null;
  key_people: string | null;
  risks_and_blockers: string | null;
  points_of_interest: string | null;
  expansion_plays: ExpansionPlay[];
  plays_hi: number;
  sources: string[];
  sf: SalesforceSnapshot | null;
}

export interface TopPlay {
  rank: number;
  /** Index into profiles[], when this play is tied to one portfolio account. */
  ref: number | null;
  account_label: string;
  play: string;
  why: string;
  size: string;
  trigger: string;
}

export interface SfSummary {
  total_arr: number;
  matched: number;
  flagged_count: number;
  known_churn: string[];
  low_health: string[];
  competitor_engaged: string[];
  /** Date the Salesforce snapshot embedded in each profile's `sf` field was pulled. */
  pulled: string;
}

export interface AnalyticsStats {
  covered: number;
  withSignal: number;
  tier1Count: number;
  tier1Arr: number;
  totalArr: number;
  topThemeCount: number;
  topThemeLabel: string;
}

export interface AnalyticsTheme {
  key: string;
  label: string;
  count: number;
  accounts: string[];
}

export interface AnalyticsTierItem {
  ref: number | null;
  name: string;
  seg: Segment | null;
  arr: number | null;
  health: number | null;
  gongSignal: GongSignal;
  internalFit: Fit;
  score: number;
  tier: number;
  ask: string;
  evidence: string[];
  caveats: string[];
}

export interface AnalyticsTier {
  tier: number;
  label: string;
  desc: string;
  count: number;
  arr: number;
  items: AnalyticsTierItem[];
}

export interface ProductPricing {
  name: string;
  scope: string;
  price: string;
}

export interface ProductMeasure {
  key: string;
  name: string;
  question: string;
  data: string;
  takeaway: string;
}

export interface AnalyticsProduct {
  team: string;
  name: string;
  tagline: string;
  pitch: string;
  roi: string[];
  pricing: ProductPricing[];
  measures: ProductMeasure[];
  pricingNote: string;
  implementation: string;
}

export interface MeasureMapEntry {
  accounts: string[];
  note: string;
}

export interface GapFunnelRow {
  label: string;
  value: string;
  note: string;
}

export interface GapRevenueRow {
  year: string;
  desc: string;
  value: string;
}

export interface GapPriceTierRow {
  seg: string;
  bundle: string;
  pkg: string;
}

export interface GapMarket {
  funnel: GapFunnelRow[];
  revenue: GapRevenueRow[];
  finding: string;
}

export interface GapPricing {
  anchor: string;
  tiers: GapPriceTierRow[];
  reposition: string;
  gainshare: string;
}

export interface GapMeasureSwap {
  add: { name: string; why: string };
  defer: { name: string; why: string };
}

export interface GapRoadmapStep {
  phase: string;
  desc: string;
}

export interface GapPersonaReorder {
  lead: string[];
  proof: string;
  roi: string;
  appendix: string[];
}

export interface AnalyticsGaps {
  market: GapMarket;
  pricing: GapPricing;
  measureSwap: GapMeasureSwap;
  implRoadmap: GapRoadmapStep[];
  personaReorder: GapPersonaReorder;
}

export interface AnalyticsFit {
  stats: AnalyticsStats;
  themes: AnalyticsTheme[];
  tiers: AnalyticsTier[];
  briefingHtml: string;
  product: AnalyticsProduct;
  measureMap: Record<string, MeasureMapEntry>;
  gaps: AnalyticsGaps;
}

export interface PortfolioData {
  profiles: PortfolioProfile[];
  topPlays: TopPlay[];
  synthesisHtml: string;
  qorder: Quarter[];
  qlabels: Record<string, string>;
  seglabels: Record<string, string>;
  sfSummary: SfSummary;
  analytics: AnalyticsFit;
}
