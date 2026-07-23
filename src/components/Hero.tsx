'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Download, FileText, ArrowRight, X, Phone, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './BrandIcons';

const titles = [
  "Full Stack Developer",
  "Next.js & React Specialist",
  "Node.js & Supabase Engineer",
  "MERN Stack Developer"
];

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));
        if (displayText.length === currentTitle.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentTitle.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? 40 : 80);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  const handlePrintResume = () => {
    window.print();
  };

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen pt-28 pb-16 flex items-center justify-center relative overflow-hidden">
      {/* Background glow animations */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-[80px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-pink-500/10 dark:bg-pink-500/4 blur-[100px] animate-pulse-glow" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-500/5 dark:bg-violet-500/3 blur-[120px] animate-pulse-glow" style={{ animationDelay: '5s' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* Left Intro Text Column */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/50 dark:border-indigo-800/30 text-indigo-700 dark:text-indigo-300 font-semibold text-xs uppercase tracking-wider">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600" />
            </span>
            Available for Freelance &amp; Full-time
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white">
            Hi, I am <br className="sm:hidden" />
            <span className="text-gradient">Emran Hossen</span>
          </h1>

          <div className="h-10 text-xl sm:text-2xl font-bold text-slate-700 dark:text-zinc-300 flex items-center">
            <span className="text-slate-400 dark:text-zinc-500 mr-2">I am a</span>
            <span className="text-indigo-600 dark:text-indigo-400 blink-cursor">{displayText}</span>
          </div>

          <p className="max-w-xl text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed">
            Professional <strong className="text-slate-900 dark:text-white font-bold">Software Engineer &amp; Full Stack Web Developer</strong> based in <strong className="text-indigo-600 dark:text-indigo-400 font-bold">Narsingdi, Dhaka, Bangladesh</strong>. I craft high-performance, responsive web applications with flawless user experiences. Specializing in modern React architecture, Next.js, full-stack Node.js environments, and PostgreSQL. Let&apos;s turn your concept into functional, clean code.
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center lg:justify-start gap-3">
            {[
              { href: "https://github.com/emranhossen-dev", icon: <GithubIcon className="w-[18px] h-[18px]" />, label: "GitHub" },
              { href: "https://linkedin.com", icon: <LinkedinIcon className="w-[18px] h-[18px]" />, label: "LinkedIn" },
              { href: "https://twitter.com/emranhossen_dev", icon: <TwitterIcon className="w-[18px] h-[18px]" />, label: "Twitter" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/60 dark:bg-zinc-900/60 border border-slate-200/60 dark:border-zinc-800/60 text-slate-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
            <button
              onClick={() => setIsResumeOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-indigo-600/25 dark:bg-indigo-500 dark:hover:bg-indigo-600 hover:border-cyan-400 hover:shadow-cyan-500/50 transition-all duration-300 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              View &amp; Download Resume
            </button>
            <button
              onClick={handleScrollToProjects}
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-slate-700 dark:text-zinc-300 font-semibold px-8 py-3.5 rounded-xl border border-white/20 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all duration-300 cursor-pointer"
            >
              See My Projects
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Photo Column — Circular with Glow & Official Tech Badges */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative group">
            {/* Animated glow ring behind photo */}
            <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-50 blur-2xl group-hover:opacity-80 transition-all duration-700 animate-float-slow" />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-70 group-hover:opacity-100 transition-all duration-500" />

            {/* Circular photo */}
            <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] rounded-full overflow-hidden border-4 border-white/20 dark:border-white/10 shadow-2xl animate-float">
              <Image
                src="/emran-hossen-developer-2026.webp"
                alt="Emran Hossen - Professional Full Stack Web Developer and Next.js React Specialist from Bangladesh"
                fill
                priority
                sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, 360px"
                className="object-cover object-center"
              />
            </div>

            {/* 3 single-icon floating badges — positioned outside the circle, never overlapping photo */}

            {/* Next.js badge — inline SVG, no CDN request */}
            <div
              className="absolute glass-card px-3 py-2 rounded-xl border border-white/15 shadow-lg backdrop-blur-xl animate-float flex items-center gap-2"
              style={{ top: '-2.5rem', right: '-3.5rem', animationDelay: '0.5s' }}
            >
              <svg width="20" height="20" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Next.js">
                <mask id="nextjs-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                  <circle cx="90" cy="90" r="90" fill="white" />
                </mask>
                <g mask="url(#nextjs-mask)">
                  <circle cx="90" cy="90" r="90" fill="black" />
                  <path d="M149.508 157.52L69.142 54H54V125.97H66.1V69.439L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white" />
                  <rect x="115" y="54" width="12" height="72" fill="url(#nextjs-grad)" />
                  <defs>
                    <linearGradient id="nextjs-grad" x1="121" y1="54" x2="121" y2="126" gradientUnits="userSpaceOnUse">
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </g>
              </svg>
              <span className="text-[11px] font-bold text-white uppercase tracking-wide">Next.js</span>
            </div>

            {/* React badge — inline SVG, no CDN request */}
            <div
              className="absolute glass-card px-3 py-2 rounded-xl border border-white/15 shadow-lg backdrop-blur-xl animate-float flex items-center gap-2"
              style={{ bottom: '-2.5rem', left: '-3.5rem', animationDelay: '2s' }}
            >
              <svg width="20" height="20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="React">
                <circle cx="50" cy="50" r="10" fill="#61DAFB"/>
                <ellipse cx="50" cy="50" rx="45" ry="18" stroke="#61DAFB" strokeWidth="4" fill="none"/>
                <ellipse cx="50" cy="50" rx="45" ry="18" stroke="#61DAFB" strokeWidth="4" fill="none" transform="rotate(60 50 50)"/>
                <ellipse cx="50" cy="50" rx="45" ry="18" stroke="#61DAFB" strokeWidth="4" fill="none" transform="rotate(120 50 50)"/>
              </svg>
              <span className="text-[11px] font-bold" style={{ color: '#61DAFB' }}>React</span>
            </div>

            {/* JavaScript badge — inline SVG, no CDN request */}
            <div
              className="absolute glass-card px-3 py-2 rounded-xl border border-white/15 shadow-lg backdrop-blur-xl animate-float flex items-center gap-2"
              style={{ top: '50%', right: '-4rem', transform: 'translateY(-50%)', animationDelay: '3.5s' }}
            >
              <svg width="20" height="20" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-label="JavaScript">
                <rect width="32" height="32" rx="3" fill="#F7DF1E"/>
                <path d="M9.5 25.5 C9.5 27.5 10.7 28.5 12.7 28.5 C14.7 28.5 16 27.3 16 25.1 L16 15 L13.2 15 L13.2 25 C13.2 26 12.8 26.4 12.1 26.4 C11.4 26.4 11 25.9 10.8 25.3 Z" fill="#323330"/>
                <path d="M18.5 25.1 C18.9 27 20.4 28.5 22.9 28.5 C25.4 28.5 27 27.1 27 25.1 C27 23.3 26 22.3 23.7 21.3 L22.8 20.9 C21.7 20.4 21.2 20.1 21.2 19.4 C21.2 18.8 21.7 18.4 22.4 18.4 C23.1 18.4 23.6 18.7 24 19.4 L26.2 18 C25.4 16.5 24.1 15.9 22.4 15.9 C20 15.9 18.5 17.4 18.5 19.4 C18.5 21.2 19.6 22.2 21.7 23.1 L22.6 23.5 C23.8 24.1 24.3 24.4 24.3 25.2 C24.3 25.9 23.7 26.4 22.8 26.4 C21.7 26.4 21.1 25.8 20.6 25 Z" fill="#323330"/>
              </svg>
              <span className="text-[11px] font-bold" style={{ color: '#F7DF1E' }}>JS</span>
            </div>

          </div>
        </div>
      </div>

      {/* Resume Modal */}
      {isResumeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-zinc-800 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-slate-800 dark:text-zinc-100">
                <FileText className="w-5 h-5 text-indigo-500" />
                <h2 className="text-xl font-bold">Curriculum Vitae — Emran Hossen</h2>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handlePrintResume} className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow-sm cursor-pointer">
                  <Download className="w-4 h-4" /> Print / Save PDF
                </button>
                <button onClick={() => setIsResumeOpen(false)} className="p-2 text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg transition cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div id="resume-printable-area" className="flex-1 overflow-y-auto p-8 md:p-12 text-slate-800 dark:text-zinc-200 space-y-8 print:p-0 print:text-black">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b-2 border-slate-100 dark:border-zinc-800">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white print:text-black">Emran Hossen</h2>
                  <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-lg print:text-indigo-600">Full Stack Web Developer</p>
                </div>
                <div className="mt-4 md:mt-0 text-sm space-y-1.5 text-slate-600 dark:text-zinc-400 print:text-black">
                  <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-indigo-500" /><span>dev.emranhossen@gmail.com</span></div>
                  <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-indigo-500" /><span>+880 1739-642983</span></div>
                  <div className="flex items-center gap-2"><span className="font-bold text-indigo-500">Web</span><span>emran.work</span></div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 print:text-indigo-600">Professional Summary</h3>
                <p className="text-sm leading-relaxed">Passionate Full Stack Web Developer with expertise in building responsive, interactive, and high-performance applications. Strong capability in React, Next.js, Node.js with relational and non-relational database management (PostgreSQL, MongoDB, Supabase). Proven track record of developing LMS platforms, e-commerce solutions, and secure credential management systems.</p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 print:text-indigo-600">Core Technical Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-slate-50 dark:bg-zinc-800/40 p-4 rounded-xl print:bg-white print:border print:border-zinc-200"><p className="font-bold text-slate-900 dark:text-white print:text-black mb-1.5">Frontend</p><p className="text-slate-600 dark:text-zinc-300">React, Next.js, HTML5, CSS3, Tailwind CSS, Javascript (ES6+), TypeScript</p></div>
                  <div className="bg-slate-50 dark:bg-zinc-800/40 p-4 rounded-xl print:bg-white print:border print:border-zinc-200"><p className="font-bold text-slate-900 dark:text-white print:text-black mb-1.5">Backend &amp; DB</p><p className="text-slate-600 dark:text-zinc-300">Node.js, Express, REST APIs, PostgreSQL, MongoDB, Supabase, Firebase</p></div>
                  <div className="bg-slate-50 dark:bg-zinc-800/40 p-4 rounded-xl print:bg-white print:border print:border-zinc-200"><p className="font-bold text-slate-900 dark:text-white print:text-black mb-1.5">Tools &amp; Ops</p><p className="text-slate-600 dark:text-zinc-300">Git, GitHub, npm/pnpm, Postman, Vercel, Netlify, Render</p></div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 print:text-indigo-600">Education</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-baseline"><p className="font-bold text-slate-900 dark:text-white print:text-black">B.Sc. in CSE (1st Year)</p><span className="text-slate-500 dark:text-zinc-400 text-xs">2024 - Present</span></div>
                  <p className="text-xs text-slate-600 dark:text-zinc-400">University of South Asia, Bangladesh</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-baseline"><p className="font-bold text-slate-900 dark:text-white print:text-black">HSC (Science)</p><span className="text-slate-500 dark:text-zinc-400 text-xs">2021</span></div>
                  <p className="text-xs text-slate-600 dark:text-zinc-400">Bara Chapa Union Adarsha Degree College</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
