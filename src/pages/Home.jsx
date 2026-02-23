import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from '../components/portfolio/LoadingScreen';
import Navbar from '../components/portfolio/Navbar';
import HeroSection from '../components/portfolio/HeroSection';
import AboutSection from '../components/portfolio/AboutSection';
import EducationSection from '../components/portfolio/EducationSection';
import SkillsSection from '../components/portfolio/SkillsSection';
import ProjectsSection from '../components/portfolio/ProjectsSection';
import ContactSection from '../components/portfolio/ContactSection';
import Footer from '../components/portfolio/Footer';
import HireMeFAB from '../components/portfolio/HireMeFAB';
import CinematicScene from '../components/portfolio/CinematicScene';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-[#0a0a0f] min-h-screen grid-bg">
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <CinematicScene />
          <Navbar />
          <main className="relative z-[1]">
            <HeroSection />
            <AboutSection />
            <EducationSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
          </main>
          <Footer />
          <HireMeFAB />
        </>
      )}
    </div>
  );
}