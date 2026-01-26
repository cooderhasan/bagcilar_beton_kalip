import { getTranslations, setRequestLocale } from 'next-intl/server';
import { productCategories } from '@/lib/products';
import { getSiteSettings } from '@/actions/settings';
import QuoteForm from '@/components/forms/QuoteForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const baseUrl = 'https://bagcilarbetonkalip.com';

    const title = locale === 'tr' ? 'Teklif Al | Bağcılar Beton Kalıp' : 'Get Quote | Bagcilar Concrete Formwork';
    const description = locale === 'tr'
        ? 'Beton kalıp ürünlerimiz için hemen teklif alın.'
        : 'Get a quote for our concrete formwork products.';

    return {
        title,
        description,
        alternates: {
            canonical: `${baseUrl}/${locale}/quote`,
        },
        openGraph: {
            title,
            description,
            url: `${baseUrl}/${locale}/quote`,
            siteName: 'Bağcılar Beton Kalıp',
            locale: locale === 'tr' ? 'tr_TR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export default async function QuotePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);


    const { settings } = await getSiteSettings();

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-slate-100 py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left: Form */}
                    <div className="lg:col-span-2 relative bg-white rounded-3xl shadow-xl p-10 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                        {/* Gradient Accent */}
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600"></div>

                        <div className="relative z-10">
                            <h1 className="text-4xl font-bold text-gray-900 mb-8">Teklif Formu</h1>

                            <QuoteForm productCategories={productCategories} />
                        </div>
                    </div>

                    {/* Right: Info Sidebar */}
                    <div className="space-y-6">
                        {/* Why Choose Us */}
                        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
                            <h2 className="text-2xl font-bold mb-6">Neden Bizi Seçmelisiniz?</h2>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>30+ yıllık tecrübe</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Hızlı teslimat</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Rekabetçi fiyatlar</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Özel üretim imkanı</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Kalite garantisi</span>
                                </li>
                            </ul>
                        </div>

                        {/* Quick Contact */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Hızlı İletişim</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-xl text-white shrink-0">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="block text-sm font-bold text-gray-700 mb-1">Telefon</span>
                                        <a href={`tel:${settings?.phone}`} className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
                                            {settings?.phone || '+90 555 555 55 55'}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-xl text-white shrink-0">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="block text-sm font-bold text-gray-700 mb-1">E-posta</span>
                                        <a href={`mailto:${settings?.email}`} className="text-amber-600 hover:text-amber-700 font-medium transition-colors break-all">
                                            {settings?.email || 'info@bagcilar.com'}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
