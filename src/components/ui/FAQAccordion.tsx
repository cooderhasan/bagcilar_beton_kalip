"use client";

import { useState } from "react";

interface FAQItem {
    id: string;
    question: { tr: string; en: string };
    answer: { tr: string; en: string };
}

interface FAQAccordionProps {
    faqs: FAQItem[];
    locale: string;
    title?: string;
}

export default function FAQAccordion({ faqs, locale, title }: FAQAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    if (faqs.length === 0) return null;

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 rounded-2xl mb-4">
                            <svg className="w-7 h-7 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                            {title || (locale === "tr" ? "Sıkça Sorulan Sorular" : "Frequently Asked Questions")}
                        </h2>
                    </div>

                    {/* Accordion */}
                    <div className="space-y-3">
                        {faqs.map((faq, index) => {
                            const question = (faq.question as any)?.[locale] || (faq.question as any)?.tr;
                            const answer = (faq.answer as any)?.[locale] || (faq.answer as any)?.tr;
                            const isOpen = openIndex === index;

                            return (
                                <div
                                    key={faq.id}
                                    className={`bg-white rounded-xl border transition-all duration-300 ${isOpen ? "border-orange-200 shadow-lg shadow-orange-100/50" : "border-gray-200 hover:border-gray-300"
                                        }`}
                                >
                                    <button
                                        onClick={() => setOpenIndex(isOpen ? null : index)}
                                        className="w-full flex items-center justify-between p-5 text-left"
                                    >
                                        <span className={`font-semibold pr-4 ${isOpen ? "text-orange-600" : "text-gray-800"}`}>
                                            {question}
                                        </span>
                                        <span
                                            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-orange-500 text-white rotate-180" : "bg-gray-100 text-gray-500"
                                                }`}
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </button>

                                    {/* Answer */}
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                            }`}
                                    >
                                        <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                                            {answer}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
