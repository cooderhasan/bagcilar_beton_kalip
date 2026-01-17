import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const sliders = await prisma.slider.findMany({
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(sliders);
    } catch (error) {
        console.error('Error fetching sliders:', error);
        return NextResponse.json({ error: 'Failed to fetch sliders' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const slider = await prisma.slider.create({
            data: {
                title: body.title,
                description: body.description,
                image: body.image,
                link: body.link,
                ctaText: body.ctaText,
                order: body.order,
                isActive: body.isActive,
            },
        });
        return NextResponse.json(slider);
    } catch (error) {
        console.error('Error creating slider:', error);
        return NextResponse.json({ error: 'Failed to create slider' }, { status: 500 });
    }
}
