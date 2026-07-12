import assert from "node:assert/strict";
import test from "node:test";

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { renderBlogContent } from "../lib/blog-render";
import { getBlogPost } from "../lib/blog";

test("blog content renders without MDX runtime evaluation", () => {
  const post = getBlogPost("building-obe-portal-accreditation");
  assert.ok(post);

  const html = renderToStaticMarkup(
    React.createElement("div", { className: "blog-prose" }, renderBlogContent(post.content, post.headings)),
  );

  assert.match(html, /<h2 id="what-i-was-working-with">/);
  assert.match(html, /<a href="#what-i-was-working-with">/);
  assert.match(html, /<aside class="blog-callout blog-callout-note">/);
  assert.match(html, /<figure class="blog-figure blog-figure-wide">/);
  assert.match(html, /<div data-rehype-pretty-code-figure="">/);
  assert.match(html, /<a href="https:\/\/abuadengineering\.pages\.dev" target="_blank" rel="noopener noreferrer">/);
  assert.match(html, /<a href="\/#contact">/);
});
