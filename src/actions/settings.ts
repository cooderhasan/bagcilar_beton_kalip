"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getSiteSettings() {
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
        const settings = {
            phone: data.get("phone") as string,
            email: data.get("email") as string,
            address: data.get("address") as string,
            seoTitle: data.get("seoTitle") as string,
            seoDescription: data.get("seoDescription") as string,
            seoKeywords: data.get("seoKeywords") as string,
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

        revalidatePath("/", "layout")
        revalidatePath("/tr", "layout")
        revalidatePath("/en", "layout")
        return { success: true, message: "Ayarlar güncellendi." }
    } catch (error) {
        console.error("Settings update error:", error)
        return { success: false, message: `Güncelleme başarısız: ${error instanceof Error ? error.message : String(error)}` }
    }
}
