"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ease } from "./ui";

/** Loops through `steps` (ms durations) while visible. Returns current step index. */
function useLoop(durations: number[], ref: React.RefObject<HTMLElement | null>, initial = 0) {
  const inView = useInView(ref, { margin: "-60px" });
  const [step, setStep] = useState(initial);
  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setStep((s) => (s + 1) % durations.length), durations[step]);
    return () => clearTimeout(id);
  }, [inView, step, durations]);
  return step;
}

const mcpDurations = [900, 1700, 900, 900, 900, 2600];

/** Video editor driven by a prompt via MCP tools. */
export function McpEditorMock() {
  const ref = useRef<HTMLDivElement>(null);
  const step = useLoop(mcpDurations, ref);
  const prompt = "Cut the intro, add captions, make it vertical";
  const typed = step >= 1;
  const cut = step >= 2;
  const captions = step >= 3;
  const vertical = step >= 4;
  const done = step >= 5;

  return (
    <div ref={ref} className="flex h-full min-h-[250px] flex-col rounded-[18px] border border-line bg-[#111114] p-3 sm:min-h-[340px] text-[11px] text-white/70 sm:p-4">
      {/* window bar */}
      <div className="flex items-center gap-1.5 pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 font-mono text-[10px] text-white/40">editor — project.mp4</span>
      </div>

      {/* preview */}
      <div className="grid flex-1 place-items-center rounded-xl bg-black/40 py-4">
        <motion.div
          animate={{ width: vertical ? 92 : 220, height: vertical ? 164 : 124 }}
          transition={{ duration: 0.8, ease }}
          className="relative overflow-hidden rounded-lg"
          style={{ background: "linear-gradient(135deg,#2F4BFF 0%,#7C8CF8 55%,#C7CEFF 100%)" }}
        >
          <AnimatePresence>
            {captions && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-x-2 bottom-2 rounded bg-black/60 px-1.5 py-0.5 text-center text-[9px] text-white"
              >
                Welcome back to the channel
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* timeline */}
      <div className="mt-3 space-y-1.5 rounded-xl bg-black/30 p-2.5">
        <div className="flex h-6 gap-1">
          <motion.div
            animate={{ flexGrow: cut ? 0 : 1, opacity: cut ? 0 : 1, marginRight: cut ? -4 : 0 }}
            transition={{ duration: 0.6, ease }}
            className="basis-0 rounded bg-white/25"
            style={{ flexGrow: 1 }}
          />
          <div className="flex-[3] rounded bg-[#5B73FF]/80" />
          <div className="flex-[2] rounded bg-[#5B73FF]/50" />
        </div>
        <div className="flex h-3 gap-1">
          <motion.div
            initial={false}
            animate={{ scaleX: captions ? 1 : 0 }}
            transition={{ duration: 0.7, ease }}
            className="flex-1 origin-left rounded bg-amber-300/70"
          />
        </div>
      </div>

      {/* prompt + tool log */}
      <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 font-mono">
        <div className="flex min-w-0 items-center gap-2 text-white">
          <span className="text-[#8FA0FF]">›</span>
          <span className="min-w-0 truncate">{typed ? prompt : <span className="text-white/30">Describe your edit…</span>}</span>
        </div>
        <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-white/40">
          <span className={cut ? "text-[#8FA0FF]" : ""}>trim_clip {cut && "✓"}</span>
          <span className={captions ? "text-[#8FA0FF]" : ""}>add_captions {captions && "✓"}</span>
          <span className={vertical ? "text-[#8FA0FF]" : ""}>set_aspect 9:16 {vertical && "✓"}</span>
          {done && <span className="text-emerald-300">done in 3 steps</span>}
        </div>
      </div>
    </div>
  );
}

const ragDurations = [800, 1200, 2400, 3200];

/** Internal-docs assistant answering with citations. */
export function RagChatMock() {
  const ref = useRef<HTMLDivElement>(null);
  const step = useLoop(ragDurations, ref, 3);

  return (
    <div ref={ref} className="flex h-full min-h-[270px] flex-col rounded-[18px] border border-line bg-paper p-4 sm:min-h-[340px] text-[13px]">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <span className="font-display font-semibold">Knowledge Assistant</span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> 2,140 docs indexed
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-3 py-4">
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              key="q"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-paper"
            >
              What&apos;s the inspection interval for the heat exchangers?
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key="typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex w-fit gap-1 rounded-2xl bg-surface px-4 py-3 shadow-card"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-faint"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }}
                />
              ))}
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              key="a"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-[88%] rounded-2xl rounded-bl-md border border-line bg-surface px-4 py-3 shadow-card"
            >
              <p className="leading-relaxed text-ink/90">
                Every 12 months, or sooner after a pressure excursion
                <sup className="ml-0.5 rounded bg-accent-soft px-1 font-mono text-[9px] text-accent">1</sup>. Tube
                bundles need a full integrity check every 3 years
                <sup className="ml-0.5 rounded bg-accent-soft px-1 font-mono text-[9px] text-accent">2</sup>.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5 font-mono text-[10px] text-muted">
                <span className="rounded-md border border-line px-2 py-0.5">[1] Maintenance-SOP.pdf · p.14</span>
                <span className="rounded-md border border-line px-2 py-0.5">[2] Asset-Integrity.docx · §3.2</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="rounded-xl border border-line bg-surface px-3.5 py-2.5 text-faint">Ask about any document…</div>
    </div>
  );
}
