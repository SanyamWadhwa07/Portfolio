"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const emptySubscribe = () => () => {};

function useHydrated() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export default function ThemeToggle() {
  const mounted = useHydrated();
  const { resolvedTheme, setTheme } = useTheme();

  if (!mounted) {
    return <div className="h-8 w-14 rounded-full" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }} />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative flex items-center h-8 w-14 rounded-full p-1 transition-colors duration-300"
      style={{
        background: isDark ? "var(--surface-2)" : "var(--surface-2)",
        border: "1px solid var(--border-strong)",
      }}
    >
      {/* Track icons */}
      <Sun
        className="absolute left-1.5 transition-opacity duration-200"
        style={{
          width: "13px",
          height: "13px",
          color: "var(--award)",
          opacity: isDark ? 0.3 : 1,
        }}
      />
      <Moon
        className="absolute right-1.5 transition-opacity duration-200"
        style={{
          width: "13px",
          height: "13px",
          color: "var(--accent)",
          opacity: isDark ? 1 : 0.3,
        }}
      />

      {/* Thumb */}
      <motion.span
        className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full shadow-sm"
        animate={{ x: isDark ? 22 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          background: isDark ? "var(--accent)" : "var(--award)",
        }}
      >
        {isDark
          ? <Moon style={{ width: "11px", height: "11px", color: "#060d10" }} />
          : <Sun style={{ width: "11px", height: "11px", color: "#fff" }} />
        }
      </motion.span>
    </button>
  );
}
