import TerminalHero from "@/components/sections/TerminalHero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <TerminalHero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Contact />
    </>
  );
}
