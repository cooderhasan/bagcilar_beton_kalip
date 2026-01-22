'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

interface ProductGalleryProps {
    images: string[];
    title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (images.length === 0) {
        return (
            <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center">
                <svg className="w-32 h-32 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div
                className="group relative aspect-[4/3] bg-white rounded-3xl overflow-hidden shadow-2xl shadow-gray-200 border border-gray-100 cursor-zoom-in"
                onClick={() => setIsLightboxOpen(true)}
            >
                <Image
                    src={images[selectedIndex]}
                    alt={`${title} - Görsel ${selectedIndex + 1}`}
                    fill
                    className="object-contain p-2 transition-transform duration-500"
                    unoptimized
                />

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-orange-500 transition-all opacity-0 group-hover:opacity-100"
                            aria-label="Önceki görsel"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-orange-500 transition-all opacity-0 group-hover:opacity-100"
                            aria-label="Sonraki görsel"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                        {selectedIndex + 1} / {images.length}
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="grid grid-cols-5 gap-3">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedIndex(idx)}
                            className={`relative aspect-square bg-white rounded-xl overflow-hidden shadow-lg border-2 transition-all ${selectedIndex === idx
                                ? 'border-orange-500 ring-2 ring-orange-200'
                                : 'border-gray-100 hover:border-orange-300'
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`${title} ${idx + 1}`}
                                fill
                                className="object-contain p-2"
                                unoptimized
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Lightbox Modal */}
            {/* Lightbox Modal */}
            {isLightboxOpen && mounted && createPortal(
                <div
                    className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setIsLightboxOpen(false)}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setIsLightboxOpen(false)}
                        className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-[10000] p-2"
                    >
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Main Image */}
                    <div
                        className="relative w-full h-full max-w-5xl max-h-[85vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={images[selectedIndex]}
                            alt={`${title} - Tam Ekran`}
                            fill
                            className="object-contain"
                            unoptimized
                            priority
                        />
                    </div>

                    {/* Navigation */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
                                }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md z-[10000]"
                            >
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md z-[10000]"
                            >
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Counter */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 px-4 py-2 rounded-full text-white/90 font-medium backdrop-blur-md z-[10000]">
                                {selectedIndex + 1} / {images.length}
                            </div>

                            {/* Thumbnails */}
                            <div className="absolute bottom-6 right-6 hidden md:flex gap-2 z-[10000]">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedIndex(idx);
                                        }}
                                        className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${selectedIndex === idx ? 'border-orange-500 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`Thumbnail ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>,
                document.body
            )}

        </div>
    );
}
