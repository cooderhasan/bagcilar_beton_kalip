"use client"

import { useState, useEffect } from "react"
import { getSiteSettings, updateSiteSettings } from "@/actions/settings"
import FileUpload from "@/components/admin/FileUpload"
import RichTextEditor from "@/components/admin/RichTextEditor"

export default function SettingsPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [settings, setSettings] = useState<any>(null)
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null)
    const [activeTab, setActiveTab] = useState<'general' | 'social' | 'seo' | 'home_content' | 'services' | 'files'>('general')

    // State for Rich Text content
    const [homeIntroContentTr, setHomeIntroContentTr] = useState("")
    const [homeIntroContentEn, setHomeIntroContentEn] = useState("")
    const [homeServicesContentTr, setHomeServicesContentTr] = useState("")
    const [homeServicesContentEn, setHomeServicesContentEn] = useState("")

    useEffect(() => {
        loadSettings()
    }, [])

    async function loadSettings() {
        const res = await getSiteSettings()
        if (res.success) {
            setSettings(res.settings)
            setHomeIntroContentTr((res.settings?.homeIntroContent as any)?.tr || "")
            setHomeIntroContentEn((res.settings?.homeIntroContent as any)?.en || "")
            setHomeServicesContentTr((res.settings?.homeServicesContent as any)?.tr || "")
            setHomeServicesContentEn((res.settings?.homeServicesContent as any)?.en || "")
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

    const tabs = [
        { id: 'general', label: 'Genel Bilgiler' },
        { id: 'social', label: 'Sosyal Medya' },
        { id: 'seo', label: 'SEO Ayarları' },
        { id: 'home_content', label: 'SEO Metni' },
        { id: 'services', label: 'Hizmetlerimiz' },
        { id: 'files', label: 'Dosyalar & Görünüm' },
    ]

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Site Ayarları</h1>

            {message && (
                <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            {/* Tabs Navigation */}
            <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-6 py-3 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === tab.id
                            ? 'text-orange-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600" />
                        )}
                    </button>
                ))}
            </div>

            <form action={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

                {/* Genel Bilgiler Tab */}
                <div className={activeTab === 'general' ? 'block space-y-6' : 'hidden'}>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b">İletişim Bilgileri</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Telefon</label>
                            <input name="phone" defaultValue={settings?.phone || ""} className="w-full !text-slate-900 !bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none placeholder:text-gray-400" placeholder="+90 555 123 4567" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">E-posta</label>
                            <input name="email" defaultValue={settings?.email || ""} className="w-full !text-slate-900 !bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none placeholder:text-gray-400" placeholder="info@bagcilar.com" />
                        </div>
                        <div className="md:col-span-2">
                            <textarea name="address" defaultValue={settings?.address || ""} className="w-full !text-slate-900 !bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none h-24 placeholder:text-gray-400" placeholder="Adres detayları..." />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Google Maps Embed URL</label>
                            <input name="contactMapUrl" defaultValue={settings?.contactMapUrl || ""} className="w-full !text-slate-900 !bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none placeholder:text-gray-400" placeholder="https://www.google.com/maps/embed?..." />
                            <p className="text-xs text-gray-500 mt-1">Google Maps'ten 'Haritayı yerleştir' veya 'Embed a map' seçeneği ile aldığınız iframe içindeki src linki.</p>
                        </div>
                    </div>
                </div>

                {/* Sosyal Medya Tab */}
                <div className={activeTab === 'social' ? 'block space-y-6' : 'hidden'}>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b">Sosyal Medya Linkleri</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>

                {/* SEO Tab */}
                <div className={activeTab === 'seo' ? 'block space-y-6' : 'hidden'}>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b">SEO Ayarları</h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Site Başlığı (Title)</label>
                            <input name="seoTitle" defaultValue={settings?.seoTitle || ""} className="w-full !text-slate-900 !bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none placeholder:text-gray-400" />
                            <p className="text-xs text-gray-500 mt-1">Tarayıcı sekmesinde ve Google aramalarında görünen başlık.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Site Açıklaması (Description)</label>
                            <textarea name="seoDescription" defaultValue={settings?.seoDescription || ""} className="w-full !text-slate-900 !bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none h-24 placeholder:text-gray-400" />
                            <p className="text-xs text-gray-500 mt-1">Google aramalarında başlığın altında görünen açıklama metni.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Anahtar Kelimeler (Keywords)</label>
                            <input name="seoKeywords" defaultValue={settings?.seoKeywords || ""} className="w-full !text-slate-900 !bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none placeholder:text-gray-400" placeholder="beton, kalıp, inşaat..." />
                            <p className="text-xs text-gray-500 mt-1">Virgül ile ayırarak yazınız.</p>
                        </div>
                    </div>
                </div>

                {/* Ana Sayfa İçerik Tab */}
                <div className={activeTab === 'home_content' ? 'block space-y-6' : 'hidden'}>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b">Ana Sayfa SEO Metni</h2>
                    <div className="grid grid-cols-1 gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Başlık (Türkçe)</label>
                                <input name="homeIntroTitleTr" defaultValue={(settings?.homeIntroTitle as any)?.tr || ""} className="w-full !text-slate-900 !bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none" placeholder="Örn: Bağcılar Beton Kalıp Sistemleri" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Başlık (İngilizce)</label>
                                <input name="homeIntroTitleEn" defaultValue={(settings?.homeIntroTitle as any)?.en || ""} className="w-full !text-slate-900 !bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none" placeholder="Ex: Bagcilar Concrete Formwork Systems" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">İçerik (Türkçe)</label>
                                <RichTextEditor
                                    content={homeIntroContentTr}
                                    onChange={setHomeIntroContentTr}
                                />
                                <input type="hidden" name="homeIntroContentTr" value={homeIntroContentTr} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">İçerik (İngilizce)</label>
                                <RichTextEditor
                                    content={homeIntroContentEn}
                                    onChange={setHomeIntroContentEn}
                                />
                                <input type="hidden" name="homeIntroContentEn" value={homeIntroContentEn} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hizmetlerimiz Tab */}
                <div className={activeTab === 'services' ? 'block space-y-6' : 'hidden'}>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b">Hizmetlerimiz Bölümü</h2>
                    <p className="text-sm text-gray-500 mb-4">Ana sayfadaki 3 sütunlu bölümde sol altta görünecek içerik.</p>
                    <div className="grid grid-cols-1 gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Başlık (Türkçe)</label>
                                <input name="homeServicesTitleTr" defaultValue={(settings?.homeServicesTitle as any)?.tr || ""} className="w-full !text-slate-900 !bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none" placeholder="Örn: Hizmetlerimiz" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Başlık (İngilizce)</label>
                                <input name="homeServicesTitleEn" defaultValue={(settings?.homeServicesTitle as any)?.en || ""} className="w-full !text-slate-900 !bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none" placeholder="Ex: Our Services" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">İçerik (Türkçe)</label>
                                <RichTextEditor
                                    content={homeServicesContentTr}
                                    onChange={setHomeServicesContentTr}
                                />
                                <input type="hidden" name="homeServicesContentTr" value={homeServicesContentTr} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">İçerik (İngilizce)</label>
                                <RichTextEditor
                                    content={homeServicesContentEn}
                                    onChange={setHomeServicesContentEn}
                                />
                                <input type="hidden" name="homeServicesContentEn" value={homeServicesContentEn} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dosyalar Tab */}
                <div className={activeTab === 'files' ? 'block space-y-6' : 'hidden'}>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b">Dosyalar ve Görünüm</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Header Logo Section */}
                        <div className="space-y-4">
                            <h3 className="font-medium text-gray-900">Header Logo</h3>
                            <FileUpload
                                label="Logo Dosyası"
                                value={settings?.logoUrl || ""}
                                onChange={(url) => setSettings({ ...settings, logoUrl: url })}
                                accept="image/*"
                            />
                            <input type="hidden" name="logoUrl" value={settings?.logoUrl || ""} />
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Yükseklik (px)</label>
                                    <input
                                        type="number"
                                        name="logoHeight"
                                        value={settings?.logoHeight || 60}
                                        onChange={(e) => setSettings({ ...settings, logoHeight: parseInt(e.target.value) || 60 })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Dikey Boşluk (px)</label>
                                    <input
                                        type="number"
                                        name="headerPadding"
                                        value={settings?.headerPadding !== undefined ? settings.headerPadding : 8}
                                        onChange={(e) => setSettings({ ...settings, headerPadding: parseInt(e.target.value) || 0 })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-orange-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Other Files */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-medium text-gray-900 mb-3">Footer Logo (Transparan)</h3>
                                <FileUpload
                                    label="Footer Logo Dosyası"
                                    value={settings?.footerLogoUrl || ""}
                                    onChange={(url) => setSettings({ ...settings, footerLogoUrl: url })}
                                    accept="image/*"
                                />
                                <input type="hidden" name="footerLogoUrl" value={settings?.footerLogoUrl || ""} />
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-900 mb-3">Favicon (Tarayıcı İkonu)</h3>
                                <FileUpload
                                    label="Favicon Dosyası"
                                    value={settings?.faviconUrl || ""}
                                    onChange={(url) => setSettings({ ...settings, faviconUrl: url })}
                                    accept="image/*"
                                />
                                <input type="hidden" name="faviconUrl" value={settings?.faviconUrl || ""} />
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-900 mb-3">E-Katalog</h3>
                                <FileUpload
                                    label="PDF Katalog Dosyası"
                                    value={settings?.catalogUrl || ""}
                                    onChange={(url) => setSettings({ ...settings, catalogUrl: url })}
                                    accept="application/pdf"
                                />
                                <input type="hidden" name="catalogUrl" value={settings?.catalogUrl || ""} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t mt-6 flex justify-end sticky bottom-0 bg-white p-4 -mx-6 -mb-6 rounded-b-xl shadow-[0_-4px_12px_rgba(0,0,0,0.05)] border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-orange-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-700 transition-all transform active:scale-95 disabled:opacity-50 disabled:scale-100 shadow-lg shadow-orange-500/30"
                    >
                        {saving ? 'Kaydediliyor...' : 'Tüm Ayarları Kaydet'}
                    </button>
                </div>
            </form>
        </div>
    )
}
