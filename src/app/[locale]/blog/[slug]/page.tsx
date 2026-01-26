import { getTranslations, setRequestLocale, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import JsonLd from '@/components/seo/JsonLd';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
    const posts = await prisma.blogPost.findMany({
        where: { published: true },
        select: { slug: true }
    });

    return posts.map((post: { slug: string }) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    const baseUrl = 'https://bagcilarbetonkalip.com';

    const post = await prisma.blogPost.findUnique({
        where: { slug }
    });

    if (!post) return { title: 'Not Found' };

    const title = post.seoTitle || (post.title as any)?.[locale] || 'Blog';
    const description = post.seoDescription || (post.excerpt as any)?.[locale] || '';

    return {
        title,
        description,
        alternates: {
            canonical: `${baseUrl}/${locale}/blog/${slug}`,
        },
        openGraph: {
            title,
            description,
            url: `${baseUrl}/${locale}/blog/${slug}`,
            siteName: 'Bağcılar Beton Kalıp',
            locale: locale === 'tr' ? 'tr_TR' : 'en_US',
            type: 'article',
            publishedTime: post.createdAt.toISOString(),
            modifiedTime: post.updatedAt.toISOString(),
            images: post.image ? [{ url: post.image, alt: title }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: post.image ? [post.image] : [],
        },
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

    let post;
    try {
        post = await prisma.blogPost.findUnique({
            where: { slug }
        });
    } catch (error) {
        console.error('Blog post fetch error:', error);
        notFound();
    }

    if (!post) {
        notFound();
    }

    const relatedPosts = await prisma.blogPost.findMany({
        where: {
            published: true,
            slug: { not: slug }
        },
        orderBy: { createdAt: 'desc' },
        take: 2
    });

    // Use async getTranslations for Server Components
    const t = await getTranslations({ locale, namespace: 'Blog' });

    const title = (post.title as any)?.[locale] || '';
    const content = (post.content as any)?.[locale] || '';
    const summary = (post.excerpt as any)?.[locale] || '';

    return (
        <article className="min-h-screen bg-white">
            {/* JSON-LD Schema for Blog Posting */}
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": title.substring(0, 110),
                "image": post.image ? [post.image] : undefined,
                "datePublished": post.createdAt.toISOString(),
                "dateModified": post.updatedAt.toISOString(),
                "author": {
                    "@type": "Organization",
                    "name": "Bağcılar Beton Kalıp"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Bağcılar Beton Kalıp",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://bagcilarbetonkalip.com/logo.png"
                    }
                },
                "description": summary || title
            }} />

            {/* Article Header */}
            <div className="bg-primary text-white py-8">
                <div className="container mx-auto px-4 max-w-4xl">
                    <Link href="/blog" className="text-accent hover:text-white transition-colors mb-6 inline-block font-semibold">
                        &larr; {t('latestPosts')}
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                        {title}
                    </h1>
                    <div className="flex items-center text-gray-400 text-sm">
                        <span>
                            {new Date(post.createdAt).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                        <span className="mx-2">•</span>
                        <span>Bağcılar Beton Kalıp</span>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="container mx-auto px-4 max-w-4xl py-12">
                <div className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-accent">
                    {/* Image Placeholder */}
                    {post.image && (
                        <div className="rounded-lg overflow-hidden mb-12 border border-gray-200 shadow-sm">
                            <img src={post.image} alt={title} className="w-full h-auto" />
                        </div>
                    )}

                    {summary && (
                        <div className="text-xl leading-relaxed text-gray-700 mb-8 font-medium">
                            {summary}
                        </div>
                    )}

                    <div className="text-gray-600 leading-relaxed rich-text" dangerouslySetInnerHTML={{ __html: content }} />
                </div>

                {/* Navigation / CTA */}
                <div className="mt-16 pt-8 border-t border-gray-100">
                    <h3 className="text-2xl font-bold text-primary mb-6">{t('relatedPosts')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {relatedPosts.map((otherPost: any) => {
                            const otherTitle = (otherPost.title as any)?.[locale] || '';
                            return (
                                <Link key={otherPost.id} href={`/blog/${otherPost.slug}`} className="block p-6 border border-gray-100 rounded hover:shadow-lg transition-shadow">
                                    <div className="text-sm text-accent mb-1">
                                        {new Date(otherPost.createdAt).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                    <div className="font-bold text-primary line-clamp-2">{otherTitle}</div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </article>
    );
}
