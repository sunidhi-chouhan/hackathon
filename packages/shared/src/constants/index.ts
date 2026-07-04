export const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash";

export const TRAVEL_STYLES = [
  "adventurous",
  "relaxed",
  "cultural",
  "foodie",
  "family",
  "solo",
  "luxury",
  "budget",
] as const;

export const INTEREST_TAGS = [
  "history",
  "art",
  "music",
  "food",
  "nature",
  "architecture",
  "festivals",
  "local-life",
  "spirituality",
  "nightlife",
] as const;

export const STORY_TONES = ["immersive", "historical", "poetic", "family-friendly"] as const;

export const ERROR_CODES = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  AI_ERROR: "AI_ERROR",
  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
