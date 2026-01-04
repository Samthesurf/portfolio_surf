# Cloudflare Pages Deployment Log (Jan 4, 2026)

## Overview
Attempted to set up dual-hosting for the portfolio project on both **Vercel** and **Cloudflare Pages**. While the build process was eventually successful, the final deployment failed due to platform-specific file size restrictions.

---

## 🛠 Technical Hurdles & Fixes

### 1. Dependency Conflicts (Next.js 16)
*   **Issue:** The `@cloudflare/next-on-pages` adapter officially supports up to Next.js 15.5.
*   **Fix:** Forced installation using `--legacy-peer-deps` to allow Next.js 16 compatibility.
*   **Build Environment:** Added `NPM_CONFIG_LEGACY_PEER_DEPS=true` to ensure Cloudflare's build server could resolve the tree.

### 2. Edge Runtime Requirements
Cloudflare Pages requires all non-static routes to run on the Edge Runtime.
*   **Global Change:** Added `export const runtime = 'edge'` to `app/layout.tsx`.
*   **Metadata Routes:** Explicitly added the Edge runtime export to `app/robots.ts` and `app/sitemap.ts`.
*   **Icon Issue:** Next.js was generating a dynamic route for `app/icon.svg`.
    *   **Fix:** Moved `icon.svg` from `app/` to `public/` and updated metadata to treat it as a static asset.

### 3. Build Command Configuration
*   **Command:** `npx @cloudflare/next-on-pages`
*   **Output Directory:** `.vercel/output/static`
*   **Required Flags:** `nodejs_compat` (Compatibility flag in Cloudflare settings).

---

## 🚫 The "Dealbreaker" Error
After achieving a successful build, the deployment failed during the upload phase:

```bash
✘ [ERROR] Pages only supports files up to 25 MiB in size
  downloads/hawk-buddy.apk is 59.6 MiB in size
```

### The Root Cause
Cloudflare Pages has a **hard limit of 25 MiB** per static file. The `hawk-buddy.apk` included in the `public/downloads/` folder is ~60 MiB, which is natively supported by Vercel but strictly prohibited on Cloudflare Pages.

---

## 🏁 Final Status: FAILED
The project is currently **incompatible** with Cloudflare Pages as long as large binary files (like APKs) are hosted directly in the `public/` directory.

### Recommended Next Steps
1.  **External Hosting:** Move `hawk-buddy.apk` to an external storage provider (Google Drive, Cloudflare R2, or AWS S3).
2.  **Redirect Links:** Update the download button to point to the external URL.
3.  **Redeploy:** Once the file is removed from the repository, the existing Cloudflare configuration will work perfectly.
