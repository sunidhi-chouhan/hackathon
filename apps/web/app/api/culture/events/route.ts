import { NextRequest, NextResponse } from "next/server";
import { generateEvents } from "@culturecompass/ai";
import { eventsRequestSchema } from "@culturecompass/shared";
import { handleRouteError, parseJsonBody } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    const input = await parseJsonBody(request, eventsRequestSchema);
    const result = await generateEvents(input);
    return NextResponse.json(result);
  } catch (error) {
    return handleRouteError(error);
  }
}
