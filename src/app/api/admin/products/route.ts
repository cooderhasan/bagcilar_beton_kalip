import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();

        // Basic validation
        if (!body.title?.tr || !body.slug || !body.categoryId) {
            return NextResponse.json({ error: "Eksik alanlar var (Başlık, URL veya Kategori)" }, { status: 400 });
        }

        // Ensure images is an array of strings
        const images = Array.isArray(body.images) ? body.images : (body.image ? [body.image] : []);

        const product = await prisma.product.create({
            data: {
                title: body.title,
                description: body.description,
                slug: body.slug,
                categoryId: body.categoryId,
                images: images,
                videoUrl: body.videoUrl || null,
                features: body.features, // JSON object or array
                seoTitle: {
                    tr: body.seoTitle?.tr,
                    en: body.seoTitle?.en,
                },
                seoDescription: {
                    tr: body.seoDescription?.tr,
                    en: body.seoDescription?.en,
                },
                isActive: body.isActive ?? true,
                order: body.order || 0,
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
