'use client';

export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#070d1e]">
      {/* Deep Space Ambient Nebulas — reduced from 5 to 4 blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[750px] h-[750px] rounded-full bg-[#4a2774]/30 blur-[160px] animate-pulse-glow" />
      <div className="absolute top-[25%] right-[-10%] w-[700px] h-[700px] rounded-full bg-[#1e3a8a]/40 blur-[170px] animate-pulse-glow" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-[-10%] right-[5%] w-[800px] h-[800px] rounded-full bg-[#1d4ed8]/30 blur-[180px] animate-pulse-glow" style={{ animationDelay: '4.5s' }} />
      <div className="absolute top-[80%] left-[20%] w-[600px] h-[600px] rounded-full bg-[#0284c7]/20 blur-[140px] animate-pulse-glow" style={{ animationDelay: '2.5s' }} />

      {/* Floating Cosmic Star Particles — reduced from 8 to 4 for DOM savings */}
      <div className="absolute top-[12%] left-[15%] w-1.5 h-1.5 rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-float-slow" />
      <div className="absolute top-[62%] left-[85%] w-2.5 h-2.5 rounded-full bg-indigo-300/50 shadow-[0_0_12px_rgba(165,180,252,0.7)] animate-float-slow" style={{ animationDelay: '2.5s' }} />
      <div className="absolute top-[45%] left-[30%] w-1 h-1 rounded-full bg-cyan-300/80 shadow-[0_0_6px_rgba(103,232,249,0.9)] animate-pulse" />
      <div className="absolute top-[5%] right-[25%] w-1 h-1 rounded-full bg-white/90 shadow-[0_0_6px_rgba(255,255,255,1)] animate-pulse" />

      {/* Dot Grid Texture Layer — CSS only, zero DOM nodes */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
    </div>
  );
}
