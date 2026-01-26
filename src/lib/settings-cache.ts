import { prisma } from "./prisma"
import { cache } from "react"
import { unstable_cache } from "next/cache"

// React Server Component deduplication - aynı request içinde tekrar sorgulamaz
export const getCachedSiteSettings = cache(async () => {
    const settings = await prisma.siteSettings.findFirst()
    return settings
})

// Next.js Data Cache - 60 saniye boyunca önbellekte tutar
export const getStaticSiteSettings = unstable_cache(
    async () => {
        const settings = await prisma.siteSettings.findFirst()
        return settings
    },
    ['site-settings'],
    { revalidate: 60, tags: ['settings'] }
)
