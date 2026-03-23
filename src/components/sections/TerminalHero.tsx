"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { Mail, FileText, ArrowDown } from "lucide-react";
import CosmicSynapseCanvas from "@/components/ui/neurons-hero";

/* ─── Brand SVGs (lucide deprecated) ────────────────────────────── */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ─── Name scramble ──────────────────────────────────────────────── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234%#$@!";
const TARGET = "SANYAM WADHWA";

function useScramble(target: string, delay = 500) {
  const [display, setDisplay] = useState(target);
  const run = useCallback(() => {
    let frame = 0;
    const max = target.length * 7;
    const tick = setInterval(() => {
      setDisplay(
        target.split("").map((c, i) =>
          c === " " ? " " : i < frame / 7 ? c : CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join("")
      );
      frame++;
      if (frame > max) clearInterval(tick);
    }, 38);
    return () => clearInterval(tick);
  }, [target]);
  useEffect(() => {
    const t = setTimeout(run, delay);
    return () => clearTimeout(t);
  }, [run, delay]);
  return display;
}

/* ─── Role cycling ───────────────────────────────────────────────── */
const ROLES = ["AI / ML Engineer", "Agentic Systems Builder", "Full-Stack Developer", "LLM Engineer"];

/* ─── Code showcase ──────────────────────────────────────────────── */
const SNIPPETS = [
  {
    id: "konta",
    file: "konta / session_detector.py",
    lang: "PY",
    cssVar: "--c-konta",
    badge: "PRISM WINNER",
    lines: [
      "def cluster_sessions(embeddings):",
      "    graph = build_similarity_graph(",
      "        embeddings, threshold=0.72",
      "    )",
      "    communities = louvain(graph)",
      "    return rank_by_salience(communities)",
      "",
      "# 87% recall  ·  Samsung PRISM '24",
    ],
  },
  {
    id: "papermind",
    file: "papermind / pipeline.py",
    lang: "PY",
    cssVar: "--c-paper",
    badge: "MULTI-AGENT",
    lines: [
      "async def process_paper(pdf_path: str):",
      "    doc    = await parse_pdf(pdf_path)",
      "    chunks = await embed_chunks(doc, 16384)",
      "    figs   = figure_agent.detect(doc)",
      "    meta   = entity_agent.extract(chunks)",
      "    return Synthesis(chunks, figs, meta)",
      "",
      "# avg 18.4s  ·  LED transformer  ·  24 pages",
    ],
  },
  {
    id: "flowsync",
    file: "flowsync / rag_search.ts",
    lang: "TS",
    cssVar: "--c-flow",
    badge: "RAG + LLM",
    lines: [
      "const search = async (query: string) => {",
      "  const vec  = await embed(query);",
      "  const docs = await vectorDB.query({",
      "    vector: vec,  topK: 8,",
      "    filter: { verified: true },",
      "  });",
      "  return llm.stream(query, docs);",
      "};",
    ],
  },
] as const;

/* Simple keyword highlighter — pure, no side-effects */
function HighlightedLine({ line, cssVar, lang }: { line: string; cssVar: string; lang: string }) {
  if (!line.trim()) return <>&nbsp;</>;
  const isComment = line.trimStart().startsWith("#") || line.trimStart().startsWith("//");
  if (isComment) {
    return <span style={{ color: "var(--text-subtle)", fontStyle: "italic" }}>{line}</span>;
  }
  const kw = lang === "TS"
    ? /\b(const|let|async|await|return|function|import|from|type|true|false|null)\b/
    : /\b(def|async|await|return|import|from|class|if|for|in|True|False|None)\b/;
  const parts = line.split(kw);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1
          ? <span key={i} style={{ color: `var(${cssVar})` }}>{p}</span>
          : <span key={i}>{p}</span>
      )}
    </>
  );
}

function CodeShowcase() {
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);

  const snip = SNIPPETS[snippetIdx];

  /* Reveal lines one by one */
  useEffect(() => {
    setVisibleCount(0);
    let count = 0;
    const maxLines = SNIPPETS[snippetIdx].lines.length;
    const id = setInterval(() => {
      count++;
      setVisibleCount(count);
      if (count >= maxLines) clearInterval(id);
    }, 290);
    return () => clearInterval(id);
  }, [snippetIdx]);

  /* Auto-cycle after all lines shown + pause */
  useEffect(() => {
    if (visibleCount < snip.lines.length) return;
    const id = setTimeout(() => setSnippetIdx((i) => (i + 1) % SNIPPETS.length), 2600);
    return () => clearTimeout(id);
  }, [visibleCount, snip.lines.length]);

  const color = `var(${snip.cssVar})`;
  const colorDim = `color-mix(in srgb, var(${snip.cssVar}) 12%, transparent)`;

  return (
    <div className="monitor-card h-full flex flex-col">
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--border-strong)" }}
      >
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28ca41" }} />
        </div>
        <span
          className="font-mono text-xs truncate px-3"
          style={{ color: "var(--text-muted)" }}
        >
          {snip.file}
        </span>
        <span
          className="font-mono rounded px-1.5 py-0.5 flex-shrink-0"
          style={{ fontSize: "0.58rem", color, background: colorDim, letterSpacing: "0.1em" }}
        >
          {snip.lang}
        </span>
      </div>

      {/* Code area */}
      <div
        className="flex-1 px-5 py-5 overflow-hidden"
        style={{ fontFamily: "var(--font-mono)", fontSize: "0.73rem", lineHeight: 1.85 }}
      >
        <AnimatePresence initial={false}>
          {snip.lines.slice(0, visibleCount).map((line, i) => (
            <motion.div
              key={`${snippetIdx}-${i}`}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className="flex gap-4"
            >
              <span
                className="select-none flex-shrink-0 text-right tabular-nums"
                style={{ color: "var(--text-subtle)", minWidth: "1.2rem" }}
              >
                {i + 1}
              </span>
              <span style={{ color: "var(--text-muted)" }}>
                <HighlightedLine line={line} cssVar={snip.cssVar} lang={snip.lang} />
                {i === visibleCount - 1 && visibleCount < snip.lines.length && (
                  <span
                    className="animate-blink inline-block w-px h-[0.85em] rounded-sm ml-0.5 align-middle"
                    style={{ background: color }}
                  />
                )}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Project tab strip */}
      <div
        className="flex items-center px-4 py-3 gap-4 flex-shrink-0"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        {SNIPPETS.map((s, i) => {
          const sc = `var(${s.cssVar})`;
          return (
            <button
              key={s.id}
              onClick={() => setSnippetIdx(i)}
              className="flex items-center gap-1.5 font-mono transition-opacity"
              style={{
                fontSize: "0.6rem",
                opacity: i === snippetIdx ? 1 : 0.32,
                color: sc,
                letterSpacing: "0.1em",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: sc }} />
              {s.id}
            </button>
          );
        })}
        <span
          className="ml-auto font-mono rounded px-1.5 py-0.5 flex-shrink-0"
          style={{ fontSize: "0.58rem", color, background: colorDim, letterSpacing: "0.08em" }}
        >
          {snip.badge}
        </span>
      </div>
    </div>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────── */
export default function TerminalHero() {
  const name = useScramble(TARGET, 400);
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleVisible(false);
      const swap = setTimeout(() => {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setRoleVisible(true);
      }, 350);
      return () => clearTimeout(swap);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id: string) => () =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const socials = [
    { icon: GithubIcon, href: personalInfo.github, label: "GitHub" },
    { icon: LinkedinIcon, href: personalInfo.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Neural canvas — opacity controlled by CSS (.hero-canvas / .dark .hero-canvas) */}
      <div className="hero-canvas absolute inset-0 pointer-events-none">
        <CosmicSynapseCanvas />
      </div>

      {/* Text-protection gradient: solid bg on left, fades right so canvas shows */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: "linear-gradient(105deg, var(--bg) 25%, color-mix(in srgb, var(--bg) 50%, transparent) 50%, transparent 70%)",
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
      />
      <div
        className="absolute top-0 inset-x-0 h-64 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 100% at 50% 0%, var(--accent-dim) 0%, transparent 100%)" }}
      />

      <div className="section-container relative z-10 pt-24 pb-16" style={{ position: "relative", zIndex: 10 }}>
        <div className="grid lg:grid-cols-[1fr_460px] xl:grid-cols-[1fr_520px] gap-10 xl:gap-14 items-center min-h-[calc(100vh-160px)]">

          {/* Left */}
          <div className="flex flex-col justify-center">
            {/* Status */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-xs"
                style={{
                  background: "var(--green-dim)",
                  color: "var(--green)",
                  border: "1px solid rgba(52,211,153,0.18)",
                  letterSpacing: "0.12em",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full animate-pulse-dot" style={{ background: "var(--green)" }} />
                AVAILABLE &middot; TIET &apos;27 &middot; PATIALA
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, delay: 0.15 }}
              className="font-display font-bold leading-none mb-6"
              style={{ fontSize: "clamp(3rem, 9vw, 8rem)", color: "var(--text)", letterSpacing: "-0.04em" }}
              suppressHydrationWarning
            >
              {name}
            </motion.h1>

            {/* Role */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="h-px w-6 flex-shrink-0" style={{ background: "var(--accent)" }} />
              <span
                className="font-mono text-sm uppercase transition-opacity duration-300"
                style={{ color: "var(--accent)", opacity: roleVisible ? 1 : 0, letterSpacing: "0.16em" }}
              >
                {ROLES[roleIdx]}
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="text-base leading-relaxed mb-10"
              style={{ color: "var(--text-muted)", maxWidth: "460px" }}
            >
              {personalInfo.tagline} Agentic AI, LLM optimization, multi-agent
              architectures &mdash; shipped and working in production.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <button
                onClick={scrollTo("#projects")}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                style={{ background: "var(--accent)", color: "var(--bg)" }}
              >
                View Projects <ArrowDown className="w-4 h-4" />
              </button>

              <a
                href={personalInfo.resumeUrl}
                download="Sanyam_Wadhwa_Resume.pdf"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                style={{ color: "var(--text)", border: "1px solid var(--border-strong)" }}
              >
                <FileText className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                Resume
              </a>

              <div className="hidden sm:flex items-center gap-1 pl-4" style={{ borderLeft: "1px solid var(--border-strong)" }}>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="p-2.5 rounded-lg transition-all duration-150"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = "var(--accent)";
                      el.style.background = "var(--accent-dim)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = "var(--text-muted)";
                      el.style.background = "transparent";
                    }}
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex items-center gap-8"
            >
              {[
                { v: "6+", l: "Projects" },
                { v: "2", l: "Hackathon Wins" },
                { v: "\u201927", l: "Graduating" },
              ].map((s, i) => (
                <div key={s.l} className="flex items-center gap-3">
                  {i > 0 && <span className="h-4 w-px hidden sm:block" style={{ background: "var(--border-strong)" }} />}
                  <div>
                    <div className="font-display font-bold text-2xl leading-none" style={{ color: "var(--text)" }}>{s.v}</div>
                    <div className="font-mono text-xs mt-0.5 uppercase" style={{ color: "var(--text-muted)", letterSpacing: "0.12em" }}>{s.l}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Code Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 24, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col"
            style={{ height: "520px" }}
          >
            <CodeShowcase />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        onClick={scrollTo("#about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-opacity hover:opacity-40"
        style={{ color: "var(--text-subtle)" }}
      >
        <span className="font-mono text-[10px] uppercase" style={{ letterSpacing: "0.2em" }}>scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
