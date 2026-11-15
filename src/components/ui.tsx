"use client";

import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
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
  split,
  className = "",
}: {
  index: string;
  label: string;
  title: string;
  italic?: string;
  after?: string;
  intro?: string;
  light?: boolean;
  /** On large screens, place the intro beside the title instead of under it. */
  split?: boolean;
  className?: string;
}) {
  return (
    <div className={`${split && intro ? "lg:grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end lg:gap-16" : ""} ${className}`}>
      <div>
      <Reveal>
        <p className={`label ${light ? "text-snow/60" : ""}`} data-index={index}>
          {label}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className={`h-section mt-4 sm:mt-5 ${split ? "max-w-5xl" : "max-w-4xl"} ${light ? "text-snow" : ""}`}>
          {title}{" "}
          {italic}
          {after && <> {after}</>}
        </h2>
      </Reveal>
      </div>
      {intro && (
        <Reveal delay={0.1}>
          <p
            className={`mt-4 max-w-xl text-[15.5px] leading-relaxed sm:mt-5 sm:text-[17px] ${split ? "lg:mt-0 lg:pb-2" : ""} ${
              light ? "text-snow/60" : "text-muted"
            }`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/** Kept as a simple wrapper so call sites stay unchanged. */
export function Magnetic({ children }: { children: ReactNode; strength?: number }) {
  return <>{children}</>;
}

/** Plain card wrapper (the cursor spotlight was removed). */
export function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`relative overflow-hidden ${className}`}>{children}</div>;
}

/** Static number (count-up animation removed). */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  return (
    <span className="tabular-nums">
      {to}
      {suffix}
    </span>
  );
}

/** Swipe hint removed; carousels use dot indicators instead. */
export function SwipeHint(_props: { className?: string }) {
  void _props;
  return null;
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
    <span className={`flex items-center gap-2.5 ${light ? "text-snow" : "text-ink"}`}>
      <span className={`grid h-7 w-7 place-items-center rounded-[8px] ${light ? "bg-snow" : "bg-ink"}`}>
        <span className="h-2.5 w-2.5 rounded-[3px] bg-accent" />
      </span>
      <span className="font-display text-[17px] font-semibold tracking-tight">{site.name}</span>
    </span>
  );
}

/** Read/subscribe to the current theme (the `dark` class on <html>). */
export function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const sync = () => setDark(el.classList.contains("dark"));
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(el, { attributes: true, attributeFilter: ["class"] });
    // Follow the OS setting until the visitor picks a theme themselves.
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onOs = (e: MediaQueryListEvent) => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem("theme");
      } catch {}
      if (!saved) el.classList.toggle("dark", e.matches);
    };
    mq.addEventListener("change", onOs);
    return () => {
      mo.disconnect();
      mq.removeEventListener("change", onOs);
    };
  }, []);
  /** Switch theme. With an origin point, the new theme expands in a circle from there. */
  const toggle = (origin?: { x: number; y: number }) => {
    const el = document.documentElement;
    const next = !el.classList.contains("dark");
    const apply = () => {
      el.classList.toggle("dark", next);
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {}
    };

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduced) {
      apply(); // instant switch — no per-element transitions to recalculate
      return;
    }

    const x = origin?.x ?? window.innerWidth - 40;
    const y = origin?.y ?? 34;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    doc.startViewTransition(apply).ready.then(() => {
      el.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 520, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  };
  return { dark, toggle };
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { dark, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        toggle({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className={`relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-line bg-surface text-ink transition-colors duration-300 hover:border-ink ${className}`}
    >
      {/* sun */}
      <svg
        viewBox="0 0 24 24"
        className={`absolute h-[18px] w-[18px] transition-all duration-500 ${dark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      {/* moon */}
      <svg
        viewBox="0 0 24 24"
        className={`absolute h-[17px] w-[17px] transition-all duration-500 ${dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
      </svg>
    </button>
  );
}

/** Dot indicator for a horizontal swipe carousel (phones). Click a dot to jump to that card. */
export function CarouselDots({
  target,
  count,
  className = "md:hidden",
  light,
}: {
  target: React.RefObject<HTMLElement | null>;
  count: number;
  className?: string;
  light?: boolean;
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const el = target.current;
    if (!el) return;
    const on = () => {
      const max = el.scrollWidth - el.clientWidth;
      setI(max > 0 ? Math.round((el.scrollLeft / max) * (count - 1)) : 0);
    };
    on();
    el.addEventListener("scroll", on, { passive: true });
    return () => el.removeEventListener("scroll", on);
  }, [target, count]);
  const go = (n: number) => {
    const el = target.current;
    if (!el) return;
    el.scrollTo({ left: ((el.scrollWidth - el.clientWidth) * n) / Math.max(1, count - 1), behavior: "smooth" });
  };
  return (
    <div className={`mt-4 flex items-center justify-center gap-1.5 ${className}`}>
      {Array.from({ length: count }, (_, n) => (
        <button
          key={n}
          type="button"
          onClick={() => go(n)}
          aria-label={`Go to item ${n + 1} of ${count}`}
          className="grid h-6 place-items-center px-0.5"
        >
          <span
            className={`block h-1.5 rounded-full transition-all duration-300 ${
              n === i ? `w-5 ${light ? "bg-snow" : "bg-ink"}` : `w-1.5 ${light ? "bg-snow/25" : "bg-ink/20"}`
            }`}
          />
        </button>
      ))}
    </div>
  );
}

/** True below the `md` breakpoint (phones). `null` until mounted, so callers can avoid rendering twice. */
export function usePhone() {
  const [phone, setPhone] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setPhone(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return phone;
}
