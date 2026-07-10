import { SITE } from './site-config';

const INDEXNOW_KEY = '87737592fd5ad76147b8a63069636345';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

interface IndexNowResult {
  ok: boolean;
  status: number;
  urlCount: number;
}

/**
 * Submit one or more URLs to IndexNow for instant search engine notification.
 * Works on the server side only (Node/Edge runtime).
 */
export async function submitToIndexNow(urls: string[]): Promise<IndexNowResult> {
  if (urls.length === 0) {
    return { ok: true, status: 200, urlCount: 0 };
  }

  const host = new URL(SITE.url).hostname;
  const keyLocation = `${SITE.url}/${INDEXNOW_KEY}.txt`;

  try {
    // Single URL: use GET for simplicity
    if (urls.length === 1) {
      const params = new URLSearchParams({
        url: urls[0],
        key: INDEXNOW_KEY,
      });
      const res = await fetch(`${INDEXNOW_ENDPOINT}?${params}`, { method: 'GET' });
      return { ok: res.ok, status: res.status, urlCount: 1 };
    }

    // Batch: POST with JSON body (up to 10,000 URLs)
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation,
        urlList: urls,
      }),
    });

    return { ok: res.ok, status: res.status, urlCount: urls.length };
  } catch (err) {
    console.error('IndexNow submission failed:', err);
    return { ok: false, status: 0, urlCount: urls.length };
  }
}
