import { MetadataRoute } from 'next';
import { SITE } from '../lib/site-config';
import { NAME_VARIANTS } from '../lib/name-variants';
import { listPublishedBlogPosts } from '../lib/blog-store';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = SITE.url;
    const now = new Date();

    const mainPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/projects/engineering-hub`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/projects/hawk-buddy`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/projects/campus-career`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ];

    const namePages: MetadataRoute.Sitemap = NAME_VARIANTS.map((v) => ({
        url: `${baseUrl}/${v.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const blogPages: MetadataRoute.Sitemap = (await listPublishedBlogPosts()).map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt ?? post.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
        images: post.coverImage ? [`${baseUrl}${post.coverImage}`] : undefined,
    }));

    return [...mainPages, ...blogPages, ...namePages];
}
