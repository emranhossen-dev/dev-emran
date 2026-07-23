'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check initial theme state on mount
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const isDark = savedTheme
      ? savedTheme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches || document.documentElement.classList.contains('dark');

    if (isDark) {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const isDarkNow = document.documentElement.classList.contains('dark');
    if (isDarkNow) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="fixed bottom-6 right-6 z-[999] flex items-center justify-center gap-2 px-3.5 py-3 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white shadow-2xl border-2 border-indigo-500/40 hover:border-indigo-500 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer backdrop-blur-xl group"
      aria-label="Toggle Light and Dark Theme"
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
          <span className="text-xs font-bold tracking-wide text-amber-400 pr-1">Light</span>
        </>
      ) : (
        <>
          <Moon className="w-5 h-5 text-indigo-600 group-hover:-rotate-12 transition-transform duration-300" />
          <span className="text-xs font-bold tracking-wide text-indigo-600 pr-1">Dark</span>
        </>
      )}
    </button>
  );
}
