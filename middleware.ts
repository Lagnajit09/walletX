import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define protected routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/p2p",
  "/profile",
  "/transactions",
  "/wallet",
];

// Define auth routes (login/signup pages)
const authRoutes = ["/auth"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the token from the session
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If the user is on an auth route and is already authenticated,
  // redirect them to the dashboard
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If the user is on a protected route and is not authenticated,
  // redirect them to the signin page
  if (isProtectedRoute && !token) {
    const signInUrl = new URL("/auth", request.url);
    // Add the current path as a callback URL
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // For api routes, return next() to allow the request to proceed
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // For all other routes, allow the request to proceed
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    // Match all routes except static files and other system routes
    "/((?!_next/static|_next/image|favicon.ico|api/ping|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    // Include auth routes
    "/auth",
    // Include protected routes
    "/dashboard/:path*",
    "/p2p/:path*",
    "/profile/:path*",
    "/transactions/:path*",
    "/wallet/:path*",
  ],
};
