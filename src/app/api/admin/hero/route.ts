import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const hero = await prisma.heroSection.findUnique({
            where: { id: 1 },
        });
        return NextResponse.json(hero);
    } catch (error) {
        console.error('Error fetching hero section:', error);
        return NextResponse.json({ error: 'Failed to fetch hero section' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const hero = await prisma.heroSection.upsert({
            where: { id: 1 },
            update: {
                backgroundImage: body.backgroundImage,
                title: body.title,
                subtitle: body.subtitle,
                primaryCtaText: body.primaryCtaText,
                primaryCtaLink: body.primaryCtaLink,
                secondaryCtaText: body.secondaryCtaText,
                secondaryCtaLink: body.secondaryCtaLink,
            },
            create: {
                id: 1,
                backgroundImage: body.backgroundImage,
                title: body.title,
                subtitle: body.subtitle,
                primaryCtaText: body.primaryCtaText,
                primaryCtaLink: body.primaryCtaLink,
                secondaryCtaText: body.secondaryCtaText,
                secondaryCtaLink: body.secondaryCtaLink,
            },
        });
        return NextResponse.json(hero);
    } catch (error) {
        console.error('Error updating hero section:', error);
        return NextResponse.json({ error: 'Failed to update hero section' }, { status: 500 });
    }
}
