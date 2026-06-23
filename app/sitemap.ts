import { MetadataRoute } from 'next';
import { SITE } from '../lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = SITE.url;
    const now = new Date();

    return [
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
}
