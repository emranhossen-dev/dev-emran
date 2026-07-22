"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingSpinner() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loading screen smoothly after hydration/initial page load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-xl transition-opacity duration-500 ${
        loading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative flex items-center justify-center">
        {/* Outer Rotating Gradient Ring */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-spin blur-[2px]" />

        {/* Glow Aura */}
        <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-indigo-500/30 animate-pulse blur-xl" />

        {/* Inner Profile Favicon Circle */}
        <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-white/20 bg-zinc-900 shadow-2xl p-0.5">
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src="/emran-hossen-developer-2026.webp"
              alt="Emran Hossen Portfolio Loader"
              fill
              sizes="96px"
              className="object-cover object-center animate-pulse"
              priority
            />
          </div>
        </div>
      </div>

      {/* Loading Status Text */}
      <div className="mt-6 flex flex-col items-center space-y-1 text-center">
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-white">
          Emran Hossen
        </h3>
        <p className="text-xs font-medium text-indigo-400 animate-pulse tracking-widest uppercase">
          Software Engineer & Full Stack Dev
        </p>
      </div>
    </div>
  );
}

/**
 * Reusable Component Loader with Round Profile Favicon Spinner
 */
export function SectionLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="w-full h-64 sm:h-80 rounded-2xl border border-slate-200/60 dark:border-zinc-800/60 bg-slate-50/50 dark:bg-zinc-950/50 flex flex-col items-center justify-center p-6 space-y-4">
      <div className="relative flex items-center justify-center">
        {/* Outer Rotating Ring */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-spin blur-[1px]" />
        
        {/* Profile Avatar */}
        <div className="absolute w-12 h-12 rounded-full overflow-hidden border border-white/30 bg-zinc-900 shadow-md">
          <Image
            src="/emran-hossen-developer-2026.webp"
            alt="Loading..."
            fill
            sizes="48px"
            className="object-cover object-center"
          />
        </div>
      </div>
      <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 tracking-wider">
        {text}
      </span>
    </div>
  );
}
