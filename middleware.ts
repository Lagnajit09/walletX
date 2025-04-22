import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define protected routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/analytics",
  "/transfer",
  "/profile",
  "/transactions",
  "/wallet",
  "/settings",
];

// Define auth routes (login/signup pages and verification pages)
const authRoutes = [
  "/signin",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/email-confirmation",
  "/verification-success",
  "/verification-failure",
  "/terms-and-privacy",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware processing for static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.(?:svg|png|jpg|jpeg|gif|webp)$/)
  ) {
    return NextResponse.next();
  }

  // Check if the path is a valid route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isPublicRoute = pathname === "/" || pathname === "/not-found";

  // If the path is not a valid route, redirect to not-found
  if (!isProtectedRoute && !isAuthRoute && !isPublicRoute) {
    // Create a URL for the not found page
    const notFoundUrl = new URL("/not-found", request.url);

    // Return a redirect response
    return NextResponse.redirect(notFoundUrl);
  }

  // Get the token from the session
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // If the user is on an auth route and is already authenticated,
  // redirect them to the dashboard, unless they're on a verification page
  if (isAuthRoute && token) {
    // Don't redirect from verification pages even if authenticated
    if (
      !pathname.startsWith("/email-confirmation") &&
      !pathname.startsWith("/verification-success") &&
      !pathname.startsWith("/verification-failure")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // If the user is on a protected route and is not authenticated,
  // redirect them to the signin page
  if (isProtectedRoute && !token) {
    const signInUrl = new URL("/signin", request.url);
    // Add the current path as a callback URL
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // For all other routes, allow the request to proceed
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    // Match all routes except static files and other system routes
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
