import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET single category
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const category = await prisma.category.findUnique({
            where: { id },
        });

        if (!category) {
            return NextResponse.json({ error: 'Kategori bulunamadı' }, { status: 404 });
        }

        return NextResponse.json(category);
    } catch (error) {
        console.error('Error fetching category:', error);
        return NextResponse.json({ error: 'Kategori getirilemedi' }, { status: 500 });
    }
}

// UPDATE category
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const category = await prisma.category.update({
            where: { id },
            data: {
                slug: body.slug,
                title: body.title,
                description: body.description,
                image: body.image || null,
                seoTitle: body.seoTitle || null,
                seoDescription: body.seoDescription || null,
                order: body.order || 0,
            },
        });

        return NextResponse.json(category);
    } catch (error) {
        console.error('Error updating category:', error);
        return NextResponse.json({ error: 'Kategori güncellenemedi' }, { status: 500 });
    }
}

// DELETE category
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.category.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting category:', error);
        return NextResponse.json({ error: 'Kategori silinemedi' }, { status: 500 });
    }
}
