import React from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

// Brand icons
const ReactIcon = () => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-4 h-4 text-cyan-400 fill-none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="0" cy="0" r="2.05" fill="currentColor" />
    <g>
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const NextjsIcon = () => (
  <svg viewBox="0 0 128 128" className="w-4 h-4 fill-current text-slate-900 dark:text-white">
    <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm27.4 97.4l-42-62.2H42v55.8h-7.8V35.2h15.6l39.6 58.7V35.2h7.8v62.2h-7.8z" />
  </svg>
);

const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-sky-400 fill-current">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
  </svg>
);

const NodeIcon = () => (
  <svg viewBox="0 0 128 128" className="w-4 h-4 text-emerald-500 fill-current">
    <path d="M117.4 33.1L67.7 4.4c-2.3-1.3-5.1-1.3-7.4 0L10.6 33.1C8.3 34.4 6.9 36.8 6.9 39.5v57.4c0 2.6 1.4 5.1 3.7 6.4l49.7 28.7c2.3 1.3 5.1 1.3 7.4 0l49.7-28.7c2.3-1.3 3.7-3.8 3.7-6.4V39.5c0-2.7-1.4-5.1-3.7-6.4zM64 96.2c-17.8 0-32.2-14.4-32.2-32.2S46.2 31.8 64 31.8s32.2 14.4 32.2 32.2-14.4 32.2-32.2 32.2z" />
  </svg>
);

const ExpressIcon = () => (
  <div className="w-4 h-4 flex items-center justify-center rounded bg-slate-200 dark:bg-zinc-800 border border-slate-300/40 dark:border-zinc-700/50 font-sans font-bold text-[6px] text-slate-800 dark:text-zinc-200 tracking-wider">
    ex
  </div>
);

const MongoIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-500 fill-current">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z" />
  </svg>
);

const PostgresIcon = () => (
  <svg viewBox="0 0 128 128" className="w-4 h-4 text-sky-500 fill-current">
    <path d="M96.8 54.3c-2.4-7.8-8.2-13.8-15.6-16.7-5.5-2.2-11.7-2.6-17.7-1.5V18.7c0-2.4-2-4.4-4.4-4.4H44.9c-2.4 0-4.4 2-4.4 4.4v17.4c-6.1-1.1-12.2-.7-17.7 1.5-7.5 2.9-13.2 8.9-15.6 16.7-3.1 10.1-.9 20.8 5.8 28.6C19.7 90.7 30 96 40.5 96h47c10.5 0 20.8-5.3 27.5-13.1 6.7-7.8 8.9-18.5 5.8-28.6z" />
  </svg>
);

const PrismaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-indigo-400 fill-current">
    <path d="M22.5 16.5L13.2 2.4c-.4-.6-1.2-.6-1.6 0L2.3 16.5c-.4.6 0 1.5.8 1.5h18.6c.8 0 1.2-.9.8-1.5z" />
  </svg>
);

export default function AboutMe() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-zinc-950/50">
      {/* Background glow spots */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/3 blur-[90px] animate-pulse-glow" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-purple-500/5 dark:bg-purple-500/2 blur-[80px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">
              Background &amp; Expertise
            </h2>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              About <span className="text-gradient">Emran Hossen</span>
            </h2>
            <div className="w-12 h-1.5 bg-indigo-600 dark:bg-indigo-500 mx-auto mt-4 rounded-full" />
          </div>
        </ScrollReveal>

        {/* 2-Column Grid with 2-Side Reveal Animation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Slides from LEFT */}
          <div className="lg:col-span-5 flex justify-center">
            <ScrollReveal variant="fade-left" className="w-full max-w-[360px]">
              <div className="rounded-2xl border border-slate-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-950 overflow-hidden shadow-2xl shadow-slate-200/60 dark:shadow-black/40">

                {/* Editor Title Bar */}
                <div className="bg-slate-100/80 dark:bg-zinc-900/80 border-b border-slate-200/60 dark:border-zinc-800/60 px-4 py-3 flex items-center gap-3">
                  <div className="flex gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 bg-white/60 dark:bg-zinc-950/60 border border-slate-200/60 dark:border-zinc-800/60 rounded-md px-3 py-0.5">
                      emranhossen.dev
                    </span>
                  </div>
                </div>

                {/* Editor Body */}
                <div className="p-6 flex flex-col items-center space-y-5">

                  {/* Profile Photo */}
                  <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-indigo-500/10 dark:ring-indigo-500/15 border-2 border-white dark:border-zinc-900 shadow-lg">
                    <Image
                      src="/emran-hossen-developer-2026.webp"
                      alt="Emran Hossen - Full Stack Developer Profile"
                      fill
                      sizes="96px"
                      className="object-cover object-center"
                      priority
                    />
                  </div>

                  <div className="text-center">
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Emran Hossen</h3>
                    <span className="inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/15 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Full Stack Developer
                    </span>
                  </div>

                  {/* Code Snippet */}
                  <div className="w-full rounded-xl bg-slate-50 dark:bg-zinc-900/70 border border-slate-200/60 dark:border-zinc-800/60 font-mono text-[11.5px] leading-relaxed overflow-hidden">
                    <div className="px-4 py-3 text-left">
                      <p><span className="text-purple-600 dark:text-purple-400">const</span> <span className="text-sky-600 dark:text-sky-400">dev</span> <span className="text-slate-500 dark:text-zinc-400">=</span> &#123;</p>
                      <p className="pl-4"><span className="text-slate-700 dark:text-zinc-300">name:</span> <span className="text-emerald-600 dark:text-emerald-400">&quot;Emran Hossen&quot;</span>,</p>
                      <p className="pl-4"><span className="text-slate-700 dark:text-zinc-300">role:</span> <span className="text-emerald-600 dark:text-emerald-400">&quot;Full Stack Dev&quot;</span>,</p>
                      <p className="pl-4"><span className="text-slate-700 dark:text-zinc-300">stack:</span> <span className="text-amber-600 dark:text-amber-400">[&quot;MERN&quot;, &quot;Next.js&quot;]</span>,</p>
                      <p className="pl-4"><span className="text-slate-700 dark:text-zinc-300">loading:</span> <span className="text-purple-600 dark:text-purple-400">false</span></p>
                      <p>&#125;;</p>
                    </div>
                  </div>
                </div>

                {/* VS Code-style Status Bar */}
                <div className="bg-indigo-600 dark:bg-indigo-700 px-4 py-2 flex items-center justify-between text-[10px] font-semibold text-white/90">
                  <span className="flex items-center gap-3">
                    <span>3+ yrs exp</span>
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                    <span>20+ projects</span>
                  </span>
                  <span>Available for hire</span>
                </div>

              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Slides from RIGHT */}
          <div className="lg:col-span-7 space-y-8">
            <ScrollReveal variant="fade-right">
              {/* Bio Paragraph */}
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
                  Hi, I&apos;m <strong className="text-slate-900 dark:text-white font-bold">Emran Hossen</strong>, a professional <strong className="text-slate-900 dark:text-white font-bold">Software Engineer &amp; Web Developer</strong> based in <strong className="text-indigo-600 dark:text-indigo-400 font-bold">Narsingdi, Dhaka, Bangladesh</strong>. I specialize in building modern, high-performance web applications with the <strong className="text-slate-800 dark:text-zinc-200">MERN, Next.js, and PostgreSQL/Prisma</strong> stacks.
                </p>
                <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                  With over 3+ years of experience crafting digital solutions, I focus on clean code architecture, intuitive UI/UX design, and fast backend APIs. I am passionate about turning complex problems into elegant, scalable software.
                </p>
              </div>

              {/* Core Tech Stack Cards */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-3">
                  Core Tech Stack
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl glass-card flex items-center gap-2.5">
                    <NextjsIcon />
                    <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">Next.js</span>
                  </div>
                  <div className="p-3 rounded-xl glass-card flex items-center gap-2.5">
                    <ReactIcon />
                    <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">React.js</span>
                  </div>
                  <div className="p-3 rounded-xl glass-card flex items-center gap-2.5">
                    <TailwindIcon />
                    <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">Tailwind</span>
                  </div>
                  <div className="p-3 rounded-xl glass-card flex items-center gap-2.5">
                    <NodeIcon />
                    <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">Node.js</span>
                  </div>
                  <div className="p-3 rounded-xl glass-card flex items-center gap-2.5">
                    <ExpressIcon />
                    <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">Express</span>
                  </div>
                  <div className="p-3 rounded-xl glass-card flex items-center gap-2.5">
                    <MongoIcon />
                    <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">MongoDB</span>
                  </div>
                  <div className="p-3 rounded-xl glass-card flex items-center gap-2.5">
                    <PostgresIcon />
                    <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">PostgreSQL</span>
                  </div>
                  <div className="p-3 rounded-xl glass-card flex items-center gap-2.5">
                    <PrismaIcon />
                    <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">Prisma</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}