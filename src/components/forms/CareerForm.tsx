'use client'

import { useState, useTransition } from 'react'
import { submitCareerForm } from '@/actions/forms'
import toast from 'react-hot-toast'

export default function CareerForm() {
    const [isPending, startTransition] = useTransition()
    const [formKey, setFormKey] = useState(0)

    async function handleSubmit(formData: FormData) {
        startTransition(async () => {
            const result = await submitCareerForm(formData)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success('Başvurunuz başarıyla alındı!')
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

                {/* Position */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        Başvurulan Pozisyon <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="position"
                        required
                        className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 hover:border-gray-300 text-gray-800 placeholder:text-gray-400"
                        placeholder="Genel Başvuru"
                    />
                </div>
            </div>

            {/* CV Upload - Note: File upload needs further logic for handling, currently just a placeholder in UI sending empty data */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    CV Yükle
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-amber-400 hover:bg-amber-50/50 transition-all cursor-pointer">
                    <input type="file" name="cv" accept=".pdf,.doc,.docx" className="hidden" id="cv-upload" />
                    <label htmlFor="cv-upload" className="cursor-pointer">
                        <svg className="w-10 h-10 text-amber-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <span className="text-gray-600 font-medium">Dosya Seçiniz (PDF, DOC)</span>
                    </label>
                </div>
            </div>

            {/* Message */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    Mesajınız
                </label>
                <textarea
                    name="message"
                    rows={5}
                    className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 hover:border-gray-300 resize-none text-gray-800 placeholder:text-gray-400"
                    placeholder="Kendinizden bahsedin..."
                ></textarea>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isPending}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 w-full md:w-auto shadow-lg hover:shadow-xl hover:scale-105 transform disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isPending ? 'Gönderiliyor...' : 'Gönder'}
            </button>
        </form>
    )
}
