"use client";

import { useMemo, useState } from "react";

import type { BlogPostSummary } from "../../lib/blog-types";
import BlogPostCard from "./BlogPostCard";

export default function BlogExplorer({
  posts,
  tags,
}: {
  posts: BlogPostSummary[];
  tags: string[];
}) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesTag = activeTag === "All" || post.tags.includes(activeTag);
      const haystack = [post.title, post.excerpt, post.tags.join(" ")]
        .join(" ")
        .toLowerCase();
      return matchesTag && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [activeTag, posts, query]);

  return (
    <section aria-labelledby="all-articles-heading">
      <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            Browse the archive
          </p>
          <h2 id="all-articles-heading" className="mt-2 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
            All articles
          </h2>
        </div>

        <label className="relative block w-full lg:max-w-md">
          <span className="sr-only">Search articles</span>
          <svg className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <circle cx="11" cy="11" r="7" strokeWidth="2" />
            <path d="m20 20-3.5-3.5" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, topic, or technology"
            className="w-full rounded-full border border-slate-200 bg-white py-3 pl-12 pr-5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </label>
      </div>

      <div className="mb-10 flex flex-wrap gap-2" aria-label="Filter articles by topic">
        {["All", ...tags].map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            aria-pressed={activeTag === tag}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              activeTag === tag
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "border border-slate-200 bg-white text-slate-600 hover:border-blue-500/40 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:text-blue-400"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 py-20 text-center dark:border-white/15">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">No matching articles</h3>
          <p className="mt-2 text-slate-600 dark:text-gray-400">Try another search or choose a different topic.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveTag("All");
            }}
            className="mt-5 font-bold text-blue-600 hover:underline dark:text-blue-400"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
