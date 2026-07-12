import fs from "node:fs";
import path from "node:path";

import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import { toString } from "mdast-util-to-string";
import readingTime from "reading-time";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";

import { SITE } from "./site-config";
import type {
  BlogFrontmatter,
  BlogHeading,
  BlogPost,
  BlogPostSummary,
} from "./blog-types";

const BLOG_DIRECTORY = path.join(process.cwd(), "content", "blog");
const BLOG_FILE_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*\.mdx$/;
const ISO_DATE_WITH_TIMEZONE =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})$/;

function requireString(
  value: unknown,
  field: string,
  filename: string,
): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${filename}: frontmatter field "${field}" must be a non-empty string`);
  }
  return value.trim();
}

function requireDate(value: unknown, field: string, filename: string): string {
  const date = requireString(value, field, filename);
  if (!ISO_DATE_WITH_TIMEZONE.test(date) || Number.isNaN(Date.parse(date))) {
    throw new Error(
      `${filename}: frontmatter field "${field}" must be an ISO date with a timezone`,
    );
  }
  return date;
}

function normalizeFrontmatter(
  data: Record<string, unknown>,
  filename: string,
): BlogFrontmatter {
  const tags = Array.isArray(data.tags)
    ? data.tags.map((tag) => requireString(tag, "tags", filename))
    : [];
  const coverImage =
    typeof data.coverImage === "string" && data.coverImage.trim()
      ? data.coverImage.trim()
      : undefined;
  const coverAlt =
    typeof data.coverAlt === "string" && data.coverAlt.trim()
      ? data.coverAlt.trim()
      : undefined;
  const draft = data.draft === true;
  const publishedAt = requireDate(data.publishedAt, "publishedAt", filename);
  const updatedAt = data.updatedAt
    ? requireDate(data.updatedAt, "updatedAt", filename)
    : undefined;

  if (coverImage && !coverImage.startsWith("/")) {
    throw new Error(`${filename}: "coverImage" must be an absolute site path beginning with /`);
  }
  if (coverImage && !coverAlt) {
    throw new Error(`${filename}: "coverAlt" is required when "coverImage" is set`);
  }
  if (
    coverImage &&
    !draft &&
    !fs.existsSync(path.join(process.cwd(), "public", coverImage.slice(1)))
  ) {
    throw new Error(`${filename}: cover image not found at public${coverImage}`);
  }
  if (updatedAt && Date.parse(updatedAt) < Date.parse(publishedAt)) {
    throw new Error(`${filename}: "updatedAt" cannot be earlier than "publishedAt"`);
  }
  if (!draft && Date.parse(publishedAt) > Date.now()) {
    throw new Error(`${filename}: published articles cannot use a future "publishedAt" date`);
  }

  return {
    title: requireString(data.title, "title", filename),
    excerpt: requireString(data.excerpt, "excerpt", filename),
    publishedAt,
    updatedAt,
    coverImage,
    coverAlt,
    tags: [...new Set(tags)],
    featured: data.featured === true,
    draft,
    author:
      typeof data.author === "string" && data.author.trim()
        ? data.author.trim()
        : SITE.legalName,
  };
}

export function extractBlogHeadings(source: string): BlogHeading[] {
  const slugger = new GithubSlugger();
  const headings: BlogHeading[] = [];
  const tree = unified().use(remarkParse).parse(source);

  visit(tree, "heading", (node) => {
    if (node.depth !== 2 && node.depth !== 3) return;
    const title = toString(node).trim();
    if (!title) return;
    headings.push({
      depth: node.depth,
      title,
      id: slugger.slug(title),
    });
  });

  return headings;
}

function readPostFile(filename: string): BlogPost {
  if (!BLOG_FILE_PATTERN.test(filename)) {
    throw new Error(
      `${filename}: blog filenames must use lowercase kebab-case and end in .mdx`,
    );
  }

  const fullPath = path.join(BLOG_DIRECTORY, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const metadata = normalizeFrontmatter(data, filename);
  const stats = readingTime(content);

  return {
    ...metadata,
    slug: filename.replace(/\.mdx$/, ""),
    readingTime: stats.text,
    wordCount: stats.words,
    content,
    headings: extractBlogHeadings(content),
  };
}

function summarizePost(post: BlogPost): BlogPostSummary {
  return {
    title: post.title,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    coverImage: post.coverImage,
    coverAlt: post.coverAlt,
    tags: post.tags,
    featured: post.featured,
    draft: post.draft,
    author: post.author,
    slug: post.slug,
    readingTime: post.readingTime,
    wordCount: post.wordCount,
  };
}

export function getAllBlogPosts(options?: {
  includeDrafts?: boolean;
}): BlogPostSummary[] {
  if (!fs.existsSync(BLOG_DIRECTORY)) return [];

  return fs
    .readdirSync(BLOG_DIRECTORY)
    .filter((filename) => filename.endsWith(".mdx"))
    .map(readPostFile)
    .filter((post) => options?.includeDrafts === true || !post.draft)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .map(summarizePost);
}

export function getBlogPost(slug: string): BlogPost | null {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  const filename = `${slug}.mdx`;
  const fullPath = path.join(BLOG_DIRECTORY, filename);
  if (!fs.existsSync(fullPath)) return null;

  const post = readPostFile(filename);
  return post.draft ? null : post;
}

export function getRelatedBlogPosts(
  post: BlogPostSummary,
  limit = 3,
): BlogPostSummary[] {
  const currentTags = new Set(post.tags.map((tag) => tag.toLowerCase()));

  return getAllBlogPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      score: candidate.tags.reduce(
        (total, tag) => total + (currentTags.has(tag.toLowerCase()) ? 1 : 0),
        0,
      ),
    }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.candidate.publishedAt).getTime() -
          new Date(a.candidate.publishedAt).getTime(),
    )
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export function getBlogTags(posts = getAllBlogPosts()): string[] {
  return [...new Set(posts.flatMap((post) => post.tags))].sort((a, b) =>
    a.localeCompare(b),
  );
}

export function formatBlogDate(value: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Lagos",
  }).format(new Date(value));
}
