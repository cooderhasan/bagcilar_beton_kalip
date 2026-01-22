import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return {
        title: locale === 'tr' ? 'Referanslar | Bağcılar Beton Kalıp' : 'References | Bagcilar Concrete Formwork',
        description: locale === 'tr'
            ? 'Türkiye\'nin önde gelen inşaat firmalarıyla gerçekleştirdiğimiz projelerimizi inceleyin.'
            : 'Explore our projects with Turkey\'s leading construction companies.',
        openGraph: {
            title: locale === 'tr' ? 'Referanslar | Bağcılar Beton Kalıp' : 'References | Bagcilar Concrete Formwork',
            description: locale === 'tr'
                ? 'Türkiye\'nin önde gelen inşaat firmalarıyla gerçekleştirdiğimiz projelerimizi inceleyin.'
                : 'Explore our projects with Turkey\'s leading construction companies.',
            type: 'website',
        },
    };
}

import PageHeader from '@/components/ui/PageHeader';

export default async function ReferencesPage() {
    const t = await getTranslations('References');

    const references = await prisma.reference.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' }
    });

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <PageHeader
                title={t('title')}
                description={t('subtitle')}
                image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"
                breadcrumbs={[
                    { label: t('title') }
                ]}
            />

            {/* References Grid */}
            <div className="container mx-auto px-4 py-16">
                {references.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        Henüz referans eklenmemiş.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {references.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center justify-center text-center">
                                <div className="relative w-48 h-32 mb-6">
                                    <Image
                                        src={item.image || '/images/products/product-placeholder.png'}
                                        alt={item.name}
                                        fill
                                        className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                                    {item.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                )}

                {/* CTA Box */}
                <div className="mt-20 bg-primary rounded-2xl p-10 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-accent/10 mix-blend-overlay"></div>
                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            {t('ctaTitle')}
                        </h2>
                        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                            {t('ctaDescription')}
                        </p>
                        <a
                            href="/quote"
                            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
                        >
                            {t('ctaButton')}
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
