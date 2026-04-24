"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#060d10",
            gap: 28,
          }}
        >
          {/* Monogram */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ textAlign: "center" }}
          >
            <span
              style={{
                fontFamily: "var(--font-display), Syne, sans-serif",
                fontSize: "clamp(2.8rem, 8vw, 4.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#f0f0f0",
                lineHeight: 1,
              }}
            >
              SW
            </span>
            <div
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#00e8c6",
                marginTop: 8,
              }}
            >
              portfolio
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              width: "clamp(120px, 20vw, 200px)",
              height: 1,
              background: "rgba(255,255,255,0.08)",
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] as const, delay: 0.25 }}
              style={{
                height: "100%",
                background: "#00e8c6",
                transformOrigin: "left",
                borderRadius: 999,
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
