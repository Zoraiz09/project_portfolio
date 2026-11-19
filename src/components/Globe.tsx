"use client";

import { useEffect, useRef } from "react";

type LatLon = [number, number];
const HOME: LatLon = [25.2, 55.3]; // Dubai, UAE
const CLIENTS: { name: string; at: LatLon }[] = [
  { name: "New York", at: [40.7, -74] },
  { name: "London", at: [51.5, -0.1] },
  { name: "Berlin", at: [52.5, 13.4] },
  { name: "Singapore", at: [1.35, 103.8] },
  { name: "Riyadh", at: [24.7, 46.7] },
];

const rad = Math.PI / 180;
function toVec([lat, lon]: LatLon): [number, number, number] {
  const la = lat * rad;
  const lo = lon * rad;
  return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)];
}
function slerp(a: number[], b: number[], t: number) {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const o = Math.acos(dot);
  if (o < 1e-6) return a;
  const s = Math.sin(o);
  const k1 = Math.sin((1 - t) * o) / s;
  const k2 = Math.sin(t * o) / s;
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
}

/** Minimal dotted globe with animated arcs. Canvas 2D, paused off-screen. */
export default function Globe() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Fibonacci sphere points
    const N = 1400;
    const pts: number[][] = [];
    const g = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      pts.push([Math.cos(g * i) * r, y, Math.sin(g * i) * r]);
    }
    const home = toVec(HOME);
    const arcs = CLIENTS.map((c) => {
      const b = toVec(c.at);
      return Array.from({ length: 48 }, (_, i) => {
        const t = i / 47;
        const p = slerp(home, b, t);
        const lift = 1 + Math.sin(Math.PI * t) * 0.18;
        return [p[0] * lift, p[1] * lift, p[2] * lift];
      });
    });

    let w = 0;
    let h = 0;
    let dpr = 1;
    const resize = () => {
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      const d = Math.min(window.devicePixelRatio || 1, 2);
      if (cw === w && ch === h && d === dpr) return;
      w = cw;
      h = ch;
      dpr = d;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };

    // Sway between the US and the UAE so every arc stays mostly in view.
    let rotY = -35 * rad;
    let swayT = 0;
    const tilt = 24 * rad;
    let visible = true;
    let raf = 0;
    let t0 = performance.now();

    // Theme colours, re-read only when the theme class changes (not every frame).
    const colors = { ink: "22,22,26", acc: "47,75,255" };
    const readColors = () => {
      const css = getComputedStyle(document.documentElement);
      colors.ink = css.getPropertyValue("--ink").trim().replace(/ /g, ",") || colors.ink;
      colors.acc = css.getPropertyValue("--accent").trim().replace(/ /g, ",") || colors.acc;
    };
    readColors();
    const themeObserver = new MutationObserver(readColors);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const project = (v: number[]) => {
      // rotate Y
      const x1 = v[0] * Math.cos(rotY) + v[2] * Math.sin(rotY);
      const z1 = -v[0] * Math.sin(rotY) + v[2] * Math.cos(rotY);
      // tilt X
      const y2 = v[1] * Math.cos(tilt) - z1 * Math.sin(tilt);
      const z2 = v[1] * Math.sin(tilt) + z1 * Math.cos(tilt);
      return [x1, y2, z2];
    };

    const draw = (now: number) => {
      const dt = Math.min(64, now - t0);
      t0 = now;
      resize();
      if (!reduced) {
        swayT += dt * 0.00018;
        rotY = (-35 + Math.sin(swayT) * 38) * rad;
      }
      const R = Math.min(w, h) * 0.42;
      const cx = w / 2;
      const cy = h / 2;
      const { ink, acc } = colors;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // outline
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${ink},0.1)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // dots
      for (const p of pts) {
        const [x, y, z] = project(p);
        if (z < -0.1) continue;
        const a = 0.08 + Math.max(0, z) * 0.32;
        ctx.fillStyle = `rgba(${ink},${a})`;
        ctx.fillRect(cx + x * R - 0.8, cy - y * R - 0.8, 1.6, 1.6);
      }

      // arcs
      const phase = reduced ? 1 : ((now / 2600) % 1.4) / 1.0;
      arcs.forEach((arc, ai) => {
        const local = Math.min(1, Math.max(0, phase - ai * 0.06));
        const upto = Math.floor(local * (arc.length - 1));
        ctx.beginPath();
        let started = false;
        for (let i = 0; i <= upto; i++) {
          const [x, y, z] = project(arc[i]);
          if (z < 0) {
            started = false;
            continue;
          }
          const sx = cx + x * R;
          const sy = cy - y * R;
          if (!started) {
            ctx.moveTo(sx, sy);
            started = true;
          } else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = `rgba(${acc},0.8)`;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        const end = project(arc[arc.length - 1]);
        if (end[2] > 0 && local >= 1) {
          ctx.beginPath();
          ctx.arc(cx + end[0] * R, cy - end[1] * R, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${acc})`;
          ctx.fill();
        }
      });

      // home marker with pulse
      const hp = project(home);
      if (hp[2] > 0) {
        const pulse = reduced ? 0 : (now / 1400) % 1;
        ctx.beginPath();
        ctx.arc(cx + hp[0] * R, cy - hp[1] * R, 4 + pulse * 12, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ink},${0.18 * (1 - pulse)})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx + hp[0] * R, cy - hp[1] * R, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${ink})`;
        ctx.fill();
      }

      if (visible) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) {
        t0 = performance.now();
        raf = requestAnimationFrame(draw);
      }
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 block h-full w-full"
      role="img"
      aria-label="Globe showing connections from the UAE to clients in the US, Europe and the Middle East"
    />
  );
}
