"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

const categories = [
  { label: "Languages", key: "languages" as const, color: "#818cf8" },
  { label: "Frameworks", key: "frameworks" as const, color: "#34d399" },
  { label: "AI / ML", key: "aiml" as const, color: "#a78bfa" },
  { label: "Databases", key: "databases" as const, color: "#fb923c" },
  { label: "Tools", key: "tools" as const, color: "#38bdf8" },
  { label: "Coursework", key: "coursework" as const, color: "#f472b6" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-28" style={{ background: "var(--surface)" }}>
      <div className="section-container">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-14"
        >
          <span className="section-label">02 &mdash; Skills</span>
          <span className="h-px flex-1" style={{ background: "var(--border)" }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold mb-12"
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
            color: "var(--text)",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}
        >
          The stack behind
          <br />
          <span style={{ color: "var(--accent)" }}>the systems.</span>
        </motion.h2>

        <div className="space-y-10">
          {categories.map((cat, catIndex) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.07 }}
              className="grid sm:grid-cols-[160px_1fr] gap-4 items-start"
            >
              {/* Category label */}
              <div className="pt-1">
                <span
                  className="font-mono text-xs uppercase tracking-widest"
                  style={{ color: cat.color, letterSpacing: "0.16em" }}
                >
                  {cat.label}
                </span>
              </div>

              {/* Pills */}
              <div className="flex flex-wrap gap-2">
                {skills[cat.key].map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: catIndex * 0.05 + i * 0.03 }}
                    className="tech-tag transition-all duration-150 hover:-translate-y-0.5 cursor-default"
                    style={{
                      borderColor: "var(--border-strong)",
                      color: "var(--text-muted)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = cat.color;
                      (e.currentTarget as HTMLElement).style.borderColor = cat.color + "40";
                      (e.currentTarget as HTMLElement).style.background = cat.color + "12";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
                      (e.currentTarget as HTMLElement).style.background = "var(--surface-2)";
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
