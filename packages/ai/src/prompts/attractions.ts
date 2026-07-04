import type { AttractionsRequest } from "@culturecompass/shared";

export function buildAttractionsPrompt(input: AttractionsRequest): string {
  return `You are CultureCompass AI. Recommend attractions for ${input.destination} as ONLY valid JSON:

{
  "attractions": [
    {
      "name": "Name",
      "description": "Description",
      "category": "Category",
      "tip": "Insider tip"
    }
  ]
}

Interests: ${input.interests.join(", ")}. Group size: ${input.groupSize}.
Return 5 attractions. ONLY JSON.`;
}
