# Studio site

AI & software studio website — Next.js 15, TypeScript, Tailwind, Framer Motion, Lenis, React Three Fiber.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Editing content
All copy lives in **`src/lib/content.ts`** — services, case studies, process, FAQ, stats, etc.

Still to fill in (search for `TODO`):
- `site.name`, `site.email`, `site.calendly`, `site.socials` — studio name, domain email, booking link, profiles
- `testimonials` — the section is hidden until real quotes are added
- Contact form currently opens the visitor's email app; connect a backend (Resend / Formspree) in `Closing.tsx`
- Logo: placeholder mark in `components/ui.tsx` (`Logo`) and `app/icon.svg`

## Structure
| File | Section |
|---|---|
| `components/Hero.tsx` + `Robot.tsx` | Hero with interactive 3D robot (original, built in code) |
| `components/Services.tsx` | Bento grid with animated mini-visuals |
| `components/Work.tsx` + `Mocks.tsx` | Stacked case studies, animated MCP editor & RAG chat mocks |
| `components/Approach.tsx` | How we build AI (scroll pipeline) + Process timeline |
| `components/Studio.tsx` + `Globe.tsx` | Studio, Stack, Global (canvas globe) |
| `components/Closing.tsx` | Engagement, Testimonials, FAQ, Contact, Footer |

Colours/fonts are tokens in `tailwind.config.ts` (Ivory & Ink palette, one blue accent).
All motion respects `prefers-reduced-motion`; 3D and the globe pause when off-screen.
