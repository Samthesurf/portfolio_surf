import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import HeaderNav from "../../../components/HeaderNav";
import ArticleActions from "../../../components/blog/ArticleActions";
import BlogPostCard from "../../../components/blog/BlogPostCard";
import { mdxComponents } from "../../../components/blog/MDXComponents";
import ReadingProgress from "../../../components/blog/ReadingProgress";
import TableOfContents from "../../../components/blog/TableOfContents";
import {
  formatBlogDate,
} from "../../../lib/blog";
import {
  getPublishedBlogPost,
  listPublishedBlogPosts,
  selectRelatedBlogPosts,
} from "../../../lib/blog-store";
import { SITE, absoluteUrl } from "../../../lib/site-config";

interface BlogArticlePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPost(slug);
  if (!post) return {};

  const url = `${SITE.url}/blog/${post.slug}`;
  const image = absoluteUrl(post.coverImage ?? SITE.ogImage);

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author, url: `${SITE.url}/about` }],
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [`${SITE.url}/about`],
      tags: post.tags,
      images: [{ url: image, alt: post.coverAlt ?? post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
      creator: SITE.social.twitterHandle,
    },
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = await getPublishedBlogPost(slug);
  if (!post) notFound();

  const url = `${SITE.url}/blog/${post.slug}`;
  const image = absoluteUrl(post.coverImage ?? SITE.ogImage);
  const relatedPosts = selectRelatedBlogPosts(post, await listPublishedBlogPosts());
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.excerpt,
        image: [image],
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: {
          "@type": "Person",
          "@id": `${SITE.url}/#person`,
          name: post.author,
          url: `${SITE.url}/about`,
        },
        publisher: { "@id": `${SITE.url}/#person` },
        keywords: post.tags.join(", "),
        wordCount: post.wordCount,
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-[#030303] dark:text-white">
      <ReadingProgress />
      <HeaderNav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <main className="pb-24 pt-32">
        <article>
          <header className="px-6 md:px-12 lg:px-24">
            <div className="mx-auto max-w-4xl">
              <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500 dark:text-gray-400" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
                <span aria-hidden="true">/</span>
                <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400">Blog</Link>
              </nav>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="mt-7 text-4xl font-bold leading-[1.08] tracking-tight text-slate-950 dark:text-white sm:text-5xl md:text-7xl">
                {post.title}
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-slate-600 dark:text-gray-400 md:text-2xl">
                {post.excerpt}
              </p>

              <div className="mt-9 flex flex-col gap-6 border-y border-slate-200 py-6 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 font-bold text-white" aria-hidden="true">SU</div>
                  <div>
                    <Link href="/about" className="font-bold text-slate-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
                      {post.author}
                    </Link>
                    <p className="text-sm text-slate-500 dark:text-gray-400">
                      <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
                      <span aria-hidden="true"> · </span>
                      {post.readingTime}
                    </p>
                  </div>
                </div>
                <ArticleActions title={post.title} url={url} />
              </div>
            </div>
          </header>

          {post.coverImage ? (
            <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
              <Image
                src={post.coverImage}
                alt={post.coverAlt ?? post.title}
                width={1600}
                height={900}
                sizes="(max-width: 1200px) 100vw, 1152px"
                className="h-auto w-full rounded-2xl border border-slate-200 object-contain shadow-2xl dark:border-white/10"
                priority
              />
            </div>
          ) : null}

          <div className="mx-auto mt-14 max-w-[70ch] px-6 md:px-12 lg:px-0">
            <div className="min-w-0">
              <TableOfContents headings={post.headings} />
              <div className="blog-prose">
                <MDXRemote
                  source={post.content}
                  components={mdxComponents}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                      rehypePlugins: [
                        rehypeSlug,
                        [rehypeAutolinkHeadings, { behavior: "wrap" }],
                      ],
                    },
                  }}
                />
              </div>

              <footer className="mt-16 border-t border-slate-200 pt-8 dark:border-white/10">
                <ArticleActions title={post.title} url={url} />
                <div className="mt-10 rounded-3xl bg-slate-50 p-7 dark:bg-white/5 md:p-9">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">About the author</p>
                  <h2 className="mt-3 text-2xl font-bold">{post.author}</h2>
                  <p className="mt-3 leading-relaxed text-slate-600 dark:text-gray-400">
                    Full Stack Software Developer building production mobile apps, web platforms, backends, and AI-powered products from idea to launch.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link href="/about" className="font-bold text-blue-600 hover:underline dark:text-blue-400">More about Samuel</Link>
                    <Link href="/#contact" className="font-bold text-blue-600 hover:underline dark:text-blue-400">Discuss a project</Link>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 ? (
          <section className="mt-24 border-t border-slate-200 px-6 pt-20 dark:border-white/10 md:px-12 lg:px-24">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-3xl font-bold md:text-4xl">Keep reading</h2>
              <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((related) => (
                  <BlogPostCard key={related.slug} post={related} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
