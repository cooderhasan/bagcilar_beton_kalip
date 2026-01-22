
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const page = await prisma.page.findUnique({
        where: { slug: 'contact' },
    });
    console.log('Contact Page Record:', page);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
