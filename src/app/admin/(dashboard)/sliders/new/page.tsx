'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';
import toast from 'react-hot-toast';

export default function NewSliderPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/admin/sliders', {
                method: 'POST',
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
                toast.success('Slider başarıyla oluşturuldu');
                router.push('/admin/sliders');
                router.refresh();
            } else {
                toast.error('Slider oluşturulurken bir hata oluştu');
            }
        } catch (error) {
            console.error('Error creating slider:', error);
            toast.error('Bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl">
            <div className="mb-6">
                <Link href="/admin/sliders" className="text-orange-600 hover:text-orange-700 font-medium">
                    ← Geri Dön
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 mt-2">Yeni Slider Ekle</h1>
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
                            placeholder="Slider başlığı"
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
                            placeholder="Slider title"
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
                            placeholder="Slider açıklaması"
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
                            placeholder="Slider description"
                        />
                    </div>
                </div>

                {/* Görsel Upload */}
                <ImageUpload
                    label="Slider Görseli"
                    value={formData.image}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    required
                />

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
                        placeholder="/products/category-name"
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
                            placeholder="Daha Fazla Bilgi"
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
                            placeholder="Learn More"
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
                        disabled={loading}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Kaydediliyor...' : 'Slider Ekle'}
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
