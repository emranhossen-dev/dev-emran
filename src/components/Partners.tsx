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
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-extrabold text-sm tracking-wide">
        <Apple className="w-5 h-5 text-emerald-400" />
        <span className="text-white">FOOD FOR HEALTH</span>
        <span className="px-1.5 py-0.5 text-[9px] font-black uppercase rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">NEW</span>
      </div>
    ),
  },
  {
    name: 'Learners Academy',
    url: 'https://learnersacademy.online',
    customLogo: (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 font-extrabold text-sm tracking-wide">
        <GraduationCap className="w-5 h-5 text-indigo-400" />
        <span className="text-white">LEARNERS ACADEMY</span>
        <span className="px-1.5 py-0.5 text-[9px] font-black uppercase rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">NEW</span>
      </div>
    ),
  },
];

// Duplicate items for seamless 360-degree infinite marquee loop
const infiniteLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos];

export default function Partners() {
  return (
    <section id="partners" className="py-16 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 mb-8 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">
          <Building2 className="w-3.5 h-3.5" />
          Collaborations
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Trusted <span className="text-gradient">Partners &amp; Clients</span>
        </h2>
      </div>

      {/* Single Transparent Background Banner Strip with Infinite Scrolling Floating Logos */}
      <div className="relative w-full py-6 bg-slate-900/40 border-y border-white/10 backdrop-blur-xl overflow-hidden">
        {/* Left & Right Depth Fade Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#070d1e] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#070d1e] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max items-center animate-marquee space-x-12 sm:space-x-16 hover:[animation-play-state:paused]">
          {infiniteLogos.map((item, index) => (
            <a
              key={`${item.name}-${index}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`Visit ${item.name}`}
              className="flex items-center justify-center transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-105 shrink-0 px-2 cursor-pointer"
            >
              {item.src ? (
                <div className="relative h-12 sm:h-14 w-auto flex items-center justify-center">
                  <Image
                    src={item.src}
                    alt={item.name}
                    width={180}
                    height={56}
                    className={`h-10 sm:h-12 w-auto object-contain transition-all duration-300 filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)] ${item.invertDark ? 'brightness-0 invert' : ''}`}
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
