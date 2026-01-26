"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MultiImageUpload from "@/components/admin/MultiImageUpload";
import toast from "react-hot-toast";

interface Category {
    id: string;
    title: any; // Json type
}

export default function ProductForm({ categories }: { categories: Category[] }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("general");

    // State for dynamic features list
    const [features, setFeatures] = useState<{ tr: string; en: string }[]>([{ tr: "", en: "" }]);

    // State for images
    const [images, setImages] = useState<string[]>([]);

    const handleFeatureChange = (index: number, field: "tr" | "en", value: string) => {
        const newFeatures = [...features];
        newFeatures[index] = { ...newFeatures[index], [field]: value };
        setFeatures(newFeatures);
    };

    const addFeature = () => setFeatures([...features, { tr: "", en: "" }]);
    const removeFeature = (index: number) => {
        const newFeatures = features.filter((_, i) => i !== index);
        setFeatures(newFeatures);
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);

        const data = {
            title: {
                tr: formData.get("title_tr"),
                en: formData.get("title_en"),
            },
            description: {
                tr: formData.get("desc_tr"),
                en: formData.get("desc_en"),
            },
            slug: formData.get("slug"),
            categoryId: formData.get("categoryId"),
            isActive: formData.get("isActive") === "on",
            order: Number(formData.get("order")),
            images: images, // Use state instead of form input
            videoUrl: formData.get("videoUrl") || null,
            features: features.filter((f) => f.tr.trim() !== "" || f.en.trim() !== ""), // Clean empty features
            seoTitle: formData.get("seoTitle"),
            seoDescription: formData.get("seoDescription"),
        };

        try {
            const res = await fetch("/api/admin/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Ürün oluşturulamadı");
            }

            toast.success("Ürün başarıyla oluşturuldu!");
            router.push("/admin/products");
            router.refresh();
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Bir hata oluştu.");
            setError(err.message || "Bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200">
            {/* Tabs Header */}
            <div className="flex border-b border-slate-200">
                <button
                    type="button"
                    onClick={() => setActiveTab("general")}
                    className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === "general" ? "text-orange-600 border-b-2 border-orange-600" : "text-slate-600 hover:bg-slate-50"
                        }`}
                >
                    Genel Bilgiler
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab("content")}
                    className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === "content" ? "text-orange-600 border-b-2 border-orange-600" : "text-slate-600 hover:bg-slate-50"
                        }`}
                >
                    İçerik & Özellikler
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab("seo")}
                    className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === "seo" ? "text-orange-600 border-b-2 border-orange-600" : "text-slate-600 hover:bg-slate-50"
                        }`}
                >
                    SEO Meta
                </button>
            </div>

            <div className="p-8 space-y-8">
                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {error}
                    </div>
                )}

                {/* GENERAL TAB */}
                <div className={activeTab === "general" ? "block" : "hidden"}>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                                <select name="categoryId" required className="w-full border rounded-lg px-4 py-2 bg-white text-gray-900">
                                    <option value="">Seçiniz...</option>
                                    {categories.map((cat: any) => (
                                        <option key={cat.id} value={cat.id}>
                                            {(cat.title as any)?.tr || "İsimsiz"}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Slug (URL)</label>
                                <input name="slug" required className="w-full border rounded-lg px-4 py-2 bg-white text-gray-900 placeholder-gray-400" placeholder="osmanli-modeli-tas-duvar" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Ürün Başlığı (TR)</label>
                                <input name="title_tr" required className="w-full border rounded-lg px-4 py-2 bg-white text-gray-900 placeholder-gray-400" placeholder="Örn: Osmanlı Modeli" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Product Title (EN)</label>
                                <input name="title_en" required className="w-full border rounded-lg px-4 py-2 bg-white text-gray-900 placeholder-gray-400" placeholder="Ex: Ottoman Model" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Sıralama</label>
                                <input name="order" type="number" defaultValue={0} className="w-full border rounded-lg px-4 py-2 bg-white text-gray-900 placeholder-gray-400" />
                            </div>
                        </div>

                        {/* Çoklu Görsel Upload */}
                        <div>
                            <MultiImageUpload
                                label="Ürün Görselleri"
                                value={images}
                                onChange={setImages}
                                maxImages={10}
                            />
                            <p className="text-xs text-slate-500 mt-2">
                                💡 Birden fazla görsel ekleyebilirsiniz. Sıralamayı ok butonları ile değiştirebilirsiniz.
                            </p>
                        </div>

                        {/* Video URL */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">YouTube Video URL</label>
                            <input
                                name="videoUrl"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400"
                                placeholder="https://www.youtube.com/watch?v=..."
                            />
                            <p className="text-xs text-gray-500 mt-1">YouTube video linkini yapıştırın. Ürün sayfasında gösterilecek.</p>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                            <input type="checkbox" name="isActive" id="isActive" defaultChecked className="w-4 h-4 text-orange-600 rounded" />
                            <label htmlFor="isActive" className="text-sm font-medium text-slate-700">Ürün Aktif (Sitede Görünür)</label>
                        </div>
                    </div>
                </div>

                {/* CONTENT TAB */}
                <div className={activeTab === "content" ? "block" : "hidden"}>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Açıklama (TR)</label>
                                <textarea name="desc_tr" rows={5} className="w-full border rounded-lg px-4 py-2 bg-white text-gray-900 placeholder-gray-400" placeholder="Ürün açıklaması..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description (EN)</label>
                                <textarea name="desc_en" rows={5} className="w-full border rounded-lg px-4 py-2 bg-white text-gray-900 placeholder-gray-400" placeholder="Product description..." />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Teknik Özellikler (Maddeler)</label>
                            <div className="space-y-3">
                                {features.map((feature: any, idx) => (
                                    <div key={idx} className="flex gap-2 items-start">
                                        <div className="flex-1 space-y-2">
                                            <input
                                                type="text"
                                                value={feature.tr || ""}
                                                onChange={(e) => handleFeatureChange(idx, "tr", e.target.value)}
                                                placeholder="TR: 120x60cm boyutlarında"
                                                className="w-full border rounded-lg px-4 py-2 bg-white text-gray-900 placeholder-gray-400"
                                            />
                                            <input
                                                type="text"
                                                value={feature.en || ""}
                                                onChange={(e) => handleFeatureChange(idx, "en", e.target.value)}
                                                placeholder="EN: 120x60cm dimensions"
                                                className="w-full border rounded-lg px-4 py-2 bg-white text-gray-900 placeholder-gray-400"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeFeature(idx)}
                                            className="p-2 mt-1 text-red-500 hover:bg-red-50 rounded-lg"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addFeature}
                                    className="text-sm text-orange-600 font-medium hover:text-orange-700 flex items-center gap-1"
                                >
                                    + Özellik Ekle
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SEO TAB */}
                <div className={activeTab === "seo" ? "block" : "hidden"}>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">SEO Başlığı (Meta Title)</label>
                            <input name="seoTitle" className="w-full border rounded-lg px-4 py-2 bg-white text-gray-900 placeholder-gray-400" placeholder="Google arama sonuçlarında görünecek başlık" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">SEO Açıklaması (Meta Description)</label>
                            <textarea name="seoDescription" rows={3} className="w-full border rounded-lg px-4 py-2 bg-white text-gray-900 placeholder-gray-400" placeholder="Google arama sonuçlarında görünecek özet" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
                    >
                        İptal
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-2 rounded-lg font-bold shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50 transform hover:-translate-y-0.5"
                    >
                        {loading ? "Kaydediliyor..." : "Ürünü Kaydet"}
                    </button>
                </div>
            </div>
        </form>
    );
}
