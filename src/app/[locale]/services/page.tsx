
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return {
        title: locale === 'tr' ? 'Hizmetler | Bağcılar Beton Kalıp' : 'Services | Bagcilar Concrete Formwork',
        description: locale === 'tr'
            ? 'Projelendirme, süpervizörlük ve teknik destek hizmetlerimiz.'
            : 'Our design, supervision and technical support services.',
    };
}

export default function ServicesPage() {
    const t = useTranslations('Navigation');
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-4">{t('services')}</h1>
            <p>Content coming soon...</p>
        </div>
    );
}
