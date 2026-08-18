import { describe, expect, it } from "vitest";
import { classifyPipelineCategory } from "../src/fictions/match.js";

describe("classifyPipelineCategory", () => {
  it("is 'renewal' for any Renewal-prefixed stage, regardless of account status", () => {
    expect(classifyPipelineCategory("Renewal Anticipated", "customer")).toBe("renewal");
    expect(classifyPipelineCategory("Renewal Contract Issued", "prospect")).toBe("renewal");
    expect(classifyPipelineCategory("Renewal Not Anticipated", null)).toBe("renewal");
  });

  it("is 'upsell' for a non-renewal stage on an existing customer account", () => {
    expect(classifyPipelineCategory("Negotiating", "customer")).toBe("upsell");
  });

  it("is 'new_sales' for a non-renewal stage on a prospect, or an account with no Planhat record", () => {
    expect(classifyPipelineCategory("Contracting", "prospect")).toBe("new_sales");
    expect(classifyPipelineCategory("Contracting", null)).toBe("new_sales");
    expect(classifyPipelineCategory("Contracting", "canceled")).toBe("new_sales");
  });
});
