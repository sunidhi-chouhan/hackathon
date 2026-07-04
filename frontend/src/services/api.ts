export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

export interface GeneratePlanRequest {
  budget: string;
  people: number;
  cookingTime: string;
  diet: string;
  cuisine: string;
  ingredients: string;
  notes: string;
}

export interface GeneratePlanResponse {
  breakfast: string;
  lunch: string;
  dinner: string;
  groceryList: string[];
  substitutions: string[];
  estimatedCost: number;
  withinBudget: boolean;
}

export async function generatePlan(payload: GeneratePlanRequest): Promise<GeneratePlanResponse> {
  const response = await fetch(`${apiBaseUrl}/generate-plan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const message = errorBody?.error || errorBody?.errors?.join(", ") || "Unable to generate plan.";
    throw new Error(message);
  }

  return response.json();
}

export async function fetchPlaceholder() {
  const response = await fetch(`${apiBaseUrl}/placeholder`);
  return response.json();
}
