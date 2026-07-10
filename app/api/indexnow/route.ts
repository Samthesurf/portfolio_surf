import { NextResponse } from 'next/server';
import { submitToIndexNow } from '@/lib/indexnow';
import { SITE } from '@/lib/site-config';

/**
 * GET  /api/indexnow  -> status check (is key configured?)
 * POST /api/indexnow  -> submit URLs { urls: string[] }
 *
 * If no urls are provided in the POST body, all sitemap URLs are submitted.
 */
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

  // If no URLs provided, submit all pages from the sitemap
  if (urls.length === 0) {
    urls = [
      `${SITE.url}/`,
      `${SITE.url}/about`,
      `${SITE.url}/projects/engineering-hub`,
      `${SITE.url}/projects/hawk-buddy`,
      `${SITE.url}/projects/campus-career`,
      `${SITE.url}/samuel-ukpai`,
      `${SITE.url}/sam-surf`,
      `${SITE.url}/samuel-surfboard`,
      `${SITE.url}/sam-surf-ai`,
      `${SITE.url}/ukpai-dev`,
      `${SITE.url}/samuel-surf`,
      `${SITE.url}/nasurf`,
    ];
  }

  const result = await submitToIndexNow(urls);

  return NextResponse.json({
    ...result,
    submittedUrls: urls,
  });
}
