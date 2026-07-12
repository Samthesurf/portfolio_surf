#!/usr/bin/env node

/**
 * Post-build script: submit all sitemap URLs to IndexNow.
 * Runs automatically after `npm run deploy` via the "postdeploy" script.
 *
 * Instead of a hard-coded URL list, this reads the live sitemap from the
 * deployed site so every route, including /blog and each article, is
 * submitted. Bing (and other IndexNow participants) are then notified
 * instantly on every deploy.
 *
 * Note: IndexNow is consumed primarily by Bing. Google does not use the
 * public IndexNow API, so Google discovery still depends on Google Search
 * Console + sitemap submission.
 */

const SITE_URL = 'https://samuelsurf.me';
const INDEXNOW_KEY = '87737592fd5ad76147b8a63069636345';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

async function fetchSitemapUrls() {
  const sitemapUrl = `${SITE_URL}/sitemap.xml`;
  const res = await fetch(sitemapUrl, { redirect: 'follow' });
  if (!res.ok) {
    throw new Error(`sitemap request failed: HTTP ${res.status}`);
  }
  const xml = await res.text();
  const urls = [];
  const locRegex = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(xml)) !== null) {
    const url = match[1].trim();
    try {
      const host = new URL(url).hostname;
      if (host === new URL(SITE_URL).hostname) {
        urls.push(url);
      }
    } catch {
      // Ignore malformed entries.
    }
  }
  return urls;
}

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
      const detail = await res.text().catch(() => '');
      console.error(`[indexnow] Failed — HTTP ${res.status} ${detail}`);
    }
  } catch (err) {
    console.error('[indexnow] Submission error:', err.message);
  }
}

async function main() {
  console.log('[indexnow] Reading URLs from live sitemap...');
  let urls;
  try {
    urls = await fetchSitemapUrls();
  } catch (err) {
    console.error(`[indexnow] Could not read sitemap: ${err.message}`);
    process.exitCode = 1;
    return;
  }

  if (urls.length === 0) {
    console.log('[indexnow] Sitemap contained no URLs, skipping.');
    return;
  }

  console.log(`[indexnow] Submitting ${urls.length} URL(s) to IndexNow...`);
  await submitToIndexNow(urls);
}

main();
