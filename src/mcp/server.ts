import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { AuditSink } from "../audit.js";
import type { SalesforceClient } from "../salesforce/types.js";
import type { SlackClient } from "../slack/types.js";
import type { GongClient } from "../gong/types.js";
import type { PlanhatClient } from "../planhat/types.js";
import { findDeal, findDealDescription, findDealInput } from "../tools/findDeal.js";
import { dealStatus, dealStatusDescription, dealStatusInput } from "../tools/dealStatus.js";
import {
  dealChannelActivity,
  dealChannelActivityDescription,
  dealChannelActivityInput,
} from "../tools/dealChannelActivity.js";
import {
  callDetails,
  callDetailsDescription,
  callDetailsInput,
} from "../tools/callDetails.js";
import {
  recentActivity,
  recentActivityDescription,
  recentActivityInput,
} from "../tools/recentActivity.js";
import {
  coverageCheck,
  coverageCheckDescription,
  coverageCheckInput,
} from "../tools/coverageCheck.js";
import {
  pipelineSnapshot,
  pipelineSnapshotDescription,
  pipelineSnapshotInput,
} from "../tools/pipelineSnapshot.js";

export interface RequestContext {
  actor: string;
  sf: SalesforceClient;
  slack: SlackClient;
  gong: GongClient;
  planhat: PlanhatClient;
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

  server.registerTool(
    "deal_channel_activity",
    { description: dealChannelActivityDescription, inputSchema: dealChannelActivityInput },
    (args) =>
      run(
        "deal_channel_activity",
        ["salesforce", "slack"],
        { opportunityId: args.opportunityId },
        () => dealChannelActivity(ctx.sf, ctx.slack, args),
      ),
  );

  server.registerTool(
    "call_details",
    { description: callDetailsDescription, inputSchema: callDetailsInput },
    (args) =>
      run(
        "call_details",
        ["salesforce", "gong"],
        { opportunityId: args.opportunityId },
        () => callDetails(ctx.sf, ctx.gong, args),
      ),
  );

  server.registerTool(
    "recent_activity",
    { description: recentActivityDescription, inputSchema: recentActivityInput },
    (args) =>
      run(
        "recent_activity",
        ["salesforce", "slack", "gong"],
        { ownerName: args.ownerName, days: args.days },
        () => recentActivity(ctx.sf, ctx.slack, ctx.gong, args),
      ),
  );

  server.registerTool(
    "coverage_check",
    { description: coverageCheckDescription, inputSchema: coverageCheckInput },
    (args) =>
      run(
        "coverage_check",
        ["salesforce", "gong"],
        { ownerName: args.ownerName },
        () => coverageCheck(ctx.sf, ctx.gong, args),
      ),
  );

  server.registerTool(
    "pipeline_snapshot",
    { description: pipelineSnapshotDescription, inputSchema: pipelineSnapshotInput },
    (args) =>
      run(
        "pipeline_snapshot",
        ["salesforce", "planhat"],
        { minSeverity: args.minSeverity },
        () => pipelineSnapshot(ctx.sf, ctx.planhat, args),
      ),
  );

  return server;
}
