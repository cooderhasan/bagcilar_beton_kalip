import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['tr', 'en'],

    // Used when no locale matches
    defaultLocale: 'tr',

    // Prefix destination locale
    localePrefix: 'as-needed'
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
