import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import ContactDetailModal from '@/components/admin/ContactDetailModal' // Assuming utils exists, if not I'll use inline date formatting

export default async function ContactFormsPage() {
    // Note: 'contactForm' might show as error in IDE until server restart, but it exists in DB
    const messages = await prisma.contactForm.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">İletişim Mesajları</h1>
                    <p className="text-gray-500 text-sm mt-1">Web sitesinden gelen iletişim formu mesajları.</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600">
                    Toplam: {messages.length}
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase font-medium text-gray-500">
                            <tr>
                                <th className="px-6 py-4">Tarih</th>
                                <th className="px-6 py-4">Gönderen</th>
                                <th className="px-6 py-4">Konu</th>
                                <th className="px-6 py-4">Mesaj</th>
                                <th className="px-6 py-4 text-right">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {messages.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                        Henüz hiç mesaj yok.
                                    </td>
                                </tr>
                            ) : (
                                messages.map((msg: any) => (
                                    <tr key={msg.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-xs">
                                            {new Date(msg.createdAt).toLocaleDateString('tr-TR')} <br />
                                            {new Date(msg.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{msg.name}</div>
                                            <div className="text-xs text-gray-400">{msg.email}</div>
                                            {msg.phone && <div className="text-xs text-gray-400">{msg.phone}</div>}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {msg.subject}
                                        </td>
                                        <td className="px-6 py-4 max-w-xs truncate text-gray-500" title={msg.message}>
                                            {msg.message}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <ContactDetailModal message={msg} />
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
