"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NewCategoryPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);

        // Prepare data structure
        const data = {
            title: {
                tr: formData.get("title_tr"),
                en: formData.get("title_en"),
            },
            description: {
                tr: formData.get("desc_tr"),
                en: formData.get("desc_en"),
            },
            seoTitle: formData.get("seoTitle"),
            seoDescription: formData.get("seoDescription"),
            slug: formData.get("slug"),
            order: Number(formData.get("order")),
            image: formData.get("image"), // For now simple URL, later upload
        };

        try {
            const res = await fetch("/api/admin/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Kategori oluşturulamadı");

            toast.success("Kategori başarıyla oluşturuldu");
            router.push("/admin/categories");
            router.refresh();
        } catch (err) {
            toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
            setError("Bir hata oluştu. Lütfen tekrar deneyin.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Yeni Kategori Ekle</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-8">
                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {/* Basic Info */}
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">Temel Bilgiler</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Kategori Başlığı (TR)</label>
                            <input name="title_tr" required className="w-full border rounded-lg px-4 py-2 bg-white text-gray-900" placeholder="Örn: Duvar Kalıpları" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Category Title (EN)</label>
                            <input name="title_en" required className="w-full border rounded-lg px-4 py-2 bg-white text-gray-900" placeholder="Ex: Wall Formwork" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Açıklama (TR)</label>
                            <textarea name="desc_tr" rows={3} className="w-full border rounded-lg px-4 py-2 bg-white text-gray-900" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Description (EN)</label>
                            <textarea name="desc_en" rows={3} className="w-full border rounded-lg px-4 py-2 bg-white text-gray-900" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Slug (URL)</label>
                            <input name="slug" required className="w-full border rounded-lg px-4 py-2 bg-white text-gray-900" placeholder="duvar-kaliplari" />
                            <p className="text-xs text-gray-500 mt-1">Benzersiz olmalı. Örn: duvar-kaliplari</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Sıralama</label>
                            <input name="order" type="number" defaultValue={0} className="w-full border rounded-lg px-4 py-2 bg-white text-gray-900" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Görsel URL</label>
                        <input name="image" className="w-full border rounded-lg px-4 py-2 bg-white text-gray-900" placeholder="https://..." />
                    </div>
                </section>

                {/* SEO Info */}
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">SEO Ayarları</h3>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">SEO Başlık (Meta Title)</label>
                        <input name="seoTitle" className="w-full border rounded-lg px-4 py-2 bg-white text-gray-900" placeholder="Google'da görünecek başlık" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">SEO Açıklama (Meta Description)</label>
                        <textarea name="seoDescription" rows={2} className="w-full border rounded-lg px-4 py-2 bg-white text-gray-900" placeholder="Google'da görünecek açıklama" />
                    </div>
                </section>

                <div className="flex justify-end gap-4 pt-4 border-t">
                    <button type="button" onClick={() => router.back()} className="px-6 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">
                        İptal
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                        {loading ? "Kaydediliyor..." : "Kaydet"}
                    </button>
                </div>
            </form>
        </div>
    );
}
