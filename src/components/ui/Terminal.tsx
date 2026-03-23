"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { personalInfo, projects } from "@/lib/data";

interface TerminalLine {
  type: "command" | "output" | "prompt";
  content: string;
  delay?: number;
}

export default function Terminal() {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  // Terminal session sequence
  const terminalSequence: TerminalLine[] = useMemo(() => [
    { type: "prompt", content: "guest@portfolio:~$ ", delay: 500 },
    { type: "command", content: "whoami", delay: 100 },
    { type: "output", content: personalInfo.name, delay: 600 },
    { type: "output", content: personalInfo.title, delay: 200 },
    { type: "output", content: `Location: Thapar Institute, Patiala`, delay: 200 },
    { type: "output", content: `Email: ${personalInfo.email}`, delay: 200 },
    { type: "prompt", content: "guest@portfolio:~$ ", delay: 800 },
    { type: "command", content: "cat focus.txt", delay: 100 },
    { type: "output", content: "=== CURRENT FOCUS ===", delay: 400 },
    { type: "output", content: "🤖 Multi-agent AI systems", delay: 300 },
    { type: "output", content: "🧠 Mental health chatbots", delay: 300 },
    { type: "output", content: "🔬 Research paper intelligence", delay: 300 },
    { type: "output", content: "⚡ LLaMA-70B optimization", delay: 300 },
    { type: "output", content: "🌐 Full-stack development", delay: 300 },
    { type: "prompt", content: "guest@portfolio:~$ ", delay: 800 },
    { type: "command", content: "./status.sh", delay: 100 },
    { type: "output", content: "#!/bin/bash", delay: 400 },
    { type: "output", content: "# Portfolio Status Report", delay: 200 },
    { type: "output", content: "", delay: 100 },
    { type: "output", content: "🟢 System Status: ONLINE", delay: 300 },
    { type: "output", content: `🚀 Active Projects: ${projects.length}`, delay: 300 },
    { type: "output", content: "🔥 Current Mode: Research & Development", delay: 300 },
    { type: "output", content: "⚡ Performance: Optimized", delay: 300 },  
    { type: "output", content: "🎯 Availability: Open for collaboration", delay: 300 },
    { type: "output", content: "", delay: 300 },
    { type: "output", content: "Last commit: Building something amazing...", delay: 400 },
    { type: "prompt", content: "guest@portfolio:~$ ", delay: 500 },
  ], []);

  // Cursor blinking animation
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // Terminal typing animation
  useEffect(() => {
    if (currentLineIndex >= terminalSequence.length) {
      const timer = setTimeout(() => {
        setIsComplete(true);
      }, 0);
      return () => clearTimeout(timer);
    }

    const currentLine = terminalSequence[currentLineIndex];
    const targetLength = currentLine.content.length;

    if (currentCharIndex < targetLength) {
      const typingSpeed = currentLine.type === "command" ? 80 : 30;
      const timer = setTimeout(() => {
        setCurrentCharIndex(currentCharIndex + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    } else {
      // Line complete, move to next after delay
      const timer = setTimeout(() => {
        setCurrentLineIndex(currentLineIndex + 1);
        setCurrentCharIndex(0);
      }, currentLine.delay || 200);

      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, currentCharIndex, terminalSequence]);

  const renderLine = (line: TerminalLine, index: number) => {
    const isCurrentLine = index === currentLineIndex;
    const content = isCurrentLine 
      ? line.content.slice(0, currentCharIndex)
      : line.content;

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center font-mono text-sm"
      >
        {line.type === "prompt" && (
          <span className="text-emerald-500 dark:text-emerald-400">{content}</span>
        )}
        {line.type === "command" && (
          <>
            <span className="text-emerald-500 dark:text-emerald-400">guest@portfolio:~$ </span>
            <span className="text-slate-100 dark:text-zinc-50">{content}</span>
          </>
        )}
        {line.type === "output" && (
          <span className="text-slate-200 ml-0 dark:text-zinc-300">{content}</span>
        )}
        {isCurrentLine && showCursor && (
          <motion.span
            className="bg-emerald-500 ml-1 dark:bg-emerald-400"
            style={{ width: '2px', height: '1em' }}
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
      </motion.div>
    );
  };

  return (
    <div className="relative h-full w-full">
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-slate-300 bg-white/90 px-4 py-2 dark:border-zinc-700 dark:bg-zinc-900/90">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-2 text-xs font-mono text-slate-600 dark:text-zinc-400">
            bash - portfolio
          </span>
        </div>
        <div className="text-xs font-mono text-slate-500 dark:text-zinc-500">
          {personalInfo.name.toLowerCase().replace(' ', '')}.local
        </div>
      </div>

      {/* Terminal Body */}
      <div className="h-full overflow-hidden bg-slate-900/90 p-4 dark:bg-black/90">
        <div className="h-full overflow-y-auto">
          <div className="space-y-1">
            {/* Welcome message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 text-xs font-mono text-slate-400 dark:text-zinc-500"
            >
              Welcome to {personalInfo.name}&apos;s Portfolio Terminal v1.0
              <br />
              Type commands to explore...
            </motion.div>

            {/* Render completed lines */}
            {terminalSequence.slice(0, currentLineIndex).map((line, index) =>
              renderLine(line, index)
            )}

            {/* Render current line */}
            {currentLineIndex < terminalSequence.length &&
              renderLine(terminalSequence[currentLineIndex], currentLineIndex)}

            {/* Final cursor when complete */}
            {isComplete && (
              <div className="flex items-center font-mono text-sm">
                <span className="text-emerald-400">guest@portfolio:~$ </span>
                {showCursor && (
                  <motion.span
                    className="bg-emerald-500 ml-1 dark:bg-emerald-400"
                    style={{ width: '2px', height: '1em' }}
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}