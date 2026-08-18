import type { SlackClient, SlackMessage } from "./types.js";

interface LiveOptions {
  botToken: string;
}

interface SlackApiMessage {
  ts: string;
  user?: string;
  text?: string;
  /** Present on Slack Connect messages; differs from our own team Id for a guest author. */
  user_team?: string;
  bot_id?: string;
}

interface SlackApiChannel {
  id: string;
  name: string;
}

const ACCOUNT_CHANNEL_PREFIX = "account-";
/** Bounds countRecentMessages on a very busy channel -- 5 pages * 200 = 1000 messages max. */
const MAX_HISTORY_PAGES = 5;

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Bot token installed once to the workspace, invited only into the
 * "#account-<name>" channels it needs. Confirmed against real data
 * (2026-08): this naming convention is 1upHealth's actual customer-channel
 * mapping -- no Salesforce or Planhat field stores it, the channel name IS
 * the mapping. conversations.list only ever returns channels the bot is
 * actually in (least-privilege, same as before) filtered to the account-*
 * prefix; this is channel-name matching, not a workspace-wide message or
 * channel search.
 *
 * Known limitation, same shape as the account-name join in
 * fictions/match.ts: the slug match below breaks on renames, ambiguous or
 * very short account names, or an account whose channel doesn't follow the
 * convention. Confirmed messy in practice: many newer "-implementation-"
 * channels exist with no topic/purpose at all, and not every account has a
 * channel. Callers treat "no channel found" the same as "no messages" --
 * never an error.
 */
export class LiveSlack implements SlackClient {
  private ownTeamId: string | null = null;
  private channelCache: SlackApiChannel[] | null = null;

  constructor(private readonly opts: LiveOptions) {}

  private async call<T>(method: string, params: URLSearchParams): Promise<T> {
    const res = await fetch(`https://slack.com/api/${method}?${params.toString()}`, {
      headers: { authorization: `Bearer ${this.opts.botToken}` },
    });
    if (!res.ok) {
      throw new Error(`Slack ${method} failed: ${res.status}`);
    }
    const body = (await res.json()) as { ok: boolean; error?: string } & T;
    if (!body.ok) {
      throw new Error(`Slack ${method} failed: ${body.error ?? "unknown error"}`);
    }
    return body;
  }

  private async teamId(): Promise<string> {
    if (this.ownTeamId) return this.ownTeamId;
    const body = await this.call<{ team_id: string }>("auth.test", new URLSearchParams());
    this.ownTeamId = body.team_id;
    return body.team_id;
  }

  /** Cached for the process lifetime -- account channels don't get renamed often. */
  private async accountChannels(): Promise<SlackApiChannel[]> {
    if (this.channelCache) return this.channelCache;
    const channels: SlackApiChannel[] = [];
    let cursor = "";
    do {
      const params = new URLSearchParams({ types: "public_channel,private_channel", limit: "200" });
      if (cursor) params.set("cursor", cursor);
      const body = await this.call<{
        channels: SlackApiChannel[];
        response_metadata?: { next_cursor?: string };
      }>("conversations.list", params);
      channels.push(...body.channels.filter((c) => c.name.startsWith(ACCOUNT_CHANNEL_PREFIX)));
      cursor = body.response_metadata?.next_cursor ?? "";
    } while (cursor);
    this.channelCache = channels;
    return channels;
  }

  private async resolveChannel(accountName: string): Promise<SlackApiChannel | null> {
    const accountSlug = slugify(accountName);
    if (!accountSlug) return null;
    const channels = await this.accountChannels();
    let best: SlackApiChannel | null = null;
    let bestLen = 0;
    for (const c of channels) {
      const channelSlug = slugify(c.name.slice(ACCOUNT_CHANNEL_PREFIX.length));
      if (!channelSlug) continue;
      const matches =
        accountSlug.startsWith(channelSlug) || channelSlug.startsWith(accountSlug);
      // Longest matching slug wins -- most specific, least likely to be a
      // coincidental short-prefix collision between two different accounts.
      if (matches && channelSlug.length > bestLen) {
        best = c;
        bestLen = channelSlug.length;
      }
    }
    return best;
  }

  async getMessagesForAccount(accountName: string, limit: number): Promise<SlackMessage[]> {
    const channel = await this.resolveChannel(accountName);
    if (!channel) return [];
    const bounded = Math.min(Math.max(Math.trunc(limit), 1), 30);
    const teamId = await this.teamId();
    const body = await this.call<{ messages: SlackApiMessage[] }>(
      "conversations.history",
      new URLSearchParams({ channel: channel.id, limit: String(bounded) }),
    );
    return body.messages
      .filter((m) => !m.bot_id)
      .map((m) => ({
        ts: m.ts,
        userDisplay: m.user ?? null,
        text: m.text ?? "",
        isExternal: Boolean(m.user_team && m.user_team !== teamId),
      }));
  }

  async countRecentMessages(accountName: string, days: number): Promise<number> {
    const channel = await this.resolveChannel(accountName);
    if (!channel) return 0;
    const oldest = (Date.now() / 1000 - Math.max(days, 1) * 86400).toFixed(6);
    let count = 0;
    let cursor = "";
    for (let page = 0; page < MAX_HISTORY_PAGES; page++) {
      const params = new URLSearchParams({ channel: channel.id, oldest, limit: "200" });
      if (cursor) params.set("cursor", cursor);
      const body = await this.call<{
        messages: SlackApiMessage[];
        has_more?: boolean;
        response_metadata?: { next_cursor?: string };
      }>("conversations.history", params);
      count += body.messages.filter((m) => !m.bot_id).length;
      cursor = body.has_more ? body.response_metadata?.next_cursor ?? "" : "";
      if (!cursor) break;
    }
    return count;
  }
}
