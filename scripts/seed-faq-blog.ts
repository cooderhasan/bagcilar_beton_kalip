// Seed script for FAQ and Blog
// Run with: npx ts-node scripts/seed-faq-blog.ts

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding FAQ and Blog...');

    // 4 FAQ Items
    const faqs = [
        {
            question: {
                tr: 'Beton kalıp nedir?',
                en: 'What is concrete formwork?'
            },
            answer: {
                tr: 'Beton kalıp, beton döküm işlemlerinde betonun istenilen şekli almasını sağlayan geçici yapılardır. Ahşap, metal veya plastikten üretilebilir ve inşaat projelerinin temel unsurlarından biridir.',
                en: 'Concrete formwork is a temporary structure used in concrete pouring operations to help concrete take the desired shape. It can be made of wood, metal, or plastic and is a fundamental element of construction projects.'
            },
            order: 1,
            isActive: true
        },
        {
            question: {
                tr: 'Kalıp kiralama hizmeti sunuyor musunuz?',
                en: 'Do you offer formwork rental service?'
            },
            answer: {
                tr: 'Evet, tüm kalıp sistemlerimizi kiralama seçeneği ile sunuyoruz. Projenizin büyüklüğüne ve süresine göre uygun fiyatlandırma yapılmaktadır. Detaylı bilgi için bizimle iletişime geçebilirsiniz.',
                en: 'Yes, we offer all our formwork systems with rental options. Pricing is based on the size and duration of your project. Contact us for detailed information.'
            },
            order: 2,
            isActive: true
        },
        {
            question: {
                tr: 'Teslimat süresi ne kadar?',
                en: 'What is the delivery time?'
            },
            answer: {
                tr: 'Stok ürünlerimiz için teslimat süresi İstanbul içi 1-2 iş günü, Türkiye geneli 3-5 iş günüdür. Özel üretim gerektiren siparişlerde süre proje detaylarına göre belirlenir.',
                en: 'For stock products, delivery time is 1-2 business days within Istanbul, and 3-5 business days nationwide. For custom orders, the timeframe is determined based on project details.'
            },
            order: 3,
            isActive: true
        },
        {
            question: {
                tr: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
                en: 'What payment methods do you accept?'
            },
            answer: {
                tr: 'Nakit, banka havalesi/EFT, kredi kartı ve vadeli ödeme seçeneklerini kabul ediyoruz. Kurumsal müşterilerimize özel ödeme planları da sunulmaktadır.',
                en: 'We accept cash, bank transfer/EFT, credit card, and installment payment options. Special payment plans are also available for corporate clients.'
            },
            order: 4,
            isActive: true
        }
    ];

    for (const faq of faqs) {
        await prisma.fAQ.upsert({
            where: { id: `faq-${faq.order}` },
            update: faq,
            create: { id: `faq-${faq.order}`, ...faq }
        });
        console.log(`FAQ ${faq.order} created/updated`);
    }

    // 2 Blog Posts
    const blogs = [
        {
            id: 'blog-seed-1',
            slug: 'beton-kalip-cesitleri-ve-kullanim-alanlari',
            title: {
                tr: 'Beton Kalıp Çeşitleri ve Kullanım Alanları',
                en: 'Types of Concrete Formwork and Their Applications'
            },
            content: {
                tr: '<h2>Beton Kalıp Sistemleri</h2><p>İnşaat sektöründe beton kalıplar, projenin başarısını doğrudan etkileyen kritik unsurlardır. Doğru kalıp seçimi, hem maliyet hem de zaman açısından büyük avantajlar sağlar.</p><h3>Kalıp Türleri</h3><ul><li><strong>Panel Kalıplar:</strong> En yaygın kullanılan kalıp türüdür. Kolay montaj ve söküm imkanı sunar.</li><li><strong>Tünel Kalıplar:</strong> Seri üretim gerektiren projelerde tercih edilir.</li><li><strong>Kolon Kalıpları:</strong> Dairesel ve kare kolon dökümleri için idealdir.</li></ul><p>Projeleriniz için en uygun kalıp sistemini seçmek için uzman ekibimizle iletişime geçin.</p>',
                en: '<h2>Concrete Formwork Systems</h2><p>In the construction industry, concrete formwork is a critical element that directly affects project success. The right formwork selection provides significant advantages in terms of both cost and time.</p><h3>Types of Formwork</h3><ul><li><strong>Panel Formwork:</strong> The most commonly used type. Offers easy assembly and disassembly.</li><li><strong>Tunnel Formwork:</strong> Preferred for projects requiring mass production.</li><li><strong>Column Formwork:</strong> Ideal for circular and square column casting.</li></ul><p>Contact our expert team to select the most suitable formwork system for your projects.</p>'
            },
            excerpt: {
                tr: 'Beton kalıp sistemleri hakkında kapsamlı bir rehber. Panel, tünel ve kolon kalıplarının özellikleri ve kullanım alanları.',
                en: 'A comprehensive guide to concrete formwork systems. Features and applications of panel, tunnel, and column formwork.'
            },
            image: '/images/products/product-placeholder.png',
            published: true
        },
        {
            id: 'blog-seed-2',
            slug: 'kalip-bakim-ve-depolama-ipuclari',
            title: {
                tr: 'Kalıp Bakım ve Depolama İpuçları',
                en: 'Formwork Maintenance and Storage Tips'
            },
            content: {
                tr: '<h2>Kalıp Ömrünü Uzatın</h2><p>Doğru bakım ve depolama yöntemleri, kalıp sistemlerinizin ömrünü önemli ölçüde uzatır ve maliyetlerinizi düşürür.</p><h3>Bakım Önerileri</h3><ul><li><strong>Temizlik:</strong> Her kullanım sonrası beton kalıntılarını temizleyin.</li><li><strong>Yağlama:</strong> Kalıp yüzeylerini düzenli olarak kalıp yağı ile koruyun.</li><li><strong>Kontrol:</strong> Hasarlı parçaları tespit edin ve değiştirin.</li></ul><h3>Depolama</h3><p>Kalıpları kuru ve düz bir zeminde, üst üste düzgün şekilde istifleyin. Dış ortam koşullarından koruyun.</p>',
                en: '<h2>Extend Your Formwork Lifespan</h2><p>Proper maintenance and storage methods significantly extend the life of your formwork systems and reduce costs.</p><h3>Maintenance Recommendations</h3><ul><li><strong>Cleaning:</strong> Clean concrete residue after each use.</li><li><strong>Oiling:</strong> Regularly protect formwork surfaces with release oil.</li><li><strong>Inspection:</strong> Identify and replace damaged parts.</li></ul><h3>Storage</h3><p>Stack formwork neatly on dry, flat ground. Protect from outdoor conditions.</p>'
            },
            excerpt: {
                tr: 'Kalıp sistemlerinizin ömrünü uzatmak için bakım ve depolama ipuçları.',
                en: 'Maintenance and storage tips to extend the life of your formwork systems.'
            },
            image: '/images/products/product-placeholder.png',
            published: true
        }
    ];

    for (const blog of blogs) {
        await prisma.blogPost.upsert({
            where: { id: blog.id },
            update: blog,
            create: blog
        });
        console.log(`Blog "${blog.slug}" created/updated`);
    }

    console.log('✅ Seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
