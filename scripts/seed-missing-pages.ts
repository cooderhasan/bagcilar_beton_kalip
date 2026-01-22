
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultPages = [
    { slug: 'contact', title: { tr: 'İletişim', en: 'Contact' }, content: { tr: '', en: '' } },
    { slug: 'careers', title: { tr: 'İnsan Kaynakları', en: 'Careers' }, content: { tr: '', en: '' } },
    { slug: 'blog', title: { tr: 'Blog', en: 'Blog' }, content: { tr: '', en: '' } },
    { slug: 'references', title: { tr: 'Referanslar', en: 'References' }, content: { tr: '', en: '' } },
    { slug: 'projects', title: { tr: 'Projeler', en: 'Projects' }, content: { tr: '', en: '' } },
    { slug: 'kvkk', title: { tr: 'KVKK', en: 'KVKK' }, content: { tr: '', en: '' } },
    { slug: 'privacy-policy', title: { tr: 'Gizlilik Politikası', en: 'Privacy Policy' }, content: { tr: '', en: '' } },
];

async function main() {
    console.log('Seeding missing pages...');

    for (const page of defaultPages) {
        const existing = await prisma.page.findUnique({
            where: { slug: page.slug },
        });

        if (!existing) {
            console.log(`Creating page: ${page.slug}`);
            await prisma.page.create({
                data: {
                    slug: page.slug,
                    title: page.title,
                    content: page.content,
                    image: null,
                    heroImage: null, // User can update this in Admin
                    isActive: true,
                },
            });
        } else {
            console.log(`Page already exists: ${page.slug}`);
        }
    }

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
