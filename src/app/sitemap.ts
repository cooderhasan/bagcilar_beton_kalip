import { MetadataRoute } from 'next';

import { prisma } from '@/lib/prisma'; // Import prisma

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://bagcilarbetonkalip.com';
    const locales = ['tr', 'en'];

    const routes = [
        '',
        '/corporate',
        '/products',
        '/references',
        '/contact',
        '/blog',
        '/quote',
        '/careers',
        '/projects',
        '/services',
        '/sectors',
    ];

    let sitemapEntries: MetadataRoute.Sitemap = [];

    // Static Routes
    routes.forEach((route: any) => {
        locales.forEach((locale: any) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: route === '' ? 1 : 0.8,
            });
        });
    });

    // Dynamic Products (Fetched from DB)
    try {
        const products = await prisma.product.findMany({
            where: { isActive: true },
            select: { slug: true, updatedAt: true },
        });

        products.forEach((product: any) => {
            locales.forEach((locale: any) => {
                sitemapEntries.push({
                    url: `${baseUrl}/${locale}/products/${product.slug}`,
                    lastModified: new Date(product.updatedAt),
                    changeFrequency: 'weekly',
                    priority: 0.9,
                });
            });
        });
    } catch (error) {
        console.error("Error fetching products for sitemap:", error);
    }

    // Dynamic Blog Posts (Fetched from DB)
    try {
        const blogPosts = await prisma.blogPost.findMany({
            where: { published: true },
            select: { slug: true, updatedAt: true },
        });

        blogPosts.forEach((post: any) => {
            locales.forEach((locale: any) => {
                sitemapEntries.push({
                    url: `${baseUrl}/${locale}/blog/${post.slug}`,
                    lastModified: new Date(post.updatedAt),
                    changeFrequency: 'monthly',
                    priority: 0.7,
                });
            });
        });
    } catch (error) {
        console.error("Error fetching blog posts for sitemap:", error);
    }

    return sitemapEntries;
}
