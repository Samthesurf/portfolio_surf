#!/usr/bin/env node

/**
 * Post-build script: notify search engines about the sitemap on every deploy.
 * Runs automatically after `npm run deploy` via the "postdeploy" script.
 *
 * - IndexNow (primarily Bing, plus Yandex/Seznam): we POST the full URL list
 *   read from the live sitemap so /blog and every article are covered.
 * - Google does NOT consume the public IndexNow API, and the old
 *   https://www.google.com/ping endpoint is dead (returns 404/410). The
 *   supported way to nudge Google automatically is the Search Console Sitmaps
 *   API. That requires a service-account credential, so it is opt-in and gated
 *   on GOOGLE_SA_JSON. When the credential is absent we just log that Google
 *   relies on the GSC sitemap (which you submit once in Search Console).
 *
 * All steps are best-effort. A failure must never block a deploy.
 */

const SITE_URL = 'https://samuelsurf.me';
const INDEXNOW_KEY = '87737592fd5ad76147b8a63069636345';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

async function fetchSitemapUrls() {
  const res = await fetch(SITEMAP_URL, { redirect: 'follow' });
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
      if (new URL(url).hostname === new URL(SITE_URL).hostname) {
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
      console.log(`[indexnow] Submitted ${urls.length} URL(s) to IndexNow — ${res.status} OK`);
    } else {
      const detail = await res.text().catch(() => '');
      console.error(`[indexnow] IndexNow failed — HTTP ${res.status} ${detail}`);
    }
  } catch (err) {
    console.error('[indexnow] IndexNow error:', err.message);
  }
}

/**
 * Submit the sitemap to Google Search Console via the Sitmaps API.
 * Gated on GOOGLE_SA_JSON (a stringified service-account key, or a path to
 * the JSON file). Uses only Node built-ins: crypto for the JWT, fetch for the
 * OAuth2 token exchange and the API call.
 */
async function submitGoogleSitemap() {
  const raw = process.env.GOOGLE_SA_JSON;
  if (!raw) {
    console.log(
      '[indexnow] Google: using Search Console sitemap (already submitted). ' +
        'Set GOOGLE_SA_JSON to enable automated resubmission.',
    );
    return;
  }

  let sa;
  try {
    sa = JSON.parse(raw);
  } catch {
    // Maybe it is a path to the file.
    try {
      const fs = await import('node:fs');
      sa = JSON.parse(fs.readFileSync(raw, 'utf8'));
    } catch (err) {
      console.warn(`[indexnow] Google: could not parse GOOGLE_SA_JSON (${err.message}) — skipping.`);
      return;
    }
  }

  if (!sa.client_email || !sa.private_key) {
    console.warn('[indexnow] Google: service account missing client_email/private_key — skipping.');
    return;
  }

  try {
    const crypto = await import('node:crypto');
    const now = Math.floor(Date.now() / 1000);
    const jwtHeader = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
    const jwtClaim = Buffer.from(
      JSON.stringify({
        iss: sa.client_email,
        scope: 'https://www.googleapis.com/auth/webmasters',
        aud: 'https://oauth2.googleapis.com/token',
        iat: now,
        exp: now + 3600,
      }),
    ).toString('base64url');
    const signingInput = `${jwtHeader}.${jwtClaim}`;
    const signature = crypto
      .createSign('RSA-SHA256')
      .update(signingInput)
      .sign(sa.private_key, 'base64url');
    const jwt = `${signingInput}.${signature}`;

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    });
    const tokenJson = await tokenRes.json();
    if (!tokenRes.ok || !tokenJson.access_token) {
      console.warn(`[indexnow] Google OAuth failed — ${tokenJson.error || tokenRes.status} — skipping.`);
      return;
    }

    const site = encodeURIComponent(SITE_URL);
    const feed = encodeURIComponent(SITEMAP_URL);
    const apiRes = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${site}/sitemaps/${feed}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${tokenJson.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      },
    );

    if (apiRes.ok || apiRes.status === 304) {
      console.log('[indexnow] Google sitemap resubmitted via Search Console API — OK');
    } else {
      const detail = await apiRes.text().catch(() => '');
      console.warn(`[indexnow] Google sitemap API returned ${apiRes.status} ${detail} (non-fatal)`);
    }
  } catch (err) {
    console.warn(`[indexnow] Google submission error: ${err.message} (non-fatal)`);
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
  await submitGoogleSitemap();
}

main();
