import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { compassPlanRequestSchema, compassPlanResponseSchema } from "./index";

describe("compassPlanRequestSchema", () => {
  const validRequest = {
    interests: ["history", "food"],
    budget: "$2000",
    duration: "5 days",
    travelStyle: "cultural",
    notes: "",
  };

  it("accepts a valid request", () => {
    const result = compassPlanRequestSchema.safeParse(validRequest);
    assert.equal(result.success, true);
  });

  it("rejects empty interests", () => {
    const result = compassPlanRequestSchema.safeParse({
      ...validRequest,
      interests: [],
    });
    assert.equal(result.success, false);
  });

  it("rejects notes over 500 characters", () => {
    const result = compassPlanRequestSchema.safeParse({
      ...validRequest,
      notes: "a".repeat(501),
    });
    assert.equal(result.success, false);
  });

  it("rejects more than 10 interests", () => {
    const result = compassPlanRequestSchema.safeParse({
      ...validRequest,
      interests: Array.from({ length: 11 }, (_, i) => `tag-${i}`),
    });
    assert.equal(result.success, false);
  });
});

describe("compassPlanResponseSchema", () => {
  it("requires at least one destination", () => {
    const result = compassPlanResponseSchema.safeParse({
      destinations: [],
      featuredDestination: {
        id: "kyoto",
        name: "Kyoto",
        country: "Japan",
        tagline: "Ancient capital",
        rationale: "Rich heritage",
        bestTimeToVisit: "Spring",
        estimatedBudget: "$1500",
      },
      attractions: [],
      hiddenGems: [],
      heritage: {
        highlights: [],
        traditions: [],
        etiquetteTips: [],
        culturalSignificance: "Significant",
      },
      events: [],
      experiences: [],
      storySnippet: { title: "T", preview: "P", tone: "immersive" },
    });
    assert.equal(result.success, false);
  });
});
