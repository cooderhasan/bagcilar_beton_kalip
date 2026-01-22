'use client'

import { useState, useTransition } from 'react'
import { submitQuoteForm } from '@/actions/forms'
import toast from 'react-hot-toast'

import { useTranslations } from 'next-intl'

export default function QuoteForm({ productCategories }: { productCategories: any[] }) {
    // Note: We use 'ProductCategories' namespace if available, or just general 'Quote' namespace
    const t = useTranslations('ProductCategories')

    const [isPending, startTransition] = useTransition()
    const [formKey, setFormKey] = useState(0)

    async function handleSubmit(formData: FormData) {
        startTransition(async () => {
            const result = await submitQuoteForm(formData)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success('Teklif isteğiniz alındı! En kısa sürede döneceğiz.')
                setFormKey(prev => prev + 1)
            }
        })
    }

    return (
        <form key={formKey} action={handleSubmit} className="space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        Adınız Soyadınız <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 hover:border-gray-300 text-gray-800 placeholder:text-gray-400"
                        placeholder="Adınız Soyadınız"
                    />
                </div>

                {/* Company */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        Firma Adı
                    </label>
                    <input
                        type="text"
                        name="company"
                        className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 hover:border-gray-300 text-gray-800 placeholder:text-gray-400"
                        placeholder="Firma Adı"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        E-posta Adresiniz <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 hover:border-gray-300 text-gray-800 placeholder:text-gray-400"
                        placeholder="ornek@email.com"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        Telefon Numaranız
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 hover:border-gray-300 text-gray-800 placeholder:text-gray-400"
                        placeholder="+90 5XX XXX XX XX"
                    />
                </div>

                {/* Product Select */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        Ürün
                    </label>
                    <select name="productId" className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 hover:border-gray-300 bg-white text-gray-800">
                        <option value="">Ürün Seçin</option>
                        {productCategories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {t(category.id)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Quantity */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        Miktar
                    </label>
                    <input
                        type="text"
                        name="quantity"
                        className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 hover:border-gray-300 text-gray-800 placeholder:text-gray-400"
                        placeholder="Örn: 1000 adet"
                    />
                </div>
            </div>

            {/* Message */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    Mesajınız <span className="text-red-500">*</span>
                </label>
                <textarea
                    name="message"
                    required
                    rows={6}
                    className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 hover:border-gray-300 resize-none text-gray-800 placeholder:text-gray-400"
                    placeholder="Teknik detaylar, ölçüler, özel istekler..."
                ></textarea>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isPending}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 w-full md:w-auto shadow-lg hover:shadow-xl hover:scale-105 transform disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isPending ? 'Gönderiliyor...' : 'Teklif İste'}
            </button>
        </form>
    )
}
