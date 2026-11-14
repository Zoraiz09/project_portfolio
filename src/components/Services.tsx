"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { services, type Service } from "@/lib/content";
import { Reveal, SectionHeading, SpotlightCard, ease } from "./ui";

/* ----------------------------- Visuals ----------------------------- */

function AgentVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const prompt = "Cut the intro, add captions, export 9:16";
  const tools = ["trim_clip(start=0, end=4.2)", "generate_captions(lang='en')", "set_aspect_ratio('9:16')", "export()"];
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
              <span className="text-faint">mcp.</span>
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
      <span className="absolute bottom-1 right-0 rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] text-paper">
        source [1] p.4
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
          <line x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#E7E5E0" strokeWidth="0.8" />
          <circle r="1.6" fill="#2F4BFF">
            <animateMotion
              dur={`${2.2 + i * 0.3}s`}
              repeatCount="indefinite"
              path={`M${nodes[a][0]},${nodes[a][1]} L${nodes[b][0]},${nodes[b][1]}`}
            />
          </circle>
        </g>
      ))}
      {nodes.map(([x, y], i) => (
        <rect key={i} x={x - 7} y={y - 7} width="14" height="14" rx="4" fill="#fff" stroke="#16161A" strokeWidth="0.8" />
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
        {["raw", "embed", "serve"].map((s) => (
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

/* ----------------------------- Section ----------------------------- */

export default function Services() {
  return (
    <section id="services" className="container-site py-20 sm:py-28">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeading
          index="01"
          label="Services"
          title="AI that does real work —"
          italic="and the software"
          after="around it."
          intro="We specialise in production AI, backed by the full-stack engineering it takes to ship it."
        />
      </div>

      <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-6">
        {services.map((s, i) => {
          const V = visuals[s.visual];
          return (
            <Reveal key={s.id} delay={(i % 3) * 0.06} className={spans[s.size]}>
              <SpotlightCard className="card flex h-full flex-col p-6 transition-shadow duration-500 hover:shadow-lift sm:p-7">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[11px] text-faint">0{i + 1}</span>
                  {s.size === "lg" && (
                    <span className="rounded-full bg-accent-soft px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
                      Our specialty
                    </span>
                  )}
                </div>
                <div className={s.size === "lg" ? "mt-6 grid flex-1 grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-center" : "mt-5"}>
                  <div>
                    <h3
                      className={`font-display font-semibold tracking-tight ${
                        s.size === "lg" ? "text-3xl leading-tight sm:text-[2.2rem]" : "text-xl"
                      }`}
                    >
                      {s.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {s.points.map((p) => (
                        <li key={p} className="rounded-full border border-line px-2.5 py-1 text-[12px] text-muted">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {s.size === "lg" && <V />}
                </div>
                {s.size !== "lg" && (
                  <div className="mt-auto pt-6">
                    <V />
                  </div>
                )}
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
