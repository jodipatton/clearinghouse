import type { GongCall, GongClient, GongContentMode } from "./types.js";
import { assertSalesforceId } from "../salesforce/soql.js";

/**
 * Read-only Gong API key (access key + secret, HTTP Basic) issued once to this
 * service. Two things this adapter is careful about:
 *
 * 1. **Gate 04 / Decision D.** When contentMode is "metadata" the call brief is
 *    left out of the content selector, so Gong never sends spoken content and
 *    no redaction pass is load-bearing. Flipping to "summaries" is the moment
 *    the BAA/retention answer has to already be in hand.
 * 2. **Gate 03.** Callers reach calls only through a Salesforce opportunity Id
 *    that resolved first; this class exposes no by-call-Id or list-all path.
 *
 * Shape caveat, same discipline as the Planhat adapter: the response field
 * names below (`metaData`, `parties[].affiliation`, `context[].objects[]`)
 * follow Gong's documented `/v2/calls/extensive` payload but have not been
 * checked against 1upHealth's tenant. Verify against one real call before
 * setting GONG_MODE=live.
 *
 * This is a direct read, not the PRD's nightly index: it pages a bounded
 * recent window and keeps the calls Gong associates with the requested
 * opportunity. The index replaces it when call volume makes the window scan
 * too slow — the interface above is what stays.
 */
interface LiveOptions {
  accessKey: string;
  accessKeySecret: string;
  contentMode: GongContentMode;
  /** How far back a deal's call history is read. */
  lookbackDays: number;
  baseUrl?: string;
  /** Hard stop on the window scan so one call can never walk the tenant. */
  maxPages?: number;
  now?: () => Date;
}

interface GongApiCall {
  metaData: {
    id: string;
    title?: string;
    started?: string;
    duration?: number;
  };
  parties?: { name?: string; affiliation?: string }[];
  context?: {
    system?: string;
    objects?: { objectType?: string; objectId?: string }[];
  }[];
  content?: { brief?: string };
}

interface ExtensiveResponse {
  calls?: GongApiCall[];
  records?: { cursor?: string };
}

export class LiveGong implements GongClient {
  readonly contentMode: GongContentMode;
  private readonly baseUrl: string;
  private readonly maxPages: number;
  private readonly now: () => Date;

  constructor(private readonly opts: LiveOptions) {
    this.contentMode = opts.contentMode;
    this.baseUrl = opts.baseUrl ?? "https://api.gong.io";
    this.maxPages = opts.maxPages ?? 10;
    this.now = opts.now ?? (() => new Date());
  }

  private get authHeader(): string {
    const raw = `${this.opts.accessKey}:${this.opts.accessKeySecret}`;
    return `Basic ${Buffer.from(raw).toString("base64")}`;
  }

  private async page(
    fromDateTime: string,
    toDateTime: string,
    cursor?: string,
  ): Promise<ExtensiveResponse> {
    const body = {
      filter: { fromDateTime, toDateTime },
      contentSelector: {
        // Extended context is what carries the CRM objects a call is
        // associated with — the join key for the whole tool.
        context: "Extended",
        contextTiming: ["Now"],
        exposedFields: {
          parties: true,
          // Requested only when Decision D has landed. See class comment.
          ...(this.contentMode === "summaries"
            ? { content: { brief: true } }
            : {}),
        },
      },
      ...(cursor ? { cursor } : {}),
    };
    const res = await fetch(`${this.baseUrl}/v2/calls/extensive`, {
      method: "POST",
      headers: {
        authorization: this.authHeader,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`Gong calls/extensive failed: ${res.status}`);
    }
    return (await res.json()) as ExtensiveResponse;
  }

  private static matchesOpportunity(call: GongApiCall, opportunityId: string): boolean {
    // Gong stores the 18-character Id; a 15-character one from Salesforce is
    // its case-sensitive prefix.
    return (call.context ?? []).some((ctx) =>
      (ctx.objects ?? []).some(
        (obj) =>
          obj.objectType === "Opportunity" &&
          typeof obj.objectId === "string" &&
          (obj.objectId === opportunityId ||
            obj.objectId.startsWith(opportunityId)),
      ),
    );
  }

  private static normalize(call: GongApiCall): GongCall {
    return {
      id: call.metaData.id,
      title: call.metaData.title ?? "(untitled call)",
      startedAt: call.metaData.started ?? "",
      durationSec: call.metaData.duration ?? 0,
      participants: (call.parties ?? []).map((p) => ({
        name: p.name ?? null,
        isExternal: p.affiliation === "External",
      })),
      summary: call.content?.brief ?? null,
    };
  }

  async getCallsForOpportunity(
    opportunityId: string,
    limit: number,
  ): Promise<GongCall[]> {
    assertSalesforceId(opportunityId);
    const bounded = Math.min(Math.max(Math.trunc(limit), 1), 10);
    const to = this.now();
    const from = new Date(to.getTime() - this.opts.lookbackDays * 86_400_000);

    const matched: GongCall[] = [];
    let cursor: string | undefined;
    for (let page = 0; page < this.maxPages; page++) {
      const body = await this.page(from.toISOString(), to.toISOString(), cursor);
      for (const call of body.calls ?? []) {
        if (LiveGong.matchesOpportunity(call, opportunityId)) {
          matched.push(LiveGong.normalize(call));
        }
      }
      cursor = body.records?.cursor;
      if (!cursor) break;
    }

    return matched
      .sort((a, b) => b.startedAt.localeCompare(a.startedAt))
      .slice(0, bounded);
  }
}
