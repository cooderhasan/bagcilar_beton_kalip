'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface Settings {
    phone?: string;
    email?: string;
    address?: string;
}

export default function ContactPage() {
    const t = useTranslations('Contact');
    const tCommon = useTranslations('Common');
    const [settings, setSettings] = useState<Settings>({});

    useEffect(() => {
        // Fetch settings from API
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => setSettings(data))
            .catch(err => console.error('Error fetching settings:', err));
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(t('form.success'));
        // In a real app, this would send data to an API
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-primary text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
                    <p className="text-xl opacity-90">{t('subtitle')}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Contact Info (Left) */}
                    <div className="lg:w-1/3">
                        <div className="bg-white p-8 rounded-lg shadow-md h-full">
                            <h2 className="text-2xl font-bold text-primary mb-8 border-b pb-4">
                                {t('info.title')}
                            </h2>

                            <div className="space-y-8">
                                {/* Address */}
                                <div className="flex items-start gap-4">
                                    <div className="bg-accent/10 p-3 rounded-full text-accent shrink-0">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-1">{t('info.address')}</h3>
                                        <p className="text-gray-600">{settings.address || 'İstanbul, Türkiye'}</p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-4">
                                    <div className="bg-accent/10 p-3 rounded-full text-accent shrink-0">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-1">{t('info.phone')}</h3>
                                        <a href={`tel:${settings.phone}`} className="text-gray-600 font-mono text-lg hover:text-accent">
                                            {settings.phone || '+90 555 555 55 55'}
                                        </a>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="bg-accent/10 p-3 rounded-full text-accent shrink-0">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-1">{t('info.email')}</h3>
                                        <a href={`mailto:${settings.email}`} className="text-gray-600 hover:text-accent">
                                            {settings.email || 'info@bagcilarbetonkalip.com'}
                                        </a>
                                    </div>
                                </div>

                                {/* Working Hours */}
                                <div className="flex items-start gap-4">
                                    <div className="bg-accent/10 p-3 rounded-full text-accent shrink-0">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-1">{t('info.workingHours')}</h3>
                                        <p className="text-gray-600">{t('info.workingHoursValue')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Google Maps Embed */}
                            <div className="mt-8 rounded-lg overflow-hidden h-64 border border-gray-200">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48152.69539828469!2d28.80946747683952!3d41.03439931855848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa4546bbee38b%3A0x194553303d726b2b!2sBa%C4%9Fc%C4%B1lar%2C%20Istanbul!5e0!3m2!1sen!2str!4v1705221975000!5m2!1sen!2str"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Bağcılar Google Maps"
                                ></iframe>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form (Right) */}
                    <div className="lg:w-2/3">
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-primary mb-6">{t('form.title')}</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{t('form.name')}</label>
                                        <input type="text" id="name" required className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-accent focus:border-accent outline-none transition-colors" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t('form.email')}</label>
                                        <input type="email" id="email" required className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-accent focus:border-accent outline-none transition-colors" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">{t('form.subject')}</label>
                                    <input type="text" id="subject" required className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-accent focus:border-accent outline-none transition-colors" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">{t('form.message')}</label>
                                    <textarea id="message" rows={5} required className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-accent focus:border-accent outline-none transition-colors"></textarea>
                                </div>

                                <button type="submit" className="bg-accent hover:bg-yellow-500 text-primary font-bold py-3 px-8 rounded transition-colors duration-300 w-full md:w-auto">
                                    {t('form.submit')}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
