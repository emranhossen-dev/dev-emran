import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Skills from "@/components/Skills";
import EducationExperience from "@/components/EducationExperience";
import Footer from "@/components/Footer";
import SpaceBackground from "@/components/SpaceBackground";
import LoadingSpinner, { SectionLoader } from "@/components/LoadingSpinner";
import ScrollReveal from "@/components/ScrollReveal";

// Dynamically import below-the-fold / interactive client components to defer bundle loading and hydration
const Projects = dynamic(() => import("@/components/Projects"), {
  loading: () => <SectionLoader text="Loading Projects..." />
});

const GitHubStats = dynamic(() => import("@/components/GitHubStats"), {
  loading: () => <SectionLoader text="Loading GitHub Activity..." />
});

const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <SectionLoader text="Loading Contact..." />
});

export default function Home() {
  return (
    <>
      <SpaceBackground />
      <LoadingSpinner />
      <Navbar />

      <main className="flex-1 w-full relative z-10 overflow-hidden">
        <Hero />

        <ScrollReveal variant="fade-up">
          <AboutMe />
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <Skills />
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <EducationExperience />
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <Projects />
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <GitHubStats />
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <Contact />
        </ScrollReveal>
      </main>

      <Footer />
    </>
  );
}
