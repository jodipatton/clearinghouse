import type { SlackClient, SlackMessage } from "./types.js";

/**
 * Bot token installed once to the workspace, read-only, invited only into
 * the channels it needs to read. No workspace-wide search: this client only
 * ever fetches history for one channel Id the caller already resolved.
 */
interface LiveOptions {
  botToken: string;
}

interface SlackApiMessage {
  ts: string;
  user?: string;
  text?: string;
  /** Present on Slack Connect messages; differs from our own team Id for a
   * guest author. */
  user_team?: string;
  bot_id?: string;
}

export class LiveSlack implements SlackClient {
  private ownTeamId: string | null = null;

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

  async getChannelHistory(channelId: string, limit: number): Promise<SlackMessage[]> {
    const bounded = Math.min(Math.max(Math.trunc(limit), 1), 30);
    const teamId = await this.teamId();
    const body = await this.call<{ messages: SlackApiMessage[] }>(
      "conversations.history",
      new URLSearchParams({ channel: channelId, limit: String(bounded) }),
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
}
