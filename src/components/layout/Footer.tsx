"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

interface FooterProps {
    settings?: any; // Define proper type if possible
}

export default function Footer({ settings }: FooterProps) {
    const t = useTranslations('Navigation');
    const tHome = useTranslations('HomePage');
    const tFooter = useTranslations('Footer');

    return (
        <footer className="bg-primary text-gray-400 py-12 border-t border-gray-800">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Company Info */}
                <div className="md:col-span-1">
                    <Link href="/" className="inline-block mb-4">
                        {(settings?.footerLogoUrl || settings?.logoUrl) ? (
                            <img
                                src={settings.footerLogoUrl || settings.logoUrl}
                                alt="Bağcılar Beton Kalıp"
                                style={{ height: `${settings.logoHeight || 60}px` }}
                                className={`w-auto object-contain ${settings?.footerLogoUrl ? '' : 'brightness-0 invert'}`}
                            />
                        ) : (
                            <span className="text-xl font-bold tracking-tighter uppercase text-white">
                                Bağcılar<span className="text-accent ml-1">Beton Kalıp</span>
                            </span>
                        )}
                    </Link>
                    <p className="text-sm mb-4">
                        {settings?.seoDescription || tHome('description')}
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-bold uppercase mb-4 text-sm">{tFooter('menu')}</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="hover:text-accent">{t('home')}</Link></li>
                        <li><Link href="/corporate" className="hover:text-accent">{t('corporate')}</Link></li>
                        <li><Link href="/products" className="hover:text-accent">{t('products')}</Link></li>
                        <li><Link href="/projects" className="hover:text-accent">{t('projects')}</Link></li>
                        <li><Link href="/contact" className="hover:text-accent">{t('contact')}</Link></li>
                        <li><Link href="/careers" className="hover:text-accent">İnsan Kaynakları</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-white font-bold uppercase mb-4 text-sm">{tFooter('contact')}</h3>
                    <ul className="space-y-2 text-sm">
                        <li>{settings?.address || tFooter('address')}</li>
                        <li><a href={`mailto:${settings?.email}`} className="hover:text-accent">{settings?.email || 'info@bagcilarbetonkalip.com'}</a></li>
                        <li><a href={`tel:${settings?.phone}`} className="hover:text-accent">{settings?.phone || '+90 555 555 55 55'}</a></li>
                    </ul>
                </div>

                {/* Social / Legal */}
                <div>
                    <h3 className="text-white font-bold uppercase mb-4 text-sm">{tFooter('social')}</h3>
                    <div className="flex gap-4 mb-6">
                        {settings?.facebook && (
                            <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-all transform hover:-translate-y-1">
                                <span className="sr-only">Facebook</span>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </a>
                        )}
                        {settings?.instagram && (
                            <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-all transform hover:-translate-y-1">
                                <span className="sr-only">Instagram</span>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.072 3.269.156 5.023 1.192 5.745 3.015.424 1.068.52 2.062.52 4.375s-.096 3.307-.52 4.375c-.722 1.823-2.476 2.859-5.745 3.015-1.266.06-1.646.072-4.85.072-3.204 0-3.584-.012-4.85-.072-3.269-.156-5.023-1.192-5.745-3.015-.424-1.068-.52-2.062-.52-4.375s.096-3.307.52-4.375c.722-1.823 2.476-2.859 5.745-3.015 1.266-.06 1.646-.072 4.85-.072zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                        )}
                        {settings?.linkedin && (
                            <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-all transform hover:-translate-y-1">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            </a>
                        )}
                        {settings?.twitter && (
                            <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-all transform hover:-translate-y-1">
                                <span className="sr-only">Twitter (X)</span>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>
                        )}
                        {settings?.youtube && (
                            <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-all transform hover:-translate-y-1">
                                <span className="sr-only">YouTube</span>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                            </a>
                        )}
                    </div>

                    <h3 className="text-white font-bold uppercase mb-4 text-sm">{tFooter('legal')}</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/legal/privacy-policy" className="hover:text-accent">{tFooter('privacy')}</Link></li>
                        <li><Link href="/legal/terms-of-use" className="hover:text-accent">{tFooter('terms')}</Link></li>
                        <li><Link href="/legal/kvkk" className="hover:text-accent">KVKK</Link></li>
                        <li><Link href="/legal/cookie-policy" className="hover:text-accent">Çerez Politikası</Link></li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-xs">
                &copy; {new Date().getFullYear()} Bağcılar Beton Kalıp. {tFooter('rights')}
                <br className="md:hidden" />
                <span className="hidden md:inline mx-2">|</span>
                <a href="https://www.hasandurmus.com" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 hover:text-white transition-opacity">
                    Coded by Hasan Durmus
                </a>
            </div>
        </footer>
    );
}
