"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skills } from "@/lib/data";

/* ── Category definitions ──────────────────────────────── */
const CATEGORIES = [
  { label: "Languages",  key: "languages"  as const, color: "#0d9488", rev: false },
  { label: "Frameworks", key: "frameworks" as const, color: "#0369a1", rev: true  },
  { label: "AI / ML",   key: "aiml"       as const, color: "#7c3aed", rev: false },
  { label: "Databases",  key: "databases"  as const, color: "#b45309", rev: true  },
  { label: "Tools",      key: "tools"      as const, color: "#0e7490", rev: false },
  { label: "Coursework", key: "coursework" as const, color: "#1e40af", rev: true  },
];

/* ── Single marquee row ────────────────────────────────── */
function MarqueeRow({
  cat,
  index,
}: {
  cat: (typeof CATEGORIES)[number];
  index: number;
}) {
  const items   = skills[cat.key];
  const doubled = [...items, ...items];
  const dur     = Math.max(18, items.length * 2.2);
  const [paused, setPaused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="flex items-center"
      style={{
        borderTop: index === 0 ? "1px solid var(--border)" : "none",
        borderBottom: "1px solid var(--border)",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Category label — fixed left column */}
      <div
        className="flex-shrink-0 flex flex-col justify-center"
        style={{
          width: "clamp(100px, 14vw, 148px)",
          padding: "18px 20px 18px 0",
          borderRight: `1px solid ${cat.color}28`,
          borderLeft: `3px solid ${cat.color}`,
          paddingLeft: "14px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: cat.color,
            lineHeight: 1.3,
          }}
        >
          {cat.label}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "var(--text-subtle)",
            marginTop: "2px",
            letterSpacing: "0.04em",
          }}
        >
          {items.length} skills
        </span>
      </div>

      {/* Scrolling strip */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          position: "relative",
          padding: "14px 0",
        }}
      >
        {/* Edge fade — left */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0, top: 0, bottom: 0,
            width: 48,
            background: "linear-gradient(to right, var(--surface), transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        {/* Edge fade — right */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            right: 0, top: 0, bottom: 0,
            width: 48,
            background: "linear-gradient(to left, var(--surface), transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Track */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            width: "max-content",
            animation: `${cat.rev ? "marquee-rev" : "marquee-fwd"} ${dur}s linear infinite`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {doubled.map((skill, i) => (
            <Chip key={i} label={skill} color={cat.color} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Individual skill chip ─────────────────────────────── */
function Chip({ label, color }: { label: string; color: string }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "5px 11px",
        borderRadius: "999px",
        fontFamily: "var(--font-mono)",
        fontSize: "0.72rem",
        fontWeight: 500,
        letterSpacing: "0.03em",
        whiteSpace: "nowrap",
        cursor: "default",
        transition: "background 0.2s, color 0.2s, border-color 0.2s",
        background: hov ? color + "22" : color + "0e",
        color: hov ? color : "var(--text-muted)",
        border: `1px solid ${hov ? color + "55" : color + "28"}`,
        userSelect: "none",
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: color,
          opacity: hov ? 1 : 0.6,
          transition: "opacity 0.2s",
          flexShrink: 0,
        }}
      />
      {label}
    </span>
  );
}

/* ── Section ───────────────────────────────────────────── */
export default function Skills() {
  const totalSkills = Object.values(skills).flat().length;

  return (
    <section id="skills" className="py-24" style={{ background: "var(--surface)" }}>
      <div className="section-container">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="section-label">02 / Skills</span>
          <span className="h-px flex-1" style={{ background: "var(--border)" }} />
        </motion.div>

        {/* Title + sub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
              color: "var(--text)",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
            }}
          >
            The stack behind{" "}
            <span style={{ color: "var(--accent)" }}>the systems.</span>
          </h2>
          <p
            className="mt-3"
            style={{ fontSize: "1rem", color: "var(--text-muted)", maxWidth: "44ch" }}
          >
            {totalSkills}+ technologies across {CATEGORIES.length} domains. Hover any row to pause.
          </p>
        </motion.div>

        {/* Marquee rows */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--border-strong)" }}
        >
          {CATEGORIES.map((cat, i) => (
            <MarqueeRow key={cat.key} cat={cat} index={i} />
          ))}
        </motion.div>

        <p
          className="text-center mt-4"
          style={{
            fontSize: "0.73rem",
            color: "var(--text-subtle)",
            fontFamily: "var(--font-mono)",
          }}
        >
          Hover any row to pause · Each row scrolls continuously
        </p>
      </div>
    </section>
  );
}
