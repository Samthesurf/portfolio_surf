'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShortcutsHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShortcutsHelp({ isOpen, onClose }: ShortcutsHelpProps) {
  const shortcuts = [
    { keys: ['Ctrl', 'S'], desc: 'Save the current article now' },
    { keys: ['Ctrl', 'P'], desc: 'Toggle between writing and preview' },
    { keys: ['Ctrl', 'B'], desc: 'Bold the selected text' },
    { keys: ['Ctrl', 'I'], desc: 'Italicize the selected text' },
    { keys: ['Ctrl', 'K'], desc: 'Add or edit a link' },
    { keys: ['Ctrl', 'Alt', '2'], desc: 'Turn the current block into Heading 2' },
    { keys: ['Ctrl', 'Alt', '3'], desc: 'Turn the current block into Heading 3' },
    { keys: ['Ctrl', 'Shift', '8'], desc: 'Toggle a bulleted list' },
    { keys: ['Ctrl', 'Shift', '7'], desc: 'Toggle a numbered list' },
    { keys: ['Ctrl', 'Shift', 'B'], desc: 'Toggle a blockquote' },
    { keys: ['Ctrl', 'Alt', '0'], desc: 'Toggle a code block' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-6 text-left focus:outline-none"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
              <h3 className="text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m-5 4a3 3 0 102.5 1.5M4 17a3 3 0 01-3-3V5a3 3 0 013-3h16a3 3 0 013 3v9a3 3 0 01-3 3H4z" />
                </svg>
                Keyboard Shortcuts
              </h3>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                aria-label="Close dialog"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Speed up your writing workflow in the studio using these standard shortcuts. Note: on macOS you can use either <kbd className="px-1.5 py-0.5 text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-600 dark:text-slate-350">Ctrl</kbd> or <kbd className="px-1.5 py-0.5 text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-600 dark:text-slate-350">Cmd</kbd>.
            </p>

            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {shortcuts.map((shortcut, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-1.5 border-b border-slate-50 dark:border-slate-800/50 last:border-0"
                >
                  <span className="text-sm text-slate-650 dark:text-slate-300 font-medium">
                    {shortcut.desc}
                  </span>
                  <div className="flex gap-1.5">
                    {shortcut.keys.map((key, keyIdx) => (
                      <kbd
                        key={keyIdx}
                        className="min-w-[24px] text-center px-1.5 py-0.5 text-xs font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded shadow-sm"
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-750 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
