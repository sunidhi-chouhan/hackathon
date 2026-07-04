import type { ErrorCode, ApiError } from "@culturecompass/shared";
import { ERROR_CODES } from "@culturecompass/shared";

export class ApiRequestError extends Error {
  readonly code: ErrorCode;
  readonly status: number;

  constructor(message: string, code: ErrorCode, status: number) {
    super(message);
    this.name = "ApiRequestError";
    this.code = code;
    this.status = status;
  }
}

const FRIENDLY_BY_CODE: Record<ErrorCode, string> = {
  [ERROR_CODES.VALIDATION_ERROR]:
    "Please check your form inputs and try again.",
  [ERROR_CODES.AI_ERROR]:
    "Our AI could not complete your request. Try again or switch to the Fast model.",
  [ERROR_CODES.INTERNAL_ERROR]:
    "Something went wrong on our end. Please try again in a moment.",
};

export function getDisplayError(error: unknown): string {
  if (error instanceof ApiRequestError) {
    return error.message;
  }

  if (error instanceof TypeError) {
    const msg = error.message.toLowerCase();
    if (msg.includes("fetch") || msg.includes("network") || msg.includes("failed")) {
      return "Unable to reach the server. Check your connection and try again.";
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

export function resolveApiError(errorBody: ApiError | null, status: number): ApiRequestError {
  const code = errorBody?.code ?? ERROR_CODES.INTERNAL_ERROR;
  const serverMessage = errorBody?.error?.trim();

  const message =
    serverMessage && serverMessage.length > 0
      ? serverMessage
      : FRIENDLY_BY_CODE[code];

  return new ApiRequestError(message, code, status);
}
