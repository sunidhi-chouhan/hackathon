import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  tokenizeNarrative,
  charIndexToWordIndex,
  getStoryNarrative,
} from "./story-speech";

describe("story speech helpers", () => {
  it("tokenizes narrative into words with start indices", () => {
    const tokens = tokenizeNarrative("You arrive in Jaipur.");
    assert.equal(tokens.length, 4);
    assert.equal(tokens[0].word, "You");
    assert.equal(tokens[0].start, 0);
    assert.equal(tokens[2].word, "in");
    assert.equal(tokens[2].start, 11);
  });

  it("maps char index to word index", () => {
    const text = "Hello beautiful world";
    const tokens = tokenizeNarrative(text);
    assert.equal(charIndexToWordIndex(tokens, 0), 0);
    assert.equal(charIndexToWordIndex(tokens, 6), 1);
    assert.equal(charIndexToWordIndex(tokens, 16), 2);
  });

  it("prefers narrative over preview", () => {
    const narrative = getStoryNarrative({
      title: "T",
      preview: "Short",
      narrative: "Long immersive story",
      tone: "immersive",
    });
    assert.equal(narrative, "Long immersive story");
  });

  it("falls back to preview when narrative is empty", () => {
    const narrative = getStoryNarrative({
      title: "T",
      preview: "Fallback preview",
      narrative: "   ",
      tone: "immersive",
    });
    assert.equal(narrative, "Fallback preview");
  });
});
