"use client";

import React, { useEffect, useState } from "react";

export default function LoadingSpinner() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reduced from 900ms → 400ms: allows LCP image to render sooner
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-xl transition-opacity duration-300 ${
        loading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative flex items-center justify-center">
        {/* Outer Rotating Gradient Ring */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-spin blur-[2px]" />
        {/* Glow Aura */}
        <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-indigo-500/30 animate-pulse blur-xl" />
        {/* Inner Circle — CSS only, no extra image request */}
        <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-white/20 bg-gradient-to-tr from-indigo-700 to-purple-700 shadow-2xl flex items-center justify-center">
          <span className="text-white text-2xl font-black">EH</span>
        </div>
      </div>

      {/* Loading Status Text */}
      <div className="mt-6 flex flex-col items-center space-y-1 text-center">
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-white">
          Emran Hossen
        </h3>
        <p className="text-xs font-medium text-indigo-400 animate-pulse tracking-widest uppercase">
          Software Engineer &amp; Full Stack Dev
        </p>
      </div>
    </div>
  );
}

/**
 * Reusable Component Loader
 */
export function SectionLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="w-full h-64 sm:h-80 rounded-2xl border border-zinc-800/60 bg-zinc-950/50 flex flex-col items-center justify-center p-6 space-y-4">
      <div className="w-10 h-10 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      <span className="text-xs font-semibold text-zinc-400 tracking-wider">
        {text}
      </span>
    </div>
  );
}
