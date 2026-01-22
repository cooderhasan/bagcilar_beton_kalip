
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

import PageHeader from '@/components/ui/PageHeader';

export default function ProjectsPage() {
    const t = useTranslations('Navigation');
    return (
        <div className="bg-gray-50 min-h-screen">
            <PageHeader
                title={t('projects')}
                description="Tamamladığımız ve devam eden beton kalıp projelerimiz."
                image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070"
                breadcrumbs={[
                    { label: t('projects') }
                ]}
            />
            <div className="container mx-auto px-4 py-12">
                <p>Content coming soon...</p>
            </div>
        </div>
    );
}
