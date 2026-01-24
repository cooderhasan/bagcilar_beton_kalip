import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();

        if (!body.title?.tr || !body.slug) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const post = await prisma.blogPost.update({
            where: { id: parseInt(params.id) },
            data: {
                title: body.title,
                content: body.content,
                slug: body.slug,
                image: body.image,
                seoTitle: body.seoTitle,
                seoDescription: body.seoDescription,
                published: body.published || false,
            },
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error("Error updating blog post:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await prisma.blogPost.delete({
            where: { id: parseInt(params.id) },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting blog post:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
