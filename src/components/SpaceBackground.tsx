'use client';

export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-50 dark:bg-[#070d1e] transition-colors duration-500">
      {/* Deep Space Ambient Nebulas (Dark Mode) */}
      <div className="absolute top-[-10%] left-[-10%] w-[750px] h-[750px] rounded-full bg-indigo-200/40 dark:bg-[#4a2774]/35 blur-[160px] animate-pulse-glow" />
      <div className="absolute top-[25%] right-[-10%] w-[700px] h-[700px] rounded-full bg-blue-200/40 dark:bg-[#1e3a8a]/45 blur-[170px] animate-pulse-glow" style={{ animationDelay: '3s' }} />
      <div className="absolute top-[55%] left-[-10%] w-[650px] h-[650px] rounded-full bg-purple-200/30 dark:bg-[#581c87]/30 blur-[150px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-[-10%] right-[5%] w-[800px] h-[800px] rounded-full bg-sky-200/40 dark:bg-[#1d4ed8]/35 blur-[180px] animate-pulse-glow" style={{ animationDelay: '4.5s' }} />
      <div className="absolute top-[80%] left-[20%] w-[600px] h-[600px] rounded-full bg-cyan-200/30 dark:bg-[#0284c7]/25 blur-[140px] animate-pulse-glow" style={{ animationDelay: '2.5s' }} />

      {/* Floating Cosmic Star Particles (Dark Mode Only) */}
      <div className="hidden dark:block">
        <div className="absolute top-[12%] left-[15%] w-1.5 h-1.5 rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-float-slow" />
        <div className="absolute top-[28%] left-[75%] w-2 h-2 rounded-full bg-purple-300/60 shadow-[0_0_10px_rgba(192,132,252,0.8)] animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[45%] left-[30%] w-1 h-1 rounded-full bg-cyan-300/80 shadow-[0_0_6px_rgba(103,232,249,0.9)] animate-pulse" />
        <div className="absolute top-[62%] left-[85%] w-2.5 h-2.5 rounded-full bg-indigo-300/50 shadow-[0_0_12px_rgba(165,180,252,0.7)] animate-float-slow" style={{ animationDelay: '2.5s' }} />
        <div className="absolute top-[78%] left-[10%] w-1.5 h-1.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.9)] animate-pulse" style={{ animationDelay: '3.5s' }} />
        <div className="absolute top-[88%] left-[60%] w-2 h-2 rounded-full bg-pink-300/60 shadow-[0_0_10px_rgba(244,114,182,0.8)] animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-[5%] right-[25%] w-1 h-1 rounded-full bg-white/90 shadow-[0_0_6px_rgba(255,255,255,1)] animate-pulse" />
        <div className="absolute top-[50%] right-[40%] w-1.5 h-1.5 rounded-full bg-blue-300/70 shadow-[0_0_8px_rgba(147,197,253,0.8)] animate-float-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Dot Grid Texture Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(15,23,42,0.06)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px] opacity-70" />
      
      {/* Geometric Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
    </div>
  );
}
