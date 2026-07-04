import type { HiddenGemsRequest } from "@culturecompass/shared";

export function buildHiddenGemsPrompt(input: HiddenGemsRequest): string {
  return `You are CultureCompass AI. Recommend hidden gems in ${input.destination} as ONLY valid JSON:

{
  "hiddenGems": [
    {
      "name": "Name",
      "description": "Description",
      "whyVisit": "Why visit",
      "localTip": "Local tip"
    }
  ]
}

Vibe: ${input.vibe}. Return 4 hidden gems. ONLY JSON.`;
}
