"use client";

import { motion, useMotionValue, useSpring, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { site } from "@/lib/content";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Fade + rise when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Section heading: mono index label + large title with an optional serif-italic word. */
export function SectionHeading({
  index,
  label,
  title,
  italic,
  after,
  intro,
  light,
  className = "",
}: {
  index: string;
  label: string;
  title: string;
  italic?: string;
  after?: string;
  intro?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <Reveal>
        <p className={`label ${light ? "text-paper/50" : ""}`}>
          {index} — {label}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className={`h-section mt-5 max-w-3xl ${light ? "text-paper" : ""}`}>
          {title}{" "}
          {italic && <span className="font-serif font-normal italic tracking-normal">{italic}</span>}
          {after && <> {after}</>}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className={`mt-5 max-w-xl text-[17px] leading-relaxed ${light ? "text-paper/60" : "text-muted"}`}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/** Button/link that leans slightly toward the cursor. */
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy, display: "inline-flex" }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/** Card with a soft spotlight that follows the cursor. */
export function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        ref.current!.style.setProperty("--mx", `${e.clientX - r.left}px`);
        ref.current!.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={`group relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(47,75,255,0.07), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}

/** Number that counts up when visible. */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease, onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {val}
      {suffix}
    </span>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={`h-4 w-4 ${className}`} aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Placeholder brand mark until the studio has a logo. */
export function Logo({ light }: { light?: boolean }) {
  return (
    <span className={`flex items-center gap-2.5 ${light ? "text-paper" : "text-ink"}`}>
      <span className={`grid h-7 w-7 place-items-center rounded-[8px] ${light ? "bg-paper" : "bg-ink"}`}>
        <span className="h-2.5 w-2.5 rounded-[3px] bg-accent" />
      </span>
      <span className="font-display text-[17px] font-semibold tracking-tight">{site.name}</span>
    </span>
  );
}
