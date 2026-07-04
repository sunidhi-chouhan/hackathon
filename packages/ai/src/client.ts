import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ModelPreset } from "@culturecompass/shared";
import { resolveModelName } from "./resolveModel";

let client: GoogleGenerativeAI | null = null;

export function getGeminiClient(): GoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY in environment.");
  }

  if (!client) {
    client = new GoogleGenerativeAI(apiKey);
  }

  return client;
}

export function getModelName(modelPreset?: ModelPreset): string {
  return resolveModelName(modelPreset);
}

export async function generateJson<T>(
  prompt: string,
  parse: (raw: unknown) => T,
  options?: { modelPreset?: ModelPreset },
): Promise<T> {
  const genAI = getGeminiClient();
  const model = genAI.getGenerativeModel({
    model: resolveModelName(options?.modelPreset),
    generationConfig: {
      temperature: 0.7,
      responseMimeType: "application/json",
    },
  });

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const json = extractJson(text);
      return parse(json);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt === 0) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
  }

  throw lastError ?? new Error("Failed to generate content from Gemini.");
}

function extractJson(text: string): unknown {
  const cleaned = text.trim().replace(/```json|```/gi, "");
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("Gemini returned invalid JSON.");
  }

  const jsonText = cleaned.slice(firstBrace, lastBrace + 1);
  return JSON.parse(jsonText);
}
