import type { Metadata } from "next";
import localFont from "next/font/local";
import { Bricolage_Grotesque, Manrope, Plus_Jakarta_Sans } from "next/font/google";

/** Temporary font comparison page (/type). Delete this folder once a font is chosen. */
export const metadata: Metadata = { title: "Font comparison", robots: { index: false } };

const satoshi = localFont({ src: "../fonts/Satoshi-Variable.woff2", weight: "300 900" });
const general = localFont({ src: "../fonts/GeneralSans-Variable.woff2", weight: "200 700" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

const options = [
  { key: "Satoshi", note: "Now live · Indian Type Foundry · crisp, modern, used by many design studios", f: satoshi },
  { key: "General Sans", note: "Indian Type Foundry · slightly wider, very clean and corporate", f: general },
  { key: "Plus Jakarta Sans", note: "Google Fonts · friendly-professional, popular with SaaS", f: jakarta },
  { key: "Manrope", note: "Google Fonts · technical, geometric, compact", f: manrope },
  { key: "Bricolage Grotesque", note: "Previous font · quirky, characterful", f: bricolage },
];

export default function TypePage() {
  return (
    <main className="container-site py-16">
      <p className="label">Font comparison — tell Claude the name you like</p>
      <div className="mt-8 space-y-6">
        {options.map((o, i) => (
          <section key={o.key} className={`card p-6 sm:p-10 ${o.f.className}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent" style={{ fontFamily: "var(--font-mono)" }}>
                {String(i + 1).padStart(2, "0")} · {o.key}
              </p>
              <p className="text-[13px] text-muted">{o.note}</p>
            </div>
            <h2 className="mt-6 text-[2.6rem] font-bold leading-[0.98] tracking-[-0.035em] sm:text-[4.2rem]">
              We build intelligent
              <br />
              software that ships.
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">AI Agents &amp; MCP Integrations</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-muted">
                  We connect AI to your software. Using the Model Context Protocol, we expose your product&apos;s features as tools an AI can use —
                  so users get complex work done with a single prompt.
                </p>
              </div>
              <div className="flex flex-wrap items-start gap-3">
                <span className="rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-paper">Start a project →</span>
                <span className="rounded-full border border-line px-6 py-3 text-[15px] font-medium">See our work</span>
                <p className="w-full text-[44px] font-bold tracking-[-0.04em]">8+ · 24h · 100%</p>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
