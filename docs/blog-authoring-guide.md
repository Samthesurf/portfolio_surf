# Blog authoring guide

The primary authoring interface is the private browser studio at:

```text
https://write.samuelsurf.me
```

Only the Cloudflare Access identity for `ukpsamuel67@gmail.com` is allowed through. The application verifies the Access JWT again at the origin before it permits any read or write operation.

## Writing an article

1. Open `write.samuelsurf.me` and complete the Cloudflare Access sign-in.
2. Select **New Article** and enter a working title.
3. Write in the main editor. Changes are saved automatically after a short pause.
4. Open **Article Settings** to manage the excerpt, tags, publication status, cover image and cover alt text.
5. Use **Write**, **Preview** or **Split** depending on the task.
6. Use **Image** in the toolbar to upload and insert an article image at the cursor.
7. Keep the article as a draft until it is ready. Publishing requires an explicit confirmation.

Drafts are stored privately in the `samuelsurf-content` R2 bucket and are not exposed by the public blog routes. Published articles become visible immediately without a Git commit or a new website deployment.

## Safety and recovery

- The studio keeps a browser backup while changes are pending.
- Every successful edit stores the previous article version automatically.
- Open **Article Settings > Version history** to restore an earlier version.
- Save conflicts are rejected rather than silently overwriting a newer version.
- Archiving removes the article from the studio and public blog while preserving a recovery copy in R2.
- Uploaded images are not served publicly while their article remains a draft. They remain available to the authenticated studio preview.

## Supported article features

The editor supports normal Markdown and the portfolio's MDX components, including:

```mdx
<Callout type="tip" title="A useful note">
  Supporting explanation.
</Callout>

<ArticleImage
  src="/media/blog/article-slug/image.webp"
  alt="A precise image description"
  caption="Optional caption"
  width={1600}
  height={900}
  wide
/>
```

## Keyboard shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl/Cmd + S` | Save immediately |
| `Ctrl/Cmd + P` | Toggle write and preview |
| `Ctrl/Cmd + B` | Bold |
| `Ctrl/Cmd + I` | Italic |
| `Ctrl/Cmd + K` | Link |
| `Alt + 2` | Heading 2 |
| `Alt + 3` | Heading 3 |
| `Alt + C` | Callout |
| `Alt + I` | Upload an image |

## Legacy MDX files

The original files under `content/blog/*.mdx` remain in the repository as migration sources and developer fixtures. The production blog now reads article documents from R2 so browser publishing can be immediate. Use `scripts/export-blog-r2.mjs` when a legacy MDX article needs to be imported into R2.
