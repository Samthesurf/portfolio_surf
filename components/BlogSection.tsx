import Link from "next/link";

import { getAllBlogPosts } from "../lib/blog";
import BlogPostCard from "./blog/BlogPostCard";

export default function BlogSection() {
  const posts = getAllBlogPosts().slice(0, 3);

  return (
    <section
      id="blog"
      className="relative overflow-hidden bg-white px-6 py-24 dark:bg-[#030303] md:px-12 lg:px-24"
    >
      <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl dark:bg-blue-500/10" />
      <div className="absolute bottom-20 left-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl dark:bg-cyan-500/10" />

      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              From the blog
            </p>
            <h2 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
              The decisions behind the products.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-gray-400 md:text-xl">
              Case studies, practical engineering lessons, and honest notes from taking software from an idea to production.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex shrink-0 items-center gap-2 font-bold text-blue-600 dark:text-blue-400"
          >
            Explore the blog
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 py-16 text-center dark:border-white/15">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              The first article is on the way.
            </h3>
            <p className="mt-3 text-slate-600 dark:text-gray-400">
              The blog is ready for practical notes from shipped projects.
            </p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/25"
          >
            Read all articles
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}