
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const reference = await prisma.reference.findUnique({
            where: { id },
        });

        if (!reference) {
            return new NextResponse("Not Found", { status: 404 });
        }

        return NextResponse.json(reference);
    } catch (error) {
        console.error("[REFERENCE_GET]", error);
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
        const { name, image, order, isActive } = body;

        const reference = await prisma.reference.update({
            where: { id },
            data: {
                name,
                image,
                order,
                isActive,
            },
        });

        return NextResponse.json(reference);
    } catch (error) {
        console.error("[REFERENCE_UPDATE]", error);
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
        const reference = await prisma.reference.delete({
            where: { id },
        });

        return NextResponse.json(reference);
    } catch (error) {
        console.error("[REFERENCE_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
