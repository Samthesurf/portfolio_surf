# Publishing on samuelsurf.me and Cross-Posting to Medium

## The short version

Publish the complete article on `samuelsurf.me` first. After the article is live, import that URL into Medium and confirm that Medium's canonical link points to the original article on `samuelsurf.me`.

Medium is the distribution channel. Your domain is the permanent home of the article.

## What a canonical URL means

A canonical URL is a signal in a page's HTML that tells search engines which URL is the preferred original when the same or very similar content exists in more than one place.

Assume the original article is:

```text
https://samuelsurf.me/blog/how-i-built-engineering-hub
```

The copy on Medium might be:

```text
https://medium.com/@samuelsurf/how-i-built-engineering-hub-123abc
```

The Medium page should contain this hidden metadata:

```html
<link rel="canonical" href="https://samuelsurf.me/blog/how-i-built-engineering-hub" />
```

This tells Google and other search engines that the Medium page is a republished copy and that the URL on `samuelsurf.me` is the preferred original.

A canonical link is not a redirect. Readers can still open and read the complete article on Medium.

## How the two pages should relate

```text
Original article on samuelsurf.me
  Canonical URL: itself

Republished article on Medium
  Canonical URL: original article on samuelsurf.me
```

Both pages therefore identify the article on your domain as the preferred source.

## Recommended workflow

1. Open `write.samuelsurf.me` and create or select an article.
2. Write the article, upload its images, and review it in Preview or Split mode.
3. Complete the excerpt, tags, cover image and cover alt text in Article Settings.
4. Keep it as a private draft until the final review is complete.
5. Confirm the publish action. The R2-backed public blog updates immediately without a website deployment.
6. Open the final `https://samuelsurf.me/blog/<slug>` URL and check the article.
7. Confirm that it appears in the blog index, sitemap and RSS feed.
8. Optionally request indexing through Google Search Console.
9. Open Medium and go to **Stories**.
10. Select **Import a story**.
11. Paste the `samuelsurf.me` article URL.
12. Review the imported formatting, image captions, code, links, and headings.
13. Publish the Medium version.
14. Edit the Medium story and inspect **Customize canonical link** in its advanced settings.
15. Confirm that it contains the original `samuelsurf.me/blog/...` URL.

Medium's official import tool normally preserves the original publication date and automatically sets the imported source as the canonical URL. Always verify it after publishing.

## Add a visible attribution on Medium

The canonical metadata is primarily for search engines. Add a visible attribution for readers too:

> Originally published on [samuelsurf.me](https://samuelsurf.me/blog/example-article).

A relevant final call to action is also appropriate:

> I build mobile, web, and AI-powered products for founders and organisations. If you are planning something similar, discuss your project with me at samuelsurf.me.

## Do not publish only a clipped teaser

Cross-post the complete article rather than publishing a few paragraphs whose only purpose is to send readers elsewhere. Medium permits authors to cross-post work they own, but its rules discourage clipped stories created mainly to redirect readers off the platform.

## Why the domain version comes first

Publishing on your own domain first means:

- The portfolio builds its own search authority.
- Articles can link directly to your services, projects, and contact page.
- Readers can continue exploring your work without leaving your website.
- You control the design, analytics, URLs, updates, and long-term availability.
- Medium policy or product changes cannot remove the original home of your writing.

## Updating an article

Update and save the original article in `write.samuelsurf.me` first. The studio updates `updatedAt` and preserves the previous version automatically. Then update the Medium copy if the changes are substantial. Keep the Medium canonical URL pointing to the same original article.

## Final checklist

- [ ] Original article is live on `samuelsurf.me` first
- [ ] Original article has a self-referencing canonical URL
- [ ] Article is included in the sitemap and RSS feed
- [ ] Lead image, description, author, publication date, and modified date are correct
- [ ] Medium story was created with **Import a story**
- [ ] Medium canonical link points to the original `samuelsurf.me` URL
- [ ] Medium version contains visible original-source attribution
- [ ] Links, images, headings, and code blocks survived the import correctly

## Official references

- Medium Help: Importing a post to Medium
  - https://help.medium.com/hc/en-us/articles/214550207-Importing-a-post-to-Medium
- Medium Help: Set a canonical link
  - https://help.medium.com/hc/en-us/articles/360033930293-Set-a-canonical-link
- Google Search Central: Canonical URLs
  - https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
