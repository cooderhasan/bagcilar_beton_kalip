import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);
const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
  const isWebHook = req.nextUrl.pathname.startsWith("/api/webhook");
  const isApi = req.nextUrl.pathname.startsWith("/api");
  const isAdmin = req.nextUrl.pathname.startsWith("/admin");

  if (isWebHook || isApi) {
    return;
  }

  // If it's an admin route, let NextAuth handle it (auth middleware covers guard logic)
  if (isAdmin || req.nextUrl.pathname.includes("/login")) {
    return;
  }

  return intlMiddleware(req);
});

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
