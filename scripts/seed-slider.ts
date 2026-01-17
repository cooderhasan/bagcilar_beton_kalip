import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🔄 İlk slider oluşturuluyor...\n');

    // Önce mevcut slider'ları temizle
    await prisma.slider.deleteMany({});

    // Mevcut hero görselini slider olarak ekle
    const slider = await prisma.slider.create({
        data: {
            title: {
                tr: 'Bağcılar Beton Kalıp Sistemleri',
                en: 'Bağcılar Concrete Formwork Systems'
            },
            description: {
                tr: 'İnşaat projeleriniz için güvenilir, dayanıklı ve modern kalıp çözümleri.',
                en: 'Reliable, durable and modern formwork solutions for your construction projects.'
            },
            image: '/images/hero.png',
            link: '/products',
            ctaText: {
                tr: 'Ürünlerimizi İncele',
                en: 'View Our Products'
            },
            order: 0,
            isActive: true
        }
    });

    console.log('✅ İlk slider başarıyla oluşturuldu!\n');
    console.log('📋 Slider bilgileri:');
    console.log('  Başlık:', (slider.title as any).tr);
    console.log('  Görsel:', slider.image);
    console.log('  Link:', slider.link);
    console.log('  Durum: Aktif');
    console.log('\n🎯 Slider yönetimi için: http://localhost:3012/admin/sliders');
    console.log('💡 İleride daha fazla slider ekleyebilirsiniz!');
}

main()
    .catch((e) => {
        console.error('❌ Hata:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
