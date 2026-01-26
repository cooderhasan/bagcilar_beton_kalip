'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteProductButton({ id, title }: { id: string, title?: string }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm(`${title ? `"${title}"` : 'Bu ürünü'} silmek istediğinize emin misiniz?`)) return;

        setIsDeleting(true);
        try {
            const res = await fetch(`/api/admin/products/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Silme işlemi başarısız oldu');
            }

            router.refresh();
        } catch (error) {
            console.error('Delete error:', error);
            alert('Silinirken bir hata oluştu.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`p-2 rounded-lg transition-colors ${isDeleting
                ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                : 'text-slate-600 hover:text-red-500 hover:bg-red-50'
                }`}
            title="Sil"
        >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </button>
    );
}
