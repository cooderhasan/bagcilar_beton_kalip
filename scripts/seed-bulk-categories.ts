
import { PrismaClient } from '@prisma/client'
import { slugify } from '@/lib/utils' // Assuming we can use this or just implement a simple slugify here

const prisma = new PrismaClient()

const categories = [
    { tr: 'Özel Tasarım Kalıplar', en: 'Custom Design Molds' },
    { tr: 'Kolon Kalıpları', en: 'Column Molds' },
    { tr: 'Korkuluk Kalıpları', en: 'Railing Molds' },
    { tr: 'Kapı Kemer Kalıpları', en: 'Door Arch Molds' },
    { tr: 'Bariyer Kalıpları', en: 'Barrier Molds' },
    { tr: 'Bahçe Duvar Kalıpları', en: 'Garden Wall Molds' },
    { tr: 'Beton Çit Kalıpları', en: 'Concrete Fence Molds' },
    { tr: 'Plywood Yüzeyli Kalıplar', en: 'Plywood Surfaced Molds' },
    { tr: 'Hatıl Kalıpları', en: 'Beam Molds' },
    { tr: 'Beton Kalıp Yardımcı Ürünleri', en: 'Concrete Mold Accessories' },
]

function simpleSlugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/ç/g, 'c')
        .replace(/ğ/g, 'g')
        .replace(/ı/g, 'i')
        .replace(/İ/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ş/g, 's')
        .replace(/ü/g, 'u')
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '')             // Trim - from end of text
}

async function main() {
    console.log('Start seeding categories...')

    for (const cat of categories) {
        const slug = simpleSlugify(cat.tr)

        // Check if exists
        const exists = await prisma.category.findUnique({
            where: { slug }
        })

        if (!exists) {
            await prisma.category.create({
                data: {
                    title: { tr: cat.tr, en: cat.en },
                    description: { tr: `${cat.tr} çözümleri ve modelleri.`, en: `${cat.en} solutions and models.` },
                    slug,
                    order: 0, // user can reorder later
                }
            })
            console.log(`Created category: ${cat.tr}`)
        } else {
            console.log(`Category already exists: ${cat.tr}`)
        }
    }
    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
