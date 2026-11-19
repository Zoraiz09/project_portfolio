"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { moreWork, work, type CaseStudy } from "@/lib/content";
import { McpEditorMock, RagChatMock } from "./Mocks";
import { CarouselDots, Reveal, SectionHeading, SwipeHint } from "./ui";

function Visual({ v }: { v: CaseStudy["visual"] }) {
  if (v.type === "mcp") return <McpEditorMock />;
  if (v.type === "rag") return <RagChatMock />;
  return (
    <div className="flex h-full min-h-[200px] flex-col overflow-hidden rounded-[18px] border border-line bg-subtle sm:min-h-[280px] sm:rounded-2xl">
      {/* browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-line bg-surface px-3.5 py-2.5">
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="mx-auto hidden h-5 w-1/2 max-w-[260px] rounded-md bg-subtle sm:block" />
      </div>
      <div className="relative flex-1 overflow-hidden">
        <Image
          src={v.src}
          alt={v.alt}
          fill
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-cover object-left-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
        />
      </div>
    </div>
  );
}

/* ------------------------- Phone: compact cards ------------------------- */

/** Static thumbnail for the MCP editor project (the live mock is too tall for a phone card). */
function MiniMcp() {
  return (
    <div className="flex h-full flex-col bg-[#111114] p-2.5">
      <div className="flex items-center gap-1 pb-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/20" />
        ))}
        <span className="ml-2 font-mono text-[9px] text-white/40">video editor</span>
      </div>
      <div className="grid flex-1 place-items-center rounded-lg bg-black/40">
        <div className="relative h-[78px] w-[46px] rounded-md" style={{ background: "linear-gradient(135deg,#2F4BFF,#7C8CF8 55%,#C7CEFF)" }}>
          <span className="absolute inset-x-1 bottom-1.5 rounded-sm bg-black/60 py-px text-center text-[5px] text-white">Welcome back</span>
        </div>
      </div>
      <div className="mt-2 truncate rounded-md border border-white/10 bg-white/[0.04] px-2 py-1.5 font-mono text-[9.5px] text-white">
        <span className="text-[#8FA0FF]">› </span>Cut the intro, add captions, make it vertical
      </div>
    </div>
  );
}

/** Static thumbnail for the knowledge-assistant project. */
function MiniRag() {
  return (
    <div className="flex h-full flex-col justify-end gap-2 bg-paper p-3 text-[10.5px]">
      <div className="ml-auto max-w-[78%] rounded-xl rounded-br-sm bg-ink px-2.5 py-1.5 text-paper">How often should equipment be inspected?</div>
      <div className="max-w-[86%] rounded-xl rounded-bl-sm border border-line bg-surface px-2.5 py-1.5 leading-snug text-ink/90 shadow-card">
        Every 12 months<sup className="ml-0.5 rounded bg-accent-soft px-0.5 font-mono text-[7px] text-accent">1</sup>, full bundle check every 3 years
        <sup className="ml-0.5 rounded bg-accent-soft px-0.5 font-mono text-[7px] text-accent">2</sup>.
        <div className="mt-1 font-mono text-[8px] text-muted">Source: Maintenance Guide, page 14</div>
      </div>
    </div>
  );
}

function PhoneCard({ c }: { c: CaseStudy; i?: number; total?: number }) {
  const v = c.visual;
  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <div className="relative h-[170px] shrink-0 overflow-hidden border-b border-line bg-subtle">
        {v.type === "image" ? (
          <Image src={v.src} alt={v.alt} fill sizes="320px" className="object-cover object-left-top" />
        ) : v.type === "mcp" ? (
          <MiniMcp />
        ) : (
          <MiniRag />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[12px] font-medium text-accent">{c.tag}</p>
        <h3 className="mt-1.5 line-clamp-2 font-display text-[17px] font-semibold leading-snug tracking-tight">{c.title}</h3>
        <p className="mt-1 text-[12.5px] text-faint">{c.client}</p>
        <p className="mt-3 flex gap-2.5 text-[13px] leading-snug text-ink/80">
          <span className="mt-[7px] h-1 w-2.5 shrink-0 rounded-full bg-accent" />
          <span className="line-clamp-2">{c.highlights[0]}</span>
        </p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {c.stack.slice(0, 3).map((t) => (
            <li key={t} className="rounded-full border border-line px-2 py-0.5 text-[11.5px] text-muted">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
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
        className="group card relative mb-4 grid grid-cols-[minmax(0,1fr)] gap-4 overflow-hidden p-3.5 sm:mb-8 sm:gap-5 sm:p-5 sm:gap-6 sm:p-7 lg:min-h-[520px] lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:p-9"
      >
        <motion.div aria-hidden style={{ opacity: desktop ? dim : 0 }} className="pointer-events-none absolute inset-0 z-10 bg-paper" />
        <div className="flex flex-col px-1.5 pb-1.5 sm:px-0 sm:pb-0">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-accent-soft px-3 py-1 text-[12px] font-medium text-accent">
              {c.tag}
            </span>
          </div>
          <h3 className="mt-3 font-display text-[1.35rem] sm:mt-5 sm:text-[1.7rem] font-semibold leading-[1.1] tracking-tight sm:text-[2.1rem]">
            {c.title}
          </h3>
          <p className="mt-2 text-[14px] text-faint">{c.client}</p>

          <dl className="mt-5 hidden space-y-4 sm:block text-[14.5px] leading-relaxed sm:mt-6 sm:text-[15px]">
            <div className="hidden sm:block">
              <dt className="label">The problem</dt>
              <dd className="mt-1.5 text-muted">{c.problem}</dd>
            </div>
            <div>
              <dt className="label">What we built</dt>
              <dd className="mt-1.5 line-clamp-4 text-muted sm:line-clamp-none">{c.solution}</dd>
            </div>
          </dl>

          <ul className="mt-4 space-y-2 text-[14px] sm:mt-6">
            {c.highlights.map((h, hi) => (
              <li key={h} className={`gap-3 ${hi > 1 ? "hidden sm:flex" : "flex"}`}>
                <span className="mt-[9px] h-1 w-3 shrink-0 rounded-full bg-accent" />
                <span className="text-ink/85">{h}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-auto flex flex-wrap gap-1.5 pt-4 sm:pt-6">
            {c.stack.map((s, si) => (
              <li key={s} className={`${si > 2 ? "hidden sm:block" : ""} rounded-full border border-line px-2.5 py-1 text-[12px] text-muted`}>
                {s}
              </li>
            ))}
          </ul>
        </div>
        {/* Phones/tablets: visual first, like an app card */}
        <div className="order-first lg:order-none">
          <Visual v={c.visual} />
        </div>
      </motion.article>
    </div>
  );
}

export default function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const desktop = useDesktop();
  const moreRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  return (
    <section id="work" className="py-14 sm:py-28">
      <div className="container-site">
        <SectionHeading
          split
          index="02"
          label="Our work"
          title="Real products,"
          italic="real results."
          intro="A few of the things we've built and launched, from AI assistants inside live products to complete business systems."
        />

        {/* Phone: swipeable compact cards */}
        <div className="md:hidden">
          <SwipeHint className="mt-7" />
          <div ref={phoneRef} className="-mx-5 mt-3 flex snap-x snap-mandatory scroll-pl-5 gap-3 overflow-x-auto px-5 pb-2 no-scrollbar">
            {work.map((c, i) => (
              <div key={c.id} className="w-[80vw] max-w-[320px] shrink-0 snap-start">
                <PhoneCard c={c} i={i} total={work.length} />
              </div>
            ))}
          </div>
          <CarouselDots target={phoneRef} count={work.length} />
        </div>

        {/* Tablet & desktop: full case-study cards (sticky stack on desktop) */}
        <div ref={ref} className="relative mt-10 hidden sm:mt-14 md:block">
          {work.map((c, i) => (
            <Card key={c.id} c={c} i={i} total={work.length} progress={scrollYProgress} desktop={desktop} />
          ))}
        </div>

        <Reveal>
          <p className="label mt-10 sm:mt-16">More work</p>
        </Reveal>
        <div ref={moreRef} className="mt-5 -mx-5 flex snap-x snap-mandatory scroll-pl-5 gap-3 overflow-x-auto px-5 pb-3 no-scrollbar sm:-mx-8 sm:scroll-pl-8 sm:px-8 md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0">
          {moreWork.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.08} className="w-[70vw] max-w-[280px] shrink-0 snap-start md:w-auto md:max-w-none">
              <article className="group card h-full overflow-hidden transition-shadow duration-500 hover:shadow-lift">
                <div className="relative h-32 overflow-hidden border-b border-line bg-subtle sm:h-44 md:h-64">
                  {m.img && (
                    <Image
                      src={m.img}
                      alt={m.title}
                      fill
                      sizes="(min-width: 768px) 400px, 100vw"
                      className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-4 sm:p-6">
                  <p className="text-[12px] font-medium text-accent">{m.tag}</p>
                  <h3 className="mt-2 font-display text-lg font-semibold tracking-tight">{m.title}</h3>
                  <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-muted sm:line-clamp-none sm:text-[14px]">{m.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <CarouselDots target={moreRef} count={moreWork.length} />
      </div>
    </section>
  );
}
