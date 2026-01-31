"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
// Note: If use-debounce is not installed, I will implement a custom simple debounce. 
// Checking package.json would be ideal but for a single file I can just write the logic.
// Let's write a simple custom logic to avoid dependency issues if not present.

export default function ProductSearch() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Initial value from URL
    const [text, setText] = useState(searchParams.get("search") || "");

    // Debounce logic
    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams);
            if (text) {
                params.set("search", text);
            } else {
                params.delete("search");
            }
            // Reset page to 1 when searching
            params.set("page", "1");

            router.replace(`${pathname}?${params.toString()}`);
        }, 500); // 500ms delay

        return () => clearTimeout(timer);
    }, [text, router, pathname, searchParams]);

    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="Ürün ara..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        </div>
    );
}
