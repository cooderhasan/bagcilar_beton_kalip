"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";

interface Page {
    id: string;
    slug: string;
    title: { tr: string; en: string };
    isActive: boolean;
    updatedAt: string;
}

export default function PagesManager() {
    const [pages, setPages] = useState<Page[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        try {
            const res = await fetch("/api/admin/pages");
            if (res.ok) {
                const data = await res.json();
                setPages(data);
            }
        } catch (error) {
            console.error("Error fetching pages:", error);
            toast.error("Sayfalar yüklenemedi");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu sayfayı silmek istediğinizden emin misiniz?")) return;

        try {
            const res = await fetch(`/api/admin/pages/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                toast.success("Sayfa silindi");
                fetchPages();
            } else {
                toast.error("Silme işlemi başarısız");
            }
        } catch (error) {
            console.error("Error deleting page:", error);
            toast.error("Bir hata oluştu");
        }
    };

    if (loading) return <div>Yükleniyor...</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Sayfa Yönetimi</h1>
                    <p className="text-gray-500 text-sm mt-1">Hakkımızda, Gizlilik Politikası vb. sayfaları buradan yönetebilirsiniz.</p>
                </div>
                <Link
                    href="/admin/pages/new"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    Yeni Sayfa Ekle
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Sayfa Başlığı</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Slug (URL)</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Durum</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {pages.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                    Henüz sayfa oluşturulmamış.
                                </td>
                            </tr>
                        ) : (
                            pages.map((page) => (
                                <tr key={page.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{page.title?.tr || page.slug}</div>
                                        <div className="text-sm text-gray-500">{page.title?.en}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <code className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-700">/{page.slug}</code>
                                    </td>
                                    <td className="px-6 py-4">
                                        {page.isActive ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Aktif
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                Pasif
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-3">
                                        <Link
                                            href={`/admin/pages/${page.id}/edit`}
                                            className="text-orange-600 hover:text-orange-900 font-medium text-sm"
                                        >
                                            Düzenle
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(page.id)}
                                            className="text-red-600 hover:text-red-900 font-medium text-sm"
                                        >
                                            Sil
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
