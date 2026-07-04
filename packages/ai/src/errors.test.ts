import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { AiGenerationError, toAiGenerationError } from "./errors";

describe("toAiGenerationError", () => {
  it("returns same instance for AiGenerationError", () => {
    const err = new AiGenerationError("Already wrapped");
    assert.equal(toAiGenerationError(err), err);
  });

  it("maps API key errors", () => {
    const err = toAiGenerationError(new Error("Invalid API key provided"));
    assert.equal(err.message, "AI service is not configured.");
  });

  it("maps rate limit errors", () => {
    const err = toAiGenerationError(new Error("429 Too Many Requests"));
    assert.match(err.message, /busy/i);
  });

  it("maps timeout errors", () => {
    const err = toAiGenerationError(new Error("Request timeout exceeded"));
    assert.match(err.message, /too long/i);
  });

  it("maps invalid JSON errors", () => {
    const err = toAiGenerationError(new Error("Gemini returned invalid JSON"));
    assert.match(err.message, /unexpected format/i);
  });

  it("provides generic fallback", () => {
    const err = toAiGenerationError(new Error("something random"));
    assert.match(err.message, /try again/i);
  });
});
