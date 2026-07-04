import type { CompassPlanRequest } from "@culturecompass/shared";

export function buildCompassPlanPrompt(input: CompassPlanRequest): string {
  const dateRange =
    input.startDate && input.endDate
      ? `${input.startDate} to ${input.endDate}`
      : "flexible dates";

  return `You are CultureCompass AI, a GenAI travel assistant specializing in destination discovery and authentic cultural experiences.

Generate a comprehensive cultural travel plan as ONLY valid JSON matching this exact shape:

{
  "destinations": [
    {
      "id": "kebab-case-id",
      "name": "City or region name",
      "country": "Country",
      "tagline": "Short catchy tagline",
      "rationale": "Why this fits the traveler",
      "bestTimeToVisit": "Season or months",
      "estimatedBudget": "Budget estimate for the trip"
    }
  ],
  "featuredDestination": { /* same shape as destinations[0] — pick the top recommendation */ },
  "attractions": [
    {
      "name": "Attraction name",
      "description": "What makes it special",
      "category": "e.g. museum, landmark, market",
      "tip": "Insider tip for visitors"
    }
  ],
  "hiddenGems": [
    {
      "name": "Hidden gem name",
      "description": "What it is",
      "whyVisit": "Why travelers should go",
      "localTip": "How locals experience it"
    }
  ],
  "heritage": {
    "highlights": ["heritage highlight 1", "heritage highlight 2"],
    "traditions": ["local tradition 1", "local tradition 2"],
    "etiquetteTips": ["etiquette tip 1", "etiquette tip 2"],
    "culturalSignificance": "Paragraph on cultural importance"
  },
  "events": [
    {
      "name": "Event or festival name",
      "date": "When it happens",
      "description": "What the event is about",
      "location": "Where in the destination"
    }
  ],
  "experiences": [
    {
      "name": "Experience name",
      "description": "What the traveler will do",
      "type": "e.g. workshop, food tour, ritual",
      "duration": "Estimated time",
      "authenticityNote": "Why this is authentically local"
    }
  ],
  "storySnippet": {
    "title": "Evocative story title about the featured destination",
    "preview": "2-3 sentence immersive story preview that draws the reader in",
    "tone": "immersive"
  }
}

Traveler profile:
- Interests: ${input.interests.join(", ")}
- Budget: ${input.budget}
- Duration: ${input.duration}
- Travel style: ${input.travelStyle}
- Dates: ${dateRange}
- Notes: ${input.notes || "None"}

Requirements:
- Return 3 destinations ranked by fit; featuredDestination must be the best match
- All content for featuredDestination: 4 attractions, 3 hidden gems, 3 events, 3 experiences
- Heritage section focused on featuredDestination
- Use realistic, culturally respectful content
- IDs must be lowercase kebab-case derived from destination name
- Return ONLY the JSON object, no markdown or extra text`;
}
