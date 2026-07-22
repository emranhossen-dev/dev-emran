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
    src: '/partners/symphony_clean.webp',
  },
  {
    name: 'Luminous Skill Development Training Center',
    url: 'https://luminouscentre.org',
    src: '/partners/luminous_clean.webp',
  },
  {
    name: 'YazMart',
    url: 'https://yazmart.com',
    src: '/partners/yazmart_clean.webp',
  },
  {
    name: 'GadgetBro',
    url: 'https://gadgetbro.shop',
    src: '/partners/gadgetbro_clean.webp',
    invertDark: true,
  },
  {
    name: 'Food For Health',
    url: 'https://foodforhealth.com',
    customLogo: (
      <div className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 font-black text-base sm:text-lg tracking-wider shadow-lg">
        <Apple className="w-7 h-7 text-emerald-400" />
        <span className="text-white">FOOD FOR HEALTH</span>
        <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">NEW</span>
      </div>
    ),
  },
  {
    name: 'Learners Academy',
    url: 'https://learnersacademy.online',
    customLogo: (
      <div className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-indigo-950/70 border border-indigo-500/40 text-indigo-400 font-black text-base sm:text-lg tracking-wider shadow-lg">
        <GraduationCap className="w-7 h-7 text-indigo-400" />
        <span className="text-white">LEARNERS ACADEMY</span>
        <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">NEW</span>
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

      {/* 2.5x Height Transparent Background Banner Strip */}
      <div className="relative w-full py-12 sm:py-16 bg-slate-900/40 border-y border-white/10 backdrop-blur-xl overflow-hidden">
        {/* Left & Right Depth Fade Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#070d1e] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#070d1e] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max items-center animate-marquee space-x-16 sm:space-x-24 hover:[animation-play-state:paused]">
          {infiniteLogos.map((item, index) => (
            <a
              key={`${item.name}-${index}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`Visit ${item.name}`}
              className="flex items-center justify-center transition-all duration-300 opacity-85 hover:opacity-100 hover:scale-105 shrink-0 px-4 cursor-pointer"
            >
              {item.src ? (
                <div className="relative h-20 sm:h-28 w-auto flex items-center justify-center">
                  <Image
                    src={item.src}
                    alt={item.name}
                    width={280}
                    height={110}
                    className={`h-20 sm:h-24 w-auto object-contain transition-all duration-300 filter drop-shadow-[0_4px_16px_rgba(255,255,255,0.12)] ${item.invertDark ? 'brightness-0 invert' : ''}`}
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
