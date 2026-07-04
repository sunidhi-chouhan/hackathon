import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildCompassPlanPrompt } from "./compassPlan";

const baseInput = {
  interests: ["history", "food"],
  budget: "$2000",
  duration: "5 days",
  travelStyle: "cultural",
  notes: "",
};

describe("buildCompassPlanPrompt", () => {
  it("includes tourist lens instructions by default", () => {
    const prompt = buildCompassPlanPrompt(baseInput);
    assert.match(prompt, /TOURIST VIEW/i);
    assert.match(prompt, /famous landmarks/i);
  });

  it("includes local lens instructions when mode is local", () => {
    const prompt = buildCompassPlanPrompt({ ...baseInput, lensMode: "local" });
    assert.match(prompt, /LOCAL VIEW/i);
    assert.match(prompt, /street food/i);
    assert.match(prompt, /local resident/i);
  });

  it("requests immersive story narrative for Story Mode", () => {
    const prompt = buildCompassPlanPrompt(baseInput);
    assert.match(prompt, /storySnippet\.narrative/i);
    assert.match(prompt, /You arrive in Jaipur/i);
  });

  it("wraps user destination in XML delimiters", () => {
    const prompt = buildCompassPlanPrompt({ ...baseInput, destination: "Kyoto" });
    assert.match(prompt, /<destination>/);
    assert.match(prompt, /Kyoto/);
  });

  it("instructs JSON-only output", () => {
    const prompt = buildCompassPlanPrompt(baseInput);
    assert.match(prompt, /ONLY valid JSON/i);
  });
});
