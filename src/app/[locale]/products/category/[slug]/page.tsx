import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import PageHeader from '@/components/ui/PageHeader';
import { notFound } from 'next/navigation';
import { Prisma } from '@prisma/client';

type CategoryWithCount = Prisma.CategoryGetPayload<{
    include: {
        _count: {
            select: { products: { where: { isActive: true } } }
        }
    }
}>;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    const baseUrl = 'https://bagcilarbetonkalip.com';

    const category = await prisma.category.findUnique({
        where: { slug },
    });

    if (!category) {
        return {
            title: locale === 'tr' ? 'Kategori Bulunamadı' : 'Category Not Found',
        };
    }

    const titleText = (category.title as any)[locale] || (category.title as any).tr;
    const descText = (category.description as any)?.[locale] || (category.description as any)?.tr;

    const title = locale === 'tr'
        ? `${titleText} | Bağcılar Beton Kalıp`
        : `${titleText} | Bagcilar Concrete Formwork`;

    const description = descText || (locale === 'tr'
        ? `${titleText} ve ilgili diğer beton kalıp sistemleri.`
        : `${titleText} and related concrete formwork systems.`);

    return {
        title,
        description,
        alternates: {
            canonical: `${baseUrl}/${locale}/products/category/${slug}`,
        },
        openGraph: {
            title,
            description,
            url: `${baseUrl}/${locale}/products/category/${slug}`,
            siteName: 'Bağcılar Beton Kalıp',
            locale: locale === 'tr' ? 'tr_TR' : 'en_US',
            type: 'website',
            images: category.image ? [{ url: category.image, alt: titleText }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: category.image ? [category.image] : [],
        },
    };
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;

    const t = await getTranslations({ locale, namespace: 'ProductCategories' });
    const tCommon = await getTranslations({ locale, namespace: 'Common' });

    // 1. Fetch the specific category to validte it exists and get title/desc
    const selectedCategory = await prisma.category.findUnique({
        where: { slug },
    });

    if (!selectedCategory) {
        notFound();
    }

    // 2. Fetch all categories for the filter links
    const categories = await prisma.category.findMany({
        orderBy: { order: 'asc' },
        include: {
            _count: {
                select: { products: { where: { isActive: true } } }
            }
        }
    });

    // 3. Fetch products filtered by this category
    const products = await prisma.product.findMany({
        where: {
            isActive: true,
            category: { slug }
        },
        include: { category: true },
        orderBy: { order: 'asc' }
    });

    const headerTitle = (selectedCategory.title as any)[locale] || (selectedCategory.title as any).tr;
    const headerDesc = (selectedCategory.description as any)?.[locale] || (selectedCategory.description as any)?.tr;
    // const headerImage = selectedCategory.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070';

    const breadcrumbs = [
        { label: t('title'), href: '/products' },
        { label: headerTitle }
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            <PageHeader
                title={headerTitle}
                // description={headerDesc} // Content moved below filters
                simple={true}
                breadcrumbs={breadcrumbs}
            />

            {/* Category Filter */}
            <section className="py-8 bg-white border-b">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap gap-3 mb-8">
                        <Link
                            href="/products"
                            className="px-4 py-2 rounded-full font-semibold transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
                        >
                            {/* We don't have total count here easily unless we fetch all products, 
                                but standard practice is just "All" or fetching aggregate. 
                                For now, let's keep it simple or fetch aggregate if needed. 
                                Let's just say "Tümü" */}
                            {locale === 'tr' ? 'Tümü' : 'All'}
                        </Link>
                        {categories.map((cat: CategoryWithCount) => (
                            <Link
                                key={cat.id}
                                href={`/products/category/${cat.slug}`}
                                className={`px-4 py-2 rounded-full font-semibold transition-colors ${slug === cat.slug
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {(cat.title as any)[locale] || (cat.title as any).tr} ({cat._count.products})
                            </Link>
                        ))}
                    </div>

                    {/* Category Description - Full Width Below Filters */}
                    {headerDesc && (
                        <div className="max-w-5xl mx-auto mt-8">
                            <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-300">
                                {/* Decorative Icon Background */}
                                <div className="absolute -top-6 -right-6 text-orange-50 pointer-events-none transform rotate-12 group-hover:rotate-6 transition-transform duration-700">
                                    <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                                    </svg>
                                </div>

                                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                                    {/* Left Accent Bar */}
                                    <div className="hidden md:block w-1 h-32 bg-gradient-to-b from-orange-400 to-amber-300 rounded-full flex-shrink-0" />

                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="bg-orange-100 text-orange-600 p-2 rounded-lg">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </span>
                                            <h2 className="text-xl font-bold text-gray-900">
                                                {headerTitle} {tCommon('about')}
                                            </h2>
                                        </div>

                                        <div className="prose prose-lg text-gray-600 font-light leading-relaxed max-w-none">
                                            {/<[a-z][\s\S]*>/i.test(headerDesc) ? (
                                                <div dangerouslySetInnerHTML={{ __html: headerDesc }} />
                                            ) : (
                                                <p>{headerDesc}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {products.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Henüz ürün yok</h3>
                            <p className="text-gray-600">Bu kategoride henüz ürün bulunmuyor.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product: any) => {
                                const title = (product.title as any)[locale] || (product.title as any).tr;
                                const categoryTitle = (product.category.title as any)[locale] || (product.category.title as any).tr;

                                return (
                                    <Link
                                        key={product.id}
                                        href={`/products/${product.slug}`}
                                        className="group block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        {/* Image */}
                                        <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                                            {product.images.length > 0 ? (
                                                <Image
                                                    src={product.images[0]}
                                                    alt={title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    unoptimized
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}

                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <span className="inline-flex items-center gap-2 text-white text-sm font-semibold">
                                                        {tCommon('readMore')}
                                                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Category Badge */}
                                            <div className="absolute top-4 left-4">
                                                <span className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                                    {categoryTitle}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5">
                                            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors line-clamp-1">
                                                {title}
                                            </h3>
                                            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                                                {(product.description as any)[locale] || (product.description as any).tr}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-orange-500 to-amber-500 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                        Özel Projeniz Mi Var?
                    </h2>
                    <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                        İhtiyaçlarınıza özel kalıp tasarımı için uzman ekibimizle iletişime geçin.
                    </p>
                    <Link
                        href="/quote"
                        className="inline-flex items-center gap-2 bg-white text-orange-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
                    >
                        {tCommon('contactUs')}
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </section>
        </div>
    );
}
