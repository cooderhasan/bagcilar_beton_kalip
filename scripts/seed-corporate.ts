import { prisma } from '../src/lib/prisma';

async function main() {
    console.log('Seeding corporate page...');

    const contentTr = `
    <p>Bağcılar Beton Kalıp olarak, inşaat sektöründe kalıp sistemleri alanında Türkiye'nin önde gelen firması olmak vizyonuyla hareket ediyoruz. Yenilikçi çözümlerimiz ve kalite odaklı yaklaşımımızla sektörde standartları belirlemeyi hedefliyoruz.</p>
    <p>Sektördeki 20 yılı aşkın tecrübemizle, güvenilir iş ortağı olmayı sürdürerek, Türkiye genelinde ve uluslararası pazarlarda varlığımızı güçlendirmeyi hedefliyoruz. Deneyimli kadromuz ve modern üretim tesislerimizle, zamanında teslimat ve kusursuz ürün kalitesi garantisi veriyoruz.</p>
    <p>Çevreye duyarlı üretim anlayışımızla, sürdürülebilir inşaat sektörüne katkı sağlamak önceliklerimiz arasındadır. Müşteri memnuniyetini her şeyin üstünde tutarak, uzun vadeli iş birlikleri kurmayı amaçlıyoruz.</p>
  `;

    const contentEn = `
    <p>As Bagcilar Concrete Formwork, we operate with the vision of being Turkey's leading company in the field of formwork systems in the construction sector. We aim to set standards in the sector with our innovative solutions and quality-oriented approach.</p>
    <p>With over 20 years of experience in the sector, we aim to strengthen our presence in Turkey and international markets by maintaining our position as a reliable business partner. With our experienced staff and modern production facilities, we guarantee on-time delivery and perfect product quality.</p>
    <p>Contributing to the sustainable construction sector with our environmentally friendly production approach is among our priorities. By keeping customer satisfaction above all else, we aim to establish long-term collaborations.</p>
  `;

    const page = await prisma.page.upsert({
        where: { slug: 'about-us' },
        update: {
            title: { tr: 'Kurumsal', en: 'Corporate' },
            content: { tr: contentTr, en: contentEn }
        },
        create: {
            slug: 'about-us',
            title: { tr: 'Kurumsal', en: 'Corporate' },
            content: { tr: contentTr, en: contentEn },
            image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2072',
            heroImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070',
            seoTitle: 'Bağcılar Beton Kalıp | Kurumsal',
            seoDescription: 'Bağcılar Beton Kalıp kurumsal bilgiler, vizyon, misyon ve değerlerimiz.',
            isActive: true
        }
    });

    console.log('Seed successful:', page);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
