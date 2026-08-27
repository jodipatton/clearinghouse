import type { SalesforceClient } from "../salesforce/types.js";
import type { SlackClient } from "../slack/types.js";
import type { GongClient } from "../gong/types.js";
import { normalizeName } from "../fictions/match.js";
import { PORTFOLIO_DATA } from "../portfolio/data.js";
import type { PortfolioProfile } from "../portfolio/types.js";

/** Same window as the Overview tab's "Slack activity, last N days" card (src/routines/overview.ts) -- kept in sync so "recent" means the same thing everywhere in this dashboard. */
const SLACK_ACTIVITY_WINDOW_DAYS = 60;
/** Preview only, not the full feed -- deal_channel_activity / the Deal lookup tab is the place for that on a specific deal. */
const SLACK_PREVIEW_LIMIT = 8;
const MEETINGS_LIMIT = 5;

/**
 * The Clinical Connect tab's cohort, named by Jodi rather than derived from
 * any field on the account (no product-line field distinguishes these from
 * the other 39 -- see products_and_scope free text for the actual contract
 * detail). Matched by name, not by array index, so this survives edits to
 * data.ts's ordering.
 */
const CLINICAL_CONNECT_ACCOUNT_NAMES = [
  "Fallon Community Health Plan",
  "Capital Health Plan",
  "Viva Health",
  "Zing Health",
];

export function clinicalConnectAccountIds(): number[] {
  return CLINICAL_CONNECT_ACCOUNT_NAMES.map((name) => {
    const profile = PORTFOLIO_DATA.profiles.find((p) => p.name === name);
    if (!profile) throw new Error(`Clinical Connect account "${name}" not found in portfolio data`);
    return profile.id;
  });
}

/** Fuzzy substring match against the 43 portfolio account names -- same normalizeName join used everywhere else in this codebase, not a real search index. */
export function findPortfolioProfilesByQuery(query: string): PortfolioProfile[] {
  const q = normalizeName(query);
  return PORTFOLIO_DATA.profiles.filter((p) => normalizeName(p.name).includes(q));
}

export function getPortfolioProfile(id: number): PortfolioProfile | null {
  return PORTFOLIO_DATA.profiles.find((p) => p.id === id) ?? null;
}

/** Shared by the dashboard's HTML fields and the MCP tools' plain-text fields, so both list the same seven research fields in the same order. */
export const PORTFOLIO_RESEARCH_FIELDS: [keyof PortfolioProfile, string][] = [
  ["products_and_scope", "Products & Scope"],
  ["implementation_status", "Implementation Status"],
  ["tech_architecture", "Technical Architecture"],
  ["financial_signals", "Financial Signals"],
  ["key_people", "Key People"],
  ["risks_and_blockers", "Risks & Blockers"],
  ["points_of_interest", "Points of Interest"],
];

function escapeHtml(s: string): string {
  return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c] as string);
}

/**
 * Research prose -> a small, allowlisted HTML string: `[citation]` markers
 * become `<span class="cite">`, `**bold**` becomes `<strong>`, and "1) ... 2)
 * ..." enumerations become an `<ol>`. Escapes first, so the only tags that
 * can ever appear are the ones this function adds itself. The dashboard
 * client re-parses this through its own allowlist DOM builder rather than
 * `innerHTML`-ing it directly (see dashboardPage.ts's renderRichHtml) --
 * belt-and-suspenders, since this text is ultimately grounded in
 * Gong/Slack/Salesforce content someone else authored.
 */
export function fmtToHtml(text: string | null): string {
  if (!text) return "";
  const enrich = (s: string) =>
    escapeHtml(s)
      .replace(/\[([^\]]+)\]/g, '<span class="cite">[$1]</span>')
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  const markers = [...text.matchAll(/(?:^|\s)(\d+)\)\s/g)];
  if (markers.length >= 2) {
    const idxs = markers.map((m) => (m.index ?? 0) + (m[0][0] === " " ? 1 : 0));
    const intro = text.slice(0, idxs[0]).trim();
    let html = intro ? `<p>${enrich(intro)}</p>` : "";
    html += "<ol>";
    for (let k = 0; k < idxs.length; k++) {
      let seg = text.slice(idxs[k], k + 1 < idxs.length ? idxs[k + 1] : text.length).trim();
      seg = seg.replace(/^\d+\)\s*/, "");
      html += `<li>${enrich(seg)}</li>`;
    }
    return html + "</ol>";
  }
  return text
    .split(/\n{2,}/)
    .map((p) => `<p>${enrich(p.trim())}</p>`)
    .join("");
}

export interface PortfolioDirectoryEntry {
  id: number;
  name: string;
  seg: string;
  seglabel: string;
  quarter: string;
  qlabel: string;
  note: string | null;
  arr: number | null;
  health: number | null;
}

/**
 * Portfolio tab + the Customers directory list -- everything except one
 * account's full dossier (that's getPortfolioAccount, fetched on demand so
 * this summary stays light). Pure aggregation over the static dataset, same
 * "no write path" shape as buildOverview.
 */
export function buildPortfolioSummary() {
  const { profiles, topPlays, sfSummary, synthesisHtml, qorder, qlabels, seglabels } =
    PORTFOLIO_DATA;

  const bySeg: Record<string, { count: number; arr: number }> = {};
  for (const p of profiles) {
    const entry = bySeg[p.seg] ?? { count: 0, arr: 0 };
    entry.count += 1;
    entry.arr += p.sf?.arr ?? 0;
    bySeg[p.seg] = entry;
  }
  const highFitPlayCount = profiles.reduce((sum, p) => sum + p.plays_hi, 0);

  const arrOf = (names: string[]): number =>
    names.reduce((sum, n) => {
      const p = profiles.find((x) => x.name === n);
      return sum + (p?.sf?.arr ?? 0);
    }, 0);

  return {
    totalArr: sfSummary.total_arr,
    accountCount: profiles.length,
    highFitPlayCount,
    bySegment: Object.entries(bySeg).map(([seg, v]) => ({
      seg,
      label: seglabels[seg] ?? seg,
      count: v.count,
      arr: v.arr,
    })),
    riskStrip: {
      knownChurn: { names: sfSummary.known_churn, arr: arrOf(sfSummary.known_churn) },
      lowHealth: { names: sfSummary.low_health, arr: arrOf(sfSummary.low_health) },
      competitorEngaged: {
        count: sfSummary.competitor_engaged.length,
        arr: arrOf(sfSummary.competitor_engaged),
      },
      flaggedCount: sfSummary.flagged_count,
      matched: sfSummary.matched,
    },
    topPlays: topPlays.map((t) => ({
      ...t,
      accountName: t.ref !== null ? profiles[t.ref]?.name ?? t.account_label : t.account_label,
      seg: t.ref !== null ? profiles[t.ref]?.seg ?? null : null,
    })),
    synthesisHtml,
    qorder,
    qlabels,
    clinicalConnectIds: clinicalConnectAccountIds(),
    directory: profiles.map(
      (p): PortfolioDirectoryEntry => ({
        id: p.id,
        name: p.name,
        seg: p.seg,
        seglabel: p.seglabel,
        quarter: p.quarter,
        qlabel: p.qlabel,
        note: p.note,
        arr: p.sf?.arr ?? null,
        health: p.sf?.health ?? null,
      }),
    ),
    pulledAt: sfSummary.pulled,
  };
}

export interface LiveAccountContext {
  liveDealMatch: { id: string; name: string; stage: string; amount: number | null } | null;
  /** Only reachable through a resolved live opportunity, same Gate 03 shape as deal_channel_activity/call_details -- no live deal match means no meetings, not an error. */
  meetings: {
    available: boolean;
    withheld: boolean;
    calls: {
      id: string;
      at: string;
      durationMinutes: number;
      title: string;
      participants: { name: string | null; isExternal: boolean }[];
      summary: string | null;
    }[];
  };
  slackActivity: {
    windowDays: number;
    messageCount: number;
    messages: { at: string; from: string | null; external: boolean; text: string }[];
  };
}

/**
 * The live half of a portfolio account's picture, shared by every consumer
 * (dashboard dossier, MCP tools) so the Salesforce/Slack/Gong-fetching logic
 * -- and the account-name join it depends on -- exists exactly once. Callers
 * layer this on top of the static research fields however fits their output
 * (HTML for the dashboard, plain enveloped text for Claude).
 */
export async function resolveLiveAccountContext(
  accountName: string,
  sf: SalesforceClient,
  slack: SlackClient,
  gong: GongClient,
): Promise<LiveAccountContext> {
  const candidates = await sf.findOpportunities(accountName, 5);
  const liveMatch =
    candidates.find((o) => o.accountName && normalizeName(o.accountName) === normalizeName(accountName)) ??
    null;

  const [slackMessages, slackMessageCount, calls] = await Promise.all([
    slack.getMessagesForAccount(accountName, SLACK_PREVIEW_LIMIT),
    slack.countRecentMessages(accountName, SLACK_ACTIVITY_WINDOW_DAYS),
    liveMatch ? gong.getCallsForOpportunity(liveMatch.id, MEETINGS_LIMIT) : Promise.resolve([]),
  ]);

  return {
    liveDealMatch: liveMatch
      ? { id: liveMatch.id, name: liveMatch.name, stage: liveMatch.stage, amount: liveMatch.amount }
      : null,
    meetings: {
      available: liveMatch !== null,
      withheld: gong.contentMode === "metadata",
      calls: calls.map((c) => ({
        id: c.id,
        at: c.startedAt,
        durationMinutes: Math.round(c.durationSec / 60),
        title: c.title,
        participants: c.participants,
        summary: c.summary,
      })),
    },
    slackActivity: {
      windowDays: SLACK_ACTIVITY_WINDOW_DAYS,
      messageCount: slackMessageCount,
      messages: slackMessages.map((m) => ({
        at: m.ts,
        from: m.userDisplay,
        external: m.isExternal,
        text: m.text,
      })),
    },
  };
}

/**
 * One account's full dossier for the dashboard, plus a live cross-link: a
 * best-effort Salesforce lookup by account name (same normalizeName join
 * src/fictions/match.ts uses elsewhere), so the dashboard can offer "open
 * the live deal" next to research that may be months stale.
 */
export async function getPortfolioAccount(
  id: number,
  sf: SalesforceClient,
  slack: SlackClient,
  gong: GongClient,
): Promise<Record<string, unknown> | null> {
  const profile = PORTFOLIO_DATA.profiles.find((p) => p.id === id);
  if (!profile) return null;

  const live = await resolveLiveAccountContext(profile.name, sf, slack, gong);

  return {
    id: profile.id,
    name: profile.name,
    full: profile.full,
    seg: profile.seg,
    seglabel: profile.seglabel,
    quarter: profile.quarter,
    qlabel: profile.qlabel,
    note: profile.note,
    dq: profile.dq,
    fields: PORTFOLIO_RESEARCH_FIELDS.map(([key, label]) => ({
      label,
      html: fmtToHtml(profile[key] as string | null),
    })).filter((f) => f.html !== ""),
    expansionPlays: profile.expansion_plays,
    playsHi: profile.plays_hi,
    sources: profile.sources,
    sf: profile.sf,
    sfPulledAt: PORTFOLIO_DATA.sfSummary.pulled,
    ...live,
  };
}

/** The Analytics Fit tab: capability tiers, the Project Prism pitch, and gap analysis -- returned near-verbatim, same static dataset. */
export function buildAnalyticsFit() {
  return PORTFOLIO_DATA.analytics;
}
