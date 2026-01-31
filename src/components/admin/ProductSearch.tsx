"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function ProductSearch() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set("search", term);
        } else {
            params.delete("search");
        }

        // Only reset to page 1 if the 'search' parameter actually changes
        // This prevents resetting when the user navigates pages (which changes searchParams but not the search query itself)
        if (term !== (searchParams.get("search") || "")) {
            params.set("page", "1");
            router.replace(`${pathname}?${params.toString()}`);
        }
    }, 500);

    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="Ürün ara..."
                defaultValue={searchParams.get("search")?.toString()}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
            />
        </div>
    );
}
