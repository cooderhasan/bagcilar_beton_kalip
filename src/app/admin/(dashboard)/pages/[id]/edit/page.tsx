"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";
import { use } from "react";

const RichTextEditor = dynamic(() => import("@/components/admin/RichTextEditor"), {
    ssr: false,
    loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>,
});

import ImageUpload from "@/components/admin/ImageUpload";

export default function EditPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [page, setPage] = useState<any>(null);
    const [contentTr, setContentTr] = useState("");
    const [contentEn, setContentEn] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [heroImageUrl, setHeroImageUrl] = useState("");

    useEffect(() => {
        fetchPage();
    }, [id]);

    const fetchPage = async () => {
        try {
            const res = await fetch(`/api/admin/pages/${id}`);
            if (!res.ok) throw new Error("Sayfa bulunamadı");

            const data = await res.json();
            setPage(data);
            setContentTr(data.content?.tr || "");
            setContentEn(data.content?.en || "");

            setImageUrl(data.image || "");
            setHeroImageUrl(data.heroImage || "");
        } catch (error) {
            console.error(error);
            toast.error("Sayfa bilgileri yüklenemedi");
            router.push("/admin/pages");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

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
            heroImage: heroImageUrl,
            seoTitle: formData.get("seoTitle"),
            seoDescription: formData.get("seoDescription"),
            isActive: page.isActive,
        };

        try {
            const res = await fetch(`/api/admin/pages/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Sayfa güncellenemedi");

            toast.success("Sayfa başarıyla güncellendi");
            router.push("/admin/pages");
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Bir hata oluştu");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div>Yükleniyor...</div>;
    if (!page) return null;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Sayfayı Düzenle</h1>

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
                            defaultValue={page.slug}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Sayfa Başlığı (TR) *
                            </label>
                            <input
                                name="title_tr"
                                required
                                defaultValue={page.title?.tr}
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
                                defaultValue={page.title?.en}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900"
                            />
                        </div>
                    </div>

                    {/* Page Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Sayfa Resmi (İçerik Yanı)
                        </label>
                        <ImageUpload
                            value={imageUrl}
                            onChange={setImageUrl}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Hero Arka Plan Resmi (Sayfa Üst Görseli)
                        </label>
                        <ImageUpload
                            value={heroImageUrl}
                            onChange={setHeroImageUrl}
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
                            defaultValue={page.seoTitle || ""}
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
                            defaultValue={page.seoDescription || ""}
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
                        disabled={submitting}
                        className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg disabled:opacity-50"
                    >
                        {submitting ? "Güncelleniyor..." : "Güncelle"}
                    </button>
                </div>
            </form>
        </div>
    );
}
