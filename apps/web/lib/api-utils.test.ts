import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ZodError } from "zod";
import { AiGenerationError } from "@culturecompass/ai";
import { ERROR_CODES } from "@culturecompass/shared";
import { handleRouteError } from "./api-utils";

describe("handleRouteError", () => {
  it("returns 400 for Zod validation errors", async () => {
    const error = new ZodError([
      { code: "custom", path: ["budget"], message: "Budget is required" },
    ]);
    const response = handleRouteError(error);
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.equal(body.code, ERROR_CODES.VALIDATION_ERROR);
    assert.match(body.error, /Budget is required/);
  });

  it("returns 400 for malformed JSON", async () => {
    const response = handleRouteError(new SyntaxError("Unexpected token"));
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.equal(body.code, ERROR_CODES.VALIDATION_ERROR);
  });

  it("returns 502 for AI generation errors", async () => {
    const response = handleRouteError(
      new AiGenerationError("AI returned an unexpected format. Please try again."),
    );
    const body = await response.json();

    assert.equal(response.status, 502);
    assert.equal(body.code, ERROR_CODES.AI_ERROR);
  });

  it("sanitizes internal Gemini key errors", async () => {
    const response = handleRouteError(new Error("Missing GEMINI_API_KEY in environment."));
    const body = await response.json();

    assert.equal(response.status, 502);
    assert.doesNotMatch(body.error, /GEMINI_API_KEY/);
  });
});
