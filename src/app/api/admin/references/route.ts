
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
    try {
        const references = await prisma.reference.findMany({
            orderBy: {
                order: 'asc',
            },
        });

        return NextResponse.json(references);
    } catch (error) {
        console.error("[REFERENCES_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { name, image, order, isActive } = body;

        if (!name || !image) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const reference = await prisma.reference.create({
            data: {
                name,
                image,
                order: order || 0,
                isActive: isActive ?? true,
            },
        });

        return NextResponse.json(reference);
    } catch (error) {
        console.error("[REFERENCES_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
