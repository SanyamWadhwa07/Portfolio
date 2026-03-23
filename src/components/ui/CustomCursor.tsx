"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Trail positions
  const trail1X = useSpring(cursorX, { damping: 30, stiffness: 200 });
  const trail1Y = useSpring(cursorY, { damping: 30, stiffness: 200 });
  const trail2X = useSpring(cursorX, { damping: 35, stiffness: 150 });
  const trail2Y = useSpring(cursorY, { damping: 35, stiffness: 150 });
  const trail3X = useSpring(cursorX, { damping: 40, stiffness: 100 });
  const trail3Y = useSpring(cursorY, { damping: 40, stiffness: 100 });

  const moveCursor = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  }, [cursorX, cursorY]);

  useEffect(() => {
    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", () => setIsClicking(true));
    window.addEventListener("mouseup", () => setIsClicking(false));

    // Detect hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "pointer"
      ) {
        setIsHovering(true);
        setCursorVariant("hover");
      } else if (target.dataset.cursor === "text") {
        setCursorVariant("text");
      } else {
        setIsHovering(false);
        setCursorVariant("default");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [moveCursor]);

  const getVariantStyles = () => {
    switch (cursorVariant) {
      case "hover":
        return {
          width: 60,
          height: 60,
          backgroundColor: "rgba(139, 92, 246, 0.15)",
          border: "2px solid rgba(139, 92, 246, 0.5)",
          mixBlendMode: "normal" as const,
        };
      case "text":
        return {
          width: 4,
          height: 32,
          backgroundColor: "#8b5cf6",
          borderRadius: 0,
        };
      default:
        return {
          width: isClicking ? 12 : 16,
          height: isClicking ? 12 : 16,
          backgroundColor: "transparent",
          border: "2px solid #8b5cf6",
        };
    }
  };

  // Hide on mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Trail particles */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: trail3X,
          y: trail3Y,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
          backgroundColor: "rgba(139, 92, 246, 0.2)",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: trail2X,
          y: trail2Y,
          translateX: "-50%",
          translateY: "-50%",
          width: 8,
          height: 8,
          backgroundColor: "rgba(139, 92, 246, 0.3)",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: trail1X,
          y: trail1Y,
          translateX: "-50%",
          translateY: "-50%",
          width: 10,
          height: 10,
          backgroundColor: "rgba(139, 92, 246, 0.4)",
        }}
      />
      
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={getVariantStyles()}
        transition={{ duration: 0.15 }}
      />
      
      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-violet-500"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: 4,
          height: 4,
        }}
        animate={{
          scale: isClicking ? 0.5 : 1,
          opacity: cursorVariant === "text" ? 0 : 1,
        }}
      />

      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
