import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readPlannerSession } from "./planner-session-storage";
import type { CompassPlanResponse, CompassPlanRequest } from "@culturecompass/shared";

const mockPlan = { id: "plan" } as unknown as CompassPlanResponse;
const mockRequest = { lensMode: "local" } as CompassPlanRequest;

function createStorage(entries: Record<string, string | null>): Pick<Storage, "getItem"> {
  return {
    getItem: (key: string) => entries[key] ?? null,
  };
}

describe("readPlannerSession", () => {
  it("returns null when plan is missing", () => {
    const result = readPlannerSession(createStorage({ compassRequest: "{}" }));
    assert.equal(result, null);
  });

  it("returns null when request is missing", () => {
    const result = readPlannerSession(createStorage({ compassPlan: "{}" }));
    assert.equal(result, null);
  });

  it("returns null for invalid JSON", () => {
    const result = readPlannerSession(
      createStorage({ compassPlan: "not-json", compassRequest: "{}" }),
    );
    assert.equal(result, null);
  });

  it("restores plan, request, and lens mode", () => {
    const result = readPlannerSession(
      createStorage({
        compassPlan: JSON.stringify(mockPlan),
        compassRequest: JSON.stringify(mockRequest),
      }),
    );
    assert.deepEqual(result?.plan, mockPlan);
    assert.deepEqual(result?.request, mockRequest);
    assert.equal(result?.lensMode, "local");
  });

  it("defaults lens mode to tourist", () => {
    const result = readPlannerSession(
      createStorage({
        compassPlan: JSON.stringify(mockPlan),
        compassRequest: JSON.stringify({}),
      }),
    );
    assert.equal(result?.lensMode, "tourist");
  });
});
