import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { AiGenerationError } from "@culturecompass/ai";
import { ERROR_CODES, type ErrorCode } from "@culturecompass/shared";

export function jsonError(error: string, code: ErrorCode, status: number) {
  return NextResponse.json({ error, code }, { status });
}

function toPublicMessage(error: unknown, code: ErrorCode): string {
  if (error instanceof AiGenerationError) {
    return error.message;
  }

  if (error instanceof Error) {
    const lower = error.message.toLowerCase();

    if (code === ERROR_CODES.AI_ERROR) {
      if (lower.includes("api key") || lower.includes("gemini")) {
        return "Our AI service is temporarily unavailable. Please try again later.";
      }
      return "Unable to generate your cultural plan right now. Please try again.";
    }

    if (code === ERROR_CODES.VALIDATION_ERROR) {
      return error.message;
    }
  }

  return "Something went wrong on our end. Please try again.";
}

export function handleRouteError(error: unknown) {
  if (error instanceof SyntaxError) {
    return jsonError("Invalid request body. Please check your input and try again.", ERROR_CODES.VALIDATION_ERROR, 400);
  }

  if (error instanceof AiGenerationError) {
    return jsonError(error.message, ERROR_CODES.AI_ERROR, 502);
  }

  if (error instanceof ZodError) {
    const message = error.errors.map((e) => e.message).join(", ");
    return jsonError(message, ERROR_CODES.VALIDATION_ERROR, 400);
  }

  if (error instanceof Error) {
    const lower = error.message.toLowerCase();
    const isAiError =
      lower.includes("gemini") ||
      lower.includes("api key") ||
      lower.includes("generative") ||
      lower.includes("invalid json");

    if (isAiError) {
      return jsonError(
        toPublicMessage(error, ERROR_CODES.AI_ERROR),
        ERROR_CODES.AI_ERROR,
        502,
      );
    }

    return jsonError(
      toPublicMessage(error, ERROR_CODES.INTERNAL_ERROR),
      ERROR_CODES.INTERNAL_ERROR,
      500,
    );
  }

  return jsonError(
    "An unexpected error occurred. Please try again.",
    ERROR_CODES.INTERNAL_ERROR,
    500,
  );
}

export async function parseJsonBody<T>(
  request: NextRequest,
  schema: { parse: (data: unknown) => T },
): Promise<T> {
  let body: unknown;

  try {
    body = await request.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw error;
    }
    throw new SyntaxError("Invalid JSON in request body.");
  }

  return schema.parse(body);
}
