"use server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

const log = (msg: string) => {
    console.log("[AUTH LOG]: " + msg);
};

export async function getUserFromDb(credentials: any) {
    log("Logic called for: " + credentials?.email);

    const parsedCredentials = z
        .object({ email: z.string().email(), password: z.string().min(6) })
        .safeParse(credentials)

    if (parsedCredentials.success) {
        const { email, password } = parsedCredentials.data

        try {
            const user = await prisma.user.findUnique({ where: { email } })
            log("User found in DB: " + (!!user ? "YES" : "NO"));

            if (!user) return null

            const passwordsMatch = await bcrypt.compare(password, user.password)
            log("Password match: " + (passwordsMatch ? "YES" : "NO"));

            if (passwordsMatch) return user
        } catch (dbError: any) {
            log("DB Error: " + dbError.message);
            return null;
        }
    } else {
        log("Validation failed");
    }

    return null
}
