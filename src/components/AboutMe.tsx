'use client';

import React from 'react';
import Image from 'next/image';

export default function AboutMe() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-50/30 dark:bg-black/10">
      {/* Decorative Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/3 blur-[80px] animate-pulse-glow" />

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
          
          {/* Left Column: Image Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] group">
              {/* Outer Card with Glassmorphism */}
              <div className="p-4 pb-6 rounded-3xl bg-white/40 dark:bg-zinc-900/40 border border-slate-200/60 dark:border-zinc-800/60 shadow-xl shadow-slate-100/50 dark:shadow-none backdrop-blur-sm">
                
                {/* Image Wrapper */}
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 dark:bg-zinc-950 border border-slate-200/40 dark:border-zinc-800/40">
                  <Image
                    src="/emran-hossen-full-stack-developer.jpg"
                    alt="Emran Hossen - Full Stack Developer Vector Illustration"
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
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-tr from-indigo-600 to-violet-600 text-white px-5 py-3.5 rounded-2xl shadow-xl shadow-indigo-500/30 dark:shadow-indigo-500/10 flex flex-col items-center justify-center text-center border border-indigo-400/20 z-10 transform hover:scale-105 transition-transform duration-300">
                <span className="text-2xl font-black leading-none">2+</span>
                <span className="text-[10px] font-bold uppercase tracking-wider mt-1 opacity-90 leading-tight">
                  Years of<br />Experience
                </span>
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
