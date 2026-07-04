import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

export function middleware(request: NextRequest) {
  if (request.method === "POST" && request.nextUrl.pathname.startsWith("/api/")) {
    const rateLimited = checkRateLimit(request);
    if (rateLimited) {
      return rateLimited;
    }
  }

  const response = NextResponse.next();

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  return response;
}

export const config = {
  matcher: ["/api/:path*"],
};
