"use client";

import { motion } from "framer-motion";
import { achievements } from "@/lib/data";
import { Trophy } from "lucide-react";

export default function Achievements() {
  return (
    <section id="achievements" className="py-28" style={{ background: "var(--bg)" }}>
      <div className="section-container">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-14"
        >
          <span className="section-label">05 / Achievements</span>
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
          Recognition
          <br />
          <span style={{ color: "var(--award)" }}>that followed.</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-5">
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "var(--surface)",
                border: "1px solid rgba(245,158,11,0.2)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,158,11,0.4)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(245,158,11,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,158,11,0.2)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Ambient glow */}
              <div
                className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at top right, rgba(245,158,11,0.08) 0%, transparent 70%)",
                }}
              />

              {/* Position badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="award-badge">
                  <Trophy className="w-3 h-3" />
                  {ach.position}
                </div>
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--text-subtle)", letterSpacing: "0.08em" }}
                >
                  {ach.date}
                </span>
              </div>

              <h3
                className="font-display font-bold mb-3"
                style={{ color: "var(--text)", fontSize: "1.2rem", letterSpacing: "-0.01em" }}
              >
                {ach.title}
              </h3>

              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                {ach.description}
              </p>

              <div
                className="font-mono text-xs"
                style={{ color: "var(--text-subtle)", letterSpacing: "0.1em" }}
              >
                {ach.location}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
