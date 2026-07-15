'use client';

import { useEffect, useRef, useState } from 'react';

interface SkillItem {
  name: string;
  level: number;
  color: string;
  icon: string;
}

const technicalSkills: SkillItem[] = [
  { name: 'HTML5', level: 95, color: 'bg-orange-500', icon: '🌐' },
  { name: 'CSS3 / Tailwind CSS', level: 95, color: 'bg-sky-500', icon: '🎨' },
  { name: 'JavaScript (ES6+)', level: 88, color: 'bg-yellow-500', icon: '⚡' },
  { name: 'TypeScript', level: 80, color: 'bg-blue-600', icon: '📘' },
  { name: 'React', level: 90, color: 'bg-cyan-500', icon: '⚛️' },
  { name: 'Next.js', level: 85, color: 'bg-violet-500', icon: '▲' },
  { name: 'Node.js / Express', level: 85, color: 'bg-green-500', icon: '🟢' },
  { name: 'MongoDB / PostgreSQL', level: 80, color: 'bg-emerald-600', icon: '🐘' },
];

const softSkills: SkillItem[] = [
  { name: 'Problem Solving', level: 93, color: 'bg-rose-500', icon: '🧩' },
  { name: 'Communication', level: 88, color: 'bg-purple-500', icon: '💬' },
  { name: 'Team Collaboration', level: 90, color: 'bg-amber-500', icon: '🤝' },
  { name: 'Adaptability', level: 87, color: 'bg-indigo-500', icon: '🔄' },
  { name: 'Time Management', level: 85, color: 'bg-teal-500', icon: '⏰' },
];

const backendTools: SkillItem[] = [
  { name: 'Supabase', level: 85, color: 'bg-emerald-500', icon: '⚡' },
  { name: 'Express', level: 85, color: 'bg-slate-500', icon: '🚂' },
  { name: 'REST APIs', level: 90, color: 'bg-blue-500', icon: '🔗' },
  { name: 'Firebase', level: 70, color: 'bg-amber-500', icon: '🔥' },
];

const devopsTools: SkillItem[] = [
  { name: 'Git', level: 90, color: 'bg-orange-600', icon: '🐙' },
  { name: 'Vercel', level: 85, color: 'bg-slate-600', icon: '☁️' },
  { name: 'Postman', level: 85, color: 'bg-orange-500', icon: '🚀' },
  { name: 'VS Code', level: 95, color: 'bg-blue-500', icon: '⚙️' },
];

const alsoKnow = [
  'Redux Toolkit', 'Zustand', 'Prisma', 'Mongoose', 'JWT Auth', 'OAuth', 'Socket.io',
  'Stripe', 'SSLCommerz', 'Netlify', 'Render', 'npm/pnpm', 'Figma', 'Responsive Design'
];

function AnimatedBar({ skill, delay, isVisible }: { skill: SkillItem; delay: number; isVisible: boolean }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      setWidth(skill.level);
    }, delay);
    return () => clearTimeout(timer);
  }, [isVisible, skill.level, delay]);

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-base">{skill.icon}</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">{skill.name}</span>
        </div>
        <span className="text-xs font-bold tabular-nums text-slate-500 dark:text-zinc-400">{width}%</span>
      </div>
      <div className="w-full bg-slate-100 dark:bg-zinc-800/60 h-[6px] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${skill.color} transition-all ease-out relative`}
          style={{ width: `${width}%`, transitionDuration: '1.5s' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

function SkillPanel({ title, skills, isVisible, startDelay = 0 }: { title: string; skills: SkillItem[]; isVisible: boolean; startDelay?: number }) {
  return (
    <div className="p-6 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-slate-200/60 dark:border-zinc-800/60 backdrop-blur-sm hover:border-indigo-300/30 dark:hover:border-indigo-700/30 transition-all duration-300">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <span className="w-1.5 h-6 rounded-full bg-indigo-500" />
        {title}
      </h3>
      <div className="space-y-4">
        {skills.map((skill, idx) => (
          <AnimatedBar
            key={skill.name}
            skill={skill}
            delay={startDelay + idx * 100}
            isVisible={isVisible}
          />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          const timer = setTimeout(() => setIsVisible(true), 0);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.15 }
    );
    const current = sectionRef.current;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, [isVisible]);

  return (
    <section id="skills" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-10 left-10 w-[300px] h-[300px] rounded-full bg-cyan-500/5 dark:bg-cyan-500/3 blur-[80px] animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/3 blur-[80px] animate-pulse-glow" style={{ animationDelay: '4s' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/50 dark:border-indigo-800/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 w-fit">
            <span className="w-4 h-[2px] bg-indigo-500 rounded-full" />
            Skills
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            My Tech <span className="text-gradient">Skills</span>
          </h2>
          <p className="mt-4 text-slate-500 dark:text-zinc-400 text-sm sm:text-base">
            Technologies and tools I use to build world-class products.
          </p>
        </div>

        {/* Skills Grid — 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Technical Proficiency */}
          <SkillPanel
            title="Technical Proficiency"
            skills={technicalSkills}
            isVisible={isVisible}
            startDelay={100}
          />

          {/* Soft Skills */}
          <SkillPanel
            title="Soft Skills"
            skills={softSkills}
            isVisible={isVisible}
            startDelay={200}
          />
        </div>

        {/* Second Row — Backend & DevOps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SkillPanel
            title="Backend & Services"
            skills={backendTools}
            isVisible={isVisible}
            startDelay={300}
          />
          <SkillPanel
            title="Tools & DevOps"
            skills={devopsTools}
            isVisible={isVisible}
            startDelay={400}
          />
        </div>

        {/* Also Know Tags */}
        <div className="p-6 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-slate-200/60 dark:border-zinc-800/60 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 rounded-full bg-indigo-500" />
            Also Know
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {alsoKnow.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-zinc-800/60 text-slate-600 dark:text-zinc-300 border border-slate-200/50 dark:border-zinc-700/50 hover:border-indigo-400/40 dark:hover:border-indigo-600/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
