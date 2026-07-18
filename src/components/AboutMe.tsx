import React from 'react';
import Image from 'next/image';

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
  <svg viewBox="0 0 64 64" className="w-4 h-4 text-emerald-600 fill-current">
    <path d="M31.1 1.7C29.4 6 22 23.3 22 34.6c0 10.6 8 16.7 10 16.7 1.8 0 10-6.1 10-16.7C42 23.3 34.6 6 32.9 1.7c-.3-.8-1.5-.8-1.8 0zM32 46.2V5.5c2.3 8.3 7.8 22.8 7.8 29.1 0 7-4.4 10.9-7.8 11.6zM32 55.4v6.9c0 .9-.7 1.7-1.7 1.7-.9 0-1.7-.7-1.7-1.7v-6.9h3.4z" />
  </svg>
);

const PostgresIcon = () => (
  <svg viewBox="0 0 128 128" className="w-4 h-4 text-sky-600 fill-current">
    <path d="M123.6 57.5c-.6-3.5-3-6.4-6.4-7.8-1-.4-2-.7-3.1-.9 2.2-6.5-.4-13.8-6.1-17.6-5-3.4-11.2-4.1-16.8-2-3.8-9.4-13-15.6-23.1-15.6-5.8 0-11.4 2-16 5.6C44.7 13.9 33 21.8 26 33.1c-1.5-1.1-3.2-1.9-5.1-2.4-3.5-.9-7.2-.6-10.4 1C7 33.5 4.3 36.4 3 40.2c-1.3 3.8-1.1 8 .5 11.6 1 2.3 2.6 4.3 4.6 5.7.3.2.7.4 1 .6-.6 1.8-.9 3.7-.9 5.6 0 10.6 6.3 19.8 15.6 23.6 1.2 5.5 4.8 10.2 9.8 12.9 2.9 1.6 6.2 2.4 9.5 2.4 1 0 2 0 3-.2V92.2c0-5 3.3-9.4 8.1-10.8 1-.3 2.1-.4 3.2-.4h6c5 0 9.4 3.3 10.8 8.1.3 1 .4 2.1.4 3.2v10.2c3-.4 5.9-1.5 8.4-3.2 5-3.4 8.2-8.9 8.7-15 .8.3 1.6.4 2.5.4 3.5 0 6.7-1.8 8.4-4.8l2.1-3.6c.5-.9.8-1.9.8-3 0-1.8-.8-3.5-2.2-4.7 1.4-1.2 2.2-3 2.2-4.8 0-1.5-.6-3-1.6-4.1z" />
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);

const stack = [
  { group: 'Frontend', items: [
    { icon: <ReactIcon />, label: 'React' },
    { icon: <NextjsIcon />, label: 'Next.js' },
    { icon: <TailwindIcon />, label: 'Tailwind CSS' },
  ]},
  { group: 'Backend', items: [
    { icon: <NodeIcon />, label: 'Node.js' },
    { icon: <ExpressIcon />, label: 'Express' },
  ]},
  { group: 'Database', items: [
    { icon: <MongoIcon />, label: 'MongoDB' },
    { icon: <PostgresIcon />, label: 'PostgreSQL' },
  ]},
];

export default function AboutMe() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-50/40 dark:bg-black/10">
      {/* Decorative Background Glow */}
      <div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/[0.04] blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-sky-500/5 dark:bg-sky-500/[0.03] blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.2em] text-indigo-600 dark:text-indigo-400 uppercase">
            About Me
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-3 tracking-tight">
            The Developer Behind the Code
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Editor-style Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[360px] rounded-2xl border border-slate-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-950 overflow-hidden shadow-2xl shadow-slate-200/60 dark:shadow-black/40">

              {/* Editor Title Bar */}
              <div className="bg-slate-100/80 dark:bg-zinc-900/80 border-b border-slate-200/60 dark:border-zinc-800/60 px-4 py-3 flex items-center gap-3">
                <div className="flex gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 flex justify-center">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 bg-white/60 dark:bg-zinc-950/60 border border-slate-200/60 dark:border-zinc-800/60 rounded-md px-3 py-0.5">
                    about.tsx
                  </span>
                </div>
              </div>

              {/* Editor Body */}
              <div className="p-6 flex flex-col items-center space-y-5">

                {/* Profile Photo */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-indigo-500/10 dark:ring-indigo-500/15 border-2 border-white dark:border-zinc-900 shadow-lg">
                  <Image
                    src="/emran-hossen-full-stack-developer-photo.jpg"
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
                  <span>2+ yrs exp</span>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span>20+ projects</span>
                </span>
                <span>Available for hire</span>
              </div>

            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 space-y-8">

            {/* Bio Paragraph */}
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
                Hi, I&apos;m <strong className="text-slate-900 dark:text-white font-bold">Emran Hossen</strong>, a Full Stack Developer specializing in building modern, high-performance web applications with the <strong className="text-slate-800 dark:text-zinc-200">MERN, Next.js, and PostgreSQL/Prisma</strong> stacks.
              </p>
              <p className="text-slate-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
                I care about clean architecture as much as clean UI, turning ideas into products that are fast, reliable, and genuinely enjoyable to use.
              </p>
            </div>

            {/* Tech Stack */}
            <div className="space-y-4">
              {stack.map((group) => (
                <div key={group.group} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600 dark:text-zinc-400 sm:w-24 shrink-0">
                    {group.group}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item.label}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900/60 border border-slate-200/70 dark:border-zinc-800/70 text-sm font-semibold text-slate-700 dark:text-zinc-300 hover:border-indigo-400/50 hover:-translate-y-0.5 transition-all duration-200"
                      >
                        {item.icon}
                        {item.label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold shadow-lg shadow-slate-900/10 hover:shadow-indigo-500/20 hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-white transition-all duration-300"
              >
                Let&apos;s Talk
                <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRightIcon />
                </span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}