"use client";

import ThemePanel from '../components/ThemePanel';
import BackgroundAnimation from '../components/BackgroundAnimation';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ExperienceTimeline from '../components/ExperienceTimeline';
import ProjectsSection from '../components/Projects/ProjectsSection';
import ContactSection from '../components/ContactSection';
import AskAbhi from '../components/AskAbhi';

export default function Home() {
  return (
    <>
      <BackgroundAnimation />
      <ThemePanel />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceTimeline />
        <ProjectsSection />
        <ContactSection />
      </main>
      <AskAbhi />
    </>
  );
}
