# Blog authoring guide

The primary authoring interface is the private browser studio at:

```text
https://write.samuelsurf.me
```

Only the Cloudflare Access identity for `ukpsamuel67@gmail.com` is allowed through. The application verifies the Access JWT again at the origin before it permits any read or write operation.

## Writing an article

1. Open `write.samuelsurf.me` and complete the Cloudflare Access sign-in.
2. Select **New Article** and enter a working title.
3. Type directly in the visual writing canvas. The text appears as readers will see it, with no Markdown source view.
4. Select text to reveal the floating formatting menu for bold, italic, inline code and links.
5. Hover beside a paragraph or place the cursor in it, then use the **+** button to add headings, lists, quotes, code blocks, callouts, dividers or images.
6. Open **Article Settings** to manage the excerpt, tags, publication status, cover image and cover alt text.
7. Use **Write** for normal editing and **Preview** for a final read-through.
8. Keep the article as a draft until it is ready. Publishing requires an explicit confirmation.

Drafts are stored privately in the `samuelsurf-content` R2 bucket and are not exposed by the public blog routes. Published articles become visible immediately without a Git commit or a new website deployment.

## Safety and recovery

- The studio keeps a browser backup while changes are pending.
- Every successful edit stores the previous article version automatically.
- Open **Article Settings > Version history** to restore an earlier version.
- Save conflicts are rejected rather than silently overwriting a newer version.
- Archiving removes the article from the studio and public blog while preserving a recovery copy in R2.
- Uploaded images are not served publicly while their article remains a draft. They remain available to the authenticated studio preview.

## Supported article features

The visual editor supports paragraphs, headings, bold and italic text, links, inline code, ordered and unordered lists, blockquotes, fenced code blocks, dividers, callouts, and article images. Images expose normal fields for alt text, captions and layout width. Callouts expose their type and title directly in the canvas.

The studio stores a safe Markdown-compatible representation internally so existing public articles and publishing APIs remain compatible. That source format is an implementation detail and is not shown during normal writing.

## Keyboard shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl/Cmd + S` | Save immediately |
| `Ctrl/Cmd + P` | Toggle write and preview |
| `Ctrl/Cmd + B` | Bold |
| `Ctrl/Cmd + I` | Italic |
| `Ctrl/Cmd + K` | Add or edit a link |
| `Ctrl/Cmd + Alt + 2` | Heading 2 |
| `Ctrl/Cmd + Alt + 3` | Heading 3 |
| `Ctrl/Cmd + Shift + 8` | Bulleted list |
| `Ctrl/Cmd + Shift + 7` | Numbered list |
| `Ctrl/Cmd + Shift + B` | Blockquote |
| `Ctrl/Cmd + Alt + 0` | Code block |

## Legacy MDX files

The original files under `content/blog/*.mdx` remain in the repository as migration sources and developer fixtures. The production blog now reads article documents from R2 so browser publishing can be immediate. Use `scripts/export-blog-r2.mjs` when a legacy MDX article needs to be imported into R2.
