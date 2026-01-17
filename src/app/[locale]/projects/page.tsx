
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return {
        title: locale === 'tr' ? 'Projeler | Bağcılar Beton Kalıp' : 'Projects | Bagcilar Concrete Formwork',
        description: locale === 'tr'
            ? 'Tamamladığımız ve devam eden beton kalıp projelerimiz.'
            : 'Our completed and ongoing concrete formwork projects.',
    };
}

export default function ProjectsPage() {
    const t = useTranslations('Navigation');
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-4">{t('projects')}</h1>
            <p>Content coming soon...</p>
        </div>
    );
}
