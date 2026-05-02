This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Environment variables

Copy the required values into `.env.local` (or your hosting provider's env configuration).
All SEO/GEO features degrade gracefully when a variable is unset, so nothing is strictly required,
but the following are strongly recommended to complete ownership verification.

| Variable | Purpose | Where to get it |
|----------|---------|-----------------|
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Injects the `google-site-verification` meta tag on `<head>` so Google Search Console can confirm ownership. | https://search.google.com/search-console → Add property (Meta tag method) |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Injects the `msvalidate.01` meta tag for Bing Webmaster Tools. | https://www.bing.com/webmasters → Add site (Meta tag method) |
| `NEXT_PUBLIC_YANDEX_SITE_VERIFICATION` | Optional — `yandex-verification` meta tag. | https://webmaster.yandex.com |

Example `.env.local`:

```bash
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abc123_your_google_token
NEXT_PUBLIC_BING_SITE_VERIFICATION=1A2B3C4D5E6F_your_bing_token
```

After adding tokens, redeploy so Next.js bakes them into the rendered HTML head.

## SEO / GEO surfaces

This site exposes machine-readable discovery files:

- `/sitemap.xml` — auto-generated from `app/sitemap.ts`
- `/robots.txt` — auto-generated from `app/robots.ts` (allowlists GPTBot, ClaudeBot, Google-Extended, PerplexityBot, Applebot-Extended, CCBot, and others)
- `/llms.txt` — concise manifest for AI assistants (llmstxt.org spec)
- `/llms-full.txt` — expanded bio + case studies for deeper AI context
- Root `<script type="application/ld+json">` — `@graph` with `Person` / `Organization` / `WebSite` / `ProfilePage` entities
- `/about` — human + LLM-optimized FAQ page with `FAQPage` + `ProfilePage` + `BreadcrumbList` JSON-LD
- Per-project JSON-LD (`SoftwareApplication` + `BreadcrumbList`) on `/projects/*` pages

## Maintenance

### Updating Hawk Buddy APK
When releasing a new version of the Hawk Buddy app:
1. Upload the new APK (e.g., `hawk-buddy-v1-3.apk`) to your Cloudflare R2 bucket.
2. Run the update script:
   ```bash
   npm run update-apk -- v1-3
   ```
   This will update the download link and documentation references.
3. Commit the changes.
