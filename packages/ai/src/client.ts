import { GoogleGenerativeAI } from "@google/generative-ai";
import { ZodError } from "zod";
import type { ModelPreset } from "@culturecompass/shared";
import { AiGenerationError, toAiGenerationError } from "./errors";
import { resolveModelName } from "./resolveModel";

const GEMINI_TIMEOUT_MS = 55_000;

let client: GoogleGenerativeAI | null = null;

export function getGeminiClient(): GoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new AiGenerationError("AI service is not configured.");
  }

  if (!client) {
    client = new GoogleGenerativeAI(apiKey);
  }

  return client;
}

export function getModelName(modelPreset?: ModelPreset): string {
  return resolveModelName(modelPreset);
}

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(
        new AiGenerationError(
          "The request took too long. Try the Fast model or simplify your request.",
        ),
      );
    }, ms);
  });

  try {
    return await Promise.race([promise, timeout]);
  } finally {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
  }
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

  let lastError: AiGenerationError | null = null;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const result = await withTimeout(model.generateContent(prompt), GEMINI_TIMEOUT_MS);
      const text = result.response.text();
      const json = extractJson(text);

      try {
        return parse(json);
      } catch (parseError) {
        if (parseError instanceof ZodError) {
          throw new AiGenerationError("AI returned an unexpected format. Please try again.", {
            cause: parseError,
          });
        }
        throw parseError;
      }
    } catch (error) {
      lastError = toAiGenerationError(error);
      if (attempt === 0) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
  }

  throw lastError ?? new AiGenerationError("Unable to generate content right now. Please try again.");
}

function extractJson(text: string): unknown {
  const cleaned = text.trim().replace(/```json|```/gi, "");
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new AiGenerationError("AI returned invalid JSON. Please try again.");
  }

  const jsonText = cleaned.slice(firstBrace, lastBrace + 1);

  try {
    return JSON.parse(jsonText);
  } catch {
    throw new AiGenerationError("AI returned invalid JSON. Please try again.");
  }
}
