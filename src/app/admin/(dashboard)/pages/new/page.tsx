"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/admin/RichTextEditor"), {
    ssr: false,
    loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>,
});

import ImageUpload from "@/components/admin/ImageUpload";

export default function NewPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [contentTr, setContentTr] = useState("");
    const [contentEn, setContentEn] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            slug: formData.get("slug"),
            title: {
                tr: formData.get("title_tr"),
                en: formData.get("title_en"),
            },
            content: {
                tr: contentTr,
                en: contentEn,
            },
            image: imageUrl,
            seoTitle: formData.get("seoTitle"),
            seoDescription: formData.get("seoDescription"),
            isActive: true,
        };

        try {
            const res = await fetch("/api/admin/pages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const error = await res.text();
                throw new Error(error);
            }

            toast.success("Sayfa başarıyla oluşturuldu");
            router.push("/admin/pages");
            router.refresh();
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Bir hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Yeni Sayfa Ekle</h1>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-8">
                {/* Basic Info */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Slug (URL) *
                        </label>
                        <input
                            name="slug"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900"
                            placeholder="about-us"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Örn: about-us, privacy-policy, contact
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Sayfa Başlığı (TR) *
                            </label>
                            <input
                                name="title_tr"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Page Title (EN) *
                            </label>
                            <input
                                name="title_en"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900"
                            />
                        </div>
                    </div>

                    {/* Page Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Sayfa Resmi
                        </label>
                        <ImageUpload
                            value={imageUrl}
                            onChange={setImageUrl}
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-6 border-t pt-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            İçerik (TR)
                        </label>
                        <RichTextEditor content={contentTr} onChange={setContentTr} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Content (EN)
                        </label>
                        <RichTextEditor content={contentEn} onChange={setContentEn} />
                    </div>
                </div>

                {/* SEO */}
                <div className="space-y-4 border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900">SEO Ayarları</h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            SEO Başlık (Meta Title)
                        </label>
                        <input
                            name="seoTitle"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            SEO Açıklama (Meta Description)
                        </label>
                        <textarea
                            name="seoDescription"
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                        İptal
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg disabled:opacity-50"
                    >
                        {loading ? "Kaydediliyor..." : "Kaydet"}
                    </button>
                </div>
            </form>
        </div>
    );
}
