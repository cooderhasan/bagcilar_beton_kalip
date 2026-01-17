'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';
import toast from 'react-hot-toast';

interface Category {
    id: string;
    slug: string;
    title: any;
    description: any;
    image: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    order: number;
}

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const categoryId = resolvedParams.id;

    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [category, setCategory] = useState<Category | null>(null);
    const [image, setImage] = useState('');

    useEffect(() => {
        fetchCategory();
    }, [categoryId]);

    const fetchCategory = async () => {
        try {
            const response = await fetch(`/api/admin/categories/${categoryId}`);
            if (response.ok) {
                const data = await response.json();
                setCategory(data);
                setImage(data.image || '');
            } else {
                setError('Kategori bulunamadı');
            }
        } catch (err) {
            setError('Veri yüklenirken hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSaving(true);
        setError('');

        const formData = new FormData(e.currentTarget);

        const data = {
            title: {
                tr: formData.get('title_tr'),
                en: formData.get('title_en'),
            },
            description: {
                tr: formData.get('desc_tr'),
                en: formData.get('desc_en'),
            },
            slug: formData.get('slug'),
            image: image || null,
            order: Number(formData.get('order')),
            seoTitle: formData.get('seoTitle'),
            seoDescription: formData.get('seoDescription'),
        };

        try {
            const res = await fetch(`/api/admin/categories/${categoryId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || 'Kategori güncellenemedi');
            }

            toast.success('Kategori başarıyla güncellendi');
            router.push('/admin/categories');
            router.refresh();
        } catch (err: any) {
            toast.error(err.message || 'Bir hata oluştu.');
            setError(err.message || 'Bir hata oluştu.');
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (!category) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error || 'Kategori bulunamadı'}</p>
                <Link href="/admin/categories" className="text-orange-600 hover:text-orange-700">
                    ← Kategorilere Dön
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <Link href="/admin/categories" className="text-orange-600 hover:text-orange-700 font-medium">
                    ← Geri Dön
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 mt-2">Kategori Düzenle</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6">
                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Kategori Adı (TR) *</label>
                        <input
                            name="title_tr"
                            required
                            defaultValue={(category.title as any).tr}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400"
                            placeholder="Örn: Bahçe Duvar Kalıpları"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Category Name (EN) *</label>
                        <input
                            name="title_en"
                            required
                            defaultValue={(category.title as any).en}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400"
                            placeholder="Ex: Garden Wall Formwork"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Slug (URL) *</label>
                    <input
                        name="slug"
                        required
                        defaultValue={category.slug}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400"
                        placeholder="bahce-duvar-kaliplari"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Açıklama (TR)</label>
                        <textarea
                            name="desc_tr"
                            rows={3}
                            defaultValue={(category.description as any)?.tr || ''}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400"
                            placeholder="Kategori açıklaması..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Description (EN)</label>
                        <textarea
                            name="desc_en"
                            rows={3}
                            defaultValue={(category.description as any)?.en || ''}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400"
                            placeholder="Category description..."
                        />
                    </div>
                </div>

                <ImageUpload
                    label="Kategori Görseli"
                    value={image}
                    onChange={setImage}
                />

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Sıralama</label>
                    <input
                        name="order"
                        type="number"
                        defaultValue={category.order}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
                    />
                </div>

                <hr className="my-6" />

                <h3 className="text-lg font-semibold text-gray-900">SEO Ayarları</h3>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">SEO Başlığı</label>
                    <input
                        name="seoTitle"
                        defaultValue={category.seoTitle || ''}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400"
                        placeholder="Google'da görünecek başlık"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">SEO Açıklaması</label>
                    <textarea
                        name="seoDescription"
                        rows={2}
                        defaultValue={category.seoDescription || ''}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400"
                        placeholder="Google'da görünecek açıklama"
                    />
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
                    <Link
                        href="/admin/categories"
                        className="px-6 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
                    >
                        İptal
                    </Link>
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-2 rounded-lg font-bold shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50"
                    >
                        {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                    </button>
                </div>
            </form>
        </div>
    );
}
