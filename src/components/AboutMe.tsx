'use client';

import React from 'react';

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
    <section id="about" className="py-24 relative overflow-hidden bg-slate-50/30 dark:bg-black/20">
      {/* Decorative Background Glows */}
      <div className="absolute top-1/3 left-1/4 w-[320px] h-[320px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/3 blur-[90px] animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-pink-500/5 dark:bg-pink-500/2 blur-[100px] animate-pulse-glow" style={{ animationDelay: '4s' }} />

      {/* Embedded styles for component-specific animations */}
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
        @keyframes typing-left-hand {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @keyframes typing-right-hand {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(2.5px); }
        }
        @keyframes terminal-scroll-lines {
          0% { transform: translateY(0); }
          100% { transform: translateY(-90px); }
        }
        @keyframes screen-pulsing {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        .float-badge-1 { animation: float-badge-1 5.5s ease-in-out infinite; }
        .float-badge-2 { animation: float-badge-2 4.5s ease-in-out infinite; }
        .float-badge-3 { animation: float-badge-3 6.5s ease-in-out infinite; }
        .hand-left { animation: typing-left-hand 0.25s infinite ease-in-out; }
        .hand-right { animation: typing-right-hand 0.25s infinite ease-in-out 0.12s; }
        .code-scroll { animation: terminal-scroll-lines 12s infinite linear; }
        .screen-pulse { animation: screen-pulsing 4s ease-in-out infinite; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/50 dark:border-indigo-800/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Get to know <span className="text-gradient">my story</span>
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Live Animated Illustration + Floating Icons */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[420px] aspect-[4/3] flex items-center justify-center bg-slate-100/50 dark:bg-zinc-900/30 rounded-3xl border border-slate-200/40 dark:border-zinc-800/40 p-4 shadow-xl shadow-slate-100/50 dark:shadow-none">
              
              {/* Coder SVG Illustration */}
              <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Desk Surface */}
                <path d="M40 280h320" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" className="dark:stroke-zinc-700" />
                
                {/* Monitor Stand */}
                <path d="M190 230l-8 40h36l-8-40z" fill="#475569" className="dark:fill-zinc-600" />
                <ellipse cx="200" cy="270" rx="30" ry="6" fill="#334155" className="dark:fill-zinc-700" />
                
                {/* Monitor Outer frame */}
                <rect x="90" y="60" width="220" height="170" rx="12" fill="#1e293b" stroke="#475569" strokeWidth="4" className="dark:fill-zinc-800 dark:stroke-zinc-700" />
                
                {/* Monitor Screen Inner */}
                <rect x="98" y="68" width="204" height="142" rx="6" fill="#0f172a" className="screen-pulse" />
                
                {/* Scrolling Terminal Code */}
                <defs>
                  <clipPath id="screen-inner-clip">
                    <rect x="98" y="68" width="204" height="142" rx="6" />
                  </clipPath>
                </defs>
                <g clipPath="url(#screen-inner-clip)">
                  <g className="code-scroll">
                    {/* IDE Header details */}
                    <g transform="translate(108, 76)">
                      <circle cx="0" cy="0" r="3" fill="#ef4444" />
                      <circle cx="8" cy="0" r="3" fill="#f59e0b" />
                      <circle cx="16" cy="0" r="3" fill="#10b981" />
                    </g>
                    
                    {/* Code Lines Group 1 */}
                    <g transform="translate(108, 92)">
                      <rect x="0" y="0" width="80" height="4" rx="2" fill="#38bdf8" />
                      <rect x="0" y="10" width="50" height="4" rx="2" fill="#c084fc" />
                      <rect x="10" y="20" width="110" height="4" rx="2" fill="#f472b6" />
                      <rect x="10" y="30" width="70" height="4" rx="2" fill="#fb7185" />
                      <rect x="20" y="40" width="60" height="4" rx="2" fill="#34d399" />
                      <rect x="0" y="50" width="30" height="4" rx="2" fill="#fbbf24" />
                      <rect x="0" y="60" width="40" height="4" rx="2" fill="#38bdf8" />
                      <rect x="10" y="70" width="80" height="4" rx="2" fill="#a78bfa" />
                    </g>
                    {/* Code Lines Group 2 (Offset by 90px) */}
                    <g transform="translate(108, 182)">
                      <rect x="0" y="0" width="80" height="4" rx="2" fill="#38bdf8" />
                      <rect x="0" y="10" width="50" height="4" rx="2" fill="#c084fc" />
                      <rect x="10" y="20" width="110" height="4" rx="2" fill="#f472b6" />
                      <rect x="10" y="30" width="70" height="4" rx="2" fill="#fb7185" />
                      <rect x="20" y="40" width="60" height="4" rx="2" fill="#34d399" />
                      <rect x="0" y="50" width="30" height="4" rx="2" fill="#fbbf24" />
                      <rect x="0" y="60" width="40" height="4" rx="2" fill="#38bdf8" />
                      <rect x="10" y="70" width="80" height="4" rx="2" fill="#a78bfa" />
                    </g>
                  </g>
                </g>

                {/* Chair Backrest */}
                <rect x="140" y="235" width="120" height="75" rx="15" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" className="dark:fill-zinc-800 dark:stroke-zinc-700" />
                <rect x="194" y="290" width="12" height="15" fill="#94a3b8" className="dark:fill-zinc-600" />
                
                {/* Torso/Back of Coder (White shirt) */}
                <path d="M115 300c0-60 25-75 85-75s85 15 85 75z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" className="dark:fill-zinc-100 dark:stroke-zinc-300" />
                
                {/* Neck */}
                <rect x="187" y="208" width="26" height="20" rx="3" fill="#ffcc80" className="dark:fill-[#f3d2c1]" />
                
                {/* Head (Back of Head) */}
                <circle cx="200" cy="188" r="22" fill="#ffcc80" className="dark:fill-[#f3d2c1]" />
                
                {/* Hair */}
                <path d="M176 188c0-15 10-24 24-24s24 9 24 24c0 4-2 8-4 11-2-4-7-6-20-6s-18 2-20 6c-2-3-4-7-4-11z" fill="#1a1a1a" />

                {/* Keyboard */}
                <rect x="160" y="240" width="80" height="8" rx="2" fill="#334155" className="dark:fill-zinc-700" />
                
                {/* Left Arm & Hand (Animated) */}
                <g className="hand-left">
                  <path d="M135 270c10 8 25 12 35 12" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" fill="none" className="dark:stroke-zinc-100" />
                  <circle cx="170" cy="282" r="5" fill="#ffcc80" className="dark:fill-[#f3d2c1]" />
                </g>
                
                {/* Right Arm & Hand (Animated) */}
                <g className="hand-right">
                  <path d="M265 270c-10 8-25 12-35 12" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" fill="none" className="dark:stroke-zinc-100" />
                  <circle cx="230" cy="282" r="5" fill="#ffcc80" className="dark:fill-[#f3d2c1]" />
                </g>
              </svg>

              {/* Floating Badges */}
              {/* React Badge */}
              <div className="absolute top-[8%] left-[2%] float-badge-1 group cursor-default">
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/90 dark:bg-zinc-950/80 border border-slate-200/50 dark:border-zinc-800/80 shadow-md shadow-indigo-500/5 hover:scale-110 hover:border-cyan-400 hover:shadow-cyan-500/20 dark:hover:shadow-cyan-500/40 transition-all duration-300">
                  <ReactIcon />
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900/90 text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm">
                  React
                </div>
              </div>

              {/* Next.js Badge */}
              <div className="absolute -top-[5%] left-[38%] float-badge-2 group cursor-default">
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/90 dark:bg-zinc-950/80 border border-slate-200/50 dark:border-zinc-800/80 shadow-md shadow-indigo-500/5 hover:scale-110 hover:border-slate-400 hover:shadow-slate-500/20 dark:hover:shadow-white/20 transition-all duration-300">
                  <NextjsIcon />
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900/90 text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm">
                  Next.js
                </div>
              </div>

              {/* Tailwind CSS Badge */}
              <div className="absolute top-[8%] right-[2%] float-badge-3 group cursor-default">
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/90 dark:bg-zinc-950/80 border border-slate-200/50 dark:border-zinc-800/80 shadow-md shadow-indigo-500/5 hover:scale-110 hover:border-sky-400 hover:shadow-sky-500/20 dark:hover:shadow-sky-500/40 transition-all duration-300">
                  <TailwindIcon />
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900/90 text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm">
                  Tailwind CSS
                </div>
              </div>

              {/* Node.js Badge */}
              <div className="absolute top-[42%] left-[-6%] float-badge-3 group cursor-default">
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/90 dark:bg-zinc-950/80 border border-slate-200/50 dark:border-zinc-800/80 shadow-md shadow-indigo-500/5 hover:scale-110 hover:border-emerald-400 hover:shadow-emerald-500/20 dark:hover:shadow-emerald-500/40 transition-all duration-300">
                  <NodeIcon />
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900/90 text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm">
                  Node.js
                </div>
              </div>

              {/* Express.js Badge */}
              <div className="absolute top-[42%] right-[-6%] float-badge-1 group cursor-default">
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/90 dark:bg-zinc-950/80 border border-slate-200/50 dark:border-zinc-800/80 shadow-md shadow-indigo-500/5 hover:scale-110 hover:border-zinc-400 hover:shadow-zinc-500/20 dark:hover:shadow-zinc-500/40 transition-all duration-300">
                  <ExpressIcon />
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900/90 text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm">
                  Express.js
                </div>
              </div>

              {/* MongoDB Badge */}
              <div className="absolute bottom-[6%] left-[6%] float-badge-2 group cursor-default">
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/90 dark:bg-zinc-950/80 border border-slate-200/50 dark:border-zinc-800/80 shadow-md shadow-indigo-500/5 hover:scale-110 hover:border-emerald-500 hover:shadow-emerald-600/20 dark:hover:shadow-emerald-600/40 transition-all duration-300">
                  <MongoIcon />
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900/90 text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm">
                  MongoDB
                </div>
              </div>

              {/* PostgreSQL Badge */}
              <div className="absolute bottom-[6%] right-[6%] float-badge-1 group cursor-default">
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/90 dark:bg-zinc-950/80 border border-slate-200/50 dark:border-zinc-800/80 shadow-md shadow-indigo-500/5 hover:scale-110 hover:border-sky-500 hover:shadow-sky-600/20 dark:hover:shadow-sky-600/40 transition-all duration-300">
                  <PostgresIcon />
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900/90 text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm">
                  PostgreSQL
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Bio + Tech Stacks Cards */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2 flex flex-col justify-center">
            
            {/* Header Text */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold tracking-wide text-slate-800 dark:text-zinc-300 uppercase">
                A DEDICATED MERN AND NEXT.JS DEVELOPER
              </h3>
              <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                Hi there! I&apos;m <strong className="text-slate-900 dark:text-white font-semibold">Emran Hossen</strong>, a Full Stack Developer specializing in building modern web applications with the MERN, Next.js, and PostgreSQL/Prisma stacks. I focus on delivering seamless, high-performance web solutions that are both visually appealing and highly functional.
              </p>
            </div>

            {/* Stack Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4">
              
              {/* Frontend Card */}
              <div className="glass-card rounded-2xl p-6 flex flex-col items-center text-center group">
                <div className="flex items-center gap-2 mb-4 group-hover:scale-105 transition-transform duration-300">
                  <ReactIcon />
                  <NextjsIcon />
                  <TailwindIcon />
                </div>
                <h4 className="text-base font-bold text-slate-800 dark:text-white mb-1.5">
                  Frontend
                </h4>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                  React, Next.js, Tailwind CSS
                </p>
              </div>

              {/* Backend Card */}
              <div className="glass-card rounded-2xl p-6 flex flex-col items-center text-center group">
                <div className="flex items-center gap-2.5 mb-4 group-hover:scale-105 transition-transform duration-300">
                  <NodeIcon />
                  <ExpressIcon />
                </div>
                <h4 className="text-base font-bold text-slate-800 dark:text-white mb-1.5">
                  Backend
                </h4>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                  Node.js, Express
                </p>
              </div>

              {/* Full Stack Card */}
              <div className="glass-card rounded-2xl p-6 flex flex-col items-center text-center group">
                <div className="flex items-center gap-2.5 mb-4 group-hover:scale-105 transition-transform duration-300">
                  <MongoIcon />
                  <PostgresIcon />
                </div>
                <h4 className="text-base font-bold text-slate-800 dark:text-white mb-1.5">
                  Full Stack
                </h4>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                  MongoDB, PostgreSQL
                </p>
              </div>

            </div>

            {/* Let's Talk CTA Button */}
            <div className="pt-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector('#contact');
                  if (target) {
                    const top = target.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-indigo-500/50 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-bold text-sm tracking-wide bg-indigo-500/5 hover:bg-indigo-500/10 hover:border-indigo-500 transition-all duration-300 shadow-md shadow-indigo-500/5 hover:shadow-indigo-500/10 hover:scale-[1.02] cursor-pointer"
              >
                Let&apos;s Talk
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

