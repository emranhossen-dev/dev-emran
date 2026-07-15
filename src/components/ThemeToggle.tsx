'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    let initialTheme: 'light' | 'dark' = 'dark';

    if (savedTheme) {
      initialTheme = savedTheme;
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      initialTheme = prefersDark ? 'dark' : 'light';
    }

    document.documentElement.classList.toggle('dark', initialTheme === 'dark');

    const timer = setTimeout(() => {
      setTheme(initialTheme);
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  if (!mounted) {
    return (
      <div className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-slate-200/50 dark:bg-zinc-800/50 animate-pulse border border-slate-300 dark:border-zinc-700" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full glass-panel shadow-xl text-slate-800 dark:text-zinc-100 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer border border-white/20 dark:border-white/5"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-amber-400 animate-pulse" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-600" />
      )}
    </button>
  );
}
