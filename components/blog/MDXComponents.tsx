import type { AnchorHTMLAttributes, ImgHTMLAttributes, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

interface ArticleImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  wide?: boolean;
  priority?: boolean;
}

export function ArticleImage({
  src,
  alt,
  caption,
  width = 1600,
  height = 900,
  wide = false,
  priority = false,
}: ArticleImageProps) {
  return (
    <figure className={wide ? "blog-figure blog-figure-wide" : "blog-figure"}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={wide ? "(max-width: 1200px) 100vw, 1100px" : "(max-width: 768px) 100vw, 720px"}
        className="h-auto w-full rounded-2xl border border-slate-200 object-contain shadow-lg dark:border-white/10"
        priority={priority}
      />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

interface CalloutProps {
  children: ReactNode;
  title?: string;
  type?: "note" | "tip" | "warning";
}

export function Callout({ children, title, type = "note" }: CalloutProps) {
  const labels = { note: "Note", tip: "Practical tip", warning: "Important" };
  return (
    <aside className={`blog-callout blog-callout-${type}`}>
      <p className="blog-callout-title">{title ?? labels[type]}</p>
      <div>{children}</div>
    </aside>
  );
}

interface YouTubeProps {
  id: string;
  title: string;
}

export function YouTube({ id, title }: YouTubeProps) {
  return (
    <div className="blog-video">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

function SmartLink({ href = "", children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = href.startsWith("http://") || href.startsWith("https://");
  const allowed =
    external ||
    href.startsWith("/") ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  if (!allowed) {
    return <span>{children}</span>;
  }

  if (!external && href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      {...props}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

function MarkdownImage({ src = "", alt = "" }: ImgHTMLAttributes<HTMLImageElement>) {
  if (typeof src !== "string" || !src) return null;
  return <ArticleImage src={src} alt={alt} />;
}

function ResponsiveTable({ children }: { children: ReactNode }) {
  return (
    <div className="blog-table-wrap">
      <table>{children}</table>
    </div>
  );
}

export const mdxComponents = {
  ArticleImage,
  Callout,
  YouTube,
  a: SmartLink,
  img: MarkdownImage,
  table: ResponsiveTable,
};
