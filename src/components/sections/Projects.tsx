"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { projects } from "@/lib/data";
import { ExternalLink, Github, Trophy, X, ArrowUpRight } from "lucide-react";

type Project = (typeof projects)[0];

function useProjectColor(project: Project) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return project.colorLight ?? project.color;
  return resolvedTheme === "dark" ? project.color : (project.colorLight ?? project.color);
}

/* ── Custom project SVG visuals ────────────────────────────── */

function KontaVisual({ color }: { color: string }) {
  const nodes: [number, number][] = [[100,58],[58,30],[148,25],[35,82],[160,87],[80,105],[132,98]];
  const edges = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,3],[2,4],[5,6],[3,5]];
  return (
    <svg viewBox="0 0 200 128" className="w-full h-full" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id="kg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.18"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="64" rx="85" ry="54" fill="url(#kg-glow)"/>
      {edges.map(([a,b],i) => (
        <line key={i}
          x1={nodes[a][0]} y1={nodes[a][1]}
          x2={nodes[b][0]} y2={nodes[b][1]}
          stroke={color} strokeWidth="0.9" strokeOpacity="0.2"
          strokeDasharray={i % 2 === 0 ? "4 3" : "none"}
        />
      ))}
      {nodes.map(([cx,cy],i) => (
        <motion.circle key={i} cx={cx} cy={cy}
          r={i===0 ? 9 : i<3 ? 5.5 : 4}
          fill={color}
          animate={{ opacity: [i===0?0.9:0.45, i===0?1:0.75, i===0?0.9:0.45], scale: [1, 1.18, 1] }}
          transition={{ duration: 2.2+i*0.25, delay: i*0.28, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: cx, originY: cy }}
        />
      ))}
      <text x="100" y="62" textAnchor="middle" dominantBaseline="middle"
        fill={color} fontSize="4.8" fontFamily="monospace" opacity="0.55" letterSpacing="0.8">
        GRAPH
      </text>
    </svg>
  );
}

function FlowSyncVisual({ color }: { color: string }) {
  const mainY = 42, branchY = 82;
  const mainCommits: [number,string][] = [[22,"init"],[55,"feat"],[82,"ctx"],[135,"rag"],[178,"sync"]];
  const branchCommits = [108, 135, 155];
  return (
    <svg viewBox="0 0 200 118" className="w-full h-full">
      <line x1="15" y1={mainY} x2="185" y2={mainY} stroke={color} strokeWidth="1.5" strokeOpacity="0.3"/>
      <path d={`M 82 ${mainY} C 92 ${mainY} 92 ${branchY} 105 ${branchY}`}
        fill="none" stroke={color} strokeWidth="1.2" strokeOpacity="0.28"/>
      <line x1="105" y1={branchY} x2="156" y2={branchY} stroke={color} strokeWidth="1.2" strokeOpacity="0.28"/>
      <path d={`M 156 ${branchY} C 168 ${branchY} 168 ${mainY} 178 ${mainY}`}
        fill="none" stroke={color} strokeWidth="1.2" strokeOpacity="0.28"/>
      {mainCommits.map(([x,label],i) => (
        <g key={i}>
          <motion.circle cx={x} cy={mainY} r={i===4?6:4}
            fill={color}
            animate={{ opacity: [0.5,0.85,0.5], scale:[1,1.15,1] }}
            transition={{ duration:2, delay:i*0.38, repeat:Infinity }}
          />
          <text x={x} y={mainY-10} textAnchor="middle"
            fill={color} fontSize="4.2" fontFamily="monospace" opacity="0.45">{label}</text>
        </g>
      ))}
      {branchCommits.map((x,i) => (
        <motion.circle key={i} cx={x} cy={branchY} r="3.5"
          fill={color}
          animate={{ opacity:[0.35,0.65,0.35] }}
          transition={{ duration:2, delay:i*0.3+0.6, repeat:Infinity }}
        />
      ))}
      <text x="130" y={branchY+14} textAnchor="middle" fill={color}
        fontSize="4.5" fontFamily="monospace" opacity="0.4" letterSpacing="0.3">
        branch/memory
      </text>
      <text x="175" y={mainY+14} textAnchor="middle" fill={color}
        fontSize="4.5" fontFamily="monospace" opacity="0.5">merge</text>
    </svg>
  );
}

function PaperMindVisual({ color }: { color: string }) {
  const lineWidths = [50, 40, 45, 32, 42, 28];
  return (
    <svg viewBox="0 0 200 118" className="w-full h-full">
      {[2,1,0].map(k => (
        <rect key={k} x={50+k*6} y={12+k*6} width="78" height="92"
          rx="4" fill={color} fillOpacity={0.04+k*0.04}
          stroke={color} strokeOpacity={0.15+k*0.06} strokeWidth="0.9"/>
      ))}
      {lineWidths.map((w,i) => (
        <rect key={i} x="62" y={26+i*12} width={w} height="3" rx="1.5"
          fill={color} fillOpacity={i===0?0.55:0.2}/>
      ))}
      {[25,48,72].map((y,i) => (
        <g key={i}>
          <motion.line x1="133" y1={y} x2="168" y2={y}
            stroke={color} strokeWidth="0.9" strokeOpacity="0.35"
            strokeDasharray="3 2.5"
            animate={{ x2:[158,170,158] }}
            transition={{ duration:1.6, delay:i*0.55, repeat:Infinity, ease:"easeInOut" }}
          />
          <motion.circle cx="170" cy={y} r="4"
            fill={color}
            animate={{ opacity:[0.45,0.85,0.45], scale:[0.9,1.1,0.9] }}
            transition={{ duration:1.6, delay:i*0.55, repeat:Infinity }}
          />
        </g>
      ))}
      <text x="155" y="95" textAnchor="middle" fill={color}
        fontSize="4.5" fontFamily="monospace" opacity="0.4" letterSpacing="0.3">EXTRACT</text>
    </svg>
  );
}

function GarudaAIVisual({ color }: { color: string }) {
  const bars = [
    { label:"VRAM", val:0.85 },
    { label:"COMP", val:0.62 },
    { label:"Q4KM", val:0.91 },
    { label:"INFER",val:0.48 },
  ];
  return (
    <svg viewBox="0 0 200 118" className="w-full h-full">
      <rect x="18" y="10" width="164" height="98" rx="6"
        fill={color} fillOpacity="0.05" stroke={color} strokeOpacity="0.22" strokeWidth="0.9"/>
      <rect x="18" y="10" width="164" height="20" rx="6" fill={color} fillOpacity="0.1"/>
      <circle cx="31" cy="20" r="3.5" fill="#ff5f57" fillOpacity="0.75"/>
      <circle cx="43" cy="20" r="3.5" fill="#ffbd2e" fillOpacity="0.75"/>
      <circle cx="55" cy="20" r="3.5" fill="#28ca41" fillOpacity="0.75"/>
      <text x="100" y="24" textAnchor="middle" fill={color}
        fontSize="4.8" fontFamily="monospace" opacity="0.45" letterSpacing="0.5">garudaai.sh</text>
      {bars.map((b,i) => (
        <g key={i}>
          <text x="28" y={44+i*17} fill={color} fontSize="5" fontFamily="monospace" opacity="0.5">{b.label}</text>
          <rect x="60" y={36+i*17} width="115" height="7" rx="2" fill={color} fillOpacity="0.09"/>
          <motion.rect x="60" y={36+i*17} height="7" rx="2" fill={color} fillOpacity="0.55"
            initial={{ width: 0 }}
            animate={{ width: 115*b.val }}
            transition={{ duration:1.1, delay:i*0.18, ease:"easeOut", repeat:Infinity, repeatDelay:2.5 }}
          />
          <text x="178" y={44+i*17} textAnchor="end" fill={color}
            fontSize="4.5" fontFamily="monospace" opacity="0.55">{Math.round(b.val*100)}%</text>
        </g>
      ))}
      <text x="28" y="108" fill={color} fontSize="5" fontFamily="monospace" opacity="0.55">
        $ ollama pull llama3
      </text>
      <motion.rect x="122" y="103" width="6" height="2" rx="0.5" fill={color} fillOpacity="0.7"
        animate={{ opacity:[1,0,1] }} transition={{ duration:1, repeat:Infinity }}
      />
    </svg>
  );
}

function CogniRecycleVisual({ color }: { color: string }) {
  const items = [
    { label:"♻", c:"#34d399", dest:"↑ Recycle" },
    { label:"B",  c:"#fbbf24", dest:"→ Organic" },
    { label:"!",  c:"#f87171", dest:"↓ Hazard"  },
    { label:"~",  c:color,     dest:"→ Landfill" },
  ];
  return (
    <svg viewBox="0 0 200 118" className="w-full h-full">
      {/* Belt */}
      <rect x="8" y="70" width="184" height="14" rx="4" fill={color} fillOpacity="0.1"
        stroke={color} strokeOpacity="0.22" strokeWidth="0.9"/>
      {[0,1,2,3,4,5,6,7,8,9].map(i=>(
        <rect key={i} x={14+i*17} y="73" width="12" height="8" rx="1.5"
          fill={color} fillOpacity="0.08"/>
      ))}
      {/* Items rolling in */}
      {items.map((item,i)=>(
        <motion.g key={i}
          animate={{ x: [190, -30] }}
          transition={{ duration:5+i*0.6, delay:i*1.1, repeat:Infinity, ease:"linear" }}
        >
          <rect x={0} y="51" width="24" height="19" rx="4"
            fill={item.c} fillOpacity="0.25" stroke={item.c} strokeOpacity="0.5" strokeWidth="0.9"/>
          <text x={12} y="64" textAnchor="middle" fontSize="9"
            fill={item.c} fontFamily="monospace" fontWeight="bold">{item.label}</text>
        </motion.g>
      ))}
      {/* Scanner box */}
      <rect x="84" y="32" width="32" height="38" rx="4"
        fill={color} fillOpacity="0.09" stroke={color} strokeOpacity="0.35" strokeWidth="0.9"/>
      <text x="100" y="48" textAnchor="middle" fill={color}
        fontSize="4.5" fontFamily="monospace" opacity="0.6" letterSpacing="0.3">AI</text>
      <motion.rect x="84" y="44" width="32" height="1.5" rx="0.5" fill={color} fillOpacity="0.55"
        animate={{ y:[34,66,34] }} transition={{ duration:2, repeat:Infinity, ease:"easeInOut" }}/>
      {/* Stats */}
      <text x="100" y="100" textAnchor="middle" fill={color}
        fontSize="4.5" fontFamily="monospace" opacity="0.4">99.2% accuracy · 1200+/hr</text>
    </svg>
  );
}

function BloodInsightsVisual({ color }: { color: string }) {
  const params = [
    { l:"HGB", v:0.68, s:"low"  },
    { l:"GLU", v:0.85, s:"high" },
    { l:"PLT", v:0.55, s:"ok"   },
    { l:"WBC", v:0.42, s:"ok"   },
  ];
  const statusColor = (s:string) => s==="ok" ? color : s==="high" ? "#fbbf24" : "#f87171";
  // ECG path points
  const ecg = "M8 62 L25 62 L33 38 L41 82 L49 62 L62 62 L70 42 L78 76 L86 62 L100 62";
  return (
    <svg viewBox="0 0 200 118" className="w-full h-full">
      <motion.path d={ecg} fill="none" stroke={color}
        strokeWidth="1.8" strokeOpacity="0.55" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0,1,1,0], opacity:[0,1,1,0] }}
        transition={{ duration:2.4, repeat:Infinity, repeatDelay:0.6, ease:"easeInOut" }}
      />
      {params.map((p,i)=>(
        <g key={i}>
          <text x="112" y={22+i*22} fill={color} fontSize="5.2" fontFamily="monospace" opacity="0.55">{p.l}</text>
          <rect x="132" y={14+i*22} width="55" height="8" rx="2" fill={color} fillOpacity="0.09"/>
          <motion.rect x="132" y={14+i*22} height="8" rx="2"
            fill={statusColor(p.s)} fillOpacity="0.6"
            initial={{ width:0 }}
            animate={{ width: 55*p.v }}
            transition={{ duration:1, delay:i*0.15, ease:"easeOut", repeat:Infinity, repeatDelay:2.5 }}
          />
          <text x="190" y={22+i*22} textAnchor="end"
            fill={statusColor(p.s)} fontSize="5" fontFamily="monospace" opacity="0.75">
            {p.s==="ok"?"✓":p.s==="high"?"▲":"▼"}
          </text>
        </g>
      ))}
      <motion.text x="54" y="105" textAnchor="middle" fontSize="18"
        fill={color} fillOpacity="0.7"
        animate={{ opacity:[0.5,0.9,0.5], scale:[1,1.1,1] }}
        transition={{ duration:1.2, repeat:Infinity, ease:"easeInOut" }}>
        ♥
      </motion.text>
      <text x="54" y="116" textAnchor="middle" fill={color}
        fontSize="4.5" fontFamily="monospace" opacity="0.45">72 BPM</text>
    </svg>
  );
}

function RealTMSVisual({ color }: { color: string }) {
  const waveHeights = [10,18,12,24,16,22,14,26,18,13,22,17];
  const langs = [
    { x:140, y:35, t:"EN" },
    { x:165, y:60, t:"हि" },
    { x:145, y:85, t:"日" },
  ];
  return (
    <svg viewBox="0 0 200 118" className="w-full h-full">
      {waveHeights.map((h,i)=>(
        <motion.rect key={i} x={8+i*7} y={59-h/2} width="4.5" height={h} rx="2.2"
          fill={color} fillOpacity="0.5"
          animate={{ height:[h,h*1.5,h], y:[59-h/2,59-h*0.75,59-h/2] }}
          transition={{ duration:0.75, delay:i*0.06, repeat:Infinity, ease:"easeInOut" }}
        />
      ))}
      {/* Arrow */}
      <motion.g animate={{ x:[0,4,0] }}
        transition={{ duration:1.5, repeat:Infinity, ease:"easeInOut" }}>
        <line x1="102" y1="59" x2="120" y2="59"
          stroke={color} strokeWidth="1.6" strokeOpacity="0.5"/>
        <polygon points="120,55 127,59 120,63" fill={color} fillOpacity="0.5"/>
      </motion.g>
      {/* Language bubbles */}
      {langs.map((l,i)=>(
        <motion.g key={i}
          animate={{ scale:[1,1.1,1], opacity:[0.55,0.9,0.55] }}
          transition={{ duration:1.6, delay:i*0.5, repeat:Infinity }}>
          <circle cx={l.x} cy={l.y} r="15"
            fill={color} fillOpacity="0.1"
            stroke={color} strokeOpacity="0.3" strokeWidth="0.9"/>
          <text x={l.x} y={l.y+4} textAnchor="middle"
            fill={color} fontSize="8.5" fontFamily="sans-serif" opacity="0.8">{l.t}</text>
        </motion.g>
      ))}
      <text x="100" y="110" textAnchor="middle" fill={color}
        fontSize="4.5" fontFamily="monospace" opacity="0.4">15+ languages · 4-stage pipeline</text>
    </svg>
  );
}

const VISUALS: Record<number, React.FC<{ color: string }>> = {
  1: KontaVisual,
  2: FlowSyncVisual,
  3: PaperMindVisual,
  4: GarudaAIVisual,
  5: CogniRecycleVisual,
  6: BloodInsightsVisual,
  7: RealTMSVisual,
};

// col-span class per project (3-column grid)
const COL_SPAN: Record<number, string> = {
  1: "md:col-span-2", // KONTA - wide
  2: "md:col-span-1",
  3: "md:col-span-1",
  4: "md:col-span-1",
  5: "md:col-span-1",
  6: "md:col-span-1",
  7: "md:col-span-2", // RealTMS - wide
};

/* ── Bento card ─────────────────────────────────────────── */
function BentoCard({ project, index, onClick }: {
  project: Project;
  index: number;
  onClick: (p: Project) => void;
}) {
  const color = useProjectColor(project);
  const Visual = VISUALS[project.id];
  const isWide = project.id === 1 || project.id === 7;

  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      onClick={() => onClick(project)}
      className={`group relative text-left rounded-2xl overflow-hidden cursor-pointer ${COL_SPAN[project.id]}`}
      style={{
        background: "var(--bg)",
        border: "1px solid var(--border)",
        transition: "border-color 0.25s, box-shadow 0.25s",
        minHeight: isWide ? 220 : 240,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = color + "55";
        el.style.boxShadow = `0 0 30px ${color}18, 0 8px 24px rgba(0,0,0,0.2)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: "absolute", top:0, left:0, right:0, height:2,
        background: color, opacity: 0.55,
        transition: "opacity 0.25s",
      }} className="group-hover:opacity-100" />

      {/* Ambient blob */}
      <div style={{
        position:"absolute", top:-40, right:-40,
        width:130, height:130, borderRadius:"50%",
        background: color + "0a", filter:"blur(30px)",
        pointerEvents:"none",
      }}/>

      {/* Visual art area */}
      <div style={{ height: isWide ? 130 : 148, padding: "12px 16px 0" }}>
        {Visual && <Visual color={color} />}
      </div>

      {/* Info area */}
      <div style={{ padding: "10px 18px 16px" }}>
        {/* Award */}
        {project.award && (
          <div className="inline-flex items-center gap-1 mb-2"
            style={{
              fontFamily:"var(--font-mono)", fontSize:"0.65rem",
              color:"var(--award)", background:"var(--award-dim)",
              border:"1px solid color-mix(in srgb, var(--award) 22%, transparent)",
              padding:"2px 8px", borderRadius:4, letterSpacing:"0.07em",
              textTransform:"uppercase",
            }}>
            <Trophy className="w-2.5 h-2.5" />
            {project.award}
          </div>
        )}

        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display font-bold leading-tight"
              style={{ fontSize:"1.05rem", color:"var(--text)", letterSpacing:"-0.01em" }}>
              {project.title}
            </h3>
            <p style={{ fontSize:"0.75rem", color:"var(--text-subtle)", marginTop:3, lineHeight:1.4 }}>
              {project.subtitle}
            </p>
          </div>
          <div className="flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color }}>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tech.slice(0,4).map(t => (
            <span key={t} style={{
              fontFamily:"var(--font-mono)", fontSize:"0.68rem",
              color, background: color+"12",
              border:`1px solid ${color}22`,
              padding:"2px 8px", borderRadius:999,
              letterSpacing:"0.03em",
            }}>{t}</span>
          ))}
          {project.tech.length > 4 && (
            <span style={{
              fontFamily:"var(--font-mono)", fontSize:"0.68rem",
              color:"var(--text-subtle)", background:"var(--surface)",
              border:"1px solid var(--border)",
              padding:"2px 8px", borderRadius:999,
            }}>+{project.tech.length-4}</span>
          )}
        </div>
      </div>
    </motion.button>
  );
}

/* ── Architecture pipeline ──────────────────────────────── */
function ArchPipeline({ arch, color }: { arch: string; color: string }) {
  const steps = arch.split("→").map(s => s.trim());
  return (
    <div className="rounded-lg px-4 py-3 overflow-x-auto"
      style={{ background: color+"08", border:`1px solid ${color}20` }}>
      <div className="flex flex-wrap items-center gap-1.5">
        {steps.map((step,i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="font-mono text-xs whitespace-nowrap"
              style={{ color:"var(--text-muted)", letterSpacing:"0.02em" }}>{step}</span>
            {i < steps.length-1 && (
              <span className="font-mono text-xs font-bold flex-shrink-0"
                style={{ color }}>→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Detail modal ───────────────────────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const color = useProjectColor(project);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    window.dispatchEvent(new Event("lenis:stop"));
    return () => {
      document.removeEventListener("keydown", handleKey);
      window.dispatchEvent(new Event("lenis:start"));
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter:"blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.28, ease: [0.25,0.46,0.45,0.94] }}
        className="relative w-full sm:max-w-2xl lg:max-w-3xl rounded-t-3xl sm:rounded-2xl"
        style={{
          background:"var(--bg)",
          border:"1px solid var(--border-strong)",
          maxHeight:"96vh",
          overflowY:"auto",
          WebkitOverflowScrolling:"touch",
          touchAction:"pan-y",
        }}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {/* Drag handle (mobile) */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background:"var(--border-strong)" }}/>
        </div>

        {/* Close button */}
        <button onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl transition-colors"
          style={{ color:"var(--text-muted)", background:"var(--surface)" }}>
          <X className="w-4 h-4"/>
        </button>

        <div className="p-6 sm:p-8 lg:p-10">
          {/* Top accent */}
          <div className="h-px mb-7"
            style={{ background:`linear-gradient(90deg, ${color}, ${color}40, transparent)` }}/>

          {/* Award + Title */}
          {project.award && (
            <div className="inline-flex items-center gap-1.5 mb-3"
              style={{
                fontFamily:"var(--font-mono)", fontSize:"0.62rem",
                color:"var(--award)", background:"var(--award-dim)",
                border:"1px solid color-mix(in srgb, var(--award) 22%, transparent)",
                padding:"3px 9px", borderRadius:5, letterSpacing:"0.08em",
                textTransform:"uppercase",
              }}>
              <Trophy className="w-3 h-3"/>
              {project.award}
            </div>
          )}

          <h2 className="font-display font-bold leading-tight mb-1"
            style={{
              fontSize:"clamp(1.5rem,4vw,2.2rem)",
              color, letterSpacing:"-0.025em",
            }}>
            {project.title}
          </h2>
          <p style={{ fontSize:"0.9rem", color:"var(--text-muted)", marginBottom:16, lineHeight:1.5 }}>
            {project.subtitle}
          </p>

          {/* Date + GitHub */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="font-mono text-xs px-2.5 py-1 rounded-md"
              style={{ color:"var(--text-subtle)", background:"var(--surface)", border:"1px solid var(--border)" }}>
              {project.date}
            </span>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-md transition-opacity hover:opacity-75"
                style={{ color, background:color+"12", border:`1px solid ${color}30` }}>
                <Github className="w-3 h-3"/>
                GitHub
                <ExternalLink className="w-2.5 h-2.5"/>
              </a>
            )}
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-6"
            style={{ color:"var(--text-muted)", fontSize:"0.9rem" }}>
            {project.description}
          </p>

          <div className="h-px mb-6" style={{ background:"var(--border)" }}/>

          {/* The Problem */}
          <div className="mb-6">
            <p className="section-label mb-2" style={{ color }}>The Problem</p>
            <p className="leading-relaxed italic" style={{ fontSize:"0.9rem", color:"var(--text-muted)" }}>
              {project.problem}
            </p>
          </div>

          {/* How it works */}
          {"architecture" in project && project.architecture && (
            <div className="mb-6">
              <p className="section-label mb-2" style={{ color }}>How It Works</p>
              <ArchPipeline arch={project.architecture} color={color}/>
            </div>
          )}

          <div className="h-px mb-6" style={{ background:"var(--border)" }}/>

          {/* Key Features */}
          {"keyFeatures" in project && (project as { keyFeatures?: string[] }).keyFeatures?.length ? (
            <div className="mb-6">
              <p className="section-label mb-3" style={{ color }}>Key Features</p>
              <ul className="space-y-3">
                {((project as { keyFeatures?: string[] }).keyFeatures ?? []).map((f,i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed"
                    style={{ color:"var(--text-muted)" }}>
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{ background:color }}/>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Technical Highlights */}
          <div className="mb-6">
            <p className="section-label mb-3" style={{ color }}>Technical Highlights</p>
            <ul className="space-y-3">
              {project.highlights.map((h,i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed"
                  style={{ color:"var(--text-muted)" }}>
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full flex-shrink-0"
                    style={{ background:color }}/>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Metrics */}
          {project.metrics.length > 0 && (
            <div className="mb-6">
              <p className="section-label mb-3" style={{ color }}>Metrics</p>
              <div className="flex flex-wrap gap-2">
                {project.metrics.map(m => (
                  <span key={m} className="font-mono text-sm px-3 py-1.5 rounded-md"
                    style={{ color, border:`1px solid ${color}30`, background:color+"0d", letterSpacing:"0.04em" }}>
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="h-px mb-6" style={{ background:"var(--border)" }}/>

          {/* Tech Stack */}
          <div>
            <p className="section-label mb-3" style={{ color }}>Tech Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map(t => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main section ───────────────────────────────────────── */
export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

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
          <span className="h-px flex-1" style={{ background: "var(--border)" }}/>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold mb-12"
          style={{
            fontSize:"clamp(1.8rem,3.5vw,2.75rem)",
            color:"var(--text)",
            letterSpacing:"-0.02em",
            lineHeight:1.2,
          }}
        >
          Things I&apos;ve built
          <br/>
          <span style={{ color:"var(--accent)" }}>and shipped.</span>
        </motion.h2>

        {/* Bento grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          style={{ gap:"0.85rem" }}
        >
          {projects.map((project, i) => (
            <BentoCard
              key={project.id}
              project={project}
              index={i}
              onClick={setSelected}
            />
          ))}
        </div>

        {/* GitHub link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <a href="https://github.com/SanyamWadhwa07" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
            style={{ color:"var(--text-muted)", fontFamily:"var(--font-mono)" }}>
            <Github className="w-4 h-4"/>
            More on GitHub
            <ExternalLink className="w-3.5 h-3.5"/>
          </a>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)}/>
        )}
      </AnimatePresence>
    </section>
  );
}
