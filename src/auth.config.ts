import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnAdmin = nextUrl.pathname.startsWith("/admin")
            const isOnLogin = nextUrl.pathname.startsWith("/admin/login")

            if (isOnAdmin) {
                if (isOnLogin) return true; // Always allow access to login page
                if (isLoggedIn) return true; // Allow access to admin if logged in
                return false; // Redirect unauthenticated users to login page
            }
            return true
        },
        jwt({ token, user }) {
            if (user) {
                // Add custom fields to token
                token.id = user.id
                // @ts-ignore
                token.role = user.role
            }
            return token
        },
        session({ session, token }) {
            if (session.user) {
                // @ts-ignore
                session.user.id = token.id as string
                // @ts-ignore
                session.user.role = token.role as string
            }
            return session
        }
    },
    providers: [], // Providers configured in auth.ts
} satisfies NextAuthConfig
