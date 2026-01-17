export default function AdminDashboard() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Genel Bakış</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Toplam Ürün</h3>
                    <p className="text-3xl font-black text-slate-800">0</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Okunmamış Mesajlar</h3>
                    <p className="text-3xl font-black text-slate-800">0</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Site Durumu</h3>
                    <div className="flex items-center gap-2 text-green-500 font-bold">
                        <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                        Aktif
                    </div>
                </div>
            </div>
        </div>
    );
}
