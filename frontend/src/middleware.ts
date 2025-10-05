import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/login", "/signup"];

const apiBaseUrl = process.env.BACKEND_URL || "";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow requests for API, static files, and image optimization
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next/static") ||
    pathname.startsWith("/_next/image") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".png")
  ) {
    return NextResponse.next();
  }

  // Get the authentication token from cookies
  const token = request.cookies.get("token")?.value;

  // If user has token and tries to access login/signup, redirect to dashboard
  if (token && (pathname === "/login" || pathname === "/signup")) {
    console.log("Redirecting to dashboard, token: ",token)
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow public routes without token
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // No token and not a public route - redirect to login
  if (!token) {
    console.log("Redirecting to login, token: ",token)
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Verify token for protected routes
  try {
    const response = await fetch(`${apiBaseUrl}/auth/verify-auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
      cache: 'no-store' // Prevent caching
    });

    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware auth error:", error);
    
    // Clear invalid token
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};