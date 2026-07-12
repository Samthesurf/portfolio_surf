import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { R2Bucket, R2ObjectBody } from "@cloudflare/workers-types";
import GithubSlugger from "github-slugger";
import { toString } from "mdast-util-to-string";
import readingTime from "reading-time";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";

import type {
  BlogFrontmatter,
  BlogHeading,
  BlogPost,
  BlogPostSummary,
} from "./blog-types";

const POST_PREFIX = "posts/";
const REVISION_PREFIX = "revisions/";
const ARCHIVE_PREFIX = "archives/";
const MEDIA_PREFIX = "media/";
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE_WITH_TIMEZONE =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})$/;

export interface BlogDocument extends BlogFrontmatter {
  schemaVersion: 1;
  slug: string;
  content: string;
  archived?: boolean;
}

export interface StudioArticle extends BlogDocument {
  etag?: string;
}

export class BlogStoreError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code: string,
  ) {
    super(message);
    this.name = "BlogStoreError";
  }
}

function getBucket(): R2Bucket {
  const { env } = getCloudflareContext();
  if (!env.BLOG_CONTENT) {
    throw new BlogStoreError("Blog storage is not configured", 503, "storage_unavailable");
  }
  return env.BLOG_CONTENT;
}

function requiredString(value: unknown, field: string, maxLength: number): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new BlogStoreError(`${field} is required`, 400, "invalid_article");
  }
  const normalized = value.trim();
  if (normalized.length > maxLength) {
    throw new BlogStoreError(`${field} is too long`, 400, "invalid_article");
  }
  return normalized;
}

function optionalString(value: unknown, field: string, maxLength: number): string | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  return requiredString(value, field, maxLength);
}

function requiredDate(value: unknown, field: string): string {
  const date = requiredString(value, field, 64);
  if (!ISO_DATE_WITH_TIMEZONE.test(date) || Number.isNaN(Date.parse(date))) {
    throw new BlogStoreError(`${field} must be an ISO date with a timezone`, 400, "invalid_article");
  }
  return date;
}

function assertSafeMdx(content: string): void {
  let fenced = false;
  for (const line of content.split("\n")) {
    if (/^\s*```/.test(line)) {
      fenced = !fenced;
      continue;
    }
    if (fenced) continue;
    if (/^\s*(?:import|export)\b/.test(line)) {
      throw new BlogStoreError("MDX imports and exports are not allowed", 400, "unsafe_mdx");
    }
    if (/<\/?(?:script|iframe|object|embed|style)\b/i.test(line)) {
      throw new BlogStoreError("Unsafe HTML is not allowed in articles", 400, "unsafe_mdx");
    }
    if (/\bon[A-Za-z]+\s*=|dangerouslySetInnerHTML|javascript:/i.test(line)) {
      throw new BlogStoreError("Executable HTML attributes are not allowed", 400, "unsafe_mdx");
    }
    const componentNames = [...line.matchAll(/<\/?([A-Z][A-Za-z0-9]*)\b/g)].map((match) => match[1]);
    if (componentNames.some((name) => name !== "Callout" && name !== "ArticleImage")) {
      throw new BlogStoreError("Only Callout and ArticleImage MDX components are allowed", 400, "unsafe_mdx");
    }
    const withoutNumericImageProps = line.replace(/\b(?:width|height)=\{\d+\}/g, "");
    if (/[{}]/.test(withoutNumericImageProps)) {
      throw new BlogStoreError("JavaScript expressions are not allowed in article content", 400, "unsafe_mdx");
    }
  }
}

export function validateBlogDocument(input: unknown): BlogDocument {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new BlogStoreError("Article body must be an object", 400, "invalid_article");
  }
  const value = input as Record<string, unknown>;
  const slug = requiredString(value.slug, "slug", 100).toLowerCase();
  if (!SLUG_PATTERN.test(slug)) {
    throw new BlogStoreError("Slug must use lowercase kebab-case", 400, "invalid_slug");
  }

  const tags = Array.isArray(value.tags)
    ? [...new Set(value.tags.map((tag) => requiredString(tag, "tag", 40)))].slice(0, 10)
    : [];
  const publishedAt = requiredDate(value.publishedAt, "publishedAt");
  const updatedAt = value.updatedAt ? requiredDate(value.updatedAt, "updatedAt") : undefined;
  const draft = value.draft !== false;
  const archived = value.archived === true;
  const coverImage = optionalString(value.coverImage, "coverImage", 500);
  const coverAlt = optionalString(value.coverAlt, "coverAlt", 300);
  const content = requiredString(value.content, "content", 1_000_000);
  assertSafeMdx(content);

  if (coverImage && !coverImage.startsWith("/")) {
    throw new BlogStoreError("coverImage must begin with /", 400, "invalid_article");
  }
  if (coverImage && !coverAlt) {
    throw new BlogStoreError("coverAlt is required when a cover image is set", 400, "invalid_article");
  }
  if (updatedAt && Date.parse(updatedAt) < Date.parse(publishedAt)) {
    throw new BlogStoreError("updatedAt cannot be earlier than publishedAt", 400, "invalid_article");
  }
  if (!draft && Date.parse(publishedAt) > Date.now()) {
    throw new BlogStoreError("Published articles cannot use a future publication date", 400, "invalid_article");
  }

  return {
    schemaVersion: 1,
    slug,
    title: requiredString(value.title, "title", 180),
    excerpt: requiredString(value.excerpt, "excerpt", 320),
    publishedAt,
    updatedAt,
    coverImage,
    coverAlt,
    tags,
    featured: value.featured === true,
    draft,
    archived,
    author: optionalString(value.author, "author", 120) ?? "Samuel Ukpai",
    content,
  };
}

export function extractHeadings(source: string): BlogHeading[] {
  const slugger = new GithubSlugger();
  const headings: BlogHeading[] = [];
  const tree = unified().use(remarkParse).parse(source);
  visit(tree, "heading", (node) => {
    if (node.depth !== 2 && node.depth !== 3) return;
    const title = toString(node).trim();
    if (title) headings.push({ depth: node.depth, title, id: slugger.slug(title) });
  });
  return headings;
}

export function hydrateBlogPost(document: BlogDocument): BlogPost {
  const stats = readingTime(document.content);
  return {
    ...document,
    readingTime: stats.text,
    wordCount: stats.words,
    headings: extractHeadings(document.content),
  };
}

function summarize(document: BlogDocument): BlogPostSummary {
  const post = hydrateBlogPost(document);
  const { content: _content, headings: _headings, ...summary } = post;
  void _content;
  void _headings;
  return summary;
}

async function parseObject(object: R2ObjectBody): Promise<BlogDocument> {
  try {
    return validateBlogDocument(JSON.parse(await object.text()));
  } catch (error) {
    if (error instanceof BlogStoreError) throw error;
    throw new BlogStoreError(`Stored article ${object.key} is invalid`, 500, "invalid_stored_article");
  }
}

async function listKeys(bucket: R2Bucket, prefix: string): Promise<string[]> {
  const keys: string[] = [];
  let cursor: string | undefined;
  do {
    const result = await bucket.list({ prefix, cursor, limit: 1000 });
    keys.push(...result.objects.map((object) => object.key));
    cursor = result.truncated ? result.cursor : undefined;
  } while (cursor);
  return keys;
}

export async function listStudioArticles(): Promise<StudioArticle[]> {
  const bucket = getBucket();
  const keys = await listKeys(bucket, POST_PREFIX);
  const loaded = await Promise.all(
    keys.map(async (key): Promise<StudioArticle | null> => {
      const object = await bucket.get(key);
      if (!object) return null;
      return { ...(await parseObject(object)), etag: object.etag };
    }),
  );
  const articles: StudioArticle[] = [];
  for (const article of loaded) {
    if (article && !article.archived) articles.push(article);
  }
  return articles.sort(
    (a, b) => Date.parse(b.updatedAt ?? b.publishedAt) - Date.parse(a.updatedAt ?? a.publishedAt),
  );
}

export async function listPublishedBlogPosts(): Promise<BlogPostSummary[]> {
  return (await listStudioArticles())
    .filter((article) => !article.draft && !article.archived)
    .map(({ etag: _etag, ...document }) => {
      void _etag;
      return summarize(document);
    });
}

export async function getStudioArticle(slug: string): Promise<StudioArticle | null> {
  if (!SLUG_PATTERN.test(slug)) return null;
  const object = await getBucket().get(`${POST_PREFIX}${slug}.json`);
  if (!object) return null;
  return { ...(await parseObject(object)), etag: object.etag };
}

export async function getPublishedBlogPost(slug: string): Promise<BlogPost | null> {
  const article = await getStudioArticle(slug);
  if (!article || article.draft || article.archived) return null;
  const { etag: _etag, ...document } = article;
  void _etag;
  return hydrateBlogPost(document);
}

export async function saveStudioArticle(
  input: unknown,
  expectedEtag?: string,
): Promise<StudioArticle> {
  const document = validateBlogDocument(input);
  const bucket = getBucket();
  const key = `${POST_PREFIX}${document.slug}.json`;
  const existing = await bucket.get(key);

  if (existing && !expectedEtag) {
    throw new BlogStoreError("The article already exists", 409, "article_exists");
  }
  if (!existing && expectedEtag) {
    throw new BlogStoreError("The article no longer exists", 409, "article_missing");
  }
  if (existing && existing.etag !== expectedEtag) {
    throw new BlogStoreError("This article changed in another session. Reload before saving.", 409, "edit_conflict");
  }

  if (existing) {
    const oldBody = await existing.text();
    const stamp = new Date().toISOString().replaceAll(":", "-");
    await bucket.put(`${REVISION_PREFIX}${document.slug}/${stamp}-${existing.etag}.json`, oldBody, {
      httpMetadata: { contentType: "application/json; charset=utf-8" },
    });
  }

  const body = JSON.stringify(document);
  const saved = await bucket.put(key, body, {
    onlyIf: existing ? { etagMatches: existing.etag } : { etagDoesNotMatch: "*" },
    httpMetadata: {
      contentType: "application/json; charset=utf-8",
      cacheControl: "no-store",
    },
  });
  if (!saved) {
    throw new BlogStoreError("This article changed while it was being saved", 409, "edit_conflict");
  }
  return { ...document, etag: saved.etag };
}

export async function archiveStudioArticle(slug: string, expectedEtag: string): Promise<void> {
  const bucket = getBucket();
  const key = `${POST_PREFIX}${slug}.json`;
  const existing = await bucket.get(key);
  if (!existing) throw new BlogStoreError("Article not found", 404, "not_found");
  if (existing.etag !== expectedEtag) {
    throw new BlogStoreError("This article changed in another session", 409, "edit_conflict");
  }
  const body = await existing.text();
  const document = validateBlogDocument(JSON.parse(body));
  const stamp = new Date().toISOString().replaceAll(":", "-");
  await bucket.put(`${ARCHIVE_PREFIX}${slug}/${stamp}.json`, body, {
    httpMetadata: { contentType: "application/json; charset=utf-8" },
  });
  const archived = await bucket.put(
    key,
    JSON.stringify({ ...document, draft: true, archived: true, updatedAt: new Date().toISOString() }),
    {
      onlyIf: { etagMatches: existing.etag },
      httpMetadata: { contentType: "application/json; charset=utf-8", cacheControl: "no-store" },
    },
  );
  if (!archived) {
    throw new BlogStoreError("This article changed while it was being archived", 409, "edit_conflict");
  }
}

export async function listArticleRevisions(slug: string): Promise<Array<{ key: string; uploaded: string; size: number }>> {
  if (!SLUG_PATTERN.test(slug)) throw new BlogStoreError("Invalid slug", 400, "invalid_slug");
  const bucket = getBucket();
  const result = await bucket.list({ prefix: `${REVISION_PREFIX}${slug}/`, limit: 100 });
  return result.objects
    .map((object) => ({ key: object.key, uploaded: object.uploaded.toISOString(), size: object.size }))
    .sort((a, b) => b.uploaded.localeCompare(a.uploaded));
}

export async function restoreArticleRevision(
  slug: string,
  revisionKey: string,
  expectedEtag: string,
): Promise<StudioArticle> {
  const prefix = `${REVISION_PREFIX}${slug}/`;
  if (!revisionKey.startsWith(prefix) || revisionKey.includes("..")) {
    throw new BlogStoreError("Invalid revision", 400, "invalid_revision");
  }
  const revision = await getBucket().get(revisionKey);
  if (!revision) throw new BlogStoreError("Revision not found", 404, "not_found");
  const document = await parseObject(revision);
  return saveStudioArticle({ ...document, updatedAt: new Date().toISOString() }, expectedEtag);
}

export async function putArticleMedia(
  slug: string,
  filename: string,
  body: ArrayBuffer,
  contentType: string,
): Promise<string> {
  if (!SLUG_PATTERN.test(slug)) throw new BlogStoreError("Invalid slug", 400, "invalid_slug");
  const safeName = filename
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
  if (!safeName || !/\.(?:png|jpe?g|webp|gif)$/.test(safeName)) {
    throw new BlogStoreError("Use a PNG, JPEG, WebP, or GIF image", 400, "invalid_media");
  }
  const allowedTypes = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);
  if (!allowedTypes.has(contentType)) {
    throw new BlogStoreError("Unsupported image type", 400, "invalid_media");
  }
  if (body.byteLength > 8 * 1024 * 1024) {
    throw new BlogStoreError("Images must be 8 MB or smaller", 413, "media_too_large");
  }
  const extension = safeName.slice(safeName.lastIndexOf("."));
  const stem = safeName.slice(0, -extension.length).slice(0, 90);
  const uniqueName = `${stem}-${crypto.randomUUID().slice(0, 8)}${extension}`;
  const key = `${MEDIA_PREFIX}${slug}/${uniqueName}`;
  await getBucket().put(key, body, {
    httpMetadata: { contentType, cacheControl: "public, max-age=31536000, immutable" },
  });
  return `/media/blog/${slug}/${uniqueName}`;
}

export async function getArticleMedia(slug: string, path: string[]): Promise<R2ObjectBody | null> {
  if (!SLUG_PATTERN.test(slug) || path.some((segment) => !segment || segment.includes(".."))) return null;
  return getBucket().get(`${MEDIA_PREFIX}${slug}/${path.join("/")}`);
}

export function selectRelatedBlogPosts(
  post: BlogPostSummary,
  candidates: BlogPostSummary[],
  limit = 3,
): BlogPostSummary[] {
  const tags = new Set(post.tags.map((tag) => tag.toLowerCase()));
  return candidates
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      score: candidate.tags.reduce((total, tag) => total + (tags.has(tag.toLowerCase()) ? 1 : 0), 0),
    }))
    .sort((a, b) => b.score - a.score || Date.parse(b.candidate.publishedAt) - Date.parse(a.candidate.publishedAt))
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export function getBlogTags(posts: BlogPostSummary[]): string[] {
  return [...new Set(posts.flatMap((post) => post.tags))].sort((a, b) => a.localeCompare(b));
}
