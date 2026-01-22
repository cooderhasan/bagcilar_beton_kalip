import { setRequestLocale, getLocale, getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    // Fetch dynamic metadata if available
    const page = await prisma.page.findUnique({
        where: { slug: 'careers' }
    });

    if (page?.seoTitle) {
        return {
            title: page.seoTitle,
            description: page.seoDescription
        };
    }

    return {
        title: locale === 'tr' ? 'İnsan Kaynakları | Bağcılar Beton Kalıp' : 'Careers | Bagcilar Concrete Formwork',
        description: locale === 'tr' ? 'Bağcılar Beton Kalıp ailesine katılın. İş başvurusu yapın.' : 'Join Bagcilar Concrete Formwork family. Apply for a job.',
    };
}

import PageHeader from '@/components/ui/PageHeader';
import CareerForm from '@/components/forms/CareerForm';

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('Careers');

    // Fetch dynamic content
    const page = await prisma.page.findUnique({
        where: { slug: 'careers' }
    });

    const title = (page?.title as any)?.[locale] || "Aramıza Katılın, Geleceği Birlikte Şekillendirelim";
    const content = (page?.content as any)?.[locale] || "Bağcılar Beton Kalıp olarak, başarımızın en büyük anahtarının insan kaynağımız olduğuna inanıyoruz. Yenilikçi, dinamik ve gelişime açık bir çalışma ortamında, potansiyelinizi en üst düzeye çıkarmanız için sizi destekliyoruz.";
    const heroImage = (page as any)?.heroImage || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084';

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-slate-100">
            <PageHeader
                title={title}
                description={content}
                image={heroImage}
                breadcrumbs={[
                    { label: title }
                ]}
            />

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Left: Why Join Us */}
                    <div className="bg-white rounded-3xl shadow-xl p-10 hover:shadow-2xl transition-shadow duration-300">
                        <div className="border-l-4 border-amber-500 pl-6 mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">Neden Bağcılar Beton Kalıp?</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 group">
                                <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-xl text-white shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Kariyer ve gelişim fırsatları</h3>
                                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">Sürekli eğitim ve terfi imkanları ile kariyerinizi şekillendirin.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-xl text-white shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Yenilikçi çalışma kültürü</h3>
                                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">Modern teknolojiler ve yenilikçi yaklaşımlarla çalışın.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-xl text-white shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Sürdürülebilirlik odaklı projeler</h3>
                                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">Çevreye duyarlı ve sürdürülebilir projelerde yer alın.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-xl text-white shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Güçlü takım ruhu ve dayanışma</h3>
                                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">Birlikte başaran, destekleyen bir ekibe katılın.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Application Form */}
                    <div className="relative bg-white rounded-3xl shadow-xl p-10 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                        {/* Gradient Accent */}
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">İş Başvuru Formu</h2>

                            <CareerForm />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
