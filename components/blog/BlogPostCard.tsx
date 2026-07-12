import Image from "next/image";
import Link from "next/link";

import type { BlogPostSummary } from "../../lib/blog-types";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Lagos",
  }).format(new Date(value));
}

export default function BlogPostCard({
  post,
  featured = false,
}: {
  post: BlogPostSummary;
  featured?: boolean;
}) {
  return (
    <article
      className={`group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl dark:border-white/10 dark:bg-white/5 ${
        featured ? "grid md:grid-cols-[1.1fr_1fr]" : "flex h-full flex-col"
      }`}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={`relative block overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-500 ${
          featured ? "min-h-72 md:min-h-full" : "aspect-[16/9]"
        }`}
        aria-label={`Read ${post.title}`}
      >
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.coverAlt ?? ""}
            fill
            sizes={featured ? "(max-width: 768px) 100vw, 55vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.28),transparent_35%),linear-gradient(135deg,#2563eb,#06b6d4)]" />
        )}
      </Link>

      <div className={`flex flex-1 flex-col ${featured ? "p-7 md:p-10" : "p-6"}`}>
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden="true">•</span>
          <span>{post.readingTime}</span>
        </div>

        <h2 className={`${featured ? "text-3xl md:text-4xl" : "text-2xl"} font-bold leading-tight text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400`}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="mt-4 flex-1 leading-relaxed text-slate-600 dark:text-gray-400">
          {post.excerpt}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.slice(0, featured ? 5 : 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-7 inline-flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400"
        >
          Read article
          <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
