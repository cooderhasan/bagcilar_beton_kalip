import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return {
        title: locale === 'tr' ? 'İnsan Kaynakları | Bağcılar Beton Kalıp' : 'Careers | Bagcilar Concrete Formwork',
        description: locale === 'tr' ? 'Bağcılar Beton Kalıp ailesine katılın. İş başvurusu yapın.' : 'Join Bagcilar Concrete Formwork family. Apply for a job.',
    };
}

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-black mb-4">
                        Aramıza Katılın, Geleceği Birlikte Şekillendirelim
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl">
                        Bağcılar Beton Kalıp olarak, başarımızın en büyük anahtarının insan kaynağımız olduğuna inanıyoruz. Yenilikçi, dinamik ve gelişime açık bir çalışma ortamında, potansiyelinizi en üst düzeye çıkarmanız için sizi destekliyoruz.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Left: Why Join Us */}
                    <div>
                        <div className="border-l-4 border-[#0F172A] pl-6 mb-8">
                            <h2 className="text-2xl font-black text-gray-800">Neden Bağcılar Beton Kalıp?</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <svg className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <div>
                                    <h3 className="font-bold text-gray-800">Kariyer ve gelişim fırsatları</h3>
                                    <p className="text-gray-500 text-sm mt-1">Sürekli eğitim ve terfi imkanları ile kariyerinizi şekillendirin.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <svg className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <div>
                                    <h3 className="font-bold text-gray-800">Yenilikçi çalışma kültürü</h3>
                                    <p className="text-gray-500 text-sm mt-1">Modern teknolojiler ve yenilikçi yaklaşımlarla çalışın.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <svg className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <div>
                                    <h3 className="font-bold text-gray-800">Sürdürülebilirlik odaklı projeler</h3>
                                    <p className="text-gray-500 text-sm mt-1">Çevreye duyarlı ve sürdürülebilir projelerde yer alın.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <svg className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <div>
                                    <h3 className="font-bold text-gray-800">Güçlü takım ruhu ve dayanışma</h3>
                                    <p className="text-gray-500 text-sm mt-1">Birlikte başaran, destekleyen bir ekibe katılın.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Application Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-black text-gray-800 mb-8">İş Başvuru Formu</h2>

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

                                {/* Position */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Başvurulan Pozisyon <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none transition-all text-gray-800 placeholder:text-gray-400"
                                        placeholder="Genel Başvuru"
                                    />
                                </div>
                            </div>

                            {/* CV Upload */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    CV Yükle
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors cursor-pointer">
                                    <input type="file" accept=".pdf,.doc,.docx" className="hidden" id="cv-upload" />
                                    <label htmlFor="cv-upload" className="cursor-pointer">
                                        <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                        <span className="text-gray-500">Dosya Seçiniz (PDF, DOC)</span>
                                    </label>
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Mesajınız
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none transition-all resize-none text-gray-800 placeholder:text-gray-400"
                                    placeholder="Kendinizden bahsedin..."
                                ></textarea>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 px-10 rounded-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all"
                            >
                                Gönder
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}
