import { NextRequest, NextResponse } from "next/server";
import { generateDestinations } from "@culturecompass/ai";
import { destinationsRequestSchema } from "@culturecompass/shared";
import { handleRouteError, parseJsonBody } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    const input = await parseJsonBody(request, destinationsRequestSchema);
    const result = await generateDestinations(input);
    return NextResponse.json(result);
  } catch (error) {
    return handleRouteError(error);
  }
}
