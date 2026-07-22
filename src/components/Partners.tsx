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
      <div className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-emerald-600 font-black text-base sm:text-lg tracking-wider shadow-lg">
        <Apple className="w-7 h-7 text-emerald-600" />
        <span className="text-slate-900">FOOD FOR HEALTH</span>
        <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-emerald-100 text-emerald-700 border border-emerald-300">NEW</span>
      </div>
    ),
  },
  {
    name: 'Learners Academy',
    url: 'https://learnersacademy.online',
    customLogo: (
      <div className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-indigo-600 font-black text-base sm:text-lg tracking-wider shadow-lg">
        <GraduationCap className="w-7 h-7 text-indigo-600" />
        <span className="text-slate-900">LEARNERS ACADEMY</span>
        <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-indigo-100 text-indigo-700 border border-indigo-300">NEW</span>
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 mb-10 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">
          <Building2 className="w-3.5 h-3.5" />
          Collaborations
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Trusted <span className="text-gradient">Partners &amp; Clients</span>
        </h2>
      </div>

      {/* Transparent Background Banner Strip with White Rounded Rectangle Logo Cards */}
      <div className="relative w-full py-12 sm:py-16 bg-slate-900/40 border-y border-white/10 backdrop-blur-xl overflow-hidden">
        {/* Left & Right Depth Fade Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#070d1e] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#070d1e] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max items-center animate-marquee space-x-10 sm:space-x-16 hover:[animation-play-state:paused]">
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
                <div className="bg-white rounded-2xl px-6 py-4 sm:px-8 sm:py-5 shadow-xl border border-slate-100 flex items-center justify-center h-24 sm:h-28 min-w-[200px] sm:min-w-[240px]">
                  <Image
                    src={item.src}
                    alt={item.name}
                    width={220}
                    height={90}
                    className="max-h-16 sm:max-h-20 w-auto object-contain"
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
