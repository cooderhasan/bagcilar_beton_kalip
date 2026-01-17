import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const statistics = await prisma.statistic.findMany({
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(statistics);
    } catch (error) {
        console.error('Error fetching statistics:', error);
        return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const statistic = await prisma.statistic.create({
            data: {
                value: body.value,
                label: body.label,
                icon: body.icon,
                order: body.order,
            },
        });
        return NextResponse.json(statistic);
    } catch (error) {
        console.error('Error creating statistic:', error);
        return NextResponse.json({ error: 'Failed to create statistic' }, { status: 500 });
    }
}
