"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { projects } from "@/lib/data";
import { ExternalLink, Github, Trophy, ChevronRight } from "lucide-react";

type Project = typeof projects[0];

function useProjectColor(project: Project) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return project.colorLight ?? project.color;
  return resolvedTheme === "dark" ? project.color : (project.colorLight ?? project.color);
}

/* ── Single sidebar item (needs hook for theme-aware color) ─ */
function ProjectListItem({
  project: p,
  index: i,
  isActive,
  onSelect,
}: {
  project: Project;
  index: number;
  isActive: boolean;
  onSelect: (id: number) => void;
}) {
  const color = useProjectColor(p);
  return (
    <button
      onClick={() => onSelect(p.id)}
      className="flex items-start gap-4 px-5 py-4 text-left w-full transition-colors duration-150 cursor-pointer"
      style={{
        borderLeft: isActive ? `3px solid ${color}` : "3px solid transparent",
        borderBottom: "1px solid var(--border)",
        background: isActive ? color + "14" : "transparent",
      }}
      onMouseEnter={(e) => {
        if (!isActive) (e.currentTarget as HTMLElement).style.background = color + "08";
      }}
      onMouseLeave={(e) => {
        if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent";
      }}
    >
      <span
        className="font-mono text-[10px] flex-shrink-0 mt-0.5 w-5 leading-none pt-px"
        style={{ color: isActive ? color : "var(--text-subtle)", letterSpacing: "0.1em" }}
      >
        {String(i + 1).padStart(2, "0")}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p
            className="font-display font-bold text-sm leading-tight"
            style={{ color: isActive ? color : "var(--text)", letterSpacing: "-0.01em" }}
          >
            {p.title}
          </p>
          {isActive && (
            <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color }} />
          )}
        </div>
        <p className="text-xs leading-snug mt-0.5" style={{ color: "var(--text-subtle)" }}>
          {p.subtitle}
        </p>
        {p.award && (
          <span
            className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wide px-1.5 py-0.5 rounded-sm"
            style={{
              color: "var(--award)",
              background: "var(--award-dim)",
              border: "1px solid color-mix(in srgb, var(--award) 22%, transparent)",
            }}
          >
            <Trophy className="w-2.5 h-2.5" />
            {p.award}
          </span>
        )}
      </div>
    </button>
  );
}

/* ── Left sidebar list ───────────────────────────────────── */
function ProjectList({
  activeId,
  onSelect,
}: {
  activeId: number;
  onSelect: (id: number) => void;
}) {
  return (
    <div
      className="flex flex-col overflow-y-auto"
      style={{ borderRight: "1px solid var(--border)", background: "var(--surface)" }}
    >
      {projects.map((p, i) => (
        <ProjectListItem
          key={p.id}
          project={p}
          index={i}
          isActive={p.id === activeId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

/* ── Architecture pipeline display ──────────────────────── */
function ArchPipeline({ arch, color }: { arch: string; color: string }) {
  const steps = arch.split("→").map((s) => s.trim());
  return (
    <div
      className="rounded-lg px-4 py-3 overflow-x-auto"
      style={{ background: color + "08", border: `1px solid ${color}20` }}
    >
      <div className="flex flex-wrap items-center gap-1.5">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span
              className="font-mono text-xs whitespace-nowrap"
              style={{ color: "var(--text-muted)", letterSpacing: "0.02em" }}
            >
              {step}
            </span>
            {i < steps.length - 1 && (
              <span className="font-mono text-xs font-bold flex-shrink-0" style={{ color: color }}>
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Right detail panel ──────────────────────────────────── */
function ProjectDetail({ project }: { project: Project }) {
  const color = useProjectColor(project);
  return (
    <div className="overflow-y-auto" style={{ background: "var(--bg)" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          className="p-4 sm:p-6 lg:p-10"
        >
          {/* Top gradient accent */}
          <div
            className="h-px mb-5 sm:mb-8"
            style={{
              background: `linear-gradient(90deg, ${color}, ${color}40, transparent)`,
            }}
          />

          {/* Header: award + title + subtitle */}
          <div className="mb-2">
            {project.award && (
              <div className="award-badge mb-2 inline-flex">
                <Trophy className="w-3 h-3" />
                {project.award}
              </div>
            )}
            <h3
              className="font-display font-bold leading-tight"
              style={{
                fontSize: "clamp(1.25rem, 5vw, 2rem)",
                letterSpacing: "-0.02em",
                color: "var(--text)",
              }}
            >
              <span style={{ color: color }}>{project.title}</span>
            </h3>
            <p className="text-sm sm:text-base mt-1" style={{ color: "var(--text-muted)" }}>
              {project.subtitle}
            </p>
          </div>

          {/* Date + GitHub row below title */}
          <div className="flex items-center gap-2 mb-4 mt-3">
            <span
              className="font-mono text-xs px-2.5 py-1 rounded-md"
              style={{ color: "var(--text-subtle)", background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              {project.date}
            </span>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-md transition-opacity hover:opacity-70"
                style={{
                  color: color,
                  background: color + "12",
                  border: `1px solid ${color}30`,
                }}
              >
                <Github className="w-3 h-3" />
                GitHub
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>
            {project.description}
          </p>

          {/* Divider */}
          <div className="mb-6" style={{ height: "1px", background: "var(--border)" }} />

          {/* THE PROBLEM */}
          <div className="mb-6">
            <p className="section-label mb-2" style={{ color: color }}>
              The Problem
            </p>
            <p
              className="text-base leading-relaxed italic"
              style={{ color: "var(--text-muted)" }}
            >
              {project.problem}
            </p>
          </div>

          {/* HOW IT WORKS */}
          {"architecture" in project && project.architecture && (
            <div className="mb-6">
              <p className="section-label mb-2" style={{ color: color }}>
                How It Works
              </p>
              <ArchPipeline arch={project.architecture} color={color} />
            </div>
          )}

          {/* Divider */}
          <div className="mb-6" style={{ height: "1px", background: "var(--border)" }} />

          {/* KEY FEATURES */}
          {"keyFeatures" in project && project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="mb-6">
              <p className="section-label mb-3" style={{ color: color }}>
                Key Features
              </p>
              <ul className="space-y-3">
                {project.keyFeatures.map((f: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-base leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span
                      className="mt-[7px] h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{ background: color }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* HIGHLIGHTS */}
          <div className="mb-6">
            <p className="section-label mb-3" style={{ color: color }}>
              Technical Highlights
            </p>
            <ul className="space-y-3">
              {project.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-base leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span
                    className="mt-[7px] h-1.5 w-1.5 rounded-full flex-shrink-0"
                    style={{ background: color }}
                  />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* METRICS */}
          {project.metrics.length > 0 && (
            <div className="mb-6">
              <p className="section-label mb-3" style={{ color: color }}>
                Metrics
              </p>
              <div className="flex flex-wrap gap-2">
                {project.metrics.map((m) => (
                  <span
                    key={m}
                    className="font-mono text-sm px-3 py-1.5 rounded-md"
                    style={{
                      color: color,
                      border: `1px solid ${color}30`,
                      background: color + "0d",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="mb-6" style={{ height: "1px", background: "var(--border)" }} />

          {/* TECH STACK */}
          <div>
            <p className="section-label mb-3" style={{ color: color }}>
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ── Mobile pill tab item ────────────────────────────────── */
function MobilePillItem({
  project: p,
  index: i,
  isActive,
  onSelect,
}: {
  project: Project;
  index: number;
  isActive: boolean;
  onSelect: (id: number) => void;
}) {
  const color = useProjectColor(p);
  return (
    <button
      key={p.id}
      onClick={() => onSelect(p.id)}
      className="flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-mono transition-all duration-150 border"
      style={{
        borderColor: isActive ? color : "var(--border)",
        color: isActive ? color : "var(--text-muted)",
        background: isActive ? color + "12" : "transparent",
        letterSpacing: "0.04em",
      }}
    >
      {String(i + 1).padStart(2, "0")} {p.title}
    </button>
  );
}

/* ── Main section ────────────────────────────────────────── */
export default function Projects() {
  const [activeId, setActiveId] = useState(projects[0].id);
  const activeProject = projects.find((p) => p.id === activeId)!;

  return (
    <section id="projects" className="py-28" style={{ background: "var(--bg)" }}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-14"
        >
          <span className="section-label">03 / Projects</span>
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
          Things I&apos;ve built
          <br />
          <span style={{ color: "var(--accent)" }}>and shipped.</span>
        </motion.h2>

        {/* Panel container */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          {/* ── Desktop: two-column ── */}
          <div className="hidden lg:flex" style={{ minHeight: "600px" }}>
            {/* Left sidebar — fixed width, scrollable */}
            <div className="w-[280px] flex-shrink-0">
              <ProjectList activeId={activeId} onSelect={setActiveId} />
            </div>
            {/* Right panel — fills remaining space */}
            <div className="flex-1 min-w-0">
              <ProjectDetail project={activeProject} />
            </div>
          </div>

          {/* ── Mobile: pill tabs + detail ── */}
          <div className="lg:hidden">
            <div
              className="flex gap-2 overflow-x-auto px-4 py-3"
              style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}
            >
              {projects.map((p, i) => (
                <MobilePillItem
                  key={p.id}
                  project={p}
                  index={i}
                  isActive={p.id === activeId}
                  onSelect={setActiveId}
                />
              ))}
            </div>
            <ProjectDetail project={activeProject} />
          </div>
        </motion.div>

        {/* GitHub link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <a
            href="https://github.com/SanyamWadhwa07"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
          >
            <Github className="w-4 h-4" />
            More on GitHub
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
