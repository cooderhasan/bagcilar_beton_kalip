import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import PageHeader from '@/components/ui/PageHeader';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return {
        title: locale === 'tr' ? 'Ürünlerimiz | Bağcılar Beton Kalıp' : 'Our Products | Bagcilar Concrete Formwork',
        description: locale === 'tr' ? 'Beton kalıp sistemleri, perde, kolon, döşeme kalıpları ve aksesuarlar.' : 'Concrete formwork systems, wall, column, slab formworks and accessories.'
    };
}

export default async function ProductsPage({
    params,
    searchParams
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ category?: string }>;
}) {
    const { locale } = await params;
    const { category: categorySlug } = await searchParams;

    const t = await getTranslations({ locale, namespace: 'ProductCategories' });
    const tCommon = await getTranslations({ locale, namespace: 'Common' });

    // Fetch categories and products
    const categories = await prisma.category.findMany({
        orderBy: { order: 'asc' },
        include: {
            _count: {
                select: { products: { where: { isActive: true } } }
            }
        }
    });

    // Fetch products (filtered by category if specified)
    const products = await prisma.product.findMany({
        where: {
            isActive: true,
            ...(categorySlug ? { category: { slug: categorySlug } } : {})
        },
        include: { category: true },
        orderBy: { order: 'asc' }
    });

    // Find selected category
    const selectedCategory = categorySlug
        ? categories.find(c => c.slug === categorySlug)
        : null;



    const headerTitle = selectedCategory
        ? (selectedCategory.title as any)[locale] || (selectedCategory.title as any).tr
        : t('title');

    const headerDesc = selectedCategory
        ? (selectedCategory.description as any)?.[locale] || (selectedCategory.description as any)?.tr
        : t('desc');

    const headerImage = selectedCategory?.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070';

    const breadcrumbs = [
        { label: t('title'), href: selectedCategory ? '/products' : undefined },
        ...(selectedCategory ? [{ label: (selectedCategory.title as any)[locale] || (selectedCategory.title as any).tr }] : [])
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            <PageHeader
                title={headerTitle}
                description={headerDesc}
                image={headerImage}
                breadcrumbs={breadcrumbs}
            />

            {/* Category Filter - Only show when no category is selected */}
            {!categorySlug && (
                <section className="py-8 bg-white border-b">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/products"
                                className={`px-4 py-2 rounded-full font-semibold transition-colors ${!categorySlug
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Tümü ({products.length})
                            </Link>
                            {categories.map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`/products?category=${cat.slug}`}
                                    className={`px-4 py-2 rounded-full font-semibold transition-colors ${categorySlug === cat.slug
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {(cat.title as any)[locale] || (cat.title as any).tr} ({cat._count.products})
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

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
                            {products.map((product) => {
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
