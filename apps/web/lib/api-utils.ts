import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { ERROR_CODES, type ErrorCode } from "@culturecompass/shared";

export function jsonError(error: string, code: ErrorCode, status: number) {
  return NextResponse.json({ error, code }, { status });
}

export function handleRouteError(error: unknown) {
  if (error instanceof ZodError) {
    const message = error.errors.map((e) => e.message).join(", ");
    return jsonError(message, ERROR_CODES.VALIDATION_ERROR, 400);
  }

  if (error instanceof Error) {
    if (
      error.message.includes("GEMINI") ||
      error.message.includes("Gemini") ||
      error.message.includes("API key")
    ) {
      return jsonError(error.message, ERROR_CODES.AI_ERROR, 502);
    }
    return jsonError(error.message, ERROR_CODES.INTERNAL_ERROR, 500);
  }

  return jsonError("An unexpected error occurred.", ERROR_CODES.INTERNAL_ERROR, 500);
}

export async function parseJsonBody<T>(
  request: NextRequest,
  schema: { parse: (data: unknown) => T },
): Promise<T> {
  const body = await request.json();
  return schema.parse(body);
}
