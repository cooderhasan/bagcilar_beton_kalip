import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import * as fs from 'fs'

const prisma = new PrismaClient()

export async function GET() {
    try {
        const password = await bcrypt.hash('admin123', 10)
        const user = await prisma.user.upsert({
            where: { email: 'admin@bagcilar.com' },
            update: {},
            create: {
                email: 'admin@bagcilar.com',
                password,
                name: 'Admin',
                role: 'ADMIN',
            },
        })
        return NextResponse.json({ success: true, user })
    } catch (error: any) {
        try {
            fs.writeFileSync('seed_error.txt', JSON.stringify(error, null, 2) + '\n' + String(error));
        } catch (e) {
            // ignore write error
        }
        return NextResponse.json({ success: false, error: error.message || String(error) }, { status: 500 })
    }
}
