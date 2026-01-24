import { getTranslations, getLocale } from 'next-intl/server';
import { prisma } from '@/lib/prisma';

// Force dynamic rendering to always get latest settings
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    const page = await prisma.page.findUnique({
        where: { slug: 'contact' }
    });

    if (page?.seoTitle) {
        return {
            title: page.seoTitle,
            description: page.seoDescription
        };
    }

    return {
        title: locale === 'tr' ? 'İletişim | Bağcılar Beton Kalıp' : 'Contact | Bagcilar Concrete Formwork',
        description: locale === 'tr' ? 'Bizimle iletişime geçin. Adres, telefon ve e-posta bilgilerimiz.' : 'Get in touch with us. Our address, phone and email details.',
    };
}

import PageHeader from '@/components/ui/PageHeader';
import ContactForm from '@/components/forms/ContactForm';

export default async function ContactPage() {
    const t = await getTranslations('Contact');
    const locale = await getLocale();

    // Fetch Settings and optional Page content in parallel
    const [settings, page] = await Promise.all([
        prisma.siteSettings.findFirst(),
        prisma.page.findUnique({ where: { slug: 'contact' } })
    ]);

    const content = (page?.content as any)?.[locale];
    const heroImage = (page as any)?.heroImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069';

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-slate-100">
            <PageHeader
                title={t('title')}
                description={t('subtitle')}
                image={heroImage}
                breadcrumbs={[
                    { label: t('title') }
                ]}
            />

            <div className="container mx-auto px-4 py-20">
                {/* Optional Dynamic Content */}
                {content && (
                    <div className="mb-16 max-w-4xl mx-auto prose prose-lg rich-text" dangerouslySetInnerHTML={{ __html: content }} />
                )}

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Contact Info (Left) */}
                    <div className="lg:w-1/3">
                        <div className="relative bg-white p-10 rounded-3xl shadow-xl h-full overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
                            {/* Gradient Border Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold text-primary mb-10 pb-4 border-b-2 border-gradient-to-r from-amber-500 to-orange-500">
                                    {t('info.title')}
                                </h2>

                                <div className="space-y-8">
                                    {/* Address */}
                                    <div className="flex items-start gap-5 group/item">
                                        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-4 rounded-2xl text-white shrink-0 shadow-lg group-hover/item:scale-110 transition-transform duration-300">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2 text-lg">{t('info.address')}</h3>
                                            <p className="text-gray-600 leading-relaxed">{settings?.address || 'İstanbul, Türkiye'}</p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-start gap-5 group/item">
                                        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-4 rounded-2xl text-white shrink-0 shadow-lg group-hover/item:scale-110 transition-transform duration-300">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2 text-lg">{t('info.phone')}</h3>
                                            <a href={`tel:${settings?.phone}`} className="text-gray-600 font-mono text-lg hover:text-amber-600 transition-colors duration-200">
                                                {settings?.phone || '+90 555 555 55 55'}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-start gap-5 group/item">
                                        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-4 rounded-2xl text-white shrink-0 shadow-lg group-hover/item:scale-110 transition-transform duration-300">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2 text-lg">{t('info.email')}</h3>
                                            <a href={`mailto:${settings?.email}`} className="text-gray-600 hover:text-amber-600 transition-colors duration-200 break-all">
                                                {settings?.email || 'info@bagcilarbetonkalip.com'}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Working Hours */}
                                    <div className="flex items-start gap-5 group/item">
                                        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-4 rounded-2xl text-white shrink-0 shadow-lg group-hover/item:scale-110 transition-transform duration-300">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2 text-lg">{t('info.workingHours')}</h3>
                                            <p className="text-gray-600 leading-relaxed">{t('info.workingHoursValue')}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Google Maps Embed */}
                                <div className="mt-10 rounded-2xl overflow-hidden h-72 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                                    <iframe
                                        src={settings?.contactMapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48152.69539828469!2d28.80946747683952!3d41.03439931855848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa4546bbee38b%3A0x194553303d726b2b!2sBa%C4%9Fc%C4%B1lar%2C%20Istanbul!5e0!3m2!1sen!2str!4v1705221975000!5m2!1sen!2str"}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Bağcılar Google Maps"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form (Right) */}
                    <div className="lg:w-2/3">
                        <div className="relative bg-white p-10 rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
                            {/* Gradient Accent */}
                            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600"></div>

                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold text-primary mb-8">{t('form.title')}</h2>

                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
