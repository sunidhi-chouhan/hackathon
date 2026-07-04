import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_LENS_MODE,
  LENS_MODE_LABELS,
  LENS_MODE_DESCRIPTIONS,
  LOCAL_LENS_CATEGORIES,
  LOCAL_LENS_LABEL,
} from "./lens";

describe("lens constants", () => {
  it("defines tourist as default lens mode", () => {
    assert.equal(DEFAULT_LENS_MODE, "tourist");
  });

  it("provides labels for both lens modes", () => {
    assert.equal(LENS_MODE_LABELS.tourist, "Tourist View");
    assert.equal(LENS_MODE_LABELS.local, "Local View");
  });

  it("includes local resident explanation for local mode", () => {
    assert.match(LENS_MODE_DESCRIPTIONS.local, /local resident/i);
  });

  it("lists all local lens categories", () => {
    assert.equal(LOCAL_LENS_CATEGORIES.length, 6);
    assert.ok(LOCAL_LENS_CATEGORIES.includes("Hidden cafes"));
    assert.ok(LOCAL_LENS_CATEGORIES.includes("Community festivals"));
  });

  it("exposes Local Lens feature label", () => {
    assert.equal(LOCAL_LENS_LABEL, "Local Lens");
  });
});
