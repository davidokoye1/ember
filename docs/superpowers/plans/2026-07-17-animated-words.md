# AnimatedWords Text Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Word-level masked-rise text animations on the hero and every section's big statement/display headline, via one children-aware `AnimatedWords` component.

**Architecture:** A new `AnimatedWords` component recursively walks its JSX children, splitting text nodes into per-word clip-masked `motion.span`s while preserving styling wrappers (two-tone spans, `AsteriskMark`s). Call sites swap `Reveal` → `AnimatedWords` for statements/headlines only; supporting copy keeps `Reveal`.

**Tech Stack:** React 18, framer-motion 12, Tailwind 3, Vite. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-07-17-animated-words-design.md`

## Global Constraints

- Ease is always `[0.16, 1, 0.3, 1]` (site-wide constant).
- Word rise: `y: '110%' → '0%'`, duration `0.6`, default stagger `0.04s/word`, total stagger span capped at `0.9s`.
- In-view trigger: `useInView(ref, { once: true, margin: '-60px' })`.
- `useReducedMotion()` → render children statically, no animation.
- Whitespace must render OUTSIDE word masks so line wrapping matches unanimated text.
- Word + attached punctuation/mark spans (e.g. `rhythm*`) must not get a line-break between them — wrap in `whitespace-nowrap` at the call site (breaks are legal between adjacent inline-blocks otherwise).
- No unit test framework exists in this repo; verification is `npm run build` (tsc) + real-time puppeteer-core screenshots on dev server `:5199`. **Never** use virtual-time screenshots (false-negatives on framer-motion — see project memory).
- Do not touch: eyebrows, body copy, buttons, captions, stat rows, marquee, accordion/list interactions.

---

### Task 1: `AnimatedWords` component

**Files:**
- Create: `src/components/AnimatedWords.tsx`

**Interfaces:**
- Produces: `default AnimatedWords({ children, as?, className?, delay?, stagger? })`
  - `as: 'div' | 'p' | 'h2' | 'h3' | 'span'` (default `'div'`)
  - `delay: number` seconds before first word (default `0`)
  - `stagger: number` seconds/word (default `0.04`, capped so total span ≤ 0.9s)
  - Children may contain nested styled spans, `<br/>`, and leaf inline elements (svg marks); all are preserved.

- [ ] **Step 1: Write the component**

```tsx
import { cloneElement, isValidElement, useRef } from 'react'
import type { Key, ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* Words rise from behind per-word clip masks. Unlike WordsPullUp this accepts
   styled children — two-tone spans, inline AsteriskMarks, <br/> — and splits
   only the text nodes, preserving every wrapper. Whitespace renders outside
   the masks so line wrapping matches unanimated text. */

interface AnimatedWordsProps {
  children: ReactNode
  as?: 'div' | 'p' | 'h2' | 'h3' | 'span'
  className?: string
  delay?: number
  stagger?: number
}

function countWords(node: ReactNode): number {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node).split(/\s+/).filter(Boolean).length
  }
  if (Array.isArray(node)) return node.reduce((n: number, child) => n + countWords(child), 0)
  if (isValidElement(node)) {
    const children = (node.props as { children?: ReactNode }).children
    if (children != null) return countWords(children)
    return node.type === 'br' ? 0 : 1
  }
  return 0
}

export default function AnimatedWords({
  children,
  as: Tag = 'div',
  className,
  delay = 0,
  stagger = 0.04,
}: AnimatedWordsProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <Tag className={className}>{children}</Tag>
  }

  /* Cap the total stagger span so long paragraphs don't crawl. */
  const per = Math.min(stagger, 0.9 / Math.max(countWords(children), 1))
  let index = 0

  const word = (content: ReactNode, key: Key) => {
    const i = index++
    return (
      <span
        key={key}
        className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]"
      >
        <motion.span
          className="inline-block"
          initial={{ y: '110%' }}
          animate={isInView ? { y: '0%' } : undefined}
          transition={{ delay: delay + i * per, duration: 0.6, ease: EASE }}
        >
          {content}
        </motion.span>
      </span>
    )
  }

  const walk = (node: ReactNode, key: Key): ReactNode => {
    if (typeof node === 'string' || typeof node === 'number') {
      /* Keep whitespace as raw text between masks — the browser wraps lines
         exactly as it would have without the animation spans. */
      return String(node)
        .split(/(\s+)/)
        .map((part, i) => (part.trim() === '' ? part : word(part, `${key}-${i}`)))
    }
    if (Array.isArray(node)) return node.map((child, i) => walk(child, `${key}-${i}`))
    if (isValidElement(node)) {
      const children = (node.props as { children?: ReactNode }).children
      if (children != null) return cloneElement(node, { key }, walk(children, key))
      /* Leaf inline element: <br/> passes through; svg marks become a word. */
      return node.type === 'br' ? cloneElement(node, { key }) : word(node, key)
    }
    return node
  }

  return (
    <Tag ref={ref as never} className={className}>
      {walk(children, 'w')}
    </Tag>
  )
}
```

Notes for the implementer:
- The `pb-[0.1em] -mb-[0.1em]` on the mask prevents descender clipping (`g`, `y`, `p`) at tight line-heights without changing layout — the negative margin cancels the padding.
- `ref as never` sidesteps the polymorphic-ref typing; the runtime element is always an HTMLElement.
- All hooks run before the reduced-motion early return — hook order is stable.

- [ ] **Step 2: Type-check and build**

Run: `npm run build`
Expected: PASS (tsc + vite build, no errors). The component is not yet imported anywhere; that's fine.

- [ ] **Step 3: Commit**

```bash
git add src/components/AnimatedWords.tsx
git commit -m "feat: add AnimatedWords children-aware word-stagger component"
```

---

### Task 2: Hero — masked wordmark rise + word-stagger statement

**Files:**
- Modify: `src/sections/Hero.tsx`

**Interfaces:**
- Consumes: `AnimatedWords` from Task 1.

- [ ] **Step 1: Convert the wordmark entrance to a pure masked rise**

The wrapper div already has `overflow-hidden`. In `Hero.tsx`, change the `motion.h1` entrance (currently `y: '30%'` + opacity fade) to rise fully from behind the mask, no opacity fade. Replace:

```tsx
        <motion.h1
          initial={{ y: '30%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: EASE }}
```

with:

```tsx
        <motion.h1
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: EASE }}
```

Keep the inner `motion.span` (scroll-linked `markY`/`markOpacity`) untouched.

- [ ] **Step 2: Word-stagger the statement paragraph**

Add the import at the top of `Hero.tsx`:

```tsx
import AnimatedWords from '../components/AnimatedWords'
```

Replace the statement `motion.p` block:

```tsx
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
          className="col-span-12 md:col-span-7 max-w-2xl text-xl md:text-3xl font-semibold leading-[1.22] tracking-[-0.02em]"
        >
          <span className="text-ink">
            We source single-origin lots from growers we know by name, roast them in small batches
            to order,
          </span>{' '}
          <span className="text-ink/45">
            and ship within days — so every cup tastes the way the farm intended.
          </span>
        </motion.p>
```

with:

```tsx
        <AnimatedWords
          as="p"
          delay={0.35}
          className="col-span-12 md:col-span-7 max-w-2xl text-xl md:text-3xl font-semibold leading-[1.22] tracking-[-0.02em]"
        >
          <span className="text-ink">
            We source single-origin lots from growers we know by name, roast them in small batches
            to order,
          </span>{' '}
          <span className="text-ink/45">
            and ship within days — so every cup tastes the way the farm intended.
          </span>
        </AnimatedWords>
```

Leave the CTA `motion.div` (delay 0.55) and photography band untouched.

- [ ] **Step 3: Build and visually verify**

Run: `npm run build`
Expected: PASS

Then with the dev server running (`npm run dev` on :5199), capture a real-time load screenshot:

```bash
node -e "
const puppeteer = require('puppeteer-core');
(async () => {
  const b = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || '/usr/bin/chromium', args: ['--no-sandbox','--hide-scrollbars'] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto('http://localhost:5199/', { waitUntil: 'networkidle0' });
  await p.screenshot({ path: '/tmp/words-hero-mid.png' });      // mid-animation
  await new Promise(r => setTimeout(r, 1800));
  await p.screenshot({ path: '/tmp/words-hero-done.png' });     // settled
  await b.close();
})();"
```

Read both screenshots. Expected: `words-hero-done.png` shows the full hero identical in layout to before (wordmark, complete statement, CTA); `words-hero-mid.png` shows the wordmark/words partially risen or absent (proves animation runs). Check no clipped descenders in the statement.

- [ ] **Step 4: Commit**

```bash
git add src/sections/Hero.tsx
git commit -m "feat: masked wordmark rise + word-stagger statement in hero"
```

---

### Task 3: Statement sections — Story, Origins, Wholesale

**Files:**
- Modify: `src/sections/Story.tsx`
- Modify: `src/sections/Origins.tsx`
- Modify: `src/sections/Wholesale.tsx`

**Interfaces:**
- Consumes: `AnimatedWords` from Task 1.

Pattern for all three: the big statement's `<Reveal><p …>…</p></Reveal>` becomes `<AnimatedWords as="p" …>…</AnimatedWords>` — the `p`'s className moves onto `AnimatedWords`, the `Reveal` wrapper is dropped for that statement only. All other `Reveal`s stay.

- [ ] **Step 1: Story.tsx**

Add import:

```tsx
import AnimatedWords from '../components/AnimatedWords'
```

Replace the statement block (keep the following `/ Established since 2019` Reveal as-is):

```tsx
          <Reveal>
            <p className="max-w-4xl text-2xl sm:text-3xl md:text-[2.9vw] font-semibold leading-[1.18] tracking-[-0.02em]">
              <span className="text-ink">
                Ember started in 2019 with one secondhand 12-kilo drum and a simple rule,
              </span>{' '}
              <span className="text-ink/45">
                never roast more than we can ship in two days{' '}
                <span className="inline-flex items-baseline gap-1 align-baseline">
                  <AsteriskMark className="inline h-[0.7em] w-[0.7em] translate-y-[0.08em] text-ember" />
                  <AsteriskMark className="inline h-[0.7em] w-[0.7em] translate-y-[0.08em] text-ember" />
                </span>{' '}
                every lot is cupped, profiled, and roasted the same week it leaves the building.
              </span>
            </p>
          </Reveal>
```

with:

```tsx
          <AnimatedWords
            as="p"
            className="max-w-4xl text-2xl sm:text-3xl md:text-[2.9vw] font-semibold leading-[1.18] tracking-[-0.02em]"
          >
            <span className="text-ink">
              Ember started in 2019 with one secondhand 12-kilo drum and a simple rule,
            </span>{' '}
            <span className="text-ink/45">
              never roast more than we can ship in two days{' '}
              <span className="inline-flex items-baseline gap-1 align-baseline">
                <AsteriskMark className="inline h-[0.7em] w-[0.7em] translate-y-[0.08em] text-ember" />
                <AsteriskMark className="inline h-[0.7em] w-[0.7em] translate-y-[0.08em] text-ember" />
              </span>{' '}
              every lot is cupped, profiled, and roasted the same week it leaves the building.
            </span>
          </AnimatedWords>
```

Note: the two `AsteriskMark`s are leaf elements → each becomes one masked "word" and rises with the stagger. The `inline-flex` wrapper span survives cloning.

- [ ] **Step 2: Origins.tsx**

Add the same import. Replace:

```tsx
          <Reveal>
            <p className="px-4 pt-8 md:px-8 md:pt-12 max-w-xl text-xl md:text-2xl font-semibold leading-[1.25] tracking-[-0.02em]">
              <span className="text-ink">
                One buying trip a year to each origin. Grown by people we know by name
              </span>{' '}
              <span className="text-ink/45">— hover a row to see where your cup begins.</span>
            </p>
          </Reveal>
```

with:

```tsx
          <AnimatedWords
            as="p"
            className="px-4 pt-8 md:px-8 md:pt-12 max-w-xl text-xl md:text-2xl font-semibold leading-[1.25] tracking-[-0.02em]"
          >
            <span className="text-ink">
              One buying trip a year to each origin. Grown by people we know by name
            </span>{' '}
            <span className="text-ink/45">— hover a row to see where your cup begins.</span>
          </AnimatedWords>
```

If `Reveal` is now unused in Origins.tsx, remove its import (check — the origin list rows don't use Reveal).

- [ ] **Step 3: Wholesale.tsx**

Add the same import. Replace the big statement `<Reveal><p …>` (the one containing the double `AsteriskMark` span) with `AnimatedWords as="p"` carrying the same className — same mechanical transform as Story. Keep the two lower `Reveal`s (supporting copy + CTA).

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Expected: PASS

Real-time screenshot check of one representative section:

```bash
node -e "
const puppeteer = require('puppeteer-core');
(async () => {
  const b = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || '/usr/bin/chromium', args: ['--no-sandbox','--hide-scrollbars'] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto('http://localhost:5199/', { waitUntil: 'networkidle0' });
  await p.evaluate(() => document.getElementById('our-story').scrollIntoView());
  await new Promise(r => setTimeout(r, 1800));
  await p.screenshot({ path: '/tmp/words-story.png' });
  await b.close();
})();"
```

Read the screenshot. Expected: Story statement fully visible, two-tone colors intact, asterisk marks present, line wrapping natural.

- [ ] **Step 5: Commit**

```bash
git add src/sections/Story.tsx src/sections/Origins.tsx src/sections/Wholesale.tsx
git commit -m "feat: word-stagger statements in Story, Origins, Wholesale"
```

---

### Task 4: Headline + statement sections — Process, Roasts, Subscriptions

**Files:**
- Modify: `src/sections/Process.tsx`
- Modify: `src/sections/Roasts.tsx`
- Modify: `src/sections/Subscriptions.tsx`

**Interfaces:**
- Consumes: `AnimatedWords` from Task 1.

- [ ] **Step 1: Process.tsx — display headline + statement**

Add import. Replace both `Reveal` blocks in the "Oversized statement + intro" div:

```tsx
        <AnimatedWords
          as="h2"
          className="display whitespace-nowrap text-[13.5vw] md:text-[9vw] text-ink"
        >
          Roast<span className="text-ember">/</span>rest
          <span className="text-ember">/</span>ship.
        </AnimatedWords>
        <AnimatedWords
          as="p"
          delay={0.15}
          className="mt-8 md:mt-10 max-w-2xl text-xl md:text-2xl font-semibold leading-[1.25] tracking-[-0.02em]"
        >
          <span className="text-ink">
            Three verbs, one hard deadline — the calendar is part of the recipe.
          </span>{' '}
          <span className="text-ink/45">
            Nothing leaves the building that wasn't roasted, rested, and sealed inside the same
            week.
          </span>
        </AnimatedWords>
```

`whitespace-nowrap` is REQUIRED on the h2: `Roast`/`/`/`rest`… become adjacent inline-block masks, and line breaks are otherwise legal between adjacent inline-blocks. The headline is vw-sized to fit one line by design. Keep the spec-ledger `Reveal`s untouched.

- [ ] **Step 2: Roasts.tsx — ghost headline + two statements**

Add import. Replace the ghost headline `h2`:

```tsx
        <h2 className="display pointer-events-none relative z-10 select-none text-[11vw] text-white mix-blend-difference md:text-[7.5vw]">
          Three roasts. No endless menu.
        </h2>
```

with:

```tsx
        <AnimatedWords
          as="h2"
          className="display pointer-events-none relative z-10 select-none text-[11vw] text-white mix-blend-difference md:text-[7.5vw]"
        >
          Three roasts. No endless menu.
        </AnimatedWords>
```

Then convert the two statement paragraphs the same way as Task 3 (className moves to `AnimatedWords as="p"`, drop only that statement's `Reveal`):
1. The lineup-block statement ("Every bag is 250 grams…"). Its sibling `Reveal delay={0.1}` (lineup table) stays.
2. The right-column statement ("We believe a menu should be short enough…"). Give it `delay={0.15}` to preserve the existing choreography; the `Reveal delay={0.25}` around card 3 stays.

- [ ] **Step 3: Subscriptions.tsx — display headline + statement**

Add import. Replace the h2 `Reveal`:

```tsx
          <AnimatedWords
            as="h2"
            className="display whitespace-nowrap text-[12vw] md:text-[4.9vw] text-ink"
          >
            Fresh bags,
            <br />
            on your
            <br />
            rhythm<span className="text-ember">*</span>
          </AnimatedWords>
```

`whitespace-nowrap` keeps `rhythm` and its `*` mask on one line; the `<br/>`s still force the intended breaks (walk passes `<br/>` through unwrapped).

Replace the statement `Reveal delay={0.1}` with `AnimatedWords as="p" delay={0.1}` carrying the p's className (same mechanical transform). Keep the perks list, guarantee line, and delivery-panel `Reveal`s untouched.

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Expected: PASS

Screenshot Process and Roasts (same script pattern as Task 3, `scrollIntoView` on `#process` then `#roasts`, 1.8s settle each, `/tmp/words-process.png`, `/tmp/words-roasts.png`). Read both. Expected: "Roast/rest/ship." on ONE line with ember slashes; ghost headline still flips light where cards overlap it (mix-blend-difference intact); statements fully settled.

- [ ] **Step 5: Commit**

```bash
git add src/sections/Process.tsx src/sections/Roasts.tsx src/sections/Subscriptions.tsx
git commit -m "feat: word-stagger headlines and statements in Process, Roasts, Subscriptions"
```

---

### Task 5: Voices, FinePrint, Footer

**Files:**
- Modify: `src/sections/Voices.tsx`
- Modify: `src/sections/FinePrint.tsx`
- Modify: `src/sections/Footer.tsx`

**Interfaces:**
- Consumes: `AnimatedWords` from Task 1.

- [ ] **Step 1: Voices.tsx — quotes word-stagger, figures keep Reveal**

Currently one `Reveal` wraps each entire quote row. Word-staggering the quote inside a fading row would double the motion. Restructure: remove the row-level `Reveal`; the quote `p` becomes `AnimatedWords`; the figure/asterisk block gets its own `Reveal delay={0.15}`.

Add import. In the row, drop the `<Reveal>` wrapper (keep its inner `div` as-is), then replace the quote paragraph:

```tsx
                    <p className="text-2xl sm:text-3xl md:text-[2.45vw] font-semibold leading-[1.18] tracking-[-0.02em]">
                      <span className="text-ink">“{voice.lede}</span>{' '}
                      <span className="text-ink/45">{voice.rest}”</span>
                    </p>
```

with:

```tsx
                    <AnimatedWords
                      as="p"
                      className="text-2xl sm:text-3xl md:text-[2.45vw] font-semibold leading-[1.18] tracking-[-0.02em]"
                    >
                      <span className="text-ink">“{voice.lede}</span>{' '}
                      <span className="text-ink/45">{`${voice.rest}”`}</span>
                    </AnimatedWords>
```

The template literal `` `${voice.rest}”` `` is REQUIRED: as separate JSX children, the closing quote would become its own mask and could line-break away from the last word.

Wrap the `blockquote`'s `footer` in `<Reveal delay={0.2}>…</Reveal>`, and wrap the figure (and the no-image `AsteriskMark` fallback div) each in `<Reveal delay={0.15}>…</Reveal>` — when wrapping the figure/fallback, move their grid-position classNames (`col-span-12 mt-8 …` etc.) onto the `Reveal` via its `className` prop so the grid placement is preserved, since `Reveal` renders its own `motion.div`.

- [ ] **Step 2: FinePrint.tsx — display headline + guarantee statement**

Add import. Replace the h2 `Reveal`:

```tsx
            <AnimatedWords
              as="h2"
              className="display whitespace-nowrap text-[13vw] md:text-[5.2vw] text-ink"
            >
              Read it,
              <br />
              then relax<span className="text-ember">*</span>
            </AnimatedWords>
```

(`whitespace-nowrap` for the `relax` + `*` adjacency, same as Subscriptions.)

In the guarantee block (`Reveal delay={0.1}` stays wrapping the bordered div), replace only the inner statement `p` (`mt-4 text-lg md:text-xl …`) with `AnimatedWords as="p" delay={0.1}` carrying the same className — the label line above it and the CTA `Reveal delay={0.2}` stay untouched.

- [ ] **Step 3: Footer.tsx — newsletter headline**

Add import. Replace:

```tsx
          <p className="display max-w-md text-3xl md:text-4xl text-ink">
            Roast-day notes, once a week<span className="text-ember">.</span>
          </p>
```

with:

```tsx
          <AnimatedWords as="p" className="display max-w-md text-3xl md:text-4xl text-ink">
            Roast-day notes, once a{' '}
            <span className="whitespace-nowrap">
              week<span className="text-ember">.</span>
            </span>
          </AnimatedWords>
```

This headline wraps naturally (max-w-md), so no container-level nowrap — instead the `whitespace-nowrap` span keeps `week` and its ember period together. Note the explicit `{' '}` before the span. Leave the scroll-scrubbed closing wordmark and everything else untouched.

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Expected: PASS

Screenshot `#voices` and `#fine-print` (same pattern, 1.8s settle). Read them. Expected: quotes fully visible with curly quotes attached to first/last words; Voices figures/asterisks visible; FinePrint headline two lines with ember asterisk attached to "relax".

- [ ] **Step 5: Commit**

```bash
git add src/sections/Voices.tsx src/sections/FinePrint.tsx src/sections/Footer.tsx
git commit -m "feat: word-stagger Voices quotes, FinePrint headline, Footer newsletter headline"
```

---

### Task 6: Full-site verification sweep

**Files:**
- Create: `scripts/shot-words.cjs`

- [ ] **Step 1: Write the sweep script**

```js
/* Temporary visual-check script — safe to delete. Real-time (not virtual-time)
   because framer-motion reveals false-negative under virtual time. */
const puppeteer = require('puppeteer-core');

const SECTIONS = [
  'our-story', 'origins', 'process', 'roasts', 'voices',
  'subscriptions', 'wholesale', 'fine-print',
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_PATH || '/usr/bin/chromium',
    args: ['--no-sandbox', '--hide-scrollbars'],
  });
  const page = await browser.newPage();
  const out = process.argv[2] || '/tmp';
  await page.setViewport({ width: 1440, height: 900 });

  // 1) Normal pass — every section settled after scroll-into-view
  await page.goto('http://localhost:5199/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1800));
  await page.screenshot({ path: `${out}/words-0-hero.png` });
  for (const id of SECTIONS) {
    await page.evaluate((s) => document.getElementById(s).scrollIntoView(), id);
    await new Promise((r) => setTimeout(r, 1800));
    await page.screenshot({ path: `${out}/words-${id}.png` });
  }
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 1800));
  await page.screenshot({ path: `${out}/words-9-footer.png` });

  // 2) Reduced-motion pass — text must be fully visible immediately
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto('http://localhost:5199/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.getElementById('process').scrollIntoView());
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({ path: `${out}/words-rm-process.png` });

  await browser.close();
})();
```

- [ ] **Step 2: Run it and read every screenshot**

```bash
node scripts/shot-words.cjs /tmp/words-sweep
```

(Create `/tmp/words-sweep` first: `mkdir -p /tmp/words-sweep`.)

Read all 11 screenshots. Checklist per shot:
- All statement/headline text fully visible and legible (no stuck-hidden words).
- Line wrapping looks natural; no orphaned punctuation on its own line.
- No clipped descenders; asterisks/marks in ember, attached to their words.
- `words-rm-process.png`: full text visible at 300ms (reduced-motion = instant).

- [ ] **Step 3: Fix anything the sweep catches, re-run until clean**

If a shot fails the checklist, fix in the relevant section/component, `npm run build`, re-run the sweep. Do not skip re-reading the affected screenshots.

- [ ] **Step 4: Commit**

```bash
git add scripts/shot-words.cjs
git commit -m "chore: add real-time visual sweep script for word animations"
```
