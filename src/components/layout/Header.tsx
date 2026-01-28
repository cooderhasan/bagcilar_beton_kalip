"use client";

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';
import { useState } from 'react';
import { productCategories } from '@/lib/products';
import { Instagram, Facebook, Linkedin, Menu, X } from 'lucide-react';

// Custom X (Twitter) icon component like in yay project
const XIcon = ({ size = 16 }: { size?: number }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

// Youtube Icon like in yay project
const YoutubeIcon = ({ size = 16 }: { size?: number }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
);

interface HeaderProps {
    settings?: any;
    categories?: any[];
}

export default function Header({ settings, categories = [] }: HeaderProps) {
    const t = useTranslations('Navigation');
    const locale = useLocale();

    const tProducts = useTranslations('ProductCategories');
    const tHeader = useTranslations('Header');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

    // Use static fallback if dynamic categories are empty
    const displayCategories = categories.length > 0 ? categories : productCategories;

    const getCategoryTitle = (category: any) => {
        // 1. Try dynamic title (DB)
        if (category.title && typeof category.title === 'object') {
            return category.title[locale] || category.title['tr'] || category.title['en'] || category.slug;
        }
        // 2. Try static translation (Fallback)
        if (category.id) {
            const translated = tProducts(category.id);
            return translated || category.slug;
        }
        // 3. Fallback to slug
        return category.slug;
    };

    const navItems = [
        { key: 'home', href: '/' },
        { key: 'products', href: '/products' },
        { key: 'corporate', href: '/corporate' },
        { key: 'references', href: '/references' },
        { key: 'blog', href: '/blog' },
        { key: 'contact', href: '/contact' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all font-sans">
            {/* Top Bar - Clean Modern Style */}
            <div className="bg-[#1a1a2e] text-white py-2 hidden md:block">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    {/* Left Side: Contact Info */}
                    <div className="flex items-center gap-6">
                        {/* Phone Pill */}
                        <a href={`tel:${settings?.phone || '+905555555555'}`} className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full py-1.5 px-4 hover:shadow-lg hover:shadow-orange-500/25 transition-all">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="text-white text-xs font-medium uppercase tracking-wide">Bizi Arayın:</span>
                            <span className="font-bold text-sm text-white">{settings?.phone || '+90 532 676 34 88'}</span>
                        </a>

                        {/* Email Pill */}
                        <a href={`mailto:${settings?.email || 'info@bagcilar.com'}`} className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full py-1.5 px-4 hover:bg-white/20 transition-all">
                            <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-gray-300 text-xs font-medium uppercase tracking-wide">E-Posta:</span>
                            <span className="font-semibold text-sm text-white">{settings?.email || 'info@bagcilar.com'}</span>
                        </a>
                    </div>

                    {/* Right Side: Social & Language */}
                    <div className="flex items-center gap-6">
                        {/* Social Icons */}
                        <div className="flex items-center gap-3">
                            {settings?.instagram && (
                                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
                                    <Instagram size={18} />
                                </a>
                            )}
                            {settings?.facebook && (
                                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
                                    <Facebook size={18} />
                                </a>
                            )}
                            {settings?.linkedin && (
                                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
                                    <Linkedin size={18} />
                                </a>
                            )}
                            {/* X (Twitter) */}
                            {settings?.twitter && (
                                <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
                                    <XIcon size={18} />
                                </a>
                            )}
                            {/* YouTube */}
                            {settings?.youtube && (
                                <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
                                    <YoutubeIcon size={18} />
                                </a>
                            )}
                        </div>

                        {/* Language Switcher Link */}
                        <div className="border-l border-gray-700 pl-6">
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header - White Background */}
            <div className="bg-white shadow-md relative z-40">
                <div className="container mx-auto px-4">
                    <div
                        className="flex justify-between items-center min-h-[80px] transition-all duration-300"
                        style={{
                            paddingTop: settings?.headerPadding !== undefined ? `${settings.headerPadding}px` : '8px',
                            paddingBottom: settings?.headerPadding !== undefined ? `${settings.headerPadding}px` : '8px'
                        }}
                    >
                        {/* Logo */}
                        <Link href="/" className="shrink-0 flex items-center gap-3 group">
                            {settings?.logoUrl ? (
                                <img
                                    src={settings.logoUrl}
                                    alt="Bağcılar Beton Kalıp"
                                    style={{ height: `${settings.logoHeight || 60}px` }}
                                    className="w-auto object-contain"
                                />
                            ) : (
                                <>
                                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white">
                                        <span className="text-xl font-black">B</span>
                                    </div>
                                    <div className="flex flex-col leading-none">
                                        <span className="text-gray-800 text-lg font-black tracking-wide">BAĞCILAR</span>
                                        <span className="text-orange-500 text-[0.6rem] uppercase tracking-widest font-semibold">Beton Kalıp Sistemleri</span>
                                    </div>
                                </>
                            )}
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center self-stretch">
                            {navItems.map((item) => {
                                // Define Icons
                                let Icon = (
                                    <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                );

                                if (item.key === 'home') {
                                    Icon = (
                                        <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    )
                                } else if (item.key === 'products') {
                                    Icon = (
                                        <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    )
                                    // Let's use a better icon, maybe a wall structure
                                    Icon = (
                                        <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                        </svg>
                                    )
                                } else if (item.key === 'corporate') {
                                    Icon = (
                                        <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    )
                                } else if (item.key === 'references') {
                                    Icon = (
                                        <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    )
                                } else if (item.key === 'blog') {
                                    Icon = (
                                        <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                        </svg>
                                    )
                                } else if (item.key === 'contact') {
                                    Icon = (
                                        <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    )
                                }

                                if (item.key === 'products') {
                                    return (
                                        <div
                                            key={item.key}
                                            className="group relative h-full flex items-center"
                                            onMouseEnter={() => setIsMegaMenuOpen(true)}
                                            onMouseLeave={() => setIsMegaMenuOpen(false)}
                                        >
                                            <Link
                                                href={item.href}
                                                className="flex flex-col items-center justify-center text-gray-600 group-hover:text-orange-500 transition-colors text-sm lg:text-base font-medium px-2 md:px-3 lg:px-5 py-2 whitespace-nowrap"
                                            >
                                                <span className="text-gray-400 group-hover:text-orange-500 transition-colors duration-300 [&>svg]:w-7 [&>svg]:h-7">{Icon}</span>
                                                <span className="flex items-center gap-1">
                                                    {t(item.key)}
                                                    <svg className={`w-4 h-4 transition-transform duration-300 text-gray-400 ${isMegaMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </span>
                                            </Link>

                                            {/* Premium Dark Mega Menu */}
                                            <div
                                                className="absolute top-full left-1/2 transform -translate-x-1/2 w-[95vw] max-w-6xl transition-all duration-300 ease-out z-50 pt-4 opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0"
                                            >
                                                <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50 backdrop-blur-xl">
                                                    {/* Top Accent Bar */}
                                                    <div className="h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600"></div>

                                                    <div className="p-8">
                                                        {/* Header */}
                                                        <div className="flex items-center justify-between mb-8">
                                                            <div>
                                                                <h3 className="text-2xl font-black text-white tracking-tight">{tHeader('megaMenuTitle')}</h3>
                                                                <p className="text-sm text-gray-400 mt-1">{tHeader('megaMenuSubtitle')}</p>
                                                            </div>
                                                            <Link href="/quote" className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:shadow-lg hover:shadow-orange-500/25 transition-all">
                                                                <span>{tHeader('getQuote')}</span>
                                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                                            </Link>
                                                        </div>

                                                        {/* Categories Grid */}
                                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                                            {displayCategories.map((category) => {
                                                                // Construction-specific icons based on category
                                                                let CategoryIcon;

                                                                // Match by slug for precise icon assignment
                                                                if (category.slug === 'column' || category.slug.includes('kolon')) {
                                                                    // Column icon - vertical pillars
                                                                    CategoryIcon = (
                                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v18m6-18v18M4 6h16M4 18h16" />
                                                                        </svg>
                                                                    );
                                                                } else if (category.slug === 'railing' || category.slug.includes('korkuluk')) {
                                                                    // Railing icon - horizontal bars
                                                                    CategoryIcon = (
                                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 12h16M4 16h16" />
                                                                        </svg>
                                                                    );
                                                                } else if (category.slug === 'door-arch' || category.slug.includes('kemer')) {
                                                                    // Door/Arch icon
                                                                    CategoryIcon = (
                                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v10M16 7v10M8 7a4 4 0 018 0M5 21h14" />
                                                                        </svg>
                                                                    );
                                                                } else if (category.slug === 'barrier' || category.slug.includes('bariyer')) {
                                                                    // Barrier icon - road barrier
                                                                    CategoryIcon = (
                                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18M6 6l3 12M18 6l-3 12" />
                                                                        </svg>
                                                                    );
                                                                } else if (category.slug === 'garden-wall' || category.slug.includes('bahce')) {
                                                                    // Garden wall icon - brick pattern
                                                                    CategoryIcon = (
                                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7h18M3 11h18M3 15h18M3 19h18M8 7v12M16 7v12" />
                                                                        </svg>
                                                                    );
                                                                } else if (category.slug === 'concrete-fence' || category.slug.includes('cit')) {
                                                                    // Fence icon - panel fence
                                                                    CategoryIcon = (
                                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v18M10 3v18M15 3v18M20 3v18M3 8h18M3 16h18" />
                                                                        </svg>
                                                                    );
                                                                } else if (category.slug === 'plywood' || category.slug.includes('plywood')) {
                                                                    // Plywood/Panel icon
                                                                    CategoryIcon = (
                                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4h16v16H4V4zm4 4h8v8H8V8z" />
                                                                        </svg>
                                                                    );
                                                                } else if (category.slug === 'beam' || category.slug.includes('hatil')) {
                                                                    // Beam/Lintel icon - horizontal beam
                                                                    CategoryIcon = (
                                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 12h16M4 8h16M4 16h16" />
                                                                        </svg>
                                                                    );
                                                                } else if (category.slug === 'auxiliary' || category.slug.includes('yardimci')) {
                                                                    // Tools/Auxiliary icon
                                                                    CategoryIcon = (
                                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                        </svg>
                                                                    );
                                                                } else if (category.slug === 'special-design' || category.slug.includes('ozel')) {
                                                                    // Special design icon - star/custom
                                                                    CategoryIcon = (
                                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                                        </svg>
                                                                    );
                                                                } else {
                                                                    // Default construction icon - building blocks
                                                                    CategoryIcon = (
                                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                                        </svg>
                                                                    );
                                                                }

                                                                // Localized Title
                                                                const title = getCategoryTitle(category);

                                                                return (
                                                                    <Link
                                                                        key={category.id}
                                                                        href={`/products/category/${category.slug}`}
                                                                        className="group/card relative bg-gray-800/50 hover:bg-gray-700/70 rounded-xl p-5 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10"
                                                                    >
                                                                        {/* Icon */}
                                                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 text-gray-400 group-hover/card:from-orange-500 group-hover/card:to-amber-500 group-hover/card:text-white flex items-center justify-center mb-4 transition-all duration-300 shadow-lg">
                                                                            {CategoryIcon}
                                                                        </div>
                                                                        {/* Text */}
                                                                        <h4 className="font-bold text-sm text-white group-hover/card:text-orange-400 transition-colors leading-tight">
                                                                            {title}
                                                                        </h4>
                                                                        {/* Arrow */}
                                                                        <div className="absolute top-4 right-4 opacity-0 group-hover/card:opacity-100 transition-opacity text-orange-400">
                                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                                                        </div>
                                                                    </Link>
                                                                );
                                                            })}
                                                        </div>

                                                        {/* Footer */}
                                                        <div className="mt-8 pt-6 border-t border-gray-700/50 flex items-center justify-between">
                                                            <p className="text-xs text-gray-500">{tHeader('megaMenuFooter')}</p>
                                                            <Link href="/products" className="flex items-center gap-2 text-sm font-bold text-orange-400 hover:text-orange-300 transition-colors">
                                                                {t('allProducts')}
                                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                return (
                                    <Link
                                        key={item.key}
                                        href={item.href}
                                        className="flex flex-col items-center justify-center text-gray-600 hover:text-orange-500 transition-colors text-sm lg:text-base font-medium px-2 md:px-3 lg:px-5 py-2 group whitespace-nowrap"
                                    >
                                        <span className="text-gray-400 group-hover:text-orange-500 transition-colors duration-300 [&>svg]:w-7 [&>svg]:h-7">{Icon}</span>
                                        {t(item.key)}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Mobile Menu Button - Dark Icon */}
                        <div className="md:hidden flex items-center gap-2 shrink-0">
                            <LanguageSwitcher variant="dark" mode="alternate" />
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="text-black focus:outline-none transition-colors z-[60] relative p-1"
                                aria-label="Menu"
                            >
                                {mobileMenuOpen ? (
                                    <X size={32} color="#000000" strokeWidth={2.5} />
                                ) : (
                                    <Menu size={32} color="#000000" strokeWidth={2.5} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {
                mobileMenuOpen && (
                    <div className="md:hidden bg-[#1a1a2e] border-t border-gray-800 absolute top-full left-0 w-full max-h-[80vh] overflow-y-auto shadow-2xl z-50">
                        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                            {navItems.map((item) => {
                                if (item.key === 'products') {
                                    return (
                                        <div key={item.key} className="border-b border-gray-800 pb-2">
                                            <button
                                                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                                                className="flex items-center justify-between w-full text-gray-300 hover:text-orange-500 font-semibold uppercase tracking-wide"
                                            >
                                                {t(item.key)}
                                                <svg className={`w-5 h-5 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>

                                            {mobileProductsOpen && (
                                                <div className="mt-4 pl-4 space-y-3">
                                                    {displayCategories.map((category) => {
                                                        const title = getCategoryTitle(category);

                                                        return (
                                                            <Link
                                                                key={category.id}
                                                                href={`/products/category/${category.slug}`}
                                                                className="block text-sm text-gray-400 hover:text-white"
                                                                onClick={() => setMobileMenuOpen(false)}
                                                            >
                                                                • {title}
                                                            </Link>
                                                        );
                                                    })}
                                                    <Link
                                                        href="/products"
                                                        className="block text-sm font-bold text-accent pt-2"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        {t('allProducts')} →
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    )
                                }
                                return (
                                    <Link
                                        key={item.key}
                                        href={item.href}
                                        className="text-gray-300 hover:text-accent font-semibold uppercase tracking-wide block"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {t(item.key)}
                                    </Link>
                                )
                            })}

                            {/* Mobile Contact Info */}
                            <div className="mt-8 pt-8 border-t border-gray-800">
                                <div className="flex flex-col gap-4">
                                    <a href="tel:+905555555555" className="flex items-center gap-3 text-white">
                                        <span className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </span>
                                        <div>
                                            <div className="text-xs text-gray-400 uppercase tracking-wider">{tHeader('callUs')}</div>
                                            <div className="font-bold">+90 555 555 55 55</div>
                                        </div>
                                    </a>
                                    <Link
                                        href="/quote"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="bg-white text-primary font-bold py-3 px-4 rounded text-center block"
                                    >
                                        {tHeader('getQuote')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </header>
    );
}
