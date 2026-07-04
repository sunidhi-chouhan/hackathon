import { NextRequest, NextResponse } from "next/server";
import { generateAttractions } from "@culturecompass/ai";
import { attractionsRequestSchema } from "@culturecompass/shared";
import { handleRouteError, parseJsonBody } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    const input = await parseJsonBody(request, attractionsRequestSchema);
    const result = await generateAttractions(input);
    return NextResponse.json(result);
  } catch (error) {
    return handleRouteError(error);
  }
}
