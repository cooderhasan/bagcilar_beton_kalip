import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'


const prisma = new PrismaClient()

export async function GET() {
    try {
        // info@bagcilarbetonkalip.com için BGC.0mxhhkmf!2025 şifresinin hash'i
        const password = await bcrypt.hash('BGC.0mxhhkmf!2025', 10)

        // Admin kullanıcısını oluştur veya güncelle
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

        // Eski admin kullanıcısını temizle (varsa)
        await prisma.user.deleteMany({
            where: { email: 'admin@bagcilar.com' }
        });

        // Varsayılan slider kontrolü ve oluşturma
        let slider = await prisma.slider.findFirst();
        if (!slider) {
            slider = await prisma.slider.create({
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
        }

        return NextResponse.json({
            success: true,
            message: "Database seeded successfully",
            user: { email: user.email, role: user.role },
            slider: slider ? { id: slider.id } : null
        })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message || String(error) }, { status: 500 })
    }
}
