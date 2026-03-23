"use client";

import React, { useEffect, useRef } from "react";

/**
 * CosmicSynapseCanvas
 * 3-D neural-network sphere with pulsing synapse connections.
 * Adapted to use the portfolio's teal (#00e8c6) accent palette.
 * Responds to mouse movement for parallax depth.
 */
export const CosmicSynapseCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      radius: 160,
    };
    const PERSPECTIVE = 400;

    /* ── Neuron ─────────────────────────────────────────────────── */
    class Neuron {
      x: number; y: number; z: number;
      baseX: number; baseY: number; baseZ: number;
      radius: number;
      activation: number;
      neighbors: Neuron[];

      constructor(x: number, y: number, z: number) {
        this.x = this.baseX = x;
        this.y = this.baseY = y;
        this.z = this.baseZ = z;
        this.radius = Math.random() * 1.8 + 0.6;
        this.activation = 0;
        this.neighbors = [];
      }

      project() {
        const rotX = (mouse.y - canvas!.height / 2) * 0.0001;
        const rotY = (mouse.x - canvas!.width / 2) * 0.0001;
        const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
        const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
        const x1 = this.x * cosY - this.z * sinY;
        const z1 = this.z * cosY + this.x * sinY;
        const y1 = this.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + this.y * sinX;
        const scale = PERSPECTIVE / (PERSPECTIVE + z2);
        return { x: x1 * scale + canvas!.width / 2, y: y1 * scale + canvas!.height / 2, scale };
      }

      draw() {
        const { x, y, scale } = this.project();
        const isDark = document.documentElement.classList.contains("dark");
        ctx!.beginPath();
        ctx!.arc(x, y, this.radius * scale, 0, Math.PI * 2);
        ctx!.fillStyle = isDark
          ? `rgba(0,232,198,${0.15 + this.activation * 0.75})`
          : `rgba(0,100,84,${0.25 + this.activation * 0.70})`;
        ctx!.fill();
      }

      update() {
        const { x: px, y: py } = this.project();
        const dx = mouse.x - px, dy = mouse.y - py;
        const dist = Math.hypot(dx, dy) || 1;
        const force = Math.max(0, (mouse.radius - dist) / mouse.radius);
        this.x += (dx / dist) * force * 0.4;
        this.y += (dy / dist) * force * 0.4;
        this.x += (this.baseX - this.x) * 0.01;
        this.y += (this.baseY - this.y) * 0.01;
        if (this.activation > 0) this.activation -= 0.012;
        this.draw();
      }

      fire() {
        if (this.activation > 0.5) return;
        this.activation = 1;
        this.neighbors.forEach((n) => pulses.push(new Pulse(this, n)));
      }
    }

    /* ── Pulse ──────────────────────────────────────────────────── */
    class Pulse {
      start: Neuron; end: Neuron;
      progress: number; speed: number;

      constructor(start: Neuron, end: Neuron) {
        this.start = start;
        this.end = end;
        this.progress = 0;
        this.speed = 0.04 + Math.random() * 0.04;
      }

      /** Returns true when done */
      update(): boolean {
        this.progress += this.speed;
        if (this.progress >= 1) {
          this.end.activation = Math.min(1, this.end.activation + 0.45);
          return true;
        }
        return false;
      }

      draw() {
        const sp = this.start.project(), ep = this.end.project();
        const x = sp.x + (ep.x - sp.x) * this.progress;
        const y = sp.y + (ep.y - sp.y) * this.progress;
        const scale = sp.scale + (ep.scale - sp.scale) * this.progress;
        ctx!.beginPath();
        ctx!.arc(x, y, 2.2 * scale, 0, Math.PI * 2);
        const isDark = document.documentElement.classList.contains("dark");
        ctx!.fillStyle = isDark
          ? `rgba(0,232,198,${1 - this.progress * 0.6})`
          : `rgba(0,100,84,${1 - this.progress * 0.5})`;
        ctx!.shadowColor = isDark ? "#00e8c6" : "#007060";
        ctx!.shadowBlur = 10;
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }
    }

    let neurons: Neuron[] = [];
    let pulses: Pulse[] = [];

    const init = () => {
      neurons = [];
      pulses = [];
      const N = 900;
      const R = Math.min(canvas!.width, canvas!.height) * 0.28;
      for (let i = 0; i < N; i++) {
        const phi = Math.acos(-1 + (2 * i) / N);
        const theta = Math.sqrt(N * Math.PI) * phi;
        neurons.push(new Neuron(
          R * Math.cos(theta) * Math.sin(phi),
          R * Math.sin(phi) * Math.sin(theta),
          R * Math.cos(phi),
        ));
      }
      neurons.forEach((n) => {
        neurons.forEach((o) => {
          if (n !== o && Math.hypot(n.x - o.x, n.y - o.y, n.z - o.z) < 42) {
            n.neighbors.push(o);
          }
        });
      });
    };

    const resizeCanvas = () => {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      init();
    };

    const animate = () => {
      // Read bg from CSS var each frame so it adapts to theme switches
      const isDark = document.documentElement.classList.contains("dark");
      ctx!.fillStyle = isDark ? "rgba(6,13,16,0.18)" : "rgba(248,244,238,0.22)";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      if (Math.random() > 0.985) neurons[Math.floor(Math.random() * neurons.length)]?.fire();
      neurons.forEach((n) => n.update());
      pulses = pulses.filter((p) => !p.update());
      pulses.forEach((p) => p.draw());
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    resizeCanvas();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "transparent" }}
    />
  );
};

export default CosmicSynapseCanvas;
