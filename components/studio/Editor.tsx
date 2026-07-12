'use client';

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useEditor, EditorContent, NodeViewWrapper, NodeViewContent, ReactNodeViewRenderer, type NodeViewProps } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import CodeBlock from '@tiptap/extension-code-block';
import Link from '@tiptap/extension-link';
import { Node as TiptapNode, mergeAttributes } from '@tiptap/core';
import { Article } from './types';
import { markdownToHtml, htmlToMarkdown } from '@/lib/editor-converter';

const CodeBlockWithLanguage = CodeBlock.extend({
  addAttributes() {
    return {
      language: {
        default: 'code',
        parseHTML: element => {
          const code = element.querySelector('code');
          return code?.className.match(/language-([^\s]+)/)?.[1] ?? 'code';
        },
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'pre',
        preserveWhitespace: 'full',
      },
    ];
  },
  renderHTML({ node, HTMLAttributes }) {
    const language = String(node.attrs.language || 'code');
    return [
      'pre',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      ['code', { class: `language-${language}` }, 0],
    ];
  },
}).configure({
  HTMLAttributes: {
    class: 'rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-xs font-mono leading-relaxed dark:border-slate-800 dark:bg-[#0d1117]',
  },
});

// Custom Callout Extension
const CalloutExtension = TiptapNode.create({
  name: 'callout',
  group: 'block',
  content: 'block+',
  defining: true,

  addAttributes() {
    return {
      'data-callout-type': {
        default: 'note',
        parseHTML: element => element.getAttribute('data-callout-type') || element.getAttribute('type'),
        renderHTML: attributes => ({
          'data-callout-type': attributes['data-callout-type'],
          class: `blog-callout blog-callout-${attributes['data-callout-type']}`,
        }),
      },
      'data-callout-title': {
        default: '',
        parseHTML: element => element.getAttribute('data-callout-title') || element.getAttribute('title'),
        renderHTML: attributes => {
          if (!attributes['data-callout-title']) return {};
          return { 'data-callout-title': attributes['data-callout-title'] };
        },
      },
    };
  },

  parseHTML() {
    return [
      { tag: 'div[data-callout-type]' },
      { tag: 'div.blog-callout' }
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutNodeView);
  },
});

// Custom Callout Node View Component
function CalloutNodeView(props: NodeViewProps) {
  const type = props.node.attrs['data-callout-type'] || 'note';
  const title = props.node.attrs['data-callout-title'] || '';

  const setType = (newType: string) => {
    props.updateAttributes({ 'data-callout-type': newType });
  };

  const setTitle = (newTitle: string) => {
    props.updateAttributes({ 'data-callout-title': newTitle });
  };

  return (
    <NodeViewWrapper className={`blog-callout blog-callout-${type} relative my-6 rounded-xl border p-4 transition-all duration-200 group/callout`}>
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200/50 dark:border-slate-800/80 text-[11px] select-none font-bold">
        <div className="flex items-center gap-1.5">
          <span className="uppercase tracking-wider opacity-60">Type:</span>
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="bg-transparent border-0 font-extrabold outline-none cursor-pointer p-0 text-[11px] focus:ring-0 focus:outline-none"
          >
            <option value="note">Note</option>
            <option value="tip">Tip</option>
            <option value="warning">Warning</option>
          </select>
        </div>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Optional title..."
          className="bg-transparent border-0 outline-none text-right font-extrabold w-1/2 focus:ring-0 focus:outline-none placeholder-slate-400 dark:placeholder-slate-500 text-[11px]"
        />
      </div>
      <NodeViewContent className="outline-none min-h-[1.5em]" />
    </NodeViewWrapper>
  );
}

// Custom ArticleImage Extension
const ArticleImageExtension = TiptapNode.create({
  name: 'articleImage',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      'data-src': {
        default: '',
        parseHTML: element => element.getAttribute('data-src') || element.getAttribute('src'),
        renderHTML: attributes => ({ 'data-src': attributes['data-src'] }),
      },
      'data-alt': {
        default: '',
        parseHTML: element => element.getAttribute('data-alt') || element.getAttribute('alt'),
        renderHTML: attributes => ({ 'data-alt': attributes['data-alt'] }),
      },
      'data-caption': {
        default: '',
        parseHTML: element => element.getAttribute('data-caption') || element.getAttribute('caption'),
        renderHTML: attributes => ({ 'data-caption': attributes['data-caption'] }),
      },
      'data-width': {
        default: '1600',
        parseHTML: element => element.getAttribute('data-width') || element.getAttribute('width'),
        renderHTML: attributes => ({ 'data-width': attributes['data-width'] }),
      },
      'data-height': {
        default: '900',
        parseHTML: element => element.getAttribute('data-height') || element.getAttribute('height'),
        renderHTML: attributes => ({ 'data-height': attributes['data-height'] }),
      },
      'data-wide': {
        default: 'true',
        parseHTML: element => {
          const val = element.getAttribute('data-wide');
          return val === null ? 'true' : val;
        },
        renderHTML: attributes => ({ 'data-wide': attributes['data-wide'] }),
      },
    };
  },

  parseHTML() {
    return [
      { tag: 'div[data-src]' },
      { tag: 'div.blog-figure' }
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { class: 'blog-figure' })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ArticleImageNodeView);
  },
});

// Custom ArticleImage Node View Component
function ArticleImageNodeView(props: NodeViewProps) {
  const src = props.node.attrs['data-src'] || '';
  const alt = props.node.attrs['data-alt'] || '';
  const caption = props.node.attrs['data-caption'] || '';
  const wide = props.node.attrs['data-wide'] === 'true';

  const updateAttr = (key: string, value: string | boolean | number) => {
    props.updateAttributes({ [key]: String(value) });
  };

  return (
    <NodeViewWrapper className={`blog-figure ${wide ? 'blog-figure-wide' : ''} group/image relative my-8 border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-900/30`}>
      <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-950 flex items-center justify-center border border-slate-200 dark:border-slate-800/80 shadow-sm">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt || caption || 'Article image'} className="h-full w-full object-contain" />
        ) : (
          <div className="text-center text-slate-400 dark:text-slate-650 p-4 select-none">
            <svg className="h-10 w-10 mx-auto opacity-75 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-wider block">No image selected</span>
          </div>
        )}

        <div className="absolute top-2 right-2 flex gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-white opacity-0 group-hover/image:opacity-100 transition-opacity">
          <button
            onClick={() => updateAttr('data-wide', wide ? 'false' : 'true')}
            className={`font-semibold hover:text-blue-400 transition-colors ${wide ? 'text-blue-400' : ''}`}
          >
            {wide ? 'Wide Layout' : 'Standard Layout'}
          </button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div>
          <label className="block text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Alt Description</label>
          <input
            type="text"
            value={alt}
            onChange={e => updateAttr('data-alt', e.target.value)}
            placeholder="Alt text for accessibility..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-slate-800 dark:text-slate-200 font-semibold"
          />
        </div>
        <div>
          <label className="block text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Caption</label>
          <input
            type="text"
            value={caption}
            onChange={e => updateAttr('data-caption', e.target.value)}
            placeholder="Visible image caption..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-slate-800 dark:text-slate-200 font-semibold"
          />
        </div>
      </div>
    </NodeViewWrapper>
  );
}

interface EditorProps {
  article: Article;
  onUpdateArticle: (updatedFields: Partial<Article>) => void;
  onUploadImage: (file: File) => Promise<string>;
  onOpenShortcutsHelp: () => void;
}

export default function Editor({ article, onUpdateArticle, onUploadImage, onOpenShortcutsHelp }: EditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Floating controls next to current block
  const [sideMenuTop, setSideMenuTop] = useState<number | null>(null);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [showBlockMenu, setShowBlockMenu] = useState(false);

  // Link popover state
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showToolbarLinkInput, setShowToolbarLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const [initialHtml] = useState(() => markdownToHtml(article.content));
  const articleContentRef = useRef(article.content);
  const onUpdateArticleRef = useRef(onUpdateArticle);
  const isApplyingExternalContentRef = useRef(false);
  const lastArticleIdRef = useRef(article.id);

  useEffect(() => {
    onUpdateArticleRef.current = onUpdateArticle;
  }, [onUpdateArticle]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        link: false,
      }),
      CodeBlockWithLanguage,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 dark:text-blue-400 underline font-semibold',
        },
      }),
      CalloutExtension,
      ArticleImageExtension,
    ],
    content: initialHtml,
    editorProps: {
      attributes: {
        class: 'blog-prose max-w-4xl mx-auto w-full outline-none focus:outline-none min-h-[500px] pb-32',
      },
    },
    onUpdate({ editor }) {
      if (isApplyingExternalContentRef.current) return;
      const markdown = htmlToMarkdown(editor.getHTML());
      if (markdown !== articleContentRef.current) {
        articleContentRef.current = markdown;
        onUpdateArticleRef.current({ content: markdown });
      }
    },
  });

  // Keep restored revisions and server-side updates in sync without echoing them back into autosave.
  useEffect(() => {
    if (!editor) return;
    const articleChanged = lastArticleIdRef.current !== article.id;
    const contentChangedExternally = article.content !== articleContentRef.current;
    if (!articleChanged && !contentChangedExternally) return;

    lastArticleIdRef.current = article.id;
    articleContentRef.current = article.content;
    isApplyingExternalContentRef.current = true;
    editor.commands.setContent(markdownToHtml(article.content), { emitUpdate: false });
    isApplyingExternalContentRef.current = false;
    setShowBlockMenu(false);
    setShowLinkInput(false);
    setShowToolbarLinkInput(false);
  }, [article.content, article.id, editor]);

  useEffect(() => {
    if (!editor) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMeta = event.metaKey || event.ctrlKey;
      if (isMeta && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setLinkUrl(String(editor.getAttributes('link').href || ''));
        setShowToolbarLinkInput(true);
        setShowLinkInput(false);
      }
      if (event.key === 'Escape') {
        setShowToolbarLinkInput(false);
        setShowLinkInput(false);
        setShowBlockMenu(false);
      }
    };
    editor.view.dom.addEventListener('keydown', handleKeyDown);
    return () => editor.view.dom.removeEventListener('keydown', handleKeyDown);
  }, [editor]);

  // Position the block insertion control beside the selected or hovered block.
  useEffect(() => {
    if (!editor) return;

    const positionForElement = (candidate: globalThis.Node | null) => {
      try {
        let blockElement = candidate instanceof HTMLElement ? candidate : candidate?.parentElement;
        if (!blockElement || !editor.view.dom.contains(blockElement)) return;
        while (blockElement.parentElement && blockElement.parentElement !== editor.view.dom) {
          blockElement = blockElement.parentElement;
        }
        const editorBounds = editor.view.dom.getBoundingClientRect();
        const blockBounds = blockElement.getBoundingClientRect();
        setSideMenuTop(blockBounds.top - editorBounds.top + 12);
        setShowSideMenu(true);
      } catch {
        setShowSideMenu(false);
      }
    };

    const updateFromSelection = () => {
      const { $from } = editor.state.selection;
      positionForElement(editor.view.domAtPos($from.start()).node);
    };
    const handleFocus = () => updateFromSelection();
    const handleMouseMove = (event: MouseEvent) => positionForElement(event.target as Node);

    editor.on('selectionUpdate', updateFromSelection);
    editor.on('focus', handleFocus);
    editor.view.dom.addEventListener('mousemove', handleMouseMove);
    updateFromSelection();

    return () => {
      editor.off('selectionUpdate', updateFromSelection);
      editor.off('focus', handleFocus);
      editor.view.dom.removeEventListener('mousemove', handleMouseMove);
    };
  }, [editor]);

  // Document metadata calculations
  const { wordCount, charCount, readingTime } = useMemo(() => {
    const cleanContent = article.content.replace(/<[^>]*>/g, '');
    const words = cleanContent.trim().split(/\s+/).filter(w => w.length > 0);
    const wCount = words.length;
    const cCount = article.content.length;
    const rTime = Math.max(1, Math.ceil(wCount / 200));
    return { wordCount: wCount, charCount: cCount, readingTime: rTime };
  }, [article.content]);

  // Track insertion position before opening file picker
  const imageInsertPosRef = useRef<number | null>(null);

  const triggerImagePicker = () => {
    if (!editor) return;
    imageInsertPosRef.current = editor.state.selection.from;
    fileInputRef.current?.click();
  };

  // File upload trigger
  const handleImageFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file || !editor) return;
    setIsUploading(true);
    setUploadError('');
    try {
      const url = await onUploadImage(file);
      const alt = file.name.replace(/\.[^.]+$/, '').replaceAll('-', ' ');
      const savedPos = imageInsertPosRef.current;
      const docSize = editor.state.doc.content.size;
      const targetPos = typeof savedPos === 'number'
        ? Math.min(Math.max(0, savedPos), docSize)
        : docSize;

      editor.chain().focus(targetPos).insertContentAt(targetPos, {
        type: 'articleImage',
        attrs: {
          'data-src': url,
          'data-alt': alt,
          'data-caption': '',
          'data-width': '1600',
          'data-height': '900',
          'data-wide': 'true',
        },
      }).run();
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Image upload failed');
    } finally {
      setIsUploading(false);
      imageInsertPosRef.current = null;
    }
  };

  const openLinkEditor = (location: 'toolbar' | 'bubble') => {
    if (!editor) return;
    setLinkUrl(String(editor.getAttributes('link').href || ''));
    setShowToolbarLinkInput(location === 'toolbar');
    setShowLinkInput(location === 'bubble');
  };

  const applyLink = () => {
    if (!editor) return;
    const href = linkUrl.trim();
    if (href) editor.chain().focus().setLink({ href }).run();
    else editor.chain().focus().unsetLink().run();
    setShowToolbarLinkInput(false);
    setShowLinkInput(false);
  };

  const removeLink = () => {
    editor?.chain().focus().unsetLink().run();
    setLinkUrl('');
    setShowToolbarLinkInput(false);
    setShowLinkInput(false);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800/80">
      {/* Title Input */}
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/30">
        <textarea
          rows={1}
          value={article.title}
          onChange={event => onUpdateArticle({ title: event.target.value.replace(/\n/g, ' ') })}
          placeholder="Article title..."
          className="block min-h-8 w-full resize-none overflow-hidden bg-transparent text-xl font-bold leading-tight tracking-tight text-slate-900 outline-none [field-sizing:content] placeholder:text-slate-350 focus:ring-0 dark:text-white dark:placeholder:text-slate-700 sm:text-2xl"
        />
      </div>

      {/* Top Toolbar */}
      <div className="px-6 py-3 border-b border-slate-100 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 sticky top-0 z-20">
        <div className="flex flex-wrap items-center gap-1">
          {/* H2, H3 */}
          <button
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-2 py-1 rounded text-xs font-extrabold transition-colors hover:bg-slate-100 dark:hover:bg-slate-900 ${
              editor?.isActive('heading', { level: 2 }) ? 'text-blue-500 bg-slate-100 dark:bg-slate-900' : 'text-slate-550 dark:text-slate-400'
            }`}
            title="Heading 2"
          >
            H2
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`px-2 py-1 rounded text-xs font-extrabold transition-colors hover:bg-slate-100 dark:hover:bg-slate-900 ${
              editor?.isActive('heading', { level: 3 }) ? 'text-blue-500 bg-slate-100 dark:bg-slate-900' : 'text-slate-550 dark:text-slate-400'
            }`}
            title="Heading 3"
          >
            H3
          </button>

          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1.5" />

          {/* Bold, Italic, Code, Link */}
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors ${
              editor?.isActive('bold') ? 'text-blue-500 bg-slate-100 dark:bg-slate-900' : 'text-slate-550 dark:text-slate-400'
            }`}
            title="Bold"
          >
            <span className="font-bold text-xs block w-4 text-center">B</span>
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors ${
              editor?.isActive('italic') ? 'text-blue-500 bg-slate-100 dark:bg-slate-900' : 'text-slate-550 dark:text-slate-400'
            }`}
            title="Italic"
          >
            <span className="italic font-serif font-bold text-xs block w-4 text-center">I</span>
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleCode().run()}
            className={`p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors ${
              editor?.isActive('code') ? 'text-blue-500 bg-slate-100 dark:bg-slate-900' : 'text-slate-550 dark:text-slate-400'
            }`}
            title="Inline Code"
          >
            <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </button>
          <div className="relative">
            <button
              onClick={() => openLinkEditor('toolbar')}
              className={`p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors ${
                editor?.isActive('link') ? 'text-blue-500 bg-slate-100 dark:bg-slate-900' : 'text-slate-550 dark:text-slate-400'
              }`}
              title="Add or edit link"
              aria-expanded={showToolbarLinkInput}
            >
              <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </button>
            {showToolbarLinkInput ? (
              <form
                onSubmit={event => {
                  event.preventDefault();
                  applyLink();
                }}
                className="absolute left-0 top-9 z-50 flex w-80 max-w-[calc(100vw-2rem)] items-center gap-1.5 rounded-xl border border-slate-200 bg-white/95 p-1.5 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95"
              >
                <input
                  autoFocus
                  type="text"
                  value={linkUrl}
                  onChange={event => setLinkUrl(event.target.value)}
                  placeholder="https://example.com or /#contact"
                  className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-transparent px-2.5 py-1.5 text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:text-white"
                />
                <button type="submit" className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white dark:bg-white dark:text-black">Apply</button>
                {editor?.isActive('link') ? (
                  <button type="button" onClick={removeLink} className="rounded-lg px-2 py-1.5 text-xs font-bold text-red-500 hover:bg-red-500/10">Remove</button>
                ) : null}
              </form>
            ) : null}
          </div>

          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1.5" />

          {/* Blockquote, Code Block, Bullet list, Ordered list */}
          <button
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
            className={`p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors ${
              editor?.isActive('blockquote') ? 'text-blue-500 bg-slate-100 dark:bg-slate-900' : 'text-slate-550 dark:text-slate-400'
            }`}
            title="Blockquote"
          >
            <span className="font-serif font-extrabold text-xs block w-4 text-center">”</span>
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
            className={`p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors ${
              editor?.isActive('codeBlock') ? 'text-blue-500 bg-slate-100 dark:bg-slate-900' : 'text-slate-550 dark:text-slate-400'
            }`}
            title="Code Block"
          >
            <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 00-2 2z" />
            </svg>
          </button>
          {editor?.isActive('codeBlock') ? (
            <select
              value={String(editor.getAttributes('codeBlock').language || 'code')}
              onChange={event => editor.chain().focus().updateAttributes('codeBlock', { language: event.target.value }).run()}
              className="rounded-lg border border-slate-200 bg-transparent px-2 py-1 text-[10px] font-bold text-slate-600 outline-none focus:border-blue-500 dark:border-slate-800 dark:text-slate-300"
              aria-label="Code language"
            >
              <option value="code">Plain text</option>
              <option value="js">JavaScript</option>
              <option value="ts">TypeScript</option>
              <option value="tsx">TSX</option>
              <option value="python">Python</option>
              <option value="bash">Bash</option>
              <option value="json">JSON</option>
              <option value="css">CSS</option>
              <option value="html">HTML</option>
            </select>
          ) : null}
          <button
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors ${
              editor?.isActive('bulletList') ? 'text-blue-500 bg-slate-100 dark:bg-slate-900' : 'text-slate-550 dark:text-slate-400'
            }`}
            title="Bullet List"
          >
            <svg className="w-4 h-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={`p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors ${
              editor?.isActive('orderedList') ? 'text-blue-500 bg-slate-100 dark:bg-slate-900' : 'text-slate-550 dark:text-slate-400'
            }`}
            title="Ordered List"
          >
            <span className="font-extrabold text-[10px] block w-4 text-center">1.</span>
          </button>

          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1.5" />

          {/* Callout */}
          <button
            onClick={() => editor?.chain().focus().insertContent({ type: 'callout', content: [{ type: 'paragraph', content: [] }] }).run()}
            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-[10px] font-bold text-slate-550 dark:text-slate-400"
            title="Callout Box"
          >
            <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded text-[10px]">Callout</span>
          </button>

          {/* Image */}
          <button
            onClick={triggerImagePicker}
            disabled={isUploading}
            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-[10px] font-bold text-slate-550 dark:text-slate-400 disabled:opacity-50"
            title="Upload Image"
          >
            <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-450 px-2 py-0.5 rounded text-[10px]">
              {isUploading ? 'Uploading...' : 'Image'}
            </span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={handleImageFile}
            className="hidden"
          />
          {uploadError ? (
            <span className="text-[10px] font-semibold text-red-500 ml-2 max-w-40 truncate" title={uploadError}>
              {uploadError}
            </span>
          ) : null}
        </div>

        {/* Shortcuts */}
        <button
          onClick={onOpenShortcutsHelp}
          className="hidden items-center justify-center rounded-lg border border-slate-200 p-1.5 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-700 dark:border-slate-800 dark:text-slate-500 dark:hover:bg-slate-900 dark:hover:text-slate-350 sm:flex"
          title="Keyboard Shortcuts"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 relative overflow-y-auto px-6 py-8 bg-transparent text-slate-800 dark:text-slate-200 focus:outline-none">

        {/* Hover/Focus Block Menu Affordance */}
        {editor && showSideMenu && sideMenuTop !== null && (
          <div
            className="absolute left-1 z-30 transition-all duration-150 md:left-4"
            style={{ top: `${sideMenuTop}px`, transform: 'translateY(-50%)' }}
          >
            <button
              onClick={() => setShowBlockMenu(!showBlockMenu)}
              className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 border border-slate-250 dark:border-slate-700/80 flex items-center justify-center text-slate-600 dark:text-slate-350 hover:text-blue-500 dark:hover:text-blue-450 transition-colors shadow-sm focus:outline-none"
              title="Insert block"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </button>

            {showBlockMenu && (
              <div className="absolute left-7 top-0 w-48 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md p-1.5 shadow-xl ring-1 ring-black/5 select-none animate-in fade-in slide-in-from-left-1 duration-100">
                <button
                  onClick={() => {
                    editor.chain().focus().setParagraph().run();
                    setShowBlockMenu(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs font-bold text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900/60"
                >
                  <span className="w-4 text-center text-[10px] font-extrabold text-slate-400">T</span>
                  Paragraph
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().toggleHeading({ level: 2 }).run();
                    setShowBlockMenu(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors"
                >
                  <span className="font-extrabold text-[10px] text-slate-400 w-4">H2</span>
                  Heading 2
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().toggleHeading({ level: 3 }).run();
                    setShowBlockMenu(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors"
                >
                  <span className="font-extrabold text-[10px] text-slate-400 w-4">H3</span>
                  Heading 3
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().toggleBulletList().run();
                    setShowBlockMenu(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors"
                >
                  <svg className="w-3.5 h-3.5 text-slate-450" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  Bullet List
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().toggleOrderedList().run();
                    setShowBlockMenu(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors"
                >
                  <span className="font-extrabold text-[10px] text-slate-400 w-4 text-center">1.</span>
                  Numbered List
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().toggleBlockquote().run();
                    setShowBlockMenu(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors"
                >
                  <span className="font-serif font-extrabold text-[12px] text-slate-400 w-4 text-center">”</span>
                  Blockquote
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().toggleCodeBlock().run();
                    setShowBlockMenu(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors"
                >
                  <svg className="w-3.5 h-3.5 text-slate-450" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Code Block
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().insertContent({ type: 'callout', content: [{ type: 'paragraph', content: [] }] }).run();
                    setShowBlockMenu(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors"
                >
                  <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 px-1 py-0.2 rounded text-[9px] w-4 text-center font-bold">C</span>
                  Callout Box
                </button>
                <button
                  onClick={() => {
                    triggerImagePicker();
                    setShowBlockMenu(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors"
                >
                  <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-450 px-1 py-0.2 rounded text-[9px] w-4 text-center font-bold">I</span>
                  Upload Image
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().setHorizontalRule().run();
                    setShowBlockMenu(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors"
                >
                  <span className="text-slate-400 w-4 text-center font-bold">—</span>
                  Horizontal Line
                </button>
              </div>
            )}
          </div>
        )}

        {/* Text Selection Bubble Menu */}
        {editor && (
          <BubbleMenu
            editor={editor}
            className="z-40"
          >
            {showLinkInput ? (
              <form
                onSubmit={event => {
                  event.preventDefault();
                  applyLink();
                }}
                className="flex items-center gap-1.5 p-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl rounded-xl"
              >
                <input
                  type="text"
                  value={linkUrl}
                  onChange={e => setLinkUrl(e.target.value)}
                  placeholder="https://..."
                  className="px-2.5 py-1.5 text-xs border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-semibold"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs bg-slate-900 dark:bg-white text-white dark:text-black rounded-lg font-bold hover:bg-slate-850 dark:hover:bg-slate-200 transition-colors"
                >
                  Apply
                </button>
                <button
                  type="button"
                  onClick={() => setShowLinkInput(false)}
                  className="px-2 py-1.5 text-xs text-slate-450 hover:text-slate-650 dark:hover:text-slate-350 font-bold"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-0.5 p-1 bg-white/95 dark:bg-slate-955/95 backdrop-blur-md shadow-xl rounded-full border border-slate-200/50 dark:border-slate-800/80">
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors ${
                    editor.isActive('bold') ? 'text-blue-500 bg-slate-100 dark:bg-slate-900' : 'text-slate-550 dark:text-slate-450'
                  }`}
                  title="Bold"
                >
                  <span className="font-bold text-xs block w-4 text-center">B</span>
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors ${
                    editor.isActive('italic') ? 'text-blue-500 bg-slate-100 dark:bg-slate-900' : 'text-slate-550 dark:text-slate-450'
                  }`}
                  title="Italic"
                >
                  <span className="italic font-serif font-bold text-xs block w-4 text-center">I</span>
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleCode().run()}
                  className={`p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors ${
                    editor.isActive('code') ? 'text-blue-500 bg-slate-100 dark:bg-slate-900' : 'text-slate-550 dark:text-slate-450'
                  }`}
                  title="Inline Code"
                >
                  <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </button>
                <button
                  onClick={() => openLinkEditor('bubble')}
                  className={`p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors ${
                    editor.isActive('link') ? 'text-blue-500 bg-slate-100 dark:bg-slate-900' : 'text-slate-550 dark:text-slate-450'
                  }`}
                  title="Link"
                >
                  <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </button>
              </div>
            )}
          </BubbleMenu>
        )}

        {/* Tiptap Canvas */}
        <EditorContent editor={editor} />
      </div>

      {/* Status Bar */}
      <div className="px-6 py-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-450 select-none">
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
