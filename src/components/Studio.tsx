"use client";

import { site, stack, studio } from "@/lib/content";
import Globe from "./Globe";
import { CountUp, Reveal, SectionHeading } from "./ui";

export function Studio() {
  return (
    <section id="studio" className="border-y border-line bg-surface py-14 sm:py-28">
      <div className="container-site">
        <Reveal>
          <p className="label">About us</p>
        </Reveal>

        <Reveal>
          <p className="mt-5 max-w-6xl font-display text-[1.6rem] font-medium leading-[1.2] tracking-tight sm:mt-6 sm:text-[2.8rem] lg:text-[3.3rem] 2xl:text-[3.8rem]">
            {studio.mission}
          </p>
        </Reveal>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 gap-px sm:mt-16 overflow-hidden rounded-[22px] border border-line bg-line lg:grid-cols-4">
          {studio.stats.map((s) => (
            <div key={s.l} className="bg-surface p-5 sm:p-8">
              <p className="font-display text-4xl font-semibold tracking-tightest sm:text-6xl">
                <CountUp to={s.n} suffix={s.suffix} />
              </p>
              <p className="mt-1.5 text-[13px] leading-snug text-muted sm:mt-2 sm:text-[14px]">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mt-10 grid gap-6 sm:mt-16 sm:gap-10 md:grid-cols-3">
          {studio.values.map((v, i) => (
            <Reveal key={v.t} delay={i * 0.08}>
              <div className="border-t border-ink pt-5 sm:pt-6">
                <h3 className="font-display text-xl font-semibold tracking-tight">{v.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 flex flex-wrap items-center gap-2 sm:mt-14">
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
    <section className="container-site py-14 sm:py-28">
      <SectionHeading
        split
        index="06"
        label="What we can do"
        title="Everything your product needs,"
        italic="in one place."
        intro="No need to hire separate teams. We handle the AI, the design, the behind-the-scenes systems and the hosting."
      />
      <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 lg:grid-cols-4">
        {stack.map((g, gi) => (
          <Reveal key={g.group} delay={gi * 0.07}>
            <div className="card h-full p-4 sm:p-6">
              <p className="label">{g.group}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:block sm:space-y-1">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="group flex items-center justify-between rounded-full border border-line px-2.5 py-1 text-[12px] transition-colors duration-300 hover:bg-subtle sm:-mx-2 sm:rounded-lg sm:border-0 sm:px-2 sm:py-2 sm:text-[15px]"
                  >
                    {it}
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
    { city: "Riyadh", tz: "GMT+3", overlap: "Full day" },
    { city: "Singapore", tz: "GMT+8", overlap: "Mornings" },
  ];
  return (
    <section className="relative overflow-hidden border-y border-line bg-surface py-14 sm:py-28">
      <div className="container-site grid items-center gap-8 sm:gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            index="07"
            label="Global"
            title="Based in Dubai,"
            italic="working worldwide."
            intro={`Based in ${site.location.split(" ·")[0]} (${site.timezone}), working with businesses across the Middle East, Europe, Asia and the US, with shared working hours and written updates every day.`}
          />
          <ul className="mt-8 divide-y divide-line border-y border-line sm:mt-10">
            {zones.map((z, i) => (
              <Reveal key={z.city} delay={i * 0.06}>
                <li className="flex items-center justify-between py-3.5 text-[14px] sm:py-4 sm:text-[15px]">
                  <span className="font-medium">{z.city}</span>
                  <span className="hidden text-[13px] text-faint sm:inline">{z.tz}</span>
                  <span className="text-muted">{z.overlap} overlap</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[240px] sm:max-w-[520px]">
          <Globe />
        </div>
      </div>
    </section>
  );
}
