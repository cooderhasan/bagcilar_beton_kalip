import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const settings = await prisma.siteSettings.findFirst();
        return NextResponse.json(settings || {});
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json({});
    }
}
