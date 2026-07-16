# Ember — Full Site Build-Out Design

**Date:** 2026-07-16
**Status:** Approved (user approved Part 1 + Approach A; waived per-section approval — review happens on the finished build)

## Goal

Extend the existing hero-only Ember coffee roastery site into a complete, resellable, awwwards-grade single-page marketing site: 10 sections after the hero, every section with a clear purpose, hero nav/CTA made functional.

## Decisions (user-confirmed)

- **Architecture:** Smooth-scroll single page. Nav links anchor to real sections; "Taste the roast" scrolls to `#roasts`.
- **Motion:** Rich scroll choreography + GSAP ScrollTrigger pinned sections (GSAP is fully free/MIT incl. all plugins). framer-motion handles entrance reveals; GSAP owns the two pinned showpieces. Never both on the same element.
- **Imagery:** Full bespoke set, ~9 gpt-image-2 generations, n=1 per call (billing constraint).
- **Icons:** lucide-react only.
- **Stack:** Pinned React 18 / Tailwind 3 / framer-motion 12 / Vite 5. Only new dependency: `gsap`.

## Design System

- **Palette:** base `#0C0908`; alt section bg `#1A1310` (warm dark brown, alternating so the page isn't flat black); cream text `#E9D8BE` / `primary #E4D3B8`; single accent ember `#D97B4A` (indexes, hovers, active states, counters, marquee bg).
- **Type:** Almarai = UI/body (global). Instrument Serif = display voice for section headlines. Section header grammar: small ember index (`01 — Origins`) + oversized serif headline.
- **Texture:** existing `.bg-noise` per section at low opacity for filmic continuity with hero.
- **Section rhythm:** alternate `#0C0908` / `#1A1310` backgrounds; generous vertical padding (`py-24 md:py-40`-ish); 12-col grid alignment consistent with hero.

## Architecture

```
src/
  sections/   Hero, Marquee, Story, Origins, Process, Roasts,
              Numbers, Subscriptions, Voices, Wholesale, Footer
  components/ WordsPullUp (existing), SectionHeading, Reveal,
              EmberButton (extracted hero CTA), EmberMark (logo SVG)
  lib/        data.ts (origins, products, plans, testimonials),
              scroll helper for anchor offset
  assets/     hero.png + ~9 new generations
```

- Nav stays visually as-is inside Hero, but links get real `href="#..."` + smooth scroll.
- All interactive states client-side only (no backend): forms validate + show success states.
- **A11y/perf:** `prefers-reduced-motion` disables pins/parallax via `gsap.matchMedia`; below-fold images `loading="lazy"`; semantic landmarks; focus-visible styles on all interactive elements.

## Sections

| # | Section | id | Purpose | Key design |
|---|---------|----|---------|-----------|
| 1 | Marquee | — | Energy transition out of hero | Ember-orange infinite ribbon, black text: `FRESH ROASTED ✳ SINGLE ORIGIN ✳ SHIPPED IN 48H ✳ SMALL BATCH ✳ DIRECT TRADE` |
| 2 | Our Story | `#story` | Brand narrative/manifesto | `01` index; giant Instrument Serif manifesto, per-line masked reveal; roastery interior image w/ slow parallax; "Roasting in Portland since 2019" |
| 3 | Origins | `#origins` | Sourcing credibility | **GSAP pinned horizontal scroll**: 4 full-height cards — Ethiopia Yirgacheffe, Colombia Huila, Guatemala Antigua, Kenya Nyeri. Landscape image, altitude/process/varietal/tasting notes, scroll progress bar. Lucide MapPin/Mountain/Thermometer |
| 4 | The Process | `#process` | Craft proof, lab-log aesthetic | **GSAP pinned scrub**: 4 stages (Green / First Crack / Development / Rest); stage counter flips, image/color-field crossfade, animated temperature readout |
| 5 | Roasts | `#roasts` | The shop; CTA destination | 3 product cards: Dawn (light), Ember (medium), Char (dark). Bag render, hover lift + tasting-note reveal, roast-level dots, price, "Add" → check micro-interaction |
| 6 | Numbers | — | Quantified craft proof | 4 scroll-in counters: 12kg max batch · 48h roast-to-ship · 9 partner farms · 86+ avg cup score |
| 7 | Subscriptions | `#subscriptions` | Conversion centerpiece | Working plan picker: frequency toggle (1/2/4 weeks) + bag stepper, live price w/ rolling-number animation; lifestyle pour image; EmberButton CTA |
| 8 | Voices | — | Social proof, editorial | 3 oversized serif pull-quotes, staggered reveal, small attributions; giant low-opacity ember `"` glyph. No carousel |
| 9 | Wholesale | `#wholesale` | B2B lead-gen | Split: pitch + lucide benefit list (Coffee/Truck/BadgeCheck/Headset); working inquiry form (name, email, business type select, volume) with validation + animated success |
| 10 | Footer | — | Sign-off, capture | Newsletter input (validated, success micro-animation); sitemap; hours/location; lucide socials; massive cropped "Ember" serif wordmark bleeding off bottom; back-to-top |

## Image Manifest (gpt-image-2, n=1 per call, graded to espresso/ember palette)

1. Roastery interior (Story)
2. Ethiopia highland farm landscape (Origins)
3. Colombia Huila landscape (Origins)
4. Guatemala Antigua landscape (Origins)
5. Kenya Nyeri landscape (Origins)
6. Roasting-drum macro, beans mid-roast (Process)
7–8/9. Coffee bag renders for Dawn/Ember/Char (1–3 calls as consistency requires)
9. Lifestyle pour shot (Subscriptions)

Verification note: framer-motion opacity reveals false-negative under virtual-time headless screenshots — verify with real-time puppeteer-core.

## Error Handling / Edge Cases

- Reduced motion: pins become static stacked layouts; reveals render visible.
- Small viewports: Origins horizontal scroll degrades to native vertical card stack (no pin) below `md`; Process pin likewise stacks.
- Forms: inline validation messages; success state replaces form; no network calls.
- Image gen failure/inconsistency: fall back to color-field + typographic treatment for that slot (page must never ship with a broken image).

## Testing

- `npm run build` (tsc + vite) clean.
- Real-time puppeteer-core screenshots at desktop + mobile widths for each section.
- Manual pass: nav anchors land with correct offset; toggles/steppers/forms function; reduced-motion mode renders all content.
