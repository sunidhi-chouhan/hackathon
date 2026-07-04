import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ERROR_CODES } from "@culturecompass/shared";
import {
  ApiRequestError,
  getDisplayError,
  resolveApiError,
} from "./errors";

describe("getDisplayError", () => {
  it("returns ApiRequestError message", () => {
    const err = new ApiRequestError("Custom API error", ERROR_CODES.AI_ERROR, 502);
    assert.equal(getDisplayError(err), "Custom API error");
  });

  it("handles network TypeError", () => {
    const err = new TypeError("Failed to fetch");
    assert.match(getDisplayError(err), /connection/i);
  });

  it("falls back for unknown errors", () => {
    assert.match(getDisplayError(null), /something went wrong/i);
  });
});

describe("resolveApiError", () => {
  it("uses server message when provided", () => {
    const err = resolveApiError(
      { error: "Budget is required", code: ERROR_CODES.VALIDATION_ERROR },
      400,
    );
    assert.equal(err.message, "Budget is required");
    assert.equal(err.code, ERROR_CODES.VALIDATION_ERROR);
    assert.equal(err.status, 400);
  });

  it("uses friendly fallback when body is empty", () => {
    const err = resolveApiError(null, 500);
    assert.equal(err.code, ERROR_CODES.INTERNAL_ERROR);
    assert.match(err.message, /something went wrong/i);
  });
});
