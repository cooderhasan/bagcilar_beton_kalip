
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return {
        title: locale === 'tr' ? 'Sektörler | Bağcılar Beton Kalıp' : 'Sectors | Bagcilar Concrete Formwork',
        description: locale === 'tr'
            ? 'Konut, altyapı, endüstriyel yapılar ve daha fazlası için kalıp çözümleri.'
            : 'Formwork solutions for residential, infrastructure, industrial structures and more.',
    };
}

export default function SectorsPage() {
    const t = useTranslations('Navigation');
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-4">{t('sectors')}</h1>
            <p>Content coming soon...</p>
        </div>
    );
}
