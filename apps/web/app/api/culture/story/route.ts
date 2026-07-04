import { NextRequest, NextResponse } from "next/server";
import { generateStory } from "@culturecompass/ai";
import { storyRequestSchema } from "@culturecompass/shared";
import { handleRouteError, parseJsonBody } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    const input = await parseJsonBody(request, storyRequestSchema);
    const result = await generateStory(input);
    return NextResponse.json(result);
  } catch (error) {
    return handleRouteError(error);
  }
}
