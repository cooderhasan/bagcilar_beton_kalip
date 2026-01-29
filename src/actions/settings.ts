"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath, unstable_noStore } from "next/cache"

export async function getSiteSettings() {
    unstable_noStore();
    try {
        let settings = await prisma.siteSettings.findFirst()
        if (!settings) {
            settings = await prisma.siteSettings.create({
                data: {
                    id: 1,
                    seoTitle: "Bağcılar Beton Kalıp",
                    seoDescription: "İnşaat ve kalıp sistemleri.",
                },
            })
        }
        return { success: true, settings }
    } catch (error) {
        return { success: false, error: "Ayarlar getirilemedi." }
    }
}

export async function updateSiteSettings(data: FormData) {
    try {
        console.log("UpdateSiteSettings called. FormData keys:", Array.from(data.keys()));
        console.log("seoTitle received:", data.get("seoTitle"));
        console.log("seoDescription received:", data.get("seoDescription"));
        const settings = {
            phone: data.get("phone") as string,
            email: data.get("email") as string,
            address: {
                tr: data.get("addressTr") as string,
                en: data.get("addressEn") as string,
            },
            seoTitle: {
                tr: data.get("seoTitle_tr") as string,
                en: data.get("seoTitle_en") as string,
            },
            seoDescription: {
                tr: data.get("seoDescription_tr") as string,
                en: data.get("seoDescription_en") as string,
            },
            seoKeywords: {
                tr: data.get("seoKeywords_tr") as string,
                en: data.get("seoKeywords_en") as string,
            },
            instagram: data.get("instagram") as string,
            facebook: data.get("facebook") as string,
            linkedin: data.get("linkedin") as string,
            twitter: data.get("twitter") as string,
            youtube: data.get("youtube") as string,
            logoUrl: data.get("logoUrl") as string,
            footerLogoUrl: data.get("footerLogoUrl") as string,
            logoHeight: parseInt(data.get("logoHeight") as string) || 60,
            headerPadding: parseInt(data.get("headerPadding") as string) || 0,
            faviconUrl: data.get("faviconUrl") as string,
            catalogUrl: data.get("catalogUrl") as string,
            googleSiteVerification: data.get("googleSiteVerification") as string,
            bingSiteVerification: data.get("bingSiteVerification") as string,
            contactMapUrl: (() => {
                const rawUrl = data.get("contactMapUrl") as string;
                if (!rawUrl) return "";
                // If it contains an iframe tag, try to extract src
                if (rawUrl.includes("<iframe")) {
                    const match = rawUrl.match(/src=["'](.*?)["']/);
                    const extracted = match ? match[1] : rawUrl;
                    return extracted.replace(/&amp;/g, '&');
                }
                return rawUrl;
            })(),
            homeIntroTitle: {
                tr: data.get("homeIntroTitleTr") as string,
                en: data.get("homeIntroTitleEn") as string,
            },
            homeIntroContent: {
                tr: data.get("homeIntroContentTr") as string,
                en: data.get("homeIntroContentEn") as string,
            },
            homeServicesTitle: {
                tr: data.get("homeServicesTitleTr") as string,
                en: data.get("homeServicesTitleEn") as string,
            },
            homeServicesContent: {
                tr: data.get("homeServicesContentTr") as string,
                en: data.get("homeServicesContentEn") as string,
            },
        }

        await prisma.siteSettings.upsert({
            where: { id: 1 },
            update: settings,
            create: { id: 1, ...settings },
        })

        console.log("Prisma update completed. New SeoTitle:", settings.seoTitle);

        revalidatePath("/", "layout")
        revalidatePath("/tr", "layout")
        revalidatePath("/en", "layout")
        revalidatePath("/admin/settings")
        return { success: true, message: "Ayarlar güncellendi." }
    } catch (error) {
        console.error("Settings update error:", error)
        return { success: false, message: `Güncelleme başarısız: ${error instanceof Error ? error.message : String(error)}` }
    }
}
