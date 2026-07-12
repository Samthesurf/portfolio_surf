import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  extractBlogHeadings,
  getAllBlogPosts,
  getBlogPost,
  getRelatedBlogPosts,
} from "../lib/blog";

test("published posts exclude drafts and contain calculated metadata", () => {
  const posts = getAllBlogPosts();
  assert.ok(posts.length >= 1);
  assert.ok(posts.every((post) => post.draft === false));
  assert.ok(posts.every((post) => post.wordCount > 0));
  assert.ok(posts.every((post) => /min read$/.test(post.readingTime)));
  assert.equal(
    posts.some((post) => post.slug === "draft-article-template"),
    false,
  );
});

test("drafts can be included for validation and authoring tools", () => {
  const posts = getAllBlogPosts({ includeDrafts: true });
  const draft = posts.find((post) => post.slug === "draft-article-template");
  assert.ok(draft);
  assert.equal(draft.draft, true);
});

test("a published article loads with content and matching table of contents", () => {
  const post = getBlogPost("building-obe-portal-accreditation");
  assert.ok(post);
  assert.match(post.content, /COREN accreditation review/);
  assert.ok(
    post.headings.some((heading) => heading.title === "What I took away from the project"),
  );
  assert.equal(post.coverImage, "/blog/abuad-engineering-obe-portal/obe-portal.webp");
});

test("invalid and draft slugs cannot be read as public posts", () => {
  assert.equal(getBlogPost("../package"), null);
  assert.equal(getBlogPost("draft-article-template"), null);
  assert.equal(getBlogPost("missing-article"), null);
});

test("duplicate headings receive stable unique IDs", () => {
  const headings = extractBlogHeadings(
    "## Decision\n\n```md\n## Not a heading\n```\n\n### Detail\n\n## Decision ##",
  );
  assert.deepEqual(
    headings.map((heading) => heading.id),
    ["decision", "detail", "decision-1"],
  );
});

test("published cover and embedded article images exist in public", () => {
  for (const summary of getAllBlogPosts()) {
    if (summary.coverImage) {
      assert.ok(
        fs.existsSync(path.join(process.cwd(), "public", summary.coverImage.slice(1))),
        `missing cover image for ${summary.slug}`,
      );
    }

    const post = getBlogPost(summary.slug);
    assert.ok(post);
    for (const match of post.content.matchAll(/<ArticleImage[\s\S]*?src="([^"]+)"[\s\S]*?\/>/g)) {
      assert.ok(
        fs.existsSync(path.join(process.cwd(), "public", match[1].replace(/^\//, ""))),
        `missing embedded image ${match[1]} in ${summary.slug}`,
      );
    }
  }
});

test("related post selection excludes the current article", () => {
  const post = getAllBlogPosts()[0];
  const related = getRelatedBlogPosts(post);
  assert.ok(related.every((candidate) => candidate.slug !== post.slug));
});
