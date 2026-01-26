import { prisma } from '@/lib/prisma'
import { productCategories } from '@/lib/products'
import QuoteDetailModal from '@/components/admin/QuoteDetailModal'

export default async function QuoteRequestsPage() {
    const requests = await prisma.quoteRequest.findMany({
        orderBy: { createdAt: 'desc' }
    })

    // Helper to get product name
    const getProductName = (id: string) => {
        const cat = productCategories.find((c: any) => c.id === id)
        return cat ? cat.id.toUpperCase() : id // Fallback to ID if translation not avail server side easily without passing 't'
        // For better UX we might want to store the actual name or fetch translations here, but ID is readable enough for admin usually
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Teklif Talepleri</h1>
                    <p className="text-gray-500 text-sm mt-1">Ürün teklif formundan gelen talepler.</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600">
                    Toplam: {requests.length}
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase font-medium text-gray-500">
                            <tr>
                                <th className="px-6 py-4">Tarih</th>
                                <th className="px-6 py-4">Müşteri</th>
                                <th className="px-6 py-4">Firma / Ürün</th>
                                <th className="px-6 py-4">Mesaj / Not</th>
                                <th className="px-6 py-4 text-right">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {requests.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                        Henüz hiç teklif talebi yok.
                                    </td>
                                </tr>
                            ) : (
                                requests.map((req: any) => (
                                    <tr key={req.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-xs">
                                            {new Date(req.createdAt).toLocaleDateString('tr-TR')} <br />
                                            {new Date(req.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{req.name}</div>
                                            <div className="text-xs text-gray-500">{req.email}</div>
                                            <div className="text-xs text-gray-500">{req.phone}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-800">{req.company || '-'}</div>
                                            {req.productInterest && (
                                                <div className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full inline-block mt-1">
                                                    {req.productInterest}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 max-w-xs truncate text-gray-500" title={req.message || ''}>
                                            {req.message || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <QuoteDetailModal request={req} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
