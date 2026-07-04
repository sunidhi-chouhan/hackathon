import type { EventsRequest } from "@culturecompass/shared";

export function buildEventsPrompt(input: EventsRequest): string {
  const dateRange =
    input.startDate && input.endDate
      ? `${input.startDate} to ${input.endDate}`
      : "upcoming months";

  return `You are CultureCompass AI. Suggest local events and festivals in ${input.destination} as ONLY valid JSON:

{
  "events": [
    {
      "name": "Event name",
      "date": "When",
      "description": "Description",
      "location": "Location"
    }
  ]
}

Date range: ${dateRange}. Return 4 events. ONLY JSON.`;
}
