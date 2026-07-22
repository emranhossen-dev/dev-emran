'use client';

import React from 'react';
import { Code2, Server, Wrench } from 'lucide-react';
import {
  NextjsIcon, ReactIcon, TypescriptIcon, JavascriptIcon, TailwindIcon,
  ReduxIcon, Html5Icon, Css3Icon, NodejsIcon, ExpressIcon, PostgresIcon,
  MongodbIcon, PrismaIcon, FirebaseIcon, SupabaseIcon, StripeIcon,
  GitIcon, GithubIcon, FigmaIcon, PostmanIcon, VscodeIcon, LinuxIcon,
  AwsIcon, NginxIcon, ZustandIcon, VercelIcon, TanstackIcon, ShadcnUiIcon,
} from './TechIcons';

interface Skill {
  name: string;
  icon: React.ReactNode;
  bg: string;     // badge background color
  text: string;   // badge text color
}

const frontend: Skill[] = [
  { name: 'Next.js',       icon: <NextjsIcon size={20} />,       bg: '#000000', text: '#fff' },
  { name: 'React',         icon: <ReactIcon size={20} />,        bg: '#20232A', text: '#61DAFB' },
  { name: 'TypeScript',    icon: <TypescriptIcon size={20} />,   bg: '#3178C6', text: '#fff' },
  { name: 'JavaScript',    icon: <JavascriptIcon size={20} />,   bg: '#F7DF1E', text: '#000' },
  { name: 'TailwindCSS',   icon: <TailwindIcon size={20} />,     bg: '#0EA5E9', text: '#fff' },
  { name: 'Redux',         icon: <ReduxIcon size={20} />,        bg: '#764ABC', text: '#fff' },
  { name: 'HTML5',         icon: <Html5Icon size={20} />,        bg: '#E34F26', text: '#fff' },
  { name: 'CSS3',          icon: <Css3Icon size={20} />,         bg: '#1572B6', text: '#fff' },
  { name: 'Zustand',       icon: <ZustandIcon size={18} />,      bg: '#FF8C00', text: '#fff' },
  { name: 'shadcn/ui',     icon: <ShadcnUiIcon size={18} />,     bg: '#18181b', text: '#fff' },
  { name: 'TanStack Query',icon: <TanstackIcon size={18} />,     bg: '#EF4444', text: '#fff' },
];

const backend: Skill[] = [
  { name: 'Node.js',       icon: <NodejsIcon size={20} />,       bg: '#339933', text: '#fff' },
  { name: 'Express.js',    icon: <ExpressIcon size={20} />,      bg: '#404040', text: '#fff' },
  { name: 'PostgreSQL',    icon: <PostgresIcon size={20} />,     bg: '#336791', text: '#fff' },
  { name: 'Prisma',        icon: <PrismaIcon size={20} />,       bg: '#2D3748', text: '#fff' },
  { name: 'MongoDB',       icon: <MongodbIcon size={20} />,      bg: '#47A248', text: '#fff' },
  { name: 'Firebase',      icon: <FirebaseIcon size={20} />,     bg: '#FFCA28', text: '#000' },
  { name: 'Supabase',      icon: <SupabaseIcon size={20} />,     bg: '#3ECF8E', text: '#000' },
  { name: 'Stripe',        icon: <StripeIcon size={20} />,       bg: '#6772E5', text: '#fff' },
];

const tools: Skill[] = [
  { name: 'Git',           icon: <GitIcon size={20} />,          bg: '#F05032', text: '#fff' },
  { name: 'GitHub',        icon: <GithubIcon size={20} />,       bg: '#24292E', text: '#fff' },
  { name: 'Vercel',        icon: <VercelIcon size={20} />,       bg: '#000000', text: '#fff' },
  { name: 'VS Code',       icon: <VscodeIcon size={20} />,       bg: '#007ACC', text: '#fff' },
  { name: 'Figma',         icon: <FigmaIcon size={20} />,        bg: '#F24E1E', text: '#fff' },
  { name: 'Postman',       icon: <PostmanIcon size={20} />,      bg: '#FF6C37', text: '#fff' },
  { name: 'Linux',         icon: <LinuxIcon size={20} />,        bg: '#FCC624', text: '#000' },
  { name: 'AWS',           icon: <AwsIcon size={20} />,          bg: '#232F3E', text: '#FF9900' },
  { name: 'Nginx',         icon: <NginxIcon size={20} />,        bg: '#009639', text: '#fff' },
];

function SkillBadge({ skill }: { skill: Skill }) {
  return (
    <div
      className="flex items-center gap-2 px-3.5 py-2 rounded-lg font-bold text-xs uppercase tracking-widest select-none"
      style={{ background: skill.bg, color: skill.text }}
    >
      <span className="flex-shrink-0 flex items-center justify-center">
        {skill.icon}
      </span>
      <span>{skill.name}</span>
    </div>
  );
}

interface CategoryProps {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

function SkillCategory({ title, icon, skills }: CategoryProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-indigo-400">{icon}</span>
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill) => (
          <SkillBadge key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-10 left-10 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[80px] animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-[80px] animate-pulse-glow" style={{ animationDelay: '4s' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
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

        {/* Skills — Badge Layout */}
        <div className="glass-card rounded-2xl p-8 space-y-10">
          <SkillCategory
            title="Frontend"
            icon={<Code2 className="w-5 h-5" />}
            skills={frontend}
          />
          <div className="h-px bg-white/8" />
          <SkillCategory
            title="Backend &amp; Database"
            icon={<Server className="w-5 h-5" />}
            skills={backend}
          />
          <div className="h-px bg-white/8" />
          <SkillCategory
            title="Tools &amp; Platforms"
            icon={<Wrench className="w-5 h-5" />}
            skills={tools}
          />
        </div>

      </div>
    </section>
  );
}
