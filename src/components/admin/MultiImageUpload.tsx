'use client';

import { useState } from 'react';
import Image from 'next/image';

interface MultiImageUploadProps {
    value?: string[];
    onChange: (urls: string[]) => void;
    label?: string;
    maxImages?: number;
}

export default function MultiImageUpload({
    value = [],
    onChange,
    label,
    maxImages = 10
}: MultiImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState<string[]>(value);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        // Maksimum görsel kontrolü
        if (images.length + files.length > maxImages) {
            alert(`Maksimum ${maxImages} görsel yükleyebilirsiniz`);
            return;
        }

        setUploading(true);
        const uploadedUrls: string[] = [];

        try {
            for (const file of files) {
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || 'Upload başarısız');
                }

                const data = await response.json();
                uploadedUrls.push(data.url);
            }

            const newImages = [...images, ...uploadedUrls];
            setImages(newImages);
            onChange(newImages);
        } catch (error) {
            console.error('Upload error:', error);
            alert(error instanceof Error ? error.message : 'Dosya yüklenirken bir hata oluştu');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        onChange(newImages);
    };

    const moveImage = (fromIndex: number, toIndex: number) => {
        const newImages = [...images];
        const [movedImage] = newImages.splice(fromIndex, 1);
        newImages.splice(toIndex, 0, movedImage);
        setImages(newImages);
        onChange(newImages);
    };

    return (
        <div>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}

            <div className="space-y-4">
                {/* Upload Button */}
                {images.length < maxImages && (
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                            id="multi-image-upload"
                            disabled={uploading}
                        />
                        <label
                            htmlFor="multi-image-upload"
                            className={`inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer bg-white text-gray-800 hover:bg-gray-50 transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            {uploading ? 'Yükleniyor...' : `Görsel Ekle (${images.length}/${maxImages})`}
                        </label>
                    </div>
                )}

                {/* Image Grid */}
                {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((url, index) => (
                            <div key={index} className="relative group">
                                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-orange-500 transition-colors">
                                    <Image
                                        src={url}
                                        alt={`Görsel ${index + 1}`}
                                        fill
                                        className="object-cover cursor-pointer"
                                        onClick={() => setLightboxIndex(index)}
                                        unoptimized
                                    />

                                    {/* Sıra numarası */}
                                    <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                        {index + 1}
                                    </div>

                                    {/* Kontrol butonları */}
                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {/* Sola taşı */}
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => moveImage(index, index - 1)}
                                                className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                                                title="Sola taşı"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>
                                        )}

                                        {/* Sağa taşı */}
                                        {index < images.length - 1 && (
                                            <button
                                                type="button"
                                                onClick={() => moveImage(index, index + 1)}
                                                className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                                                title="Sağa taşı"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        )}

                                        {/* Sil */}
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                                            title="Sil"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {uploading && (
                    <div className="text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
                            Görseller yükleniyor...
                        </div>
                    </div>
                )}
            </div>

            {/* Lightbox - Tam boyut görüntüleme */}
            {lightboxIndex !== null && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setLightboxIndex(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-gray-300"
                        onClick={() => setLightboxIndex(null)}
                    >
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Önceki */}
                    {lightboxIndex > 0 && (
                        <button
                            className="absolute left-4 text-white hover:text-gray-300"
                            onClick={(e) => {
                                e.stopPropagation();
                                setLightboxIndex(lightboxIndex - 1);
                            }}
                        >
                            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {/* Görsel */}
                    <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
                        <Image
                            src={images[lightboxIndex]}
                            alt={`Görsel ${lightboxIndex + 1}`}
                            fill
                            className="object-contain"
                            unoptimized
                        />
                    </div>

                    {/* Sonraki */}
                    {lightboxIndex < images.length - 1 && (
                        <button
                            className="absolute right-4 text-white hover:text-gray-300"
                            onClick={(e) => {
                                e.stopPropagation();
                                setLightboxIndex(lightboxIndex + 1);
                            }}
                        >
                            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}

                    {/* Sayaç */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded">
                        {lightboxIndex + 1} / {images.length}
                    </div>
                </div>
            )}
        </div>
    );
}
