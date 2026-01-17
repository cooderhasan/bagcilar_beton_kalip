'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditSliderPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        titleTr: '',
        titleEn: '',
        descriptionTr: '',
        descriptionEn: '',
        image: '',
        link: '',
        ctaTextTr: '',
        ctaTextEn: '',
        order: 0,
        isActive: true,
    });

    useEffect(() => {
        fetchSlider();
    }, []);

    const fetchSlider = async () => {
        try {
            const response = await fetch(`/api/admin/sliders/${params.id}`);
            if (response.ok) {
                const slider = await response.json();
                setFormData({
                    titleTr: slider.title.tr,
                    titleEn: slider.title.en,
                    descriptionTr: slider.description?.tr || '',
                    descriptionEn: slider.description?.en || '',
                    image: slider.image,
                    link: slider.link || '',
                    ctaTextTr: slider.ctaText?.tr || '',
                    ctaTextEn: slider.ctaText?.en || '',
                    order: slider.order,
                    isActive: slider.isActive,
                });
            }
        } catch (error) {
            console.error('Error fetching slider:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const response = await fetch(`/api/admin/sliders/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: { tr: formData.titleTr, en: formData.titleEn },
                    description: formData.descriptionTr || formData.descriptionEn
                        ? { tr: formData.descriptionTr, en: formData.descriptionEn }
                        : null,
                    image: formData.image,
                    link: formData.link || null,
                    ctaText: formData.ctaTextTr || formData.ctaTextEn
                        ? { tr: formData.ctaTextTr, en: formData.ctaTextEn }
                        : null,
                    order: formData.order,
                    isActive: formData.isActive,
                }),
            });

            if (response.ok) {
                router.push('/admin/sliders');
                router.refresh();
            } else {
                alert('Slider güncellenirken bir hata oluştu');
            }
        } catch (error) {
            console.error('Error updating slider:', error);
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
                <Link href="/admin/sliders" className="text-orange-600 hover:text-orange-700 font-medium">
                    ← Geri Dön
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 mt-2">Slider Düzenle</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
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

                {/* Açıklama */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Açıklama (Türkçe)
                        </label>
                        <textarea
                            value={formData.descriptionTr}
                            onChange={(e) => setFormData({ ...formData, descriptionTr: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Açıklama (İngilizce)
                        </label>
                        <textarea
                            value={formData.descriptionEn}
                            onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Görsel URL */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Görsel URL *
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    {formData.image && (
                        <div className="mt-3">
                            <img src={formData.image} alt="Preview" className="h-32 rounded-lg object-cover" />
                        </div>
                    )}
                </div>

                {/* Link */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Link URL (Opsiyonel)
                    </label>
                    <input
                        type="text"
                        value={formData.link}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                </div>

                {/* CTA Buton Metni */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Buton Metni (Türkçe)
                        </label>
                        <input
                            type="text"
                            value={formData.ctaTextTr}
                            onChange={(e) => setFormData({ ...formData, ctaTextTr: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Buton Metni (İngilizce)
                        </label>
                        <input
                            type="text"
                            value={formData.ctaTextEn}
                            onChange={(e) => setFormData({ ...formData, ctaTextEn: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Sıra ve Durum */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sıra
                        </label>
                        <input
                            type="number"
                            value={formData.order}
                            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="flex items-center space-x-2 mt-8">
                            <input
                                type="checkbox"
                                checked={formData.isActive}
                                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Aktif</span>
                        </label>
                    </div>
                </div>

                {/* Butonlar */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                    >
                        {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                    </button>
                    <Link
                        href="/admin/sliders"
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        İptal
                    </Link>
                </div>
            </form>
        </div>
    );
}
