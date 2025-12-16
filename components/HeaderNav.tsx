'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';

const navItems = [
  { name: 'Home', href: '#' },
  { name: 'Services', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blog', href: '#blog' },
];

// Sun icon for light mode
const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

// Moon icon for dark mode
const MoonIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

export default function HeaderNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4"
    >
      <div
        className={`
          relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 h-14 overflow-visible
          ${scrolled
            ? 'bg-white/50 dark:bg-black/50 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg w-[90%] max-w-5xl'
            : 'bg-transparent w-full max-w-6xl'}
        `}
      >
        {/* Glass Background for non-scrolled state */}
        {!scrolled && (
          <div className="absolute inset-0 bg-black/5 dark:bg-white/5 backdrop-blur-md rounded-full border border-black/5 dark:border-white/5 -z-10" />
        )}

        {/* Logo Area */}
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 287.0050963399838 149.5127942560963"
            className="relative z-10 h-16 w-auto text-slate-900 dark:text-white"
            fill="currentColor"
          >
            <g transform="translate(143.5025481699919, 74.75639712804815) rotate(-5) translate(-143.5025481699919, -74.75639712804815)">
              <g transform="translate(31.2, 93.20603899734999)">
                <path d="M45.28-52.32C32.64-48.88 10-36.16 9.20-24.16C8.40-12.32 39.20-11.92 37.76-4.64C36.32 2.88 16.16 3.28 10.88 1.12C9.12 0.32 8.80 1.28 8.80 2.88C8.88 9.60 12.40 12.48 16.96 12.24C27.36 11.76 39.92 4 41.44-4.16C43.68-16.08 15.68-14.16 18-24C19.76-31.52 36.88-44.08 48.56-48.08C52-49.28 57.20-50.56 55.44-45.68C52.48-37.84 40.56-20.40 33.92-20.40C32.16-20.40 31.44-21.76 31.44-23.20C31.44-28 40.96-34.88 45.12-36C47.28-36 43.76-41.84 42-41.28C37.04-38.40 28.40-29.84 28.40-23.52C28.40-20.56 30.32-18.08 34.40-18.08C43.92-18.08 58.08-33.44 60.32-44.80C62.16-54.16 51.44-54 45.28-52.32ZM72.08-14C70.48-11.20 67.68-6.56 65.36-4.80C63.92-3.76 62.64-4 63.52-6.56C64.56-9.68 67.52-13.84 69.52-17.20C71.52-20.88 66.56-23.44 64.80-20.40C62.80-17.60 60.96-14.56 59.12-11.92C57.12-9.36 54.96-7.20 53.44-6.08C52.72-5.52 50.56-3.92 50.80-6.08C51.12-8.80 57.76-18.56 59.36-20C61.04-22.72 56.64-25.76 54.72-23.60C51.76-20.32 45.44-11.84 44.72-6.72C43.76 0.64 49.52 1.36 54.56-4.08C55.52-5.12 56.48-6.24 57.36-7.12C56.08-2.24 59.68 1.68 64.24-0.72C68.32-2.80 72.40-10 74.56-13.92C75.12-14.96 72.48-14.64 72.08-14ZM86.40-21.60C83.84-19.28 79.28-13.92 78.40-12.72L81.84-19.52C83.12-21.76 78.56-24.32 77.20-22.56C75.04-19.92 69.28-10 68.08-6.24C66.40-0.56 72.64 2.64 74.16-1.04C75.04-3.12 76.16-6.24 77.60-8.08C78.88-9.76 81.52-13.28 84-16.24C84.96-17.44 84.24-16.32 84-15.60C82.72-12.40 85.20-11.04 87.44-12.64C88.48-13.44 90.56-16.32 91.44-18.56C92.80-22.24 89.60-24.48 86.40-21.60ZM111.84-31.20C112.32-34.64 110.80-36.24 108.72-36.40C106.48-36.64 103.92-34.72 101.60-31.84C95.92-25.04 83.44-2 81.84 6.08C80.64 12.16 87.20 15.04 92.32 9.20C96 5.04 99.52-4.72 100.88-10.08C104.64-9.68 107.04-10.48 108.80-12.96C110-14.72 108.16-15.68 106.96-14C106.08-12.64 104.16-11.76 101.28-12.48C101.60-14.40 101.36-15.76 100.56-16.56C103.92-18 111.28-26.32 111.84-31.20ZM90.08 7.68C88.40 9.60 87.28 9.12 88.80 5.20C90.88-0.16 94.32-6.96 96.56-10.96L98.32-10.32C97.28-6.16 93.04 4.48 90.08 7.68ZM100.56-19.28C101.36-21.68 104.88-27.60 106.88-30.80C108.88-34.08 110.08-34.08 109.92-32C109.44-27.52 103.52-20.88 100.56-19.28ZM98.72-12.96C98.32-13.12 97.92-13.20 97.60-13.44C97.76-13.84 98.24-14.56 98.40-14.96C99.04-14.48 98.88-13.52 98.72-12.96ZM128.08-31.20C128.56-34.64 127.04-36.24 124.96-36.40C122.72-36.64 120.16-34.72 117.84-31.84C112.16-25.04 99.68-2 98.08 6.08C96.88 12.16 103.44 15.04 108.56 9.20C112.24 5.04 115.76-4.72 117.12-10.08C120.88-9.68 123.28-10.48 125.04-12.96C126.24-14.72 124.40-15.68 123.20-14C122.32-12.64 120.40-11.76 117.52-12.48C117.84-14.40 117.60-15.76 116.80-16.56C120.16-18 127.52-26.32 128.08-31.20ZM106.32 7.68C104.64 9.60 103.52 9.12 105.04 5.20C107.12-0.16 110.56-6.96 112.80-10.96L114.56-10.32C113.52-6.16 109.28 4.48 106.32 7.68ZM116.80-19.28C117.60-21.68 121.12-27.60 123.12-30.80C125.12-34.08 126.32-34.08 126.16-32C125.68-27.52 119.76-20.88 116.80-19.28ZM114.96-12.96C114.56-13.12 114.16-13.20 113.84-13.44C114.00-13.84 114.48-14.56 114.64-14.96C115.28-14.48 115.12-13.52 114.96-12.96ZM144.32-31.20C144.80-34.64 143.28-36.24 141.20-36.40C138.96-36.64 136.40-34.72 134.08-31.84C128.40-25.04 115.92-2 114.32 6.08C113.12 12.16 119.68 15.04 124.80 9.20C128.48 5.04 132.00-4.72 133.36-10.08C137.12-9.68 139.52-10.48 141.28-12.96C142.48-14.72 140.64-15.68 139.44-14C138.56-12.64 136.64-11.76 133.76-12.48C134.08-14.40 133.84-15.76 133.04-16.56C136.40-18 143.76-26.32 144.32-31.20ZM122.56 7.68C120.88 9.60 119.76 9.12 121.28 5.20C123.36-0.16 126.80-6.96 129.04-10.96L130.80-10.32C129.76-6.16 125.52 4.48 122.56 7.68ZM133.04-19.28C133.84-21.68 137.36-27.60 139.36-30.80C141.36-34.08 142.56-34.08 142.40-32C141.92-27.52 136.00-20.88 133.04-19.28ZM131.20-12.96C130.80-13.12 130.40-13.20 130.08-13.44C130.24-13.84 130.72-14.56 130.88-14.96C131.52-14.48 131.36-13.52 131.20-12.96ZM164.32-13.92C161.04-8.88 157.20-4.08 153.20-1.76C156.24-6.88 158.88-12.08 161.92-17.20C164.08-20.88 158.08-23.44 156.16-20.40C154.48-17.36 152.48-14.80 150.48-11.92C148.48-9.36 146.32-7.20 144.80-6.08C144.16-5.52 141.92-3.92 142.16-6.08C142.56-8.80 149.20-18.56 150.72-20C152.40-22.72 148.00-25.76 146.08-23.60C143.20-20.32 136.88-11.84 136.16-6.72C135.12 0.64 140.96 1.36 146.00-4.08C146.96-5.12 147.92-6.24 148.80-7.12C147.12-4.08 145.44-1.20 144.00 1.28C139.36 2.72 130.40 5.12 130.24 10.96C130.08 15.84 134.80 17.36 138.72 15.60C144.00 13.12 148.00 6.80 151.12 2.08C155.52-0.08 161.28-5.92 165.84-12.96C166.64-14.24 164.88-14.88 164.32-13.92ZM134.32 12.64C133.04 12.96 131.92 12.64 132.00 10.96C132.16 6.80 140.08 4.48 142.32 4.08C140.40 6.88 136.72 11.92 134.32 12.64ZM189.20-13.92C185.92-8.88 182.08-4.08 178.08-1.76C181.12-6.88 183.76-12.08 186.80-17.20C188.96-20.88 182.96-23.44 181.04-20.40C179.36-17.36 177.36-14.80 175.36-11.92C173.36-9.36 171.20-7.20 169.68-6.08C169.04-5.52 166.80-3.92 167.04-6.08C167.44-8.80 174.08-18.56 175.60-20C177.28-22.72 172.88-25.76 170.96-23.60C168.08-20.32 161.76-11.84 161.04-6.72C160.00 0.64 165.84 1.36 170.88-4.08C171.84-5.12 172.80-6.24 173.68-7.12C172.00-4.08 170.32-1.20 168.88 1.28C164.24 2.72 155.28 5.12 155.12 10.96C154.96 15.84 159.68 17.36 163.60 15.60C168.88 13.12 172.88 6.80 176.00 2.08C180.40-0.08 186.16-5.92 190.72-12.96C191.52-14.24 189.76-14.88 189.20-13.92ZM159.20 12.64C157.92 12.96 156.80 12.64 156.88 10.96C157.04 6.80 164.96 4.48 167.20 4.08C165.28 6.88 161.60 11.92 159.20 12.64ZM214.08-13.92C210.80-8.88 206.96-4.08 202.96-1.76C206.00-6.88 208.64-12.08 211.68-17.20C213.84-20.88 207.84-23.44 205.92-20.40C204.24-17.36 202.24-14.80 200.24-11.92C198.24-9.36 196.08-7.20 194.56-6.08C193.92-5.52 191.68-3.92 191.92-6.08C192.32-8.80 198.96-18.56 200.48-20C202.16-22.72 197.76-25.76 195.84-23.60C192.96-20.32 186.64-11.84 185.92-6.72C184.88 0.64 190.72 1.36 195.76-4.08C196.72-5.12 197.68-6.24 198.56-7.12C196.88-4.08 195.20-1.20 193.76 1.28C189.12 2.72 180.16 5.12 180.00 10.96C179.84 15.84 184.56 17.36 188.48 15.60C193.76 13.12 197.76 6.80 200.88 2.08C205.28-0.08 211.04-5.92 215.60-12.96C216.40-14.24 214.64-14.88 214.08-13.92ZM184.08 12.64C182.80 12.96 181.68 12.64 181.76 10.96C181.92 6.80 189.84 4.48 192.08 4.08C190.16 6.88 186.48 11.92 184.08 12.64Z" fill="currentColor" />
              </g>
            </g>
          </svg>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right Side: Theme Toggle + Mobile Menu Button + CTA Button */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors text-slate-700 dark:text-white"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors text-slate-700 dark:text-white"
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* CTA Button */}
          <button className="px-5 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black text-sm font-bold hover:bg-slate-700 dark:hover:bg-gray-200 transition-colors shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            Contact Me
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-4 mt-2 w-48 py-2 bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl shadow-xl md:hidden"
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

