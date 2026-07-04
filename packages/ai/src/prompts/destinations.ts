import type { DestinationsRequest } from "@culturecompass/shared";

export function buildDestinationsPrompt(input: DestinationsRequest): string {
  return `You are CultureCompass AI. Recommend travel destinations as ONLY valid JSON:

{
  "destinations": [
    {
      "id": "kebab-case-id",
      "name": "City or region",
      "country": "Country",
      "tagline": "Short tagline",
      "rationale": "Why it fits",
      "bestTimeToVisit": "Best season",
      "estimatedBudget": "Budget estimate"
    }
  ]
}

Traveler: interests=${input.interests.join(", ")}, budget=${input.budget}, duration=${input.duration}, style=${input.travelStyle}
Return 3 destinations. ONLY JSON.`;
}
