import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getLensSpots, getTouristSpots, getLocalSpots } from "./local-lens-helpers";
import type { CompassPlanResponse } from "@culturecompass/shared";

const basePlan: CompassPlanResponse = {
  destinations: [],
  featuredDestination: {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    tagline: "Ancient capital",
    rationale: "Culture",
    bestTimeToVisit: "Spring",
    estimatedBudget: "$1500",
  },
  attractions: [
    { name: "Kinkaku-ji", description: "Golden Pavilion", category: "landmark", tip: "Arrive early" },
  ],
  hiddenGems: [
    {
      name: "Hidden Cafe",
      description: "Alley coffee",
      whyVisit: "Locals only",
      localTip: "No menu in English",
    },
  ],
  heritage: {
    highlights: [],
    traditions: [],
    etiquetteTips: [],
    culturalSignificance: "",
  },
  events: [],
  experiences: [
    {
      name: "Pottery Workshop",
      description: "Hands-on clay",
      type: "artisan workshop",
      duration: "2h",
      authenticityNote: "Family-run studio",
    },
  ],
  storySnippet: { title: "T", preview: "P", narrative: "You arrive in Kyoto at dawn.", tone: "immersive" },
};

describe("local lens helpers", () => {
  it("returns attractions for tourist mode", () => {
    const spots = getTouristSpots(basePlan);
    assert.equal(spots[0].name, "Kinkaku-ji");
  });

  it("returns local spots for local mode", () => {
    const spots = getLocalSpots(basePlan);
    assert.ok(spots.some((s) => s.name === "Hidden Cafe"));
    assert.ok(spots.some((s) => s.name === "Pottery Workshop"));
  });

  it("getLensSpots switches by mode", () => {
    assert.equal(getLensSpots(basePlan, "tourist").length, 1);
    assert.ok(getLensSpots(basePlan, "local").length >= 2);
  });
});
