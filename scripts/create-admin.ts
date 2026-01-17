import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('Creating admin user...')
    const password = await bcrypt.hash('admin123', 10)
    const user = await prisma.user.upsert({
        where: { email: 'admin@bagcilar.com' },
        update: {
            password, // Reset password just in case
            role: 'ADMIN'
        },
        create: {
            email: 'admin@bagcilar.com',
            password,
            name: 'Admin',
            role: 'ADMIN',
        },
    })
    console.log('Admin user created/updated:', user.email)
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect())
