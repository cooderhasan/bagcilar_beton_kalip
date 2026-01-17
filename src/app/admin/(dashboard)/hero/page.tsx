'use client';

import { useState, useEffect } from 'react';

export default function HeroSectionPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        backgroundImage: '',
        titleTr: '',
        titleEn: '',
        subtitleTr: '',
        subtitleEn: '',
        primaryCtaTextTr: '',
        primaryCtaTextEn: '',
        primaryCtaLink: '',
        secondaryCtaTextTr: '',
        secondaryCtaTextEn: '',
        secondaryCtaLink: '',
    });

    useEffect(() => {
        fetchHeroSection();
    }, []);

    const fetchHeroSection = async () => {
        try {
            const response = await fetch('/api/admin/hero');
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    setFormData({
                        backgroundImage: data.backgroundImage || '',
                        titleTr: data.title?.tr || '',
                        titleEn: data.title?.en || '',
                        subtitleTr: data.subtitle?.tr || '',
                        subtitleEn: data.subtitle?.en || '',
                        primaryCtaTextTr: data.primaryCtaText?.tr || '',
                        primaryCtaTextEn: data.primaryCtaText?.en || '',
                        primaryCtaLink: data.primaryCtaLink || '',
                        secondaryCtaTextTr: data.secondaryCtaText?.tr || '',
                        secondaryCtaTextEn: data.secondaryCtaText?.en || '',
                        secondaryCtaLink: data.secondaryCtaLink || '',
                    });
                }
            }
        } catch (error) {
            console.error('Error fetching hero section:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const response = await fetch('/api/admin/hero', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    backgroundImage: formData.backgroundImage || null,
                    title: { tr: formData.titleTr, en: formData.titleEn },
                    subtitle: { tr: formData.subtitleTr, en: formData.subtitleEn },
                    primaryCtaText: { tr: formData.primaryCtaTextTr, en: formData.primaryCtaTextEn },
                    primaryCtaLink: formData.primaryCtaLink,
                    secondaryCtaText: formData.secondaryCtaTextTr || formData.secondaryCtaTextEn
                        ? { tr: formData.secondaryCtaTextTr, en: formData.secondaryCtaTextEn }
                        : null,
                    secondaryCtaLink: formData.secondaryCtaLink || null,
                }),
            });

            if (response.ok) {
                alert('Hero bölümü başarıyla güncellendi!');
            } else {
                alert('Güncellenirken bir hata oluştu');
            }
        } catch (error) {
            console.error('Error updating hero section:', error);
            alert('Bir hata oluştu');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="text-center py-12">Yükleniyor...</div>;
    }

    return (
        <div className="max-w-4xl">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Hero Bölümü Yönetimi</h1>
                <p className="text-gray-600 mt-1">Ana sayfa hero bölümünü düzenleyin</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
                {/* Arka Plan Görseli */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Arka Plan Görseli URL
                    </label>
                    <input
                        type="text"
                        value={formData.backgroundImage}
                        onChange={(e) => setFormData({ ...formData, backgroundImage: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="/images/hero.png"
                    />
                    {formData.backgroundImage && (
                        <div className="mt-3">
                            <img src={formData.backgroundImage} alt="Preview" className="h-32 rounded-lg object-cover" />
                        </div>
                    )}
                </div>

                {/* Başlık */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Başlık (Türkçe) *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.titleTr}
                            onChange={(e) => setFormData({ ...formData, titleTr: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Alt Başlık */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Alt Başlık (Türkçe) *
                        </label>
                        <textarea
                            required
                            value={formData.subtitleTr}
                            onChange={(e) => setFormData({ ...formData, subtitleTr: e.target.value })}
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Alt Başlık (İngilizce) *
                        </label>
                        <textarea
                            required
                            value={formData.subtitleEn}
                            onChange={(e) => setFormData({ ...formData, subtitleEn: e.target.value })}
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <hr className="my-6" />

                {/* Birincil CTA */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Birincil Buton</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Buton Metni (Türkçe) *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.primaryCtaTextTr}
                                onChange={(e) => setFormData({ ...formData, primaryCtaTextTr: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Buton Metni (İngilizce) *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.primaryCtaTextEn}
                                onChange={(e) => setFormData({ ...formData, primaryCtaTextEn: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Buton Linki *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.primaryCtaLink}
                            onChange={(e) => setFormData({ ...formData, primaryCtaLink: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="/quote"
                        />
                    </div>
                </div>

                <hr className="my-6" />

                {/* İkincil CTA */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">İkincil Buton (Opsiyonel)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Buton Metni (Türkçe)
                            </label>
                            <input
                                type="text"
                                value={formData.secondaryCtaTextTr}
                                onChange={(e) => setFormData({ ...formData, secondaryCtaTextTr: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Buton Metni (İngilizce)
                            </label>
                            <input
                                type="text"
                                value={formData.secondaryCtaTextEn}
                                onChange={(e) => setFormData({ ...formData, secondaryCtaTextEn: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Buton Linki
                        </label>
                        <input
                            type="text"
                            value={formData.secondaryCtaLink}
                            onChange={(e) => setFormData({ ...formData, secondaryCtaLink: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="/projects"
                        />
                    </div>
                </div>

                {/* Kaydet Butonu */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                    >
                        {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                    </button>
                </div>
            </form>
        </div>
    );
}
