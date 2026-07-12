# Writing and Publishing Articles

The blog is file-based. Every article is an MDX file in `content/blog`, while its images live in a matching folder under `public/blog`.

## Quick publishing workflow

1. Copy `content/blog/draft-article-template.mdx` to a new lowercase, kebab-case filename.
2. Use a descriptive filename because it becomes the URL slug.
3. Create a matching image folder in `public/blog/<slug>/`.
4. Write and preview the article with `npm run dev`.
5. Run `npm run test:blog`, `npm run lint`, and `npm run build`.
6. Set `draft: false` only when the article is ready.
7. Deploy it to `samuelsurf.me` before cross-posting it to Medium.

Example:

```text
content/blog/building-a-reliable-flutter-app.mdx
public/blog/building-a-reliable-flutter-app/cover.webp
```

The public URL becomes:

```text
https://samuelsurf.me/blog/building-a-reliable-flutter-app
```

## Frontmatter reference

Every article begins with YAML frontmatter:

```yaml
---
title: "A clear, specific article title"
excerpt: "The short description used on cards and in search results."
publishedAt: "2026-07-12T09:00:00+01:00"
updatedAt: "2026-07-15T14:30:00+01:00"
coverImage: "/blog/article-slug/cover.webp"
coverAlt: "A useful description of the cover image"
tags:
  - Flutter
  - Architecture
featured: false
draft: true
author: "Samuel Ukpai"
---
```

### Field rules

- `title`: Required. State what the article actually delivers.
- `excerpt`: Required. Used for search, social metadata, the RSS feed, and article cards.
- `publishedAt`: Required ISO 8601 date with the Nigerian `+01:00` timezone.
- `updatedAt`: Optional. Add or change it when making a meaningful revision.
- `coverImage`: Optional site path beginning with `/`. If provided, `coverAlt` is required.
- `coverAlt`: Describe what the image communicates. Do not repeat "image of".
- `tags`: Use a small set of consistent topic names.
- `featured`: Set one strong article to `true` for the highlighted blog card.
- `draft`: Drafts are validated but excluded from the public blog, sitemap, and RSS feed.
- `author`: Defaults to Samuel Ukpai when omitted.

## Writing with Markdown

MDX supports normal Markdown:

```md
## Section heading

A paragraph with **bold text**, *emphasis*, `inline code`, and a [link](https://example.com).

- A useful list item
- Another useful item

> A quotation with a clear source in the surrounding text.
```

Use `##` for major article sections and `###` for subsections. The article page automatically turns those headings into a table of contents and anchored links.

Do not add another `#` heading inside the article. The page already renders the frontmatter title as the only main heading.

## Code blocks

Fenced code blocks receive a readable, scrollable presentation in light and dark modes:

````md
```ts
export function greet(name: string) {
  return `Hello, ${name}`;
}
```
````

Use the correct language identifier, such as `ts`, `tsx`, `js`, `python`, `bash`, `json`, or `yaml`.

## Images

### Recommended image component

Use `ArticleImage` when you want explicit dimensions, a caption, or a wide presentation:

```mdx
<ArticleImage
  src="/blog/article-slug/dashboard.webp"
  alt="Dashboard showing the weekly security summary and alert status"
  caption="The summary keeps the most important action visible before the detailed logs."
  width={1600}
  height={900}
  wide
/>
```

The component uses Next.js image optimisation, reserves the correct layout space, supports responsive sizes, and lazy-loads images below the initial viewport.

Remove `wide` for an image that should remain within the reading column.

Plain Markdown images also work:

```md
![Dashboard showing the weekly security summary](/blog/article-slug/dashboard.webp)
```

Use the component form for important images because it records the real dimensions and supports captions.

### Image preparation

- Prefer WebP for screenshots and photographs.
- Use SVG for diagrams when the source is trustworthy and contains no scripts.
- Aim for a 1600 pixel wide cover image with a 16:9 or similarly useful landscape ratio.
- Keep most article images below 200 KB where quality permits.
- Use descriptive filenames such as `obe-course-mapping.webp`, not `image1.png`.
- Never place essential explanatory text only inside an image.
- Write alt text that conveys the information a reader would miss if the image did not load.
- Decorative images should use an empty alt value.

ImageMagick example:

```bash
magick screenshot.png -strip -quality 82 public/blog/article-slug/screenshot.webp
```

Check the result visually after compression.

## Callouts

Three callout styles are available:

```mdx
<Callout type="note" title="Context">
  Supporting information the reader should notice.
</Callout>

<Callout type="tip" title="Practical tip">
  A concrete recommendation.
</Callout>

<Callout type="warning" title="Before you continue">
  A risk, limitation, or easy-to-miss requirement.
</Callout>
```

## Tables

GitHub-style Markdown tables work and become horizontally scrollable on narrow screens:

```md
| Decision | Reason |
| --- | --- |
| File-based MDX | Versioned, portable, and easy to review |
| Public image folders | Stable URLs for the website and Medium import |
```

Keep tables small. A paragraph or list is often easier to read on mobile.

## Video embeds

Use the privacy-enhanced YouTube component:

```mdx
<YouTube id="VIDEO_ID" title="A descriptive video title" />
```

The iframe loads lazily. Do not embed a video when a link or image communicates the point just as well.

## Article quality checklist

- [ ] The title promises a specific idea, result, or lesson.
- [ ] The opening explains why the subject matters.
- [ ] Headings make the argument easy to scan.
- [ ] Paragraphs are focused and written in clear English.
- [ ] Claims, numbers, and quotations are accurate and attributable.
- [ ] Links use descriptive text instead of "click here".
- [ ] Every meaningful image has useful alt text.
- [ ] Image captions explain relevance instead of repeating the alt text.
- [ ] Code samples are minimal, tested, and labelled with the correct language.
- [ ] The conclusion gives the reader a useful takeaway or next step.
- [ ] The article has been reviewed on mobile and desktop in light and dark modes.

## What the platform handles automatically

Published articles automatically receive:

- A `/blog/<slug>` URL
- Canonical metadata pointing to `samuelsurf.me`
- Open Graph and X/Twitter metadata
- `BlogPosting` and breadcrumb structured data
- Publication and updated dates
- Reading-time and word-count calculations
- A table of contents from level-two and level-three headings
- Readable, horizontally scrollable code blocks in light and dark modes
- Responsive image rendering
- Reading progress
- Copy, X, and LinkedIn share controls
- Tag and text search on the blog index
- Related article suggestions
- Inclusion in `/sitemap.xml`
- Inclusion in `/blog/rss.xml`

For the domain-first Medium workflow, read `docs/publishing-blog-and-medium.md`.
