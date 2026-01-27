"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface ProductShareProps {
    title: string;
}

export default function ProductShare({ title }: ProductShareProps) {
    const t = useTranslations("ProductCategories"); // Using ProductCategories as it seems to contain the "shareProduct" key based on previous steps, wait... "shareProduct" was added to "Products" in previous step.
    // Actually, let's check where I added "shareProduct". I added it to "ProductCategories" in previous step? 
    // No, I added it to "Products" key in json.

    // Let's re-verify json content in my mind:
    // "Products": { ..., "shareProduct": "..." }

    const tProducts = useTranslations("ProductCategories"); // Wait, I added it to "ProductCategories" or "Products"?
    // In step 168/169, I added it to "Products" section in the JSON file messages/tr.json:
    //  "Products": {
    //      "stone-pattern": "...",
    //      "shareProduct": "Bu ürünü paylaş:"
    //  }

    const tP = useTranslations("Products");

    const [currentUrl, setCurrentUrl] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setCurrentUrl(window.location.href);
        }
    }, []);

    const shareLinks = [
        {
            name: "Facebook",
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            ),
            color: "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"
        },
        {
            name: "X (Twitter)",
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`,
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            ),
            color: "bg-gray-50 text-gray-700 hover:bg-black hover:text-white"
        },
        {
            name: "LinkedIn",
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            ),
            color: "bg-blue-50 text-blue-700 hover:bg-blue-700 hover:text-white"
        }
    ];

    const handleShare = (url: string) => {
        if (!currentUrl) return;
        window.open(url, '_blank', 'width=600,height=400');
    };

    if (!currentUrl) return null;

    return (
        <div className="flex items-center gap-4 text-sm text-gray-500 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <span className="text-gray-600 font-medium">{tP('shareProduct')}</span>
            <div className="flex gap-2">
                {shareLinks.map((link) => (
                    <button
                        key={link.name}
                        onClick={() => handleShare(link.url)}
                        title={link.name}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg ${link.color}`}
                    >
                        {link.icon}
                    </button>
                ))}
            </div>
        </div>
    );
}
