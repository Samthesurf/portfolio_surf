'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Article } from './types';

interface MetadataPanelProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article;
  onUpdateArticle: (updatedFields: Partial<Article>) => void;
  onUploadCover: (file: File) => Promise<string>;
  onArticleRestored: (article: Article) => void;
}

export default function MetadataPanel({ isOpen, onClose, article, onUpdateArticle, onUploadCover, onArticleRestored }: MetadataPanelProps) {
  const [newTag, setNewTag] = useState('');
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [coverUploadError, setCoverUploadError] = useState('');
  const [revisions, setRevisions] = useState<Array<{ key: string; uploaded: string; size: number }>>([]);
  const [isLoadingRevisions, setIsLoadingRevisions] = useState(false);

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    const tag = newTag.trim();
    const currentTags = article.tags || [];
    if (tag && !currentTags.includes(tag)) {
      onUpdateArticle({ tags: [...currentTags, tag] });
    }
    setNewTag('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = article.tags || [];
    onUpdateArticle({ tags: currentTags.filter(t => t !== tagToRemove) });
  };

  const handleCoverUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setIsUploadingCover(true);
    setCoverUploadError('');
    try {
      const url = await onUploadCover(file);
      onUpdateArticle({
        coverImage: url,
        coverAlt: article.coverAlt || file.name.replace(/\.[^.]+$/, '').replaceAll('-', ' '),
      });
    } catch (error) {
      setCoverUploadError(error instanceof Error ? error.message : 'Cover upload failed');
    } finally {
      setIsUploadingCover(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setIsLoadingRevisions(true);
    fetch(`/api/studio/articles/${encodeURIComponent(article.slug)}/revisions`, {
      credentials: 'same-origin',
      cache: 'no-store',
    })
      .then(async response => {
        const data = await response.json() as { revisions?: Array<{ key: string; uploaded: string; size: number }> };
        if (!cancelled && response.ok) setRevisions(data.revisions ?? []);
      })
      .finally(() => {
        if (!cancelled) setIsLoadingRevisions(false);
      });
    return () => {
      cancelled = true;
    };
  }, [article.slug, isOpen]);

  const handleRestoreRevision = async (key: string) => {
    if (!article.etag || !window.confirm('Restore this saved version? The current version will remain in history.')) return;
    const response = await fetch(`/api/studio/articles/${encodeURIComponent(article.slug)}/revisions`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, etag: article.etag }),
    });
    const data = await response.json() as { article?: Omit<Article, 'id'> & { slug: string }; error?: string };
    if (!response.ok || !data.article) throw new Error(data.error ?? 'Could not restore that version');
    onArticleRestored({ ...data.article, id: data.article.slug });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (mobile only) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black md:hidden"
          />

          {/* Right sliding panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 z-40 w-full max-w-sm border-l border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl flex flex-col pt-16 md:pt-0"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-150 dark:border-slate-800/80">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Article Metadata</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-450">Configure tags, settings and cards</p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                aria-label="Close settings"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable inputs */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Draft Status / Published Status Switch */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/50">
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Draft status</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    {article.draft ? 'Hidden from public index' : 'Visible to public readers'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (article.draft) {
                      if (window.confirm('Publish this article now? It will become visible on samuelsurf.me.')) {
                        onUpdateArticle({ draft: false, publishedAt: new Date().toISOString() });
                      }
                    } else if (window.confirm('Move this article back to drafts?')) {
                      onUpdateArticle({ draft: true });
                    }
                  }}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 focus:outline-none ${
                    article.draft
                      ? 'bg-amber-500 dark:bg-amber-600'
                      : 'bg-emerald-500 dark:bg-emerald-600'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-250 ${
                      article.draft ? 'translate-x-0' : 'translate-x-5'
                    }`}
                  />
                </button>
              </div>

              {/* Featured toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/50">
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Featured post</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Pin to home/blog hero spot</span>
                </div>
                <button
                  type="button"
                  onClick={() => onUpdateArticle({ featured: !article.featured })}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 focus:outline-none ${
                    article.featured ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-250 ${
                      article.featured ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Author Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Author</label>
                <input
                  type="text"
                  value={article.author}
                  onChange={e => onUpdateArticle({ author: e.target.value })}
                  placeholder="Author name"
                  className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-800/80 rounded-lg bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all font-medium"
                />
              </div>

              {/* Date Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Publication Date</label>
                <input
                  type="text"
                  value={article.publishedAt}
                  onChange={e => onUpdateArticle({ publishedAt: e.target.value })}
                  placeholder="YYYY-MM-DDTHH:MM:SS+01:00"
                  className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-800/80 rounded-lg bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => onUpdateArticle({ publishedAt: new Date().toISOString() })}
                  className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold hover:underline block"
                >
                  Set to current time
                </button>
              </div>

              {/* Excerpt Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Excerpt</label>
                  <span className={`text-[10px] ${
                    article.excerpt.length >= 140 && article.excerpt.length <= 165
                      ? 'text-emerald-500'
                      : 'text-slate-400'
                  }`}>
                    {article.excerpt.length} chars (Target: 140-160)
                  </span>
                </div>
                <textarea
                  value={article.excerpt}
                  onChange={e => onUpdateArticle({ excerpt: e.target.value })}
                  placeholder="Concise card summary..."
                  rows={4}
                  className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-800/80 rounded-lg bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all leading-normal"
                />
              </div>

              {/* Tags Section */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Tags</label>
                <form onSubmit={handleAddTag} className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={e => setNewTag(e.target.value)}
                    placeholder="Add a tag..."
                    className="flex-1 text-xs px-3 py-2 border border-slate-200 dark:border-slate-800/80 rounded-lg bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-black rounded-lg hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors"
                  >
                    Add
                  </button>
                </form>

                <div className="flex flex-wrap gap-1.5 pt-1.5">
                  {article.tags && article.tags.length > 0 ? (
                    article.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/30"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-full p-0.5 text-blue-500"
                        >
                          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">No tags configured</span>
                  )}
                </div>
              </div>

              {/* Cover Image Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Cover Image Path</label>
                <input
                  type="text"
                  value={article.coverImage ?? ''}
                  onChange={e => onUpdateArticle({ coverImage: e.target.value })}
                  placeholder="/media/blog/article-slug/cover.webp"
                  className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-800/80 rounded-lg bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all font-mono"
                />
                <label className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-blue-500/30 bg-blue-500/5 px-3 py-2 text-[11px] font-bold text-blue-600 transition hover:bg-blue-500/10 dark:text-blue-400">
                  {isUploadingCover ? 'Uploading cover...' : 'Upload cover image'}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    onChange={handleCoverUpload}
                    disabled={isUploadingCover}
                    className="hidden"
                  />
                </label>
                {coverUploadError ? <p className="text-[10px] font-medium text-red-500">{coverUploadError}</p> : null}
              </div>

              {/* Cover Alt */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Cover Image Alt Text</label>
                <input
                  type="text"
                  value={article.coverAlt ?? ''}
                  onChange={e => onUpdateArticle({ coverAlt: e.target.value })}
                  placeholder="Describe the image content..."
                  className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-800/80 rounded-lg bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all leading-normal"
                />
              </div>

              <div className="space-y-2 border-t border-slate-200 pt-5 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Version history</label>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Automatic</span>
                </div>
                {isLoadingRevisions ? (
                  <p className="text-[10px] text-slate-400">Loading versions...</p>
                ) : revisions.length ? (
                  <div className="max-h-44 space-y-1 overflow-y-auto pr-1">
                    {revisions.slice(0, 12).map(revision => (
                      <div key={revision.key} className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 px-2.5 py-2 dark:border-slate-800">
                        <div className="min-w-0">
                          <p className="truncate text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                            {new Date(revision.uploaded).toLocaleString()}
                          </p>
                          <p className="text-[9px] text-slate-400">{Math.max(1, Math.round(revision.size / 1024))} KB</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => void handleRestoreRevision(revision.key)}
                          className="rounded-md border border-slate-200 px-2 py-1 text-[9px] font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          Restore
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[10px] leading-relaxed text-slate-400">Versions appear after the first edit is saved.</p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
