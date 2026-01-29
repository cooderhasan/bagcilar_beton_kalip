import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';
import { getLocale, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }) {
    const { locale, slug } = await params;

    // Check if slug is 'admin' or other reserved routes to avoid conflict
    if (slug === 'admin' || slug === 'api') return;

    const page = await prisma.page.findUnique({
        where: { slug }
    });

    if (!page || !page.isActive) {
        return {
            title: '404 - Sayfa Bulunamadı'
        };
    }

    const getLocalized = (val: any) => {
        if (!val) return null;
        if (typeof val === 'string') return val;
        return val[locale] || val['tr'] || null;
    };

    const title = (page.title as any)[locale] || (page.title as any)['tr'];
    const seoTitle = getLocalized(page.seoTitle);
    const seoDesc = getLocalized(page.seoDescription);

    return {
        title: seoTitle || `${title} | Bağcılar Beton Kalıp`,
        description: seoDesc
    };
}

export default async function DynamicPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    // Reserved routes check
    if (['admin', 'api', 'products', 'blog', 'contact', 'quote', 'careers'].includes(slug)) {
        notFound();
    }

    const page = await prisma.page.findUnique({
        where: { slug }
    });

    if (!page || !page.isActive) {
        notFound();
    }

    const title = (page.title as any)[locale] || (page.title as any)['tr'];
    const content = (page.content as any)[locale] || (page.content as any)['tr'];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <PageHeader
                title={title}
                breadcrumbs={[
                    { label: title }
                ]}
                image={page.heroImage || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070'}
            />

            <main className="container mx-auto px-4 py-16 flex-1">
                <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
                    <article className="prose prose-lg max-w-none text-gray-600 prose-headings:text-gray-900 prose-headings:font-bold prose-a:text-orange-600 hover:prose-a:text-orange-700">
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </article>
                </div>
            </main>
        </div>
    );
}
