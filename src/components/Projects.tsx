'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, X, ShieldAlert, Rocket, Code, Globe, Lock, ChevronLeft, ChevronRight } from 'lucide-react';
import { GithubIcon } from './BrandIcons';

interface Project {
  id: number;
  name: string;
  image: string;
  type: string;
  stack: string[];
  description: string;
  liveLink: string;
  githubLink: string;
  isGithubPrivate?: boolean;
  isWIP?: boolean;
  challenges: string;
  improvements: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    name: "Luminous Centre",
    image: "/project_luminous.png",
    type: "Learning Management System",
    stack: ["Next.js", "React", "Node.js", "PostgreSQL", "Supabase", "Tailwind CSS"],
    description: "A comprehensive skill development training center platform featuring full course catalogs, online video streaming, interactive quizzes, grading models, automated certificate generation, and a management panel for instructors and admins.",
    liveLink: "https://luminouscentre.org",
    githubLink: "https://github.com/emranhossen-dev/Luminous-Centre",
    challenges: "Handling smooth video playback buffering for students on slow networks. Resolved by designing dynamic streaming hooks. Real-time quiz syncing and progress updates were achieved by configuring Supabase database subscriptions directly to React clients.",
    improvements: "Planning to build an AI learning assistant that analyzes student test performance and dynamically creates customized mock exams. Also packaging the student dashboard inside a native mobile app using React Native."
  },
  {
    id: 2,
    name: "IronLocker",
    image: "/project_ironlocker.png",
    type: "Secure Personal Vault",
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Web Crypto API"],
    description: "A secure personal vault where users can store passwords, photos, notes, text, and videos — like a personal drive. No Gmail login or code required. Features strong client-side encryption and an intuitive file management interface.",
    liveLink: "https://locker.emran.work",
    githubLink: "",
    isGithubPrivate: true,
    challenges: "Deriving stable, secure encryption keys using PBKDF2 that survive browser reload without storing them in raw format. Solved using session-based memory structures and the native Web Cryptography API.",
    improvements: "Introducing biometric authentication (WebAuthn/Touch ID), building a Chrome extension for autofill, and adding file sharing with expiring links."
  },
  {
    id: 3,
    name: "YazMart",
    image: "/project_yazmart.png",
    type: "E-Commerce Platform",
    stack: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS", "Stripe"],
    description: "A full-featured e-commerce marketplace with product catalogs, shopping cart, secure checkout, order tracking, and admin inventory management. Built for a seamless and modern online shopping experience.",
    liveLink: "https://yazmart.com",
    githubLink: "https://github.com/emranhossen-dev/YazMart",
    challenges: "Building a scalable product search and filtering system that handles large inventories. Implementing secure payment processing and managing order state transitions across multiple services.",
    improvements: "Adding product recommendation engine, wishlist functionality, multi-vendor support, and integrating real-time delivery tracking."
  },
  {
    id: 4,
    name: "Symphony Softech Ltd",
    image: "/project_symphony.png",
    type: "Corporate Website",
    stack: ["React", "Next.js", "Tailwind CSS", "Node.js"],
    description: "Official website for Symphony Softech Limited, a software company. Features a modern corporate design with service showcases, team sections, portfolio displays, and contact functionality. Built with performance and SEO optimization in mind.",
    liveLink: "https://ssl-institute.shampanlab.com/",
    githubLink: "https://github.com/emranhossen-dev/symphony-softtech-ltd",
    challenges: "Creating a design that communicates professionalism while remaining engaging. Implementing smooth page transitions and ensuring the site loads quickly with optimized images and lazy loading.",
    improvements: "Adding a blog section for tech articles, implementing a client portal for project tracking, and integrating analytics dashboards."
  },
  {
    id: 5,
    name: "GadgetBro",
    image: "/project_gadgetbro.png",
    type: "Gadget E-Commerce",
    stack: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    description: "An e-commerce platform specifically designed for gadget and electronics items. Features product comparison, detailed spec sheets, user reviews, and a streamlined purchasing flow. Currently under active development.",
    liveLink: "https://gadgetbro.shop",
    githubLink: "https://github.com/emranhossen-dev/GadgetBro",
    isWIP: true,
    challenges: "Designing an intuitive product comparison feature and handling complex product variant configurations (colors, storage options, etc.). Building a responsive gallery with zoom functionality.",
    improvements: "Completing the admin dashboard, adding real-time inventory management, implementing push notifications for price drops, and building a mobile-first PWA version."
  },
  {
    id: 6,
    name: "Food For Health",
    image: "/project_foodforhealth.png",
    type: "Organic E-Commerce",
    stack: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    description: "An organic food and health products e-commerce platform dedicated to selling quality organic items. Features product categories, nutritional information displays, subscription boxes, and health-conscious shopping guides.",
    liveLink: "https://foodforhealth.emran.work",
    githubLink: "https://github.com/emranhossen-dev/food-for-health",
    isWIP: true,
    challenges: "Creating an engaging UI that communicates the organic and health-focused brand identity. Implementing subscription-based ordering and recurring payment logic for meal boxes.",
    improvements: "Adding recipe suggestions based on purchased items, nutritional calculator, and partnering with local organic farms for direct-to-consumer delivery."
  },
  {
    id: 7,
    name: "Module Maker",
    image: "/project_modulemaker.png",
    type: "EdTech Tool",
    stack: ["React", "Next.js", "Node.js", "Supabase", "Tailwind CSS"],
    description: "A specialized tool for educational institutes to create course modules and curriculum structures efficiently. Supports bulk uploading of module content, curriculum organization, and eliminates the hassle of manual module creation.",
    liveLink: "https://module-maker.emran.work",
    githubLink: "https://github.com/emranhossen-dev/module-maker",
    challenges: "Designing an intuitive drag-and-drop interface for curriculum builders. Handling bulk CSV/JSON uploads with validation and error reporting.",
    improvements: "Adding AI-powered curriculum suggestions, PDF export for printed syllabi, collaborative editing for multiple instructors, and template marketplace."
  }
];

const ITEMS_PER_PAGE = 3;

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(projectsData.length / ITEMS_PER_PAGE);
  const paginatedProjects = projectsData.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to projects section top
    const el = document.getElementById('projects');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 right-10 w-[350px] h-[350px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/3 blur-[90px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-10 w-[350px] h-[350px] rounded-full bg-purple-500/5 dark:bg-purple-500/3 blur-[90px] animate-pulse-glow" style={{ animationDelay: '3s' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/50 dark:border-indigo-800/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
            My Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Recent <span className="text-gradient">Projects</span>
          </h2>
          <p className="mt-4 text-slate-500 dark:text-zinc-400 text-sm sm:text-base max-w-lg mx-auto">
            A collection of real-world applications I&apos;ve built — from LMS platforms to e-commerce solutions and developer tools.
          </p>
        </div>

        {/* Project Cards Grid — 3 per page */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {paginatedProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col h-full rounded-2xl overflow-hidden bg-white/50 dark:bg-zinc-900/50 border border-slate-200/60 dark:border-zinc-800/60 backdrop-blur-sm hover:border-indigo-300/40 dark:hover:border-indigo-700/40 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative w-full h-[200px] overflow-hidden bg-slate-100 dark:bg-zinc-900">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {project.isWIP && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-amber-500/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                    🚧 In Progress
                  </div>
                )}
                {project.isGithubPrivate && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-900/80 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Private
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1 justify-between space-y-3">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-600 dark:text-indigo-400">
                    {project.type}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{project.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 text-center py-2.5 rounded-xl border border-slate-200/60 dark:border-zinc-800/60 font-semibold text-xs text-slate-700 dark:text-zinc-300 bg-white/40 dark:bg-zinc-900/40 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white hover:border-transparent transition-all duration-300 cursor-pointer"
                  >
                    View Details
                  </button>
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-slate-200/60 dark:border-zinc-800/60 text-slate-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
                    aria-label="Live preview"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 0}
              className="p-2.5 rounded-xl border border-slate-200/60 dark:border-zinc-800/60 text-slate-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                  currentPage === i
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 dark:bg-indigo-500'
                    : 'border border-slate-200/60 dark:border-zinc-800/60 text-slate-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-700'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className="p-2.5 rounded-xl border border-slate-200/60 dark:border-zinc-800/60 text-slate-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-zinc-800 flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>

            <div className="relative w-full h-[220px] sm:h-[280px] shrink-0 bg-slate-100 dark:bg-zinc-950">
              <Image src={selectedProject.image} alt={selectedProject.name} fill className="object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 hover:scale-105 active:scale-95 transition cursor-pointer" aria-label="Close modal">
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-6 left-6 sm:left-8 right-6">
                <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-400 bg-indigo-950/60 border border-indigo-500/20 px-2.5 py-0.5 rounded-full">
                  {selectedProject.type}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">{selectedProject.name}</h2>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-sm text-slate-700 dark:text-zinc-300">
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-base">
                  <Code className="w-4 h-4 text-indigo-500" /> Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedProject.stack.map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 border border-slate-200/50 dark:border-zinc-700/50">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">Overview</h4>
                <p className="leading-relaxed">{selectedProject.description}</p>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                <h4 className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2 text-base">
                  <ShieldAlert className="w-4 h-4" /> Challenges Faced
                </h4>
                <p className="leading-relaxed">{selectedProject.challenges}</p>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                <h4 className="font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2 text-base">
                  <Rocket className="w-4 h-4" /> Improvements &amp; Future Plans
                </h4>
                <p className="leading-relaxed">{selectedProject.improvements}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200/60 dark:border-zinc-800/60">
                <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-md shadow-indigo-600/10 transition-all duration-300 cursor-pointer">
                  <ExternalLink className="w-4 h-4" /> Live Preview
                </a>
                {selectedProject.isGithubPrivate ? (
                  <div className="flex-1 flex items-center justify-center gap-2 bg-slate-100 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 py-3 px-6 rounded-xl font-semibold border border-slate-200/60 dark:border-zinc-700/60">
                    <Lock className="w-4 h-4" /> Private Repository
                  </div>
                ) : (
                  <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-transparent hover:bg-slate-100 text-slate-700 border border-slate-200 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-800 py-3 px-6 rounded-xl font-semibold transition-all duration-300 cursor-pointer">
                    <GithubIcon className="w-4 h-4" /> GitHub Repository
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
