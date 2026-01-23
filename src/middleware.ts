import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);
const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 0. SEO Redirect: Force WWW
  // Redirect non-www to www to prevent duplicate content
  if (req.headers.get("host") === "bagcilarbetonkalip.com") {
    const url = req.nextUrl.clone();
    url.hostname = "www.bagcilarbetonkalip.com";
    url.protocol = "https";
    url.port = ""; // Ensure standard port (443)
    return NextResponse.redirect(url, 301);
  }

  // 1. Skip API and Webhook routes
  if (pathname.startsWith('/api') || pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  // 2. Admin Authentication Handling
  if (pathname.startsWith('/admin')) {
    // Let NextAuth handle the admin route protection
    // We explicitly call the auth middleware for these routes
    return (auth as any)(req);
  }

  // 3. Internationalization Handling (Public Routes)
  // For all other routes, use next-intl middleware
  return intlMiddleware(req);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
