'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MultiImageUpload from '@/components/admin/MultiImageUpload';
import toast from 'react-hot-toast';

interface Category {
    id: string;
    title: any;
}

interface Product {
    id: string;
    slug: string;
    categoryId: string;
    title: any;
    description: any;
    images: string[];
    videoUrl: string | null;
    features: any[];
    seoTitle: any;
    seoDescription: any;
    order: number;
    isActive: boolean;
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const productId = resolvedParams.id;

    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('general');

    const [categories, setCategories] = useState<Category[]>([]);
    const [product, setProduct] = useState<Product | null>(null);
    const [features, setFeatures] = useState<{ tr: string; en: string }[]>([{ tr: '', en: '' }]);
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        fetchData();
    }, [productId]);

    const fetchData = async () => {
        try {
            // Fetch categories
            const catRes = await fetch('/api/admin/categories');
            if (catRes.ok) {
                const cats = await catRes.json();
                setCategories(cats);
            }

            // Fetch product
            const prodRes = await fetch(`/api/admin/products/${productId}`);
            if (prodRes.ok) {
                const prod = await prodRes.json();
                setProduct(prod);

                // Handle features (legacy string[] or new {tr, en}[])
                const rawFeatures = (prod.features as any[]) || [];
                const normalizedFeatures = rawFeatures.map(f => {
                    if (typeof f === 'string') return { tr: f, en: '' };
                    return f;
                });

                setFeatures(normalizedFeatures.length > 0 ? normalizedFeatures : [{ tr: '', en: '' }]);
                setImages(prod.images || []);
            } else {
                toast.error('Ürün bulunamadı');
                setError('Ürün bulunamadı');
            }
        } catch (err) {
            toast.error('Veri yüklenirken hata oluştu');
            setError('Veri yüklenirken hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    const handleFeatureChange = (index: number, field: "tr" | "en", value: string) => {
        const newFeatures = [...features];
        newFeatures[index] = { ...newFeatures[index], [field]: value };
        setFeatures(newFeatures);
    };

    const addFeature = () => setFeatures([...features, { tr: '', en: '' }]);
    const removeFeature = (index: number) => {
        const newFeatures = features.filter((_, i) => i !== index);
        setFeatures(newFeatures);
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
            categoryId: formData.get('categoryId'),
            isActive: formData.get('isActive') === 'on',
            order: Number(formData.get('order')),
            images: images,
            videoUrl: formData.get('videoUrl') || null,
            features: features.filter((f) => f.tr.trim() !== '' || f.en.trim() !== ''),
            seoTitle: {
                tr: formData.get('seoTitle_tr'),
                en: formData.get('seoTitle_en'),
            },
            seoDescription: {
                tr: formData.get('seoDescription_tr'),
                en: formData.get('seoDescription_en'),
            },
        };

        try {
            const res = await fetch(`/api/admin/products/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                toast.success('Ürün başarıyla güncellendi');
                router.push('/admin/products');
                router.refresh();
            } else {
                const errData = await res.json();
                toast.error(errData.error || 'Ürün güncellenemedi');
                throw new Error(errData.error || 'Ürün güncellenemedi');
            }
        } catch (err: any) {
            toast.error(err.message || 'Bir hata oluştu.');
            setError(err.message || 'Bir hata oluştu.');
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error || 'Ürün bulunamadı'}</p>
                <Link href="/admin/products" className="text-orange-600 hover:text-orange-700">
                    ← Ürünlere Dön
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-6">
                <Link href="/admin/products" className="text-orange-600 hover:text-orange-700 font-medium">
                    ← Geri Dön
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 mt-2">Ürünü Düzenle</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200">
                {/* Tabs */}
                <div className="flex border-b border-slate-200">
                    <button
                        type="button"
                        onClick={() => setActiveTab('general')}
                        className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'general' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        Genel Bilgiler
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('content')}
                        className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'content' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        İçerik & Özellikler
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('seo')}
                        className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'seo' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        SEO Meta
                    </button>
                </div>

                <div className="p-8 space-y-8">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {/* GENERAL TAB */}
                    <div className={activeTab === 'general' ? 'block' : 'hidden'}>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                                    <select name="categoryId" required defaultValue={product.categoryId} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-900">
                                        <option value="">Seçiniz...</option>
                                        {categories.map((cat: any) => (
                                            <option key={cat.id} value={cat.id}>
                                                {(cat.title as any)?.tr || 'İsimsiz'}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Slug (URL)</label>
                                    <input name="slug" required defaultValue={product.slug} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400" placeholder="osmanli-modeli-tas-duvar" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Ürün Başlığı (TR)</label>
                                    <input name="title_tr" required defaultValue={(product.title as any).tr} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400" placeholder="Örn: Osmanlı Modeli" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Product Title (EN)</label>
                                    <input name="title_en" required defaultValue={(product.title as any).en} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400" placeholder="Ex: Ottoman Model" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Sıralama</label>
                                    <input name="order" type="number" defaultValue={product.order} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400" />
                                </div>
                            </div>

                            {/* Images */}
                            <div>
                                <MultiImageUpload
                                    label="Ürün Görselleri"
                                    value={images}
                                    onChange={setImages}
                                    maxImages={10}
                                />
                            </div>

                            {/* Video URL */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">YouTube Video URL</label>
                                <input
                                    name="videoUrl"
                                    defaultValue={product.videoUrl || ''}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                />
                                <p className="text-xs text-gray-500 mt-1">YouTube video linkini yapıştırın. Ürün sayfasında gösterilecek.</p>
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <input type="checkbox" name="isActive" id="isActive" defaultChecked={product.isActive} className="w-4 h-4 text-orange-600 rounded" />
                                <label htmlFor="isActive" className="text-sm font-medium text-slate-700">Ürün Aktif (Sitede Görünür)</label>
                            </div>
                        </div>
                    </div>

                    {/* CONTENT TAB */}
                    <div className={activeTab === 'content' ? 'block' : 'hidden'}>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Açıklama (TR)</label>
                                    <textarea name="desc_tr" rows={5} defaultValue={(product.description as any).tr} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400" placeholder="Ürün açıklaması..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Description (EN)</label>
                                    <textarea name="desc_en" rows={5} defaultValue={(product.description as any).en} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400" placeholder="Product description..." />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Teknik Özellikler</label>
                                <div className="space-y-3">
                                    {features.map((feature: any, idx) => (
                                        <div key={idx} className="flex gap-2 items-start">
                                            <div className="flex-1 space-y-2">
                                                <input
                                                    type="text"
                                                    value={feature.tr || ""}
                                                    onChange={(e) => handleFeatureChange(idx, "tr", e.target.value)}
                                                    placeholder="TR: 120x60cm boyutlarında"
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400"
                                                />
                                                <input
                                                    type="text"
                                                    value={feature.en || ""}
                                                    onChange={(e) => handleFeatureChange(idx, "en", e.target.value)}
                                                    placeholder="EN: 120x60cm dimensions"
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFeature(idx)}
                                                className="p-2 mt-1 text-red-500 hover:bg-red-50 rounded-lg"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addFeature}
                                        className="text-sm text-orange-600 font-medium hover:text-orange-700"
                                    >
                                        + Özellik Ekle
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SEO TAB */}
                    <div className={activeTab === 'seo' ? 'block' : 'hidden'}>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">SEO Başlığı (TR)</label>
                                    <input name="seoTitle_tr" defaultValue={product.seoTitle?.tr || (typeof product.seoTitle === 'string' ? product.seoTitle : '')} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400" placeholder="Örn: Osmanlı Modeli Taş Duvar" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">SEO Title (EN)</label>
                                    <input name="seoTitle_en" defaultValue={product.seoTitle?.en || ''} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400" placeholder="Ex: Ottoman Model Stone Wall" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">SEO Açıklaması (TR)</label>
                                    <textarea name="seoDescription_tr" rows={3} defaultValue={product.seoDescription?.tr || (typeof product.seoDescription === 'string' ? product.seoDescription : '')} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400" placeholder="Google'da görünecek Türkçe açıklama" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">SEO Description (EN)</label>
                                    <textarea name="seoDescription_en" rows={3} defaultValue={product.seoDescription?.en || ''} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400" placeholder="English description for search engines" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
                        <Link
                            href="/admin/products"
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
                </div>
            </form>
        </div>
    );
}
