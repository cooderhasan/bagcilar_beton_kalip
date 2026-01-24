"use client";

import { useState, useEffect } from "react";
import { getAllFAQs, createFAQ, updateFAQ, deleteFAQ, toggleFAQStatus } from "@/actions/faq";

interface FAQ {
    id: string;
    question: { tr: string; en: string };
    answer: { tr: string; en: string };
    order: number;
    isActive: boolean;
}

export default function FAQPage() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadFaqs();
    }, []);

    async function loadFaqs() {
        const res = await getAllFAQs();
        if (res.success && res.faqs) {
            setFaqs(res.faqs as unknown as FAQ[]);
        }
        setLoading(false);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSaving(true);

        const formData = new FormData(e.currentTarget);

        let res;
        if (editingFaq) {
            res = await updateFAQ(editingFaq.id, formData);
        } else {
            res = await createFAQ(formData);
        }

        if (res.success) {
            loadFaqs();
            setShowModal(false);
            setEditingFaq(null);
        } else {
            alert(res.error);
        }
        setSaving(false);
    }

    async function handleDelete(id: string) {
        if (!confirm("Bu SSS'yi silmek istediğinizden emin misiniz?")) return;

        const res = await deleteFAQ(id);
        if (res.success) {
            loadFaqs();
        } else {
            alert(res.error);
        }
    }

    async function handleToggle(id: string) {
        const res = await toggleFAQStatus(id);
        if (res.success) {
            loadFaqs();
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Sıkça Sorulan Sorular (SSS)</h1>
                <button
                    onClick={() => {
                        setEditingFaq(null);
                        setShowModal(true);
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Yeni SSS Ekle
                </button>
            </div>

            {/* FAQ List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {faqs.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p>Henüz SSS eklenmemiş.</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sıra</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Soru (TR)</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {faqs.map((faq) => (
                                <tr key={faq.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm text-gray-500">{faq.order}</td>
                                    <td className="px-4 py-3">
                                        <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                            {(faq.question as any)?.tr || ""}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handleToggle(faq.id)}
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${faq.isActive
                                                ? "bg-green-100 text-green-800"
                                                : "bg-gray-100 text-gray-800"
                                                }`}
                                        >
                                            {faq.isActive ? "Aktif" : "Pasif"}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => {
                                                    setEditingFaq(faq);
                                                    setShowModal(true);
                                                }}
                                                className="text-blue-600 hover:text-blue-800 p-1"
                                                title="Düzenle"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(faq.id)}
                                                className="text-red-600 hover:text-red-800 p-1"
                                                title="Sil"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-bold text-gray-800">
                                {editingFaq ? "SSS Düzenle" : "Yeni SSS Ekle"}
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Order */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sıra</label>
                                <input
                                    type="number"
                                    name="order"
                                    defaultValue={editingFaq?.order || 0}
                                    className="w-24 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-gray-900 bg-white"
                                />
                            </div>

                            {/* Turkish */}
                            <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
                                <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                    🇹🇷 Türkçe
                                </h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Soru *</label>
                                    <input
                                        type="text"
                                        name="questionTr"
                                        required
                                        defaultValue={(editingFaq?.question as any)?.tr || ""}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-gray-900 bg-white"
                                        placeholder="Beton kalıp nedir?"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Cevap *</label>
                                    <textarea
                                        name="answerTr"
                                        required
                                        rows={4}
                                        defaultValue={(editingFaq?.answer as any)?.tr || ""}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none text-gray-900 bg-white"
                                        placeholder="Beton kalıp, betonun döküm sırasında şekil almasını sağlayan..."
                                    />
                                </div>
                            </div>

                            {/* English */}
                            <div className="space-y-4 p-4 bg-blue-50 rounded-xl">
                                <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                    🇬🇧 İngilizce
                                </h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Soru</label>
                                    <input
                                        type="text"
                                        name="questionEn"
                                        defaultValue={(editingFaq?.question as any)?.en || ""}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-gray-900 bg-white"
                                        placeholder="What is concrete formwork?"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Cevap</label>
                                    <textarea
                                        name="answerEn"
                                        rows={4}
                                        defaultValue={(editingFaq?.answer as any)?.en || ""}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none text-gray-900 bg-white"
                                        placeholder="Concrete formwork is a mold that shapes the concrete during the pouring process..."
                                    />
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    value="true"
                                    defaultChecked={editingFaq?.isActive ?? true}
                                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                                />
                                <label className="text-sm text-gray-700">Aktif (Ana sayfada göster)</label>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditingFaq(null);
                                    }}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50"
                                >
                                    {saving ? "Kaydediliyor..." : editingFaq ? "Güncelle" : "Ekle"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
