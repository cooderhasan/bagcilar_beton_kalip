"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";

interface Reference {
    id: string;
    name: string;
    image: string;
    order: number;
    isActive: boolean;
}

export default function ReferencesPage() {
    const [references, setReferences] = useState<Reference[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReferences();
    }, []);

    const fetchReferences = async () => {
        try {
            const res = await fetch("/api/admin/references");
            if (res.ok) {
                const data = await res.json();
                setReferences(data);
            }
        } catch (error) {
            console.error("Error fetching references:", error);
            toast.error("Referanslar yüklenemedi");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu referansı silmek istediğinizden emin misiniz?")) return;

        try {
            const res = await fetch(`/api/admin/references/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                toast.success("Referans silindi");
                fetchReferences();
            } else {
                toast.error("Silme işlemi başarısız");
            }
        } catch (error) {
            console.error("Error deleting reference:", error);
            toast.error("Bir hata oluştu");
        }
    };

    if (loading) return <div>Yükleniyor...</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Referanslar</h1>
                <Link
                    href="/admin/references/new"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    Yeni Referans Ekle
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {references.length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
                        <p className="text-gray-500">Henüz referans eklenmemiş.</p>
                    </div>
                ) : (
                    references.map((ref: any) => (
                        <div key={ref.id} className="bg-white rounded-lg shadow overflow-hidden group">
                            <div className="relative h-48 bg-gray-100">
                                <Image
                                    src={ref.image}
                                    alt={ref.name}
                                    fill
                                    className="object-contain p-4"
                                />
                                {!ref.isActive && (
                                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                        Pasif
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-lg text-gray-800 mb-2">{ref.name}</h3>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-sm text-gray-500">Sıra: {ref.order}</span>
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/admin/references/${ref.id}/edit`}
                                            className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                                        >
                                            Düzenle
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(ref.id)}
                                            className="text-red-600 hover:text-red-700 font-medium text-sm"
                                        >
                                            Sil
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
