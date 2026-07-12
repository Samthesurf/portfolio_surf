import type { Metadata } from "next";
import Link from "next/link";

import HeaderNav from "../../components/HeaderNav";
import BlogExplorer from "../../components/blog/BlogExplorer";
import BlogPostCard from "../../components/blog/BlogPostCard";
import { getAllBlogPosts, getBlogTags } from "../../lib/blog";
import { SITE } from "../../lib/site-config";

export const metadata: Metadata = {
  title: "Blog | Building Mobile, Web and AI Products",
  description:
    "Practical notes from Samuel Ukpai on building and launching mobile apps, web platforms, backends, AI features, and reliable software products.",
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": `${SITE.url}/blog/rss.xml`,
    },
  },
  openGraph: {
    type: "website",
    url: `${SITE.url}/blog`,
    title: "Samuel Surf Blog | Ideas, Builds and Lessons",
    description:
      "Practical lessons from shipping mobile, web, backend, and AI products.",
    images: [SITE.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Surf Blog | Ideas, Builds and Lessons",
    description:
      "Practical lessons from shipping mobile, web, backend, and AI products.",
    images: [SITE.ogImage],
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const archivePosts = featured
    ? posts.filter((post) => post.slug !== featured.slug)
    : posts;

  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-[#030303] dark:text-white">
      <HeaderNav />
      <main className="pb-24 pt-32">
        <section className="px-6 pb-20 md:px-12 lg:px-24">
          <div className="container mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                Notes from building and shipping
              </div>
              <h1 className="text-5xl font-bold leading-[1.03] tracking-tight md:text-7xl lg:text-8xl">
                Ideas, builds, and lessons from making
                <span className="block bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
                  useful software.
                </span>
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-gray-400 md:text-xl">
                Long-form case studies, practical engineering decisions, and honest notes about mobile, web, backend, AI, and taking products from an idea to production.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#articles"
                  className="rounded-full bg-slate-900 px-6 py-3 font-bold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-gray-200"
                >
                  Browse articles
                </a>
                <Link
                  href="/about"
                  className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-blue-500/50 hover:text-blue-600 dark:border-white/15 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  About the author
                </Link>
              </div>
            </div>
          </div>
        </section>

        {featured ? (
          <section className="border-y border-slate-200 bg-slate-50 px-6 py-20 dark:border-white/10 dark:bg-white/[0.025] md:px-12 lg:px-24">
            <div className="container mx-auto max-w-6xl">
              <p className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                Featured article
              </p>
              <BlogPostCard post={featured} featured />
            </div>
          </section>
        ) : null}

        <div id="articles" className="scroll-mt-28 px-6 pt-24 md:px-12 lg:px-24">
          <div className="container mx-auto max-w-6xl">
            {archivePosts.length > 0 ? (
              <BlogExplorer posts={archivePosts} tags={getBlogTags(archivePosts)} />
            ) : featured ? (
              <section aria-labelledby="all-articles-heading">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                  The archive is growing
                </p>
                <h2 id="all-articles-heading" className="mt-2 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
                  More practical articles are on the way.
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-gray-400">
                  The featured case study is the first entry. Future articles will appear here with topic filters and search.
                </p>
              </section>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 py-20 text-center dark:border-white/15">
                <h2 className="text-2xl font-bold">The first article is being prepared.</h2>
                <p className="mt-3 text-slate-600 dark:text-gray-400">Check back soon for practical notes from shipped projects.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
