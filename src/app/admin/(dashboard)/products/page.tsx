import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import Pagination from "@/components/ui/Pagination";
import ProductSearch from "@/components/admin/ProductSearch";

export const dynamic = 'force-dynamic';

interface Props {
    searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function AdminProductsPage({ searchParams }: Props) {
    const resolvedSearchParams = await searchParams;
    const page = Number(resolvedSearchParams.page) || 1;
    const search = resolvedSearchParams.search || "";
    const limit = 10;
    const skip = (page - 1) * limit;

    let products: any[] = [];
    let total = 0;

    if (search) {
        // PostgreSQL JSON search using raw query for "title"->>'tr' or 'en'
        // We fetch all matching IDs first (sorted) to handle pagination correctly in memory for the ID list
        // Since this is an admin panel, expected result set size is manageable
        const searchPattern = `%${search}%`;
        const matchingIds = await prisma.$queryRaw<{ id: string }[]>`
            SELECT id FROM "Product"
            WHERE "title"->>'tr' ILIKE ${searchPattern} 
            OR "title"->>'en' ILIKE ${searchPattern}
            ORDER BY "order" ASC
        `;

        total = matchingIds.length;

        // Paginate IDs
        const pageIds = matchingIds.slice(skip, skip + limit).map(p => p.id);

        if (pageIds.length > 0) {
            products = await prisma.product.findMany({
                where: { id: { in: pageIds } },
                include: { category: true },
                orderBy: { order: 'asc' }
            });
        }
    } else {
        // Standard pagination without search
        const [count, data] = await Promise.all([
            prisma.product.count(),
            prisma.product.findMany({
                skip,
                take: limit,
                orderBy: { order: 'asc' },
                include: { category: true }
            })
        ]);
        total = count;
        products = data;
    }

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-800">Ürün Yönetimi</h1>
                <Link
                    href="/admin/products/new"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Yeni Ürün Ekle
                </Link>
            </div>

            {/* Search Bar */}
            <div className="max-w-md">
                <ProductSearch />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Görsel</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Başlık (TR)</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Kategori</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Durum</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                    {total === 0 ? "Kayıt bulunamadı." : "Bu sayfada ürün yok."}
                                </td>
                            </tr>
                        ) : (
                            products.map((product: any) => {
                                // Parse JSON title safely
                                const title = product.title as { tr: string, en: string };

                                return (
                                    <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                                                {product.images && product.images.length > 0 ? (
                                                    <Image
                                                        src={product.images[0]}
                                                        alt={title.tr || 'Ürün görseli'}
                                                        fill
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-slate-400">
                                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                                            {(product.category.title as any)?.tr || '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.isActive
                                                ? 'bg-emerald-100 text-emerald-800'
                                                : 'bg-slate-100 text-slate-800'
                                                }`}>
                                                {product.isActive ? 'Aktif' : 'Pasif'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/products/${product.id}/edit`}
                                                    className="p-2 text-slate-600 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                                                    title="Düzenle"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </Link>
                                                <DeleteProductButton id={product.id} title={title.tr} />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="py-4">
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    baseUrl="/admin/products"
                    searchParams={{ search }}
                />
            </div>
        </div>
    );
}
