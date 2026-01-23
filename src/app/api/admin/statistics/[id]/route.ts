import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const body = await request.json();
        const statistic = await prisma.statistic.update({
            where: { id: params.id },
            data: {
                value: body.value,
                label: body.label,
                icon: body.icon,
                order: body.order,
            },
        });
        return NextResponse.json(statistic);
    } catch (error) {
        console.error('Error updating statistic:', error);
        return NextResponse.json({ error: 'Failed to update statistic' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        await prisma.statistic.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting statistic:', error);
        return NextResponse.json({ error: 'Failed to delete statistic' }, { status: 500 });
    }
}
