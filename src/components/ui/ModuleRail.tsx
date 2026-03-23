"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MODULES = [
  { id: "home", label: "Intro", index: "01" },
  { id: "about", label: "Background", index: "02" },
  { id: "skills", label: "Tooling", index: "03" },
  { id: "projects", label: "Experiments", index: "04" },
  { id: "experience", label: "Field Notes", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
];

export default function ModuleRail() {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      let current = "home";
      for (const module of MODULES) {
        const el = document.getElementById(module.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.3) {
            current = module.id;
          }
        }
      }
      setActive(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-y-0 left-4 z-40 hidden lg:flex items-center">
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="pointer-events-auto flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white/90 px-3 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-zinc-800/80 dark:bg-black/70 dark:shadow-[0_18px_60px_rgba(0,0,0,0.8)]"
      >
        <div className="mb-2 text-[9px] font-mono uppercase tracking-[0.24em] text-slate-500 dark:text-zinc-500">
          Modules
        </div>
        <div className="relative flex flex-col gap-1">
          {/* Vertical line */}
          <div className="pointer-events-none absolute left-3 top-0 h-full w-px bg-gradient-to-b from-emerald-400/60 via-slate-400/60 to-slate-200 dark:via-zinc-700/60 dark:to-zinc-900" />

          {MODULES.map((module) => {
            const isActive = active === module.id;
            return (
              <button
                key={module.id}
                type="button"
                onClick={() => {
                  const el = document.getElementById(module.id);
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative flex items-center gap-2 py-1 pl-6 pr-2 text-left"
              >
                <span
                  className={`relative flex h-2 w-2 items-center justify-center rounded-full border ${
                    isActive
                      ? "border-emerald-400 bg-emerald-400/80 shadow-[0_0_10px_rgba(52,211,153,0.9)]"
                      : "border-slate-300 bg-slate-100 dark:border-zinc-600 dark:bg-zinc-900"
                  }`}
                />
                <div className="flex flex-col">
                  <span
                    className={`text-[10px] font-mono tracking-[0.22em] ${
                      isActive
                        ? "text-emerald-600 dark:text-emerald-300"
                        : "text-slate-500 group-hover:text-slate-700 dark:text-zinc-500 dark:group-hover:text-zinc-300"
                    }`}
                  >
                    {module.index}
                  </span>
                  <span
                    className={`text-[10px] font-medium ${
                      isActive
                        ? "text-slate-900 dark:text-zinc-100"
                        : "text-slate-500 group-hover:text-slate-800 dark:text-zinc-500 dark:group-hover:text-zinc-200"
                    }`}
                  >
                    {module.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

