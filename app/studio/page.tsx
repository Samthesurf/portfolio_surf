'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Sidebar from '@/components/studio/Sidebar';
import Editor from '@/components/studio/Editor';
import Preview from '@/components/studio/Preview';
import MetadataPanel from '@/components/studio/MetadataPanel';
import ShortcutsHelp from '@/components/studio/ShortcutsHelp';
import { Article, ViewMode, SaveStatus } from '@/components/studio/types';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);

function toArticle(value: Omit<Article, "id"> & { slug: string }): Article {
  return { ...value, id: value.slug };
}

export default function StudioPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeArticleId, setActiveArticleId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<ViewMode>("write");
  const [isMetadataOpen, setIsMetadataOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isNewArticleOpen, setIsNewArticleOpen] = useState(false);
  const [newArticleTitle, setNewArticleTitle] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [identityEmail, setIdentityEmail] = useState("");

  const articlesRef = useRef<Article[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const backupCheckedRef = useRef(false);
  const activeArticle = useMemo(
    () => articles.find((article) => article.id === activeArticleId) ?? null,
    [articles, activeArticleId],
  );

  useEffect(() => {
    articlesRef.current = articles;
  }, [articles]);

  useEffect(() => {
    let cancelled = false;
    async function loadArticles() {
      try {
        const response = await fetch("/api/studio/articles", {
          credentials: "same-origin",
          cache: "no-store",
        });
        const data = (await response.json()) as {
          articles?: Array<Omit<Article, "id"> & { slug: string }>;
          identity?: { email?: string };
          error?: string;
        };
        if (!response.ok) throw new Error(data.error ?? "Could not load your articles");
        if (cancelled) return;
        const loaded = (data.articles ?? []).map(toArticle);
        setArticles(loaded);
        setIdentityEmail(data.identity?.email ?? "");
        setActiveArticleId(loaded[0]?.id ?? "");
      } catch (error) {
        if (!cancelled) setErrorMessage(error instanceof Error ? error.message : "Could not load your articles");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    void loadArticles();
    return () => {
      cancelled = true;
    };
  }, []);

  const replaceArticle = React.useCallback((saved: Omit<Article, "id"> & { slug: string }) => {
    const next = toArticle(saved);
    setArticles((current) => current.map((article) => (article.id === next.id ? next : article)));
    articlesRef.current = articlesRef.current.map((article) => (article.id === next.id ? next : article));
    return next;
  }, []);

  const saveArticle = React.useCallback(async (articleId: string) => {
    const article = articlesRef.current.find((candidate) => candidate.id === articleId);
    if (!article) return;
    setSaveStatus("saving");
    setErrorMessage("");
    try {
      const { id: _id, etag, ...document } = article;
      void _id;
      const response = await fetch(`/api/studio/articles/${encodeURIComponent(article.slug)}`, {
        method: "PUT",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ article: document, etag }),
      });
      const data = (await response.json()) as {
        article?: Omit<Article, "id"> & { slug: string };
        error?: string;
      };
      if (!response.ok || !data.article) throw new Error(data.error ?? "Save failed");
      replaceArticle(data.article);
      localStorage.removeItem(`studio-backup:${article.slug}`);
      setSaveStatus("saved");
    } catch (error) {
      setSaveStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Save failed");
    }
  }, [replaceArticle]);

  useEffect(() => {
    if (isLoading || backupCheckedRef.current) return;
    backupCheckedRef.current = true;
    for (const serverArticle of articlesRef.current) {
      const key = `studio-backup:${serverArticle.slug}`;
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      try {
        const backup = JSON.parse(raw) as Article;
        const canRestore =
          backup.slug === serverArticle.slug &&
          backup.etag === serverArticle.etag &&
          Date.parse(backup.updatedAt ?? backup.publishedAt) >
            Date.parse(serverArticle.updatedAt ?? serverArticle.publishedAt);
        if (!canRestore) {
          localStorage.removeItem(key);
          continue;
        }
        if (window.confirm(`Recover unsaved browser changes for “${serverArticle.title}”?`)) {
          const next = articlesRef.current.map(article => article.id === serverArticle.id ? backup : article);
          articlesRef.current = next;
          setArticles(next);
          setActiveArticleId(backup.id);
          setSaveStatus("unsaved");
          setTimeout(() => void saveArticle(backup.id), 0);
        } else {
          localStorage.removeItem(key);
        }
      } catch {
        localStorage.removeItem(key);
      }
    }
  }, [isLoading, saveArticle]);

  const scheduleSave = React.useCallback((articleId: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => void saveArticle(articleId), 1200);
  }, [saveArticle]);

  const handleUpdateArticle = (updatedFields: Partial<Article>) => {
    if (!activeArticleId) return;
    const now = new Date().toISOString();
    setSaveStatus("unsaved");
    setArticles((current) => {
      const next = current.map((article) =>
        article.id === activeArticleId ? { ...article, ...updatedFields, updatedAt: now } : article,
      );
      articlesRef.current = next;
      const changed = next.find((article) => article.id === activeArticleId);
      if (changed) localStorage.setItem(`studio-backup:${changed.slug}`, JSON.stringify(changed));
      return next;
    });
    scheduleSave(activeArticleId);
  };

  const handleManualSave = React.useCallback(() => {
    if (!activeArticleId) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    void saveArticle(activeArticleId);
  }, [activeArticleId, saveArticle]);

  const handleCreateArticle = () => {
    setNewArticleTitle("");
    setIsNewArticleOpen(true);
  };

  const handleConfirmCreate = async () => {
    const title = newArticleTitle.trim();
    if (!title) return;
    const baseSlug = slugify(title) || `article-${Date.now()}`;
    const slug = articlesRef.current.some((article) => article.slug === baseSlug)
      ? `${baseSlug}-${Date.now().toString().slice(-5)}`
      : baseSlug;
    const now = new Date().toISOString();
    const document = {
      schemaVersion: 1 as const,
      slug,
      title,
      excerpt: "Write a short description for article cards and search results.",
      content: "Start with the idea, problem, or decision that gave you a reason to write this article.\n\n## First section\n\nContinue writing here.",
      publishedAt: now,
      updatedAt: now,
      coverImage: undefined,
      coverAlt: undefined,
      tags: [],
      featured: false,
      draft: true,
      author: "Samuel Ukpai",
    };
    setSaveStatus("saving");
    setErrorMessage("");
    try {
      const response = await fetch("/api/studio/articles", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(document),
      });
      const data = (await response.json()) as {
        article?: Omit<Article, "id"> & { slug: string };
        error?: string;
      };
      if (!response.ok || !data.article) throw new Error(data.error ?? "Could not create the article");
      const created = toArticle(data.article);
      const next = [created, ...articlesRef.current];
      articlesRef.current = next;
      setArticles(next);
      setActiveArticleId(created.id);
      setSaveStatus("saved");
      setMobileSidebarOpen(false);
      setIsNewArticleOpen(false);
    } catch (error) {
      setSaveStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Could not create the article");
    }
  };

  const handleDeleteArticle = async (id: string) => {
    const article = articlesRef.current.find((candidate) => candidate.id === id);
    if (!article?.etag) return;
    setSaveStatus("saving");
    try {
      const response = await fetch(`/api/studio/articles/${encodeURIComponent(article.slug)}`, {
        method: "DELETE",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ etag: article.etag }),
      });
      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Could not archive the article");
      }
      const next = articlesRef.current.filter((candidate) => candidate.id !== id);
      articlesRef.current = next;
      setArticles(next);
      setActiveArticleId(next[0]?.id ?? "");
      setSaveStatus("saved");
    } catch (error) {
      setSaveStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Could not archive the article");
    }
  };

  const handleUploadMedia = async (file: File): Promise<string> => {
    if (!activeArticle) throw new Error("Select an article before uploading an image");
    const form = new FormData();
    form.set("slug", activeArticle.slug);
    form.set("file", file);
    const response = await fetch("/api/studio/media", {
      method: "POST",
      credentials: "same-origin",
      body: form,
    });
    const data = (await response.json()) as { url?: string; error?: string };
    if (!response.ok || !data.url) throw new Error(data.error ?? "Image upload failed");
    return data.url;
  };

  useEffect(() => {
    const handleGlobalShortcuts = (event: KeyboardEvent) => {
      const isMeta = event.metaKey || event.ctrlKey;
      if (isMeta && event.key.toLowerCase() === "s") {
        event.preventDefault();
        handleManualSave();
      }
      if (isMeta && event.key.toLowerCase() === "p") {
        event.preventDefault();
        setViewMode((current) => (current === "write" ? "preview" : "write"));
      }
    };
    window.addEventListener("keydown", handleGlobalShortcuts);
    return () => window.removeEventListener("keydown", handleGlobalShortcuts);
  }, [handleManualSave]);

  const filteredArticles = useMemo(() => articles.filter((article) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) || article.content.toLowerCase().includes(query) ||
      article.tags.some((tag) => tag.toLowerCase().includes(query));
    if (!matchesSearch) return false;
    if (filterStatus === "drafts") return article.draft;
    if (filterStatus === "published") return !article.draft;
    if (filterStatus === "featured") return article.featured;
    return true;
  }), [articles, searchQuery, filterStatus]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white dark:bg-[#030303] font-sans antialiased text-slate-900 dark:text-white">
      
      {/* Sidebar - Desktop */}
      <div className="hidden md:block w-[300px] xl:w-[320px] h-full shrink-0">
        <Sidebar
          articles={filteredArticles}
          activeId={activeArticleId}
          onSelectArticle={setActiveArticleId}
          onCreateArticle={handleCreateArticle}
          onDeleteArticle={handleDeleteArticle}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
        />
      </div>

      {/* Sidebar - Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="w-[280px] h-full shrink-0">
            <Sidebar
              articles={filteredArticles}
              activeId={activeArticleId}
              onSelectArticle={setActiveArticleId}
              onCreateArticle={handleCreateArticle}
              onDeleteArticle={handleDeleteArticle}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filterStatus={filterStatus}
              onFilterChange={setFilterStatus}
              onCloseMobileSidebar={() => setMobileSidebarOpen(false)}
            />
          </div>
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="flex-1 bg-black/40 backdrop-blur-sm"
          />
        </div>
      )}

      {/* Main Workspace Area */}
      <div className="flex-1 h-full flex flex-col min-w-0">
        
        {/* Workspace Header */}
        <header className="h-14 shrink-0 border-b border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-black/40 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 relative z-20">
          <div className="flex items-center gap-3">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-650 dark:text-slate-350 transition-colors"
              aria-label="Open sidebar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Save Status Badge */}
            <div className="flex items-center gap-2">
              {saveStatus === 'saved' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Saved to cloud
                </span>
              )}
              {saveStatus === 'saving' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  <svg className="animate-spin h-2.5 w-2.5 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Syncing...
                </span>
              )}
              {saveStatus === 'unsaved' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-500 border border-amber-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                  Unsaved changes
                </span>
              )}
              {saveStatus === 'error' && (
                <span className="inline-flex items-center gap-1 rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-0.5 text-[10px] font-bold text-red-600 dark:text-red-400" title={errorMessage}>
                  Save failed
                </span>
              )}
              {identityEmail ? (
                <span className="hidden text-[10px] font-medium text-slate-400 xl:inline">{identityEmail}</span>
              ) : null}
            </div>
          </div>

          {/* View Toggles */}
          <div className="flex items-center gap-3">
            {activeArticle && (
              <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 bg-slate-50 dark:bg-slate-950/40 text-xs font-bold">
                <button
                  onClick={() => setViewMode('write')}
                  className={`px-3 py-1 rounded transition-all ${
                    viewMode === 'write'
                      ? 'bg-white dark:bg-slate-800 shadow-sm text-slate-900 dark:text-white'
                      : 'text-slate-450 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-350'
                  }`}
                >
                  Write
                </button>
                <button
                  onClick={() => setViewMode('preview')}
                  className={`px-3 py-1 rounded transition-all ${
                    viewMode === 'preview'
                      ? 'bg-white dark:bg-slate-800 shadow-sm text-slate-900 dark:text-white'
                      : 'text-slate-450 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-350'
                  }`}
                >
                  Preview
                </button>
              </div>
            )}

            {/* Settings & Save Buttons */}
            {activeArticle && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMetadataOpen(!isMetadataOpen)}
                  className={`p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors text-slate-650 dark:text-slate-350 hover:text-slate-900 dark:hover:text-white ${
                    isMetadataOpen ? 'bg-slate-100 dark:bg-slate-800' : 'hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                  title="Article Settings (Metadata)"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </button>

                <button
                  onClick={handleManualSave}
                  className="px-3.5 py-1.5 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition-colors hidden sm:block"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content Pane */}
        <div className="flex-1 min-h-0 relative overflow-hidden bg-slate-50/50 dark:bg-slate-950/10">
          {isLoading ? (
            <div className="flex h-full items-center justify-center text-sm font-semibold text-slate-500">Loading your studio...</div>
          ) : activeArticle ? (
            <div className="w-full h-full flex">
              {/* Write Mode */}
              {viewMode === 'write' && (
                <div className="w-full h-full">
                  <Editor
                    article={activeArticle}
                    onUpdateArticle={handleUpdateArticle}
                    onUploadImage={handleUploadMedia}
                    onOpenShortcutsHelp={() => setIsShortcutsOpen(true)}
                  />
                </div>
              )}

              {/* Preview Mode */}
              {viewMode === 'preview' && (
                <div className="w-full h-full overflow-y-auto">
                  <Preview article={activeArticle} />
                </div>
              )}


              {/* Metadata Panel (Slides out on right) */}
              <MetadataPanel
                isOpen={isMetadataOpen}
                onClose={() => setIsMetadataOpen(false)}
                article={activeArticle}
                onUpdateArticle={handleUpdateArticle}
                onUploadCover={handleUploadMedia}
                onArticleRestored={(restored) => {
                  replaceArticle(restored);
                  setSaveStatus('saved');
                }}
              />
            </div>
          ) : (
            /* Empty State Screen */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none">
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl animate-pulse-slow" />
                <div className="relative w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-650">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">No Article Selected</h3>
              <p className="text-xs text-slate-500 max-w-[280px] mb-6">
                {errorMessage || 'Select an existing draft from the sidebar or create a new blog post to get started in the studio.'}
              </p>
              <button
                onClick={handleCreateArticle}
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-700 dark:hover:bg-gray-200 transition-colors shadow-lg shadow-primary-glow"
              >
                Create New Article
              </button>
            </div>
          )}
        </div>
      </div>

      {isNewArticleOpen ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="new-article-title">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void handleConfirmCreate();
            }}
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950"
          >
            <div className="mb-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">New draft</p>
              <h2 id="new-article-title" className="text-xl font-bold text-slate-950 dark:text-white">What are you writing about?</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">The title creates a clean URL. It can still be refined while you write.</p>
            </div>
            <input
              autoFocus
              value={newArticleTitle}
              onChange={(event) => setNewArticleTitle(event.target.value)}
              placeholder="Working title"
              maxLength={180}
              className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm font-semibold text-slate-900 outline-none ring-blue-500/20 transition focus:border-blue-500 focus:ring-4 dark:border-slate-800 dark:text-white"
            />
            {saveStatus === 'error' && errorMessage ? (
              <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">{errorMessage}</p>
            ) : null}
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsNewArticleOpen(false)}
                className="rounded-lg px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newArticleTitle.trim() || saveStatus === 'saving'}
                className="rounded-lg bg-slate-950 px-4 py-2 text-xs font-bold text-white shadow-lg transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-slate-200"
              >
                Create draft
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {/* Shortcuts Helper Modal */}
      <ShortcutsHelp
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
}

