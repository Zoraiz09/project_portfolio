"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Component, Fragment, useEffect, useState, type ReactNode } from "react";
import { experience, hero, site } from "@/lib/content";
import { Arrow, Magnetic, ease, usePhone } from "./ui";

const Robot = dynamic(() => import("./Robot"), { ssr: false });

/** True if the browser can create a WebGL context (false on some old phones, battery-saver and privacy modes). */
function canUseWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Shows the fallback if the 3D scene throws (e.g. the GPU context is lost). */
class RobotBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/** Flat illustration of the robot, used when 3D isn't available. */
function RobotFallback() {
  return (
    <div className="grid h-full w-full place-items-center" role="img" aria-label="Studio robot mascot">
      <motion.svg
        viewBox="0 0 200 220"
        className="h-[78%] w-auto drop-shadow-[0_24px_30px_rgb(var(--shadow)/0.18)]"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        <line x1="100" y1="22" x2="100" y2="44" className="stroke-faint" strokeWidth="4" strokeLinecap="round" />
        <circle cx="100" cy="18" r="8" className="fill-accent" />
        <rect x="42" y="42" width="116" height="86" rx="30" className="fill-surface stroke-line" strokeWidth="2" />
        <rect x="56" y="60" width="80" height="52" rx="18" className="fill-night" />
        <rect x="76" y="74" width="10" height="22" rx="5" className="fill-accent" />
        <rect x="104" y="74" width="10" height="22" rx="5" className="fill-accent" />
        <circle cx="148" cy="85" r="10" className="fill-subtle stroke-line" strokeWidth="2" />
        <rect x="58" y="136" width="84" height="66" rx="24" className="fill-surface stroke-line" strokeWidth="2" />
        <rect x="78" y="154" width="44" height="22" rx="7" className="fill-night" />
        {[86, 96, 106].map((x) => (
          <rect key={x} x={x} y="159" width="5" height="12" rx="2" className="fill-accent" />
        ))}
        <rect x="36" y="142" width="16" height="44" rx="8" className="fill-surface stroke-line" strokeWidth="2" />
        <rect x="148" y="142" width="16" height="44" rx="8" className="fill-surface stroke-line" strokeWidth="2" />
      </motion.svg>
    </div>
  );
}

function HeroVisual() {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  useEffect(() => setWebgl(canUseWebGL()), []);
  if (webgl === null) return null;
  if (!webgl) return <RobotFallback />;
  return (
    <RobotBoundary fallback={<RobotFallback />}>
      <Robot />
    </RobotBoundary>
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

  // One robot canvas only: small beside the headline on phones, large column on tablet/desktop.
  const phone = usePhone();
  // Phones get a poster-style headline: "We build / intelligent / software / that ships."
  const breakAfter = (w: string, italic: boolean) => italic || w === hero.titleBefore.split(" ").at(-1) || w === hero.titleAfter.split(" ")[0];

  return (
    <section id="top" className="relative overflow-hidden pt-[60px] md:pt-[68px]">
      <div className="container-site relative grid items-center pb-10 pt-6 sm:py-12 lg:min-h-[calc(100svh-68px)] lg:grid-cols-[1.2fr_1fr] lg:content-center lg:gap-x-4 lg:py-0">
        <div className="relative z-10 order-1 lg:col-start-1 lg:row-start-1">
          {/* Phone: small robot peeking in at the top-right, beside the first lines of the headline */}
          {phone && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease, delay: 0.5 }}
              className="absolute -right-4 -top-3 z-0 h-[168px] w-[150px]"
            >
              <HeroVisual />
            </motion.div>
          )}
          <h1 className="pointer-events-none relative z-10 mt-2 font-display text-[3.1rem] font-bold leading-[0.95] tracking-tightest sm:mt-0 sm:text-[4rem] md:pointer-events-auto lg:text-[4rem] xl:text-[4.6rem] 2xl:text-[5.2rem]">
            {titleWords.map(({ w, italic }, i) => (
              <Fragment key={i}>
              <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  custom={i}
                  variants={word}
                  initial="hidden"
                  animate="show"
                  className="inline-block"
                >
                  {w}
                </motion.span>
                {i < titleWords.length - 1 && "\u00A0"}
              </span>
              {breakAfter(w, italic) && <br className={italic ? "" : "md:hidden"} />}
              </Fragment>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.85 }}
            className="mt-6 max-w-[36rem] text-[15px] leading-relaxed text-muted sm:mt-8 sm:text-[17px]"
          >
            {hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.95 }}
            className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-9 sm:flex sm:flex-wrap sm:items-center sm:gap-3"
          >
            <Magnetic>
              <a href={site.calendly || "#contact"} className="btn-primary group w-full justify-center !px-4 sm:w-auto sm:!px-6">
                Start a project
                <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#work" className="btn-ghost w-full justify-center !px-4 sm:w-auto sm:!px-6">
                See our work
              </a>
            </Magnetic>
          </motion.div>

        </div>

        {/* Robot */}
        <div className="relative order-2 my-6 hidden h-[420px] md:block lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:my-0 lg:h-[640px]">
          {phone === false && <HeroVisual />}
        </div>

        {/* Experience row — below the robot on phones, under the text on desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="relative z-10 order-3 mt-8 flex flex-col gap-2 border-t border-line pt-4 sm:mt-0 sm:flex-row sm:items-center sm:gap-6 sm:pt-6 lg:col-start-1 lg:row-start-2 lg:mt-12"
        >
          <span className="label shrink-0">Built for</span>
          <ul className="flex flex-wrap gap-x-5 gap-y-1 font-display text-[15px] font-semibold tracking-tight text-ink/45 sm:gap-x-7 sm:text-[17px]">
            {experience.map((e) => (
              <li key={e} className="transition-colors duration-300 hover:text-ink">
                {e}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

    </section>
  );
}
