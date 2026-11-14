"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import { experience, hero, site } from "@/lib/content";
import { Arrow, Magnetic, ease } from "./ui";

const Robot = dynamic(() => import("./Robot"), { ssr: false });

function Rotator({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    let delay = deleting ? 35 : 70;
    if (!deleting && text === word) delay = 1800;
    if (deleting && text === "") delay = 250;
    const id = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setI((n) => n + 1);
      } else setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(id);
  }, [text, deleting, i, words]);

  return (
    <>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden className="text-ink">
        {text}
        <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.15em] animate-caret bg-accent" />
      </span>
    </>
  );
}

const word = {
  hidden: { y: "110%" },
  show: (i: number) => ({ y: "0%", transition: { duration: 0.9, ease, delay: 0.15 + i * 0.07 } }),
};

export default function Hero() {
  const titleWords = [
    ...hero.titleBefore.split(" ").map((w) => ({ w, italic: false })),
    { w: hero.titleItalic, italic: true },
    ...hero.titleAfter.split(" ").map((w) => ({ w, italic: false })),
  ];

  return (
    <section id="top" className="relative overflow-hidden pt-[68px]">
      {/* Background: faint dot grid fading out at the edges + soft accent glow */}
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-0"
        style={{ maskImage: "radial-gradient(ellipse 70% 60% at 65% 45%, black 20%, transparent 75%)", WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 65% 45%, black 20%, transparent 75%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[10%] h-[520px] w-[520px] rounded-full opacity-60 blur-[110px]"
        style={{ background: "radial-gradient(circle, rgba(47,75,255,0.16), transparent 70%)" }}
      />

      <div className="container-site relative grid min-h-[calc(100svh-68px)] items-center gap-6 py-10 lg:grid-cols-[1.08fr_1fr] lg:gap-4 lg:py-0">
        <div className="relative z-10 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/80 py-1.5 pl-2.5 pr-4 text-[13px] text-muted shadow-card backdrop-blur"
          >
            <span className="h-2 w-2 animate-pulseDot rounded-full bg-green-500" />
            {hero.badge}
          </motion.div>

          <h1 className="mt-7 font-display text-[2.9rem] font-semibold leading-[0.98] tracking-tightest sm:text-[4rem] lg:text-[3.9rem] xl:text-[4.5rem]">
            {titleWords.map(({ w, italic }, i) => (
              <Fragment key={i}>
              <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  custom={i}
                  variants={word}
                  initial="hidden"
                  animate="show"
                  className={`inline-block ${italic ? "pr-[0.06em] font-serif font-normal italic tracking-normal text-accent" : ""}`}
                >
                  {w}
                </motion.span>
                {i < titleWords.length - 1 && !italic && "\u00A0"}
              </span>
              {italic && <br className="hidden sm:block" />}
              {italic && <span className="sm:hidden"> </span>}
              </Fragment>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.75 }}
            className="mt-7 font-mono text-[15px] text-muted sm:text-base"
          >
            <span className="text-faint">{"// "}</span>we build <Rotator words={hero.rotating} />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.85 }}
            className="mt-5 max-w-[34rem] text-[17px] leading-relaxed text-muted"
          >
            {hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.95 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a href={site.calendly || "#contact"} className="btn-primary group">
                Start a project
                <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#work" className="btn-ghost">
                See our work
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:gap-6"
          >
            <span className="label shrink-0">Experience with</span>
            <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[14px] font-medium text-ink/70">
              {experience.slice(0, 3).map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Robot */}
        <div className="relative order-1 h-[340px] sm:h-[440px] lg:order-2 lg:h-[640px]">
          <Robot />
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 1.6 }}
            className="pointer-events-none absolute bottom-6 right-2 hidden items-center gap-2 rounded-full border border-line bg-surface/85 px-3.5 py-2 font-mono text-[11px] text-muted shadow-card backdrop-blur sm:flex lg:bottom-16"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> try clicking me
          </motion.div>
        </div>
      </div>

    </section>
  );
}
