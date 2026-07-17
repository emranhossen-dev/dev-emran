import React from 'react';
import { Code2, Server, Briefcase } from 'lucide-react';

// Custom inline SVGs for all technical skills to ensure crisp rendering
const JavaScriptIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current text-yellow-500 bg-black rounded p-0.5 animate-pulse-slow">
    <path d="M3 3h18v18H3V3zm11.233 11.228c-.227-.514-.627-.827-1.2-.827-.6 0-1 .34-1 .858 0 .8.8 1.1 1.637 1.455.973.41 2.215.822 2.215 2.285 0 1.258-.945 2.112-2.316 2.112-1.42 0-2.23-.746-2.585-1.523l1.2-.7c.22.42.545.69 1.096.69.514 0 .914-.257.914-.686 0-.6-.57-.828-1.257-1.126-.957-.4-2.586-.8-2.586-2.585 0-1.2 1-1.958 2.2-1.958 1.157 0 1.9.52 2.23 1.286l-1.137.712zm3.626 5.097c-.244.4-.73.666-1.332.666-.827 0-1.372-.6-1.372-1.886v-5.263h1.443v5.228c0 .486.172.697.514.697.286 0 .45-.128.535-.297l.212 1.155z"/>
  </svg>
);

const ReactIcon = () => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-7 h-7 text-cyan-450 fill-none" stroke="currentColor" strokeWidth="1.2">
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

const TypeScriptIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 text-blue-600 fill-current bg-white rounded p-0.5">
    <path d="M3 3h18v18H3V3zm11.2 10.3c-.2-.4-.6-.6-1.1-.6-.5 0-.9.2-1.1.5-.2.3-.3.8-.3 1.5s.1 1.2.3 1.5c.2.3.6.5 1.1.5.4 0 .7-.1.9-.3.2-.2.3-.5.4-.9l1.1.4c-.2.7-.5 1.2-1 1.5-.5.3-1.1.5-1.8.5-1 0-1.7-.3-2.2-.9s-.7-1.6-.7-2.7c0-1.2.2-2.1.7-2.7s1.2-.9 2.2-.9c.7 0 1.3.2 1.7.5.4.3.7.8.9 1.4l-1.1.3zM18.8 11v1.1h-2v5h-1.2v-5h-2V11h5.2z" />
  </svg>
);

const ShadcnIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 text-slate-800 dark:text-zinc-200 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 3L8 21" />
  </svg>
);

const ReduxIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 text-purple-650 fill-current">
    <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm-1.66 12.3c-.56-.56-.56-1.47 0-2.03.56-.56 1.47-.56 2.03 0l2.6 2.6c.56.56.56 1.47 0 2.03-.56.56-1.47.56-2.03 0l-2.6-2.6zm3.32-6.6c.56-.56 1.47-.56 2.03 0 .56.56.56 1.47 0 2.03l-2.6 2.6c-.56.56-1.47.56-2.03 0-.56-.56-.56-1.47 0-2.03l2.6-2.6z" />
  </svg>
);

const ZustandIcon = () => (
  <span className="text-xl">🐻</span>
);

const TanstackQueryIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 text-rose-500 fill-current">
    <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 13h-2v-2h2v2zm0-4h-2V7h2v4z" />
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

const MongooseIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 text-red-700 fill-current">
    <path d="M12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
  </svg>
);

const PostgresIcon = () => (
  <svg viewBox="0 0 128 128" className="w-7 h-7 text-sky-600 fill-current">
    <path d="M123.6 57.5c-.6-3.5-3-6.4-6.4-7.8-1-.4-2-.7-3.1-.9 2.2-6.5-.4-13.8-6.1-17.6-5-3.4-11.2-4.1-16.8-2-3.8-9.4-13-15.6-23.1-15.6-5.8 0-11.4 2-16 5.6C44.7 13.9 33 21.8 26 33.1c-1.5-1.1-3.2-1.9-5.1-2.4-3.5-.9-7.2-.6-10.4 1C7 33.5 4.3 36.4 3 40.2c-1.3 3.8-1.1 8 .5 11.6 1 2.3 2.6 4.3 4.6 5.7.3.2.7.4 1 .6-.6 1.8-.9 3.7-.9 5.6 0 10.6 6.3 19.8 15.6 23.6 1.2 5.5 4.8 10.2 9.8 12.9 2.9 1.6 6.2 2.4 9.5 2.4 1 0 2 0 3-.2V92.2c0-5 3.3-9.4 8.1-10.8 1-.3 2.1-.4 3.2-.4h6c5 0 9.4 3.3 10.8 8.1.3 1 .4 2.1.4 3.2v10.2c3-.4 5.9-1.5 8.4-3.2 5-3.4 8.2-8.9 8.7-15 .8.3 1.6.4 2.5.4 3.5 0 6.7-1.8 8.4-4.8l2.1-3.6c.5-.9.8-1.9.8-3 0-1.8-.8-3.5-2.2-4.7 1.4-1.2 2.2-3 2.2-4.8 0-1.5-.6-3-1.6-4.1z" />
  </svg>
);

const PrismaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 text-slate-800 dark:text-zinc-200 fill-current">
    <path d="M20 4L4 12l16 8V4z" />
  </svg>
);

const StripeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 text-blue-500 fill-current">
    <path d="M13.9 11.2c-1.3-.4-1.8-.7-1.8-1.3 0-.5.5-.8 1.3-.8.9 0 1.8.3 2.5.7l.8-1.9c-.9-.4-2-.7-3.1-.7-2.3 0-3.9 1.2-3.9 3.2 0 1.9 1.6 2.7 3.3 3.2 1.4.4 1.9.8 1.9 1.4 0 .7-.6 1-1.5 1-1.1 0-2.2-.4-3.1-1l-.8 1.9c1 .6 2.4.9 3.7.9 2.4 0 4.1-1.2 4.1-3.3 0-2.1-1.5-2.8-3.4-3.3zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
  </svg>
);

const FirebaseIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 text-amber-500 fill-current">
    <path d="M16 2L8 8l-4 6 12 8 8-8-8-14zm-4 6l4 3-4 5V8z" />
  </svg>
);

const SupabaseIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 text-emerald-500 fill-current">
    <path d="M19 11h-6.5l3-9L3 13h6.5l-3 9L19 11z" />
  </svg>
);

const GitIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 text-orange-500 fill-current">
    <path d="M22.3 11.2L12.8 1.7c-.4-.4-1.1-.4-1.5 0L1.7 11.2c-.4.4-.4 1.1 0 1.5l9.5 9.5c.4.4 1.1.4 1.5 0l9.5-9.5c.4-.4.4-1.1 0-1.5zM12 18.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm0-4.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5v3h-1.5v-3zm0-4.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5v3H12v-3z" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current text-slate-800 dark:text-zinc-200">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const VSCodeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 text-sky-500 fill-current">
    <path d="M23.9 6.5l-2.6-2.4c-.4-.4-1-.4-1.4 0L12 11.9 4.1 4.1c-.4-.4-1-.4-1.4 0L.1 6.5c-.2.2-.2.5 0 .7l7.8 7.8-7.8 7.8c-.2.2-.2.5 0 .7l2.6 2.4c.4.4 1 .4 1.4 0l7.9-7.8 7.9 7.8c.4.4 1 .4 1.4 0l2.6-2.4c.2-.2.2-.5 0-.7L16.2 15l7.8-7.8c.1-.2.1-.5-.1-.7z" />
  </svg>
);

const PostmanIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 text-orange-500 fill-current">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);

const FigmaIcon = () => (
  <svg viewBox="0 0 128 128" className="w-7 h-7 fill-none stroke-current" strokeWidth="12">
    <circle cx="43" cy="21" r="21" fill="#f24e1e" />
    <circle cx="85" cy="21" r="21" fill="#ff7262" />
    <circle cx="43" cy="64" r="21" fill="#a259ff" />
    <circle cx="85" cy="64" r="21" fill="#1abc9c" />
    <path d="M21 107a21 21 0 0043 0V85H21a21 21 0 000 22z" fill="#0acf83" />
  </svg>
);

const LinuxIcon = () => (
  <span className="text-xl">🐧</span>
);

const VpsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 text-yellow-500 fill-current">
    <path d="M19 15v3H5v-3h14m1-2H4a1 1 0 00-1 1v5a1 1 0 001 1h16a1 1 0 001-1v-5a1 1 0 00-1-1zM19 5v3H5V5h14m1-2H4a1 1 0 00-1 1v5a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1z" />
  </svg>
);

const AwsIcon = () => (
  <svg viewBox="0 0 128 128" className="w-7 h-7 text-orange-450 fill-current">
    <path d="M57.6 84.8c-1.8 1.4-4 2-6.4 2-5 0-7.8-2.6-7.8-7.6 0-7.8 8.6-10.4 20-10.4v2c0 5.4-1.8 11.2-5.8 14zm35.2-31c-3.6 4.8-12.8 7.4-19 8.8-11.2 2.6-26.6 4.8-26.6 17.6 0 9.8 6.4 15.6 16.2 15.6 9.8 0 16.6-4.6 20.4-11.4l1.6 8.8H96v-50c0-11-5.6-18-18-18-10.4 0-18.4 5-21 13.6l8.8 3.6c1.6-4.6 5.6-7.2 11.2-7.2 6.6 0 10.6 3.4 10.6 10v3l-4.8.2zm20.8-29.2c-5.2 6.8-12.8 13.2-19 18l5.8 6.4c5.2-4.6 12.8-10.6 17.6-17.2l-4.4-7.2z" />
  </svg>
);

const NginxIcon = () => (
  <div className="w-7 h-7 flex items-center justify-center rounded-full bg-emerald-600 font-bold text-xs text-white">
    N
  </div>
);

const skillCategories = [
  {
    title: 'Frontend',
    icon: <Code2 className="w-6 h-6 text-indigo-500" />,
    skills: [
      { name: 'JavaScript', icon: <JavaScriptIcon /> },
      { name: 'React.js', icon: <ReactIcon /> },
      { name: 'Next.js', icon: <NextjsIcon /> },
      { name: 'Tailwind CSS', icon: <TailwindIcon /> },
      { name: 'TypeScript', icon: <TypeScriptIcon /> },
      { name: 'shadcn/ui', icon: <ShadcnIcon /> },
      { name: 'Redux', icon: <ReduxIcon /> },
      { name: 'Zustand', icon: <ZustandIcon /> },
      { name: 'Tanstack Query', icon: <TanstackQueryIcon /> },
    ]
  },
  {
    title: 'Backend',
    icon: <Server className="w-6 h-6 text-indigo-500" />,
    skills: [
      { name: 'Node.js', icon: <NodeIcon /> },
      { name: 'Express.js', icon: <ExpressIcon /> },
      { name: 'MongoDB', icon: <MongoIcon /> },
      { name: 'Mongoose', icon: <MongooseIcon /> },
      { name: 'PostgreSQL', icon: <PostgresIcon /> },
      { name: 'Prisma', icon: <PrismaIcon /> },
      { name: 'Stripe/Payment', icon: <StripeIcon /> },
      { name: 'Firebase', icon: <FirebaseIcon /> },
      { name: 'Supabase', icon: <SupabaseIcon /> },
    ]
  },
  {
    title: 'Tools',
    icon: <Briefcase className="w-6 h-6 text-indigo-500" />,
    skills: [
      { name: 'Git', icon: <GitIcon /> },
      { name: 'GitHub', icon: <GithubIcon /> },
      { name: 'VS Code', icon: <VSCodeIcon /> },
      { name: 'Postman', icon: <PostmanIcon /> },
      { name: 'Figma', icon: <FigmaIcon /> },
      { name: 'Linux', icon: <LinuxIcon /> },
      { name: 'VPS', icon: <VpsIcon /> },
      { name: 'AWS', icon: <AwsIcon /> },
      { name: 'Nginx', icon: <NginxIcon /> },
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-50/20 dark:bg-black/5">
      {/* Ambient glow */}
      <div className="absolute top-10 left-10 w-[300px] h-[300px] rounded-full bg-cyan-500/5 dark:bg-cyan-500/3 blur-[80px] animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/3 blur-[80px] animate-pulse-glow" style={{ animationDelay: '4s' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/50 dark:border-indigo-800/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
            Skills
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            My Tech <span className="text-gradient">Skills</span>
          </h2>
        </div>

        {/* Skills Grid — 3 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="p-6 rounded-3xl bg-white/40 dark:bg-zinc-900/40 border border-slate-200/60 dark:border-zinc-800/60 shadow-xl shadow-slate-100/50 dark:shadow-none backdrop-blur-sm hover:border-indigo-300/40 dark:hover:border-indigo-700/40 transition-all duration-500"
            >
              {/* Category Header */}
              <div className="flex flex-col items-center justify-center text-center mb-8">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3 shadow-inner">
                  {category.icon}
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-3 gap-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-2 py-4 rounded-2xl bg-white/60 dark:bg-zinc-950/40 border border-slate-200/40 dark:border-zinc-900/50 hover:border-indigo-400/40 dark:hover:border-indigo-650/40 hover:scale-[1.03] transition-all duration-300 flex flex-col items-center justify-center text-center gap-2 aspect-square"
                  >
                    <div className="w-8 h-8 flex items-center justify-center">
                      {skill.icon}
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-zinc-300 leading-tight">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
