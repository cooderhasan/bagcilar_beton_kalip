import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import ProductGallery from '@/components/product/ProductGallery';

export async function generateStaticParams() {
    const products = await prisma.product.findMany({
        where: { isActive: true },
        select: { slug: true }
    });

    return products.map((product) => ({
        slug: product.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;

    const product = await prisma.product.findUnique({
        where: { slug },
        include: { category: true }
    });

    if (!product) return { title: 'Not Found' };

    const title = (product.title as any)[locale] || (product.title as any).tr;
    const description = (product.description as any)[locale] || (product.description as any).tr;

    return {
        title: product.seoTitle || `${title} | Bağcılar Beton Kalıp`,
        description: product.seoDescription || description,
    };
}

// YouTube URL'den embed ID çıkaran yardımcı fonksiyon
function getYouTubeEmbedId(url: string | null): string | null {
    if (!url) return null;

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11) ? match[2] : null;
}

export default async function ProductDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const product = await prisma.product.findUnique({
        where: { slug },
        include: { category: true }
    });

    if (!product) {
        notFound();
    }

    const title = (product.title as any)[locale] || (product.title as any).tr;
    const description = (product.description as any)[locale] || (product.description as any).tr;
    const categoryTitle = (product.category.title as any)[locale] || (product.category.title as any).tr;
    const features = product.features as string[] || [];
    const videoEmbedId = getYouTubeEmbedId((product as any).videoUrl);

    const tCommon = await getTranslations({ locale, namespace: 'Common' });

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-16 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-4 relative z-10">
                    {/* Breadcrumb */}
                    <nav className="mb-8">
                        <ol className="flex items-center gap-2 text-sm">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    Ana Sayfa
                                </Link>
                            </li>
                            <li className="text-gray-600">/</li>
                            <li>
                                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                                    Ürünler
                                </Link>
                            </li>
                            <li className="text-gray-600">/</li>
                            <li>
                                <Link href={`/products?category=${product.category.slug}`} className="text-gray-400 hover:text-white transition-colors">
                                    {categoryTitle}
                                </Link>
                            </li>
                            <li className="text-gray-600">/</li>
                            <li className="text-orange-400 font-medium">{title}</li>
                        </ol>
                    </nav>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 text-orange-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                {categoryTitle}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">{title}</h1>
                        </div>

                        <Link
                            href="/quote"
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105 transform whitespace-nowrap"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            {tCommon('getQuote')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Product Content */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Left: Images & Video */}
                        <div className="space-y-6 lg:sticky lg:top-32 h-fit">
                            {/* Product Gallery */}
                            <ProductGallery images={product.images} title={title as string} />

                            {/* YouTube Video */}
                            {videoEmbedId && (
                                <div className="mt-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                        </svg>
                                        Ürün Videosu
                                    </h3>
                                    <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-xl">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${videoEmbedId}`}
                                            title="Ürün Videosu"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="absolute inset-0 w-full h-full"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right: Info */}
                        <div className="lg:sticky lg:top-32">
                            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200 border border-gray-100 p-8 space-y-8">
                                {/* Description */}
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Ürün Açıklaması</h2>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {description}
                                    </p>
                                </div>

                                {/* Features */}
                                {features.length > 0 && (
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Teknik Özellikler
                                        </h3>
                                        <ul className="space-y-3">
                                            {features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-gray-700 font-medium">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* CTA Buttons */}
                                <div className="space-y-4 pt-6 border-t border-gray-100">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <Link
                                            href="/quote"
                                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-3 rounded-xl font-semibold text-base hover:from-orange-600 hover:to-amber-600 transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            Teklif Al
                                        </Link>
                                        <a
                                            href="https://wa.me/905555555555"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 bg-white border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white px-4 py-3 rounded-xl font-semibold text-base transition-all shadow-sm hover:shadow-md transform hover:scale-[1.02]"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                            WhatsApp
                                        </a>
                                    </div>
                                </div>

                                {/* Share */}
                                <div className="flex items-center justify-center gap-4 pt-4">
                                    <span className="text-sm text-gray-500">Paylaş:</span>
                                    <div className="flex items-center gap-2">
                                        <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white flex items-center justify-center text-gray-500 transition-all">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                        </button>
                                        <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center text-gray-500 transition-all">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                        </button>
                                        <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#0077B5] hover:text-white flex items-center justify-center text-gray-500 transition-all">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Back Button */}
            <section className="pb-16">
                <div className="container mx-auto px-4">
                    <Link
                        href={`/products?category=${product.category.slug}`}
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors font-medium"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Tüm {categoryTitle} Ürünleri
                    </Link>
                </div>
            </section>
        </div>
    );
}
