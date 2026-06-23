import { MetadataRoute } from 'next';
import { SITE } from '../lib/site-config';

// Explicit allowlist for major AI crawlers so every engine's training + retrieval
// bots have clear permission to index the site. The generic "*" rule stays as
// the fallback for everything else.
const aiUserAgents = [
    // OpenAI
    'GPTBot',
    'ChatGPT-User',
    'OAI-SearchBot',
    // Anthropic
    'ClaudeBot',
    'Claude-Web',
    'anthropic-ai',
    // Google (generative)
    'Google-Extended',
    // Apple
    'Applebot',
    'Applebot-Extended',
    // Perplexity
    'PerplexityBot',
    'Perplexity-User',
    // Common Crawl (feeds many LLM training sets)
    'CCBot',
    // Others
    'Bytespider',
    'Amazonbot',
    'YouBot',
    'DuckAssistBot',
    'cohere-ai',
    'Meta-ExternalAgent',
    'Meta-ExternalFetcher',
    'FacebookBot',
    'DiffBot',
    'Timpibot',
    'omgili',
    'ImagesiftBot',
];

export default function robots(): MetadataRoute.Robots {
    const baseUrl = SITE.url;

    return {
        rules: [
            ...aiUserAgents.map((userAgent) => ({
                userAgent,
                allow: '/',
                disallow: ['/api/', '/_next/'],
            })),
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/', '/private/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}
