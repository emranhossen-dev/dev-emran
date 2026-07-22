'use client';

import React from 'react';
import Image from 'next/image';
import { ExternalLink, Sparkles, Building2, GraduationCap, ShoppingBag, Smartphone, Apple, BookOpen } from 'lucide-react';

interface Partner {
  name: string;
  domain: string;
  url: string;
  category: string;
  isNew?: boolean;
  logo?: string;
  customIcon?: React.ReactNode;
  accentColor: string;
}

const partners: Partner[] = [
  {
    name: 'Symphony Softtech Ltd.',
    domain: 'symphonysoftt.com',
    url: 'https://symphonysoftt.com/',
    category: 'Software Solutions',
    logo: '/partners/symphony.webp',
    accentColor: '#4ade80',
  },
  {
    name: 'Luminous Skill Development',
    domain: 'luminouscentre.org',
    url: 'https://luminouscentre.org',
    category: 'Training Center',
    logo: '/partners/luminous.webp',
    accentColor: '#f97316',
  },
  {
    name: 'YazMart',
    domain: 'yazmart.com',
    url: 'https://yazmart.com',
    category: 'E-Commerce Platform',
    logo: '/partners/yazmart.webp',
    accentColor: '#f97316',
  },
  {
    name: 'GadgetBro',
    domain: 'gadgetbro.shop',
    url: 'https://gadgetbro.shop',
    category: 'Smart Tech Retail',
    logo: '/partners/gadgetbro.webp',
    accentColor: '#38bdf8',
  },
  {
    name: 'Food For Health',
    domain: 'foodforhealth.com',
    url: 'https://foodforhealth.com',
    category: 'Health & Nutrition',
    isNew: true,
    customIcon: <Apple className="w-6 h-6 text-emerald-400" />,
    accentColor: '#10b981',
  },
  {
    name: 'Learners Academy',
    domain: 'learnersacademy.online',
    url: 'https://learnersacademy.online',
    category: 'EdTech Platform',
    isNew: true,
    customIcon: <BookOpen className="w-6 h-6 text-indigo-400" />,
    accentColor: '#6366f1',
  },
];

// Duplicate items to ensure seamless 360 infinite loop
const doublePartners = [...partners, ...partners];

export default function Partners() {
  return (
    <section id="partners" className="py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 mb-12 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
          <Building2 className="w-3.5 h-3.5" />
          Collaborations &amp; Clients
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Trusted <span className="text-gradient">Partners &amp; Projects</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Companies, agencies, and platforms I&apos;ve engineered web solutions for.
        </p>
      </div>

      {/* Infinite Horizontal Marquee Carousel */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left & Right Gradient Fades for depth */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#070d1e] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#070d1e] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee space-x-6 hover:[animation-play-state:paused]">
          {doublePartners.map((item, index) => (
            <a
              key={`${item.domain}-${index}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card px-6 py-4 rounded-2xl flex items-center gap-4 border border-white/12 hover:border-cyan-400/60 transition-all duration-300 group shrink-0 w-[280px] sm:w-[320px] bg-slate-900/60 backdrop-blur-xl cursor-pointer"
            >
              {/* Logo / Badge Box */}
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center p-1.5 shrink-0 shadow-md border border-slate-200/40 relative overflow-hidden">
                {item.logo ? (
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={52}
                    height={52}
                    className="object-contain max-h-12 w-auto"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-950 rounded-lg flex items-center justify-center">
                    {item.customIcon}
                  </div>
                )}
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white truncate group-hover:text-cyan-400 transition-colors">
                    {item.name}
                  </h3>
                  {item.isNew && (
                    <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shrink-0">
                      New
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.category}</p>
                <div className="flex items-center gap-1 text-[11px] text-indigo-400 group-hover:text-cyan-300 transition-colors mt-1 font-medium">
                  <span>{item.domain}</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
