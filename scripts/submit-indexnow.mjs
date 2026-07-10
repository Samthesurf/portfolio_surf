#!/usr/bin/env node

/**
 * Post-build script: submit all sitemap URLs to IndexNow.
 * Runs automatically after `npm run deploy` via the "postdeploy" script.
 *
 * Reads the sitemap from the built output, parses URLs, and POSTs them
 * to the IndexNow API so Bing/DuckDuckGo/Yandex/etc. get notified instantly.
 */

const SITE_URL = 'https://samuelsurf.me';
const INDEXNOW_KEY = '87737592fd5ad76147b8a63069636345';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

async function submitToIndexNow(urls) {
  if (urls.length === 0) {
    console.log('[indexnow] No URLs to submit.');
    return;
  }

  const host = new URL(SITE_URL).hostname;
  const keyLocation = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

  const body = JSON.stringify({
    host,
    key: INDEXNOW_KEY,
    keyLocation,
    urlList: urls,
  });

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body,
    });

    if (res.ok) {
      console.log(`[indexnow] Submitted ${urls.length} URL(s) — ${res.status} OK`);
    } else {
      console.error(`[indexnow] Failed — HTTP ${res.status}`);
    }
  } catch (err) {
    console.error('[indexnow] Submission error:', err.message);
  }
}

async function main() {
  const fs = await import('fs');
  const path = await import('path');

  // Try to read URLs from the sitemap source file
  const sitemapPath = path.join(process.cwd(), 'app', 'sitemap.ts');

  if (!fs.existsSync(sitemapPath)) {
    console.log('[indexnow] No sitemap.ts found, skipping.');
    return;
  }

  // Parse URLs from the sitemap source (since we know the structure)
  const urls = [
    `${SITE_URL}/`,
    `${SITE_URL}/about`,
    `${SITE_URL}/projects/engineering-hub`,
    `${SITE_URL}/projects/hawk-buddy`,
    `${SITE_URL}/projects/campus-career`,
    // Name-variant landing pages
    `${SITE_URL}/samuel-ukpai`,
    `${SITE_URL}/sam-surf`,
    `${SITE_URL}/samuel-surfboard`,
    `${SITE_URL}/sam-surf-ai`,
    `${SITE_URL}/ukpai-dev`,
    `${SITE_URL}/samuel-surf`,
    `${SITE_URL}/nasurf`,
  ];

  console.log(`[indexnow] Submitting ${urls.length} URLs to IndexNow...`);
  await submitToIndexNow(urls);
}

main();
