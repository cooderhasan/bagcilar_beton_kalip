"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/admin/RichTextEditor";

interface EditFormProps {
    post: any;
}

export default function EditForm({ post }: EditFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Initial State from Post
    const [contentTr, setContentTr] = useState((post.content as any)?.tr || "");
    const [contentEn, setContentEn] = useState((post.content as any)?.en || "");

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
            const res = await fetch(`/api/admin/blog/${post.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Yazı güncellenemedi");

            router.push("/admin/blog");
            router.refresh();
        } catch (err) {
            setError("Bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete() {
        if (!confirm("Bu yazıyı silmek istediğinizden emin misiniz?")) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/admin/blog/${post.id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Yazı silinemedi");

            router.push("/admin/blog");
            router.refresh();
        } catch (err) {
            setError("Silme işlemi sırasında hata oluştu.");
            setLoading(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Blog Yazısını Düzenle</h1>
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                    Yazıyı Sil
                </button>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-8">
                {error && <div className="text-red-500 bg-red-50 p-4 rounded">{error}</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Başlık (TR)</label>
                        <input
                            name="title_tr"
                            required
                            defaultValue={(post.title as any)?.tr}
                            className="w-full border rounded px-4 py-2 bg-white text-gray-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Title (EN)</label>
                        <input
                            name="title_en"
                            required
                            defaultValue={(post.title as any)?.en}
                            className="w-full border rounded px-4 py-2 bg-white text-gray-900"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">İçerik (TR)</label>
                        <RichTextEditor content={contentTr} onChange={setContentTr} />
                        <input type="hidden" name="content_tr" value={contentTr} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Content (EN)</label>
                        <RichTextEditor content={contentEn} onChange={setContentEn} />
                        <input type="hidden" name="content_en" value={contentEn} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Slug</label>
                        <input
                            name="slug"
                            required
                            defaultValue={post.slug}
                            className="w-full border rounded px-4 py-2 bg-white text-gray-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Görsel URL</label>
                        <input
                            name="image"
                            defaultValue={post.image || ""}
                            className="w-full border rounded px-4 py-2 bg-white text-gray-900"
                        />
                    </div>
                </div>

                <section className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold">SEO</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            name="seoTitle"
                            placeholder="Meta Title"
                            defaultValue={post.seoTitle || ""}
                            className="w-full border rounded px-4 py-2 bg-white text-gray-900"
                        />
                        <input
                            name="seoDescription"
                            placeholder="Meta Description"
                            defaultValue={post.seoDescription || ""}
                            className="w-full border rounded px-4 py-2 bg-white text-gray-900"
                        />
                    </div>
                </section>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="published"
                        id="published"
                        defaultChecked={post.published}
                        className="w-4 h-4"
                    />
                    <label htmlFor="published" className="text-sm font-medium">Yayınla</label>
                </div>

                <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => router.back()} className="px-4 py-2 border rounded hover:bg-slate-50">İptal</button>
                    <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">Güncelle</button>
                </div>
            </form>
        </div>
    );
}
