import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🔄 Mevcut hero içeriği veritabanına kaydediliyor...\n');

    // Mevcut hero içeriği (tr.json'dan)
    const heroData = {
        backgroundImage: '/images/hero.png',
        title: {
            tr: 'Bağcılar Beton Kalıp Sistemleri',
            en: 'Bağcılar Concrete Formwork Systems'
        },
        subtitle: {
            tr: 'İnşaat projeleriniz için güvenilir, dayanıklı ve modern kalıp çözümleri.',
            en: 'Reliable, durable and modern formwork solutions for your construction projects.'
        },
        primaryCtaText: {
            tr: 'Teklif Al',
            en: 'Get Quote'
        },
        primaryCtaLink: '/quote',
        secondaryCtaText: {
            tr: 'Projelerimiz',
            en: 'Our Projects'
        },
        secondaryCtaLink: '/projects'
    };

    // Veritabanına kaydet (upsert - varsa güncelle, yoksa oluştur)
    const hero = await prisma.heroSection.upsert({
        where: { id: 1 },
        update: heroData,
        create: {
            id: 1,
            ...heroData
        }
    });

    console.log('✅ Hero bölümü başarıyla kaydedildi!\n');
    console.log('📋 Kaydedilen içerik:');
    console.log('  Başlık (TR):', (hero.title as any).tr);
    console.log('  Başlık (EN):', (hero.title as any).en);
    console.log('  Alt Başlık (TR):', (hero.subtitle as any).tr);
    console.log('  Birincil Buton:', (hero.primaryCtaText as any).tr, '->', hero.primaryCtaLink);
    console.log('  İkincil Buton:', (hero.secondaryCtaText as any)?.tr, '->', hero.secondaryCtaLink);
    console.log('\n🎯 Artık admin panelden düzenleyebilirsiniz: http://localhost:3012/admin/hero');

    // Örnek istatistikler de ekleyelim
    console.log('\n🔄 Örnek istatistikler ekleniyor...\n');

    const stats = [
        {
            value: '20+',
            label: { tr: 'Yıllık Tecrübe', en: 'Years of Experience' },
            order: 0
        },
        {
            value: '10k+',
            label: { tr: 'Mutlu Müşteri', en: 'Happy Customers' },
            order: 1
        },
        {
            value: '50+',
            label: { tr: 'Ürün Çeşidi', en: 'Product Variety' },
            order: 2
        }
    ];

    // Önce mevcut istatistikleri sil
    await prisma.statistic.deleteMany({});

    // Yeni istatistikleri ekle
    for (const stat of stats) {
        await prisma.statistic.create({ data: stat });
    }

    console.log('✅ 3 adet istatistik başarıyla eklendi!');
    console.log('🎯 İstatistikleri düzenlemek için: http://localhost:3012/admin/statistics');
}

main()
    .catch((e) => {
        console.error('❌ Hata:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
