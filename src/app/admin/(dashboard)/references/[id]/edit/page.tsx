"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import ImageUpload from "@/components/admin/ImageUpload";
import { use } from "react";

export default function EditReferencePage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const [loading, setLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState("");
    const [reference, setReference] = useState<any>(null);

    useEffect(() => {
        fetchReference();
    }, [id]);

    const fetchReference = async () => {
        try {
            const res = await fetch(`/api/admin/references/${id}`);
            if (!res.ok) throw new Error("Referans bulunamadı");
            const data = await res.json();
            setReference(data);
            setImageUrl(data.image);
        } catch (error) {
            console.error(error);
            toast.error("Referans bilgileri yüklenemedi");
            router.push("/admin/references");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            image: imageUrl,
            order: Number(formData.get("order")),
            isActive: reference.isActive,
        };

        if (!imageUrl) {
            toast.error("Lütfen bir görsel yükleyin");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`/api/admin/references/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Referans güncellenemedi");

            toast.success("Referans başarıyla güncellendi");
            router.push("/admin/references");
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Bir hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Yükleniyor...</div>;
    if (!reference) return null;

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Referansı Düzenle</h1>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Referans Adı
                    </label>
                    <input
                        name="name"
                        required
                        defaultValue={reference.name}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900"
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
                        defaultValue={reference.order}
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
                        {loading ? "Güncelleniyor..." : "Güncelle"}
                    </button>
                </div>
            </form>
        </div>
    );
}
