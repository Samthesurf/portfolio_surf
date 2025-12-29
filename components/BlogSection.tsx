'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface BlogPost {
    title: string;
    link: string;
    pubDate: string;
    description: string;
    thumbnail?: string;
}

// Extract the first image URL from HTML content
function extractFirstImage(htmlContent: string): string | null {
    const imgMatch = htmlContent.match(/<img[^>]+src=["']([^"']+)["']/i);
    return imgMatch ? imgMatch[1] : null;
}

export default function BlogSection() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch Medium posts via RSS to JSON proxy
        const fetchPosts = async () => {
            try {
                const response = await fetch(
                    `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@samuelsurf`
                );
                const data = await response.json();

                if (data.status === 'ok') {
                    // Get the first 3 posts
                    const formattedPosts = data.items.slice(0, 3).map((item: any) => {
                        // Try to get thumbnail from feed, or extract from content HTML
                        const thumbnail = item.thumbnail ||
                            item.enclosure?.link ||
                            extractFirstImage(item.content || item.description || '');

                        return {
                            title: item.title,
                            link: item.link,
                            pubDate: item.pubDate,
                            description: item.description?.replace(/<[^>]*>/g, '').substring(0, 150) + '...' || '',
                            thumbnail,
                        };
                    });
                    setPosts(formattedPosts);
                }
            } catch (error) {
                console.error('Error fetching Medium posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <section id="blog" className="py-24 px-6 md:px-12 lg:px-24 bg-white dark:bg-[#030303] relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl" />

            <div className="container mx-auto max-w-6xl relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4">
                        Latest from my{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                            Blog
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Thoughts on software development, AI, and building great products
                    </p>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="h-96 rounded-3xl bg-slate-100 dark:bg-white/5 animate-pulse"
                            />
                        ))}
                    </div>
                )}

                {/* Blog Posts Grid */}
                {!loading && posts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {posts.map((post, index) => (
                            <motion.a
                                key={post.link}
                                href={post.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="group relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-white/5 dark:to-white/[0.02] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/30"
                            >
                                {/* Thumbnail or Gradient Background */}
                                <div className="h-48 bg-gradient-to-br from-blue-600 to-blue-400 relative overflow-hidden">
                                    {post.thumbnail ? (
                                        <img
                                            src={post.thumbnail}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 opacity-80" />
                                    )}
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                    {/* Date Badge */}
                                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-sm text-xs font-semibold text-slate-900 dark:text-white">
                                        {formatDate(post.pubDate)}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-gray-400 line-clamp-3 mb-4">
                                        {post.description}
                                    </p>

                                    {/* Read More Link */}
                                    <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400 font-semibold text-sm">
                                        Read on Medium
                                        <svg
                                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* Animated border effect */}
                                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600 to-blue-400 opacity-20 blur-xl" />
                                </div>
                            </motion.a>
                        ))}
                    </div>
                )}

                {/* Fallback if no posts or error */}
                {!loading && posts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-600 dark:text-gray-400 mb-6">
                            Check out my latest articles on Medium
                        </p>
                        <a
                            href="https://samuelsurf.medium.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-lg hover:bg-slate-700 dark:hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            Visit My Blog
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </a>
                    </div>
                )}

                {/* View All Posts Button */}
                {posts.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <a
                            href="https://samuelsurf.medium.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-500/50 dark:hover:shadow-blue-500/30 hover:scale-105 group"
                        >
                            View All Posts on Medium
                            <svg
                                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </a>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
