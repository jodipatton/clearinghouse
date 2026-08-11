import { describe, expect, it, beforeAll, afterAll } from "vitest";
import type { AddressInfo } from "node:net";
import type { Server } from "node:http";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadConfig } from "../src/config.js";
import { createApp } from "../src/http/app.js";
import { MockSalesforce } from "../src/salesforce/mock.js";
import { MockSlack } from "../src/slack/mock.js";
import { MockGong } from "../src/gong/mock.js";
import { MockPlanhat } from "../src/planhat/mock.js";
import { Roster } from "../src/roster.js";

const PUBLIC_URL = "https://mcp.example.com/mcp";

function rosterFile(members: { email: string }[]): string {
  const dir = mkdtempSync(join(tmpdir(), "ch-roster-"));
  const path = join(dir, "roster.json");
  writeFileSync(path, JSON.stringify({ members }));
  return path;
}

describe("OAuth resource-server handshake", () => {
  let server: Server;
  let base: string;

  beforeAll(async () => {
    const cfg = loadConfig({
      PUBLIC_URL,
      AUTH_MODE: "oauth",
      AUTH_ISSUER: "https://auth.example.com",
      AUTH_JWKS_URL: "https://auth.example.com/.well-known/jwks.json",
    });
    const app = createApp(cfg, {
      sf: new MockSalesforce(),
      slack: new MockSlack(),
      gong: new MockGong(),
      planhat: new MockPlanhat(),
      audit: () => {},
      roster: new Roster(rosterFile([])),
    });
    server = app.listen(0);
    const { port } = server.address() as AddressInfo;
    base = `http://127.0.0.1:${port}`;
  });

  afterAll(() => {
    server.close();
  });

  it("serves RFC 9728 metadata whose resource byte-matches the public URL", async () => {
    const res = await fetch(`${base}/.well-known/oauth-protected-resource`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.resource).toBe(PUBLIC_URL);
    expect(body.authorization_servers).toEqual(["https://auth.example.com"]);
  });

  it("returns 401 with WWW-Authenticate resource_metadata when no token is sent", async () => {
    const res = await fetch(`${base}/mcp`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", method: "ping", id: 1 }),
    });
    expect(res.status).toBe(401);
    const header = res.headers.get("www-authenticate") ?? "";
    expect(header).toContain(
      'resource_metadata="https://mcp.example.com/.well-known/oauth-protected-resource"',
    );
  });

  it("returns 401 (not 500) for a garbage bearer token", async () => {
    const res = await fetch(`${base}/mcp`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer not-a-jwt",
      },
      body: JSON.stringify({ jsonrpc: "2.0", method: "ping", id: 1 }),
    });
    expect(res.status).toBe(401);
    expect(res.headers.get("www-authenticate")).toContain("resource_metadata");
  });
});

describe("roster gate", () => {
  it("denies a signed-in identity that is not on the roster", async () => {
    const cfg = loadConfig({
      PUBLIC_URL,
      AUTH_MODE: "dev",
      DEV_USER_EMAIL: "stranger@1uphealth.com",
    });
    const denials: string[] = [];
    const app = createApp(cfg, {
      sf: new MockSalesforce(),
      slack: new MockSlack(),
      gong: new MockGong(),
      planhat: new MockPlanhat(),
      audit: (e) => {
        if (e.outcome === "denied") denials.push(e.actor);
      },
      roster: new Roster(rosterFile([{ email: "jodi@1uphealth.com" }])),
    });
    const srv = app.listen(0);
    const { port } = srv.address() as AddressInfo;
    const res = await fetch(`http://127.0.0.1:${port}/mcp`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", method: "ping", id: 1 }),
    });
    srv.close();
    expect(res.status).toBe(403);
    expect(denials).toEqual(["stranger@1uphealth.com"]);
  });

  it("denies everyone when the roster file is missing (deny by default)", () => {
    const roster = new Roster("/nonexistent/roster.json");
    expect(roster.isAuthorized("jodi@1uphealth.com")).toBe(false);
  });
});
