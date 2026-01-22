'use client'

import { useState, useTransition } from 'react'
import { submitContactForm } from '@/actions/forms'
import toast from 'react-hot-toast'

import { useTranslations } from 'next-intl'

export default function ContactForm() {
    const t = useTranslations('Contact')

    const [isPending, startTransition] = useTransition()
    const [formKey, setFormKey] = useState(0) // Reset form by changing key

    async function handleSubmit(formData: FormData) {
        startTransition(async () => {
            const result = await submitContactForm(formData)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success('Mesajınız başarıyla gönderildi!')
                setFormKey(prev => prev + 1)
            }
        })
    }

    return (
        <form key={formKey} action={handleSubmit} className="space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">{t('form.name')}</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 hover:border-gray-300"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">{t('form.email')}</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 hover:border-gray-300"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-2">{t('form.subject')}</label>
                <input
                    type="text"
                    name="subject"
                    id="subject"
                    required
                    className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 hover:border-gray-300"
                />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">{t('form.message')}</label>
                <textarea
                    name="message"
                    id="message"
                    rows={6}
                    required
                    className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 hover:border-gray-300 resize-none"
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 w-full md:w-auto shadow-lg hover:shadow-xl hover:scale-105 transform disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isPending ? 'Gönderiliyor...' : t('form.submit')}
            </button>
        </form>
    )
}
