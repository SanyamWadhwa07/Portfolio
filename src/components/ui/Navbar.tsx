"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useTab, type TabId } from "@/contexts/TabContext";

const TABS: { name: string; id: TabId }[] = [
  { name: "Home",         id: "home"          },
  { name: "About",        id: "about"         },
  { name: "Skills",       id: "skills"        },
  { name: "Projects",     id: "projects"      },
  { name: "Experience",   id: "experience"    },
  { name: "Achievements", id: "achievements"  },
  { name: "Contact",      id: "contact"       },
];

export default function Navbar() {
  const { activeTab, setActiveTab } = useTab();
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted]       = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const navigate = (id: TabId) => {
    setMobileOpen(false);
    setActiveTab(id);
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
          background: scrolled
            ? "color-mix(in srgb, var(--bg) 92%, transparent)"
            : "transparent",
          backdropFilter:         scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter:   scrolled ? "blur(16px)" : "none",
          borderBottom:           scrolled ? "1px solid var(--border)" : "none",
        }}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <button
              onClick={() => navigate("home")}
              className="font-display font-bold text-sm tracking-tight transition-opacity hover:opacity-70 flex-shrink-0"
              style={{ color: "var(--text)", letterSpacing: "-0.01em" }}
            >
              SW
              <span
                className="font-mono font-normal ml-1.5 text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                .dev
              </span>
            </button>

            {/* Desktop tabs */}
            <div className="hidden md:flex items-center gap-0.5">
              {TABS.map((tab, i) => {
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => navigate(tab.id)}
                    className="relative px-3.5 py-2 text-xs font-mono uppercase transition-colors"
                    style={{
                      color:          isActive ? "var(--text)" : "var(--text-muted)",
                      letterSpacing:  "0.10em",
                    }}
                  >
                    {tab.name}
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

            {/* Right: theme toggle + hamburger */}
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

      {/* Mobile drawer */}
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
              {TABS.map((tab, i) => {
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => navigate(tab.id)}
                    className="text-left py-3 px-3 font-display font-semibold text-xl transition-all rounded-lg"
                    style={{
                      color:        isActive ? "var(--accent)" : "var(--text)",
                      borderBottom: "1px solid var(--border)",
                      borderLeft:   isActive ? "2px solid var(--accent)" : "2px solid transparent",
                      background:   isActive ? "var(--accent-dim)" : "transparent",
                    }}
                  >
                    {tab.name}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
