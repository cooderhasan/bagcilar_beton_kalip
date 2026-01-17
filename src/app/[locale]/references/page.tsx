import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { references } from '@/lib/references';
import Image from 'next/image';

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

export default function ReferencesPage() {
    const t = useTranslations('References');
    const tNav = useTranslations('Navigation'); // For breadcrumb if needed

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Hero Section */}
            <div className="bg-[#101827] text-white py-20 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="container mx-auto relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 uppercase">
                        {t('title')}
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>
            </div>

            {/* References Grid */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {references.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center text-2xl font-black text-gray-300 group-hover:bg-accent group-hover:text-white transition-colors">
                                    {item.name.charAt(0)}
                                </div>
                                <span className="text-xs font-bold text-accent uppercase tracking-wider bg-accent/5 px-2 py-1 rounded">
                                    {item.sector}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                                {item.name}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

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
