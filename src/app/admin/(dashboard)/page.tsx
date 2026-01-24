import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
    const session = await auth();

    // Fetch real data from database
    const [
        productCount,
        categoryCount,
        blogCount,
        publishedBlogCount,
        contactCount,
        unreadContactCount,
        quoteCount,
        unreadQuoteCount,
        faqCount,
        referenceCount
    ] = await Promise.all([
        prisma.product.count(),
        prisma.category.count(),
        prisma.blogPost.count(),
        prisma.blogPost.count({ where: { published: true } }),
        prisma.contactForm.count(),
        prisma.contactForm.count({ where: { isRead: false } }),
        prisma.quoteRequest.count(),
        prisma.quoteRequest.count({ where: { isRead: false } }),
        prisma.fAQ.count({ where: { isActive: true } }),
        prisma.reference.count({ where: { isActive: true } })
    ]);

    const totalMessages = contactCount + quoteCount;
    const unreadMessages = unreadContactCount + unreadQuoteCount;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Genel Bakış</h2>
                    <p className="text-gray-500 text-sm mt-1">Hoş geldiniz, <span className="font-medium text-gray-900">{session?.user?.name || 'Admin'}</span>. İşte güncel durum raporu.</p>
                </div>
                <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm">
                    {new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Products */}
                <Link href="/admin/products" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                        </div>
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{categoryCount} kategori</span>
                    </div>
                    <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Toplam Ürün</h3>
                    <p className="text-3xl font-black text-gray-800 tracking-tight">{productCount}</p>
                </Link>

                {/* Blog Posts */}
                <Link href="/admin/blog" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
                            <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                        </div>
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{publishedBlogCount} yayında</span>
                    </div>
                    <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Blog Yazıları</h3>
                    <p className="text-3xl font-black text-gray-800 tracking-tight">{blogCount}</p>
                </Link>

                {/* Messages */}
                <Link href="/admin/forms/contact" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-orange-50 rounded-xl group-hover:bg-orange-100 transition-colors">
                            <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </div>
                        {unreadMessages > 0 ? (
                            <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">{unreadMessages} okunmamış</span>
                        ) : (
                            <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-full">Tümü okundu</span>
                        )}
                    </div>
                    <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Mesajlar</h3>
                    <p className="text-3xl font-black text-gray-800 tracking-tight">{totalMessages}</p>
                </Link>

                {/* System Status */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition-colors">
                            <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Canlı
                        </div>
                    </div>
                    <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Sistem Durumu</h3>
                    <p className="text-xl font-black text-gray-800 tracking-tight truncate">Tüm Servisler Aktif</p>
                </div>
            </div>

            {/* Second Row: Additional Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/admin/faq" className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-50 rounded-lg">
                            <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{faqCount}</p>
                            <p className="text-xs text-gray-500">SSS</p>
                        </div>
                    </div>
                </Link>
                <Link href="/admin/references" className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                            <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{referenceCount}</p>
                            <p className="text-xs text-gray-500">Referans</p>
                        </div>
                    </div>
                </Link>
                <Link href="/admin/forms/quote" className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-teal-50 rounded-lg">
                            <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{quoteCount}</p>
                            <p className="text-xs text-gray-500">Teklif Talebi</p>
                        </div>
                    </div>
                </Link>
                <Link href="/admin/categories" className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-rose-50 rounded-lg">
                            <svg className="w-5 h-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{categoryCount}</p>
                            <p className="text-xs text-gray-500">Kategori</p>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Hızlı Erişim</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <a href="/admin/products/new" className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all group cursor-pointer text-center h-32">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                            </div>
                            <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600">Yeni Ürün Ekle</span>
                        </a>
                        <a href="/admin/blog/new" className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-gray-300 hover:border-purple-500 hover:bg-purple-50 transition-all group cursor-pointer text-center h-32">
                            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            </div>
                            <span className="text-sm font-medium text-gray-600 group-hover:text-purple-600">Yazı Oluştur</span>
                        </a>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-[#111827] to-[#1f2937] p-6 rounded-2xl shadow-lg text-white">
                    <h3 className="text-lg font-bold mb-2">Pro İpuçları</h3>
                    <p className="text-gray-400 text-sm mb-6">Yönetim panelinizi daha verimli kullanmak için kısa yolları keşfedin.</p>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                            <span className="bg-white/10 px-2 py-1 rounded text-xs font-mono text-gray-300">CTRL + /</span>
                            <span className="text-sm text-gray-300">Arama çubuğunu açar (Yakında)</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                            <span className="bg-white/10 px-2 py-1 rounded text-xs font-mono text-gray-300">ESC</span>
                            <span className="text-sm text-gray-300">Modalları kapatır</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

