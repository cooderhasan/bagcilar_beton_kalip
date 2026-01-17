import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🔄 Örnek ürün oluşturuluyor...\n');

    // Bahçe duvar kalıpları kategorisini bul
    const category = await prisma.category.findFirst({
        where: { slug: 'bahce-duvar-kaliplari' }
    });

    if (!category) {
        console.error('❌ Bahçe duvar kalıpları kategorisi bulunamadı!');
        console.log('💡 Önce kategorileri oluşturun: npx tsx scripts/seed-categories.ts');
        return;
    }

    console.log(`✅ Kategori bulundu: ${(category.title as any).tr}\n`);

    // Örnek ürün verisi
    const product = await prisma.product.create({
        data: {
            slug: 'osmanli-desenli-bahce-duvari',
            categoryId: category.id,
            title: {
                tr: 'Osmanlı Desenli Bahçe Duvar Kalıbı',
                en: 'Ottoman Pattern Garden Wall Formwork'
            },
            description: {
                tr: 'Klasik Osmanlı mimarisinden esinlenen zarif desenli bahçe duvar kalıbı. Bahçenize estetik ve şık bir görünüm kazandırır. Dayanıklı yapısı sayesinde uzun yıllar kullanılabilir.',
                en: 'Elegant patterned garden wall formwork inspired by classic Ottoman architecture. Gives your garden an aesthetic and elegant appearance. Can be used for many years thanks to its durable structure.'
            },
            images: [
                '/images/products/bahce-duvar-1.jpg',
                '/images/products/bahce-duvar-2.jpg',
                '/images/products/bahce-duvar-3.jpg'
            ],
            features: [
                'Yüksek kaliteli çelik malzeme',
                'Kolay montaj ve demontaj',
                '120cm x 60cm standart ölçüler',
                'Tekrar kullanılabilir yapı',
                'Detaylı Osmanlı deseni',
                'Pürüzsüz beton yüzeyi',
                'UV dayanımlı kaplama',
                '50+ kullanım garantisi'
            ],
            seoTitle: 'Osmanlı Desenli Bahçe Duvar Kalıbı | Bağcılar Beton Kalıp',
            seoDescription: 'Klasik Osmanlı mimarisinden esinlenen zarif desenli bahçe duvar kalıbı. Dayanıklı ve estetik çözüm. Hemen sipariş verin!',
            order: 0,
            isActive: true
        }
    });

    console.log('✅ Örnek ürün başarıyla oluşturuldu!\n');
    console.log('📋 Ürün Bilgileri:');
    console.log('  Başlık:', (product.title as any).tr);
    console.log('  Slug:', product.slug);
    console.log('  Kategori:', (category.title as any).tr);
    console.log('  Görsel Sayısı:', product.images.length);
    console.log('  Özellik Sayısı:', (product.features as string[]).length);
    console.log('\n🎯 Ürünü görmek için:');
    console.log('  Admin: http://localhost:3012/admin/products');
    console.log('  Site: http://localhost:3012/tr/products/' + product.slug);
}

main()
    .catch((e) => {
        console.error('❌ Hata:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
