'use client';

import React, { useMemo } from 'react';
import { Article } from './types';

interface PreviewProps {
  article: Article;
}

export default function Preview({ article }: PreviewProps) {
  const { title, content, coverImage, coverAlt, tags, publishedAt, author } = article;

  // Simple statistics
  const { wordCount, readingTime } = useMemo(() => {
    const cleanContent = content.replace(/<[^>]*>/g, ''); // strip XML/HTML tags
    const words = cleanContent.trim().split(/\s+/).filter(w => w.length > 0);
    const count = words.length;
    const time = Math.max(1, Math.ceil(count / 200)); // 200 words per minute
    return { wordCount: count, readingTime: time };
  }, [content]);

  const formattedDate = useMemo(() => {
    if (!publishedAt) return 'Draft';
    try {
      const date = new Date(publishedAt);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return publishedAt;
    }
  }, [publishedAt]);

  // Client-side markdown processor that handles code-blocks, headers, lists, links,
  // inline code, bold, italics, blockquotes, and special JSX components like Callout and ArticleImage.
  const renderedElements = useMemo(() => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    const parseInline = (text: string): React.ReactNode[] => {
      // Basic inline replacement: bold (**), italic (*), inline code (`), links ([text](url))
      const parts: React.ReactNode[] = [];
      let currentIdx = 0;
      
      // Match bold, italic, code, links
      const inlineRegex = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g;
      let match;

      while ((match = inlineRegex.exec(text)) !== null) {
        const matchIdx = match.index;
        
        // Add plain text before match
        if (matchIdx > currentIdx) {
          parts.push(text.substring(currentIdx, matchIdx));
        }

        const [, , boldVal, italicVal, codeVal, linkText, linkUrl] = match;

        if (boldVal) {
          parts.push(<strong key={matchIdx} className="font-bold text-slate-900 dark:text-white">{boldVal}</strong>);
        } else if (italicVal) {
          parts.push(<em key={matchIdx} className="italic">{italicVal}</em>);
        } else if (codeVal) {
          parts.push(
            <code key={matchIdx} className="border border-blue-100 dark:border-blue-900/40 rounded bg-blue-50/50 dark:bg-blue-950/20 px-1 py-0.5 text-blue-700 dark:text-blue-300 text-sm font-mono">
              {codeVal}
            </code>
          );
        } else if (linkText && linkUrl) {
          parts.push(
            <a key={matchIdx} href={linkUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-4 decoration-blue-500/35 hover:decoration-blue-500 hover:text-blue-700 dark:hover:text-blue-350 transition-colors">
              {linkText}
            </a>
          );
        }

        currentIdx = inlineRegex.lastIndex;
      }

      if (currentIdx < text.length) {
        parts.push(text.substring(currentIdx));
      }

      return parts.length > 0 ? parts : [text];
    };

    while (i < lines.length) {
      const line = lines[i].trim();

      // Skip empty lines
      if (!line) {
        i++;
        continue;
      }

      // 1. Code Block
      if (line.startsWith('```')) {
        const lang = line.slice(3).trim() || 'code';
        let code = '';
        i++;
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          code += lines[i] + '\n';
          i++;
        }
        i++; // skip closing ```
        elements.push(
          <div key={`code-${i}`} className="my-6" data-rehype-pretty-code-figure="">
            <div data-rehype-pretty-code-title="">{lang}</div>
            <pre className="overflow-x-auto border border-slate-200 dark:border-slate-800/80 rounded-xl bg-slate-50/50 dark:bg-[#0d1117] p-4 text-xs font-mono leading-relaxed text-slate-800 dark:text-slate-200">
              <code>{code.trim()}</code>
            </pre>
          </div>
        );
        continue;
      }

      // 2. Callout component: <Callout type="..." title="...">...</Callout>
      if (line.startsWith('<Callout')) {
        // Regex parse callout props
        const typeMatch = line.match(/type="([^"]+)"/) || ['', 'tip'];
        const titleMatch = line.match(/title="([^"]+)"/) || ['', 'Note'];
        const type = typeMatch[1];
        const titleText = titleMatch[1];
        
        let calloutContent = '';
        i++;
        
        while (i < lines.length && !lines[i].trim().startsWith('</Callout>')) {
          calloutContent += lines[i] + '\n';
          i++;
        }
        i++; // skip closing tag
        
        // Match standard styling
        let calloutClass = 'blog-callout';
        if (type === 'tip') calloutClass += ' blog-callout-tip';
        else if (type === 'warning') calloutClass += ' blog-callout-warning';
        
        elements.push(
          <div key={`callout-${i}`} className={calloutClass}>
            <p className="blog-callout-title">{titleText}</p>
            <div className="text-sm font-medium leading-relaxed mt-1">
              {parseInline(calloutContent.trim())}
            </div>
          </div>
        );
        continue;
      }

      // 3. ArticleImage component: <ArticleImage ... />
      if (line.startsWith('<ArticleImage')) {
        let component = line;
        while (!component.includes('/>') && i + 1 < lines.length) {
          i += 1;
          component += `\n${lines[i]}`;
        }
        const srcMatch = component.match(/src="([^"]+)"/) || ['', ''];
        const altMatch = component.match(/alt="([^"]+)"/) || ['', ''];
        const captionMatch = component.match(/caption="([^"]*)"/) || ['', ''];
        const wide = /\bwide\b/.test(component);
        
        const src = srcMatch[1];
        const alt = altMatch[1];
        const caption = captionMatch[1];
        
        elements.push(
          <figure key={`image-${i}`} className={`blog-figure ${wide ? 'blog-figure-wide' : ''}`}>
            <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 aspect-video flex items-center justify-center">
              {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt={alt || caption || 'Article illustration'}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="text-slate-400 dark:text-slate-650 flex flex-col items-center gap-1.5 p-4 text-center">
                  <svg className="w-8 h-8 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs font-semibold uppercase tracking-wider">No Image Specified</span>
                  <span className="text-[10px] text-slate-500 max-w-[200px]">{alt || 'Provide a valid image path'}</span>
                </div>
              )}
            </div>
            {caption && <figcaption>{caption}</figcaption>}
          </figure>
        );
        i++;
        continue;
      }

      // 4. Headings
      if (line.startsWith('## ')) {
        const text = line.slice(3).trim();
        elements.push(
          <h2 key={`h2-${i}`} className="scroll-margin-top mt-10 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {parseInline(text)}
          </h2>
        );
        i++;
        continue;
      }
      if (line.startsWith('### ')) {
        const text = line.slice(4).trim();
        elements.push(
          <h3 key={`h3-${i}`} className="scroll-margin-top mt-8 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {parseInline(text)}
          </h3>
        );
        i++;
        continue;
      }

      // 5. Blockquotes
      if (line.startsWith('> ')) {
        const text = line.slice(2).trim();
        elements.push(
          <blockquote key={`quote-${i}`} className="border-l-4 border-primary pl-4 py-1 my-6 italic text-slate-650 dark:text-slate-350">
            {parseInline(text)}
          </blockquote>
        );
        i++;
        continue;
      }

      // 6. Bullet points
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const items: string[] = [];
        while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
          items.push(lines[i].trim().substring(2).trim());
          i++;
        }
        elements.push(
          <ul key={`ul-${i}`} className="list-disc pl-6 my-4 space-y-1 text-slate-700 dark:text-slate-300">
            {items.map((item, idx) => (
              <li key={idx}>{parseInline(item)}</li>
            ))}
          </ul>
        );
        continue;
      }

      // 7. Standard Paragraphs
      elements.push(
        <p key={`p-${i}`} className="leading-relaxed text-slate-700 dark:text-slate-300">
          {parseInline(line)}
        </p>
      );
      i++;
    }

    return elements;
  }, [content]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12 overflow-y-auto h-full">
      {/* Cover Image */}
      {coverImage ? (
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 mb-8 md:mb-12 shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverImage}
            alt={coverAlt || title || 'Post cover'}
            className="object-cover w-full h-full"
          />
        </div>
      ) : (
        <div className="w-full aspect-video md:aspect-[21/9] rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 flex flex-col items-center justify-center mb-8 md:mb-12 p-6 text-center text-slate-400 dark:text-slate-600">
          <svg className="w-10 h-10 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs font-bold uppercase tracking-wider">No Cover Image</span>
          <span className="text-[10px] opacity-75 mt-1">Configure in metadata panel</span>
        </div>
      )}

      {/* Meta Headers */}
      <div className="space-y-4 border-b border-slate-100 dark:border-slate-800/80 pb-6 mb-8 md:mb-10">
        <div className="flex flex-wrap gap-1.5">
          {tags && tags.length > 0 ? (
            tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/30"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-xs text-slate-400 italic">No tags</span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          {title || <span className="text-slate-300 dark:text-slate-700 italic">Untitled Article</span>}
        </h1>

        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{author || 'Samuel Ukpai'}</span>
          </div>

          <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700 hidden sm:block" />

          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formattedDate}</span>
          </div>

          <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700 hidden sm:block" />

          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>{readingTime} min read ({wordCount} words)</span>
          </div>
        </div>
      </div>

      {/* Main MDX Content Prose Container */}
      <div className="blog-prose dark:blog-prose-dark max-w-none space-y-6 pb-20">
        {content ? renderedElements : (
          <p className="text-slate-400 dark:text-slate-650 italic text-center py-10">
            Start writing in the editor to see your rendered post preview here.
          </p>
        )}
      </div>
    </div>
  );
}
