"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { personalInfo } from "@/lib/data";
import { ChevronDown, Github, Linkedin, Mail, Code } from "lucide-react";
import dynamic from "next/dynamic";
import { useSoundEffects } from "@/hooks/useSoundEffects";

const NeuralNetwork = dynamic(
  () => import("@/components/three/NeuralNetwork"),
  { ssr: false }
);

export default function Hero() {
  const { playClick, playHover, playWhoosh } = useSoundEffects();

  const panelRef = useRef<HTMLDivElement | null>(null);
  const panelMouseX = useMotionValue(0);
  const panelMouseY = useMotionValue(0);

  const panelRotateX = useSpring(
    useTransform(panelMouseY, [-0.5, 0.5], [10, -10]),
    { stiffness: 260, damping: 26 }
  );
  const panelRotateY = useSpring(
    useTransform(panelMouseX, [-0.5, 0.5], [-14, 14]),
    { stiffness: 260, damping: 26 }
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      },
    }),
  };

  const nameLetters = personalInfo.name.split("");

  const socialLinks = [
    { icon: Github, href: personalInfo.github, label: "GitHub" },
    { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
    { icon: Code, href: personalInfo.leetcode, label: "LeetCode" },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_#020617,_#000)]"
    >
      {/* 3D Background */}
      <NeuralNetwork />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black pointer-events-none" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(39,39,42,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(39,39,42,0.4)_1px,transparent_1px)] [background-size:80px_80px]" />

      {/* Content */}
      <motion.div
        className="relative z-10 px-4 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-center">
          {/* Left: identity + narrative (research x hacker) */}
          <div className="text-left">
            {/* Lab status pill */}
            <motion.div variants={itemVariants} className="mb-4 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-emerald-200">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Live System · SW-01
              </span>
              <span className="hidden md:inline-flex rounded-full border border-zinc-700 bg-zinc-900/60 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-400">
                Agentic · Research · Full‑Stack
              </span>
            </motion.div>

            {/* Name with letter animation */}
            <motion.h1 className="mb-4 text-4xl font-semibold leading-tight tracking-tight text-zinc-50 sm:text-6xl md:text-7xl">
              <span className="sr-only">{personalInfo.name}</span>
              <span aria-hidden="true" className="inline-flex flex-wrap">
                {nameLetters.map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    className={`inline-block ${
                      letter === " " ? "w-3 sm:w-4" : ""
                    } bg-gradient-to-b from-zinc-50 via-zinc-300 to-zinc-500 bg-clip-text text-transparent`}
                    whileHover={{
                      scale: 1.15,
                      y: -4,
                      transition: { duration: 0.15 },
                    }}
                    onMouseEnter={playHover}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* Title and tagline as “paper abstract” */}
            <motion.div variants={itemVariants} className="mb-6 space-y-3">
              <p className="inline-flex items-center gap-2 rounded-md bg-zinc-900/80 px-3 py-1 text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">
                <span className="h-1 w-6 bg-gradient-to-r from-emerald-400 to-lime-400" />
                Primary Role
              </p>
              <h2 className="text-lg font-medium text-zinc-200 sm:text-xl">
                {personalInfo.title}
              </h2>
              <p className="max-w-xl text-sm text-zinc-400 sm:text-base">
                {personalInfo.tagline} This portfolio is an interface into the systems,
                agents, and experiments I&apos;ve been building.
              </p>
            </motion.div>

            {/* CTA Row - brutalist / command palette style */}
            <motion.div
              variants={itemVariants}
              className="mb-10 flex flex-wrap items-center gap-4"
            >
              <motion.button
                className="group relative inline-flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3 text-sm font-mono uppercase tracking-[0.2em] text-zinc-50 shadow-[0_0_0_1px_rgba(24,24,27,1)]"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={playHover}
                onClick={(e) => {
                  e.preventDefault();
                  playClick();
                  playWhoosh();
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="h-8 w-0.5 bg-gradient-to-b from-emerald-400 to-lime-400" />
                View Experiments
                <span className="rounded-md bg-zinc-800 px-2 py-1 text-[10px] text-zinc-400">
                  /projects
                </span>
              </motion.button>

              <motion.button
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-700/70 bg-transparent px-5 py-3 text-xs font-mono uppercase tracking-[0.2em] text-zinc-300 hover:border-emerald-400/60 hover:text-emerald-200"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={playHover}
                onClick={(e) => {
                  e.preventDefault();
                  playClick();
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Open Collaboration Channel
                <span className="hidden items-center gap-1 rounded-md bg-zinc-900 px-2 py-0.5 text-[10px] text-zinc-500 sm:inline-flex">
                  <kbd className="rounded bg-zinc-800 px-1.5 py-0.5 text-[9px]">
                    Ctrl
                  </kbd>
                  <span>+</span>
                  <kbd className="rounded bg-zinc-800 px-1.5 py-0.5 text-[9px]">
                    K
                  </kbd>
                </span>
              </motion.button>
            </motion.div>

            {/* Social row - OS style */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 text-xs text-zinc-500"
            >
              <div className="flex gap-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-emerald-400/60 hover:text-emerald-200"
                    whileHover={{ y: -2, scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={playHover}
                    onClick={playClick}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.08 }}
                  >
                    <social.icon className="h-4 w-4" />
                    <span className="sr-only">{social.label}</span>
                  </motion.a>
                ))}
              </div>

              <div className="hidden items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500 sm:flex">
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                Running multi‑agent mental‑health system · LLaMA‑70B
              </div>
            </motion.div>
          </div>

          {/* Right column: “system panel” mixing lab + research */}
          <motion.div
            variants={itemVariants}
            className="relative mt-6 space-y-4 lg:mt-0"
          >
            {/* Top: active experiment card with 3D tilt */}
            <motion.div
              ref={panelRef}
              className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 shadow-[0_26px_90px_rgba(0,0,0,0.9)] backdrop-blur-xl"
              style={{
                rotateX: panelRotateX,
                rotateY: panelRotateY,
                transformStyle: "preserve-3d",
                perspective: 1200,
              }}
              onMouseMove={(e) => {
                if (!panelRef.current) return;
                const rect = panelRef.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                panelMouseX.set((e.clientX - centerX) / rect.width);
                panelMouseY.set((e.clientY - centerY) / rect.height);
              }}
              onMouseLeave={() => {
                panelMouseX.set(0);
                panelMouseY.set(0);
              }}
            >
              <div
                className="mb-4 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500"
                style={{ transform: "translateZ(40px)" }}
              >
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Experiment Log · 2026
                </span>
                <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-zinc-600">
                  v0.1 · Portfolio OS
                </span>
              </div>

              <div className="space-y-3 text-xs text-zinc-400" style={{ transform: "translateZ(30px)" }}>
                <div className="flex items-center justify-between gap-2 rounded-xl border border-zinc-800/80 bg-zinc-900/60 px-3 py-2">
                  <span className="font-mono uppercase tracking-[0.18em] text-zinc-500">
                    Current Focus
                  </span>
                  <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-[11px] text-emerald-300">
                    Agentic AI · Research Tools
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/70 p-3">
                    <p className="mb-1 text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500">
                      Systems
                    </p>
                    <p className="text-sm text-zinc-200">Multi‑agent chatbots</p>
                  </div>
                  <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/70 p-3">
                    <p className="mb-1 text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500">
                      Interface
                    </p>
                    <p className="text-sm text-zinc-200">Full‑stack web</p>
                  </div>
                  <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/70 p-3">
                    <p className="mb-1 text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500">
                      Domain
                    </p>
                    <p className="text-sm text-zinc-200">Research & Health</p>
                  </div>
                </div>

                <div className="rounded-xl border border-zinc-800/80 bg-gradient-to-r from-emerald-500/5 via-lime-500/5 to-transparent px-3 py-2">
                  <p className="mb-1 text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500">
                    Abstract
                  </p>
                  <p className="text-xs text-zinc-300">
                    Designing production‑ready AI systems that feel less like apps and more
                    like tools researchers and engineers actually want to live in.
                  </p>
                </div>
              </div>
              {/* Soft inner glow */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl border border-emerald-500/10 shadow-[0_0_80px_rgba(34,197,94,0.25)]" />
            </motion.div>

            {/* Bottom: tiny metrics strip */}
            <div className="grid grid-cols-3 gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">
              <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/80 px-3 py-2">
                <span>Latency</span>
                <span className="text-emerald-300">Low</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/80 px-3 py-2">
                <span>Mode</span>
                <span className="text-zinc-300">Steady</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/80 px-3 py-2">
                <span>State</span>
                <span className="text-emerald-300">Online</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="flex cursor-pointer flex-col items-center text-[11px] font-mono uppercase tracking-[0.22em] text-zinc-500"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => {
            playClick();
            document
              .querySelector("#about")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="mb-1">Scroll to next module</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
