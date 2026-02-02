import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function unauthorized() {
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin"',
    },
  });
}

export function middleware(request: NextRequest) {
  const user = process.env.ADMIN_USER?.trim();
  const pass = process.env.ADMIN_PASS?.trim();

  if (!user || !pass) {
    return new NextResponse("Admin authentication is not configured.", { status: 503 });
  }

  const authHeader = request.headers.get("authorization") || "";
  if (!authHeader.startsWith("Basic ")) return unauthorized();

  try {
    const decoded = atob(authHeader.slice("Basic ".length));
    const idx = decoded.indexOf(":");
    const givenUser = idx >= 0 ? decoded.slice(0, idx) : "";
    const givenPass = idx >= 0 ? decoded.slice(idx + 1) : "";

    if (givenUser !== user || givenPass !== pass) return unauthorized();
  } catch {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
