import { prisma } from '@/lib/prisma'

export default async function CareerApplicationsPage() {
    const apps = await prisma.careerApplication.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">İş Başvuruları (CV)</h1>
                    <p className="text-gray-500 text-sm mt-1">Kariyer formundan gelen başvurular.</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600">
                    Toplam: {apps.length}
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase font-medium text-gray-500">
                            <tr>
                                <th className="px-6 py-4">Tarih</th>
                                <th className="px-6 py-4">Aday</th>
                                <th className="px-6 py-4">Pozisyon</th>
                                <th className="px-6 py-4">İletişim</th>
                                <th className="px-6 py-4">Ön Yazı</th>
                                <th className="px-6 py-4 text-right">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {apps.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                                        Henüz hiç iş başvurusu yok.
                                    </td>
                                </tr>
                            ) : (
                                apps.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-xs">
                                            {new Date(app.createdAt).toLocaleDateString('tr-TR')} <br />
                                            {new Date(app.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{app.name}</div>
                                            {app.cvUrl && (
                                                <a href={app.cvUrl} target="_blank" className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1">
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                    CV İndir
                                                </a>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-md text-xs font-medium border border-purple-100">
                                                {app.position || 'Genel Başvuru'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs">
                                            <div className="text-gray-900">{app.email}</div>
                                            <div className="text-gray-500">{app.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 max-w-xs truncate text-gray-500" title={app.message || ''}>
                                            {app.message || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-blue-600 hover:text-blue-700 font-medium text-xs bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                                                Görüntüle
                                            </button>
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
