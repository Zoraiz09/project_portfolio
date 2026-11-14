"use client";

import { motion } from "framer-motion";
import { site, stack, studio } from "@/lib/content";
import Globe from "./Globe";
import { CountUp, Reveal, SectionHeading, ease } from "./ui";

export function Studio() {
  const words = studio.mission.split(" ");
  return (
    <section id="studio" className="border-y border-line bg-surface py-20 sm:py-28">
      <div className="container-site">
        <Reveal>
          <p className="label">05 — The studio</p>
        </Reveal>

        {/* Mission — words fade in one by one */}
        <p className="mt-8 max-w-5xl font-display text-[2rem] font-medium leading-[1.15] tracking-tight sm:text-[2.8rem] lg:text-[3.3rem]">
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.12 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.5, delay: i * 0.04, ease }}
              className={w.toLowerCase().startsWith("ai-first") ? "font-serif font-normal italic text-accent" : ""}
            >
              {w}{" "}
            </motion.span>
          ))}
        </p>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[22px] border border-line bg-line lg:grid-cols-4">
          {studio.stats.map((s) => (
            <div key={s.l} className="bg-surface p-6 sm:p-8">
              <p className="font-display text-5xl font-semibold tracking-tightest sm:text-6xl">
                <CountUp to={s.n} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-[14px] text-muted">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {studio.values.map((v, i) => (
            <Reveal key={v.t} delay={i * 0.08}>
              <div className="border-t border-ink pt-6">
                <h3 className="font-display text-xl font-semibold tracking-tight">{v.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 flex flex-wrap items-center gap-2">
            <span className="label mr-2">Industries</span>
            {studio.industries.map((i) => (
              <span key={i} className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[13px] text-ink/80">
                {i}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Stack() {
  return (
    <section className="container-site py-20 sm:py-28">
      <SectionHeading
        index="06"
        label="Stack"
        title="Modern tools,"
        italic="chosen deliberately."
        intro="We pick technology for your constraints — not for our CV."
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stack.map((g, gi) => (
          <Reveal key={g.group} delay={gi * 0.07}>
            <div className="card h-full p-6">
              <p className="label">{g.group}</p>
              <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-1 sm:block sm:space-y-1">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="group flex items-center justify-between rounded-lg px-2 py-2 -mx-2 text-[15px] transition-colors duration-300 hover:bg-subtle"
                  >
                    {it}
                    <span className="h-1.5 w-1.5 scale-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-100" />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Global() {
  const zones = [
    { city: "New York", tz: "GMT−5", overlap: "Mornings" },
    { city: "London", tz: "GMT+0", overlap: "Full afternoon" },
    { city: "Dubai", tz: "GMT+4", overlap: "Full day" },
  ];
  return (
    <section className="relative overflow-hidden border-y border-line bg-surface py-24 sm:py-28">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            index="07"
            label="Global"
            title="Remote by design,"
            italic="close by habit."
            intro={`Based in ${site.location.split(" ·")[0]} (${site.timezone}), working with teams across the US, Europe and the Middle East — with real overlap hours and async updates every day.`}
          />
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {zones.map((z, i) => (
              <Reveal key={z.city} delay={i * 0.06}>
                <li className="flex items-center justify-between py-4 text-[15px]">
                  <span className="font-medium">{z.city}</span>
                  <span className="font-mono text-[12px] text-faint">{z.tz}</span>
                  <span className="text-muted">{z.overlap} overlap</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          <Globe />
        </div>
      </div>
    </section>
  );
}
