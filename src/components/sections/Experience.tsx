"use client";

import { motion } from "framer-motion";
import { experiences } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="py-28" style={{ background: "var(--surface)" }}>
      <div className="section-container">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-14"
        >
          <span className="section-label">04 &mdash; Experience</span>
          <span className="h-px flex-1" style={{ background: "var(--border)" }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold mb-14"
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
            color: "var(--text)",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}
        >
          Where I&apos;ve worked
          <br />
          <span style={{ color: "var(--accent)" }}>and shipped.</span>
        </motion.h2>

        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="grid sm:grid-cols-[220px_1fr] gap-6 sm:gap-12 py-10"
              style={{
                borderTop: "1px solid var(--border)",
              }}
            >
              {/* Left: meta */}
              <div>
                <div
                  className="font-mono text-xs uppercase mb-2"
                  style={{ color: "var(--text-subtle)", letterSpacing: "0.12em" }}
                >
                  {exp.period}
                </div>
                <div
                  className="font-display font-semibold text-sm mb-1"
                  style={{ color: "var(--text)" }}
                >
                  {exp.company}
                </div>
                <div
                  className="text-xs mb-3"
                  style={{ color: "var(--text-muted)" }}
                >
                  {exp.location}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="tech-tag"
                      style={{
                        color: "var(--accent)",
                        borderColor: "rgba(124,131,245,0.2)",
                        background: "var(--accent-dim)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: role + bullets */}
              <div>
                <div
                  className="font-display font-semibold mb-4"
                  style={{ color: "var(--text)", fontSize: "1.05rem" }}
                >
                  {exp.role}
                </div>
                <ul className="space-y-3">
                  {exp.description.map((point, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-sm leading-relaxed"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <span
                        className="mt-2 h-1 w-4 flex-shrink-0 rounded-full"
                        style={{ background: "var(--accent)" }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}

          {/* Bottom border */}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      </div>
    </section>
  );
}
