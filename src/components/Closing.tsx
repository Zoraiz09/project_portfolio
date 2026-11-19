"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { engagement, faq, nav, site, testimonials } from "@/lib/content";
import { Arrow, CarouselDots, Logo, Magnetic, Reveal, SectionHeading, SwipeHint, ease } from "./ui";

/* ---------------------------- Engagement ---------------------------- */

type Plan = (typeof engagement)[number];

function PlanCard({ e, phone }: { e: Plan; phone?: boolean }) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-[22px] border p-6 transition-all duration-500 sm:p-8 ${phone ? "" : "hover:-translate-y-1"} ${
        e.featured
          ? "border-night bg-night text-snow shadow-lift dark:border-accent/40 dark:bg-accent-soft"
          : "border-line bg-surface shadow-card hover:shadow-lift"
      }`}
    >
      {e.featured && (
        <span className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 text-[12px] font-medium text-white">
          Most popular
        </span>
      )}
      <p className={`text-[14px] ${e.featured ? "pr-28 text-snow/60" : "text-muted"}`}>{e.for}</p>
      <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{e.name}</h3>
      <ul className="mb-8 mt-6 space-y-3 text-[14.5px] sm:mb-10 sm:mt-7 sm:text-[15px]">
        {e.points.map((p) => (
          <li key={p} className="flex gap-3">
            <svg viewBox="0 0 16 16" className={`mt-1 h-4 w-4 shrink-0 ${e.featured ? "text-[#8FA0FF]" : "text-accent"}`} aria-hidden>
              <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={e.featured ? "text-snow/85" : "text-ink/80"}>{p}</span>
          </li>
        ))}
      </ul>
      <a
        href={site.calendly || "#contact"}
        className={`group mt-auto inline-flex items-center justify-between rounded-full border px-5 py-3 text-[14px] font-medium transition-colors duration-300 ${
          e.featured
            ? "border-snow/20 bg-snow text-night hover:bg-accent hover:text-white sm:bg-transparent sm:text-snow sm:hover:bg-snow sm:hover:text-night"
            : "border-line hover:border-ink hover:bg-ink hover:text-paper"
        }`}
      >
        {e.cta}
        <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </div>
  );
}

const planTabs = ["Trial", "Project", "Monthly"];

export function Engagement() {
  const listRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState(Math.max(0, engagement.findIndex((e) => e.featured)));
  return (
    <section id="engage" className="container-site py-14 sm:py-28">
      <SectionHeading
        split
        index="08"
        label="Ways to work together"
        title="Start small,"
        italic="or go all in."
        intro="Every project starts with a free call and a clear written plan. No long contracts, no lock-in."
      />

      {/* Phone: segmented control, one plan at a time */}
      <div className="mt-8 md:hidden">
        <div role="tablist" aria-label="Engagement type" className="relative grid grid-cols-3 rounded-full border border-line bg-surface p-1">
          {engagement.map((e, i) => (
            <button
              key={e.name}
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={`relative z-10 rounded-full py-2.5 text-[13.5px] font-medium transition-colors duration-300 ${tab === i ? "text-paper" : "text-muted"}`}
            >
              {tab === i && (
                <motion.span layoutId="plan-pill" transition={{ type: "spring", stiffness: 420, damping: 36 }} className="absolute inset-0 -z-10 rounded-full bg-ink" />
              )}
              {planTabs[i] ?? e.name}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease }}
            className="mt-4"
            role="tabpanel"
          >
            <PlanCard e={engagement[tab]} phone />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tablet: swipe row · Desktop: 3-column grid */}
      <SwipeHint className="hidden md:flex lg:hidden" />
      <div
        ref={listRef}
        className="mt-3 hidden snap-x snap-mandatory gap-3 overflow-x-auto pb-3 no-scrollbar md:-mx-8 md:flex md:scroll-pl-8 md:px-8 lg:mx-0 lg:mt-14 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {engagement.map((e, i) => (
          <Reveal key={e.name} delay={i * 0.08} className="w-[340px] shrink-0 snap-start lg:w-auto">
            <PlanCard e={e} />
          </Reveal>
        ))}
      </div>
      <CarouselDots target={listRef} count={engagement.length} className="hidden md:flex lg:hidden" />
    </section>
  );
}

/* --------------------------- Testimonials --------------------------- */

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (testimonials.length < 2) return;
    const id = setInterval(() => setI((n) => (n + 1) % testimonials.length), 7000);
    return () => clearInterval(id);
  }, []);
  if (testimonials.length === 0) return null; // hidden until there are real quotes

  const t = testimonials[i];
  return (
    <section className="border-y border-line bg-surface py-16 sm:py-28">
      <div className="container-site max-w-4xl text-center">
        <p className="label">What clients say</p>
        <AnimatePresence mode="wait">
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease }}
          >
            <blockquote className="mt-8 font-display text-3xl font-medium leading-snug tracking-tight sm:text-[2.4rem]">“{t.quote}”</blockquote>
            <figcaption className="mt-8 text-[15px]">
              <span className="font-medium">{t.name}</span> <span className="text-muted">· {t.role}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* -------------------------------- FAQ ------------------------------- */

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="container-site py-14 sm:py-28">
      <div className="grid gap-8 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading index="09" label="FAQ" title="Questions," italic="answered." />
          <Reveal delay={0.1}>
            <p className="mt-5 text-[15px] text-muted">
              Something else on your mind?{" "}
              <a href="#contact" className="text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink">
                Ask us directly
              </a>
              .
            </p>
          </Reveal>
        </div>
        <ul className="border-t border-line">
          {faq.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-b border-line">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-5 py-5 text-left sm:gap-6 sm:py-6"
                >
                  <span className="font-display text-[17px] font-medium tracking-tight sm:text-xl">{f.q}</span>
                  <span
                    className={`relative grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                      isOpen ? "border-ink bg-ink text-paper" : "border-line"
                    }`}
                  >
                    <span className="absolute h-[1.5px] w-3 bg-current" />
                    <span
                      className={`absolute h-3 w-[1.5px] bg-current transition-transform duration-300 ${isOpen ? "scale-y-0" : ""}`}
                    />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-5 text-[14.5px] leading-relaxed text-muted sm:pb-6 sm:text-[15px]">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------ Contact ----------------------------- */

const projectTypes = ["AI assistant", "Ask-your-documents assistant", "Add AI to my software", "New app or online product", "Website", "Not sure yet"];

export function Contact() {
  const [type, setType] = useState(projectTypes[0]);
  const [sent, setSent] = useState(false);

  // TODO: connect to a form backend (e.g. Resend / Formspree). For now this opens the visitor's email client.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Name: ${f.get("name")}\nCompany: ${f.get("company") || "-"}\nProject: ${type}\n\n${f.get("message")}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`New project: ${type}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "w-full rounded-xl border border-snow/15 bg-snow/[0.04] px-4 py-3.5 text-[15px] text-snow placeholder:text-snow/35 outline-none transition-colors duration-300 focus:border-snow/50 focus:bg-snow/[0.07]";

  return (
    <section id="contact" className="relative overflow-hidden bg-night py-16 text-snow sm:py-32">
      <div className="container-site relative grid gap-10 sm:gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <SectionHeading
            index="10"
            label="Contact"
            title="Have an idea?"
            italic="Let's build it."
            intro="Tell us what you have in mind. No technical knowledge needed. You'll hear back within 24 hours from someone who will actually build it."
            light
          />
          <Reveal delay={0.15}>
            <div className="mt-8 space-y-3 text-[14px] sm:mt-10 sm:space-y-4 sm:text-[15px]">
              <a href={`mailto:${site.email}`} className="group flex items-center gap-3 text-snow/80 transition-colors hover:text-snow">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-snow/15">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                    <rect x="2" y="3.5" width="12" height="9" rx="1.5" />
                    <path d="M2.5 4.5 8 9l5.5-4.5" strokeLinejoin="round" />
                  </svg>
                </span>
                {site.email}
              </a>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="group flex items-center gap-3 text-snow/80 transition-colors hover:text-snow">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-snow/15">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                    <path d="M5.5 2.5h-2a1 1 0 0 0-1 1.1A11 11 0 0 0 12.4 13.5a1 1 0 0 0 1.1-1v-2l-2.6-1-1.3 1.3a7.5 7.5 0 0 1-3.4-3.4L7.5 6.1z" strokeLinejoin="round" />
                  </svg>
                </span>
                {site.phone}
              </a>
              <p className="flex items-center gap-3 text-snow/60">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-snow/15">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                    <path d="M8 14.5s4.5-4.2 4.5-8a4.5 4.5 0 0 0-9 0c0 3.8 4.5 8 4.5 8Z" strokeLinejoin="round" />
                    <circle cx="8" cy="6.5" r="1.6" />
                  </svg>
                </span>
                {site.address}
              </p>
              <p className="flex items-center gap-3 text-snow/60">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-snow/15">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                    <circle cx="8" cy="8" r="6" />
                    <path d="M8 4.5V8l2.5 1.5" strokeLinecap="round" />
                  </svg>
                </span>
                Working worldwide · {site.timezone}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="rounded-[24px] border border-snow/10 bg-snow/[0.03] p-5 backdrop-blur sm:p-8">
            <fieldset>
              <legend className="text-[14px] font-medium text-snow/60">What do you need?</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {projectTypes.map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setType(p)}
                    aria-pressed={type === p}
                    className={`rounded-full border px-3.5 py-2 text-[13px] transition-all duration-300 ${
                      type === p ? "border-snow bg-snow text-night" : "border-snow/15 text-snow/70 hover:border-snow/40"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <label className="sr-only" htmlFor="name">Name</label>
              <input id="name" name="name" required placeholder="Your name" className={field} autoComplete="name" />
              <label className="sr-only" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required placeholder="Work email" className={field} autoComplete="email" />
              <label className="sr-only" htmlFor="company">Company</label>
              <input id="company" name="company" placeholder="Company (optional)" className={`${field} sm:col-span-2`} autoComplete="organization" />
              <label className="sr-only" htmlFor="message">Project details</label>
              <textarea id="message" name="message" required rows={4} placeholder="Tell us your idea in your own words: what you want it to do, and when you need it…" className={`${field} resize-none sm:col-span-2`} />
            </div>


            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <Magnetic>
                <button type="submit" className="group inline-flex items-center gap-2 rounded-full bg-snow px-6 py-3.5 text-[15px] font-medium text-night transition-colors duration-300 hover:bg-accent hover:text-white">
                  Send enquiry
                  <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </Magnetic>
              <AnimatePresence>
                {sent && (
                  <motion.p initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="text-[14px] text-snow/60">
                    Your email app should open. Thanks!
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ Footer ------------------------------ */

export function Footer() {
  return (
    <footer className="border-t border-snow/10 bg-night text-snow">
      <div className="container-site flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Logo light full />
          <p className="mt-6 text-[14px] leading-relaxed text-snow/50">{site.description}</p>
          <address className="mt-5 space-y-1.5 text-[14px] not-italic leading-relaxed text-snow/60">
            <span className="block">{site.address}</span>
            <a href={`mailto:${site.email}`} className="block transition-colors hover:text-snow">
              {site.email}
            </a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="block transition-colors hover:text-snow">
              {site.phone}
            </a>
          </address>
        </div>
        <div className="grid grid-cols-2 gap-10 text-[14px] sm:gap-16">
          <ul className="space-y-2.5">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-snow/60 transition-colors hover:text-snow">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="space-y-2.5">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="text-snow/60 transition-colors hover:text-snow" target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="text-snow/60 transition-colors hover:text-snow">
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-site flex flex-col justify-between gap-3 border-t border-snow/10 py-6 text-[12px] text-snow/40 sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <div className="flex items-center gap-5">
          <span>{site.location}</span>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 rounded-full border border-snow/15 px-3.5 py-1.5 text-snow/70 transition-colors hover:border-snow/40 hover:text-snow"
          >
            Back to top
            <Arrow className="-rotate-90 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
