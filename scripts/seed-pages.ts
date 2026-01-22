
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const pages = [
    {
        slug: 'privacy-policy',
        title: {
            tr: 'Gizlilik Politikası',
            en: 'Privacy Policy'
        },
        content: {
            tr: '<h1>Gizlilik Politikası</h1><p>Gizliliğiniz bizim için önemlidir...</p>',
            en: '<h1>Privacy Policy</h1><p>Your privacy is important to us...</p>'
        },
        isActive: true
    },
    {
        slug: 'terms-of-use',
        title: {
            tr: 'Kullanım Şartları',
            en: 'Terms of Use'
        },
        content: {
            tr: '<h1>Kullanım Şartları</h1><p>Web sitemizi kullanarak şu şartları kabul etmiş olursunuz...</p>',
            en: '<h1>Terms of Use</h1><p>By using our website, you agree to the following terms...</p>'
        },
        isActive: true
    },
    {
        slug: 'kvkk',
        title: {
            tr: 'KVKK Aydınlatma Metni',
            en: 'KVKK Clarification Text'
        },
        content: {
            tr: '<h1>KVKK Aydınlatma Metni</h1><p>Kişisel verilerinizin korunması hakkında...</p>',
            en: '<h1>KVKK Clarification Text</h1><p>About the protection of your personal data...</p>'
        },
        isActive: true
    },
    {
        slug: 'cookie-policy',
        title: {
            tr: 'Çerez Politikası',
            en: 'Cookie Policy'
        },
        content: {
            tr: '<h1>Çerez Politikası</h1><p>Sitemizde çerezler kullanılmaktadır...</p>',
            en: '<h1>Cookie Policy</h1><p>Cookies are used on our website...</p>'
        },
        isActive: true
    }
];

async function main() {
    console.log('Seeding pages...');

    for (const page of pages) {
        const existingPage = await prisma.page.findUnique({
            where: { slug: page.slug }
        });

        if (!existingPage) {
            await prisma.page.create({
                data: page
            });
            console.log(`Created page: ${page.slug}`);
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
