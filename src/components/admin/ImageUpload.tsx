'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
    required?: boolean;
}

export default function ImageUpload({ value, onChange, label, required = false }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(value || '');

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Önizleme için local URL oluştur
        const localPreview = URL.createObjectURL(file);
        setPreview(localPreview);
        setUploading(true);

        try {
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
            setPreview(data.url);
            onChange(data.url);
        } catch (error) {
            console.error('Upload error:', error);
            alert(error instanceof Error ? error.message : 'Dosya yüklenirken bir hata oluştu');
            setPreview(value || '');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div className="space-y-3">
                {/* Upload Button */}
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="image-upload"
                        disabled={uploading}
                    />
                    <label
                        htmlFor="image-upload"
                        className={`inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer bg-white text-gray-800 hover:bg-gray-50 transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        {uploading ? 'Yükleniyor...' : 'Görsel Seç'}
                    </label>
                </div>

                {/* Preview */}
                {preview && (
                    <div className="relative w-full max-w-md">
                        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                                src={preview}
                                alt="Preview"
                                fill
                                className="object-contain"
                                unoptimized
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                setPreview('');
                                onChange('');
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                {uploading && (
                    <div className="text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
                            Görsel yükleniyor...
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
