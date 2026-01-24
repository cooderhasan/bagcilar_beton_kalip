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
        <div className="flex items-center ml-2 bg-white/5 rounded-lg p-1 gap-1">
            <button
                onClick={() => changeLocale('tr')}
                disabled={isPending}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-xs font-bold leading-none ${locale === 'tr' ? 'bg-[#EA580C] text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
                <div className="w-4 h-4 rounded-full overflow-hidden relative border border-white/20 shrink-0">
                    <img
                        src="https://flagcdn.com/tr.svg"
                        alt="Türkçe"
                        className="w-full h-full object-cover"
                    />
                </div>
                <span>TR</span>
            </button>
            <button
                onClick={() => changeLocale('en')}
                disabled={isPending}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-xs font-bold leading-none ${locale === 'en' ? 'bg-[#EA580C] text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
                <div className="w-4 h-4 rounded-full overflow-hidden relative border border-white/20 shrink-0">
                    <img
                        src="https://flagcdn.com/gb.svg"
                        alt="English"
                        className="w-full h-full object-cover"
                    />
                </div>
                <span>EN</span>
            </button>
        </div>
    );
}
