'use client';

import React from 'react';
import Image from 'next/image';

// Brand icons
const ReactIcon = () => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-7 h-7 text-cyan-400 fill-none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="0" cy="0" r="2.05" fill="currentColor" />
    <g>
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const NextjsIcon = () => (
  <svg viewBox="0 0 128 128" className="w-7 h-7 fill-current text-slate-900 dark:text-white">
    <circle cx="64" cy="64" r="64" fill="currentColor" className="opacity-10 dark:opacity-20" />
    <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm27.4 97.4l-42-62.2H42v55.8h-7.8V35.2h15.6l39.6 58.7V35.2h7.8v62.2h-7.8z" />
  </svg>
);

const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 text-sky-400 fill-current">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
  </svg>
);

const NodeIcon = () => (
  <svg viewBox="0 0 128 128" className="w-7 h-7 text-emerald-500 fill-current">
    <path d="M117.4 33.1L67.7 4.4c-2.3-1.3-5.1-1.3-7.4 0L10.6 33.1C8.3 34.4 6.9 36.8 6.9 39.5v57.4c0 2.6 1.4 5.1 3.7 6.4l49.7 28.7c2.3 1.3 5.1 1.3 7.4 0l49.7-28.7c2.3-1.3 3.7-3.8 3.7-6.4V39.5c0-2.7-1.4-5.1-3.7-6.4zM64 96.2c-17.8 0-32.2-14.4-32.2-32.2S46.2 31.8 64 31.8s32.2 14.4 32.2 32.2-14.4 32.2-32.2 32.2z" />
  </svg>
);

const ExpressIcon = () => (
  <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-zinc-800 border border-slate-200/50 dark:border-zinc-700/50 font-sans font-bold text-[9px] text-slate-800 dark:text-zinc-200 tracking-wider">
    ex
  </div>
);

const MongoIcon = () => (
  <svg viewBox="0 0 64 64" className="w-7 h-7 text-emerald-600 fill-current">
    <path d="M31.1 1.7C29.4 6 22 23.3 22 34.6c0 10.6 8 16.7 10 16.7 1.8 0 10-6.1 10-16.7C42 23.3 34.6 6 32.9 1.7c-.3-.8-1.5-.8-1.8 0zM32 46.2V5.5c2.3 8.3 7.8 22.8 7.8 29.1 0 7-4.4 10.9-7.8 11.6zM32 55.4v6.9c0 .9-.7 1.7-1.7 1.7-.9 0-1.7-.7-1.7-1.7v-6.9h3.4z" />
  </svg>
);

const PostgresIcon = () => (
  <svg viewBox="0 0 128 128" className="w-7 h-7 text-sky-600 fill-current">
    <path d="M123.6 57.5c-.6-3.5-3-6.4-6.4-7.8-1-.4-2-.7-3.1-.9 2.2-6.5-.4-13.8-6.1-17.6-5-3.4-11.2-4.1-16.8-2-3.8-9.4-13-15.6-23.1-15.6-5.8 0-11.4 2-16 5.6C44.7 13.9 33 21.8 26 33.1c-1.5-1.1-3.2-1.9-5.1-2.4-3.5-.9-7.2-.6-10.4 1C7 33.5 4.3 36.4 3 40.2c-1.3 3.8-1.1 8 .5 11.6 1 2.3 2.6 4.3 4.6 5.7.3.2.7.4 1 .6-.6 1.8-.9 3.7-.9 5.6 0 10.6 6.3 19.8 15.6 23.6 1.2 5.5 4.8 10.2 9.8 12.9 2.9 1.6 6.2 2.4 9.5 2.4 1 0 2 0 3-.2V92.2c0-5 3.3-9.4 8.1-10.8 1-.3 2.1-.4 3.2-.4h6c5 0 9.4 3.3 10.8 8.1.3 1 .4 2.1.4 3.2v10.2c3-.4 5.9-1.5 8.4-3.2 5-3.4 8.2-8.9 8.7-15 .8.3 1.6.4 2.5.4 3.5 0 6.7-1.8 8.4-4.8l2.1-3.6c.5-.9.8-1.9.8-3 0-1.8-.8-3.5-2.2-4.7 1.4-1.2 2.2-3 2.2-4.8 0-1.5-.6-3-1.6-4.1z" />
  </svg>
);

export default function AboutMe() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-50/30 dark:bg-black/10">
      {/* Decorative Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/3 blur-[80px] animate-pulse-glow" />

      {/* Embedded styles for component-specific floating animations */}
      <style>{`
        @keyframes float-badge-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(3deg); }
        }
        @keyframes float-badge-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-4deg); }
        }
        @keyframes float-badge-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        .float-badge-1 { animation: float-badge-1 5.5s ease-in-out infinite; }
        .float-badge-2 { animation: float-badge-2 4.5s ease-in-out infinite; }
        .float-badge-3 { animation: float-badge-3 6.5s ease-in-out infinite; }
      `}</style>

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

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image Card with Floating Badges */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] group">
              
              {/* Outer Card with Glassmorphism */}
              <div className="p-4 pb-6 rounded-3xl bg-white/40 dark:bg-zinc-900/40 border border-slate-200/60 dark:border-zinc-800/60 shadow-xl shadow-slate-100/50 dark:shadow-none backdrop-blur-sm relative z-10">
                
                {/* Image Wrapper */}
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 dark:bg-zinc-950 border border-slate-200/40 dark:border-zinc-800/40">
                  <Image
                    src="/emran-hossen-full-stack-developer-photo.jpg"
                    alt="Emran Hossen - Full Stack Developer Portrait"
                    fill
                    sizes="(max-width: 768px) 100vw, 340px"
                    className="object-cover object-center"
                    priority
                  />
                </div>
                
                {/* Social/User Tag */}
                <div className="mt-4 flex justify-center">
                  <span className="px-4 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/50 dark:border-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold font-mono tracking-wide">
                    @emranhossen
                  </span>
                </div>
              </div>

              {/* Floating Experience Badge */}
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-tr from-indigo-600 to-violet-600 text-white px-5 py-3.5 rounded-2xl shadow-xl shadow-indigo-500/30 dark:shadow-indigo-500/10 flex flex-col items-center justify-center text-center border border-indigo-400/20 z-20 transform hover:scale-105 transition-transform duration-300">
                <span className="text-2xl font-black leading-none">2+</span>
                <span className="text-[10px] font-bold uppercase tracking-wider mt-1 opacity-90 leading-tight">
                  Years of<br />Experience
                </span>
              </div>

              {/* Floating Tech Badges surrounding the main photo card */}
              {/* React Badge */}
              <div className="absolute top-[6%] left-[-8%] float-badge-1 group cursor-default z-20">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/95 dark:bg-zinc-950/90 border border-slate-200/50 dark:border-zinc-850/80 shadow-md hover:scale-110 hover:border-cyan-450 hover:shadow-cyan-500/20 dark:hover:shadow-cyan-500/40 transition-all duration-300">
                  <ReactIcon />
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900/90 text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm z-30">
                  React
                </div>
              </div>

              {/* Next.js Badge */}
              <div className="absolute -top-[6%] left-[38%] float-badge-2 group cursor-default z-20">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/95 dark:bg-zinc-950/90 border border-slate-200/50 dark:border-zinc-850/80 shadow-md hover:scale-110 hover:border-slate-400 hover:shadow-slate-500/20 dark:hover:shadow-white/20 transition-all duration-300">
                  <NextjsIcon />
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900/90 text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm z-30">
                  Next.js
                </div>
              </div>

              {/* Tailwind CSS Badge */}
              <div className="absolute top-[6%] right-[-8%] float-badge-3 group cursor-default z-20">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/95 dark:bg-zinc-950/90 border border-slate-200/50 dark:border-zinc-850/80 shadow-md hover:scale-110 hover:border-sky-400 hover:shadow-sky-500/20 dark:hover:shadow-sky-500/40 transition-all duration-300">
                  <TailwindIcon />
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900/90 text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm z-30">
                  Tailwind CSS
                </div>
              </div>

              {/* Node.js Badge */}
              <div className="absolute top-[38%] left-[-11%] float-badge-3 group cursor-default z-20">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/95 dark:bg-zinc-950/90 border border-slate-200/50 dark:border-zinc-855/80 shadow-md hover:scale-110 hover:border-emerald-400 hover:shadow-emerald-500/20 dark:hover:shadow-emerald-500/40 transition-all duration-300">
                  <NodeIcon />
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900/90 text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm z-30">
                  Node.js
                </div>
              </div>

              {/* Express.js Badge */}
              <div className="absolute top-[38%] right-[-11%] float-badge-2 group cursor-default z-20">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/95 dark:bg-zinc-950/90 border border-slate-200/50 dark:border-zinc-850/80 shadow-md hover:scale-110 hover:border-zinc-400 hover:shadow-zinc-500/20 dark:hover:shadow-zinc-500/40 transition-all duration-300">
                  <ExpressIcon />
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900/90 text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm z-30">
                  Express.js
                </div>
              </div>

              {/* MongoDB Badge */}
              <div className="absolute bottom-[4%] left-[-4%] float-badge-2 group cursor-default z-20">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/95 dark:bg-zinc-950/90 border border-slate-200/50 dark:border-zinc-850/80 shadow-md hover:scale-110 hover:border-emerald-500 hover:shadow-emerald-650/20 dark:hover:shadow-emerald-600/40 transition-all duration-300">
                  <MongoIcon />
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900/90 text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm z-30">
                  MongoDB
                </div>
              </div>

              {/* PostgreSQL Badge */}
              <div className="absolute bottom-[4%] right-[-4%] float-badge-1 group cursor-default z-20">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/95 dark:bg-zinc-950/90 border border-slate-200/50 dark:border-zinc-850/80 shadow-md hover:scale-110 hover:border-sky-500 hover:shadow-sky-650/20 dark:hover:shadow-sky-600/40 transition-all duration-300">
                  <PostgresIcon />
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900/90 text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm z-30">
                  PostgreSQL
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Paragraphs + Stats Grid */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Paragraphs */}
            <div className="space-y-4 text-slate-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
              <p>
                Hi! I&apos;m <strong className="text-slate-900 dark:text-white font-bold">Emran Hossen</strong>, a passionate frontend developer with 2+ years of hands-on experience building modern web applications.
              </p>
              <p>
                My core stack includes <strong className="text-slate-850 dark:text-zinc-250 font-semibold">React, Next.js, Node.js, and various databases</strong>. I genuinely enjoy solving complex problems and translating ideas into seamless digital experiences. Clean architecture and maintainable code are things I care deeply about.
              </p>
              <p>
                When I&apos;m not coding, I&apos;m exploring new frameworks, contributing to open source, or deepening my system design knowledge.
              </p>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Card 1: Projects */}
              <div className="p-5 rounded-2xl bg-white/40 dark:bg-zinc-900/30 border border-slate-200/50 dark:border-zinc-800/60 shadow-md backdrop-blur-sm hover:border-indigo-300/40 dark:hover:border-indigo-700/40 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-center items-start">
                <span className="text-2xl">⚡</span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-3">20+</span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mt-1.5">Projects Built</span>
              </div>

              {/* Card 2: Clients */}
              <div className="p-5 rounded-2xl bg-white/40 dark:bg-zinc-900/30 border border-slate-200/50 dark:border-zinc-800/60 shadow-md backdrop-blur-sm hover:border-indigo-300/40 dark:hover:border-indigo-700/40 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-center items-start">
                <span className="text-2xl">🎯</span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-3">5+</span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mt-1.5">Happy Clients</span>
              </div>

              {/* Card 3: Commits */}
              <div className="p-5 rounded-2xl bg-white/40 dark:bg-zinc-900/30 border border-slate-200/50 dark:border-zinc-800/60 shadow-md backdrop-blur-sm hover:border-indigo-300/40 dark:hover:border-indigo-700/40 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-center items-start">
                <span className="text-2xl">🔥</span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-3">300+</span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mt-1.5">GitHub Commits</span>
              </div>

              {/* Card 4: Coffee/Ice-Cream */}
              <div className="p-5 rounded-2xl bg-white/40 dark:bg-zinc-900/30 border border-slate-200/50 dark:border-zinc-800/60 shadow-md backdrop-blur-sm hover:border-indigo-300/40 dark:hover:border-indigo-700/40 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-center items-start">
                <span className="text-2xl">🍦</span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-3">∞</span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mt-1.5">Cups of Ice-Cream</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
