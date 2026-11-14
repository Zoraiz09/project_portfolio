"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { aiPipeline, process } from "@/lib/content";
import { Reveal, SectionHeading } from "./ui";

/* ------------------------- How we build AI -------------------------- */

export function AIPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [active, setActive] = useState(-1);
  const n = aiPipeline.steps.length;
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.floor(v * (n - 0.01))));

  return (
    <section id="approach" className="border-y border-line bg-surface py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading
          index="03"
          label="How we build AI"
          title="Reliable AI is an"
          italic="engineering"
          after="problem."
          intro="Models are the easy part. We engineer everything around them — data, retrieval, tools, guardrails — so the result is something your users can depend on."
        />

        {/* Pipeline */}
        <div ref={ref} className="relative mt-16">
          {/* line (horizontal on desktop, vertical on mobile) */}
          <div className="absolute left-[11px] top-2 h-[calc(100%-16px)] w-px bg-line lg:left-0 lg:top-[11px] lg:h-px lg:w-full" />
          <motion.div
            style={{ scaleY: fill }}
            className="absolute left-[11px] top-2 h-[calc(100%-16px)] w-px origin-top bg-accent lg:hidden"
          />
          <motion.div
            style={{ scaleX: fill }}
            className="absolute left-0 top-[11px] hidden h-px w-full origin-left bg-accent lg:block"
          />
          <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
            {aiPipeline.steps.map((s, i) => (
              <li key={s.k} className="flex gap-5 lg:block">
                <span
                  className={`relative z-10 grid h-[23px] w-[23px] shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                    i <= active ? "border-accent bg-accent" : "border-line bg-surface"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${i <= active ? "bg-white" : "bg-line"}`} />
                </span>
                <div className="lg:mt-6">
                  <p className="font-mono text-[11px] text-faint">0{i + 1}</p>
                  <h3
                    className={`mt-1 font-display text-2xl font-semibold tracking-tight transition-colors duration-500 ${
                      i <= active ? "text-ink" : "text-faint"
                    }`}
                  >
                    {s.k}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Principles */}
        <Reveal>
        <div className="mt-20 grid gap-px overflow-hidden rounded-[22px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {aiPipeline.principles.map((p, i) => (
              <div key={p.t} className="h-full bg-surface p-7 transition-colors duration-500 hover:bg-paper">
                <span className="font-serif text-3xl italic text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">{p.t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{p.d}</p>
              </div>
          ))}
        </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ Process ----------------------------- */

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });

  return (
    <section id="process" className="container-site py-20 sm:py-28">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            index="04"
            label="Process"
            title="A process built on"
            italic="no surprises."
            intro="Clear milestones, weekly demos and one point of contact who actually writes the code. You always know where your project stands."
          />
        </div>

        <ol ref={ref} className="relative">
          <div className="absolute bottom-3 left-[15px] top-3 w-px bg-line" />
          <motion.div style={{ scaleY: scrollYProgress }} className="absolute bottom-3 left-[15px] top-3 w-px origin-top bg-ink" />
          {process.map((p, i) => (
            <Reveal key={p.t} delay={0.05} className="relative pb-12 pl-14 last:pb-0">
              <span className="absolute left-0 top-0 grid h-[31px] w-[31px] place-items-center rounded-full border border-line bg-paper font-mono text-[11px] text-ink">
                {i + 1}
              </span>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl font-semibold tracking-tight">{p.t}</h3>
                <span className="font-mono text-[11px] uppercase tracking-wider text-faint">{p.time}</span>
              </div>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">{p.d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
