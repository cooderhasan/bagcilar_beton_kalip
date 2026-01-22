import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT - Update corporate card
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { title, content, icon, order, isActive } = body;

        const card = await prisma.corporateCard.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(content && { content }),
                ...(icon !== undefined && { icon }),
                ...(order !== undefined && { order }),
                ...(isActive !== undefined && { isActive }),
            },
        });

        return NextResponse.json(card);
    } catch (error) {
        console.error('Error updating corporate card:', error);
        return NextResponse.json(
            { error: 'Failed to update corporate card' },
            { status: 500 }
        );
    }
}

// DELETE - Delete corporate card
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        await prisma.corporateCard.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting corporate card:', error);
        return NextResponse.json(
            { error: 'Failed to delete corporate card' },
            { status: 500 }
        );
    }
}
