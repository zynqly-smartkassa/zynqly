import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js middleware that gates the app on the presence of a refresh-token
 * cookie.
 *
 * Unauthenticated visits to protected routes are redirected to `/sign-in`,
 * and authenticated visits to `/sign-in` or `/sign-up` are bounced to
 * `/dashboard`. The hero page (`/`) and the auth pages themselves are
 * publicly reachable so a logged-out user can still land on the marketing
 * site without an infinite redirect loop.
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
 * Next.js middleware matcher that excludes assets and API routes so the gate
 * only runs on actual page navigations.
 */
export const config = {
  matcher: [
    // Will not check the cookie if the paths match with one of these
    // /api, /_next, /static
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
