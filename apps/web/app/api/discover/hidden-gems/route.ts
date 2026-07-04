import { NextRequest, NextResponse } from "next/server";
import { generateHiddenGems } from "@culturecompass/ai";
import { hiddenGemsRequestSchema } from "@culturecompass/shared";
import { handleRouteError, parseJsonBody } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    const input = await parseJsonBody(request, hiddenGemsRequestSchema);
    const result = await generateHiddenGems(input);
    return NextResponse.json(result);
  } catch (error) {
    return handleRouteError(error);
  }
}
