'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'GitHub', href: '#github' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Use IntersectionObserver to determine active section and avoid forced reflows
    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = navItems.map(item => item.href.substring(1));
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'py-2 shadow-lg shadow-black/5 dark:shadow-black/30'
            : 'py-4'
        }`}
      >
        {/* Glassmorphic background layer */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          scrolled
            ? 'bg-white/80 dark:bg-[#0b1426]/80 backdrop-blur-2xl border-b border-slate-200/40 dark:border-white/10'
            : 'bg-transparent'
        }`} />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={e => handleClick(e, '#home')}
            className="flex items-center gap-2 group z-10"
          >
            <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
              Emran Hossen
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 z-10">
            {navItems.map(item => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={e => handleClick(e, item.href)}
                  className={`relative px-4 py-2 rounded-lg text-[13px] font-semibold tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-[2px] rounded-full bg-indigo-600 dark:bg-indigo-400" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA + Mobile Toggle */}
          <div className="flex items-center gap-3 z-10">
            <a
              href="#contact"
              onClick={e => handleClick(e, '#contact')}
              className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-[13px] font-semibold shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              Hire Me
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-100/80 dark:bg-zinc-900/80 border border-slate-200/50 dark:border-zinc-800/50 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-screen Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl" />
          <nav className="relative flex flex-col items-center justify-center h-full gap-6 p-8">
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={e => handleClick(e, item.href)}
                  style={{ animationDelay: `${idx * 50}ms` }}
                  className={`text-2xl font-bold tracking-wide transition-all duration-300 animate-fade-in ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={e => handleClick(e, '#contact')}
              className="mt-4 px-10 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 text-white font-bold text-lg shadow-xl shadow-indigo-600/20 transition-all"
            >
              Hire Me
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
