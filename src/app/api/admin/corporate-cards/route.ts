import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Fetch all corporate cards
export async function GET() {
    try {
        const cards = await prisma.corporateCard.findMany({
            orderBy: { order: 'asc' },
        });

        return NextResponse.json(cards);
    } catch (error) {
        console.error('Error fetching corporate cards:', error);
        return NextResponse.json(
            { error: 'Failed to fetch corporate cards' },
            { status: 500 }
        );
    }
}

// POST - Create new corporate card
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, content, icon, order, isActive } = body;

        // Validation
        if (!title || !content) {
            return NextResponse.json(
                { error: 'Title and content are required' },
                { status: 400 }
            );
        }

        const card = await prisma.corporateCard.create({
            data: {
                title,
                content,
                icon: icon || null,
                order: order || 0,
                isActive: isActive !== undefined ? isActive : true,
            },
        });

        return NextResponse.json(card, { status: 201 });
    } catch (error) {
        console.error('Error creating corporate card:', error);
        return NextResponse.json(
            { error: 'Failed to create corporate card' },
            { status: 500 }
        );
    }
}
