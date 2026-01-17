import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { productCategories } from '@/lib/products';
import { blogPosts } from '@/lib/blog';
import { prisma } from '@/lib/prisma';

export default async function HomePage() {
  const tHero = await getTranslations('Hero');
  const tProducts = await getTranslations('ProductCategories');
  const tWhyUs = await getTranslations('WhyUs');
  const tHome = await getTranslations('HomePage');

  // Veritabanından veri çekme
  const [sliders, heroSection, statistics, categories, siteSettings] = await Promise.all([
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
    prisma.siteSettings.findFirst()
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

  return (
    <main className="flex flex-col min-h-screen">

      {/* SLIDER / HERO SECTION */}
      {sliders.length > 0 ? (
        // Slider varsa slider göster
        <section className="relative h-[85vh] w-full bg-gray-900 flex items-center">
          {/* Şu an tek slider gösteriyoruz, ileride carousel yapılabilir */}
          {sliders.map((slider, index) => {
            const title = slider.title as { tr: string; en: string };
            const description = slider.description as { tr: string; en: string } | null;
            const ctaText = slider.ctaText as { tr: string; en: string } | null;

            return (
              <div key={slider.id} className={index === 0 ? 'w-full h-full' : 'hidden'}>
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={slider.image}
                    alt={title.tr}
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
                      {title.tr}
                    </h1>
                    {description && (
                      <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light max-w-2xl">
                        {description.tr}
                      </p>
                    )}
                    {slider.link && ctaText && (
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                          href={slider.link}
                          className="bg-accent hover:bg-amber-600 text-white font-bold py-4 px-8 rounded transition duration-300 text-center uppercase tracking-wider"
                        >
                          {ctaText.tr}
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
                {(heroData.title as any).tr || tHero('title')}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light max-w-2xl">
                {(heroData.subtitle as any).tr || tHero('subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={heroData.primaryCtaLink}
                  className="bg-accent hover:bg-amber-600 text-white font-bold py-4 px-8 rounded transition duration-300 text-center uppercase tracking-wider"
                >
                  {(heroData.primaryCtaText as any).tr || tHero('cta')}
                </Link>
                {heroData.secondaryCtaLink && (
                  <Link
                    href={heroData.secondaryCtaLink}
                    className="bg-transparent border-2 border-white hover:bg-white hover:text-primary text-white font-bold py-4 px-8 rounded transition duration-300 text-center uppercase tracking-wider"
                  >
                    {(heroData.secondaryCtaText as any)?.tr || tHero('secondaryCta')}
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
            {categories.map((category) => {
              const title = (category.title as any).tr;
              const description = (category.description as any)?.tr;

              return (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
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
              Tüm Ürünleri Gör
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* PDF CATALOG & BLOG SECTION */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: PDF Catalog Download */}
            <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-2xl p-8 text-white flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zm-3 9h4v1h-4v-1zm0 2h4v1h-4v-1zm-2-4h1v6H8v-6zm6 0h1v6h-1v-6z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-black">PDF Katalog</h3>
                  <p className="text-gray-400 text-sm">Tüm ürünlerimizi inceleyin</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                Beton kalıp modellerimizi, teknik özelliklerini ve fiyat bilgilerini içeren katalogumzu indirin.
              </p>
              <a
                href={siteSettings?.catalogUrl || "/katalog.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-orange-500/25 transition-all w-fit"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Katalogu İndir
              </a>
            </div>

            {/* Right: Latest Blog Posts */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-gray-800">Son Blog Yazıları</h3>
                <Link href="/blog" className="text-orange-500 font-semibold hover:text-orange-600 transition-colors text-sm">
                  Tümünü Gör →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {blogPosts.slice(0, 2).map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative aspect-[16/9] bg-gray-200">
                      <Image
                        src="/images/products/product-placeholder.png"
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-400 mb-1">{post.date}</p>
                      <h4 className="font-bold text-gray-800 group-hover:text-orange-500 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS - Dynamic from Database */}
      <section className="py-10 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 divide-x-0 md:divide-x divide-white/30">
            {/* Title */}
            <div className="text-center px-4 flex items-center justify-center">
              <h2 className="text-xl md:text-2xl font-black text-white">{tWhyUs('title')}</h2>
            </div>

            {/* Dynamic Statistics */}
            {statistics.length > 0 ? (
              statistics.slice(0, 3).map((stat) => {
                const label = stat.label as { tr: string; en: string };
                return (
                  <div key={stat.id} className="text-center px-4">
                    <div className="text-3xl md:text-4xl font-black text-white">{stat.value}</div>
                    <div className="text-xs md:text-sm text-white/80 uppercase tracking-wider mt-1">{label.tr}</div>
                  </div>
                );
              })
            ) : (
              <>
                {/* Fallback Static Stats */}
                <div className="text-center px-4">
                  <div className="text-3xl md:text-4xl font-black text-white">20+</div>
                  <div className="text-xs md:text-sm text-white/80 uppercase tracking-wider mt-1">Yıllık Tecrübe</div>
                </div>
                <div className="text-center px-4">
                  <div className="text-3xl md:text-4xl font-black text-white">10k+</div>
                  <div className="text-xs md:text-sm text-white/80 uppercase tracking-wider mt-1">Mutlu Müşteri</div>
                </div>
                <div className="text-center px-4">
                  <div className="text-3xl md:text-4xl font-black text-white">50+</div>
                  <div className="text-xs md:text-sm text-white/80 uppercase tracking-wider mt-1">Ürün Çeşidi</div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-concrete">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
            {tHome('ctaSection.title')}
          </h2>
          <Link
            href="/quote"
            className="inline-block bg-primary hover:bg-gray-800 text-white font-bold py-4 px-12 rounded transition duration-300 text-lg uppercase tracking-wider"
          >
            {tHero('cta')}
          </Link>
        </div>
      </section>

    </main>
  );
}
