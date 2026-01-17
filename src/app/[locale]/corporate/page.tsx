import { useTranslations } from 'next-intl';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return {
        title: locale === 'tr' ? 'Kurumsal | Bağcılar Beton Kalıp' : 'Corporate | Bagcilar Concrete Formwork',
        description: locale === 'tr' ? 'Hakkımızda, vizyonumuz, misyonumuz ve kalite politikamız.' : 'About us, our vision, mission and quality policy.'
    };
}

export default function CorporatePage() {
    const t = useTranslations('Corporate');

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-primary text-white py-24">
                <div className="absolute inset-0 bg-black/20 z-0"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
                    <div className="h-2 w-24 bg-accent mx-auto"></div>
                </div>
            </div>

            {/* About Us */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            {/* Placeholder for About Image */}
                            <div className="bg-gray-200 rounded-lg h-80 w-full flex items-center justify-center text-gray-400">
                                <span className="text-lg font-semibold">About Us Image</span>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold text-primary mb-6">{t('about.title')}</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {t('about.content')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission Grid */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Vision */}
                        <div className="bg-white p-10 rounded-lg shadow-sm border-t-4 border-accent">
                            <h2 className="text-2xl font-bold text-primary mb-4">{t('vision.title')}</h2>
                            <p className="text-gray-600">{t('vision.content')}</p>
                        </div>
                        {/* Mission */}
                        <div className="bg-white p-10 rounded-lg shadow-sm border-t-4 border-primary">
                            <h2 className="text-2xl font-bold text-primary mb-4">{t('mission.title')}</h2>
                            <p className="text-gray-600">{t('mission.content')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quality Policy */}
            <section className="py-20">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <div className="mb-8 inline-block p-4 rounded-full bg-primary/5 text-primary">
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-primary mb-6">{t('quality.title')}</h2>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        {t('quality.content')}
                    </p>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-primary text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-2">{t('values.title')}</h2>
                        <div className="h-1 w-16 bg-accent mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="text-center p-6 border border-white/10 rounded hover:bg-white/5 transition-colors">
                                <h3 className="text-xl font-bold text-accent">{t(`values.items.${item}`)}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
