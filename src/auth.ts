import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "./auth.config"
import { getUserFromDb } from "./auth.logic"

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    debug: true,
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                return await getUserFromDb(credentials);
            },
        }),
    ],
})
