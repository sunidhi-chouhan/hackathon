import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ZodError } from "zod";
import { NextRequest } from "next/server";
import { AiGenerationError } from "@culturecompass/ai";
import { ERROR_CODES, compassPlanRequestSchema } from "@culturecompass/shared";
import { handleRouteError, parseJsonBody, jsonError } from "./api-utils";

describe("jsonError", () => {
  it("returns structured error response", async () => {
    const response = jsonError("Bad input", ERROR_CODES.VALIDATION_ERROR, 400);
    const body = await response.json();
    assert.equal(body.error, "Bad input");
    assert.equal(body.code, ERROR_CODES.VALIDATION_ERROR);
    assert.equal(response.status, 400);
  });
});

describe("parseJsonBody", () => {
  it("parses valid JSON against schema", async () => {
    const request = new NextRequest("http://localhost/api/compass/plan", {
      method: "POST",
      body: JSON.stringify({
        interests: ["history"],
        budget: "$1000",
        duration: "3 days",
        travelStyle: "cultural",
      }),
    });

    const result = await parseJsonBody(request, compassPlanRequestSchema);
    assert.deepEqual(result.interests, ["history"]);
    assert.equal(result.budget, "$1000");
  });

  it("throws SyntaxError for invalid JSON", async () => {
    const request = new NextRequest("http://localhost/api/compass/plan", {
      method: "POST",
      body: "{ invalid json",
    });

    await assert.rejects(() => parseJsonBody(request, compassPlanRequestSchema), SyntaxError);
  });

  it("throws ZodError for schema violations", async () => {
    const request = new NextRequest("http://localhost/api/compass/plan", {
      method: "POST",
      body: JSON.stringify({ interests: [] }),
    });

    await assert.rejects(() => parseJsonBody(request, compassPlanRequestSchema), ZodError);
  });
});

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
