'use client';

import { useState, useEffect } from 'react';

interface Statistic {
    id: string;
    value: string;
    label: { tr: string; en: string };
    icon?: string;
    order: number;
}

export default function StatisticsPage() {
    const [loading, setLoading] = useState(true);
    const [statistics, setStatistics] = useState<Statistic[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        value: '',
        labelTr: '',
        labelEn: '',
        icon: '',
        order: 0,
    });

    useEffect(() => {
        fetchStatistics();
    }, []);

    const fetchStatistics = async () => {
        try {
            const response = await fetch('/api/admin/statistics');
            if (response.ok) {
                const data = await response.json();
                setStatistics(data);
            }
        } catch (error) {
            console.error('Error fetching statistics:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            value: formData.value,
            label: { tr: formData.labelTr, en: formData.labelEn },
            icon: formData.icon || null,
            order: formData.order,
        };

        try {
            if (editingId) {
                // Update
                await fetch(`/api/admin/statistics/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            } else {
                // Create
                await fetch('/api/admin/statistics', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            }

            setFormData({ value: '', labelTr: '', labelEn: '', icon: '', order: 0 });
            setEditingId(null);
            fetchStatistics();
        } catch (error) {
            console.error('Error saving statistic:', error);
            alert('Bir hata oluştu');
        }
    };

    const handleEdit = (stat: Statistic) => {
        setEditingId(stat.id);
        setFormData({
            value: stat.value,
            labelTr: stat.label.tr,
            labelEn: stat.label.en,
            icon: stat.icon || '',
            order: stat.order,
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu istatistiği silmek istediğinizden emin misiniz?')) return;

        try {
            await fetch(`/api/admin/statistics/${id}`, { method: 'DELETE' });
            fetchStatistics();
        } catch (error) {
            console.error('Error deleting statistic:', error);
            alert('Bir hata oluştu');
        }
    };

    if (loading) {
        return <div className="text-center py-12">Yükleniyor...</div>;
    }

    return (
        <div className="max-w-6xl">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">İstatistik Yönetimi</h1>
                <p className="text-gray-600 mt-1">Ana sayfa istatistiklerini yönetin</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Form */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        {editingId ? 'İstatistik Düzenle' : 'Yeni İstatistik Ekle'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Değer *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.value}
                                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                                placeholder="20+, 10k+, vb."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Etiket (Türkçe) *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.labelTr}
                                onChange={(e) => setFormData({ ...formData, labelTr: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                                placeholder="Yıllık Tecrübe"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Etiket (İngilizce) *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.labelEn}
                                onChange={(e) => setFormData({ ...formData, labelEn: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                                placeholder="Years of Experience"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                İkon (Opsiyonel)
                            </label>
                            <input
                                type="text"
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                                placeholder="SVG veya emoji"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sıra
                            </label>
                            <input
                                type="number"
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                            >
                                {editingId ? 'Güncelle' : 'Ekle'}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingId(null);
                                        setFormData({ value: '', labelTr: '', labelEn: '', icon: '', order: 0 });
                                    }}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold transition-colors"
                                >
                                    İptal
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Liste */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Mevcut İstatistikler</h2>
                    {statistics.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">Henüz istatistik eklenmemiş</p>
                    ) : (
                        <div className="space-y-3">
                            {statistics.map((stat: any) => (
                                <div
                                    key={stat.id}
                                    className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="text-2xl font-bold text-orange-600">{stat.value}</div>
                                            <div className="text-sm text-gray-700 mt-1">{stat.label.tr}</div>
                                            <div className="text-xs text-gray-500">{stat.label.en}</div>
                                            {stat.icon && (
                                                <div className="text-xs text-gray-400 mt-1">İkon: {stat.icon}</div>
                                            )}
                                        </div>
                                        <div className="flex gap-2 ml-4">
                                            <button
                                                onClick={() => handleEdit(stat)}
                                                className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                                            >
                                                Düzenle
                                            </button>
                                            <button
                                                onClick={() => handleDelete(stat.id)}
                                                className="text-red-600 hover:text-red-700 text-sm font-medium"
                                            >
                                                Sil
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
