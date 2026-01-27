import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getCachedSiteSettings } from '@/lib/settings-cache';
import Link from 'next/link';
import Image from 'next/image';
import ProductGallery from '@/components/product/ProductGallery';
import JsonLd from '@/components/seo/JsonLd';
import ProductShare from '@/components/product/ProductShare';

// Force dynamic rendering to prevent DYNAMIC_SERVER_USAGE errors
export const dynamic = 'force-dynamic';


export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    const baseUrl = 'https://bagcilarbetonkalip.com';

    const product = await prisma.product.findUnique({
        where: { slug },
        include: { category: true }
    });

    if (!product) return { title: 'Not Found' };

    const title = product.seoTitle || ((product.title as any)?.[locale] || (product.title as any)?.tr) || 'Ürün Detayı';
    const description = product.seoDescription || ((product.description as any)?.[locale] || (product.description as any)?.tr) || '';
    const images = Array.isArray(product.images) && product.images.length > 0 ? product.images : [];

    return {
        title: `${title} | Bağcılar Beton Kalıp`,
        description,
        alternates: {
            canonical: `${baseUrl}/${locale}/products/${slug}`,
        },
        openGraph: {
            title: `${title} | Bağcılar Beton Kalıp`,
            description,
            url: `${baseUrl}/${locale}/products/${slug}`,
            siteName: 'Bağcılar Beton Kalıp',
            locale: locale === 'tr' ? 'tr_TR' : 'en_US',
            type: 'website',
            images: images.length > 0 ? [{ url: images[0] as string, alt: title }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} | Bağcılar Beton Kalıp`,
            description,
            images: images.length > 0 ? [images[0] as string] : [],
        },
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

    const title = ((product.title as any)?.[locale] || (product.title as any)?.tr) || 'Ürün';
    const description = ((product.description as any)?.[locale] || (product.description as any)?.tr) || '';
    const categoryTitle = ((product.category?.title as any)?.[locale] || (product.category?.title as any)?.tr) || 'Kategori';
    const features = product.features as string[] || [];
    const videoEmbedId = getYouTubeEmbedId((product as any).videoUrl);

    // Fetch settings for dynamic WhatsApp number
    const siteSettings = await getCachedSiteSettings();
    const whatsappPhone = siteSettings?.phone?.replace(/[^0-9]/g, '') || '905326763488';

    const tCommon = await getTranslations({ locale, namespace: 'Common' });
    const categorySlug = product.category?.slug || '#';

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pb-20 pt-8">
            <JsonLd data={{
                "@context": "https://schema.org/",
                "@type": "Product",
                "name": title,
                "image": Array.isArray(product.images) && product.images.length > 0 ? product.images : [],
                "description": description || title,
                "brand": {
                    "@type": "Brand",
                    "name": "Bağcılar Beton Kalıp"
                },
                "manufacturer": {
                    "@type": "Organization",
                    "name": "Bağcılar Beton Kalıp"
                },
                "category": categoryTitle,
                "offers": {
                    "@type": "Offer",
                    "priceCurrency": "TRY",
                    "availability": "https://schema.org/InStock",
                    "price": "0", // Fiyat değişken olduğu için 0 veya sembolik, ya da InStock yeterli
                    "url": `https://bagcilarbetonkalip.com/${locale}/products/${slug}`
                }
            }} />
            <div className="container mx-auto px-4">
                {/* Breadcrumb - Enhanced */}
                <nav className="mb-8">
                    <ol className="flex items-center flex-wrap gap-2 text-sm text-gray-500">
                        <li>
                            <Link href="/" className="hover:text-orange-500 transition-all duration-200 flex items-center gap-1 hover:gap-1.5">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Ana Sayfa
                            </Link>
                        </li>
                        <li className="text-gray-300">/</li>
                        <li>
                            <Link href="/products" className="hover:text-orange-500 transition-all duration-200">
                                Ürünler
                            </Link>
                        </li>
                        <li className="text-gray-300">/</li>
                        <li>
                            <Link href={`/products?category=${categorySlug}`} className="hover:text-orange-500 transition-all duration-200">
                                {categoryTitle}
                            </Link>
                        </li>
                        <li className="text-gray-300">/</li>
                        <li className="text-gray-900 font-semibold truncate max-w-[200px] md:max-w-none">{title}</li>
                    </ol>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 lg:items-start">
                    {/* Left Column: Gallery & Video */}
                    <div className="lg:sticky lg:top-24 space-y-6">
                        {/* Product Gallery */}
                        <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 p-3 hover:border-orange-200">
                            {/* Validated images array to prevent crash */}
                            <ProductGallery images={Array.isArray(product.images) ? product.images : []} title={(title || "Product") as string} />
                        </div>

                        {/* YouTube Video */}
                        {videoEmbedId && (
                            <div className="relative bg-gradient-to-br from-red-50 via-white to-orange-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-red-100 p-6 md:p-8 overflow-hidden">
                                {/* Decorative gradient overlay */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-100/30 to-orange-100/30 rounded-full blur-3xl -z-0" />

                                <div className="relative z-10">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-200">
                                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                            </svg>
                                        </div>
                                        <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                                            Ürün Tanıtım Videosu
                                        </span>
                                    </h3>
                                    <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-900/10">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${videoEmbedId}`}
                                            title="Ürün Videosu"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="absolute inset-0 w-full h-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Product Info */}
                    <div className="space-y-6">
                        {/* Header Block */}
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8">
                            <div className="flex items-center gap-2 mb-5">
                                <Link
                                    href={`/products?category=${categorySlug}`}
                                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    {categoryTitle}
                                </Link>
                                {product.isActive && (
                                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-md">
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Stokta
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text">
                                {title}
                            </h1>

                            <div className="prose prose-lg text-gray-600 leading-relaxed mb-8 border-l-4 border-orange-500 pl-4 py-2 bg-orange-50/30 rounded-r-lg">
                                <p className="m-0">{description}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <Link
                                    href="/quote"
                                    className="group flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-300 shadow-xl shadow-orange-200 hover:shadow-2xl hover:shadow-orange-300 hover:-translate-y-1"
                                >
                                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    {tCommon('getQuote')}
                                </Link>
                                <a
                                    href={`https://wa.me/${whatsappPhone}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#25D366] to-[#20bd5a] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-[#20bd5a] hover:to-[#1ea952] transition-all duration-300 shadow-xl shadow-green-200 hover:shadow-2xl hover:shadow-green-300 hover:-translate-y-1"
                                >
                                    <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* Features Block */}
                        {features.length > 0 && (
                            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-gray-200 p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-200">
                                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span className="bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                                        {tCommon('technicalSpecs')}
                                    </span>
                                </h3>
                                <ul className="grid grid-cols-1 gap-3">
                                    {Array.isArray(features) && features.map((feature: any, idx) => {
                                        let featureText = "";
                                        if (typeof feature === 'string') {
                                            featureText = feature;
                                        } else if (typeof feature === 'object' && feature !== null) {
                                            featureText = (feature as any)[locale] || (feature as any).tr || "";
                                        }

                                        if (!featureText) return null;

                                        return (
                                            <li key={idx} className="group flex items-start gap-3 text-sm text-gray-700 bg-white p-3 rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-200">
                                                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:from-orange-200 group-hover:to-orange-300 transition-all">
                                                    <svg className="w-3.5 h-3.5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <span className="flex-1 leading-relaxed">{featureText}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}

                        {/* Share */}
                        <ProductShare title={(title || "Product") as string} />

                    </div>
                </div>
            </div>
        </div>
    );
}

