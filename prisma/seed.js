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
