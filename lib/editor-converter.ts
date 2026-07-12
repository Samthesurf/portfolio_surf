
type AttributeValue = string | number | boolean;

const UNORDERED_LIST_RE = /^[-*]\s+/;
const ORDERED_LIST_RE = /^\d+\.\s+/;
const HEADING_RE = /^(#{2,6})\s+(.*)$/;

function parseAttributes(raw: string): Record<string, AttributeValue> {
  const attributes: Record<string, AttributeValue> = {};
  const pattern = /([A-Za-z][\w-]*)\s*(?:=\s*(?:"([^"]*)"|{([^}]+)}|'([^']*)'|([^\s"'>]+)))?/g;

  let match: RegExpExecArray | null;
  while ((match = pattern.exec(raw)) !== null) {
    const key = match[1];
    const value = match[2] ?? match[3] ?? match[4] ?? match[5];

    if (value === undefined) {
      attributes[key] = true;
      continue;
    }

    const trimmed = value.trim();
    if (/^-?\d+(?:\.\d+)?$/.test(trimmed)) {
      attributes[key] = Number(trimmed);
    } else if (trimmed === "true") {
      attributes[key] = true;
    } else if (trimmed === "false") {
      attributes[key] = false;
    } else {
      attributes[key] = trimmed;
    }
  }

  return attributes;
}

function escapeHtmlAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;|&#x0*27;/gi, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function sanitizeMdxAttribute(value: string): string {
  return decodeHtmlEntities(value).replace(/[\r\n]+/g, " ").replace(/"/g, "'").trim();
}

function sanitizeLinkHref(value: string): string {
  const href = decodeHtmlEntities(value).replace(/[\r\n\t]+/g, "").trim();
  if (!/^(https?:\/\/|mailto:|tel:|\/|#)/i.test(href)) return "#";
  return href.replace(/\)/g, "%29");
}

function isBlockStart(line: string): boolean {
  return (
    line.startsWith("```") ||
    line.startsWith("<Callout") ||
    line.startsWith("<ArticleImage") ||
    HEADING_RE.test(line) ||
    line.startsWith("> ") ||
    UNORDERED_LIST_RE.test(line) ||
    ORDERED_LIST_RE.test(line) ||
    /^-{3,}$/.test(line) ||
    /^\*{3,}$/.test(line)
  );
}

function parseInlineToHtml(text: string): string {
  // First escape HTML special characters to avoid injection/broken markup, except for standard markdown constructs
  let escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Inline code: `code`
  escaped = escaped.replace(/`([^`]+)`/g, (_, code) => `<code>${code}</code>`);

  // Bold: **text**
  escaped = escaped.replace(/\*\*([^*]+)\*\*/g, (_, bold) => `<strong>${bold}</strong>`);

  // Italic: *text*
  escaped = escaped.replace(/\*([^*]+)\*/g, (_, italic) => `<em>${italic}</em>`);

  // Links: [text](url)
  escaped = escaped.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, linkText, href) => `<a href="${escapeHtmlAttribute(sanitizeLinkHref(href))}">${linkText}</a>`);

  return escaped;
}

export function markdownToHtml(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  const elements: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      i += 1;
      continue;
    }

    // Code blocks
    if (line.startsWith("```")) {
      const requestedLanguage = line.slice(3).trim();
      const lang = /^[a-z0-9_-]{1,30}$/i.test(requestedLanguage) ? requestedLanguage : "code";
      i += 1;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i += 1;
      }
      if (i < lines.length) {
        i += 1;
      }
      const codeContent = codeLines.join("\n");
      elements.push(`<pre><code class="language-${lang}">${escapeHtmlForCode(codeContent)}</code></pre>`);
      continue;
    }

    // Callout component
    if (line.startsWith("<Callout")) {
      const openTag = line.replace(/^<Callout\b/, "").replace(/>\s*$/, "").trim();
      const attrs = parseAttributes(openTag);
      const type = attrs.type === "tip" || attrs.type === "warning" ? attrs.type : "note";
      const safeTitle = escapeHtmlAttribute(typeof attrs.title === "string" ? attrs.title : "");

      const calloutLines: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith("</Callout>")) {
        calloutLines.push(lines[i]);
        i += 1;
      }
      if (i < lines.length) {
        i += 1;
      }

      const innerHtml = markdownToHtml(calloutLines.join("\n"));
      elements.push(`<div class="blog-callout blog-callout-${type}" data-callout-type="${type}" data-callout-title="${safeTitle}">${innerHtml}</div>`);
      continue;
    }

    // ArticleImage component
    if (line.startsWith("<ArticleImage")) {
      let component = rawLine;
      while (!component.trim().endsWith("/>") && i + 1 < lines.length) {
        i += 1;
        component += `\n${lines[i]}`;
      }
      i += 1;

      const attrs = parseAttributes(
        component.replace(/^<ArticleImage\b/, "").replace(/\/\>\s*$/, "").trim()
      );
      const src = escapeHtmlAttribute(typeof attrs.src === "string" ? attrs.src : "");
      const alt = escapeHtmlAttribute(typeof attrs.alt === "string" ? attrs.alt : "");
      const caption = escapeHtmlAttribute(typeof attrs.caption === "string" ? attrs.caption : "");
      const width = typeof attrs.width === "number" ? attrs.width : 1600;
      const height = typeof attrs.height === "number" ? attrs.height : 900;
      const wide = attrs.wide === true || component.includes("wide");

      elements.push(`<div class="blog-figure" data-src="${src}" data-alt="${alt}" data-caption="${caption}" data-width="${width}" data-height="${height}" data-wide="${wide}"></div>`);
      continue;
    }

    // Headings
    const headingMatch = line.match(HEADING_RE);
    if (headingMatch) {
      const hashes = headingMatch[1];
      const headingText = headingMatch[2].trim();
      const level = hashes.length;
      elements.push(`<h${level}>${parseInlineToHtml(headingText)}</h${level}>`);
      i += 1;
      continue;
    }

    // Blockquotes
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        quoteLines.push(lines[i].trim().replace(/^>\s*/, ""));
        i += 1;
      }
      const paragraphs = quoteLines.map(l => `<p>${parseInlineToHtml(l)}</p>`).join("");
      elements.push(`<blockquote>${paragraphs}</blockquote>`);
      continue;
    }

    // Unordered and Ordered Lists
    if (UNORDERED_LIST_RE.test(line) || ORDERED_LIST_RE.test(line)) {
      const ordered = ORDERED_LIST_RE.test(line);
      const listPattern = ordered ? ORDERED_LIST_RE : UNORDERED_LIST_RE;
      const items: string[] = [];

      while (i < lines.length && listPattern.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(listPattern, ""));
        i += 1;
      }

      const listTag = ordered ? "ol" : "ul";
      const listItems = items.map(item => `<li>${parseInlineToHtml(item)}</li>`).join("");
      elements.push(`<${listTag}>${listItems}</${listTag}>`);
      continue;
    }

    // Horizontal Rules
    if (/^(-{3,}|\*{3,})$/.test(line)) {
      elements.push("<hr />");
      i += 1;
      continue;
    }

    // Paragraphs (collect consecutive text lines)
    let paragraphText = line;
    i += 1;
    while (i < lines.length) {
      const nextLine = lines[i].trim();
      if (!nextLine || isBlockStart(nextLine)) {
        break;
      }
      paragraphText += ` ${nextLine}`;
      i += 1;
    }

    elements.push(`<p>${parseInlineToHtml(paragraphText)}</p>`);
  }

  return elements.join("");
}

function escapeHtmlForCode(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function unescapeHtml(text: string): string {
  return decodeHtmlEntities(text);
}

interface HTMLToken {
  type: "tagOpen" | "tagClose" | "text" | "selfClosing";
  name: string;
  attributes: Record<string, string>;
  text?: string;
}

function tokenizeHtml(html: string): HTMLToken[] {
  const tokens: HTMLToken[] = [];
  let i = 0;
  while (i < html.length) {
    if (html[i] === "<") {
      if (html[i + 1] === "/") {
        const end = html.indexOf(">", i);
        if (end === -1) break;
        const tagName = html.slice(i + 2, end).trim();
        tokens.push({ type: "tagClose", name: tagName.toLowerCase(), attributes: {} });
        i = end + 1;
      } else {
        const end = html.indexOf(">", i);
        if (end === -1) break;
        const tagContent = html.slice(i + 1, end).trim();
        const isSelfClosing = tagContent.endsWith("/");
        const cleanContent = isSelfClosing ? tagContent.slice(0, -1).trim() : tagContent;

        const firstSpace = cleanContent.search(/\s/);
        const name = (firstSpace === -1 ? cleanContent : cleanContent.slice(0, firstSpace)).toLowerCase();
        const attributes: Record<string, string> = {};

        if (firstSpace !== -1) {
          const attrStr = cleanContent.slice(firstSpace).trim();
          const attrRegex = /([a-zA-Z0-9\-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s=]+))/g;
          let match;
          while ((match = attrRegex.exec(attrStr)) !== null) {
            attributes[match[1]] = decodeHtmlEntities(match[2] ?? match[3] ?? match[4] ?? "");
          }
        }

        tokens.push({
          type: isSelfClosing ? "selfClosing" : "tagOpen",
          name,
          attributes,
        });
        i = end + 1;
      }
    } else {
      const nextOpen = html.indexOf("<", i);
      const text = nextOpen === -1 ? html.slice(i) : html.slice(i, nextOpen);
      if (text) {
        tokens.push({ type: "text", name: "", attributes: {}, text });
      }
      i = nextOpen === -1 ? html.length : nextOpen;
    }
  }
  return tokens;
}

interface HTMLNode {
  type: "tag" | "text";
  name: string;
  attributes: Record<string, string>;
  children: HTMLNode[];
  text?: string;
}

function parseTokensToTree(tokens: HTMLToken[]): HTMLNode[] {
  const root: HTMLNode = { type: "tag", name: "root", attributes: {}, children: [] };
  const stack: HTMLNode[] = [root];

  for (const token of tokens) {
    if (token.type === "tagOpen") {
      const node: HTMLNode = {
        type: "tag",
        name: token.name,
        attributes: token.attributes,
        children: [],
      };
      stack[stack.length - 1].children.push(node);
      stack.push(node);
    } else if (token.type === "tagClose") {
      if (stack.length > 1) {
        stack.pop();
      }
    } else if (token.type === "selfClosing") {
      const node: HTMLNode = {
        type: "tag",
        name: token.name,
        attributes: token.attributes,
        children: [],
      };
      stack[stack.length - 1].children.push(node);
    } else if (token.type === "text") {
      const node: HTMLNode = {
        type: "text",
        name: "",
        attributes: {},
        children: [],
        text: token.text,
      };
      stack[stack.length - 1].children.push(node);
    }
  }
  return root.children;
}

function extractTextContent(node: HTMLNode): string {
  if (node.type === "text") return node.text ?? "";
  return node.children.map(extractTextContent).join("");
}

function nodeToMarkdown(
  node: HTMLNode,
  context: { listDepth: number; isOrdered: boolean; listIndex: number } = { listDepth: 0, isOrdered: false, listIndex: 1 }
): string {
  if (node.type === "text") {
    return unescapeHtml(node.text ?? "");
  }

  const renderChildrenStr = () => node.children.map(child => nodeToMarkdown(child, context)).join("");

  switch (node.name) {
    case "p": {
      const content = renderChildrenStr().trim();
      if (!content) return "";
      return `\n\n${content}\n\n`;
    }
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6": {
      const depth = parseInt(node.name[1], 10);
      const hashes = "#".repeat(depth);
      const content = renderChildrenStr().trim();
      return `\n\n${hashes} ${content}\n\n`;
    }
    case "strong":
      return `**${renderChildrenStr()}**`;
    case "em":
      return `*${renderChildrenStr()}*`;
    case "code": {
      return `\`${renderChildrenStr()}\``;
    }
    case "pre": {
      const codeNode = node.children.find(c => c.name === "code");
      const codeClass = codeNode?.attributes.class || node.attributes.class || "";
      const langMatch = codeClass.match(/language-(\S+)/);
      const requestedLanguage = langMatch ? langMatch[1] : "code";
      const lang = /^[a-z0-9_-]{1,30}$/i.test(requestedLanguage) ? requestedLanguage : "code";
      const codeText = codeNode ? extractTextContent(codeNode) : extractTextContent(node);
      return `\n\n\`\`\`${lang}\n${unescapeHtml(codeText).trim()}\n\`\`\`\n\n`;
    }
    case "blockquote": {
      const inner = renderChildrenStr().trim();
      const lines = inner.split("\n").map(l => l.trim()).filter(l => l.length > 0);
      const prefixed = lines.map(line => `> ${line}`).join("\n");
      return `\n\n${prefixed}\n\n`;
    }
    case "ul": {
      const inner = node.children
        .map(child => nodeToMarkdown(child, { listDepth: context.listDepth + 1, isOrdered: false, listIndex: 1 }))
        .join("\n");
      return `\n\n${inner}\n\n`;
    }
    case "ol": {
      const inner = node.children
        .map((child, index) => nodeToMarkdown(child, { listDepth: context.listDepth + 1, isOrdered: true, listIndex: index + 1 }))
        .join("\n");
      return `\n\n${inner}\n\n`;
    }
    case "li": {
      const prefix = context.isOrdered ? `${context.listIndex}. ` : "- ";
      const indent = "  ".repeat(Math.max(0, context.listDepth - 1));
      
      let innerText = "";
      if (node.children.length === 1 && node.children[0].name === "p") {
        innerText = node.children[0].children.map(child => nodeToMarkdown(child, context)).join("").trim();
      } else {
        innerText = node.children.map(child => {
          if (child.name === "p") {
            return child.children.map(c => nodeToMarkdown(c, context)).join("");
          }
          return nodeToMarkdown(child, context);
        }).join("").trim();
      }
      return `${indent}${prefix}${innerText}`;
    }
    case "hr":
      return "\n\n---\n\n";
    case "a": {
      const href = sanitizeLinkHref(node.attributes.href || "");
      return `[${renderChildrenStr()}](${href})`;
    }
    case "br":
      return "\n";
    case "div": {
      const isCallout = node.attributes.class?.includes("blog-callout") || node.attributes["data-callout-type"] !== undefined;
      const isArticleImage = node.attributes.class?.includes("blog-figure") || node.attributes["data-src"] !== undefined;
      
      if (isCallout) {
        const type = node.attributes["data-callout-type"] === "tip" || node.attributes["data-callout-type"] === "warning"
          ? node.attributes["data-callout-type"]
          : "note";
        const title = sanitizeMdxAttribute(node.attributes["data-callout-title"] || "");
        const titleAttr = title ? ` title="${title}"` : "";
        const innerContent = node.children.map(child => nodeToMarkdown(child, context)).join("").trim();
        return `\n\n<Callout type="${type}"${titleAttr}>\n  ${innerContent}\n</Callout>\n\n`;
      }
      if (isArticleImage) {
        const src = sanitizeMdxAttribute(node.attributes["data-src"] || "");
        const alt = sanitizeMdxAttribute(node.attributes["data-alt"] || "");
        const caption = sanitizeMdxAttribute(node.attributes["data-caption"] || "");
        const widthValue = node.attributes["data-width"] || "1600";
        const heightValue = node.attributes["data-height"] || "900";
        const width = /^\d{1,5}$/.test(widthValue) ? widthValue : "1600";
        const height = /^\d{1,5}$/.test(heightValue) ? heightValue : "900";
        const wide = node.attributes["data-wide"] === "true";
        
        return `\n<ArticleImage\n  src="${src}"\n  alt="${alt}"\n  caption="${caption}"\n  width={${width}}\n  height={${height}}\n  ${wide ? "wide\n" : ""}/>\n`;
      }
      return renderChildrenStr();
    }
    default:
      return renderChildrenStr();
  }
}

export function htmlToMarkdown(html: string): string {
  const tokens = tokenizeHtml(html);
  const tree = parseTokensToTree(tokens);
  
  let markdown = tree.map(node => nodeToMarkdown(node)).join("");
  
  // Collapse three or more consecutive newlines into exactly two (one blank line)
  markdown = markdown.replace(/\n{3,}/g, "\n\n");
  
  // Trim start/end to get clean markdown formatting
  return markdown.trim() + "\n";
}
