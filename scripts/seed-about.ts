
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const aboutPage = {
    slug: 'about-us',
    title: {
        tr: 'Hakkımızda',
        en: 'About Us'
    },
    content: {
        tr: `
      <p>Bağcılar Beton Kalıp olarak, inşaat sektöründe kalıp sistemleri alanında Türkiye'nin önde gelen firması olmak vizyonuyla hareket ediyoruz. Yenilikçi çözümlerimiz ve kalite odaklı yaklaşımımızla sektörde standartları belirlemeyi hedefliyoruz.</p>
      <p>Sektördeki 20 yılı aşkın tecrübemizle, güvenilir iş ortağı olmayı sürdürerek, Türkiye genelinde ve uluslararası pazarlarda varlığımızı güçlendirmeyi hedefliyoruz. Deneyimli kadromuz ve modern üretim tesislerimizle, zamanında teslimat ve kusursuz ürün kalitesi garantisi veriyoruz.</p>
      <p>Çevreye duyarlı üretim anlayışımızla, sürdürülebilir inşaat sektörüne katkı sağlamak önceliklerimiz arasındadır. Müşteri memnuniyetini her şeyin üstünde tutarak, uzun vadeli iş birlikleri kurmayı amaçlıyoruz.</p>
    `,
        en: `
      <p>As Bagcilar Concrete Formwork, we act with the vision of becoming Turkey's leading company in the field of formwork systems in the construction sector. We aim to set standards in the sector with our innovative solutions and quality-oriented approach.</p>
      <p>With over 20 years of experience in the sector, we aim to strengthen our presence in Turkey and international markets by continuing to be a reliable business partner. We guarantee on-time delivery and perfect product quality with our experienced staff and modern production facilities.</p>
      <p>With our environmentally sensitive production understanding, contributing to the sustainable construction sector is among our priorities. By keeping customer satisfaction above all else, we aim to establish long-term collaborations.</p>
    `
    },
    image: 'https://images.unsplash.com/photo-1590059390492-d5495eb8a81f?q=80&w=2072',
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070',
    isActive: true
};

async function main() {
    console.log('Seeding about-us page...');

    const existingPage = await prisma.page.findUnique({
        where: { slug: aboutPage.slug }
    });

    if (!existingPage) {
        await prisma.page.create({
            data: aboutPage
        });
        console.log(`Created page: ${aboutPage.slug}`);
    } else {
        // Optional: Update existing page to ensure content matches
        await prisma.page.update({
            where: { slug: aboutPage.slug },
            data: aboutPage
        });
        console.log(`Updated page: ${aboutPage.slug}`);
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
