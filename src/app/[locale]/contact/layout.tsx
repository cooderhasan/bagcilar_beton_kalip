export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return {
        title: locale === 'tr' ? 'İletişim' : 'Contact',
        description: locale === 'tr'
            ? 'Bağcılar Beton Kalıp ile iletişime geçin. Adres, telefon ve e-posta bilgilerimiz.'
            : 'Contact Bagcilar Concrete Formwork. Address, phone and email information.',
        openGraph: {
            title: locale === 'tr' ? 'İletişim | Bağcılar Beton Kalıp' : 'Contact | Bagcilar Concrete Formwork',
            description: locale === 'tr'
                ? 'Bağcılar Beton Kalıp ile iletişime geçin.'
                : 'Contact Bagcilar Concrete Formwork.',
            type: 'website',
        },
    };
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
