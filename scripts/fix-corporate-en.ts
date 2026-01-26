import { prisma } from '../src/lib/prisma';

async function main() {
    console.log('Checking corporate page content...');
    const page = await prisma.page.findUnique({
        where: { slug: 'about-us' }
    });

    if (!page) {
        console.log('Page not found!');
        return;
    }

    console.log('Current content:', page);

    console.log('Updating English content...');
    const updated = await prisma.page.update({
        where: { slug: 'about-us' },
        data: {
            title: {
                tr: (page.title as any)?.tr || 'Kurumsal',
                en: 'Corporate'
            },
            content: {
                tr: (page.content as any)?.tr || '<p>Türkçe içerik...</p>',
                en: `
          <p>As Bagcilar Concrete Formwork, we operate with the vision of being Turkey's leading company in the field of formwork systems in the construction sector. We aim to set standards in the sector with our innovative solutions and quality-oriented approach.</p>
          <p>With over 20 years of experience in the sector, we aim to strengthen our presence in Turkey and international markets by maintaining our position as a reliable business partner. With our experienced staff and modern production facilities, we guarantee on-time delivery and perfect product quality.</p>
          <p>Contributing to the sustainable construction sector with our environmentally friendly production approach is among our priorities. By keeping customer satisfaction above all else, we aim to establish long-term collaborations.</p>
        `
            }
        }
    });

    console.log('Update successful:', updated);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
