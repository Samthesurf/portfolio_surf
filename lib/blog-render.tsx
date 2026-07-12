import Link from "next/link";
import type { ReactNode } from "react";

import type { BlogHeading } from "./blog-types";

type AttributeValue = string | number | boolean;

const UNORDERED_LIST_RE = /^[-*]\s+/;
const ORDERED_LIST_RE = /^\d+\.\s+/;
const HEADING_RE = /^(#{2,6})\s+(.*)$/;

const CALL_OUT_LABELS: Record<"note" | "tip" | "warning", string> = {
  note: "Note",
  tip: "Tip",
  warning: "Warning",
};

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

function parseInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    const [fullMatch, , boldValue, italicValue, codeValue, linkText, linkHref] = match;

    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (boldValue) {
      nodes.push(<strong key={`bold-${match.index}`}>{boldValue}</strong>);
    } else if (italicValue) {
      nodes.push(<em key={`italic-${match.index}`}>{italicValue}</em>);
    } else if (codeValue) {
      nodes.push(<code key={`code-${match.index}`}>{codeValue}</code>);
    } else if (linkText && linkHref) {
      if (linkHref.startsWith("/")) {
        nodes.push(
          <Link key={`link-${match.index}`} href={linkHref}>
            {linkText}
          </Link>,
        );
      } else if (linkHref.startsWith("#")) {
        nodes.push(
          <a key={`link-${match.index}`} href={linkHref}>
            {linkText}
          </a>,
        );
      } else if (/^(https?:\/\/|mailto:|tel:)/i.test(linkHref)) {
        const isExternal = /^https?:\/\//i.test(linkHref);
        nodes.push(
          <a
            key={`link-${match.index}`}
            href={linkHref}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
          >
            {linkText}
          </a>,
        );
      } else {
        nodes.push(linkText);
      }
    }

    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
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

function renderHeading(
  level: 2 | 3 | 4 | 5 | 6,
  text: string,
  key: string,
  heading?: BlogHeading,
): ReactNode {
  const content = parseInline(text);

  if (level === 2) {
    if (heading) {
      return (
        <h2 key={key} id={heading.id}>
          <a href={`#${heading.id}`}>{content}</a>
        </h2>
      );
    }
    return <h2 key={key}>{content}</h2>;
  }

  if (level === 3) {
    if (heading) {
      return (
        <h3 key={key} id={heading.id}>
          <a href={`#${heading.id}`}>{content}</a>
        </h3>
      );
    }
    return <h3 key={key}>{content}</h3>;
  }

  if (level === 4) return <h4 key={key}>{content}</h4>;
  if (level === 5) return <h5 key={key}>{content}</h5>;
  return <h6 key={key}>{content}</h6>;
}

export function renderBlogContent(
  content: string,
  headings: BlogHeading[] = [],
): ReactNode[] {
  const lines = content.split(/\r?\n/);
  const elements: ReactNode[] = [];
  let i = 0;
  let headingIndex = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      i += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim() || "code";
      i += 1;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i += 1;
      }
      if (i < lines.length) {
        i += 1;
      }

      elements.push(
        <div key={`code-${i}`} data-rehype-pretty-code-figure="">
          <div data-rehype-pretty-code-title="">{lang}</div>
          <pre className="overflow-x-auto border border-slate-200 rounded-xl bg-slate-50/50 p-4 text-xs font-mono leading-relaxed text-slate-800 dark:border-slate-800/80 dark:bg-[#0d1117] dark:text-slate-200">
            <code>{codeLines.join("\n").trim()}</code>
          </pre>
        </div>,
      );
      continue;
    }

    if (line.startsWith("<Callout")) {
      const openTag = line.replace(/^<Callout\b/, "").replace(/>\s*$/, "").trim();
      const attrs = parseAttributes(openTag);
      const type = attrs.type === "tip" || attrs.type === "warning" ? attrs.type : "note";
      const title =
        typeof attrs.title === "string" && attrs.title.trim().length > 0
          ? attrs.title
          : CALL_OUT_LABELS[type];

      const calloutLines: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith("</Callout>")) {
        calloutLines.push(lines[i]);
        i += 1;
      }
      if (i < lines.length) {
        i += 1;
      }

      elements.push(
        <aside key={`callout-${i}`} className={`blog-callout blog-callout-${type}`}>
          <p className="blog-callout-title">{title}</p>
          <div className="mt-1 text-sm font-medium leading-relaxed">
            {renderBlogContent(calloutLines.join("\n").trim())}
          </div>
        </aside>,
      );
      continue;
    }

    if (line.startsWith("<ArticleImage")) {
      let component = rawLine;
      while (!component.trim().endsWith("/>") && i + 1 < lines.length) {
        i += 1;
        component += `\n${lines[i]}`;
      }
      i += 1;

      const attrs = parseAttributes(
        component.replace(/^<ArticleImage\b/, "").replace(/\/\>\s*$/, "").trim(),
      );
      const src = typeof attrs.src === "string" ? attrs.src : "";
      const alt = typeof attrs.alt === "string" ? attrs.alt : "";
      const caption = typeof attrs.caption === "string" ? attrs.caption : "";
      const width = typeof attrs.width === "number" ? attrs.width : 1600;
      const height = typeof attrs.height === "number" ? attrs.height : 900;
      const wide = attrs.wide === true;

      elements.push(
        <figure key={`image-${i}`} className={`blog-figure ${wide ? "blog-figure-wide" : ""}`}>
          <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900 aspect-video flex items-center justify-center">
            {src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={alt || caption || "Article illustration"}
                width={width}
                height={height}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex flex-col items-center gap-1.5 p-4 text-center text-slate-400 dark:text-slate-650">
                <svg className="h-8 w-8 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-xs font-semibold uppercase tracking-wider">No Image Specified</span>
                <span className="max-w-[200px] text-[10px] text-slate-500">{alt || "Provide a valid image path"}</span>
              </div>
            )}
          </div>
          {caption ? <figcaption>{caption}</figcaption> : null}
        </figure>,
      );
      continue;
    }

    const headingMatch = line.match(HEADING_RE);
    if (headingMatch) {
      const hashes = headingMatch[1];
      const headingText = headingMatch[2].trim();
      const level = hashes.length as 2 | 3 | 4 | 5 | 6;
      const heading = level === 2 || level === 3 ? headings[headingIndex] : undefined;
      if (level === 2 || level === 3) {
        headingIndex += 1;
      }

      elements.push(renderHeading(level, headingText, `heading-${i}`, heading));
      i += 1;
      continue;
    }

    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        quoteLines.push(lines[i].trim().replace(/^>\s*/, ""));
        i += 1;
      }
      elements.push(<blockquote key={`quote-${i}`}>{parseInline(quoteLines.join(" "))}</blockquote>);
      continue;
    }

    if (UNORDERED_LIST_RE.test(line) || ORDERED_LIST_RE.test(line)) {
      const ordered = ORDERED_LIST_RE.test(line);
      const listPattern = ordered ? ORDERED_LIST_RE : UNORDERED_LIST_RE;
      const items: string[] = [];

      while (i < lines.length && listPattern.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(listPattern, ""));
        i += 1;
      }

      const ListTag = ordered ? "ol" : "ul";
      elements.push(
        <ListTag key={`list-${i}`}>
          {items.map((item, index) => (
            <li key={`${i}-${index}`}>{parseInline(item)}</li>
          ))}
        </ListTag>,
      );
      continue;
    }

    if (/^(-{3,}|\*{3,})$/.test(line)) {
      elements.push(<hr key={`hr-${i}`} />);
      i += 1;
      continue;
    }

    let paragraph = line;
    i += 1;
    while (i < lines.length) {
      const nextLine = lines[i].trim();
      if (!nextLine || isBlockStart(nextLine)) {
        break;
      }
      paragraph += ` ${nextLine}`;
      i += 1;
    }

    elements.push(<p key={`p-${i}`}>{parseInline(paragraph)}</p>);
  }

  return elements;
}
