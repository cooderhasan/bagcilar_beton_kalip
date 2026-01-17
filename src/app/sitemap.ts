import { MetadataRoute } from 'next';
import { productCategories } from '@/lib/products';
import { blogPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
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
    routes.forEach((route) => {
        locales.forEach((locale) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: route === '' ? 1 : 0.8,
            });
        });
    });

    // Dynamic Product Categories
    productCategories.forEach((category) => {
        locales.forEach((locale) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/products/${category.slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.9,
            });
        });
    });

    // Dynamic Blog Posts
    blogPosts.forEach((post) => {
        locales.forEach((locale) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/blog/${post.slug}`,
                lastModified: new Date(post.date),
                changeFrequency: 'monthly',
                priority: 0.7,
            });
        });
    });

    return sitemapEntries;
}
