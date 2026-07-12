import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const filename = process.argv[2];
if (!filename) throw new Error("Usage: node scripts/export-blog-r2.mjs content/blog/article.mdx");
const fullPath = path.resolve(filename);
const raw = fs.readFileSync(fullPath, "utf8");
const { data, content } = matter(raw);
const slug = path.basename(filename, ".mdx");
const document = {
  schemaVersion: 1,
  slug,
  title: data.title,
  excerpt: data.excerpt,
  publishedAt: data.publishedAt,
  ...(data.updatedAt ? { updatedAt: data.updatedAt } : {}),
  ...(data.coverImage ? { coverImage: data.coverImage } : {}),
  ...(data.coverAlt ? { coverAlt: data.coverAlt } : {}),
  tags: Array.isArray(data.tags) ? data.tags : [],
  featured: data.featured === true,
  draft: data.draft === true,
  author: data.author || "Samuel Ukpai",
  content: content.trim(),
};
process.stdout.write(JSON.stringify(document));
