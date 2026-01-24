"use client"

import { useState, useEffect } from "react"
import { getSiteSettings, updateSiteSettings } from "@/actions/settings"
import FileUpload from "@/components/admin/FileUpload"

export default function SettingsPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [settings, setSettings] = useState<any>(null)
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null)

    useEffect(() => {
        loadSettings()
    }, [])

    async function loadSettings() {
        const res = await getSiteSettings()
        if (res.success) {
            setSettings(res.settings)
        }
        setLoading(false)
    }

    async function handleSubmit(formData: FormData) {
        setSaving(true)
        setMessage(null)

        const res = await updateSiteSettings(formData)

        if (res.success) {
            setMessage({ text: res.message, type: 'success' })
        } else {
            setMessage({ text: res.message, type: 'error' })
        }
        setSaving(false)
    }

    if (loading) return <div className="p-8">Yükleniyor...</div>

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Site Ayarları</h1>

            {message && (
                <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <form action={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">

                {/* İletişim Bilgileri */}
                <section>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b">İletişim Bilgileri</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Telefon</label>
                            <input name="phone" defaultValue={settings?.phone || ""} className="w-full !text-slate-900 !bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none placeholder:text-gray-400" placeholder="+90 555 123 4567" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">E-posta</label>
                            <input name="email" defaultValue={settings?.email || ""} className="w-full !text-slate-900 !bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none placeholder:text-gray-400" placeholder="info@bagcilar.com" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Adres</label>
                            <textarea name="address" defaultValue={settings?.address || ""} className="w-full !text-slate-900 !bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none h-24 placeholder:text-gray-400" placeholder="Adres detayları..." />
                        </div>
                    </div>
                </section>

                {/* Sosyal Medya */}
                <section>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b">Sosyal Medya Linkleri</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Instagram</label>
                            <input name="instagram" defaultValue={settings?.instagram || ""} className="w-full !text-slate-900 !bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none placeholder:text-gray-400" placeholder="https://instagram.com/..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Facebook</label>
                            <input name="facebook" defaultValue={settings?.facebook || ""} className="w-full !text-slate-900 !bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none placeholder:text-gray-400" placeholder="https://facebook.com/..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">LinkedIn</label>
                            <input name="linkedin" defaultValue={settings?.linkedin || ""} className="w-full !text-slate-900 !bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none placeholder:text-gray-400" placeholder="https://linkedin.com/..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Twitter (X)</label>
                            <input name="twitter" defaultValue={settings?.twitter || ""} className="w-full !text-slate-900 !bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none placeholder:text-gray-400" placeholder="https://twitter.com/..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">YouTube</label>
                            <input name="youtube" defaultValue={settings?.youtube || ""} className="w-full !text-slate-900 !bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none placeholder:text-gray-400" placeholder="https://youtube.com/..." />
                        </div>
                    </div>
                </section>

                {/* SEO Ayarları */}
                <section>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b">SEO Ayarları</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Site Başlığı (Title)</label>
                            <input name="seoTitle" defaultValue={settings?.seoTitle || ""} className="w-full !text-slate-900 !bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none placeholder:text-gray-400" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Site Açıklaması (Description)</label>
                            <textarea name="seoDescription" defaultValue={settings?.seoDescription || ""} className="w-full !text-slate-900 !bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none h-20 placeholder:text-gray-400" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Anahtar Kelimeler (Keywords)</label>
                            <input name="seoKeywords" defaultValue={settings?.seoKeywords || ""} className="w-full !text-slate-900 !bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none placeholder:text-gray-400" placeholder="beton, kalıp, inşaat..." />
                        </div>
                    </div>
                </section>

                {/* Dosyalar ve Katalog */}
                <section>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b">Dosyalar</h2>
                    <div className="space-y-6">
                        {/* Katalog */}
                        <div>
                            <FileUpload
                                label="E-Katalog (PDF)"
                                value={settings?.catalogUrl || ""}
                                onChange={(url) => setSettings({ ...settings, catalogUrl: url })}
                                accept="application/pdf"
                            />
                            <input type="hidden" name="catalogUrl" value={settings?.catalogUrl || ""} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <FileUpload
                                    label="Header Logo"
                                    value={settings?.logoUrl || ""}
                                    onChange={(url) => setSettings({ ...settings, logoUrl: url })}
                                    accept="image/*"
                                />
                                <input type="hidden" name="logoUrl" value={settings?.logoUrl || ""} />

                                {/* Logo Height */}
                                <div className="mt-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Logo Yüksekliği (px)</label>
                                    <input
                                        type="number"
                                        name="logoHeight"
                                        value={settings?.logoHeight || 60}
                                        onChange={(e) => setSettings({ ...settings, logoHeight: parseInt(e.target.value) || 60 })}
                                        min={30}
                                        max={150}
                                        className="w-full !text-slate-900 !bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none placeholder:text-gray-400"
                                        placeholder="60"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Önerilen: 50-80 px arası</p>
                                </div>

                                {/* Header Padding */}
                                <div className="mt-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Header Dikey Boşluk (Padding - px)</label>
                                    <input
                                        type="number"
                                        name="headerPadding"
                                        value={settings?.headerPadding !== undefined ? settings.headerPadding : 8}
                                        onChange={(e) => setSettings({ ...settings, headerPadding: parseInt(e.target.value) || 0 })}
                                        min={0}
                                        max={100}
                                        className="w-full !text-slate-900 !bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none placeholder:text-gray-400"
                                        placeholder="8"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Logonun üst ve altındaki boşluk (varsayılan: 8)</p>
                                </div>
                            </div>

                            {/* Footer Logo */}
                            <div>
                                <FileUpload
                                    label="Footer Logo (Transparan)"
                                    value={settings?.footerLogoUrl || ""}
                                    onChange={(url) => setSettings({ ...settings, footerLogoUrl: url })}
                                    accept="image/*"
                                />
                                <input type="hidden" name="footerLogoUrl" value={settings?.footerLogoUrl || ""} />
                            </div>
                            <div>
                                <FileUpload
                                    label="Favicon"
                                    value={settings?.faviconUrl || ""}
                                    onChange={(url) => setSettings({ ...settings, faviconUrl: url })}
                                    accept="image/*"
                                />
                                <input type="hidden" name="faviconUrl" value={settings?.faviconUrl || ""} />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="pt-4 border-t flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-orange-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
                    >
                        {saving ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
                    </button>
                </div>
            </form>
        </div>
    )
}
