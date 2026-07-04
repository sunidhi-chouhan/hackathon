import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 15;

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

function getClientKey(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous"
  );
}

export function checkRateLimit(request: NextRequest): NextResponse | null {
  const key = getClientKey(request);
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return null;
  }

  if (entry.count >= MAX_REQUESTS) {
    return NextResponse.json(
      {
        error: "Too many requests. Please wait a minute and try again.",
        code: "VALIDATION_ERROR",
      },
      { status: 429 },
    );
  }

  entry.count += 1;
  return null;
}

/** Clears the in-memory store — for tests only. */
export function resetRateLimitStore(): void {
  store.clear();
}
