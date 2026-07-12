import assert from "node:assert/strict";
import test from "node:test";

import {
  extractHeadings,
  hydrateBlogPost,
  selectRelatedBlogPosts,
  validateBlogDocument,
} from "../lib/blog-store";

const validDocument = {
  schemaVersion: 1,
  slug: "secure-browser-writing",
  title: "Secure browser writing",
  excerpt: "A practical article written and published from the private browser studio.",
  publishedAt: "2020-01-01T12:00:00+01:00",
  updatedAt: "2020-01-02T12:00:00+01:00",
  tags: ["Writing", "Cloudflare"],
  featured: false,
  draft: false,
  author: "Samuel Ukpai",
  content: "Opening paragraph.\n\n## First heading\n\nBody copy.\n\n### Detail\n\nMore copy.",
};

test("studio article validation normalizes safe article data", () => {
  const article = validateBlogDocument(validDocument);
  assert.equal(article.slug, "secure-browser-writing");
  assert.deepEqual(article.tags, ["Writing", "Cloudflare"]);
  assert.equal(article.schemaVersion, 1);
});

test("studio validation rejects unsafe slugs and missing cover alt text", () => {
  assert.throws(
    () => validateBlogDocument({ ...validDocument, slug: "../secret" }),
    /lowercase kebab-case/,
  );
  assert.throws(
    () => validateBlogDocument({ ...validDocument, coverImage: "/media/blog/post/cover.webp" }),
    /coverAlt is required/,
  );
});

test("studio validation rejects executable MDX while allowing fenced code", () => {
  assert.throws(
    () => validateBlogDocument({ ...validDocument, content: "import secret from 'somewhere'" }),
    /imports and exports/,
  );
  assert.throws(
    () => validateBlogDocument({ ...validDocument, content: "{process.env.SECRET}" }),
    /JavaScript expressions/,
  );
  assert.doesNotThrow(() => validateBlogDocument({
    ...validDocument,
    content: "```ts\nconst object = { safe: true };\n```",
  }));
});

test("runtime hydration calculates headings and reading metadata", () => {
  const post = hydrateBlogPost(validateBlogDocument(validDocument));
  assert.deepEqual(post.headings.map((heading) => heading.id), ["first-heading", "detail"]);
  assert.ok(post.wordCount > 0);
  assert.match(post.readingTime, /min read$/);
  assert.deepEqual(extractHeadings(validDocument.content).map((heading) => heading.depth), [2, 3]);
});

test("related article selection prefers shared tags", () => {
  const current = hydrateBlogPost(validateBlogDocument(validDocument));
  const related = hydrateBlogPost(validateBlogDocument({
    ...validDocument,
    slug: "cloudflare-writing",
    title: "Cloudflare writing",
    tags: ["Cloudflare"],
  }));
  const unrelated = hydrateBlogPost(validateBlogDocument({
    ...validDocument,
    slug: "flutter-layouts",
    title: "Flutter layouts",
    tags: ["Flutter"],
  }));
  assert.equal(selectRelatedBlogPosts(current, [unrelated, related])[0].slug, related.slug);
});
