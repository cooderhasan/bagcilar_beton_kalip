import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

interface Props {
    params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props) {
    const { locale, slug } = await params;

    const page = await prisma.page.findUnique({
        where: { slug }
    });

    if (!page) return {};

    if (page.seoTitle) {
        return {
            title: page.seoTitle,
            description: page.seoDescription
        };
    }

    const title = (page.title as any)?.[locale];
    return {
        title: `${title} | Bağcılar Beton Kalıp`
    };
}

export default async function LegalPage({ params }: Props) {
    const { locale, slug } = await params;

    const page = await prisma.page.findUnique({
        where: { slug }
    });

    if (!page || !page.isActive) {
        notFound();
    }

    const title = (page.title as any)?.[locale];
    const content = (page.content as any)?.[locale];

    return (
        <div className="bg-white min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 pb-4 border-b">
                        {title}
                    </h1>

                    <div className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-accent rich-text" dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </div>
        </div>
    );
}
