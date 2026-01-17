import { prisma } from "@/lib/prisma";
import ProductForm from "./product-form";

export const dynamic = 'force-dynamic';

export default async function NewProductPage() {
    // Fetch categories for the selection dropdown
    const categories = await prisma.category.findMany({
        orderBy: { order: 'asc' },
        select: { id: true, title: true }
    });

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Yeni Ürün Ekle</h1>
            </div>

            <ProductForm categories={categories} />
        </div>
    );
}
