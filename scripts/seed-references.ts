import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const references = [
    {
        name: 'Mega Yapı İnşaat',
        image: 'https://placehold.co/400x200/png?text=Mega+Yapi',
        order: 1
    },
    {
        name: 'Yıldız Kule Projesi',
        image: 'https://placehold.co/400x200/png?text=Yildiz+Kule',
        order: 2
    },
    {
        name: 'Vadi İstanbul Konutları',
        image: 'https://placehold.co/400x200/png?text=Vadi+Istanbul',
        order: 3
    },
    {
        name: 'Kuzey Marmara Otoyolu',
        image: 'https://placehold.co/400x200/png?text=Kuzey+Marmara',
        order: 4
    }
];

async function main() {
    console.log('🏗️ Referanslar oluşturuluyor...');

    for (const ref of references) {
        // Check if exists by name to avoid duplicates on re-run
        const existing = await prisma.reference.findFirst({
            where: { name: ref.name }
        });

        if (existing) {
            console.log(`⏭️  Referans: ${ref.name} zaten mevcut.`);
        } else {
            console.log(`✅ Referans: ${ref.name} oluşturuluyor...`);
            await prisma.reference.create({
                data: ref
            });
        }
    }

    console.log('🎉 Referanslar eklendi!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
