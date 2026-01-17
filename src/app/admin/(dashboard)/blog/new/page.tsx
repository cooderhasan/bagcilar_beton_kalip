"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBlogPostPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
            content: {
                tr: formData.get("content_tr"),
                en: formData.get("content_en"),
            },
            slug: formData.get("slug"),
            image: formData.get("image"),
            seoTitle: formData.get("seoTitle"),
            seoDescription: formData.get("seoDescription"),
            published: formData.get("published") === "on",
        };

        try {
            const res = await fetch("/api/admin/blog", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Yazı oluşturulamadı");

            router.push("/admin/blog");
            router.refresh();
        } catch (err) {
            setError("Bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-800 mb-8">Yeni Blog Yazısı</h1>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-8">
                {error && <div className="text-red-500 bg-red-50 p-4 rounded">{error}</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Başlık (TR)</label>
                        <input name="title_tr" required className="w-full border rounded px-4 py-2 bg-white text-gray-900" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Title (EN)</label>
                        <input name="title_en" required className="w-full border rounded px-4 py-2 bg-white text-gray-900" />
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">İçerik (TR)</label>
                        <textarea name="content_tr" rows={6} className="w-full border rounded px-4 py-2 bg-white text-gray-900" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Content (EN)</label>
                        <textarea name="content_en" rows={6} className="w-full border rounded px-4 py-2 bg-white text-gray-900" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Slug</label>
                        <input name="slug" required className="w-full border rounded px-4 py-2 bg-white text-gray-900" placeholder="yazi-basligi" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Görsel URL</label>
                        <input name="image" className="w-full border rounded px-4 py-2 bg-white text-gray-900" />
                    </div>
                </div>

                <section className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold">SEO</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="seoTitle" placeholder="Meta Title" className="w-full border rounded px-4 py-2 bg-white text-gray-900" />
                        <input name="seoDescription" placeholder="Meta Description" className="w-full border rounded px-4 py-2 bg-white text-gray-900" />
                    </div>
                </section>

                <div className="flex items-center gap-2">
                    <input type="checkbox" name="published" id="published" className="w-4 h-4" />
                    <label htmlFor="published" className="text-sm font-medium">Yayınla</label>
                </div>

                <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => router.back()} className="px-4 py-2 border rounded hover:bg-slate-50">İptal</button>
                    <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">Kaydet</button>
                </div>
            </form>
        </div>
    );
}
