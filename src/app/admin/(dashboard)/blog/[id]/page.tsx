import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditForm from "./EditForm";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditBlogPage(props: PageProps) {
    const params = await props.params;
    const post = await prisma.blogPost.findUnique({
        where: {
            id: params.id,
        },
    });

    if (!post) {
        notFound();
    }

    return <EditForm post={post} />;
}
