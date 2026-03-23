"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "@/lib/data";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const allNavItems = [
  ...navItems,
  { name: "Achievements", href: "#achievements" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = allNavItems.map((i) => i.href.replace("#", ""));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 140) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  if (!mounted) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "color-mix(in srgb, var(--bg) 92%, transparent)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
        }}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => scrollTo("#home")}
              className="font-display font-bold text-sm tracking-tight transition-opacity hover:opacity-70"
              style={{ color: "var(--text)", letterSpacing: "-0.01em" }}
            >
              SW
              <span className="font-mono font-normal ml-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
                .dev
              </span>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {allNavItems.map((item, i) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => scrollTo(item.href)}
                    className="relative px-3.5 py-2 text-xs font-mono uppercase transition-colors"
                    style={{
                      color: isActive ? "var(--text)" : "var(--text-muted)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {item.name}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-3.5 right-3.5 h-px"
                        style={{ background: "var(--accent)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Right: theme toggle + mobile menu */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                className="md:hidden p-2 rounded-lg transition-colors"
                style={{ color: "var(--text-muted)" }}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden pt-16 flex flex-col"
            style={{ background: "rgba(8,9,14,0.97)", backdropFilter: "blur(24px)" }}
          >
            <div className="section-container py-10 flex flex-col gap-2">
              {allNavItems.map((item, i) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(item.href)}
                  className="text-left py-3 font-display font-semibold text-xl transition-colors hover:opacity-70"
                  style={{
                    color: activeSection === item.href.replace("#", "") ? "var(--accent)" : "var(--text)",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
