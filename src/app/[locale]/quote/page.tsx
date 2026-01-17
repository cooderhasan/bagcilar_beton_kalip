import { getTranslations, setRequestLocale } from 'next-intl/server';
import { productCategories } from '@/lib/products';
import { getSiteSettings } from '@/actions/settings';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return {
        title: locale === 'tr' ? 'Teklif Al | Bağcılar Beton Kalıp' : 'Get Quote | Bagcilar Concrete Formwork',
        description: locale === 'tr' ? 'Beton kalıp ürünlerimiz için hemen teklif alın.' : 'Get a quote for our concrete formwork products.',
    };
}

export default async function QuotePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: 'ProductCategories' });
    const { settings } = await getSiteSettings();

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left: Form */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
                        <h1 className="text-3xl font-black text-gray-800 mb-8">Teklif Formu</h1>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Adınız Soyadınız <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none transition-all text-gray-800 placeholder:text-gray-400"
                                        placeholder="Adınız Soyadınız"
                                    />
                                </div>

                                {/* Company */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Firma Adı
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none transition-all text-gray-800 placeholder:text-gray-400"
                                        placeholder="Firma Adı"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        E-posta Adresiniz <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none transition-all text-gray-800 placeholder:text-gray-400"
                                        placeholder="ornek@email.com"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Telefon Numaranız
                                    </label>
                                    <input
                                        type="tel"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none transition-all text-gray-800 placeholder:text-gray-400"
                                        placeholder="+90 5XX XXX XX XX"
                                    />
                                </div>

                                {/* Product Select */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Ürün
                                    </label>
                                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none transition-all bg-white text-gray-800">
                                        <option value="">Ürün Seçin</option>
                                        {productCategories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {t(category.id)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Quantity */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Miktar
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none transition-all text-gray-800 placeholder:text-gray-400"
                                        placeholder="Örn: 1000 adet"
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Mesajınız <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none transition-all resize-none text-gray-800 placeholder:text-gray-400"
                                    placeholder="Teknik detaylar, ölçüler, özel istekler..."
                                ></textarea>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 px-10 rounded-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all"
                            >
                                Teklif İste
                            </button>
                        </form>
                    </div>

                    {/* Right: Info Sidebar */}
                    <div className="space-y-6">
                        {/* Why Choose Us */}
                        <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-8 text-white">
                            <h2 className="text-2xl font-black mb-6">Neden Bizi Seçmelisiniz?</h2>
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
                        <div className="bg-sky-50 rounded-2xl p-8 border border-sky-100">
                            <h2 className="text-2xl font-black text-gray-800 mb-6">Hızlı İletişim</h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="font-semibold text-gray-700">Telefon:</span>
                                    <a href={`tel:${settings?.phone}`} className="text-sky-600 hover:text-sky-700">{settings?.phone || '+90 555 555 55 55'}</a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-semibold text-gray-700">E-posta:</span>
                                    <a href={`mailto:${settings?.email}`} className="text-sky-600 hover:text-sky-700">{settings?.email || 'info@bagcilar.com'}</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
