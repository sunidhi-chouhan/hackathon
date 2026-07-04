import { NextRequest, NextResponse } from "next/server";
import { generateHeritage } from "@culturecompass/ai";
import { heritageRequestSchema } from "@culturecompass/shared";
import { handleRouteError, parseJsonBody } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    const input = await parseJsonBody(request, heritageRequestSchema);
    const result = await generateHeritage(input);
    return NextResponse.json(result);
  } catch (error) {
    return handleRouteError(error);
  }
}
