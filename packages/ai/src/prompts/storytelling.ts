import type { StoryRequest } from "@culturecompass/shared";

export function buildStoryPrompt(input: StoryRequest): string {
  const context = [
    input.era ? `Era: ${input.era}` : null,
    input.topic ? `Topic: ${input.topic}` : null,
  ]
    .filter(Boolean)
    .join(". ");

  return `You are CultureCompass AI, a master storyteller. Write an immersive cultural story about ${input.placeName} as ONLY valid JSON:

{
  "title": "Evocative title",
  "sections": [
    {
      "heading": "Section heading",
      "content": "Rich narrative paragraph (3-5 sentences)"
    }
  ],
  "tone": "${input.tone}"
}

${context ? `${context}.` : ""}
Tone: ${input.tone}. Write 3-4 sections. ONLY JSON.`;
}
