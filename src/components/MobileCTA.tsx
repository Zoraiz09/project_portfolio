"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/lib/content";
import { Arrow, ease } from "./ui";

/** Phone-only floating "Start a project" button: appears after the hero, hides at the contact form. */
export default function MobileCTA() {
  const { scrollY } = useScroll();
  const [pastHero, setPastHero] = useState(false);
  const [atContact, setAtContact] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setPastHero(y > window.innerHeight * 0.9));

  useEffect(() => {
    const el = document.querySelector("#contact");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setAtContact(e.isIntersecting || e.boundingClientRect.top < 0), {
      rootMargin: "0px 0px -20% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show = pastHero && !atContact;
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.45, ease }}
          className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden"
        >
          <a
            href={site.calendly || "#contact"}
            className="btn-primary w-full justify-center !py-3.5 shadow-lift"
          >
            Start a project <Arrow />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
