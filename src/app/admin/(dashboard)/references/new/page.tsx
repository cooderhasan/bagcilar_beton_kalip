"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import ImageUpload from "@/components/admin/ImageUpload";

export default function NewReferencePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            image: imageUrl,
            order: Number(formData.get("order")),
            isActive: true,
        };

        if (!imageUrl) {
            toast.error("Lütfen bir görsel yükleyin");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/admin/references", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Referans oluşturulamadı");

            toast.success("Referans başarıyla oluşturuldu");
            router.push("/admin/references");
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Bir hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Yeni Referans Ekle</h1>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Referans Adı
                    </label>
                    <input
                        name="name"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900"
                        placeholder="Örn: ABC İnşaat"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Görsel (Logo)
                    </label>
                    <ImageUpload
                        value={imageUrl}
                        onChange={setImageUrl}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sıralama
                    </label>
                    <input
                        name="order"
                        type="number"
                        defaultValue={0}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900"
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
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
