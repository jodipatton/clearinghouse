import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { AuditSink } from "../audit.js";
import type { SalesforceClient } from "../salesforce/types.js";
import { findDeal, findDealDescription, findDealInput } from "../tools/findDeal.js";
import { dealStatus, dealStatusDescription, dealStatusInput } from "../tools/dealStatus.js";

export interface RequestContext {
  actor: string;
  sf: SalesforceClient;
  audit: AuditSink;
}

type ToolResult = { content: { type: "text"; text: string }[]; isError?: boolean };

function asResult(payload: Record<string, unknown>): ToolResult {
  return { content: [{ type: "text", text: JSON.stringify(payload, null, 2) }] };
}

/**
 * One server instance per request (stateless streamable HTTP — Cloud Run
 * autoscaling breaks sticky sessions, so no session state may exist here).
 */
export function buildServer(ctx: RequestContext): McpServer {
  const server = new McpServer({ name: "clearinghouse", version: "0.1.0" });

  const run = (
    tool: string,
    systems: string[],
    args: Record<string, unknown>,
    fn: () => Promise<Record<string, unknown>>,
  ): Promise<ToolResult> => {
    const started = Date.now();
    return fn().then(
      (payload) => {
        const result = asResult(payload);
        ctx.audit({
          actor: ctx.actor,
          tool,
          args,
          systems,
          outcome: "ok",
          resultBytes: result.content[0].text.length,
          ms: Date.now() - started,
        });
        return result;
      },
      (err: unknown) => {
        ctx.audit({
          actor: ctx.actor,
          tool,
          args,
          systems,
          outcome: "error",
          ms: Date.now() - started,
        });
        const message = err instanceof RangeError ? err.message : "tool failed";
        return { ...asResult({ error: message }), isError: true };
      },
    );
  };

  server.registerTool(
    "find_deal",
    { description: findDealDescription, inputSchema: findDealInput },
    (args) =>
      run("find_deal", ["salesforce"], { query: args.query }, () =>
        findDeal(ctx.sf, args),
      ),
  );

  server.registerTool(
    "deal_status",
    { description: dealStatusDescription, inputSchema: dealStatusInput },
    (args) =>
      run(
        "deal_status",
        ["salesforce"],
        { opportunityId: args.opportunityId },
        () => dealStatus(ctx.sf, args),
      ),
  );

  return server;
}
