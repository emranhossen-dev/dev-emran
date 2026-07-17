'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Code2, Globe, Database, Palette, Server, Smartphone, GitBranch, ChevronLeft, ChevronRight } from 'lucide-react';

const services = [
  {
    icon: <Globe className="w-7 h-7" />,
    title: "Web Development",
    desc: "I build responsive, high-performance websites using modern frameworks like React, Next.js, and Tailwind CSS with pixel-perfect design execution.",
    color: "from-indigo-500 to-violet-500",
    borderColor: "hover:border-indigo-500/30",
  },
  {
    icon: <Server className="w-7 h-7" />,
    title: "Backend Development",
    desc: "Designing robust RESTful APIs and server architectures using Node.js, Express, with PostgreSQL, MongoDB, and Supabase for data management.",
    color: "from-emerald-500 to-teal-500",
    borderColor: "hover:border-emerald-500/30",
  },
  {
    icon: <Database className="w-7 h-7" />,
    title: "Database Design",
    desc: "Architecting scalable database schemas, writing optimized queries, and managing data pipelines across relational and NoSQL systems.",
    color: "from-amber-500 to-orange-500",
    borderColor: "hover:border-amber-500/30",
  },
  {
    icon: <Palette className="w-7 h-7" />,
    title: "UI/UX Design",
    desc: "Creating intuitive, visually stunning interfaces with modern design principles — glassmorphism, micro-animations, and responsive layouts.",
    color: "from-pink-500 to-rose-500",
    borderColor: "hover:border-pink-500/30",
  },
  {
    icon: <Code2 className="w-7 h-7" />,
    title: "Full Stack Solutions",
    desc: "End-to-end application development — from concept to deployment. LMS platforms, e-commerce stores, admin dashboards, and SaaS tools.",
    color: "from-cyan-500 to-blue-500",
    borderColor: "hover:border-cyan-500/30",
  },
  {
    icon: <Smartphone className="w-7 h-7" />,
    title: "API Integration",
    desc: "Integrating third-party APIs, payment gateways (Stripe, SSLCommerz), authentication providers, and cloud services into web applications.",
    color: "from-purple-500 to-fuchsia-500",
    borderColor: "hover:border-purple-500/30",
  },
  {
    icon: <GitBranch className="w-7 h-7" />,
    title: "Version Control",
    desc: "Professional Git workflow management, CI/CD pipelines, code reviews, and deployment automation using GitHub, Vercel, and Netlify.",
    color: "from-sky-500 to-indigo-500",
    borderColor: "hover:border-sky-500/30",
  },
];

const stats = [
  { value: "1+", label: "Years Experience", icon: "🚀" },
  { value: "7+", label: "Projects Completed", icon: "💼" },
  { value: "10+", label: "Technologies", icon: "⚡" },
  { value: "100%", label: "Client Satisfaction", icon: "⭐" },
];

export default function AboutMe() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('div')?.offsetWidth ?? 340;
    const scrollAmount = direction === 'left' ? -(cardWidth + 24) : (cardWidth + 24);
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setIsAutoScrolling(false);
  };

  // Auto-scroll carousel
  useEffect(() => {
    if (!isAutoScrolling) {
      // Resume auto-scroll after 5 seconds of no interaction
      const resumeTimer = setTimeout(() => setIsAutoScrolling(true), 5000);
      return () => clearTimeout(resumeTimer);
    }

    autoScrollTimer.current = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;

      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 5) {
        // Reset to start
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const cardWidth = el.querySelector('div')?.offsetWidth ?? 340;
        el.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
      }
    }, 3000);

    return () => {
      if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
    };
  }, [isAutoScrolling]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollButtons, { passive: true });
    updateScrollButtons();
    return () => el.removeEventListener('scroll', updateScrollButtons);
  }, [updateScrollButtons]);

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/3 blur-[80px] animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/50 dark:border-indigo-800/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Get to know <span className="text-gradient">my story</span>
          </h2>
        </div>

        {/* Intro + Stats Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-20">

          {/* Intro Text */}
          <div className="lg:col-span-3 space-y-5">
            <div className="p-7 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-slate-200/60 dark:border-zinc-800/60 backdrop-blur-sm space-y-4">
              <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
                Hi, I am <strong className="text-slate-900 dark:text-white">Emran Hossen</strong> — a passionate Full Stack Web Developer from Bangladesh. My coding journey started with curiosity about how the web works. Building basic HTML pages quickly expanded into learning JavaScript, and I was hooked.
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
                From making interactive buttons to architecting state managers in React, I love the feeling of constructing something that lives on the screen. I thrive on solving architectural puzzles — whether it&apos;s crafting smooth, micro-animated client views using Tailwind and Next.js, or structuring schema migrations in PostgreSQL.
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
                Outside of coding, I enjoy playing <strong className="text-slate-800 dark:text-zinc-200">cricket &amp; football</strong>, exploring new tech blogs, and occasionally sketching UI concepts. I believe great software is built at the intersection of clean code and thoughtful design.
              </p>
            </div>

            {/* Personality Tags */}
            <div className="flex flex-wrap gap-2">
              {["Problem Solver", "Detail Oriented", "Constant Learner", "Team Player", "Clean Code Advocate", "UX Enthusiast"].map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white/60 dark:bg-zinc-900/60 border border-slate-200/50 dark:border-zinc-800/60 text-slate-600 dark:text-zinc-400 hover:border-indigo-400/30 dark:hover:border-indigo-600/30 transition"
                >
                  ✨ {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-slate-200/60 dark:border-zinc-800/60 backdrop-blur-sm text-center hover:border-indigo-300/40 dark:hover:border-indigo-700/40 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col items-center justify-center gap-2"
              >
                <span className="text-2xl">{stat.icon}</span>
                <span className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</span>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Services I Offer */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/50 dark:border-indigo-800/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">
                What I Do
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Services I <span className="text-gradient">Offer</span>
              </h3>
            </div>

            {/* Carousel Controls */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="p-2.5 rounded-xl border border-slate-200/60 dark:border-zinc-800/60 text-slate-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="p-2.5 rounded-xl border border-slate-200/60 dark:border-zinc-800/60 text-slate-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Horizontal Scrolling Carousel */}
          <div
            ref={scrollRef}
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
            onTouchStart={() => setIsAutoScrolling(false)}
            onTouchEnd={() => setIsAutoScrolling(true)}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {services.map((service, idx) => (
              <div
                key={idx}
                className={`flex-shrink-0 w-[300px] sm:w-[340px] snap-start p-6 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-slate-200/60 dark:border-zinc-800/60 backdrop-blur-sm ${service.borderColor} hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 group flex flex-col`}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-5 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                  {service.icon}
                </div>

                {/* Content */}
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{service.title}</h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 leading-relaxed flex-1">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
