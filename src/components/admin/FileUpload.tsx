'use client';

import { useState } from 'react';
import Image from 'next/image';

interface FileUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
    accept?: string;
}

export default function FileUpload({
    value,
    onChange,
    label,
    accept = "image/*,application/pdf"
}: FileUploadProps) {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

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
            onChange(data.url);
        } catch (error) {
            console.error('Upload error:', error);
            alert(error instanceof Error ? error.message : 'Dosya yüklenirken bir hata oluştu');
        } finally {
            setUploading(false);
        }
    };

    const isPdf = value?.toLowerCase().endsWith('.pdf');

    return (
        <div>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}

            <div className="space-y-4">
                {/* File Preview */}
                {value && (
                    <div className="relative group w-full max-w-xs">
                        {isPdf ? (
                            <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {value.split('/').pop()}
                                    </p>
                                    <a
                                        href={value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                        Görüntüle
                                    </a>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => onChange('')}
                                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                    title="Kaldır"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                <Image
                                    src={value}
                                    alt="Preview"
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                                <button
                                    type="button"
                                    onClick={() => onChange('')}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-colors shadow-sm"
                                    title="Kaldır"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Upload Button */}
                {!value && (
                    <div>
                        <input
                            type="file"
                            accept={accept}
                            onChange={handleFileChange}
                            className="hidden"
                            id={`file-upload-${label?.replace(/\s+/g, '-').toLowerCase()}`}
                            disabled={uploading}
                        />
                        <label
                            htmlFor={`file-upload-${label?.replace(/\s+/g, '-').toLowerCase()}`}
                            className={`inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-gray-700 transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            {uploading ? 'Yükleniyor...' : 'Dosya Seç'}
                        </label>
                        <p className="mt-1 text-xs text-gray-500">
                            PDF veya görsel yükleyebilirsiniz (Max 20MB)
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
