import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

// GET all categories
export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { order: 'asc' }
        });
        return NextResponse.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();

        // Basic validation
        if (!body.title?.tr || !body.slug) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const category = await prisma.category.create({
            data: {
                title: body.title,
                description: body.description,
                slug: body.slug,
                image: body.image,
                seoTitle: body.seoTitle,
                seoDescription: body.seoDescription,
                order: body.order || 0,
            },
        });

        return NextResponse.json(category);
    } catch (error) {
        console.error("Error creating category:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
