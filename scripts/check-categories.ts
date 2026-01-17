import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const categories = await prisma.category.count()
    console.log('Total categories:', categories)
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect())
