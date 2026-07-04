import { Request, Response } from "express";
import { GeminiService, GeminiPlanResponse } from "../services/geminiService";

interface GeneratePlanRequest {
  budget: string;
  people: number;
  cookingTime: string;
  diet: string;
  cuisine: string;
  ingredients: string;
  notes: string;
}

function validateGeneratePlanBody(body: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!body || typeof body !== "object") {
    errors.push("Request body must be a JSON object.");
    return { valid: false, errors };
  }

  if (typeof body.budget !== "string" || body.budget.trim().length === 0) {
    errors.push("budget is required and must be a non-empty string.");
  }

  if (typeof body.people !== "number" || Number.isNaN(body.people) || body.people < 1) {
    errors.push("people is required and must be a number greater than 0.");
  }

  if (typeof body.cookingTime !== "string" || body.cookingTime.trim().length === 0) {
    errors.push("cookingTime is required and must be a non-empty string.");
  }

  if (typeof body.diet !== "string" || body.diet.trim().length === 0) {
    errors.push("diet is required and must be a non-empty string.");
  }

  if (typeof body.cuisine !== "string" || body.cuisine.trim().length === 0) {
    errors.push("cuisine is required and must be a non-empty string.");
  }

  if (typeof body.ingredients !== "string" || body.ingredients.trim().length === 0) {
    errors.push("ingredients is required and must be a non-empty string.");
  }

  if (typeof body.notes !== "string") {
    errors.push("notes is required and must be a string.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

function buildGeminiPrompt(input: GeneratePlanRequest): string {
  return `You are an AI cooking assistant. Produce ONLY valid JSON in the exact shape below, with no extra text.

{
  "breakfast": "",
  "lunch": "",
  "dinner": "",
  "groceryList": [],
  "substitutions": [],
  "estimatedCost": 0,
  "withinBudget": true
}

Use the user details to tailor the plan:
- Budget: ${input.budget}
- People: ${input.people}
- Cooking time: ${input.cookingTime}
- Diet preference: ${input.diet}
- Cuisine preference: ${input.cuisine}
- Available ingredients: ${input.ingredients}
- Notes: ${input.notes}

Return the grocery list items as an array of strings and substitution suggestions as an array of strings.`;
}

const generatePlan = async (req: Request, res: Response) => {
  const validation = validateGeneratePlanBody(req.body);

  if (!validation.valid) {
    return res.status(400).json({ errors: validation.errors });
  }

  const input = req.body as GeneratePlanRequest;
  const prompt = buildGeminiPrompt(input);

  try {
    const plan: GeminiPlanResponse = await GeminiService.generatePlan(prompt);
    return res.json(plan);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error generating plan.";
    return res.status(500).json({ error: message });
  }
};

export default { generatePlan };
