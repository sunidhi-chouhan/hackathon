import { PredictionServiceClient } from "@google-cloud/aiplatform";
import { GoogleAuth } from "google-auth-library";

export interface GeminiPlanResponse {
  breakfast: string;
  lunch: string;
  dinner: string;
  groceryList: string[];
  substitutions: string[];
  estimatedCost: number;
  withinBudget: boolean;
}

function extractJsonFromText(text: string) {
  const cleaned = text.trim().replace(/```json|```/gi, "");
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    return null;
  }

  return cleaned.slice(firstBrace, lastBrace + 1);
}

function normalizeGeminiResponse(raw: unknown): GeminiPlanResponse | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const response = raw as Record<string, unknown>;

  if (
    typeof response.breakfast !== "string" ||
    typeof response.lunch !== "string" ||
    typeof response.dinner !== "string" ||
    !Array.isArray(response.groceryList) ||
    !Array.isArray(response.substitutions) ||
    typeof response.estimatedCost !== "number" ||
    typeof response.withinBudget !== "boolean"
  ) {
    return null;
  }

  return {
    breakfast: response.breakfast,
    lunch: response.lunch,
    dinner: response.dinner,
    groceryList: response.groceryList.map(String),
    substitutions: response.substitutions.map(String),
    estimatedCost: response.estimatedCost,
    withinBudget: response.withinBudget,
  };
}

function getGeminiEndpoint() {
  const projectId = process.env.GEMINI_PROJECT_ID;
  const location = process.env.GEMINI_LOCATION;
  const endpointId = process.env.GEMINI_ENDPOINT_ID;

  if (!projectId || !location || !endpointId) {
    throw new Error("GEMINI_PROJECT_ID, GEMINI_LOCATION, and GEMINI_ENDPOINT_ID are required.");
  }

  return `projects/${projectId}/locations/${location}/endpoints/${endpointId}`;
}

async function createClient() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY in environment.");
  }

  const auth = new GoogleAuth({ apiKey: process.env.GEMINI_API_KEY });
  return new PredictionServiceClient({ auth });
}

export const GeminiService = {
  async generatePlan(prompt: string): Promise<GeminiPlanResponse> {
    const client = await createClient();
    const endpoint = getGeminiEndpoint();

    const [response] = await client.predict({
      endpoint,
      instances: [{ content: prompt }],
      parameters: { temperature: 0 },
    });

    const rawOutput = Array.isArray(response.predictions)
      ? response.predictions[0]
      : response.predictions || "";

    const rawText = typeof rawOutput === "string"
      ? rawOutput
      : rawOutput && typeof rawOutput === "object" && "content" in rawOutput
      ? String((rawOutput as any).content)
      : JSON.stringify(rawOutput);

    const jsonText = extractJsonFromText(rawText) || rawText;
    let parsed: unknown;

    try {
      parsed = JSON.parse(jsonText);
    } catch (error) {
      throw new Error("Gemini returned invalid JSON.");
    }

    const normalized = normalizeGeminiResponse(parsed);
    if (!normalized) {
      throw new Error("Gemini response does not match the expected schema.");
    }

    return normalized;
  },
};
