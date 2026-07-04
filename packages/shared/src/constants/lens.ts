export const LENS_MODES = ["tourist", "local"] as const;
export type LensMode = (typeof LENS_MODES)[number];

export const DEFAULT_LENS_MODE: LensMode = "tourist";

export const LOCAL_LENS_LABEL = "Local Lens";

export const LENS_MODE_LABELS: Record<LensMode, string> = {
  tourist: "Tourist View",
  local: "Local View",
};

export const LENS_MODE_DESCRIPTIONS: Record<LensMode, string> = {
  tourist: "Iconic landmarks and famous cultural highlights every visitor should see.",
  local: "Recommendations generated from the perspective of a local resident.",
};

export const LOCAL_LENS_CATEGORIES = [
  "Hidden cafes",
  "Markets",
  "Street food",
  "Neighborhood temples",
  "Artisan workshops",
  "Community festivals",
] as const;
