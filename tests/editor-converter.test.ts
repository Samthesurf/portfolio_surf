import assert from "node:assert/strict";
import test from "node:test";
import { markdownToHtml, htmlToMarkdown } from "../lib/editor-converter";

test("conversion round trip for basic inline formats", () => {
  const md = "This is a paragraph with **bold** text, *italic* text, and `inline code`.\n";
  const html = markdownToHtml(md);
  const back = htmlToMarkdown(html);
  assert.equal(back, md);
});

test("conversion round trip for headings", () => {
  const md = "## Heading 2\n\n### Heading 3\n";
  const html = markdownToHtml(md);
  const back = htmlToMarkdown(html);
  assert.equal(back, md);
});

test("conversion round trip for links", () => {
  const md = "This is [a link](https://samuelsurf.me) in the middle of a sentence.\n";
  const html = markdownToHtml(md);
  const back = htmlToMarkdown(html);
  assert.equal(back, md);
});

test("conversion round trip for blockquotes", () => {
  const md = "> This is a blockquote\n> spanning multiple lines.\n";
  const html = markdownToHtml(md);
  const back = htmlToMarkdown(html);
  assert.equal(back, md);
});

test("conversion round trip for code blocks", () => {
  const md = "```ts\nconst x = 42;\nconsole.log(x);\n```\n";
  const html = markdownToHtml(md);
  const back = htmlToMarkdown(html);
  assert.equal(back, md);
});

test("conversion round trip for lists", () => {
  const mdUnordered = "- Item 1\n- Item 2\n- Item 3\n";
  const htmlUnordered = markdownToHtml(mdUnordered);
  const backUnordered = htmlToMarkdown(htmlUnordered);
  assert.equal(backUnordered, mdUnordered);

  const mdOrdered = "1. First item\n2. Second item\n3. Third item\n";
  const htmlOrdered = markdownToHtml(mdOrdered);
  const backOrdered = htmlToMarkdown(htmlOrdered);
  assert.equal(backOrdered, mdOrdered);
});

test("conversion round trip for Callouts", () => {
  const md = "<Callout type=\"tip\" title=\"Pro Tip\">\n  Make sure to test your code before deploying.\n</Callout>\n";
  const html = markdownToHtml(md);
  const back = htmlToMarkdown(html);
  assert.equal(back, md);
});

test("conversion round trip for ArticleImage", () => {
  const md = "<ArticleImage\n  src=\"/media/sample.png\"\n  alt=\"A beautiful sample\"\n  caption=\"Sample Caption\"\n  width={1600}\n  height={900}\n  wide\n/>\n";
  const html = markdownToHtml(md);
  const back = htmlToMarkdown(html);
  assert.equal(back, md);
});

test("conversion preserves code block languages", () => {
  const md = "```python\nprint('hello')\n```\n";
  assert.equal(htmlToMarkdown(markdownToHtml(md)), md);
});

test("conversion sanitizes unsafe links and quoted component attributes", () => {
  const unsafeLink = markdownToHtml("[click](javascript:alert(1))\n");
  assert.match(unsafeLink, /href=\"#\"/);

  const html = '<div class="blog-callout" data-callout-type="tip" data-callout-title="A &quot;quoted&quot; title"><p>Safe body</p></div>';
  const markdown = htmlToMarkdown(html);
  assert.equal(markdown, '<Callout type="tip" title="A \'quoted\' title">\n  Safe body\n</Callout>\n');
});
