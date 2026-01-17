'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Slider {
    id: string;
    title: { tr: string; en: string };
    image: string;
    order: number;
    isActive: boolean;
}

export default function SlidersPage() {
    const [sliders, setSliders] = useState<Slider[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSliders();
    }, []);

    const fetchSliders = async () => {
        try {
            const response = await fetch('/api/admin/sliders');
            if (response.ok) {
                const data = await response.json();
                setSliders(data);
            }
        } catch (error) {
            console.error('Error fetching sliders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu slider\'ı silmek istediğinizden emin misiniz?')) return;

        try {
            const response = await fetch(`/api/admin/sliders/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchSliders();
            } else {
                alert('Silme işlemi başarısız oldu');
            }
        } catch (error) {
            console.error('Error deleting slider:', error);
            alert('Bir hata oluştu');
        }
    };

    if (loading) {
        return <div className="text-center py-12">Yükleniyor...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Slider Yönetimi</h1>
                    <p className="text-gray-600 mt-1">Ana sayfa slider'larını yönetin</p>
                </div>
                <Link
                    href="/admin/sliders/new"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                    + Yeni Slider Ekle
                </Link>
            </div>

            {sliders.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Henüz slider yok</h3>
                    <p className="text-gray-600 mb-6">İlk slider'ınızı oluşturarak başlayın</p>
                    <Link
                        href="/admin/sliders/new"
                        className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        Slider Ekle
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Görsel
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Başlık (TR)
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Sıra
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Durum
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    İşlemler
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sliders.map((slider) => (
                                <tr key={slider.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img
                                            src={slider.image}
                                            alt={slider.title.tr}
                                            className="h-16 w-24 object-cover rounded"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">{slider.title.tr}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-500">{slider.order}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {slider.isActive ? (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Aktif
                                            </span>
                                        ) : (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                                Pasif
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <Link
                                            href={`/admin/sliders/${slider.id}/edit`}
                                            className="text-orange-600 hover:text-orange-900"
                                        >
                                            Düzenle
                                        </Link>
                                        <button
                                            className="text-red-600 hover:text-red-900"
                                            onClick={() => handleDelete(slider.id)}
                                        >
                                            Sil
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
