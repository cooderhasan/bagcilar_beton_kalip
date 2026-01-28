"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition } from 'react';

const TrFlag = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" className={className}>
        <rect width="1200" height="800" fill="#E30A17" />
        <circle cx="425" cy="400" r="200" fill="#ffffff" />
        <circle cx="475" cy="400" r="160" fill="#E30A17" />
        <path d="M583.334 400l180.901 58.779-111.804-153.885v190.212l111.804-153.885z" fill="#ffffff" />
    </svg>
);

const EnFlag = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className={className}>
        <clipPath id="s">
            <path d="M0,0 v30 h60 v-30 z" />
        </clipPath>
        <clipPath id="t">
            <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
        </clipPath>
        <g clipPath="url(#s)">
            <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </g>
    </svg>
);

export default function LanguageSwitcher({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const changeLocale = (nextLocale: string) => {
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    const textColor = variant === 'dark' ? 'text-gray-700' : 'text-white/70';
    const activeBg = variant === 'dark' ? 'bg-orange-600' : 'bg-orange-600';
    const hoverBg = variant === 'dark' ? 'hover:bg-gray-100' : 'hover:bg-white/10';
    const activeText = 'text-white';
    const hoverText = variant === 'dark' ? 'hover:text-black' : 'hover:text-white';

    return (
        <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
            <button
                onClick={() => changeLocale('tr')}
                disabled={isPending}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-bold transition-all
                    ${locale === 'tr'
                        ? `${activeBg} ${activeText} shadow-sm`
                        : `${textColor} ${hoverText} ${hoverBg}`
                    }`}
            >
                <TrFlag className="w-[18px] h-auto rounded-[2px] shadow-sm shrink-0" />
                <span>TR</span>
            </button>
            <button
                onClick={() => changeLocale('en')}
                disabled={isPending}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-bold transition-all
                    ${locale === 'en'
                        ? `${activeBg} ${activeText} shadow-sm`
                        : `${textColor} ${hoverText} ${hoverBg}`
                    }`}
            >
                <EnFlag className="w-[18px] h-auto rounded-[2px] shadow-sm shrink-0" />
                <span>EN</span>
            </button>
        </div>
    );
}
