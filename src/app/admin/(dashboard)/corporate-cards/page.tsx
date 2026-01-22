'use client';

import { useState, useEffect } from 'react';

interface CorporateCard {
    id: string;
    title: { tr: string; en: string };
    content: { tr: string; en: string };
    icon?: string;
    order: number;
    isActive: boolean;
}

export default function CorporateCardsPage() {
    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState<CorporateCard[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        titleTr: '',
        titleEn: '',
        contentTr: '',
        contentEn: '',
        icon: '',
        order: 0,
        isActive: true,
    });

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        try {
            const response = await fetch('/api/admin/corporate-cards');
            if (response.ok) {
                const data = await response.json();
                setCards(data);
            }
        } catch (error) {
            console.error('Error fetching cards:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            title: { tr: formData.titleTr, en: formData.titleEn },
            content: { tr: formData.contentTr, en: formData.contentEn },
            icon: formData.icon || null,
            order: formData.order,
            isActive: formData.isActive,
        };

        try {
            if (editingId) {
                // Update
                await fetch(`/api/admin/corporate-cards/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            } else {
                // Create
                await fetch('/api/admin/corporate-cards', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            }

            setFormData({
                titleTr: '',
                titleEn: '',
                contentTr: '',
                contentEn: '',
                icon: '',
                order: 0,
                isActive: true,
            });
            setEditingId(null);
            fetchCards();
        } catch (error) {
            console.error('Error saving card:', error);
            alert('Bir hata oluştu');
        }
    };

    const handleEdit = (card: CorporateCard) => {
        setEditingId(card.id);
        setFormData({
            titleTr: card.title.tr,
            titleEn: card.title.en,
            contentTr: card.content.tr,
            contentEn: card.content.en,
            icon: card.icon || '',
            order: card.order,
            isActive: card.isActive,
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu kartı silmek istediğinizden emin misiniz?')) return;

        try {
            await fetch(`/api/admin/corporate-cards/${id}`, { method: 'DELETE' });
            fetchCards();
        } catch (error) {
            console.error('Error deleting card:', error);
            alert('Bir hata oluştu');
        }
    };

    if (loading) {
        return <div className="text-center py-12">Yükleniyor...</div>;
    }

    return (
        <div className="max-w-7xl">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Kurumsal Kartlar</h1>
                <p className="text-gray-600 mt-1">Vizyonumuz, Misyonumuz ve İnsan Kaynakları kartlarını yönetin</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Form */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        {editingId ? 'Kart Düzenle' : 'Yeni Kart Ekle'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Başlık (Türkçe) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.titleTr}
                                    onChange={(e) => setFormData({ ...formData, titleTr: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                                    placeholder="Vizyonumuz"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Başlık (İngilizce) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.titleEn}
                                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                                    placeholder="Our Vision"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                İçerik (Türkçe) *
                            </label>
                            <textarea
                                required
                                rows={4}
                                value={formData.contentTr}
                                onChange={(e) => setFormData({ ...formData, contentTr: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 resize-none"
                                placeholder="Vizyonumuz hakkında açıklama..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                İçerik (İngilizce) *
                            </label>
                            <textarea
                                required
                                rows={4}
                                value={formData.contentEn}
                                onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 resize-none"
                                placeholder="Description about our vision..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    İkon (Opsiyonel)
                                </label>
                                <input
                                    type="text"
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                                    placeholder="👁️ veya icon-name"
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
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="isActive"
                                checked={formData.isActive}
                                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                            />
                            <label htmlFor="isActive" className="ml-2 text-sm font-medium text-gray-700">
                                Aktif
                            </label>
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
                                        setFormData({
                                            titleTr: '',
                                            titleEn: '',
                                            contentTr: '',
                                            contentEn: '',
                                            icon: '',
                                            order: 0,
                                            isActive: true,
                                        });
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
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Mevcut Kartlar</h2>
                    {cards.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">Henüz kart eklenmemiş</p>
                    ) : (
                        <div className="space-y-3">
                            {cards.map((card) => (
                                <div
                                    key={card.id}
                                    className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                {card.icon && <span className="text-2xl">{card.icon}</span>}
                                                <h3 className="font-bold text-gray-900">{card.title.tr}</h3>
                                                {!card.isActive && (
                                                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                                                        Pasif
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600 line-clamp-2">{card.content.tr}</p>
                                            <p className="text-xs text-gray-400 mt-1">Sıra: {card.order}</p>
                                        </div>
                                        <div className="flex gap-2 ml-4">
                                            <button
                                                onClick={() => handleEdit(card)}
                                                className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                                            >
                                                Düzenle
                                            </button>
                                            <button
                                                onClick={() => handleDelete(card.id)}
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
