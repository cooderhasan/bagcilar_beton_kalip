import "../globals.css";

export const metadata = {
    title: 'Admin Panel | Bağcılar Beton Kalıp',
    description: 'Yönetim Paneli',
};

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="tr">
            <body className="antialiased font-sans bg-gray-50 text-slate-900">
                {children}
            </body>
        </html>
    );
}
