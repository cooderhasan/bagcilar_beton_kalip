import { getTranslations, getLocale } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { productCategories } from '@/lib/products';

import { prisma } from '@/lib/prisma';
import { getCachedSiteSettings } from '@/lib/settings-cache';
import JsonLd from '@/components/seo/JsonLd';

const baseUrl = 'https://bagcilarbetonkalip.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const title = locale === 'tr'
    ? 'Bağcılar Beton Kalıp | Profesyonel Kalıp Sistemleri'
    : 'Bagcilar Concrete Formwork | Professional Formwork Systems';

  const description = locale === 'tr'
    ? 'Türkiye\'nin önde gelen beton kalıp sistemleri üreticisi. Perde, kolon, döşeme kalıpları ve inşaat aksesuarları. 20+ yıllık tecrübe.'
    : 'Turkey\'s leading concrete formwork systems manufacturer. Wall, column, slab formwork and construction accessories. 20+ years of experience.';

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'tr': `${baseUrl}/tr`,
        'en': `${baseUrl}/en`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}`,
      siteName: 'Bağcılar Beton Kalıp',
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Bağcılar Beton Kalıp - Profesyonel Kalıp Sistemleri',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/images/og-image.jpg`],
    },
  };
}


export default async function HomePage() {
  const tHero = await getTranslations('Hero');
  const tProducts = await getTranslations('ProductCategories');
  const tWhyUs = await getTranslations('WhyUs');
  const tHome = await getTranslations('HomePage');
  const locale = await getLocale();

  // Veritabanından veri çekme
  const [sliders, heroSection, statistics, categories, siteSettings, latestPosts, faqs] = await Promise.all([
    prisma.slider.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    }),
    prisma.heroSection.findUnique({ where: { id: 1 } }),
    prisma.statistic.findMany({ orderBy: { order: 'asc' } }),
    prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { products: { where: { isActive: true } } }
        }
      }
    }),
    getCachedSiteSettings(),
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 2
    }),
    prisma.fAQ.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
  ]);

  // Hero section için fallback
  const heroData = heroSection || {
    backgroundImage: '/images/hero.png',
    title: { tr: tHero('title'), en: tHero('title') },
    subtitle: { tr: tHero('subtitle'), en: tHero('subtitle') },
    primaryCtaText: { tr: tHero('cta'), en: tHero('cta') },
    primaryCtaLink: '/quote',
    secondaryCtaText: { tr: tHero('secondaryCta'), en: tHero('secondaryCta') },
    secondaryCtaLink: '/projects',
  };

  // Prepare FAQ Schema
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq: any) => ({
      "@type": "Question",
      "name": (faq.question as any)?.[locale] || (faq.question as any)?.tr,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": (faq.answer as any)?.[locale] || (faq.answer as any)?.tr
      }
    }))
  } : null;

  return (
    <main className="flex flex-col min-h-screen">
      {faqSchema && <JsonLd data={faqSchema} />}

      {/* SLIDER / HERO SECTION */}
      {sliders.length > 0 ? (
        // Slider varsa slider göster
        <section className="relative h-[85vh] w-full bg-gray-900 flex items-center">
          {/* Şu an tek slider gösteriyoruz, ileride carousel yapılabilir */}
          {sliders.map((slider: any, index: number) => {
            const title = (slider.title as any)?.[locale] || (slider.title as any)?.tr;
            const description = (slider.description as any)?.[locale] || (slider.description as any)?.tr;
            const ctaText = (slider.ctaText as any)?.[locale] || (slider.ctaText as any)?.tr;

            return (
              <div key={slider.id} className={index === 0 ? 'w-full h-full' : 'hidden'}>
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={slider.image}
                    alt={title}
                    fill
                    className="object-cover opacity-60"
                    priority={index === 0}
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 relative z-10 text-white h-full flex items-center">
                  <div className="max-w-3xl animate-fade-in-up">
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
                      {title}
                    </h1>
                    {description && (
                      <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light max-w-2xl">
                        {description}
                      </p>
                    )}
                    {slider.link && ctaText && (
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                          href={slider.link}
                          className="bg-accent hover:bg-amber-600 text-white font-bold py-4 px-8 rounded transition duration-300 text-center uppercase tracking-wider"
                        >
                          {ctaText}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      ) : (
        // Slider yoksa hero section göster (fallback)
        <section className="relative h-[85vh] w-full bg-gray-900 flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={heroData.backgroundImage || '/images/hero.png'}
              alt="Industrial Concrete Formwork Construction Site"
              fill
              className="object-cover opacity-60"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 relative z-10 text-white">
            <div className="max-w-3xl animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
                {(heroData.title as any)?.[locale] || (heroData.title as any)?.tr || tHero('title')}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light max-w-2xl">
                {(heroData.subtitle as any)?.[locale] || (heroData.subtitle as any)?.tr || tHero('subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={heroData.primaryCtaLink}
                  className="bg-accent hover:bg-amber-600 text-white font-bold py-4 px-8 rounded transition duration-300 text-center uppercase tracking-wider"
                >
                  {(heroData.primaryCtaText as any)?.[locale] || (heroData.primaryCtaText as any)?.tr || tHero('cta')}
                </Link>
                {heroData.secondaryCtaLink && (
                  <Link
                    href={heroData.secondaryCtaLink}
                    className="bg-transparent border-2 border-white hover:bg-white hover:text-primary text-white font-bold py-4 px-8 rounded transition duration-300 text-center uppercase tracking-wider"
                  >
                    {(heroData.secondaryCtaText as any)?.[locale] || (heroData.secondaryCtaText as any)?.tr || tHero('secondaryCta')}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PRODUCT CATEGORIES SUMMARY */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">{tProducts('title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{tProducts('desc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category: any) => {
              const title = (category.title as any)?.[locale] || (category.title as any)?.tr;
              const description = (category.description as any)?.[locale] || (category.description as any)?.tr;

              return (
                <Link
                  key={category.id}
                  href={`/products/category/${category.slug}`}
                  className="group block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Image Area */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                    ) : (
                      <Image
                        src="/images/products/product-placeholder.png"
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-flex items-center gap-2 text-white text-sm font-semibold">
                          İncele
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        {category._count.products} Ürün
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors line-clamp-1">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                      {description || 'Kaliteli beton kalıp çözümleri.'}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all"
            >
              {locale === 'tr' ? 'Tüm Ürünleri Gör' : 'View All Products'}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ROW 1: SEO TEXT + FAQ (2 columns) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* LEFT: SEO Content */}
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {(siteSettings?.homeIntroTitle as any)?.[locale] || (locale === 'tr' ? 'Bağcılar Beton Kalıp' : 'Bagcilar Concrete Formwork')}
                </h2>
              </div>

              {(siteSettings?.homeIntroContent as any)?.[locale] ? (
                <div
                  className="prose prose-sm text-gray-600 leading-relaxed [&>p]:mb-3 [&>strong]:text-orange-600 [&>b]:text-orange-600"
                  dangerouslySetInnerHTML={{ __html: ((siteSettings?.homeIntroContent as any)?.[locale] || '').replace(/\n/g, '<br />') }}
                />
              ) : (
                <p className="text-gray-600 leading-relaxed">
                  {locale === 'tr'
                    ? 'Beton kalıp sektöründe 20 yılı aşkın tecrübemizle, en kaliteli ürünleri en uygun fiyatlarla sunuyoruz. Türkiye genelinde hizmet vermekteyiz.'
                    : 'With over 20 years of experience in the concrete formwork industry, we offer the highest quality products at the most affordable prices.'}
                </p>
              )}
            </div>

            {/* RIGHT: FAQ Inline */}
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {locale === 'tr' ? 'Sıkça Sorulan Sorular' : 'FAQ'}
                </h2>
              </div>

              {/* Inline FAQ Accordion */}
              {(faqs as any[]).length > 0 ? (
                <div className="space-y-2">
                  {(faqs as any[]).slice(0, 7).map((faq: any, index: number) => {
                    const question = (faq.question as any)?.[locale] || (faq.question as any)?.tr;
                    const answer = (faq.answer as any)?.[locale] || (faq.answer as any)?.tr;
                    return (
                      <details key={faq.id} className="group" open={index === 0}>
                        <summary className="flex items-center justify-between cursor-pointer p-3 bg-white rounded-lg border border-gray-100 hover:border-orange-200 transition-colors">
                          <span className="font-medium text-gray-800 text-sm">{question}</span>
                          <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <div className="px-3 py-2 text-sm text-gray-600">
                          {answer}
                        </div>
                      </details>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  {locale === 'tr' ? 'Henüz SSS eklenmedi.' : 'No FAQ added yet.'}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ROW 2: SERVICES + BLOG + CATALOG (3 columns) */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* LEFT: Services (50% Width) */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                {(siteSettings?.homeServicesTitle as any)?.[locale] || (locale === 'tr' ? 'Hizmetlerimiz' : 'Our Services')}
              </h3>

              {(siteSettings?.homeServicesContent as any)?.[locale] ? (
                <div
                  className="prose prose-sm max-w-none text-gray-600 leading-relaxed [&>p]:mb-3 [&>strong]:text-orange-600 [&>b]:text-orange-600 [&_ul]:list-none [&_ul]:pl-0 [&_ul]:space-y-3 [&_ul]:grid [&_ul]:grid-cols-1 [&_ul]:md:grid-cols-2 [&_ul]:gap-x-8 [&_li]:flex [&_li]:items-start [&_li]:gap-3 [&_li::before]:content-['✓'] [&_li::before]:flex [&_li::before]:items-center [&_li::before]:justify-center [&_li::before]:w-6 [&_li::before]:h-6 [&_li::before]:rounded-full [&_li::before]:bg-orange-500 [&_li::before]:text-white [&_li::before]:text-[10px] [&_li::before]:font-bold [&_li::before]:flex-shrink-0"
                  dangerouslySetInnerHTML={{ __html: ((siteSettings?.homeServicesContent as any)?.[locale] || '').replace(/\n/g, '<br />') }}
                />
              ) : (
                <ul className="space-y-3 text-gray-600 text-sm grid grid-cols-1 md:grid-cols-2 gap-x-8">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                      <svg className="w-3.5 h-3.5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {locale === 'tr' ? 'Profesyonel beton kalıp sistemleri' : 'Professional concrete formwork'}
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                      <svg className="w-3.5 h-3.5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {locale === 'tr' ? 'Yüksek kalite malzeme' : 'High quality materials'}
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                      <svg className="w-3.5 h-3.5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {locale === 'tr' ? 'Teknik destek hizmeti' : 'Technical support'}
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                      <svg className="w-3.5 h-3.5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {locale === 'tr' ? 'Türkiye geneli teslimat' : 'Nationwide delivery'}
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                      <svg className="w-3.5 h-3.5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {locale === 'tr' ? 'Kiralama hizmeti' : 'Rental service'}
                  </li>
                </ul>
              )}

            </div>

            {/* RIGHT SIDEBAR: Blog + Catalog (50% Width -> 2 Columns inside) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">

              {/* Blog */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      {locale === 'tr' ? 'Blog' : 'Blog'}
                    </h3>
                    <Link href="/blog" className="text-orange-500 font-semibold hover:text-orange-600 transition-colors text-xs">
                      {locale === 'tr' ? 'Tümü →' : 'All →'}
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {latestPosts.map((post: any) => {
                      const title = (post.title as any)?.[locale] || (post.title as any)?.tr || 'Başlıksız';
                      return (
                        <Link
                          key={post.id}
                          href={`/blog/${post.slug}`}
                          className="group block"
                        >
                          <p className="text-xs text-orange-500 font-medium mb-1">
                            {new Date(post.createdAt).toLocaleDateString('tr-TR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                          <h4 className="font-semibold text-gray-800 group-hover:text-orange-500 transition-colors line-clamp-2 text-sm leading-snug">
                            {title}
                          </h4>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-orange-500 font-semibold mt-4 hover:text-orange-600 transition-colors text-sm"
                >
                  {locale === 'tr' ? 'Tüm Haberler →' : 'All News →'}
                </Link>
              </div>

              {/* Catalog */}
              <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-6 text-white flex flex-col justify-between shadow-lg shadow-orange-500/20 h-full">
                <div>
                  <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{tHome('catalog.title')}</h3>
                  <p className="text-white/80 text-sm mb-6">
                    {tHome('catalog.description')}
                  </p>
                </div>
                <a
                  href={siteSettings?.catalogUrl || "/katalog.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-full font-bold hover:bg-orange-50 transition-colors w-full"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {tHome('catalog.button')}
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS - Dynamic from Database */}
      {/* STATS + CTA COMBINED - Compact Row */}
      <section className="py-6 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0 lg:divide-x divide-white/20">

            {/* Title */}
            <div className="w-full lg:w-auto lg:pr-10 text-center lg:text-left flex-shrink-0">
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">{tWhyUs('title')}</h2>
              <p className="text-white/80 text-sm mt-1 hidden lg:block">{tHome('ctaSection.title')}</p>
            </div>

            {/* Dynamic Statistics */}
            <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4 lg:px-10 lg:divide-x divide-white/20 justify-center">
              {statistics.length > 0 ? (
                statistics.slice(0, 3).map((stat: any) => {
                  const label = stat.label as { tr: string; en: string };
                  return (
                    <div key={stat.id} className="text-center px-2">
                      <div className="text-3xl md:text-4xl font-black text-white">{stat.value}</div>
                      <div className="text-xs font-bold text-white/90 uppercase tracking-wide mt-1">{(label as any)[locale] || label.tr}</div>
                    </div>
                  );
                })
              ) : (
                <>
                  <div className="text-center px-2">
                    <div className="text-3xl md:text-4xl font-black text-white">20+</div>
                    <div className="text-xs font-bold text-white/90 uppercase tracking-wide mt-1">{tHome('stats.yearsExperience')}</div>
                  </div>
                  <div className="text-center px-2">
                    <div className="text-3xl md:text-4xl font-black text-white">10k+</div>
                    <div className="text-xs font-bold text-white/90 uppercase tracking-wide mt-1">{tHome('stats.happyClients')}</div>
                  </div>
                  <div className="text-center px-2 col-span-2 md:col-span-1">
                    <div className="text-3xl md:text-4xl font-black text-white">50+</div>
                    <div className="text-xs font-bold text-white/90 uppercase tracking-wide mt-1">{tHome('stats.productTypes')}</div>
                  </div>
                </>
              )}
            </div>

            {/* CTA Button */}
            <div className="w-full lg:w-auto lg:pl-10 text-center flex-shrink-0">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 hover:bg-orange-50 font-bold py-4 px-8 rounded-xl transition duration-300 text-sm md:text-base uppercase tracking-wider shadow-lg lg:w-auto w-full group"
              >
                <span>{tHero('cta')}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
