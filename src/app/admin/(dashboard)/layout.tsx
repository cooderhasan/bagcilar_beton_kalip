import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOut } from "@/auth";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        redirect("/admin/login");
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                        Admin Panel
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin" className="block px-4 py-2 rounded hover:bg-slate-800 transition-colors">
                        Dashboard
                    </Link>

                    <div className="pt-2 pb-1 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Ana Sayfa
                    </div>
                    <Link href="/admin/sliders" className="block px-4 py-2 rounded hover:bg-slate-800 transition-colors">
                        Slider
                    </Link>
                    <Link href="/admin/statistics" className="block px-4 py-2 rounded hover:bg-slate-800 transition-colors">
                        İstatistikler
                    </Link>

                    <div className="pt-2 pb-1 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        İçerik
                    </div>
                    <Link href="/admin/products" className="block px-4 py-2 rounded hover:bg-slate-800 transition-colors">
                        Ürünler
                    </Link>
                    <Link href="/admin/categories" className="block px-4 py-2 rounded hover:bg-slate-800 transition-colors">
                        Kategoriler
                    </Link>
                    <Link href="/admin/blog" className="block px-4 py-2 rounded hover:bg-slate-800 transition-colors">
                        Blog
                    </Link>

                    <div className="pt-2 pb-1 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Genel
                    </div>
                    <Link href="/admin/settings" className="block px-4 py-2 rounded hover:bg-slate-800 transition-colors">
                        Ayarlar
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold">
                            {session.user.email?.[0]?.toUpperCase()}
                        </div>
                        <div className="text-sm overflow-hidden">
                            <div className="font-medium truncate">{session.user.email}</div>
                        </div>
                    </div>
                    <form action={async () => {
                        "use server"
                        await signOut({ redirectTo: "/admin/login" })
                    }}>
                        <button className="w-full bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white px-4 py-2 rounded text-sm transition-all duration-300 flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                            Çıkış Yap
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-auto">
                {children}
            </main>
        </div>
    );
}
