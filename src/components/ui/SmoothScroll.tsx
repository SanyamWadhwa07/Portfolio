"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.8,
    });
    lenisRef.current = lenis;

    /* Sync Lenis with Framer Motion's scroll tracking */
    lenis.on("scroll", () => {
      window.dispatchEvent(new Event("scroll"));
    });

    let raf: number;
    function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    /* Allow modal overlays to pause/resume Lenis */
    const onStop  = () => lenis.stop();
    const onStart = () => lenis.start();
    window.addEventListener("lenis:stop",  onStop);
    window.addEventListener("lenis:start", onStart);

    /* Allow anchor links (navbar) to work with Lenis */
    const handleAnchor = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a[href^='#']");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 });
    };
    document.addEventListener("click", handleAnchor);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      document.removeEventListener("click", handleAnchor);
      window.removeEventListener("lenis:stop",  onStop);
      window.removeEventListener("lenis:start", onStart);
    };
  }, []);

  return <>{children}</>;
}
