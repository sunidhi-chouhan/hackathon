import { NextRequest, NextResponse } from "next/server";
import { generateCompassPlan } from "@culturecompass/ai";
import { compassPlanRequestSchema } from "@culturecompass/shared";
import { handleRouteError, parseJsonBody } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    const input = await parseJsonBody(request, compassPlanRequestSchema);
    const plan = await generateCompassPlan(input);
    return NextResponse.json(plan);
  } catch (error) {
    return handleRouteError(error);
  }
}
