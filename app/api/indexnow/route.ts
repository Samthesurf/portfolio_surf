import { NextResponse } from 'next/server';
import { submitToIndexNow } from '@/lib/indexnow';
import { SITE } from '@/lib/site-config';

/**
 * GET  /api/indexnow  -> status check (is key configured?)
 * POST /api/indexnow  -> submit URLs { urls: string[] }
 *
 * If no urls are provided in the POST body, all URLs from the live sitemap
 * are submitted. This keeps /blog and future articles covered without
 * hand-editing a list.
 */

const SITEMAP_URL = `${SITE.url}/sitemap.xml`;

async function getSitemapUrls(): Promise<string[]> {
  try {
    const res = await fetch(SITEMAP_URL, { redirect: 'follow' });
    if (!res.ok) return [];
    const xml = await res.text();
    const urls: string[] = [];
    const locRegex = /<loc>([^<]+)<\/loc>/g;
    let match: RegExpExecArray | null;
    while ((match = locRegex.exec(xml)) !== null) {
      const url = match[1].trim();
      try {
        if (new URL(url).hostname === new URL(SITE.url).hostname) {
          urls.push(url);
        }
      } catch {
        // Ignore malformed entries.
      }
    }
    return urls;
  } catch {
    return [];
  }
}

export async function GET() {
  return NextResponse.json({
    configured: true,
    host: new URL(SITE.url).hostname,
    keyLocation: `${SITE.url}/87737592fd5ad76147b8a63069636345.txt`,
    message: 'IndexNow is configured. POST { "urls": [...] } to submit URLs.',
  });
}

export async function POST(request: Request) {
  let urls: string[] = [];

  try {
    const body = await request.json();
    if (Array.isArray(body.urls)) {
      urls = body.urls;
    }
  } catch {
    // No body or invalid JSON — fall through to submit all sitemap URLs
  }

  // If no URLs provided, submit all pages from the live sitemap.
  if (urls.length === 0) {
    urls = await getSitemapUrls();
  }

  const result = await submitToIndexNow(urls);

  return NextResponse.json({
    ...result,
    submittedUrls: urls,
  });
}
