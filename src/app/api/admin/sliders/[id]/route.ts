import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const slider = await prisma.slider.findUnique({
            where: { id: params.id },
        });

        if (!slider) {
            return NextResponse.json({ error: 'Slider not found' }, { status: 404 });
        }

        return NextResponse.json(slider);
    } catch (error) {
        console.error('Error fetching slider:', error);
        return NextResponse.json({ error: 'Failed to fetch slider' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const body = await request.json();
        const slider = await prisma.slider.update({
            where: { id: params.id },
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
        console.error('Error updating slider:', error);
        return NextResponse.json({ error: 'Failed to update slider' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        await prisma.slider.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting slider:', error);
        return NextResponse.json({ error: 'Failed to delete slider' }, { status: 500 });
    }
}
