# Samuel Surf

**A portfolio that grew into a publishing system.**

[Live portfolio](https://samuelsurf.me) · [Writing studio](https://write.samuelsurf.me) · [GitHub](https://github.com/Samthesurf)

This started as a personal portfolio. It did not stay that way.

The site now carries project case studies, a blog, an about section, search-friendly metadata, and a private browser writing studio. The public side explains what I build. The studio is where I actually write and manage the material behind it.

That split is the interesting part of the repository. It is a portfolio on the surface, but underneath it is also a small content platform.

## What is in here

- A responsive portfolio homepage with project, skills, testimonials, blog, FAQ, and contact sections.
- Project pages for work such as Campus to Career, Engineering Hub, and Hawk Buddy.
- A blog with Markdown content, reading time, article navigation, RSS, and revision support.
- A private writing studio at `write.samuelsurf.me`, protected through Cloudflare Access.
- Browser editing with autosave, media uploads, previews, revisions, and image placement at the editor cursor.
- SEO and GEO surfaces including `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`, JSON-LD, and project metadata.
- Cloudflare R2-backed content and media routes instead of a separate CMS server.
- A small APK update script for keeping the Hawk Buddy download page current.

## The shape of the codebase

```text
app/                 Public routes, blog pages, project pages, and studio routes
components/          Portfolio sections, blog UI, editor, preview, and navigation
content/             Articles and project content
lib/                 Blog rendering, storage, authentication, metadata, and helpers
public/              Public images and downloadable assets
scripts/             Maintenance tasks such as APK updates and IndexNow submission
tests/               Blog and content checks
wrangler.jsonc       Cloudflare Workers and R2 deployment configuration
```

The application uses the Next.js App Router. Public pages and the writing studio live in the same project, but the studio has its own authentication and API boundary.

## Stack

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS 4
- TipTap for the writing editor
- OpenNext for Cloudflare Workers deployment
- Cloudflare Access for studio authentication
- Cloudflare R2 for blog and media storage
- `gray-matter`, `remark`, `rehype`, and `mdast` tooling for content rendering

## A small tour for anyone reading the source

The public journey starts in `app/page.tsx` and moves through reusable sections in `components/`. Project pages and blog posts are ordinary routes, so the content is easy to inspect and extend.

The private journey starts in `app/studio/` and `components/studio/`. That part of the codebase is less like a portfolio template and more like an editor product: it has authentication, drafts, metadata, previews, revisions, uploads, and the awkward edge cases that appear when someone is writing in a browser over a slow network.

Recent work has focused on making the studio resilient rather than merely pretty. Autosave should not lose a paragraph. An uploaded image should stay near the cursor that requested it. A revision should be recoverable. Those details are why this repository is still moving.

## Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful checks:

```bash
npm run lint
npm run build
npm run test:blog
npm run cf:build
```

The deployment commands are available for Cloudflare Workers:

```bash
npm run deploy
# or
npm run upload
```

Do not copy production secrets into Git. Local Cloudflare and studio values belong in the appropriate ignored environment files.

## Verification and SEO setup

The site can add search-engine ownership values through `.env.local`:

```bash
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_google_token
NEXT_PUBLIC_BING_SITE_VERIFICATION=your_bing_token
```

The values are optional. The site still builds without them, but a redeploy is needed after adding them because Next.js renders the metadata into the deployed site.

## Why this repository is worth following

The homepage is the visible result. The more useful story is the progression underneath it:

```text
portfolio page
    → project case studies
    → blog and structured content
    → private writing studio
    → storage, revisions, media, and deployment tooling
```

It is a record of turning a personal website into something I can use to publish, maintain, and explain the work behind the portfolio.