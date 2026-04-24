"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isMobile,  setIsMobile]  = useState(false);
  const [isHover,   setIsHover]   = useState(false);
  const [isClick,   setIsClick]   = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  /* Dot follows mouse exactly (no lag) */
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  /* Ring follows with a smooth spring lag */
  const ringX = useSpring(dotX, { damping: 22, stiffness: 350 });
  const ringY = useSpring(dotY, { damping: 22, stiffness: 350 });

  const hoverRef = useRef(false);

  useEffect(() => {
    if (window.innerWidth < 768) { setIsMobile(true); return; }

    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive =
        t.tagName === "A" || t.tagName === "BUTTON" ||
        !!t.closest("a") || !!t.closest("button") ||
        t.dataset.cursor === "pointer";
      hoverRef.current = interactive;
      setIsHover(interactive);
    };

    const onDown = () => setIsClick(true);
    const onUp   = () => setIsClick(false);

    window.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);

    return () => {
      window.removeEventListener("resize",   onResize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Outer ring — spring lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width:  isHover ? 44 : 32,
          height: isHover ? 44 : 32,
          border: "1.5px solid var(--accent)",
          background: isHover ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "transparent",
          opacity: isVisible ? (isClick ? 0.5 : 0.7) : 0,
          transition: "width 0.2s ease, height 0.2s ease, background 0.2s ease, opacity 0.3s ease",
        }}
      />

      {/* Inner dot — exact position, no lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width:      isClick ? 3 : 5,
          height:     isClick ? 3 : 5,
          background: "var(--accent)",
          opacity:    isVisible ? 1 : 0,
          transition: "width 0.1s ease, height 0.1s ease, opacity 0.3s ease",
        }}
      />

      <style jsx global>{`
        * { cursor: none !important; }
      `}</style>
    </>
  );
}
