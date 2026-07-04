import type { ExperiencesRequest } from "@culturecompass/shared";

export function buildExperiencesPrompt(input: ExperiencesRequest): string {
  return `You are CultureCompass AI. Suggest authentic cultural experiences in ${input.destination} as ONLY valid JSON:

{
  "experiences": [
    {
      "name": "Experience name",
      "description": "Description",
      "type": "Type",
      "duration": "Duration",
      "authenticityNote": "Why authentically local"
    }
  ]
}

Preferences: ${input.preferences.length > 0 ? input.preferences.join(", ") : "general cultural immersion"}.
Return 4 experiences. ONLY JSON.`;
}
