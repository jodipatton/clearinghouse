import { describe, expect, it } from "vitest";
import {
  assertSalesforceId,
  escapeSoqlString,
  findOpportunitiesSoql,
  likeTerm,
} from "../src/salesforce/soql.js";

describe("soql guards", () => {
  it("escapes quotes and backslashes", () => {
    expect(escapeSoqlString("O'Brien \\ Co")).toBe("O\\'Brien \\\\ Co");
  });

  it("neutralizes a quote-breakout attempt in a LIKE term", () => {
    const soql = findOpportunitiesSoql("x' OR Name != '", 10);
    // The quote survives only in escaped form — never as a raw delimiter.
    expect(soql).not.toMatch(/[^\\]' OR /);
    expect(soql).toContain("\\'");
  });

  it("strips SOQL wildcards from search terms", () => {
    expect(likeTerm("a%b_c")).toBe("a b c");
  });

  it("rejects terms that are too short after cleaning", () => {
    expect(() => likeTerm("%_")).toThrow(RangeError);
  });

  it("accepts only 15/18-char alphanumeric Salesforce Ids", () => {
    expect(assertSalesforceId("006Ru00000AbCdEfGh")).toBe("006Ru00000AbCdEfGh");
    expect(() => assertSalesforceId("006' OR '1'='1")).toThrow(RangeError);
    expect(() => assertSalesforceId("short")).toThrow(RangeError);
  });

  it("caps LIMIT regardless of what the caller asks for", () => {
    expect(findOpportunitiesSoql("mmm", 5000)).toContain("LIMIT 10");
  });
});
