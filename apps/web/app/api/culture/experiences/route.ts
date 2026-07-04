import { NextRequest, NextResponse } from "next/server";
import { generateExperiences } from "@culturecompass/ai";
import { experiencesRequestSchema } from "@culturecompass/shared";
import { handleRouteError, parseJsonBody } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    const input = await parseJsonBody(request, experiencesRequestSchema);
    const result = await generateExperiences(input);
    return NextResponse.json(result);
  } catch (error) {
    return handleRouteError(error);
  }
}
