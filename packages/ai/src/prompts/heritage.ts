import type { HeritageRequest } from "@culturecompass/shared";

export function buildHeritagePrompt(input: HeritageRequest): string {
  return `You are CultureCompass AI. Describe cultural heritage of ${input.destination} as ONLY valid JSON:

{
  "highlights": ["highlight 1", "highlight 2", "highlight 3"],
  "traditions": ["tradition 1", "tradition 2", "tradition 3"],
  "etiquetteTips": ["tip 1", "tip 2", "tip 3"],
  "culturalSignificance": "Paragraph on cultural importance"
}

ONLY JSON.`;
}
