import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { prisma } from '@/lib/prisma';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    // In a real app, fetch metadata translations
    return {
        title: locale === 'tr' ? 'Blog | Bağcılar Beton Kalıp' : 'Blog | Bagcilar Concrete Formwork',
        description: locale === 'tr' ? 'Beton kalıp sistemleri hakkında güncel bilgiler, ipuçları ve sektör haberleri.' : 'Latest information, tips and industry news about concrete formwork systems.'
    };
}

import PageHeader from '@/components/ui/PageHeader';

export default async function BlogPage() {
    const t = await getTranslations('Blog');
    const locale = await getLocale();

    const posts = await prisma.blogPost.findMany({
        where: {
            published: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return (
        <div className="bg-gray-50 min-h-screen">
            <PageHeader
                title={t('title')}
                description={t('subtitle')}
                image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2031"
                breadcrumbs={[
                    { label: t('title') }
                ]}
            />

            <div className="container mx-auto px-4 py-16">

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            {locale === 'tr' ? 'Henüz blog yazısı bulunmuyor.' : 'No blog posts yet.'}
                        </div>
                    ) : (
                        posts.map((post) => {
                            const title = (post.title as any)?.[locale] || '';
                            const excerpt = (post.excerpt as any)?.[locale] || '';

                            return (
                                <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                                    {/* Image Placeholder */}
                                    <div className="h-48 bg-gray-200 w-full relative overflow-hidden">
                                        {post.image ? (
                                            <img
                                                src={post.image}
                                                alt={title}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                                                <span>{title}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="text-sm text-accent font-semibold mb-2">
                                            {new Date(post.createdAt).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </div>
                                        <h2 className="text-2xl font-bold text-primary mb-3 leading-tight line-clamp-2">
                                            <Link href={`/blog/${post.slug}`} className="hover:text-accent transition-colors">
                                                {title}
                                            </Link>
                                        </h2>
                                        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                                            {excerpt}
                                        </p>
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="text-primary font-bold uppercase text-sm tracking-wider hover:text-accent transition-colors mt-auto inline-flex items-center"
                                        >
                                            {t('readMore')} <span className="ml-2">&rarr;</span>
                                        </Link>
                                    </div>
                                </article>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
