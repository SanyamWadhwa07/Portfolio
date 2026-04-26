"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { Mail, FileText, ExternalLink } from "lucide-react";
import CosmicSynapseCanvas from "@/components/ui/neurons-hero";
import { useTab } from "@/contexts/TabContext";

/* ── Brand SVGs ─────────────────────────────────────────── */
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

/* ── Name letter-reveal ─────────────────────────────────── */
const NAME_WORDS = ["SANYAM", "WADHWA"];

function NameReveal() {
  return (
    <div className="font-display font-bold leading-[0.92] mb-5 overflow-hidden"
      style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)", color: "var(--text)", letterSpacing: "-0.035em" }}>
      {NAME_WORDS.map((word, wi) => (
        <div key={wi} className="overflow-hidden block">
          {word.split("").map((char, ci) => {
            const delay = 0.12 + wi * 0.18 + ci * 0.055;
            return (
              <motion.span
                key={ci}
                initial={{ y: "105%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ── Role cycling ───────────────────────────────────────── */
const ROLES = ["AI / ML Engineer", "Agentic Systems Builder", "Full-Stack Developer", "LLM Engineer"];

/* ── Code showcase ──────────────────────────────────────── */
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

function HighlightedLine({ line, cssVar, lang }: { line: string; cssVar: string; lang: string }) {
  if (!line.trim()) return <>&nbsp;</>;
  const isComment = line.trimStart().startsWith("#") || line.trimStart().startsWith("//");
  if (isComment) return <span style={{ color: "var(--text-subtle)", fontStyle: "italic" }}>{line}</span>;
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

  useEffect(() => {
    setVisibleCount(0);
    let count = 0;
    const id = setInterval(() => {
      count++;
      setVisibleCount(count);
      if (count >= SNIPPETS[snippetIdx].lines.length) clearInterval(id);
    }, 290);
    return () => clearInterval(id);
  }, [snippetIdx]);

  useEffect(() => {
    if (visibleCount < snip.lines.length) return;
    const id = setTimeout(() => setSnippetIdx((i) => (i + 1) % SNIPPETS.length), 2600);
    return () => clearTimeout(id);
  }, [visibleCount, snip.lines.length]);

  const color    = `var(${snip.cssVar})`;
  const colorDim = `color-mix(in srgb, var(${snip.cssVar}) 12%, transparent)`;

  return (
    <div className="monitor-card h-full flex flex-col">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--border-strong)" }}>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28ca41" }} />
        </div>
        <span className="font-mono text-xs truncate px-3" style={{ color: "var(--text-muted)" }}>
          {snip.file}
        </span>
        <span className="font-mono rounded px-1.5 py-0.5 flex-shrink-0"
          style={{ fontSize: "0.58rem", color, background: colorDim, letterSpacing: "0.1em" }}>
          {snip.lang}
        </span>
      </div>

      {/* Code area */}
      <div className="flex-1 px-5 py-5 overflow-hidden"
        style={{ fontFamily: "var(--font-mono)", fontSize: "0.73rem", lineHeight: 1.85 }}>
        <AnimatePresence initial={false}>
          {snip.lines.slice(0, visibleCount).map((line, i) => (
            <motion.div key={`${snippetIdx}-${i}`}
              initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }} className="flex gap-4">
              <span className="select-none flex-shrink-0 text-right tabular-nums"
                style={{ color: "var(--text-subtle)", minWidth: "1.2rem" }}>{i + 1}</span>
              <span style={{ color: "var(--text-muted)" }}>
                <HighlightedLine line={line} cssVar={snip.cssVar} lang={snip.lang} />
                {i === visibleCount - 1 && visibleCount < snip.lines.length && (
                  <span className="animate-blink inline-block w-px h-[0.85em] rounded-sm ml-0.5 align-middle"
                    style={{ background: color }} />
                )}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Tab strip */}
      <div className="flex items-center px-4 py-3 gap-4 flex-shrink-0"
        style={{ borderTop: "1px solid var(--border)" }}>
        {SNIPPETS.map((s, i) => {
          const sc = `var(${s.cssVar})`;
          return (
            <button key={s.id} onClick={() => setSnippetIdx(i)}
              className="flex items-center gap-1.5 font-mono transition-opacity"
              style={{ fontSize: "0.6rem", opacity: i === snippetIdx ? 1 : 0.32, color: sc, letterSpacing: "0.1em" }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: sc }} />
              {s.id}
            </button>
          );
        })}
        <span className="ml-auto font-mono rounded px-1.5 py-0.5 flex-shrink-0"
          style={{ fontSize: "0.58rem", color, background: colorDim, letterSpacing: "0.08em" }}>
          {snip.badge}
        </span>
      </div>
    </div>
  );
}

/* ── Hero ───────────────────────────────────────────────── */
export default function TerminalHero() {
  const [roleIdx,     setRoleIdx]     = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
  const { setActiveTab } = useTab();

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

  const socials = [
    { icon: GithubIcon,  href: personalInfo.github,              label: "GitHub"   },
    { icon: LinkedinIcon,href: personalInfo.linkedin,            label: "LinkedIn" },
    { icon: Mail,        href: `mailto:${personalInfo.email}`,   label: "Email"    },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Neural canvas */}
      <div className="hero-canvas absolute inset-0 pointer-events-none">
        <CosmicSynapseCanvas />
      </div>

      {/* Text-protection gradient */}
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{
        background: "linear-gradient(105deg, var(--bg) 28%, color-mix(in srgb, var(--bg) 45%, transparent) 52%, transparent 72%)",
      }} />

      {/* Top accent glow */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }} />
      <div className="absolute top-0 inset-x-0 h-56 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 100% at 50% 0%, var(--accent-dim), transparent)" }} />

      {/* Main content */}
      <div className="relative z-10 w-full section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 xl:gap-16 items-center min-h-screen py-24 lg:py-28">

          {/* ── Left column ── */}
          <div className="flex flex-col justify-center">

            {/* Status badge */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }} className="mb-7">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-xs"
                style={{
                  background: "var(--green-dim)", color: "var(--green)",
                  border: "1px solid rgba(52,211,153,0.18)", letterSpacing: "0.12em",
                }}>
                <span className="h-1.5 w-1.5 rounded-full animate-pulse-dot" style={{ background: "var(--green)" }} />
                AVAILABLE &middot; TIET &apos;27 &middot; PATIALA
              </span>
            </motion.div>

            {/* Name */}
            <NameReveal />

            {/* Cycling role */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.35 }}
              className="flex items-center gap-3 mb-5">
              <span className="h-1.5 w-1.5 rounded-full flex-shrink-0 animate-pulse-dot" style={{ background: "var(--accent)" }} />
              <span className="font-mono text-xs uppercase transition-opacity duration-300"
                style={{ color: "var(--accent)", opacity: roleVisible ? 1 : 0, letterSpacing: "0.16em" }}>
                {ROLES[roleIdx]}
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.5 }}
              className="leading-relaxed mb-8"
              style={{ fontSize: "0.975rem", color: "var(--text-muted)", maxWidth: "42ch" }}>
              {personalInfo.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.65 }}
              className="flex flex-wrap items-center gap-3 mb-10">

              <button
                onClick={() => setActiveTab("projects")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:-translate-y-px active:scale-95"
                style={{ background: "var(--accent)", color: "var(--bg)", letterSpacing: "0.01em" }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View Projects
              </button>

              <a
                href={personalInfo.resumeUrl}
                download="Sanyam_Wadhwa_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:-translate-y-px"
                style={{ color: "var(--text)", border: "1px solid var(--border-strong)" }}
              >
                <FileText className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
                Resume
              </a>

              {/* Social icons */}
              <div className="hidden sm:flex items-center gap-0.5 pl-3"
                style={{ borderLeft: "1px solid var(--border-strong)" }}>
                {socials.map((s) => (
                  <a key={s.label} href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer" aria-label={s.label}
                    className="p-2 rounded-lg transition-all duration-150"
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
                    }}>
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.82 }}
              className="flex flex-wrap items-center gap-4 sm:gap-6">
              {[
                { v: "6+",   l: "Projects"       },
                { v: "2",    l: "Hackathon Wins"  },
                { v: "'27",  l: "Graduating"      },
              ].map((s, i) => (
                <div key={s.l} className="flex items-center gap-6">
                  {i > 0 && <span className="h-5 w-px hidden sm:block" style={{ background: "var(--border-strong)" }} />}
                  <div>
                    <div className="font-display font-bold text-xl leading-none" style={{ color: "var(--text)" }}>{s.v}</div>
                    <div className="font-mono text-[0.65rem] mt-1 uppercase"
                      style={{ color: "var(--text-subtle)", letterSpacing: "0.12em" }}>{s.l}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right column — code showcase ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div
              style={{
                width: "100%",
                maxWidth: 500,
                height: "clamp(400px, 44vh, 500px)",
                transform: "perspective(1100px) rotateY(-8deg) rotateX(2deg)",
                transformStyle: "preserve-3d",
                filter: "drop-shadow(0 24px 50px rgba(0,0,0,0.35)) drop-shadow(0 0 30px rgba(0,232,198,0.06))",
                willChange: "transform",
              }}
            >
              {/* Depth edges */}
              <div aria-hidden style={{
                position: "absolute", top: 5, right: -9, bottom: -5, width: 9,
                background: "linear-gradient(to right, rgba(0,232,198,0.04), rgba(0,0,0,0.25))",
                borderRadius: "0 4px 4px 0",
              }} />
              <div aria-hidden style={{
                position: "absolute", bottom: -7, left: 5, right: -3, height: 7,
                background: "linear-gradient(to bottom, rgba(0,0,0,0.28), rgba(0,0,0,0.06))",
                borderRadius: "0 0 4px 4px",
              }} />
              <CodeShowcase />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
