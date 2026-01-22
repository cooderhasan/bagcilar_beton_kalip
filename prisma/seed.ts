import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    // info@bagcilarbetonkalip.com için BGC.0mxhhkmf!2025 şifresinin hash'i
    // Bu hash'i manuel olarak veya script çıktısından alıyoruz. 
    // Güvenlik için bcrypt.hash('BGC.0mxhhkmf!2025', 10) sonucunu buraya yazmak en doğrusu ama
    // seed çalışırken tekrar oluşturabiliriz.
    const password = await bcrypt.hash('BGC.0mxhhkmf!2025', 10)

    // Eski admini güncelle veya yenisini oluştur
    const user = await prisma.user.upsert({
        where: { email: 'info@bagcilarbetonkalip.com' },
        update: {
            password,
            role: 'ADMIN'
        },
        create: {
            email: 'info@bagcilarbetonkalip.com',
            password,
            name: 'Admin',
            role: 'ADMIN',
        },
    })

    // Eski admin hesabını opsiyonel olarak silebiliriz veya bırakabiliriz
    // Güvenlik için eski default admini siliyoruz
    await prisma.user.deleteMany({
        where: { email: 'admin@bagcilar.com' }
    });
    console.log('Admin user created:', user.email)

    // Varsayılan slider oluştur
    const existingSlider = await prisma.slider.findFirst()
    if (!existingSlider) {
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
                link: '/quote',
                ctaText: {
                    tr: 'Teklif Al',
                    en: 'Get Quote'
                },
                order: 0,
                isActive: true,
            },
        })
        console.log('Default slider created:', slider.id)
    } else {
        console.log('Slider already exists, skipping default slider creation')
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
