'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const t = useTranslations('Common'); // Using Common fallback if specific error keys aren't easier

    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application Error:', error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100 max-w-lg">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Bir hata oluştu</h2>
                <p className="text-gray-600 mb-6">
                    Beklenmedik bir sorunla karşılaştık. Lütfen sayfayı yenilemeyi deneyin.
                </p>
                <button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition duration-300"
                >
                    Tekrar Dene
                </button>
                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-8 text-left bg-white p-4 rounded-lg border border-gray-200 overflow-auto max-h-40 text-xs font-mono text-red-800">
                        {error.message}
                    </div>
                )}
            </div>
        </div>
    );
}
