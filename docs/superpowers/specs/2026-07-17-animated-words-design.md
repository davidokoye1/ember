# Smooth Text Animations — AnimatedWords

**Date:** 2026-07-17
**Status:** Approved approach (A) — children-aware word-stagger component

## Goal

Add smooth, editorial word-level text animations to the Ember site's hero and
every section's big statement/display headline, without restructuring the
two-tone copy spans or inline `AsteriskMark`s. Small copy, buttons, captions,
and stats keep the existing `Reveal` fade-up.

## Component: `src/components/AnimatedWords.tsx`

A children-aware replacement for the string-only `WordsPullUp`.

- **API:** `<AnimatedWords as="p" className=…, delay?, stagger?>{children}</AnimatedWords>`
  - `as` — rendered element (default `div`); statements use `p`, headlines `h2`/`span`.
  - `delay` — base delay before the first word (default 0).
  - `stagger` — per-word delay (default 0.04s), with a **cap**: total stagger
    span is clamped to ~0.9s so long paragraphs don't crawl
    (`per = min(stagger, 0.9 / wordCount)`).
- **Splitting:** recursively walks `children`:
  - String/number nodes → split on whitespace into words.
  - Elements (`<span className="text-ink/45">`, `AsteriskMark`, etc.) → clone,
    recurse into their children so styling wrappers are preserved; leaf inline
    elements (svg marks) are treated as a single "word".
  - A global word index threads through the recursion so stagger is continuous
    across span boundaries.
- **Animation:** each word is wrapped in an outer
  `inline-block overflow-hidden align-bottom` mask containing an inner
  `motion.span` (`inline-block`) animating `y: '110%' → '0%'` with the site
  ease `[0.16, 1, 0.3, 1]`, duration 0.6s. Whitespace between words is
  rendered outside the masks so line wrapping is unaffected.
- **Trigger:** `useInView(ref, { once: true, margin: '-60px' })`.
- **Reduced motion:** `useReducedMotion()` → render words statically visible,
  no transforms.

## Application map

| Location | Element | Change |
|---|---|---|
| Hero | `Ember*` wordmark | proper masked rise (already has `overflow-hidden` wrapper; keep scroll-linked sink) |
| Hero | statement paragraph | block fade → `AnimatedWords` (delay ≈ 0.35) |
| Story 01 | big statement | `Reveal` → `AnimatedWords` |
| Origins 02 | statement/headline | same |
| Process 03 | statement/headline | same |
| Roasts 04 | statement/headline | same |
| Subscriptions 05 | statement/headline | same |
| Wholesale 06 | statement/headline | same |
| Voices 07 | statement/headline | same |
| FinePrint 08 | statement/headline | same |
| Footer | newsletter display headline | same |

Everything else (eyebrows, body copy, buttons, captions, stat rows, marquee)
keeps its current `Reveal`/static treatment.

## Non-goals

- No GSAP dependency; framer-motion only.
- No character-level splitting.
- No animation of body copy or UI chrome.

## Testing / verification

- `npm run build` (tsc) passes.
- Real-time puppeteer-core screenshots on dev server :5199 — per project memory,
  virtual-time screenshots false-negative on framer-motion opacity; use
  real-time capture at ~1.5s after scroll-into-view for a mid/end-state check
  of hero + two representative sections.
- Manual check: line wrapping identical to pre-animation rendering (masks are
  `inline-block`, whitespace outside masks).
