"use client";

import { useTab } from "@/contexts/TabContext";
import { AnimatePresence, motion } from "framer-motion";
import TerminalHero from "@/components/sections/TerminalHero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";

const variants = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

export default function PortfolioTabs() {
  const { activeTab } = useTab();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={activeTab}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {activeTab === "home"         && <TerminalHero />}
        {activeTab === "about"        && <About />}
        {activeTab === "skills"       && <Skills />}
        {activeTab === "projects"     && <Projects />}
        {activeTab === "experience"   && <Experience />}
        {activeTab === "achievements" && <Achievements />}
        {activeTab === "contact"      && <Contact />}
      </motion.div>
    </AnimatePresence>
  );
}
