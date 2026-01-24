import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditForm from "./EditForm";

interface PageProps {
    params: {
        id: string;
    };
}

export default async function EditBlogPage({ params }: PageProps) {
    const post = await prisma.blogPost.findUnique({
        where: {
            id: parseInt(params.id),
        },
    });

    if (!post) {
        notFound();
    }

    return <EditForm post={post} />;
}
