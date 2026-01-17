import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function AdminBlogPage() {
    const posts = await prisma.blogPost.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-800">Blog Yönetimi</h1>
                <Link
                    href="/admin/blog/new"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Yeni Yazı Ekle
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Görsel</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Başlık</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Tarih</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Durum</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                    Henüz blog yazısı eklenmemiş.
                                </td>
                            </tr>
                        ) : (
                            posts.map((post) => {
                                const title = post.title as { tr: string, en: string };
                                return (
                                    <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 w-24">
                                            <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                                                {post.image ? (
                                                    <Image
                                                        src={post.image}
                                                        alt={title.tr}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-slate-400">
                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {title.tr}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.published
                                                    ? 'bg-emerald-100 text-emerald-800'
                                                    : 'bg-amber-100 text-amber-800'
                                                }`}>
                                                {post.published ? 'Yayında' : 'Taslak'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/admin/blog/${post.id}`}
                                                className="p-2 text-slate-600 hover:text-orange-500 transition-colors"
                                            >
                                                Düzenle
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
