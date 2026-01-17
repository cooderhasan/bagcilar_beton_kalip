"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from "@/i18n/routing";
import { ChangeEvent, useTransition } from 'react';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const changeLocale = (nextLocale: string) => {
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    return (
        <div className="flex items-center gap-1 md:gap-2">
            <button
                onClick={() => changeLocale('tr')}
                disabled={isPending}
                className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 rounded transition-all text-xs font-bold ${locale === 'tr' ? 'bg-[#EA580C] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
                <div className="w-5 h-3.5 relative shadow-sm rounded-sm overflow-hidden">
                    <svg viewBox="0 0 1200 800" className="w-full h-full object-cover">
                        <rect width="1200" height="800" fill="#E30A17" />
                        <circle cx="444" cy="400" r="236.8" fill="#FFFFFF" />
                        <circle cx="479.6" cy="400" r="189.6" fill="#E30A17" />
                        <g transform="translate(681.6 400)">
                            <path fill="#FFFFFF" d="M0 -150 L39.2 -47.1 L142.6 -47.1 L59.1 13.9 L91.2 116.1 L0 58.7 L-91.2 116.1 L-59.1 13.9 L-142.6 -47.1 L-103.2 -47.1 Z" transform="rotate(-18)" />
                        </g>
                    </svg>
                </div>
                <span className="hidden md:inline">TR</span>
            </button>
            <div className="w-px h-4 bg-gray-700 mx-0.5 md:mx-1"></div>
            <button
                onClick={() => changeLocale('en')}
                disabled={isPending}
                className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 rounded transition-all text-xs font-bold ${locale === 'en' ? 'bg-[#EA580C] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
                <div className="w-5 h-3.5 relative shadow-sm rounded-sm overflow-hidden">
                    <svg viewBox="0 0 60 30" className="w-full h-full object-cover">
                        <clipPath id="t">
                            <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
                        </clipPath>
                        <path d="M0,0 v30 h60 v-30 z" fill="#00247d" />
                        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
                        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#cf142b" strokeWidth="4" />
                        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
                        <path d="M30,0 v30 M0,15 h60" stroke="#cf142b" strokeWidth="6" />
                    </svg>
                </div>
                <span className="hidden md:inline">EN</span>
            </button>
        </div>
    );
}
