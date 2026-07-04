import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildDashboardCards, resolveDashboardMeta } from "./dashboard-helpers";
import type { CompassPlanResponse } from "@culturecompass/shared";

const mockPlan: CompassPlanResponse = {
  destinations: [
    {
      id: "kyoto",
      name: "Kyoto",
      country: "Japan",
      tagline: "Ancient capital",
      rationale: "Perfect for culture lovers",
      bestTimeToVisit: "Spring",
      estimatedBudget: "$1,500",
    },
  ],
  featuredDestination: {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    tagline: "Ancient capital",
    rationale: "Perfect for culture lovers",
    bestTimeToVisit: "Spring",
    estimatedBudget: "$1,500",
  },
  attractions: [
    { name: "Nishiki Market", description: "Food market", category: "food market", tip: "Go hungry" },
  ],
  hiddenGems: [
    {
      name: "Secret Garden",
      description: "Quiet temple",
      whyVisit: "Peaceful",
      localTip: "Visit at dawn",
    },
  ],
  heritage: {
    highlights: ["Temples", "Gardens"],
    traditions: ["Tea ceremony"],
    etiquetteTips: ["Remove shoes indoors"],
    culturalSignificance: "Former imperial capital",
  },
  events: [{ name: "Gion Festival", date: "July", description: "Parade", location: "Gion" }],
  experiences: [{ name: "Tea workshop", description: "Learn tea", type: "workshop", duration: "2h", authenticityNote: "Local masters" }],
  storySnippet: {
    title: "The Lantern Path",
    preview: "Long ago in Kyoto...",
    narrative: "You arrive in Kyoto just as lanterns begin to glow along the canal.",
    tone: "immersive",
  },
};

describe("resolveDashboardMeta", () => {
  it("uses AI dashboard when present", () => {
    const meta = resolveDashboardMeta({
      ...mockPlan,
      dashboard: {
        weather: "Mild spring · 18°C",
        culturalRating: 9.5,
        aiMatchScore: 96,
        foodHighlights: ["Matcha", "Yudofu"],
        localTips: ["Tip A"],
        shoppingGuide: ["Nishiki"],
      },
    });
    assert.equal(meta.weather, "Mild spring · 18°C");
    assert.equal(meta.aiMatchScore, 96);
  });

  it("derives fallback dashboard from plan data", () => {
    const meta = resolveDashboardMeta(mockPlan);
    assert.ok(meta.foodHighlights.length > 0);
    assert.ok(meta.aiMatchScore >= 50);
  });
});

describe("buildDashboardCards", () => {
  it("returns all nine dashboard cards", () => {
    const cards = buildDashboardCards(mockPlan);
    assert.equal(cards.length, 9);
    assert.equal(cards.find((c) => c.id === "story")?.title, "Story");
  });
});
