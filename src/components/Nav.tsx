"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";
import { Arrow, Logo, Magnetic, ThemeToggle, ease } from "./ui";

export default function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 400 && !open);
  });

  const cta = site.calendly || "#contact";

  // Scroll-spy: highlight the nav item for the section in view.
  const [active, setActive] = useState("");
  useEffect(() => {
    const els = nav.map((n) => document.querySelector(n.href)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Mobile menu: lock page scroll and close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -90 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-all duration-500 ease-out ${
            scrolled ? "border-b border-line/80 bg-paper/75 backdrop-blur-xl" : "border-b border-transparent"
          }`}
        >
          <nav className="container-site flex h-[60px] items-center justify-between md:h-[68px]" aria-label="Main">
            <a href="#top" aria-label="Home">
              <Logo />
            </a>

            <ul
              className={`hidden items-center gap-0.5 rounded-full border p-1 transition-colors duration-500 md:flex ${
                scrolled ? "border-line/80 bg-surface/60" : "border-transparent"
              }`}
            >
              {nav.map((n) => {
                const isActive = active === n.href;
                return (
                  <li key={n.href} className="relative">
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-subtle"
                      />
                    )}
                    <a
                      href={n.href}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative block rounded-full px-4 py-1.5 text-[14px] transition-colors duration-300 hover:text-ink ${
                        isActive ? "text-ink" : "text-muted"
                      }`}
                    >
                      {n.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <span className="hidden md:inline-flex">
                <Magnetic>
                  <a href={cta} className="btn-primary !py-2.5 !text-[14px]">
                    Book a call <Arrow />
                  </a>
                </Magnetic>
              </span>
              <button
                onClick={() => setOpen((o) => !o)}
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface md:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                <span className="relative block h-3 w-4">
                  <span
                    className={`absolute left-0 h-[1.5px] w-4 bg-ink transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
                  />
                  <span
                    className={`absolute left-0 h-[1.5px] w-4 bg-ink transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
                  />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Phone menu: bottom sheet (tap the backdrop or drag down to close) */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm md:hidden"
              aria-hidden
            />
            <motion.div
              key="sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 90 || info.velocity.y > 500) setOpen(false);
              }}
              className="fixed inset-x-0 bottom-0 z-[71] rounded-t-[28px] border-t border-line bg-surface px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 shadow-lift md:hidden"
            >
              <div className="mx-auto h-1.5 w-10 rounded-full bg-line" aria-hidden />
              <div className="mt-4 flex items-center justify-between">
                <span className="label">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full bg-subtle text-ink"
                  aria-label="Close menu"
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
                    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {[...nav, { label: "Contact", href: "#contact" }].map((n, i) => {
                  const isActive = active === n.href;
                  return (
                    <motion.li
                      key={n.href}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 + 0.04 * i, duration: 0.4, ease }}
                    >
                      <a
                        href={n.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center justify-between rounded-2xl border px-4 py-3.5 font-display text-[17px] font-semibold tracking-tight transition-colors ${
                          isActive ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink active:bg-subtle"
                        }`}
                      >
                        {n.label}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4, ease }}
                className="mt-4"
              >
                <a href={cta} onClick={() => setOpen(false)} className="btn-primary w-full justify-center">
                  Book a call <Arrow />
                </a>
                <a href={`mailto:${site.email}`} className="mt-3 block text-center text-[13px] text-muted">
                  {site.email}
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
