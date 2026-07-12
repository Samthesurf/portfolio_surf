'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Article } from './types';

interface EditorProps {
  article: Article;
  onUpdateArticle: (updatedFields: Partial<Article>) => void;
  onUploadImage: (file: File) => Promise<string>;
  onOpenShortcutsHelp: () => void;
}

type EditorFont = 'sans' | 'mono';
type EditorSize = 'sm' | 'base' | 'lg' | 'xl';

export default function Editor({ article, onUpdateArticle, onUploadImage, onOpenShortcutsHelp }: EditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editorFont, setEditorFont] = useState<EditorFont>('mono');
  const [editorSize, setEditorSize] = useState<EditorSize>('base');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const { wordCount, charCount, readingTime } = useMemo(() => {
    const cleanContent = article.content.replace(/<[^>]*>/g, ''); // strip XML tags
    const words = cleanContent.trim().split(/\s+/).filter(w => w.length > 0);
    const wCount = words.length;
    const cCount = article.content.length;
    const rTime = Math.max(1, Math.ceil(wCount / 200)); // 200 wpm
    return { wordCount: wCount, charCount: cCount, readingTime: rTime };
  }, [article.content]);

  const insertFormat = (formatType: string) => {
    if (formatType === 'image') {
      fileInputRef.current?.click();
      return;
    }
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);

    let replacement = '';
    let cursorOffset = 0;

    switch (formatType) {
      case 'bold':
        replacement = `**${selectedText || 'bold text'}**`;
        cursorOffset = selectedText ? 0 : 2;
        break;
      case 'italic':
        replacement = `*${selectedText || 'italic text'}*`;
        cursorOffset = selectedText ? 0 : 1;
        break;
      case 'code':
        if (selectedText.includes('\n')) {
          replacement = `\`\`\`ts\n${selectedText}\n\`\`\``;
          cursorOffset = 4;
        } else {
          replacement = `\`${selectedText || 'code'}\``;
          cursorOffset = selectedText ? 0 : 1;
        }
        break;
      case 'link':
        replacement = `[${selectedText || 'link label'}](https://)`;
        cursorOffset = selectedText ? 11 : 1;
        break;
      case 'quote':
        replacement = `\n> ${selectedText || 'blockquote text'}\n`;
        cursorOffset = 1;
        break;
      case 'h2':
        replacement = `\n## ${selectedText || 'Heading 2'}\n`;
        cursorOffset = 1;
        break;
      case 'h3':
        replacement = `\n### ${selectedText || 'Heading 3'}\n`;
        cursorOffset = 1;
        break;
      case 'callout':
        replacement = `\n<Callout type="tip" title="A useful callout">\n  ${selectedText || 'Callout description text here'}\n</Callout>\n`;
        cursorOffset = 11;
        break;
      default:
        return;
    }

    const newContent = text.substring(0, start) + replacement + text.substring(end);
    onUpdateArticle({ content: newContent });

    // Refocus textarea and place cursor appropriately
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + replacement.length - cursorOffset;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 50);
  };

  const handleImageFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const textarea = textareaRef.current;
    const insertAt = textarea?.selectionStart ?? article.content.length;
    setIsUploading(true);
    setUploadError('');
    try {
      const url = await onUploadImage(file);
      const alt = file.name.replace(/\.[^.]+$/, '').replaceAll('-', ' ');
      const block = `\n<ArticleImage\n  src="${url}"\n  alt="${alt}"\n  caption=""\n  width={1600}\n  height={900}\n  wide\n/>\n`;
      onUpdateArticle({
        content: article.content.slice(0, insertAt) + block + article.content.slice(insertAt),
      });
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Image upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  // Keyboard listener inside textarea for key combos
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const isMeta = e.metaKey || e.ctrlKey;
    
    if (isMeta && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      insertFormat('bold');
    } else if (isMeta && e.key.toLowerCase() === 'i') {
      e.preventDefault();
      insertFormat('italic');
    } else if (isMeta && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      insertFormat('link');
    } else if (e.altKey && e.key === '2') {
      e.preventDefault();
      insertFormat('h2');
    } else if (e.altKey && e.key === '3') {
      e.preventDefault();
      insertFormat('h3');
    } else if (e.altKey && e.key.toLowerCase() === 'q') {
      e.preventDefault();
      insertFormat('quote');
    } else if (e.altKey && e.key.toLowerCase() === 'c') {
      e.preventDefault();
      insertFormat('callout');
    } else if (e.altKey && e.key.toLowerCase() === 'i') {
      e.preventDefault();
      insertFormat('image');
    }
  };

  // Compute text size class
  const sizeClasses = {
    sm: 'text-xs md:text-sm',
    base: 'text-sm md:text-base',
    lg: 'text-base md:text-lg',
    xl: 'text-lg md:text-xl',
  }[editorSize];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800/80">
      {/* Title Input */}
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/30">
        <input
          type="text"
          value={article.title}
          onChange={e => onUpdateArticle({ title: e.target.value })}
          placeholder="Article Title..."
          className="w-full text-xl sm:text-2xl font-bold tracking-tight bg-transparent text-slate-900 dark:text-white border-0 outline-none placeholder-slate-350 dark:placeholder-slate-700 focus:ring-0 focus:outline-none"
        />
      </div>

      {/* Toolbar */}
      <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900/90 flex flex-wrap items-center justify-between gap-2 sticky top-0 z-10">
        {/* Formatting Actions */}
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => insertFormat('bold')}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-550 dark:text-slate-450 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Bold (Ctrl+B)"
          >
            <span className="font-bold text-xs">B</span>
          </button>
          <button
            onClick={() => insertFormat('italic')}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-550 dark:text-slate-450 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Italic (Ctrl+I)"
          >
            <span className="italic text-xs font-serif font-semibold">I</span>
          </button>
          <button
            onClick={() => insertFormat('code')}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-550 dark:text-slate-450 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Code Block"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </button>
          <button
            onClick={() => insertFormat('link')}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-550 dark:text-slate-450 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Link (Ctrl+K)"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </button>
          <button
            onClick={() => insertFormat('quote')}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-550 dark:text-slate-450 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Blockquote (Alt+Q)"
          >
            <span className="font-serif font-bold text-xs text-center block w-3.5">”</span>
          </button>

          <div className="h-4 w-[1px] bg-slate-100 dark:bg-slate-800 mx-1" />

          <button
            onClick={() => insertFormat('h2')}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-550 dark:text-slate-450 hover:text-slate-900 dark:hover:text-white transition-colors text-[10px] font-bold"
            title="Heading 2 (Alt+2)"
          >
            H2
          </button>
          <button
            onClick={() => insertFormat('h3')}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-550 dark:text-slate-450 hover:text-slate-900 dark:hover:text-white transition-colors text-[10px] font-bold"
            title="Heading 3 (Alt+3)"
          >
            H3
          </button>
          <button
            onClick={() => insertFormat('callout')}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-550 dark:text-slate-450 hover:text-slate-900 dark:hover:text-white transition-colors text-[10px] font-bold flex items-center gap-0.5"
            title="Callout Box (Alt+C)"
          >
            <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 px-1 py-0.2 rounded text-[9px]">Callout</span>
          </button>
          <button
            onClick={() => insertFormat('image')}
            disabled={isUploading}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-550 dark:text-slate-450 hover:text-slate-900 dark:hover:text-white transition-colors text-[10px] font-bold flex items-center gap-0.5 disabled:opacity-50"
            title="Upload article image (Alt+I)"
          >
            <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-450 px-1 py-0.2 rounded text-[9px]">{isUploading ? 'Uploading' : 'Image'}</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={handleImageFile}
            className="hidden"
          />
          {uploadError ? (
            <span className="max-w-40 truncate text-[9px] font-semibold text-red-500" title={uploadError}>{uploadError}</span>
          ) : null}
        </div>

        {/* View / Font options */}
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          {/* Font Toggle */}
          <div className="flex items-center rounded-lg border border-slate-150 dark:border-slate-800 p-0.5 bg-slate-50 dark:bg-slate-950/40">
            <button
              onClick={() => setEditorFont('sans')}
              className={`px-2 py-0.5 rounded transition-all ${
                editorFont === 'sans'
                  ? 'bg-white dark:bg-slate-800 shadow-sm text-slate-900 dark:text-white'
                  : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              Sans
            </button>
            <button
              onClick={() => setEditorFont('mono')}
              className={`px-2 py-0.5 rounded transition-all font-mono ${
                editorFont === 'mono'
                  ? 'bg-white dark:bg-slate-800 shadow-sm text-slate-900 dark:text-white'
                  : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              Mono
            </button>
          </div>

          {/* Size Scaling */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                if (editorSize === 'xl') setEditorSize('lg');
                else if (editorSize === 'lg') setEditorSize('base');
                else if (editorSize === 'base') setEditorSize('sm');
              }}
              disabled={editorSize === 'sm'}
              className="p-1 border border-slate-150 dark:border-slate-800 rounded hover:bg-slate-50 dark:hover:bg-slate-850 disabled:opacity-30 text-slate-600 dark:text-slate-400 transition-colors"
              title="Decrease Font Size"
            >
              A-
            </button>
            <button
              onClick={() => {
                if (editorSize === 'sm') setEditorSize('base');
                else if (editorSize === 'base') setEditorSize('lg');
                else if (editorSize === 'lg') setEditorSize('xl');
              }}
              disabled={editorSize === 'xl'}
              className="p-1 border border-slate-150 dark:border-slate-800 rounded hover:bg-slate-50 dark:hover:bg-slate-850 disabled:opacity-30 text-slate-600 dark:text-slate-400 transition-colors"
              title="Increase Font Size"
            >
              A+
            </button>
          </div>

          <div className="h-4 w-[1px] bg-slate-150 dark:bg-slate-800 mx-0.5" />

          {/* Help Shortcuts */}
          <button
            onClick={onOpenShortcutsHelp}
            className="p-1 border border-slate-150 dark:border-slate-800 rounded hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 transition-colors flex items-center justify-center"
            title="Keyboard Shortcuts"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Write Area */}
      <div className="flex-1 relative overflow-hidden flex">
        <textarea
          ref={textareaRef}
          value={article.content}
          onChange={e => onUpdateArticle({ content: e.target.value })}
          onKeyDown={handleKeyDown}
          placeholder="Start typing in Markdown / MDX..."
          className={`w-full h-full p-6 bg-transparent text-slate-800 dark:text-slate-200 border-0 outline-none resize-none focus:ring-0 focus:outline-none font-medium leading-relaxed overflow-y-auto ${
            editorFont === 'sans' ? 'font-sans' : 'font-mono'
          } ${sizeClasses}`}
        />
      </div>

      {/* Status Bar */}
      <div className="px-6 py-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-450 select-none">
        <div className="flex items-center gap-3">
          <span>Words: <strong className="text-slate-800 dark:text-slate-200">{wordCount}</strong></span>
          <span>Chars: <strong className="text-slate-800 dark:text-slate-200">{charCount}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Est. Reading Time: <strong className="text-slate-800 dark:text-slate-200">{readingTime} min</strong></span>
        </div>
      </div>
    </div>
  );
}
