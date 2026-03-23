"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import { ExternalLink, Github, Trophy } from "lucide-react";

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const isFeatured = project.featured;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = project.color + "40";
        (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${project.color}10`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Top color bar */}
      <div className="h-0.5" style={{ background: project.color }} />

      <div className={`p-7 ${isFeatured ? "sm:p-10" : ""}`}>
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            {/* Award badge */}
            {project.award && (
              <div className="award-badge mb-3 inline-flex">
                <Trophy className="w-3 h-3" />
                {project.award}
              </div>
            )}

            <h3
              className="font-display font-bold leading-tight mb-1"
              style={{
                fontSize: isFeatured ? "clamp(1.4rem, 2.5vw, 1.9rem)" : "1.15rem",
                color: "var(--text)",
                letterSpacing: "-0.01em",
              }}
            >
              {project.title}
            </h3>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {project.subtitle}
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-2 flex-shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-lg transition-all duration-150"
                style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = project.color;
                  (e.currentTarget as HTMLElement).style.borderColor = project.color + "50";
                  (e.currentTarget as HTMLElement).style.background = project.color + "10";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Demo"
                className="p-2 rounded-lg transition-all duration-150"
                style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-5"
          style={{ color: "var(--text-muted)", maxWidth: isFeatured ? "680px" : "none" }}
        >
          {project.description}
        </p>

        {/* Highlights — only for featured */}
        {isFeatured && (
          <ul className="space-y-2 mb-6">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-muted)" }}>
                <span
                  className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0"
                  style={{ background: project.color }}
                />
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* Footer: tech + date */}
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, isFeatured ? 99 : 4).map((tech) => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
            {!isFeatured && project.tech.length > 4 && (
              <span className="tech-tag" style={{ color: "var(--text-subtle)" }}>
                +{project.tech.length - 4}
              </span>
            )}
          </div>
          <span
            className="font-mono text-xs flex-shrink-0"
            style={{ color: "var(--text-subtle)", letterSpacing: "0.08em" }}
          >
            {project.date}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-28" style={{ background: "var(--bg)" }}>
      <div className="section-container">
        {/* Label */}
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

        {/* Featured */}
        <div className="mb-6">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {rest.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i + featured.length} />
          ))}
        </div>

        {/* GitHub link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex justify-center"
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
