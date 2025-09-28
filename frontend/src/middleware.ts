import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/login", "/signup"];

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow requests for API, static files, and image optimization to pass through
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next/static") ||
    pathname.startsWith("/_next/image") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".png")
  ) {
    return NextResponse.next();
  }

  // Get the authentication token from the cookies
  const token = request.cookies.get("token")?.value;

  // If the user is trying to access a public route, let them pass
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // If there's no token and the route is protected, redirect to login
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (token && pathname === "/login" || pathname === "/") {
    const homeUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(homeUrl);
  }

  // Verify the token by calling the backend API
  try {
    const response = await fetch(`${apiBaseUrl}/auth/verify-auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    // If the token is invalid (API returns non-200), redirect to login
    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    // If the token is valid, allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    console.error("\nMiddleware auth error: Unable to verify token\n",error);
    const loginUrl = new URL("/login", request.url);
    // In case of any error during verification, redirect to login for safety
    return NextResponse.redirect(loginUrl);
  }
}

// Use the matcher to specify which paths the middleware should run on.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes) - though we handle it above, this is an optimization
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
