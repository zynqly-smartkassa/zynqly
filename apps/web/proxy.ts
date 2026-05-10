import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware function to handle authentication and routing based on refresh token.
 * Redirects unauthenticated users to the homepage and authenticated users away from it.
 */
// If the user visits the website, we will first check if the user has an refresh token
export async function proxy(request: NextRequest) {

  const token = request.cookies.get('refresh_tk')?.value;

  const isAuthPage = request.nextUrl.pathname === "/sign-in" || 
  request.nextUrl.pathname === "/sign-up";

  const isHeroPage = request.nextUrl.pathname === "/";

  if (!token && !isAuthPage && !isHeroPage) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next();

}

/**
 * Configuration object defining which routes the middleware should apply to.
 * Excludes API routes, static files, and Next.js internal paths.
 */
export const config = {
  matcher: [
    // Will not check the cookie if the paths match with one of these
    // /api, /_next, /static
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};