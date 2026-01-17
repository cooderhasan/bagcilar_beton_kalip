import { routing } from '@/i18n/routing';
import { redirect } from 'next/navigation';

// Render the default locale's home page for the root path if not handled otherwise, 
// or simpler: just redirect to default locale if visited directly ? 
// Actually for root not-found within [locale] it's handled by that layout.
// This file catch-all for when no route matches.
// But since we have [locale], we usually want to redirect to a locale if missing?

// For now, let's just make a simple global 404.
export default function NotFound() {
    // We can try to redirect to default locale
    // redirect(`/${routing.defaultLocale}`);
    return (
        <html>
            <body>
                <h1>Something went wrong!</h1>
            </body>
        </html>
    );
}
