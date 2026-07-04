import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { filterDestinationSuggestions } from "./location-utils";

describe("filterDestinationSuggestions", () => {
  it("returns first six destinations when query is empty", () => {
    const results = filterDestinationSuggestions("");
    assert.equal(results.length, 6);
  });

  it("filters by case-insensitive match", () => {
    const results = filterDestinationSuggestions("tokyo");
    assert.ok(results.every((d) => d.toLowerCase().includes("tokyo")));
  });

  it("returns empty array when no match", () => {
    const results = filterDestinationSuggestions("zzzznotacity");
    assert.equal(results.length, 0);
  });

  it("caps results at six", () => {
    const results = filterDestinationSuggestions("a");
    assert.ok(results.length <= 6);
  });
});
