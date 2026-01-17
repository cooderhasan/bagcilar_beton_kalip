import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🔄 Ürün kategorileri ekleniyor...\n');

    const categories = [
        {
            slug: 'ozel-tasarim-kaliplar',
            title: { tr: 'Özel Tasarım Kalıplar', en: 'Custom Design Formwork' },
            description: {
                tr: 'Projenize özel üretilen benzersiz kalıp çözümleri.',
                en: 'Unique formwork solutions custom-made for your project.'
            },
            seoTitle: 'Özel Tasarım Beton Kalıpları | Bağcılar',
            seoDescription: 'Projenize özel tasarlanmış benzersiz beton kalıp çözümleri. Özel ölçü ve tasarım imkanı.',
            order: 0
        },
        {
            slug: 'kolon-kaliplari',
            title: { tr: 'Kolon Kalıpları', en: 'Column Formwork' },
            description: {
                tr: 'Yuvarlak ve kare kolon dökümleri için profesyonel kalıplar.',
                en: 'Professional formwork for round and square column casting.'
            },
            seoTitle: 'Kolon Kalıpları - Yuvarlak ve Kare | Bağcılar',
            seoDescription: 'Profesyonel kolon kalıpları. Yuvarlak ve kare kolon dökümleri için dayanıklı çözümler.',
            order: 1
        },
        {
            slug: 'korkuluk-kaliplari',
            title: { tr: 'Korkuluk Kalıpları', en: 'Railing Formwork' },
            description: {
                tr: 'Dekoratif beton korkuluk ve balüstrad kalıpları.',
                en: 'Decorative concrete railing and balustrade formwork.'
            },
            seoTitle: 'Beton Korkuluk Kalıpları | Bağcılar',
            seoDescription: 'Dekoratif beton korkuluk ve balüstrad kalıpları. Estetik ve dayanıklı çözümler.',
            order: 2
        },
        {
            slug: 'kapi-kemer-kaliplari',
            title: { tr: 'Kapı Kemer Kalıpları', en: 'Door Arch Formwork' },
            description: {
                tr: 'Kapı ve pencere üstü kemer döküm kalıpları.',
                en: 'Arch formwork for doors and windows.'
            },
            seoTitle: 'Kapı Kemer Kalıpları | Bağcılar',
            seoDescription: 'Kapı ve pencere üstü kemer döküm kalıpları. Estetik kemer tasarımları.',
            order: 3
        },
        {
            slug: 'bariyer-kaliplari',
            title: { tr: 'Bariyer Kalıpları', en: 'Barrier Formwork' },
            description: {
                tr: 'Otoyol ve güvenlik bariyeri üretim kalıpları.',
                en: 'Highway and safety barrier production formwork.'
            },
            seoTitle: 'Beton Bariyer Kalıpları | Bağcılar',
            seoDescription: 'Otoyol ve güvenlik bariyeri üretim kalıpları. Standart ve özel ölçüler.',
            order: 4
        },
        {
            slug: 'bahce-duvar-kaliplari',
            title: { tr: 'Bahçe Duvar Kalıpları', en: 'Garden Wall Formwork' },
            description: {
                tr: 'Estetik bahçe ve çevre duvarı kalıpları.',
                en: 'Aesthetic garden and perimeter wall formwork.'
            },
            seoTitle: 'Bahçe Duvar Kalıpları | Bağcılar',
            seoDescription: 'Estetik bahçe ve çevre duvarı kalıpları. Dekoratif duvar çözümleri.',
            order: 5
        },
        {
            slug: 'beton-cit-kaliplari',
            title: { tr: 'Beton Çit Kalıpları', en: 'Concrete Fence Formwork' },
            description: {
                tr: 'Panel ve modüler beton çit sistemleri.',
                en: 'Panel and modular concrete fence systems.'
            },
            seoTitle: 'Beton Çit Kalıpları | Bağcılar',
            seoDescription: 'Panel ve modüler beton çit sistemleri. Hazır beton çit çözümleri.',
            order: 6
        },
        {
            slug: 'plywood-kaliplar',
            title: { tr: 'Plywood Yüzeyli Kalıplar', en: 'Plywood Formwork' },
            description: {
                tr: 'Film kaplı yüksek kaliteli döşeme kalıpları.',
                en: 'Film-coated high-quality slab formwork.'
            },
            seoTitle: 'Plywood Kalıplar - Film Kaplı | Bağcılar',
            seoDescription: 'Film kaplı plywood döşeme kalıpları. Yüksek kalite ve dayanıklılık.',
            order: 7
        },
        {
            slug: 'hatil-kaliplari',
            title: { tr: 'Hatıl Kalıpları', en: 'Beam Formwork' },
            description: {
                tr: 'Standart ve özel ölçü hatıl kalıpları.',
                en: 'Standard and custom size beam formwork.'
            },
            seoTitle: 'Hatıl Kalıpları | Bağcılar',
            seoDescription: 'Standart ve özel ölçü hatıl kalıpları. Profesyonel beton hatıl çözümleri.',
            order: 8
        },
        {
            slug: 'yardimci-urunler',
            title: { tr: 'Beton Kalıp Yardımcı Ürünleri', en: 'Formwork Accessories' },
            description: {
                tr: 'Kalıp yağı, tie-rod ve montaj aksesuarları.',
                en: 'Formwork oil, tie-rods and assembly accessories.'
            },
            seoTitle: 'Beton Kalıp Yardımcı Ürünleri | Bağcılar',
            seoDescription: 'Kalıp yağı, tie-rod ve montaj aksesuarları. Tüm yardımcı malzemeler.',
            order: 9
        }
    ];

    // Önce mevcut kategorileri temizle
    console.log('🗑️  Mevcut kategoriler temizleniyor...');
    await prisma.category.deleteMany({});

    // Yeni kategorileri ekle
    let addedCount = 0;
    for (const category of categories) {
        await prisma.category.create({ data: category });
        addedCount++;
        console.log(`✅ ${addedCount}. ${category.title.tr} eklendi`);
    }

    console.log(`\n🎉 Toplam ${addedCount} kategori başarıyla eklendi!`);
    console.log('🎯 Kategorileri görmek için: http://localhost:3012/admin/categories');
    console.log('📱 Ana sayfada görmek için: http://localhost:3012/');
}

main()
    .catch((e) => {
        console.error('❌ Hata:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
