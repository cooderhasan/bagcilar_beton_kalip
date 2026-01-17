import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { blogPosts } from '@/lib/blog';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    // In a real app, fetch metadata translations
    return {
        title: locale === 'tr' ? 'Blog | Bağcılar Beton Kalıp' : 'Blog | Bagcilar Concrete Formwork',
        description: locale === 'tr' ? 'Beton kalıp sistemleri hakkında güncel bilgiler, ipuçları ve sektör haberleri.' : 'Latest information, tips and industry news about concrete formwork systems.'
    };
}

export default function BlogPage() {
    const t = useTranslations('Blog');

    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">{t('title')}</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('subtitle')}</p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                            {/* Image Placeholder */}
                            <div className="h-48 bg-gray-200 w-full relative">
                                {/* In real implementation, use Next.js Image with post.image */}
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                    <span>{post.slug} image</span>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="text-sm text-accent font-semibold mb-2">{post.date}</div>
                                <h2 className="text-2xl font-bold text-primary mb-3 leading-tight">
                                    <Link href={`/blog/${post.slug}`} className="hover:text-accent transition-colors">
                                        {t(`posts.${post.id}.title`)}
                                    </Link>
                                </h2>
                                <p className="text-gray-600 mb-4 flex-grow">
                                    {t(`posts.${post.id}.summary`)}
                                </p>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="text-primary font-bold uppercase text-sm tracking-wider hover:text-accent transition-colors mt-auto inline-flex items-center"
                                >
                                    {t('readMore')} <span className="ml-2">&rarr;</span>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
