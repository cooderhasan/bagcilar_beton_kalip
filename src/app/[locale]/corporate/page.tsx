import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

type Props = {
    params: Promise<{ locale: string }>;
};

import PageHeader from '@/components/ui/PageHeader';
import DynamicIcon from '@/components/ui/DynamicIcon';

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const page = await prisma.page.findUnique({
        where: { slug: 'about-us' }
    });

    if (!page) return { title: 'Kurumsal' };

    const getLocalized = (val: any) => {
        if (!val) return null;
        if (typeof val === 'string') return val;
        return val[locale] || val['tr'] || null;
    };

    const title = (page.title as any)[locale] || (page.title as any)['tr'];
    const seoTitle = getLocalized(page.seoTitle);
    const seoDesc = getLocalized(page.seoDescription);

    return {
        title: seoTitle || `${title} | Bağcılar Beton Kalıp`,
        description: seoDesc
    };
}

export default async function CorporatePage({ params }: Props) {
    const { locale } = await params;

    // Fetch the corporate page content
    const page = await prisma.page.findUnique({
        where: { slug: 'about-us' }
    });

    // Fetch corporate cards
    const corporateCards = await prisma.corporateCard.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
    });

    const title = (page?.title as any)?.[locale] || 'Kurumsal';
    const aboutUsContent = (page?.content as any)?.[locale] || `
        <p>Bağcılar Beton Kalıp olarak, inşaat sektöründe kalıp sistemleri alanında Türkiye'nin önde gelen firması olmak vizyonuyla hareket ediyoruz. Yenilikçi çözümlerimiz ve kalite odaklı yaklaşımımızla sektörde standartları belirlemeyi hedefliyoruz.</p>
        <p>Sektördeki 20 yılı aşkın tecrübemizle, güvenilir iş ortağı olmayı sürdürerek, Türkiye genelinde ve uluslararası pazarlarda varlığımızı güçlendirmeyi hedefliyoruz. Deneyimli kadromuz ve modern üretim tesislerimizle, zamanında teslimat ve kusursuz ürün kalitesi garantisi veriyoruz.</p>
        <p>Çevreye duyarlı üretim anlayışımızla, sürdürülebilir inşaat sektörüne katkı sağlamak önceliklerimiz arasındadır. Müşteri memnuniyetini her şeyin üstünde tutarak, uzun vadeli iş birlikleri kurmayı amaçlıyoruz.</p>
    `;

    const aboutUsImage = page?.image || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2072';
    const heroImage = (page as any)?.heroImage || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070';

    return (
        <div className="bg-gray-50 min-h-screen">
            <PageHeader
                title={title}
                description="İnşaat sektöründe güven, kalite ve tecrübeyle geleceği inşa ediyoruz."
                simple={true}
                breadcrumbs={[
                    { label: title }
                ]}
            />

            <div className="container mx-auto px-4 py-16 md:py-24">
                {/* Hakkımızda Section */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-light text-slate-900">
                            {title}
                        </h2>
                        <div className="w-20 h-1 bg-blue-600" />

                        {/* Dynamic Content from Admin Panel */}
                        <div
                            className="text-gray-600 space-y-4 leading-relaxed font-light prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: aboutUsContent }}
                        />
                    </div>

                    {/* Dynamic Image from Admin Panel */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl skew-y-1">
                        <Image
                            src={aboutUsImage}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Corporate Cards - Dynamic from Database */}
                <div className="grid md:grid-cols-3 gap-8">
                    {corporateCards.length > 0 ? (
                        corporateCards.map((card: any) => {
                            const cardTitle = (card.title as any)[locale] || (card.title as any).tr;
                            const cardContent = (card.content as any)[locale] || (card.content as any).tr;

                            return (
                                <div key={card.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors text-2xl">
                                        <DynamicIcon name={card.icon || 'Star'} className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-medium text-slate-900 mb-4">{cardTitle}</h3>
                                    <p className="text-gray-600 leading-relaxed font-light">
                                        {cardContent}
                                    </p>
                                </div>
                            );
                        })
                    ) : (
                        <>
                            {/* Default cards if none in database */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                </div>
                                <h3 className="text-xl font-medium text-slate-900 mb-4">Vizyonumuz</h3>
                                <p className="text-gray-600 leading-relaxed font-light">
                                    Sürekli gelişim ve müşteri memnuniyeti ilkelerimizle, her projede mükemmelliği yakalamak için çalışıyoruz.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><circle cx="12" cy="12" r="10" /></svg>
                                </div>
                                <h3 className="text-xl font-medium text-slate-900 mb-4">Misyonumuz</h3>
                                <p className="text-gray-600 leading-relaxed font-light">
                                    Müşterilerimize en yüksek kalitede beton kalıp sistemleri sunarak, projelerinin başarıya ulaşmasına katkıda bulunmaktır.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                </div>
                                <h3 className="text-xl font-medium text-slate-900 mb-4">İnsan Kaynakları</h3>
                                <p className="text-gray-600 leading-relaxed font-light">
                                    Çalışanlarımızın değerini bilerek onlara adil, güvenli ve geliştirici bir çalışma ortamı sunmak en büyük önceliğimizdir.
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
