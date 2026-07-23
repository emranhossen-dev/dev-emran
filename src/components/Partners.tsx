'use client';

import React from 'react';
import Image from 'next/image';
import { Building2, Apple, GraduationCap } from 'lucide-react';

interface PartnerLogo {
  name: string;
  url: string;
  src?: string;
  customLogo?: React.ReactNode;
  invertDark?: boolean;
}

const partnerLogos: PartnerLogo[] = [
  {
    name: 'Symphony Softtech Ltd.',
    url: 'https://symphonysoftt.com/',
    src: '/partners/symphony.webp',
  },
  {
    name: 'Luminous Skill Development Training Center',
    url: 'https://luminouscentre.org',
    src: '/partners/luminous.webp',
  },
  {
    name: 'YazMart',
    url: 'https://yazmart.com',
    src: '/partners/yazmart.webp',
  },
  {
    name: 'GadgetBro',
    url: 'https://gadgetbro.shop',
    src: '/partners/gadgetbro.webp',
  },
  {
    name: 'Food For Health',
    url: 'https://foodforhealth.com',
    customLogo: (
      <div className="flex items-center gap-3 px-6 rounded-2xl bg-white dark:bg-[#0c1427] border border-slate-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-black text-base sm:text-lg tracking-wider shadow-md h-20 sm:h-24 min-w-[210px] sm:min-w-[250px] justify-center">
        <Apple className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
        <span className="text-slate-900 dark:text-white">FOOD FOR HEALTH</span>
        <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/50">NEW</span>
      </div>
    ),
  },
  {
    name: 'Learners Academy',
    url: 'https://learnersacademy.online',
    customLogo: (
      <div className="flex items-center gap-3 px-6 rounded-2xl bg-white dark:bg-[#0c1427] border border-slate-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-black text-base sm:text-lg tracking-wider shadow-md h-20 sm:h-24 min-w-[210px] sm:min-w-[250px] justify-center">
        <GraduationCap className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
        <span className="text-slate-900 dark:text-white">LEARNERS ACADEMY</span>
        <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700/50">NEW</span>
      </div>
    ),
  },
];

// Duplicate items for seamless 360-degree infinite marquee loop
const infiniteLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos];

export default function Partners() {
  return (
    <section id="partners" className="py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 mb-10 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">
          <Building2 className="w-3.5 h-3.5" />
          Collaborations
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Trusted <span className="text-gradient">Partners &amp; Clients</span>
        </h2>
      </div>

      {/* Background Banner Strip with Light & Dark Theme Support */}
      <div className="relative w-full py-8 sm:py-10 bg-slate-200/60 dark:bg-slate-950/60 border-y border-slate-300/80 dark:border-white/10 backdrop-blur-xl overflow-hidden">
        {/* Left & Right Depth Fade Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-100 dark:from-[#070d1e] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-100 dark:from-[#070d1e] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max items-center animate-marquee space-x-8 sm:space-x-12 hover:[animation-play-state:paused]">
          {infiniteLogos.map((item, index) => (
            <a
              key={`${item.name}-${index}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`Visit ${item.name}`}
              className="flex items-center justify-center transition-all duration-300 opacity-90 hover:opacity-100 hover:scale-105 shrink-0 px-2 cursor-pointer"
            >
              {item.src ? (
                <div className="bg-white rounded-2xl p-2 sm:p-2.5 shadow-md border border-slate-200/80 dark:border-white/20 flex items-center justify-center h-20 sm:h-24 min-w-[200px] sm:min-w-[240px]">
                  <Image
                    src={item.src}
                    alt={item.name}
                    width={260}
                    height={100}
                    className="h-16 sm:h-20 w-auto max-w-[92%] object-contain"
                  />
                </div>
              ) : (
                item.customLogo
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
