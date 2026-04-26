"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { personalInfo } from "@/lib/data";
import { Mail, Code, Send, CheckCircle, Loader2 } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>;
}

function LinkedinIcon({ className }: { className?: string }) {
  return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
}

const socials = [
  { label: "GitHub", icon: GithubIcon, href: personalInfo.github },
  { label: "LinkedIn", icon: LinkedinIcon, href: personalInfo.linkedin },
  { label: "LeetCode", icon: Code, href: personalInfo.leetcode },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("sent");
      setTimeout(() => {
        setStatus("idle");
        setForm({ name: "", email: "", message: "" });
      }, 3500);
    } catch {
      setStatus("idle");
      alert("Something went wrong — email me directly at sanyamwadhwa.in@gmail.com");
    }
  };

  return (
    <section id="contact" className="py-28" style={{ background: "var(--surface)" }}>
      <div className="section-container">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-14"
        >
          <span className="section-label">06 / Contact</span>
          <span className="h-px flex-1" style={{ background: "var(--border)" }} />
        </motion.div>

        <div className="grid md:grid-cols-[2fr_3fr] gap-10 md:gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="font-display font-bold mb-5"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
                color: "var(--text)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Let&apos;s build
              <br />
              <span style={{ color: "var(--accent)" }}>something.</span>
            </h2>

            <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
              Open to internships, research collaborations, and interesting side projects.
              Drop a message and I&apos;ll reply within 24 hours.
            </p>

            {/* Email */}
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-3 mb-8 group"
              style={{ color: "var(--text)" }}
            >
              <div
                className="p-2.5 rounded-lg transition-colors"
                style={{ background: "var(--accent-dim)", border: "1px solid rgba(124,131,245,0.2)" }}
              >
                <Mail className="w-4 h-4" style={{ color: "var(--accent)" }} />
              </div>
              <span
                className="text-sm font-mono transition-opacity group-hover:opacity-70"
                style={{ letterSpacing: "0.02em" }}
              >
                {personalInfo.email}
              </span>
            </a>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="p-3 rounded-xl transition-all duration-150 hover:-translate-y-0.5"
                  style={{
                    color: "var(--text-muted)",
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,131,245,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  }}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl"
                style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                <CheckCircle className="w-12 h-12 mb-4" style={{ color: "var(--green)" }} />
                <p className="font-display font-semibold text-lg" style={{ color: "var(--text)" }}>
                  Message sent.
                </p>
                <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                  I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { label: "Name", key: "name", type: "text", placeholder: "Your name" },
                  { label: "Email", key: "email", type: "email", placeholder: "you@example.com" },
                ].map((field) => (
                  <div key={field.key}>
                    <label
                      className="block text-xs font-mono uppercase mb-2"
                      style={{ color: "var(--text-muted)", letterSpacing: "0.12em" }}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: "var(--bg)",
                        border: "1px solid var(--border-strong)",
                        color: "var(--text)",
                        fontFamily: "var(--font-sans)",
                      }}
                      onFocus={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 3px var(--accent-dim)";
                      }}
                      onBlur={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label
                    className="block text-xs font-mono uppercase mb-2"
                    style={{ color: "var(--text-muted)", letterSpacing: "0.12em" }}
                  >
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project or idea..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                    style={{
                      background: "var(--bg)",
                      border: "1px solid var(--border-strong)",
                      color: "var(--text)",
                      fontFamily: "var(--font-sans)",
                    }}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 3px var(--accent-dim)";
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2.5 transition-all duration-150 hover:-translate-y-0.5 active:scale-98 disabled:opacity-60"
                  style={{ background: "var(--accent)", color: "#fff" }}
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
