'use client';

import { useState } from 'react';

type ContactMessage = {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    ipAddress: string | null;
    createdAt: Date;
    isRead: boolean;
};

export default function ContactDetailModal({ message }: { message: ContactMessage }) {
    const [isOpen, setIsOpen] = useState(false);

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="text-blue-600 hover:text-blue-700 font-medium text-xs bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
            >
                Görüntüle
            </button>
        );
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
                onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
                    <div className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6 border-b border-gray-100 pb-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">İletişim Mesajı</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    {new Date(message.createdAt).toLocaleString('tr-TR')}
                                </p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-500 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Ad Soyad</label>
                                    <div className="text-gray-900 font-medium mt-1">{message.name}</div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Telefon</label>
                                    <div className="text-gray-900 font-medium mt-1">{message.phone || '-'}</div>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">E-posta</label>
                                <div className="text-gray-900 mt-1 break-all">{message.email}</div>
                            </div>

                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Konu</label>
                                <div className="text-gray-900 font-medium mt-1">{message.subject || '(Konu yok)'}</div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Mesaj</label>
                                <div className="mt-2 p-4 bg-gray-50 rounded-xl text-gray-700 leading-relaxed border border-gray-100 min-h-[100px] whitespace-pre-wrap">
                                    {message.message}
                                </div>
                            </div>

                            {message.ipAddress && (
                                <div className="pt-4 border-t border-gray-100">
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">IP Adresi</label>
                                    <div className="text-gray-500 text-xs mt-1 font-mono">{message.ipAddress}</div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="mt-8 flex justify-end gap-3">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                            >
                                Kapat
                            </button>
                            <a
                                href={`mailto:${message.email}`}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Yanıtla
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
