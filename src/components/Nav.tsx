"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { nav, site } from "@/lib/content";
import { Arrow, Logo, Magnetic, ease } from "./ui";

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
          <nav className="container-site flex h-[68px] items-center justify-between" aria-label="Main">
            <a href="#top" aria-label="Home">
              <Logo />
            </a>

            <ul className="hidden items-center gap-1 md:flex">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="rounded-full px-4 py-2 text-[14px] text-muted transition-colors duration-300 hover:bg-subtle hover:text-ink"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-paper/95 backdrop-blur-xl md:hidden"
          >
            <ul className="container-site flex flex-col gap-1 pt-24">
              {[...nav, { label: "Contact", href: "#contact" }].map((n, i) => (
                <motion.li
                  key={n.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.5, ease }}
                >
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between border-b border-line py-4 font-display text-3xl font-semibold tracking-tight"
                  >
                    {n.label}
                    <span className="font-mono text-xs text-faint">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
