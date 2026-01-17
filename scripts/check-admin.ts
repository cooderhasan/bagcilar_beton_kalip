import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Checking for users...')
    const users = await prisma.user.findMany()
    console.log('Total users:', users.length)
    users.forEach(u => {
        console.log(`User: ${u.email}, Role: ${u.role}, Name: ${u.name}`)
    })

    const admin = await prisma.user.findUnique({
        where: { email: 'admin@bagcilar.com' },
    })

    if (admin) {
        console.log('\nSpecific Admin user found:', admin.email)
    } else {
        console.log('\nSpecific Admin user (admin@bagcilar.com) NOT found')
    }
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect())
