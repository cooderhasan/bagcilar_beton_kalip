import Link from 'next/link';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
    searchParams?: Record<string, string | undefined>;
    labels?: {
        prev: string;
        next: string;
    };
}

export default function Pagination({
    currentPage,
    totalPages,
    baseUrl,
    searchParams = {},
    labels = { prev: 'Önceki', next: 'Sonraki' }
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const createPageUrl = (page: number) => {
        const params = new URLSearchParams();
        Object.entries(searchParams).forEach(([key, value]) => {
            if (value && key !== 'page') {
                params.set(key, value);
            }
        });
        if (page > 1) {
            params.set('page', page.toString());
        }
        const queryString = params.toString();
        return `${baseUrl}${queryString ? `?${queryString}` : ''}`;
    };

    return (
        <div className="flex justify-center items-center gap-2 mt-12">
            {/* Previous Button */}
            {currentPage > 1 ? (
                <Link
                    href={createPageUrl(currentPage - 1)}
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"
                >
                    {labels.prev}
                </Link>
            ) : (
                <span className="px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed">
                    {labels.prev}
                </span>
            )}

            {/* Page Numbers */}
            <div className="hidden md:flex gap-1">
                {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    // Show current, first, last, and neighbors
                    if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                        return (
                            <Link
                                key={page}
                                href={createPageUrl(page)}
                                className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${currentPage === page
                                        ? 'bg-orange-600 border-orange-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-orange-600'
                                    }`}
                            >
                                {page}
                            </Link>
                        );
                    }
                    if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                    ) {
                        return <span key={page} className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>;
                    }
                    return null;
                })}
            </div>

            {/* Mobile: Just Current/Total */}
            <div className="md:hidden flex items-center text-gray-600 font-medium">
                {currentPage} / {totalPages}
            </div>

            {/* Next Button */}
            {currentPage < totalPages ? (
                <Link
                    href={createPageUrl(currentPage + 1)}
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"
                >
                    {labels.next}
                </Link>
            ) : (
                <span className="px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed">
                    {labels.next}
                </span>
            )}
        </div>
    );
}
