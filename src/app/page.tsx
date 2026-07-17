import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Skills from "@/components/Skills";
import EducationExperience from "@/components/EducationExperience";
import Footer from "@/components/Footer";

// Dynamically import below-the-fold / interactive client components to defer bundle loading and hydration
const Projects = dynamic(() => import("@/components/Projects"), {
  loading: () => <div className="h-96 w-full animate-pulse bg-slate-100/50 dark:bg-zinc-900/50 rounded-2xl border border-slate-200/50 dark:border-zinc-800/50 flex items-center justify-center text-sm font-semibold text-slate-400 dark:text-zinc-500">Loading Projects...</div>
});

const GitHubStats = dynamic(() => import("@/components/GitHubStats"), {
  loading: () => <div className="h-[120px] w-full animate-pulse bg-slate-100/50 dark:bg-zinc-900/50 rounded-xl border border-slate-200/50 dark:border-zinc-800/50 flex items-center justify-center text-sm font-semibold text-slate-400 dark:text-zinc-500">Loading GitHub Activity...</div>
});

const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <div className="h-96 w-full animate-pulse bg-slate-100/50 dark:bg-zinc-900/50 rounded-2xl border border-slate-200/50 dark:border-zinc-800/50 flex items-center justify-center text-sm font-semibold text-slate-400 dark:text-zinc-500">Loading Contact...</div>
});

const ThemeToggle = dynamic(() => import("@/components/ThemeToggle"), {
  loading: () => <div className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-slate-200/50 dark:bg-zinc-800/50 animate-pulse border border-slate-300 dark:border-zinc-700" />
});

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex-1 w-full relative">
        <Hero />
        <AboutMe />
        <Skills />
        <EducationExperience />
        <Projects />
        <GitHubStats />
        <Contact />
      </main>

      <Footer />
      <ThemeToggle />
    </>
  );
}
