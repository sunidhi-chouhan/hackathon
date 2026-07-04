import { SUGGESTED_DESTINATIONS } from "@/lib/constants";

const MAX_SUGGESTIONS = 6;

/** Filters destination suggestions by query (pure, testable). */
export function filterDestinationSuggestions(query: string): string[] {
  const trimmed = query.trim();

  if (!trimmed) {
    return SUGGESTED_DESTINATIONS.slice(0, MAX_SUGGESTIONS);
  }

  return SUGGESTED_DESTINATIONS.filter((destination) =>
    destination.toLowerCase().includes(trimmed.toLowerCase()),
  ).slice(0, MAX_SUGGESTIONS);
}
