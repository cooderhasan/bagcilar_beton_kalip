import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import "../globals.css";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { Toaster } from 'react-hot-toast';

import { getTranslations } from 'next-intl/server';
import { getCachedSiteSettings } from '@/lib/settings-cache';
import { prisma } from '@/lib/prisma';
import { cache } from 'react';

// React cache to dedupe getSiteSettings calls within the same request
const getSettings = cache(async () => {
  return getCachedSiteSettings();
});

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const baseUrl = 'https://bagcilarbetonkalip.com';

  // Fetch settings once at the top for favicon
  const settings = await getSettings();
  const faviconUrl = settings?.faviconUrl
    ? `${settings.faviconUrl}?v=${Date.now()}`
    : '/favicon.ico';

  // Helper to get localized value
  const getLocalized = (val: any) => {
    if (!val) return null;
    if (typeof val === 'string') return val;
    return val[locale] || val['tr'] || null;
  };

  const siteTitle = getLocalized(settings?.seoTitle) || t('title');
  const siteDesc = getLocalized(settings?.seoDescription) || t('description');

  return {
    title: {
      default: siteTitle,
      template: `%s | Bağcılar Beton Kalıp`,
    },
    description: siteDesc,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'tr': `${baseUrl}/tr`,
        'en': `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: siteTitle,
      description: siteDesc,
      url: baseUrl,
      siteName: 'Bağcılar Beton Kalıp',
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Bağcılar Beton Kalıp - Profesyonel Kalıp Sistemleri',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDesc,
      images: ['/images/og-image.jpg'],
    },
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: faviconUrl,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: (await getSettings())?.googleSiteVerification,
      other: {
        "msvalidate.01": (await getSettings())?.bingSiteVerification,
      },
    },
  };
}

import WhatsAppButton from '@/components/ui/WhatsAppButton';

// SEO: Organization/LocalBusiness Schema - Moved inside component for dynamic data

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const settings = await getSettings();
  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' },
  });

  // Serialize dates to avoid "Date object not supported" error in Client Component
  const serializedCategories = categories.map((cat: any) => ({
    ...cat,
    createdAt: cat.createdAt.toISOString(),
    updatedAt: cat.updatedAt.toISOString(),
    title: cat.title as any, // Ensure it's treated as object/any
    description: cat.description as any
  }));

  // Helper to get localized value safely
  const getLocalized = (val: any) => {
    if (!val) return null;
    if (typeof val === 'string') return val;
    return val[locale] || val['tr'] || "";
  };

  // Create dynamic schema based on settings
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ConstructionBusiness",
    "name": getLocalized(settings?.seoTitle) || "Bağcılar Beton Kalıp Sistemleri",
    "url": "https://bagcilarbetonkalip.com",
    "logo": settings?.logoUrl || "https://bagcilarbetonkalip.com/logo.png",
    "image": "https://bagcilarbetonkalip.com/hero-bg.jpg",
    "description": getLocalized(settings?.seoDescription) || "Profesyonel inşaat ve beton kalıp sistemleri, perde, kolon ve döşeme kalıpları üretimi ve satışı.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": getLocalized(settings?.address) || "Bağcılar Merkez",
      "addressLocality": "İstanbul",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.034",
      "longitude": "28.856"
    },
    "telephone": settings?.phone || "+90 555 555 55 55",
    "email": settings?.email || "info@bagcilar.com",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      settings?.facebook || "https://facebook.com/bagcilarbetonkalip",
      settings?.instagram || "https://instagram.com/bagcilarbetonkalip",
      settings?.linkedin || "https://linkedin.com/company/bagcilarbetonkalip"
    ].filter(Boolean)
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <JsonLd data={organizationSchema} />
      </head>
      <body className={`${inter.className} antialiased font-sans bg-gray-50 text-slate-900`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col min-h-screen">
            <Header settings={settings} categories={serializedCategories} />
            <main className="flex-grow pt-[120px] md:pt-[130px]">
              {children}
            </main>
            <WhatsAppButton phone={settings?.phone || undefined} />
            <Footer settings={settings} />
            <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
