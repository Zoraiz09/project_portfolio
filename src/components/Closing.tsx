"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { engagement, faq, nav, site, testimonials } from "@/lib/content";
import { Arrow, Logo, Magnetic, Reveal, SectionHeading, ease } from "./ui";

/* ---------------------------- Engagement ---------------------------- */

export function Engagement() {
  return (
    <section id="engage" className="container-site py-20 sm:py-28">
      <SectionHeading
        index="08"
        label="Ways to work together"
        title="Start small,"
        italic="or go all in."
        intro="Every engagement starts with a free discovery call and a written proposal. No lock-in."
      />
      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {engagement.map((e, i) => (
          <Reveal key={e.name} delay={i * 0.08}>
            <div
              className={`relative flex h-full flex-col rounded-[22px] border p-7 transition-all duration-500 hover:-translate-y-1 sm:p-8 ${
                e.featured ? "border-ink bg-ink text-paper shadow-lift" : "border-line bg-surface shadow-card hover:shadow-lift"
              }`}
            >
              {e.featured && (
                <span className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
                  Most popular
                </span>
              )}
              <p className={`font-mono text-[11px] uppercase tracking-[0.18em] ${e.featured ? "pr-28 text-paper/50" : "text-muted"}`}>
                {e.for}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{e.name}</h3>
              <ul className="mb-10 mt-7 space-y-3 text-[15px]">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <svg viewBox="0 0 16 16" className={`mt-1 h-4 w-4 shrink-0 ${e.featured ? "text-[#8FA0FF]" : "text-accent"}`} aria-hidden>
                      <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className={e.featured ? "text-paper/85" : "text-ink/80"}>{p}</span>
                  </li>
                ))}
              </ul>
              <a
                href={site.calendly || "#contact"}
                className={`group mt-auto inline-flex items-center justify-between rounded-full border px-5 py-3 text-[14px] font-medium transition-colors duration-300 ${
                  e.featured
                    ? "border-paper/20 hover:bg-paper hover:text-ink"
                    : "border-line hover:border-ink hover:bg-ink hover:text-paper"
                }`}
              >
                {e.cta}
                <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        ))}
      </div>
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
    <section className="border-y border-line bg-surface py-20 sm:py-28">
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
            <blockquote className="mt-8 font-serif text-3xl leading-snug sm:text-[2.6rem]">“{t.quote}”</blockquote>
            <figcaption className="mt-8 text-[15px]">
              <span className="font-medium">{t.name}</span> <span className="text-muted">— {t.role}</span>
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
    <section id="faq" className="container-site py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
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
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-lg font-medium tracking-tight sm:text-xl">{f.q}</span>
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
                      <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-muted">{f.a}</p>
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

const projectTypes = ["AI agent / MCP integration", "RAG assistant", "AI feature in existing product", "SaaS / MVP", "Web app", "Other"];
const budgets = ["< $5k", "$5k – $15k", "$15k – $50k", "$50k+", "Not sure yet"];

export function Contact() {
  const [type, setType] = useState(projectTypes[0]);
  const [budget, setBudget] = useState(budgets[1]);
  const [sent, setSent] = useState(false);

  // TODO: connect to a form backend (e.g. Resend / Formspree). For now this opens the visitor's email client.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Name: ${f.get("name")}\nCompany: ${f.get("company") || "-"}\nProject: ${type}\nBudget: ${budget}\n\n${f.get("message")}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`New project — ${type}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "w-full rounded-xl border border-paper/15 bg-paper/[0.04] px-4 py-3.5 text-[15px] text-paper placeholder:text-paper/35 outline-none transition-colors duration-300 focus:border-paper/50 focus:bg-paper/[0.07]";

  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
      <div
        aria-hidden
        className="dot-grid-light pointer-events-none absolute inset-0"
        style={{ maskImage: "radial-gradient(ellipse 60% 70% at 20% 30%, black, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse 60% 70% at 20% 30%, black, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-[480px] w-[480px] rounded-full opacity-50 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(47,75,255,0.45), transparent 70%)" }}
      />

      <div className="container-site relative grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <SectionHeading
            index="10"
            label="Contact"
            title="Have an idea?"
            italic="Let's build it."
            intro="Tell us what you're working on. You'll hear back within 24 hours — from a senior engineer, not an account manager."
            light
          />
          <Reveal delay={0.15}>
            <div className="mt-10 space-y-4 text-[15px]">
              <a href={`mailto:${site.email}`} className="group flex items-center gap-3 text-paper/80 transition-colors hover:text-paper">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-paper/15">@</span>
                {site.email}
              </a>
              <p className="flex items-center gap-3 text-paper/60">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-paper/15 font-mono text-[11px]">TZ</span>
                {site.location} · {site.timezone}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="rounded-[24px] border border-paper/10 bg-paper/[0.03] p-6 backdrop-blur sm:p-8">
            <fieldset>
              <legend className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50">What do you need?</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {projectTypes.map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setType(p)}
                    aria-pressed={type === p}
                    className={`rounded-full border px-3.5 py-2 text-[13px] transition-all duration-300 ${
                      type === p ? "border-paper bg-paper text-ink" : "border-paper/15 text-paper/70 hover:border-paper/40"
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
              <textarea id="message" name="message" required rows={4} placeholder="Tell us about the project, timeline and goals…" className={`${field} resize-none sm:col-span-2`} />
            </div>

            <fieldset className="mt-7">
              <legend className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50">Budget</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {budgets.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setBudget(b)}
                    aria-pressed={budget === b}
                    className={`rounded-full border px-3.5 py-2 text-[13px] transition-all duration-300 ${
                      budget === b ? "border-paper bg-paper text-ink" : "border-paper/15 text-paper/70 hover:border-paper/40"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <Magnetic>
                <button type="submit" className="group inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3.5 text-[15px] font-medium text-ink transition-colors duration-300 hover:bg-accent hover:text-white">
                  Send enquiry
                  <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </Magnetic>
              <AnimatePresence>
                {sent && (
                  <motion.p initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="text-[14px] text-paper/60">
                    Your email app should open — thanks!
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
    <footer className="border-t border-paper/10 bg-ink text-paper">
      <div className="container-site flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Logo light />
          <p className="mt-4 text-[14px] leading-relaxed text-paper/50">{site.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-[14px] sm:gap-16">
          <ul className="space-y-2.5">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-paper/60 transition-colors hover:text-paper">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="space-y-2.5">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="text-paper/60 transition-colors hover:text-paper" target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="text-paper/60 transition-colors hover:text-paper">
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-site flex flex-col justify-between gap-2 border-t border-paper/10 py-6 text-[12px] text-paper/40 sm:flex-row">
        <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <span className="font-mono">{site.location}</span>
      </div>
    </footer>
  );
}
