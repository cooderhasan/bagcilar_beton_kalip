
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const pages = await prisma.page.findMany({
            orderBy: {
                title: 'asc', // Or createdAt
            },
        });

        return NextResponse.json(pages);
    } catch (error) {
        console.error("[PAGES_GET]", error);
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
        const { slug, title, content, image, heroImage, seoTitle, seoDescription, isActive } = body;

        if (!slug || !title || !content) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        // Check if slug exists
        const existingPage = await prisma.page.findUnique({
            where: { slug },
        });

        if (existingPage) {
            return new NextResponse("Page with this slug already exists", { status: 400 });
        }

        const page = await prisma.page.create({
            data: {
                slug,
                title,
                content,
                image,
                heroImage,
                seoTitle,
                seoDescription,
                isActive: isActive ?? true,
            },
        });

        return NextResponse.json(page);
    } catch (error) {
        console.error("[PAGES_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
