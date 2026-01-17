import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/blog';

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) return { title: 'Not Found' };

    return {
        title: `${slug.replace(/-/g, ' ')} | Blog`,
    };
}

export default async function BlogPostPage({
    params
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { slug, locale } = await params;
    // Enable static rendering
    setRequestLocale(locale);

    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    // Use async getTranslations for Server Components
    const t = await getTranslations({ locale, namespace: 'Blog' });

    return (
        <article className="min-h-screen bg-white">
            {/* Article Header */}
            <div className="bg-primary text-white py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <Link href="/blog" className="text-accent hover:text-white transition-colors mb-6 inline-block font-semibold">
                        &larr; {t('latestPosts')}
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                        {t(`posts.${post.id}.title`)}
                    </h1>
                    <div className="flex items-center text-gray-400 text-sm">
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>Bağcılar Beton Kalıp</span>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="container mx-auto px-4 max-w-4xl py-12">
                <div className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-accent">
                    {/* Image Placeholder */}
                    <div className="bg-gray-100 rounded-lg p-12 text-center mb-12 border border-gray-200">
                        <p className="text-gray-500 italic">Blog Image: {post.slug}</p>
                    </div>

                    <div className="text-xl leading-relaxed text-gray-700 mb-8">
                        {t(`posts.${post.id}.summary`)}
                    </div>

                    <div className="text-gray-600 leading-relaxed">
                        {t(`posts.${post.id}.content`)}
                    </div>
                </div>

                {/* Navigation / CTA */}
                <div className="mt-16 pt-8 border-t border-gray-100">
                    <h3 className="text-2xl font-bold text-primary mb-6">{t('relatedPosts')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {blogPosts.filter(p => p.id !== post.id).slice(0, 2).map(otherPost => (
                            <Link key={otherPost.id} href={`/blog/${otherPost.slug}`} className="block p-6 border border-gray-100 rounded hover:shadow-lg transition-shadow">
                                <div className="text-sm text-accent mb-1">{otherPost.date}</div>
                                <div className="font-bold text-primary">{t(`posts.${otherPost.id}.title`)}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}
