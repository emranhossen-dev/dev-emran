'use client';

import React from 'react';
import { Code2, Server, Briefcase } from 'lucide-react';

const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

interface Skill {
  name: string;
  icon: string;           // CDN URL
  invert?: boolean;       // brighten dark icons (Express, Prisma, etc.)
  bg?: string;            // optional coloured circle bg
}

// ── Skill Data ───────────────────────────────────────────────────────────────

const frontend: Skill[] = [
  { name: 'JavaScript',    icon: `${CDN}/javascript/javascript-original.svg` },
  { name: 'TypeScript',    icon: `${CDN}/typescript/typescript-original.svg` },
  { name: 'React.js',      icon: `${CDN}/react/react-original.svg` },
  { name: 'Next.js',       icon: `${CDN}/nextjs/nextjs-original.svg`, bg: '#fff' },
  { name: 'Tailwind CSS',  icon: `${CDN}/tailwindcss/tailwindcss-original.svg` },
  { name: 'HTML5',         icon: `${CDN}/html5/html5-original.svg` },
  { name: 'CSS3',          icon: `${CDN}/css3/css3-original.svg` },
  { name: 'Redux',         icon: `${CDN}/redux/redux-original.svg` },
  { name: 'Zustand',       icon: `${CDN}/zustand/zustand-original.svg` },
];

const backend: Skill[] = [
  { name: 'Node.js',      icon: `${CDN}/nodejs/nodejs-original.svg` },
  { name: 'Express.js',   icon: `${CDN}/express/express-original.svg`, invert: true },
  { name: 'MongoDB',      icon: `${CDN}/mongodb/mongodb-original.svg` },
  { name: 'PostgreSQL',   icon: `${CDN}/postgresql/postgresql-original.svg` },
  { name: 'Firebase',     icon: `${CDN}/firebase/firebase-plain.svg` },
  { name: 'Supabase',     icon: `${CDN}/supabase/supabase-original.svg` },
  { name: 'Prisma',       icon: `${CDN}/prisma/prisma-original.svg`, invert: true },
  { name: 'MySQL',        icon: `${CDN}/mysql/mysql-original.svg` },
  { name: 'REST API',     icon: `${CDN}/postman/postman-original.svg` },
];

const toolsDevOps: Skill[] = [
  { name: 'Git',          icon: `${CDN}/git/git-original.svg` },
  { name: 'GitHub',       icon: `${CDN}/github/github-original.svg`, invert: true },
  { name: 'VS Code',      icon: `${CDN}/vscode/vscode-original.svg` },
  { name: 'Figma',        icon: `${CDN}/figma/figma-original.svg` },
  { name: 'Postman',      icon: `${CDN}/postman/postman-original.svg` },
  { name: 'Linux',        icon: `${CDN}/linux/linux-original.svg` },
  { name: 'Nginx',        icon: `${CDN}/nginx/nginx-original.svg` },
  { name: 'AWS',          icon: `${CDN}/amazonwebservices/amazonwebservices-original-wordmark.svg`, invert: true },
  { name: 'Vercel',       icon: `${CDN}/vercel/vercel-original.svg`, invert: true },
];

// ── Skill Card ───────────────────────────────────────────────────────────────

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="flex flex-col items-center gap-2 group">
      {/* Round icon circle */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center border border-white/15 transition-border duration-300"
        style={{
          background: skill.bg ?? 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <img
          src={skill.icon}
          alt={skill.name}
          width={30}
          height={30}
          loading="lazy"
          className={skill.invert ? 'brightness-0 invert' : ''}
          style={{ objectFit: 'contain' }}
        />
      </div>
      {/* Skill name */}
      <span className="text-[11px] font-semibold text-slate-300 text-center leading-tight">
        {skill.name}
      </span>
    </div>
  );
}

// ── Category Block ────────────────────────────────────────────────────────────

interface CategoryProps {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

function SkillCategory({ title, icon, skills }: CategoryProps) {
  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-indigo-400">{icon}</span>
        <h3 className="text-base font-bold text-white tracking-wide">{title}</h3>
      </div>

      {/* Icon Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-5">
        {skills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-10 left-10 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[80px] animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-[80px] animate-pulse-glow" style={{ animationDelay: '4s' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full glass-pill text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
            Tech Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Technologies and tools I use to build modern, scalable products.
          </p>
        </div>

        {/* 3-Column Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkillCategory
            title="Frontend"
            icon={<Code2 className="w-5 h-5" />}
            skills={frontend}
          />
          <SkillCategory
            title="Backend & Database"
            icon={<Server className="w-5 h-5" />}
            skills={backend}
          />
          <SkillCategory
            title="Tools & DevOps"
            icon={<Briefcase className="w-5 h-5" />}
            skills={toolsDevOps}
          />
        </div>

      </div>
    </section>
  );
}
