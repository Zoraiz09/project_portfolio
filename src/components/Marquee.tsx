import { stack } from "@/lib/content";

/** Quiet, slow strip of capabilities between the hero and services. Pauses on hover. */
export default function Marquee() {
  const items = stack.flatMap((g) => g.items);
  const row = [...items, ...items];
  return (
    <div className="group relative overflow-hidden border-y border-line bg-surface/60 py-5">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper to-transparent"
        aria-hidden
      />
      <ul className="flex w-max animate-marquee items-center gap-10 group-hover:[animation-play-state:paused]" aria-label="Technologies we use">
        {row.map((t, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length}
            className="flex items-center gap-10 whitespace-nowrap font-display text-[17px] font-medium tracking-tight text-faint transition-colors duration-300 hover:text-ink"
          >
            {t}
            <span className="h-1 w-1 rounded-full bg-line" />
          </li>
        ))}
      </ul>
    </div>
  );
}
