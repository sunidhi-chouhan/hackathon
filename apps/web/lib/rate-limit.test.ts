import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { checkRateLimit, resetRateLimitStore } from "./rate-limit";

function makeRequest(): NextRequest {
  return new NextRequest("http://localhost/api/compass/plan", {
    method: "POST",
    headers: { "x-forwarded-for": "127.0.0.1" },
  });
}

describe("checkRateLimit", () => {
  beforeEach(() => {
    resetRateLimitStore();
  });

  it("allows requests under the limit", () => {
    assert.equal(checkRateLimit(makeRequest()), null);
  });

  it("blocks requests over the limit", () => {
    for (let i = 0; i < 15; i++) {
      checkRateLimit(makeRequest());
    }
    const blocked = checkRateLimit(makeRequest());
    assert.equal(blocked?.status, 429);
  });
});
