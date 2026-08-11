import { SignJWT, importPKCS8 } from "jose";
import type { Opportunity, SalesforceClient } from "./types.js";
import { findOpportunitiesSoql, getOpportunitySoql } from "./soql.js";

/**
 * Gate 05 — OAuth 2.0 JWT bearer flow as exactly one pre-authorized
 * integration user. The connected app must be locked to that user and to the
 * service's static egress IP (see README runbook); this code cannot enforce
 * either, so it asserts the narrow shape it can: one configured subject, a
 * key that arrives from Secret Manager, tokens cached briefly and never
 * logged.
 */
interface LiveOptions {
  loginUrl: string;
  clientId: string;
  username: string;
  privateKeyPem: string;
  apiVersion?: string;
}

interface SoqlRecord {
  Id: string;
  Name: string;
  StageName: string;
  Amount: number | null;
  CloseDate: string | null;
  Owner: { Name: string } | null;
  Account: { Name: string } | null;
  LastModifiedDate: string | null;
  NextStep: string | null;
  Description: string | null;
}

const TOKEN_TTL_MS = 15 * 60 * 1000;

export class LiveSalesforce implements SalesforceClient {
  private token: { accessToken: string; instanceUrl: string; at: number } | null =
    null;
  private readonly apiVersion: string;

  constructor(private readonly opts: LiveOptions) {
    this.apiVersion = opts.apiVersion ?? "v61.0";
  }

  private async authenticate(): Promise<{ accessToken: string; instanceUrl: string }> {
    if (this.token && Date.now() - this.token.at < TOKEN_TTL_MS) {
      return this.token;
    }
    const key = await importPKCS8(this.opts.privateKeyPem, "RS256");
    const assertion = await new SignJWT({})
      .setProtectedHeader({ alg: "RS256" })
      .setIssuer(this.opts.clientId)
      .setSubject(this.opts.username)
      .setAudience(this.opts.loginUrl)
      .setExpirationTime("3m")
      .sign(key);

    const res = await fetch(`${this.opts.loginUrl}/services/oauth2/token`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion,
      }),
    });
    if (!res.ok) {
      throw new Error(`Salesforce token exchange failed: ${res.status}`);
    }
    const body = (await res.json()) as {
      access_token: string;
      instance_url: string;
    };
    this.token = {
      accessToken: body.access_token,
      instanceUrl: body.instance_url,
      at: Date.now(),
    };
    return this.token;
  }

  private async query(soql: string): Promise<SoqlRecord[]> {
    const run = async (retryOnAuth: boolean): Promise<SoqlRecord[]> => {
      const { accessToken, instanceUrl } = await this.authenticate();
      const url = `${instanceUrl}/services/data/${this.apiVersion}/query?q=${encodeURIComponent(soql)}`;
      const res = await fetch(url, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      if (res.status === 401 && retryOnAuth) {
        this.token = null;
        return run(false);
      }
      if (!res.ok) {
        throw new Error(`Salesforce query failed: ${res.status}`);
      }
      const body = (await res.json()) as { records: SoqlRecord[] };
      return body.records;
    };
    return run(true);
  }

  private static toOpportunity(r: SoqlRecord): Opportunity {
    return {
      id: r.Id,
      name: r.Name,
      stage: r.StageName,
      amount: r.Amount,
      closeDate: r.CloseDate,
      ownerName: r.Owner?.Name ?? null,
      accountName: r.Account?.Name ?? null,
      lastModified: r.LastModifiedDate,
      nextStep: r.NextStep,
      description: r.Description,
    };
  }

  async findOpportunities(query: string, limit: number): Promise<Opportunity[]> {
    const records = await this.query(findOpportunitiesSoql(query, limit));
    return records.map(LiveSalesforce.toOpportunity);
  }

  async getOpportunity(id: string): Promise<Opportunity | null> {
    const records = await this.query(getOpportunitySoql(id));
    return records.length ? LiveSalesforce.toOpportunity(records[0]) : null;
  }
}
