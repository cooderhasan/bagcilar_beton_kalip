"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface ExpandableDescriptionProps {
    description: string;
    initialExpanded?: boolean;
    maxLength?: number; // Character count before truncation
}

export default function ExpandableDescription({
    description,
    initialExpanded = false,
    maxLength = 250
}: ExpandableDescriptionProps) {
    const [isExpanded, setIsExpanded] = useState(initialExpanded);

    // Simple check if description contains HTML
    const isHtml = /<[a-z][\s\S]*>/i.test(description);

    // If text is short enough, just show it all without toggle
    if (description.length <= maxLength) {
        return (
            <div className="max-w-4xl text-gray-300 font-light leading-relaxed text-sm md:text-base">
                {isHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                ) : (
                    <p>{description}</p>
                )}
            </div>
        );
    }

    return (
        <div className="max-w-4xl">
            <div
                className={`text-gray-300 font-light leading-relaxed text-sm md:text-base transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-[85px] relative' // approx 3 lines
                    }`}
            >
                {isHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                ) : (
                    <p>{description}</p>
                )}

                {/* Fade effect when collapsed */}
                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/80 to-transparent pointer-events-none" />
                )}
            </div>

            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-orange-400 hover:text-orange-300 text-sm font-semibold flex items-center gap-1 transition-colors group focus:outline-none"
            >
                {isExpanded ? (
                    <>
                        Daha Az Göster
                        <svg className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                    </>
                ) : (
                    <>
                        Devamını Oku
                        <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </>
                )}
            </button>
        </div>
    );
}
