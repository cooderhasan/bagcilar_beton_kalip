import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET single product
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const product = await prisma.product.findUnique({
            where: { id },
            include: { category: true }
        });

        if (!product) {
            return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json({ error: 'Ürün getirilemedi' }, { status: 500 });
    }
}

// UPDATE product
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const product = await prisma.product.update({
            where: { id },
            data: {
                slug: body.slug,
                categoryId: body.categoryId,
                title: body.title,
                description: body.description,
                images: body.images || [],
                videoUrl: body.videoUrl || null,
                features: body.features || [],
                seoTitle: body.seoTitle || null,
                seoDescription: body.seoDescription || null,
                order: body.order || 0,
                isActive: body.isActive !== undefined ? body.isActive : true,
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json({ error: 'Ürün güncellenemedi' }, { status: 500 });
    }
}

// DELETE product
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.product.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ error: 'Ürün silinemedi' }, { status: 500 });
    }
}
