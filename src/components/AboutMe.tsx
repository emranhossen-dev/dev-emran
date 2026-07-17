'use client';

import React from 'react';
import Image from 'next/image';

// Brand icons
const ReactIcon = () => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-5 h-5 text-cyan-400 fill-none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="0" cy="0" r="2.05" fill="currentColor" />
    <g>
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const NextjsIcon = () => (
  <svg viewBox="0 0 128 128" className="w-5 h-5 fill-current text-slate-900 dark:text-white">
    <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm27.4 97.4l-42-62.2H42v55.8h-7.8V35.2h15.6l39.6 58.7V35.2h7.8v62.2h-7.8z" />
  </svg>
);

const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-sky-400 fill-current">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
  </svg>
);

const NodeIcon = () => (
  <svg viewBox="0 0 128 128" className="w-5 h-5 text-emerald-500 fill-current">
    <path d="M117.4 33.1L67.7 4.4c-2.3-1.3-5.1-1.3-7.4 0L10.6 33.1C8.3 34.4 6.9 36.8 6.9 39.5v57.4c0 2.6 1.4 5.1 3.7 6.4l49.7 28.7c2.3 1.3 5.1 1.3 7.4 0l49.7-28.7c2.3-1.3 3.7-3.8 3.7-6.4V39.5c0-2.7-1.4-5.1-3.7-6.4zM64 96.2c-17.8 0-32.2-14.4-32.2-32.2S46.2 31.8 64 31.8s32.2 14.4 32.2 32.2-14.4 32.2-32.2 32.2z" />
  </svg>
);

const ExpressIcon = () => (
  <div className="w-5 h-5 flex items-center justify-center rounded bg-slate-200 dark:bg-zinc-800 border border-slate-300/40 dark:border-zinc-700/50 font-sans font-bold text-[7px] text-slate-800 dark:text-zinc-200 tracking-wider">
    ex
  </div>
);

const MongoIcon = () => (
  <svg viewBox="0 0 64 64" className="w-5 h-5 text-emerald-600 fill-current">
    <path d="M31.1 1.7C29.4 6 22 23.3 22 34.6c0 10.6 8 16.7 10 16.7 1.8 0 10-6.1 10-16.7C42 23.3 34.6 6 32.9 1.7c-.3-.8-1.5-.8-1.8 0zM32 46.2V5.5c2.3 8.3 7.8 22.8 7.8 29.1 0 7-4.4 10.9-7.8 11.6zM32 55.4v6.9c0 .9-.7 1.7-1.7 1.7-.9 0-1.7-.7-1.7-1.7v-6.9h3.4z" />
  </svg>
);

const PostgresIcon = () => (
  <svg viewBox="0 0 128 128" className="w-5 h-5 text-sky-600 fill-current">
    <path d="M123.6 57.5c-.6-3.5-3-6.4-6.4-7.8-1-.4-2-.7-3.1-.9 2.2-6.5-.4-13.8-6.1-17.6-5-3.4-11.2-4.1-16.8-2-3.8-9.4-13-15.6-23.1-15.6-5.8 0-11.4 2-16 5.6C44.7 13.9 33 21.8 26 33.1c-1.5-1.1-3.2-1.9-5.1-2.4-3.5-.9-7.2-.6-10.4 1C7 33.5 4.3 36.4 3 40.2c-1.3 3.8-1.1 8 .5 11.6 1 2.3 2.6 4.3 4.6 5.7.3.2.7.4 1 .6-.6 1.8-.9 3.7-.9 5.6 0 10.6 6.3 19.8 15.6 23.6 1.2 5.5 4.8 10.2 9.8 12.9 2.9 1.6 6.2 2.4 9.5 2.4 1 0 2 0 3-.2V92.2c0-5 3.3-9.4 8.1-10.8 1-.3 2.1-.4 3.2-.4h6c5 0 9.4 3.3 10.8 8.1.3 1 .4 2.1.4 3.2v10.2c3-.4 5.9-1.5 8.4-3.2 5-3.4 8.2-8.9 8.7-15 .8.3 1.6.4 2.5.4 3.5 0 6.7-1.8 8.4-4.8l2.1-3.6c.5-.9.8-1.9.8-3 0-1.8-.8-3.5-2.2-4.7 1.4-1.2 2.2-3 2.2-4.8 0-1.5-.6-3-1.6-4.1z" />
  </svg>
);

export default function AboutMe() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-50/20 dark:bg-black/5">
      {/* Decorative Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/3 blur-[80px] animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
            About Me
          </h2>
          <p className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
            A DEDICATED MERN AND NEXT.JS DEVELOPER
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: VS Code Style IDE Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[350px] rounded-3xl border border-slate-200/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-955/40 backdrop-blur-md overflow-hidden flex flex-col shadow-xl shadow-slate-100/50 dark:shadow-none">
              
              {/* IDE Top Bar */}
              <div className="bg-slate-100/70 dark:bg-zinc-950/60 border-b border-slate-200/50 dark:border-zinc-850/50 px-5 py-3.5 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">emranhossen.dev</span>
                <div className="w-9" /> {/* Spacer to center the title */}
              </div>

              {/* IDE Body */}
              <div className="p-6 flex flex-col items-center justify-center space-y-6">
                
                {/* Circular Profile Photo with glowing ring */}
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-indigo-500/30 shadow-lg shadow-indigo-500/10 dark:shadow-none">
                  <Image
                    src="/emran-hossen-full-stack-developer-photo.jpg"
                    alt="Emran Hossen - Full Stack Developer Profile"
                    fill
                    sizes="112px"
                    className="object-cover object-center"
                    priority
                  />
                </div>

                {/* Code Block Snippet */}
                <div className="w-full p-4 rounded-xl bg-slate-50/50 dark:bg-zinc-950/60 border border-slate-200/40 dark:border-zinc-900/50 font-mono text-[11px] text-left leading-relaxed shadow-sm">
                  <p className="text-slate-500 dark:text-zinc-500"><span className="text-indigo-600 dark:text-indigo-400">const</span> dev = &#123;</p>
                  <p className="pl-4 text-slate-700 dark:text-zinc-300">name: <span className="text-emerald-600 dark:text-emerald-400">&quot;Emran Hossen&quot;</span>,</p>
                  <p className="pl-4 text-slate-700 dark:text-zinc-300">role: <span className="text-emerald-600 dark:text-emerald-400">&quot;Full Stack&quot;</span>,</p>
                  <p className="pl-4 text-slate-700 dark:text-zinc-300">Ice-Cream: <span className="text-indigo-600 dark:text-indigo-400">Infinity</span></p>
                  <p className="text-slate-500 dark:text-zinc-500">&#125;</p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 w-full border-y border-slate-200/50 dark:border-zinc-850/50 py-4 text-center">
                  <div className="border-r border-slate-200/50 dark:border-zinc-850/50">
                    <span className="block text-lg font-black text-slate-900 dark:text-white">2+</span>
                    <span className="block text-[9px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mt-0.5">Yrs Exp</span>
                  </div>
                  <div className="border-r border-slate-200/50 dark:border-zinc-850/50">
                    <span className="block text-lg font-black text-slate-900 dark:text-white">20+</span>
                    <span className="block text-[9px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mt-0.5">Projects</span>
                  </div>
                  <div>
                    <span className="block text-lg font-black text-slate-900 dark:text-white">10+</span>
                    <span className="block text-[9px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mt-0.5">Clients</span>
                  </div>
                </div>

                {/* Bottom Profile Details */}
                <div className="w-full text-left pt-1">
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-2">Emran Hossen</h4>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Frontend Developer
                  </span>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Bio Paragraph + Stacks Cards Grid + Let's Talk */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Bio Paragraph */}
            <p className="text-slate-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
              Hi there! I&apos;m <strong className="text-slate-955 dark:text-white font-bold">Emran Hossen</strong>, a <strong className="text-slate-955 dark:text-white font-bold">Full Stack Developer</strong> specializing in building modern web applications with the <strong className="text-slate-800 dark:text-zinc-200">MERN, Next.js, and PostgreSQL/Prisma</strong> stacks. I focus on delivering seamless, high-performance web solutions that are both visually appealing and highly functional.
            </p>

            {/* Three Stack Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Stack 1: Frontend */}
              <div className="p-5 rounded-2xl bg-white/40 dark:bg-zinc-950/20 border border-slate-200/50 dark:border-zinc-800/40 flex flex-col items-center justify-center text-center hover:border-indigo-400/40 hover:scale-[1.02] transition-all duration-300">
                <div className="flex gap-2.5 items-center justify-center mb-3">
                  <ReactIcon />
                  <NextjsIcon />
                  <TailwindIcon />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Frontend</h4>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-450 dark:text-zinc-500 leading-tight">
                  React, Next.js, Tailwind CSS
                </span>
              </div>

              {/* Stack 2: Backend */}
              <div className="p-5 rounded-2xl bg-white/40 dark:bg-zinc-950/20 border border-slate-200/50 dark:border-zinc-800/40 flex flex-col items-center justify-center text-center hover:border-indigo-400/40 hover:scale-[1.02] transition-all duration-300">
                <div className="flex gap-2.5 items-center justify-center mb-3">
                  <NodeIcon />
                  <ExpressIcon />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Backend</h4>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-450 dark:text-zinc-500 leading-tight">
                  Node.js, Express
                </span>
              </div>

              {/* Stack 3: Full Stack */}
              <div className="p-5 rounded-2xl bg-white/40 dark:bg-zinc-955/20 border border-slate-200/50 dark:border-zinc-800/40 flex flex-col items-center justify-center text-center hover:border-indigo-400/40 hover:scale-[1.02] transition-all duration-300">
                <div className="flex gap-2.5 items-center justify-center mb-3">
                  <MongoIcon />
                  <PostgresIcon />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Full Stack</h4>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-450 dark:text-zinc-500 leading-tight">
                  MongoDB, PostgreSQL
                </span>
              </div>

            </div>

            {/* Let's Talk CTA Link */}
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl border-2 border-slate-800 dark:border-zinc-700 hover:bg-slate-800 dark:hover:bg-zinc-700 hover:text-white dark:hover:text-white text-slate-800 dark:text-zinc-300 text-sm font-bold transition duration-350 cursor-pointer shadow-sm"
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
