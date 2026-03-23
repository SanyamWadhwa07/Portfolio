"use client";

import { motion } from "framer-motion";
import { aboutMe, education, positions } from "@/lib/data";
import { GraduationCap, Users, ExternalLink } from "lucide-react";

export default function About() {
  const paragraphs = aboutMe.trim().split("\n\n");

  return (
    <section id="about" className="py-28" style={{ background: "var(--bg)" }}>
      <div className="section-container">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-14"
        >
          <span className="section-label">01 &mdash; About</span>
          <span className="h-px flex-1" style={{ background: "var(--border)" }} />
        </motion.div>

        <div className="grid lg:grid-cols-[3fr_2fr] gap-14 items-start">
          {/* Bio */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-bold mb-8"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
                color: "var(--text)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              I build things that are
              <br />
              <span style={{ color: "var(--accent)" }}>actually useful.</span>
            </motion.h2>

            <div className="space-y-5">
              {paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                  className="leading-relaxed"
                  style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-3">
            {education.map((edu, i) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="rounded-xl p-5"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0 p-2 rounded-lg" style={{ background: "var(--accent-dim)" }}>
                    <GraduationCap className="w-4 h-4" style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase mb-1" style={{ color: "var(--text-muted)", letterSpacing: "0.14em" }}>
                      Education
                    </div>
                    <div className="font-display font-semibold text-sm leading-snug mb-1" style={{ color: "var(--text)" }}>
                      {edu.institution}
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>{edu.degree}</div>
                    <div className="text-xs mt-1 font-mono" style={{ color: "var(--text-subtle)" }}>
                      {edu.period} &middot; {edu.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {positions.map((pos, i) => (
              <motion.div
                key={pos.organization}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="rounded-xl p-5"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0 p-2 rounded-lg" style={{ background: "var(--accent-dim)" }}>
                    <Users className="w-4 h-4" style={{ color: "var(--accent)" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-mono uppercase mb-1" style={{ color: "var(--text-muted)", letterSpacing: "0.14em" }}>
                      Leadership
                    </div>
                    <div className="font-display font-semibold text-sm leading-snug mb-0.5" style={{ color: "var(--text)" }}>
                      {pos.organization}
                    </div>
                    <div className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>{pos.role}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono" style={{ color: "var(--text-subtle)" }}>{pos.period}</span>
                      <a
                        href={pos.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs transition-opacity hover:opacity-70"
                        style={{ color: "var(--accent)" }}
                      >
                        Visit <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="rounded-xl p-5"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="text-xs font-mono uppercase mb-3" style={{ color: "var(--text-muted)", letterSpacing: "0.14em" }}>
                Current focus
              </div>
              <div className="flex flex-wrap gap-2">
                {["Agentic AI", "LLM Optimization", "RAG Systems", "Multi-Agent"].map((tag) => (
                  <span
                    key={tag}
                    className="tech-tag"
                    style={{ color: "var(--accent)", borderColor: "rgba(124,131,245,0.2)", background: "var(--accent-dim)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
