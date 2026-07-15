'use client';

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Skills from "@/components/Skills";
import EducationExperience from "@/components/EducationExperience";
import Projects from "@/components/Projects";
import GitHubStats from "@/components/GitHubStats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

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
