"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { CarouselDots } from "./ui";
import { aiPipeline, process } from "@/lib/content";
import { Reveal, SectionHeading } from "./ui";

/* ------------------------- How we build AI -------------------------- */

export function AIPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [active, setActive] = useState(-1);
  const n = aiPipeline.steps.length;
  const principlesRef = useRef<HTMLDivElement>(null);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.floor(v * (n - 0.01))));

  return (
    <section id="approach" className="border-y border-line bg-surface py-14 sm:py-28">
      <div className="container-site">
        <SectionHeading
          split
          index="03"
          label="How we build AI"
          title="AI you can"
          italic="actually"
          after="trust."
          intro="The AI itself is the easy part. What matters is feeding it the right information, connecting it to your tools and adding safety checks, so it gives answers your customers can rely on."
        />

        {/* Pipeline */}
        <div ref={ref} className="relative mt-12 sm:mt-16">
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
          <ol className="relative grid gap-5 sm:gap-10 lg:grid-cols-5 lg:gap-6">
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
                  <h3
                    className={`mt-0.5 font-display text-lg font-semibold sm:mt-1 sm:text-2xl tracking-tight transition-colors duration-500 ${
                      i <= active ? "text-ink" : "text-faint"
                    }`}
                  >
                    {s.k}
                  </h3>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-muted sm:mt-2 sm:text-[14px]">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Principles */}
        <Reveal>
        <div ref={principlesRef} className="-mx-5 mt-12 flex snap-x snap-mandatory scroll-pl-5 gap-3 overflow-x-auto px-5 pb-2 no-scrollbar sm:mx-0 sm:mt-20 sm:grid sm:grid-cols-2 sm:gap-px sm:overflow-hidden sm:rounded-[22px] sm:border sm:border-line sm:bg-line sm:px-0 sm:pb-0 lg:grid-cols-4">
          {aiPipeline.principles.map((p, i) => (
              <div key={p.t} className="h-full w-[78vw] max-w-[300px] shrink-0 snap-start rounded-[20px] border border-line bg-surface p-5 transition-colors duration-500 hover:bg-paper sm:w-auto sm:max-w-none sm:rounded-none sm:border-0 sm:p-7">
                <span className="text-[13px] font-medium text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-lg font-semibold tracking-tight sm:mt-4">{p.t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{p.d}</p>
              </div>
          ))}
        </div>
        <CarouselDots target={principlesRef} count={aiPipeline.principles.length} className="sm:hidden" />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ Process ----------------------------- */

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const [reached, setReached] = useState(-1);
  useMotionValueEvent(scrollYProgress, "change", (v) => setReached(v <= 0 ? -1 : Math.floor(v * (process.length - 1) + 0.15)));

  return (
    <section id="process" className="container-site py-14 sm:py-28">
      <div className="grid gap-10 sm:gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            index="04"
            label="Process"
            title="Simple steps,"
            italic="no surprises."
            intro="A clear plan, progress you can see every week, and one person to talk to who is actually building your product. You always know where things stand."
          />
        </div>

        <ol ref={ref} className="relative">
          <div className="absolute bottom-3 left-[15px] top-3 w-px bg-line" />
          <motion.div style={{ scaleY: scrollYProgress }} className="absolute bottom-3 left-[15px] top-3 w-px origin-top bg-ink" />
          {process.map((p, i) => (
            <Reveal key={p.t} delay={0.05} className="relative pb-6 pl-12 last:pb-0 sm:pb-12 sm:pl-14">
              <span
                className={`absolute left-0 top-0 grid h-[31px] w-[31px] place-items-center rounded-full border text-[12px] font-medium transition-all duration-500 ${
                  i <= reached ? "scale-110 border-ink bg-ink text-paper" : "border-line bg-paper text-ink"
                }`}
              >
                {i + 1}
              </span>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-semibold tracking-tight sm:text-2xl">{p.t}</h3>
                <span className="text-[13px] text-muted">{p.time}</span>
              </div>
              <p className="mt-1.5 max-w-md text-[14.5px] leading-relaxed text-muted sm:mt-2 sm:text-[15px]">{p.d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
