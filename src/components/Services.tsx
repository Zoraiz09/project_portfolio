"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { services, type Service } from "@/lib/content";
import { Arrow, Reveal, SectionHeading, SpotlightCard, ease } from "./ui";

/* ----------------------------- Visuals ----------------------------- */

function AgentVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const prompt = "Cut the intro, add subtitles, make it vertical";
  const tools = ["Cutting the intro", "Adding subtitles", "Making it vertical", "Saving your video"];
  const [typed, setTyped] = useState(0);
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      if (cancelled) return;
      setTyped(0);
      setStep(-1);
      for (let i = 1; i <= prompt.length; i++) timers.push(setTimeout(() => setTyped(i), 400 + i * 38));
      const t0 = 400 + prompt.length * 38 + 500;
      tools.forEach((_, i) => timers.push(setTimeout(() => setStep(i), t0 + i * 650)));
      timers.push(setTimeout(run, t0 + tools.length * 650 + 2600));
    };
    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div ref={ref} className="rounded-2xl border border-line bg-paper p-4 font-mono text-[12px] sm:p-5 sm:text-[13px]">
      <div className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3.5 py-3 shadow-card">
        <span className="text-accent">›</span>
        <span className="min-w-0 truncate text-ink">
          {prompt.slice(0, typed)}
          <span className="ml-px inline-block h-[1em] w-[1.5px] translate-y-[2px] animate-caret bg-ink" />
        </span>
      </div>
      <ul className="mt-3 space-y-2">
        {tools.map((t, i) => (
          <motion.li
            key={t}
            initial={false}
            animate={{ opacity: step >= i ? 1 : 0.25, x: step >= i ? 0 : -4 }}
            transition={{ duration: 0.4, ease }}
            className="flex items-center justify-between gap-3 rounded-lg px-3 py-1.5"
          >
            <span className="truncate">
              <span className="text-ink">{t}</span>
            </span>
            <span
              className={`grid h-4 w-4 shrink-0 place-items-center rounded-full text-[9px] transition-colors duration-300 ${
                step >= i ? "bg-accent text-white" : "border border-line"
              }`}
            >
              {step >= i ? "✓" : ""}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function RagVisual() {
  return (
    <div className="relative h-28">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute left-0 top-0 h-24 w-[70%] rounded-xl border border-line bg-surface p-3 shadow-card transition-transform duration-700 ease-out group-hover:[--shift:var(--dx)]"
          style={{
            transform: `translate(calc(${i * 14}px + var(--shift, 0px)), ${i * 8}px)`,
            ["--dx" as string]: `${i * 26}px`,
            zIndex: 3 - i,
          }}
        >
          {[80, 92, 60, 74].map((w, j) => (
            <div
              key={j}
              className={`mb-1.5 h-1.5 rounded-full ${i === 0 && j === 1 ? "bg-accent/70" : "bg-line"}`}
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      ))}
      <span className="absolute bottom-1 right-0 z-10 rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] text-paper">
        Source: page 4
      </span>
    </div>
  );
}

function SaasVisual() {
  const bars = [38, 54, 46, 70, 62, 84, 96];
  return (
    <div className="flex h-28 items-end gap-2 rounded-xl border border-line bg-surface p-3">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 6 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease, delay: 0.1 + i * 0.07 }}
          className={`flex-1 rounded-md ${i === bars.length - 1 ? "bg-accent" : "bg-subtle"}`}
        />
      ))}
    </div>
  );
}

function BackendVisual() {
  const nodes = [
    [12, 50],
    [50, 18],
    [50, 82],
    [88, 50],
  ];
  return (
    <svg viewBox="0 0 100 100" className="h-28 w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
      {[
        [0, 1],
        [0, 2],
        [1, 3],
        [2, 3],
      ].map(([a, b], i) => (
        <g key={i}>
          <line x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} className="stroke-line" strokeWidth="0.8" />
          <circle r="1.6" className="fill-accent">
            <animateMotion
              dur={`${2.2 + i * 0.3}s`}
              repeatCount="indefinite"
              path={`M${nodes[a][0]},${nodes[a][1]} L${nodes[b][0]},${nodes[b][1]}`}
            />
          </circle>
        </g>
      ))}
      {nodes.map(([x, y], i) => (
        <rect key={i} x={x - 7} y={y - 7} width="14" height="14" rx="4" className="fill-surface stroke-ink" strokeWidth="0.8" />
      ))}
    </svg>
  );
}

function PipelineVisual() {
  return (
    <div className="relative flex h-28 items-center">
      <div className="absolute inset-x-2 top-1/2 h-px bg-line" />
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent"
          animate={{ left: ["4%", "94%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i, ease: "linear" }}
        />
      ))}
      <div className="relative flex w-full justify-between">
        {["collect", "tidy", "use"].map((s) => (
          <span key={s} className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-[10px] text-muted">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function UiVisual() {
  return (
    <div className="flex h-28 flex-col justify-center gap-3 rounded-xl border border-line bg-surface p-4">
      <div className="flex items-center justify-between">
        <div className="h-2 w-20 rounded-full bg-subtle" />
        <div className="relative h-5 w-9 rounded-full bg-subtle transition-colors duration-500 group-hover:bg-accent">
          <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-500 group-hover:translate-x-4" />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-7 flex-1 rounded-lg bg-ink transition-all duration-500 group-hover:flex-[1.4]" />
        <div className="h-7 flex-1 rounded-lg border border-line" />
      </div>
    </div>
  );
}

const visuals: Record<Service["visual"], () => React.JSX.Element> = {
  agent: AgentVisual,
  rag: RagVisual,
  saas: SaasVisual,
  backend: BackendVisual,
  pipeline: PipelineVisual,
  ui: UiVisual,
};

const spans: Record<Service["size"], string> = {
  lg: "md:col-span-6 lg:col-span-4 lg:row-span-2",
  md: "md:col-span-3 lg:col-span-2",
  sm: "md:col-span-2 lg:col-span-2",
};

/* Small line icons used by the phone tiles */
const icons: Record<Service["visual"], React.JSX.Element> = {
  agent: <path d="M12 3v3M7 8h10a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-5a3 3 0 0 1 3-3ZM9.5 13v1M14.5 13v1" />,
  rag: <path d="M6 4h9l3 3v13H6zM9 10h6M9 13h6M9 16h4" />,
  saas: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  backend: <path d="M5 4h14v6H5zM5 14h14v6H5zM8 7h.01M8 17h.01" />,
  pipeline: <path d="M3 12h4l3-6 4 12 3-6h4" />,
  ui: <path d="M4 5h16v14H4zM4 9h16M8 13h5M8 16h8" />,
};

/* ----------------------------- Details modal ----------------------------- */

function ServiceDetails({ s, onClose }: { s: Service; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("lenis-stopped");
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.documentElement.classList.remove("lenis-stopped");
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`svc-${s.id}-title`}
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.4, ease }}
        className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-t-3xl border border-line bg-paper p-6 shadow-card sm:rounded-3xl sm:p-9"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-ink hover:text-ink sm:right-6 sm:top-6"
        >
          <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden>
            <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="flex items-center gap-3 pr-12">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              {icons[s.visual]}
            </svg>
          </span>
          <span className="label">In plain English</span>
        </div>
        <h3 id={`svc-${s.id}-title`} className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {s.title}
        </h3>
        <p className="mt-4 text-[15.5px] leading-relaxed text-ink/85 sm:text-[16.5px]">{s.details.simple}</p>

        <div className="mt-7">
          <h4 className="font-display text-[15px] font-semibold">What it looks like in real life</h4>
          <ul className="mt-3 space-y-2.5">
            {s.details.examples.map((ex) => (
              <li key={ex} className="flex gap-3 text-[14.5px] leading-relaxed text-muted">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {ex}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-7 rounded-2xl border border-line bg-surface p-5">
          <h4 className="font-display text-[15px] font-semibold">What you get</h4>
          <ul className="mt-3 space-y-2">
            {s.details.youGet.map((g) => (
              <li key={g} className="flex gap-3 text-[14.5px] leading-relaxed text-muted">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-[10px] text-white">✓</span>
                {g}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-[14.5px] leading-relaxed text-muted">
          <span className="font-semibold text-ink">A good fit for: </span>
          {s.details.goodFit}
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#contact"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-[14px] font-medium text-paper transition-opacity hover:opacity-90"
          >
            Talk to us about this <Arrow />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Phone: one compact, expandable list instead of big cards. */
function ServiceList({ onDetails }: { onDetails: (s: Service) => void }) {
  const [open, setOpen] = useState<string | null>(services[0].id);
  return (
    <div className="card mt-8 divide-y divide-line overflow-hidden p-0 md:hidden">
      {services.map((s) => {
        const isOpen = open === s.id;
        const featured = s.size === "lg";
        return (
          <div key={s.id} className={featured ? "bg-accent-soft/40" : ""}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : s.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-3.5 px-4 py-3.5 text-left"
            >
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${
                  isOpen ? "bg-accent text-white" : "bg-accent-soft text-accent"
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  {icons[s.visual]}
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="truncate font-display text-[15.5px] font-semibold tracking-tight">{s.title}</span>
                </span>
                <span className="mt-0.5 block truncate text-[12.5px] text-muted">
                  {featured ? "Our specialty · " : ""}
                  {s.points.slice(0, 3).join(" · ")}
                </span>
              </span>
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                  isOpen ? "rotate-45 border-ink bg-ink text-paper" : "border-line text-muted"
                }`}
                aria-hidden
              >
                <svg viewBox="0 0 12 12" className="h-2.5 w-2.5">
                  <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 pl-[4.25rem] pr-4">
                    <p className="text-[13.5px] leading-relaxed text-muted">{s.details.simple}</p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {s.points.map((pt) => (
                        <li key={pt} className="rounded-full border border-line bg-surface px-2.5 py-1 text-[11.5px] text-muted">
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => onDetails(s)}
                      className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent"
                    >
                      See examples &amp; what you get <Arrow className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ----------------------------- Section ----------------------------- */

function ServiceCard({ s, onDetails }: { s: Service; onDetails: (s: Service) => void }) {
  const V = visuals[s.visual];
  const lg = s.size === "lg";
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Learn more about ${s.title}`}
      onClick={() => onDetails(s)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onDetails(s);
        }
      }}
      className="group/card h-full cursor-pointer rounded-[inherit] outline-none transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-accent"
    >
    <SpotlightCard className="card flex h-full flex-col p-5 sm:p-7">
      <div className={lg ? "flex items-start justify-between" : "hidden"}>
        {lg && <span className="rounded-full bg-accent-soft px-3 py-1 text-[12px] font-medium text-accent">Our specialty</span>}
      </div>
      <div className={lg ? "mt-4 grid flex-1 grid-cols-[minmax(0,1fr)] gap-6 sm:mt-6 sm:gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-stretch" : "mt-4 sm:mt-5"}>
        <div className={lg ? "flex flex-col lg:justify-between lg:py-2" : ""}>
          <div>
            <h3 className={`font-display font-semibold tracking-tight ${lg ? "text-[1.6rem] leading-tight sm:text-[2.2rem]" : "text-lg sm:text-xl"}`}>
              {s.title}
            </h3>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted sm:mt-3 sm:text-[15px]">{s.body}</p>
          </div>
          <ul className="mt-4 flex flex-wrap gap-1.5 sm:mt-5">
            {s.points.map((p) => (
              <li key={p} className="rounded-full border border-line px-2.5 py-1 text-[12px] text-muted">
                {p}
              </li>
            ))}
          </ul>
        </div>
        {lg && (
          <div className="flex flex-col justify-center">
            <V />
          </div>
        )}
      </div>
      {!lg && (
        <div className="mt-auto pt-5 sm:pt-6">
          <V />
        </div>
      )}
      <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent">
        Learn more <Arrow className="h-3.5 w-3.5 transition-transform duration-300 group-hover/card:translate-x-1" />
      </span>
    </SpotlightCard>
    </div>
  );
}

export default function Services() {
  const [active, setActive] = useState<Service | null>(null);
  const close = useCallback(() => setActive(null), []);
  const featured = services.filter((s) => s.size === "lg");
  const rest = services.filter((s) => s.size !== "lg");
  return (
    <section id="services" className="container-site py-14 sm:py-28">
      <SectionHeading
        split
        index="01"
        label="Services"
        title="Smart software"
        italic="that saves you"
        after="time."
        intro="From AI assistants to websites and apps, we build it all. Click any service to see what it means for your business."
      />

      <Reveal>
        <ServiceList onDetails={setActive} />
      </Reveal>

      <div className="mt-14 hidden md:grid md:grid-cols-6 md:gap-4">
        {featured.map((s) => (
          <Reveal key={s.id} className={spans[s.size]}>
            <ServiceCard s={s} onDetails={setActive} />
          </Reveal>
        ))}
        {/* md+: these cards join the bento grid */}
        <div className="hidden md:contents">
          {rest.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.06} className={spans[s.size]}>
              <ServiceCard s={s} onDetails={setActive} />
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>{active && <ServiceDetails key={active.id} s={active} onClose={close} />}</AnimatePresence>
    </section>
  );
}
