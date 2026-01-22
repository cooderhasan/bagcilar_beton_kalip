
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> } // Updated for Next.js 15
) {
    try {
        const { id } = await params;
        const page = await prisma.page.findUnique({
            where: { id },
        });

        if (!page) {
            return new NextResponse("Not Found", { status: 404 });
        }

        return NextResponse.json(page);
    } catch (error) {
        console.error("[PAGE_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();
        const { slug, title, content, image, heroImage, seoTitle, seoDescription, isActive } = body;

        const page = await prisma.page.update({
            where: { id },
            data: {
                slug,
                title,
                content,
                image,
                heroImage,
                seoTitle,
                seoDescription,
                isActive,
            },
        });

        return NextResponse.json(page);
    } catch (error) {
        console.error("[PAGE_UPDATE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { id } = await params;
        const page = await prisma.page.delete({
            where: { id },
        });

        return NextResponse.json(page);
    } catch (error) {
        console.error("[PAGE_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
