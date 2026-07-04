export class AiGenerationError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message);
    this.name = "AiGenerationError";
    if (options?.cause !== undefined) {
      this.cause = options.cause;
    }
  }
}

export function toAiGenerationError(error: unknown): AiGenerationError {
  if (error instanceof AiGenerationError) {
    return error;
  }

  const message = error instanceof Error ? error.message : String(error);
  const lower = message.toLowerCase();

  if (lower.includes("api key") || lower.includes("api_key")) {
    return new AiGenerationError("AI service is not configured.", { cause: error });
  }

  if (lower.includes("quota") || lower.includes("rate") || lower.includes("429")) {
    return new AiGenerationError("AI service is busy. Please wait a moment and try again.", {
      cause: error,
    });
  }

  if (lower.includes("timeout") || lower.includes("deadline")) {
    return new AiGenerationError("The request took too long. Try the Fast model or simplify your request.", {
      cause: error,
    });
  }

  if (lower.includes("invalid json") || lower.includes("unexpected format")) {
    return new AiGenerationError("AI returned an unexpected format. Please try again.", {
      cause: error,
    });
  }

  return new AiGenerationError("Unable to generate content right now. Please try again.", {
    cause: error,
  });
}
