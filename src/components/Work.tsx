"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { moreWork, work, type CaseStudy } from "@/lib/content";
import { McpEditorMock, RagChatMock } from "./Mocks";
import { Reveal, SectionHeading } from "./ui";

function Visual({ v }: { v: CaseStudy["visual"] }) {
  if (v.type === "mcp") return <McpEditorMock />;
  if (v.type === "rag") return <RagChatMock />;
  return (
    <div className="relative h-full min-h-[260px] overflow-hidden rounded-2xl border border-line bg-subtle">
      <Image
        src={v.src}
        alt={v.alt}
        fill
        sizes="(min-width: 1024px) 600px, 100vw"
        className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
      />
    </div>
  );
}

function useDesktop() {
  const [d, setD] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setD(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return d;
}

function Card({
  c,
  i,
  total,
  progress,
  desktop,
}: {
  c: CaseStudy;
  i: number;
  total: number;
  progress: MotionValue<number>;
  desktop: boolean;
}) {
  // Each card shrinks slightly as later cards stack on top of it.
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - i - 1) * 0.035]);
  const dim = useTransform(progress, [i / total, Math.min(1, (i + 1) / total)], [0, i === total - 1 ? 0 : 0.35]);

  return (
    <div className="lg:sticky" style={{ top: `calc(88px + ${i * 14}px)` }}>
      <motion.article
        style={desktop ? { scale, transformOrigin: "top center" } : undefined}
        className="group card relative mb-8 grid grid-cols-[minmax(0,1fr)] gap-6 overflow-hidden p-5 sm:p-7 lg:min-h-[520px] lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:p-9"
      >
        <motion.div aria-hidden style={{ opacity: desktop ? dim : 0 }} className="pointer-events-none absolute inset-0 z-10 bg-paper" />
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-faint">
              {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span className="rounded-full bg-accent-soft px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
              {c.tag}
            </span>
          </div>
          <h3 className="mt-5 font-display text-[1.7rem] font-semibold leading-[1.1] tracking-tight sm:text-[2.1rem]">
            {c.title}
          </h3>
          <p className="mt-2 text-[14px] text-faint">{c.client}</p>

          <dl className="mt-6 space-y-4 text-[15px] leading-relaxed">
            <div>
              <dt className="label">Challenge</dt>
              <dd className="mt-1.5 text-muted">{c.problem}</dd>
            </div>
            <div>
              <dt className="label">What we built</dt>
              <dd className="mt-1.5 text-muted">{c.solution}</dd>
            </div>
          </dl>

          <ul className="mt-6 space-y-2 text-[14px]">
            {c.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span className="mt-[9px] h-1 w-3 shrink-0 rounded-full bg-accent" />
                <span className="text-ink/85">{h}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
            {c.stack.map((s) => (
              <li key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
                {s}
              </li>
            ))}
          </ul>
        </div>
        <Visual v={c.visual} />
      </motion.article>
    </div>
  );
}

export default function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const desktop = useDesktop();

  return (
    <section id="work" className="py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading
          index="02"
          label="Selected work"
          title="Built for production,"
          italic="not for demos."
          intro="A few systems we've designed and shipped — from agentic AI inside a live product to enterprise knowledge assistants."
        />

        <div ref={ref} className="mt-14">
          {work.map((c, i) => (
            <Card key={c.id} c={c} i={i} total={work.length} progress={scrollYProgress} desktop={desktop} />
          ))}
        </div>

        <Reveal>
          <p className="label mt-16">More work</p>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {moreWork.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.08}>
              <article className="group card h-full overflow-hidden transition-shadow duration-500 hover:shadow-lift">
                <div className="relative h-44 overflow-hidden border-b border-line bg-subtle">
                  {m.img ? (
                    <Image
                      src={m.img}
                      alt={m.title}
                      fill
                      sizes="(min-width: 768px) 400px, 100vw"
                      className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="dot-grid grid h-full place-items-center">
                      <span className="font-display text-2xl font-semibold tracking-tight text-ink/30">{m.title}</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-accent">{m.tag}</p>
                  <h3 className="mt-2 font-display text-lg font-semibold tracking-tight">{m.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{m.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
