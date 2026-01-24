const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('Starting DB seed...');

    // Admin password hash for: BGC.0mxhhkmf!2025
    const password = await bcrypt.hash('BGC.0mxhhkmf!2025', 10);

    // Create or Update Admin User
    const user = await prisma.user.upsert({
        where: { email: 'info@bagcilarbetonkalip.com' },
        update: {
            password,
            role: 'ADMIN' // Ensure role is ADMIN
        },
        create: {
            email: 'info@bagcilarbetonkalip.com',
            password,
            name: 'Admin',
            role: 'ADMIN',
        },
    });

    console.log('Admin user ensured:', user.email);

    // Default Slider
    const existingSlider = await prisma.slider.findFirst();
    if (!existingSlider) {
        await prisma.slider.create({
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
                link: '/quote',
                ctaText: {
                    tr: 'Teklif Al',
                    en: 'Get Quote'
                },
                order: 0,
                isActive: true,
            },
        });
        console.log('Default slider created.');
    } else {
        console.log('Slider already exists.');
    }

    // Seed FAQ - always ensure 4 default FAQs exist
    const faqs = [
        {
            id: 'faq-seed-1',
            question: { tr: 'Beton kalıp nedir?', en: 'What is concrete formwork?' },
            answer: { tr: 'Beton kalıp, beton döküm işlemlerinde betonun istenilen şekli almasını sağlayan geçici yapılardır.', en: 'Concrete formwork is a temporary structure used in concrete pouring operations to help concrete take the desired shape.' },
            order: 1, isActive: true
        },
        {
            id: 'faq-seed-2',
            question: { tr: 'Kalıp kiralama hizmeti sunuyor musunuz?', en: 'Do you offer formwork rental service?' },
            answer: { tr: 'Evet, tüm kalıp sistemlerimizi kiralama seçeneği ile sunuyoruz.', en: 'Yes, we offer all our formwork systems with rental options.' },
            order: 2, isActive: true
        },
        {
            id: 'faq-seed-3',
            question: { tr: 'Teslimat süresi ne kadar?', en: 'What is the delivery time?' },
            answer: { tr: 'Stok ürünlerimiz için teslimat süresi İstanbul içi 1-2 iş günü, Türkiye geneli 3-5 iş günüdür.', en: 'For stock products, delivery time is 1-2 business days within Istanbul, and 3-5 business days nationwide.' },
            order: 3, isActive: true
        },
        {
            id: 'faq-seed-4',
            question: { tr: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?', en: 'What payment methods do you accept?' },
            answer: { tr: 'Nakit, banka havalesi/EFT, kredi kartı ve vadeli ödeme seçeneklerini kabul ediyoruz.', en: 'We accept cash, bank transfer/EFT, credit card, and installment payment options.' },
            order: 4, isActive: true
        }
    ];
    for (const faq of faqs) {
        await prisma.fAQ.upsert({
            where: { id: faq.id },
            update: {},
            create: faq
        });
    }
    console.log('4 FAQ items ensured.');

    // Seed Blog - always ensure 2 default blog posts exist
    const blogs = [
        {
            slug: 'beton-kalip-cesitleri',
            title: { tr: 'Beton Kalıp Çeşitleri ve Kullanım Alanları', en: 'Types of Concrete Formwork' },
            content: { tr: '<h2>Beton Kalıp Sistemleri</h2><p>İnşaat sektöründe beton kalıplar, projenin başarısını doğrudan etkileyen kritik unsurlardır.</p>', en: '<h2>Concrete Formwork Systems</h2><p>In the construction industry, concrete formwork is a critical element.</p>' },
            excerpt: { tr: 'Beton kalıp sistemleri hakkında kapsamlı bir rehber.', en: 'A comprehensive guide to concrete formwork systems.' },
            image: '/images/products/product-placeholder.png',
            published: true
        },
        {
            slug: 'kalip-bakim-ipuclari',
            title: { tr: 'Kalıp Bakım ve Depolama İpuçları', en: 'Formwork Maintenance Tips' },
            content: { tr: '<h2>Kalıp Ömrünü Uzatın</h2><p>Doğru bakım ve depolama yöntemleri, kalıp sistemlerinizin ömrünü önemli ölçüde uzatır.</p>', en: '<h2>Extend Formwork Lifespan</h2><p>Proper maintenance significantly extends the life of your formwork systems.</p>' },
            excerpt: { tr: 'Kalıp sistemlerinizin ömrünü uzatmak için ipuçları.', en: 'Tips to extend the life of your formwork systems.' },
            image: '/images/products/product-placeholder.png',
            published: true
        }
    ];
    for (const blog of blogs) {
        await prisma.blogPost.upsert({
            where: { slug: blog.slug },
            update: {},
            create: blog
        });
    }
    console.log('2 Blog posts ensured.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
