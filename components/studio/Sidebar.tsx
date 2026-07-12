'use client';

import Link from 'next/link';
import { useTheme } from '../ThemeContext';
import { Article } from './types';

interface SidebarProps {
  articles: Article[];
  activeId: string;
  onSelectArticle: (id: string) => void;
  onCreateArticle: () => void;
  onDeleteArticle: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterStatus: string;
  onFilterChange: (status: string) => void;
  onCloseMobileSidebar?: () => void;
}

const SunIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

export default function Sidebar({
  articles,
  activeId,
  onSelectArticle,
  onCreateArticle,
  onDeleteArticle,
  searchQuery,
  onSearchChange,
  filterStatus,
  onFilterChange,
  onCloseMobileSidebar,
}: SidebarProps) {
  const { theme, toggleTheme } = useTheme();

  const statusFilters = ['all', 'drafts', 'published', 'featured'];

  return (
    <div className="w-full h-full flex flex-col bg-slate-50 dark:bg-[#060606] border-r border-slate-200 dark:border-slate-800/80">
      {/* Brand Header */}
      <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800/85 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-900 dark:bg-white flex items-center justify-center font-bold text-sm text-white dark:text-black shadow-md shadow-primary-glow">
            S
          </div>
          <div>
            <span className="font-bold text-xs uppercase tracking-widest text-slate-850 dark:text-white block">
              Samuel Surf
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.2 rounded-full text-[9px] font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20 uppercase tracking-widest mt-0.5 animate-pulse-slow">
              Studio
            </span>
          </div>
        </div>
        {onCloseMobileSidebar && (
          <button
            onClick={onCloseMobileSidebar}
            className="md:hidden p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
            aria-label="Close sidebar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Primary Actions & Search */}
      <div className="p-4 space-y-3.5 border-b border-slate-200 dark:border-slate-800/60">
        {/* Create Button following BUTTON_STYLE_GUIDE.md */}
        <button
          onClick={() => {
            onCreateArticle();
            if (onCloseMobileSidebar) onCloseMobileSidebar();
          }}
          className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-700 dark:hover:bg-gray-200 transition-colors shadow-[0_0_10px_rgba(0,0,0,0.06)] dark:shadow-[0_0_10px_rgba(255,255,255,0.12)] flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          New Article
        </button>

        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search articles, tags..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs border border-slate-200 dark:border-slate-800/80 rounded-xl bg-white dark:bg-slate-950/40 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-2 hover:text-slate-650 dark:hover:text-slate-200 text-slate-450 p-0.5 rounded"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800/60 overflow-x-auto scrollbar-none">
        <div className="flex gap-1">
          {statusFilters.map(filter => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors shrink-0 ${
                filterStatus === filter
                  ? 'bg-slate-200/80 dark:bg-slate-800 text-slate-900 dark:text-white'
                  : 'text-slate-450 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-350'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* List Container */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/50">
        {articles.length > 0 ? (
          articles.map(article => {
            const isActive = article.id === activeId;
            const wordCount = article.content.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(w => w.length > 0).length;

            return (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article.id);
                  if (onCloseMobileSidebar) onCloseMobileSidebar();
                }}
                className={`group relative p-4 cursor-pointer transition-all border-l-2 ${
                  isActive
                    ? 'bg-white dark:bg-slate-900/55 border-primary shadow-sm'
                    : 'border-transparent hover:bg-slate-100/50 dark:hover:bg-slate-900/20'
                }`}
              >
                {/* Title and Delete Action */}
                <div className="flex items-start justify-between gap-2">
                  <h4 className={`text-xs font-bold leading-snug line-clamp-2 ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                    {article.title || <span className="italic text-slate-400">Untitled Article</span>}
                  </h4>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      if (confirm('Archive this article? You can recover it from R2 storage if needed.')) {
                        onDeleteArticle(article.id);
                      }
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-500 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-all shrink-0"
                    title="Archive article"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {/* Excerpt */}
                <p className="text-[10px] text-slate-500 dark:text-slate-450 line-clamp-2 mt-1.5 leading-normal">
                  {article.excerpt || 'No description provided.'}
                </p>

                {/* Metadata row */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-3">
                  {/* Status Badge */}
                  {article.draft ? (
                    <span className="px-1.5 py-0.2 rounded text-[8px] font-extrabold uppercase tracking-wider border border-amber-500/25 bg-amber-500/5 text-amber-500">
                      Draft
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.2 rounded text-[8px] font-extrabold uppercase tracking-wider border border-emerald-500/25 bg-emerald-500/5 text-emerald-500">
                      Live
                    </span>
                  )}

                  {/* Featured Badge */}
                  {article.featured && (
                    <span className="px-1.5 py-0.2 rounded text-[8px] font-extrabold uppercase tracking-wider border border-blue-500/25 bg-blue-500/5 text-blue-550 dark:text-blue-400 flex items-center gap-0.5">
                      ★ Featured
                    </span>
                  )}

                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium">
                    {wordCount} words
                  </span>
                </div>

                {/* Tags preview */}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {article.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="text-[9px] text-slate-450 dark:text-slate-500 bg-slate-200/50 dark:bg-slate-900/80 px-1.5 py-0.2 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                    {article.tags.length > 3 && (
                      <span className="text-[9px] text-slate-400">+{article.tags.length - 3}</span>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-slate-400 dark:text-slate-600">
            <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs font-semibold">No articles found</p>
            <p className="text-[10px] mt-1 opacity-75">Try clearing your filters or creating a new post</p>
          </div>
        )}
      </div>

      {/* Footer Profile & Options */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800/80 bg-slate-100/50 dark:bg-[#030303] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-500 text-[10px] font-bold">
            SU
          </div>
          <div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block leading-tight">
              Samuel Ukpai
            </span>
            <Link
              href="https://samuelsurf.me"
              className="text-[9px] text-slate-450 dark:text-slate-450 hover:text-blue-500 hover:underline flex items-center gap-0.5"
            >
              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Exit Studio
            </Link>
          </div>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-900 transition-colors text-slate-650 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </div>
  );
}
