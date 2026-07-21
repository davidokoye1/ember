# Ember → Framer Migration — Handoff Plan (continue from Stage 4)

**Purpose of this file:** Complete state + plan so a fresh Claude Code session can continue the migration exactly where the last session stopped. Read this whole file before touching the project.

---

## 1. Project & Working Setup

- **Source site:** `/home/okoye/motionsites2` — Vite + React + Tailwind coffee-roastery site "Ember". Sections in `src/sections/`, components in `src/components/`, data in `src/data/roasts.ts`, images in `src/assets/`.
- **Framer project:** `https://framer.com/projects/Ember--lM1DP5ZoLspP90GnKE0F-aQwUE` (project id `lM1DP5ZoLspP90GnKE0F`).
- **Bridge:** Framer External Agent CLI. **Session 1 is the working session** (session 13 died when the relay restarted mid-Stage-5b; state was restored into session 1 via `/tmp/framer/restore-state.js` pattern):
  ```bash
  npx @framer/agent@latest exec -s 1 -f /tmp/framer/<script>.js   # run script
  npx @framer/agent@latest exec -s 1 -e '<inline js>'             # one-liner
  ```
  Run with `dangerouslyDisableSandbox: true` (needs network). If the session dies, create a new one (`npx @framer/agent@latest session new lM1DP5ZoLspP90GnKE0F` — prints the new session number), then rebuild `state` from §3 of this file (paste the IDs into `state` via an exec script). NOTE: `/tmp` does NOT persist between Claude shell calls — write exec scripts and run them in the SAME bash invocation.
- **Framer skill docs:** `~/.claude/skills/framer/projects/lM1DP5ZoLspP90GnKE0F/` — `index.md` is the task map; `prompt/how-projects-work.md` has CMS/components/breakpoints/icons; `prompt/updating-the-project.md` has full DSL attribute reference. Guides via `framer.agent.readProject([{type:"implementation-guide-from-index",name:"<Name>"}])`.
- **Workflow per change:** write exec script to `/tmp/framer/` → `applyChanges(dsl, {pagePath})` → `reviewChanges()` (fix silently) → screenshot (`readProject([{type:"screenshot",id}])`, download to `~/tmp-shots/`, Read it) → verify visually vs source.
- **User process requirement:** build stage by stage; **present each stage for review/approval before continuing**. Compare screenshots against the real site (dev server runs at `:5199` via `npm run dev` in the source repo if needed).

## 2. Approved Plan & Progress

Chosen approach: **Hybrid** — canvas-native layout/colors/text styles + Framer appear effects; code components ONLY for AnimatedWords, ParallaxImage, Marquee ticker, theme toggle (Stage 7). Sellable-template quality is the goal.

- ✅ **Stage 1 (approved):** Design system — 8 color tokens (light+dark), 13 text styles + Link style, `/style-guide` page.
- ✅ **Stage 2 (approved):** Eyebrow, Button (form-submit), CTA Button (+Down/Up-Right variants), Main Layout template (sticky TopBar + full Footer) with Desktop/Tablet/Phone breakpoints, dark-mode verified.
- ✅ **Stage 3 (approved with fixes):** Hero, Marquee band (static), Story, Roasts w/ CMS collection + Roast Card component. User made me fix: card aspect 3:4 (needs fixed height + aspectRatio), ghost-headline overlap (absolute + `blendingMode="difference"`), hairline table borders.
- ✅ **Stage 4 (approved):** Origins, Process, Subscriptions, Wholesale — positions 3,4,6,7 on `WQLkyLRf1`. Anchors + nav/footer hrefs re-applied and verified.
- ✅ **Stage 5 sections (approved):** Voices at position 6 + FinePrint at position 9 (see §3a below).
- ⏳ **Stage 5b (BUILT, awaiting user approval):** Home page Tablet (810) / Phone (390) breakpoints for all 10 sections. Home `$breakpoints`: Desktop `WQLkyLRf1` (primary), **Tablet `dg1uEqY7f`**, **Phone `WY5zHassK`** (in `state.bp`). Tablet keeps desktop layout (source `md:` ≥768 still applies at 810) with vw-derived type recomputed ×810; Phone = source base classes: grids→vertical stacks, md-only nodes hidden (origins metas+image panel, process check icons, lineup drop/proc/notes cols, voices rules/spacers, delivery tags), phone type sizes, side metas width 170px right-wrapped. Text presets already had medium/small breakpoint slots from Stage 1 — only inline-sized (vw one-off) nodes needed compound-id overrides. Screenshots: `~/tmp-shots/bp-tablet-final.jpg`, `bp-phone-final.jpg`; source refs `src-810.png`, `src-390.png` (dev server now on **:5174**, not :5199).
- **Stage 6:** Subpages — Roast detail (CMS detail page `/roasts/:slug`), Brew Guides `/brew-guides`, Visit `/visit`.
- **Stage 7:** Motion/code pass — Marquee ticker (drift + scroll-velocity skew), AnimatedWords (per-word clip-mask rise), ParallaxImage (hero photo pan, footer wordmark rise), theme toggle button in TopBar; then template polish for Marketplace resale.

## 3. Canonical IDs (session-13 `state` mirror)

**Pages:** home `augiA20Il` (desktop breakpoint `WQLkyLRf1`, `layoutTemplate` = Main Layout), `/style-guide` `O7HiQfZMJ` (root `HGsPZgZrb`).

**Color tokens** (use as `var(--token-<id>)`):
| token | id |
|---|---|
| Paper | `2f19d2d2-d655-4664-8761-ee05a8a4af6c` |
| Ink | `af8cf7a6-e96f-4328-a709-b866aedec430` |
| Ember | `6211dc45-0b06-4ff1-9d14-1375a91ea3d1` |
| Ink 70 | `2c79c051-12d7-4859-84fd-e24394cc9ab2` |
| Ink 60 | `388f5275-2387-4d29-863a-cc981cec14b2` |
| Ink 45 | `8578d0be-e82b-496e-b16f-67d4ad5de840` |
| Ink 35 | `5fc1eda2-0fa3-4925-9874-b1c0a0760c43` |
| Hairline (ink 30%) | `b2bee6b2-40f0-4a2c-bd9a-f9efb17f0461` |

**Text style presets** (use `textStylePreset="<name>"`): Display/Hero `TjQ2gRwEU`, Display/1 `gPwij0KIh`, Display/2 `jV9HXjcXi`, Display/3 `Y2DXLFIdK`, Display/4 `YjAMaekEg`, Lead `orf7g8SI0`, Body/Large `NSc7MAGuM`, Body/Regular `ZdxURH0dG`, Body/Muted `hnLW9vRB2`, Label/Eyebrow `zplqZpAYw`, Label/Meta `WmHHt5IM3`, Label/Micro `a3v4H2Zbf`, Label/Button `OFR9SLC_1`. Link style preset: `Link` (`clWwgbx5q`), base ink70 → hover ember.

**Components:**
- Eyebrow `mDv_Bjcin` — controls `$control__index` ("(NN)"), `$control__label`.
- Button `ZBkOmYqdv` (root `cpbO4VAUH`, htmlTag=button, NO link — used as form submit).
- CTA Button `C0GpEDO4s` (root `uyZ6bVBvq`, arrow node `K0o_lV4sg`) — controls `$control__label`, `$control__link`, `$control__icon`; variants: Default(Arrow Right) / Down `AmSTJz4ks` / Up Right `obYTf5HgL` via `$control__variant`.
- Roast Card `ijxZ1WybV` (root `K_9kWpNa1`, media `VE675qzYT` h=480px ar=0.75, bar `Q9vd5vdfl`, hover gesture `K_gxPawOh`) — controls `$control__name/notes/meta/shopLabel/link/image`.

**Main Layout template** `Fof05OwcA`: Desktop `CrgoTdT95`, Tablet `fhvAQPNiw`, Phone `yvvD5xlyc`. TopBar nav `paCXmPXFT` (links wrap `ZxALN1UQx`, hidden on phone; l1 Story `vsox2np6R`, l2 Origins `oJpTM2ICU`, l3 Roasts `Piht3SXOc`, l4 Brew guides `j5XxB2wUZ`, l5 Visit `k55XzfRNR`, l6 Subscribe `guemy1UgT`, l7 Wholesale `pqrBeOhfa`; order link `e0ZC38ym5`). Footer root `GvAS07U_l`: menu links `f8RCZe14M`(story) `Ney1mYtAb`(origins) `icv2AKgsp`(process) `byIpQzPWr`(roasts) `qhqEThPWW`(brew) `jiBjUVqqO`(visit) `e6RiMwAQQ`(subs) `IPpkPRPl3`(wholesale) `pKJnCJNYn`(fineprint); form `MMPr8CN74`, email `aI3LwG9LJ`, submit `ns5zOP1Kc`, wordmark `tXqHi4FVq`.

**Home sections built:** Hero `UHl5vp8ct` (mark `ulj5KpIxI`, meta `NtGjbY_I8`, stmt `Qpijv6WrC`, cta `YCC6MkZRP`, photo `kxEebzzQY`), Marquee `CoI75fyuu` (track `gwmxPFWxy`), Story `KbaQVAl8i` (elementId=our-story), Roasts `BDhtaObJ9` (elementId=roasts; ghost `bRWzf6iRr` absolute top=77px blendingMode=difference; grid `aFGWBxEgS`; cards `nxOi36aDV`/`J_YX2by3I`/`nJmJVJxbc`; CMS list `l9r59rWTq` row `xrWwEag2R`; gutter spacer `m71EzNQnD` span-1 between left-7 and right-4 columns — DSL has no gridItemColumnStart, this fakes source's `md:col-start-9` so the right column sits flush right).

**Stage 4 sections built** (all ids in session-13 `state.origins/.process/.subs/.wholesale`):
- Origins `fU9BEiSI1` (elementId=origins, position 3): label `zhcD0v7Jh`, grid `uutThN_vb`, left `yZ1VqdyvJ`, intro `L6qE5pbqW`, rows `m_gOAdwJT`(Ethiopia active/inverted)/`LwscZexbi`/`tkS2UfkUj`/+Kenya, image panel Ethiopia w/ Fig caption. Static rows (hover states = Stage 7 code/variants if wanted).
- Process `aMogNH_OG` (elementId=process, position 4): headline `kqHfwgZHC` (Roast/rest/ship. 108px, ember slashes as TextRuns), sub `tLlPo4mHv`, ledger `YdtbsR4YO` w/ 3 grid rows (titles 55px), photo strip `fill=processDrum h=560px` + ember Fig caption.
- Subscriptions `eqiL_VQ4h` (elementId=subscriptions, position 6 — position 5 left free for Voices): copy col `L7Fof1VWL` (headline `eCyLsEd1Q` 59px 3 TextBlocks, para, perks, spacer, guarantee), plan col `state.subs["su-plan"]` h=100%: picker (3 cells, middle inverted), deliveries (static "Thu, Jul 23"/"Thu, Aug 6" — computed for build date; dates are dynamic in source, static in Framer), math row + ember Subscribe CTA.
- Wholesale `MnVlcFNaO` (elementId=wholesale, position 7): copy `uL1z9Vy3C` (35px two-tone stmt w/ ** ember; stackDistribution=start gap=64px height=auto — NOT space-between/1fr, that stretched the section), bottom note+CTA (mailto), image panel `fzssGdbni` height=100% NO minHeight (copy column drives section height, as source md: does) + ink Fig caption.

**Stage 5 sections built** (ids in session-13 `state.voices/.faq/.fineprint`):
- **Voices** `akGEER9wI` (elementId=voices, position 6 — after Roasts, before Subscriptions; home child order now: Hero, Marquee, Story, Origins, Process, Roasts, **Voices**, Subscriptions, Wholesale, **FinePrint**): label row `ODAkZPj9M` (eyebrow (05) + "4.9 / 5" meta), 3 quote rows `KPDdwQCZS`/`g5KNnuYrh`/`s0jf0AHSm` — each 12-col grid (quote span-8, gutter span-1, figure span-3; row 2 mirrored) + absolute hairline rule (`luVqaY1bA` left=828px, `j0cMmrXZO` 348px, `StkXAa1Dd` 828px — **percent left on absolute nodes is silently reverted, use px** computed for 1200 canvas). Quote RichTextNodes `fcTf8PGyN`/`SUWv0F0MO`/`Svi_mU5Wf`, attributions `Z0yiFBs_c`/`NtqsVqjk4`/`wOW5zVezb`. Row-3 asterisk mark `BTPk7mS8i` 190px. Photos ar=1.3333 h=204px hairline border.
- **FAQ components** (5×, Closed primary + Open variant): item roots `MrcHkNoDU`/`J_rxsZQPM`/`uGRKOW66i`/`hD8qlDbHN`/`AbFnDCKMF`; variants Closed `W2_9qKcoq`/`Ko3h9wE3a`/`OR7Yw1ayT`/`KfcF5FcyV`/`wH33avmCH`, Open `gtGL9YhW5`/`GhNkOWtRj`/`Ry6B4wBjr`/`AhIF6lk5d`/`JpAOiqH4M`. Header row onTap SET_VARIANT cycle; Open: answer visible, number+Plus→ember, Plus rotated 45°. **Variant-root pitfalls:** width must be fixed px (700px, not 1fr/%), transition string needs explicit delay ("tween 0.16,1,0.3,1 0.45s 0s"), give variants paper fill. Set instance variant via `$control__variant="Open"` (plain `variant=` no-ops).
- **FinePrint** `sLRmp7Url` (elementId=fine-print, position 9, last before footer): label row `yJNwjf5nr` (eyebrow (08)), grid `FlxpQiho3` = guarantee rail span-5 `tCt9w7756` (border-right; display headline `eIY712fj_` 62px "Read it,/then relax*"; crackle guarantee panel `GTpTrULWU` border-top maxWidth=448; CTA `CaqMeYvBh` → /#subscriptions) + accordion col span-7 `ChGv46Cdu` w/ 5 rows (`EwfRJ09g2`… instances `SXS6Yyxs7`/`By6PYr7Is`/`egxybOek9`/`r3ZeBYGuq`/`pvU6vkmjr`; item 1 set Open; rows 1-4 have ink borderBottom). Footer fine-print link `pKJnCJNYn` → `/#fine-print` applied.
- Stage 5 uploads: voicesStamp `https://framerusercontent.com/images/phnN0BJ8cTbkcTYLnYMxyQs0E.png`, voicesCafe `https://framerusercontent.com/images/o67KWkMgq5yRt9p1xeV33gklFNM.png` (in `state.img`).
- **New pitfall (#22):** inline `text=` in a long +RichTextNode SET can be dropped (renders TextLineBreak only) — always create `+TextBlock` + `+TextRun` then `SET <run> text="..."` in a separate statement.

 `uOSVlWZbL`, items Dawn `n_AO20Mgy` / Ember `bj66I3Abr` / Char `aGylYPg7q`. Item keys: `$control__name/slug/level/drop_temp/notes/lots/process/weight/price/bag_image/story/in_the_cup/brew_method/brew_dose/brew_water/brew_time/roast_time/development/altitude/varietals/best_within`. Variable ids (for `var(--variable-<id>)` bindings): Name `qqzYogCXE`, Slug `endZcs4o9`, Level `fBLZH9HcU`, Drop Temp `FLWjwrLbq`, Notes `QLShNIeNf`, Lots `znBhYcZaQ`, Process `x9BOhcTWW`, Weight `cFrmYaW8z`, Price `FKUKmcCNT`, Bag Image `l_MN3WLtt`, Story `okVLX9gw1`, In The Cup `pnuq2CAHy`, Brew Method `cCh4ki3q8`, Brew Dose `ec8Ka5CRD`, Brew Water `tRpM7Vx8U`, Brew Time `hKtoJhMl0`, Roast Time `XRebR86xB`, Development `E9vd8ctTK`, Altitude `ilxStO0WO`, Varietals `q24GWfyww`, Best Within `ytr5sSb9s`.

**Uploaded images** (framerusercontent URLs, reuse — do NOT re-upload):
- hero → `https://framerusercontent.com/images/TyrOelA0cNtWagwqNbVecsuo.png`
- story → `https://framerusercontent.com/images/ZIpdXEtbCuTMNYYmjNQkazT00.png`
- bagDawn → `https://framerusercontent.com/images/gqsvTAwuUW1tAIKCOCZraHo5Wo.png`
- bagEmber → `https://framerusercontent.com/images/R7d5kSmUi0MZ4SwgiASfVOhC4uk.png`
- bagChar → `https://framerusercontent.com/images/BhiRFyYHA5xtbf3VPmugC7grGRU.png`
- STILL TO UPLOAD from `src/assets/`: any used by Voices/FinePrint/Visit/BrewGuides (`voices-cafe.png`, `voices-stamp.png`, `sub-pour.png` if needed). Upload via `framer.uploadImage({ image: "data:image/png;base64,<b64>", name, altText })` — the bytes/Uint8Array form FAILS, use data URI. NOTE: agent sandbox can't read the repo — `cp` assets to `/tmp/framer/assets/` first.
- Stage 4 uploads done: orEthiopia `https://framerusercontent.com/images/IrFB1zU2WOo4u2nBV1b3UnHfkgI.png`, orColombia `https://framerusercontent.com/images/RJFTYGww9vxMPDFghRE4m9HNeM.png`, orGuatemala `https://framerusercontent.com/images/2XDU1EMZ5lPovVcVgvfUDLgNLDw.png`, orKenya `https://framerusercontent.com/images/V6y2i6XhsHoS44rokqR4RZe8.png`, processDrum `https://framerusercontent.com/images/w9fZhIVRWJllrZhx2Q6tyqUZ7pI.png`, wholesaleCafe `https://framerusercontent.com/images/xxIS8kTCQUAsEu16B3FvgRAjCI.png` (all in `state.img`).

## 4. Hard-won DSL pitfalls (READ — these cost hours)

1. **Silent rejections:** `applyChanges` can return "applied" while dropping attributes. ALWAYS `reviewChanges()` and look for `[rejected]` warnings, then `getNode` to verify critical values stuck.
2. **Hash links:** target section MUST first have `scrollTargetEnabled="true" elementId="<slug>" scrollMarginTop="48px"`, else `link.href="/#slug"` silently degrades to `/`. Sections still needing anchors when built: origins, process, subscriptions, wholesale, fine-print. After creating them, re-apply hrefs on TopBar links (l2 `oJpTM2ICU`, l6 `guemy1UgT`, l7 `pqrBeOhfa`) and footer menu links (`Ney1mYtAb` origins, `icv2AKgsp` process, `e6RiMwAQQ` subs, `IPpkPRPl3` wholesale, `pKJnCJNYn` fine-print) and order link `e0ZC38ym5` → `/#subscriptions`.
3. **aspectRatio** needs non-auto height: `height="480px" aspectRatio="0.75"`.
4. **Blend mode** attr is `blendingMode` (not blendMode). For overlap effects: negative margins are DROPPED — use absolute positioning over a shortened spacer (see ghost headline) or padding offsets.
5. **TextRun can't bind variables** — bind on RichTextNode `text=`; two-tone bound text = horizontal stack of two RichTextNodes.
6. **Instance controls use camelCase keys** from variable names (`$control__shopLabel`, not `$control__shop_label`); set instance controls in SMALL statements (one instance per SET) — long multi-attr SETs on instances silently no-op.
7. **+ColorStyleTokenNode / +CollectionNode** need `name` inline in the `+` statement.
8. **+Divider** in collections needs `scope` not `parent` (cosmetic; skip if it errors).
9. **RichTextNode**: no `padding`; when `textStylePreset` set, inline font attrs are ignored (preset wins) — for one-off sizes drop the preset and set fonts manually.
10. **Form submit** = Button component with `htmlTag="button"` on ALL variants and NO link; form frame `htmlTag="form" formSubmitButtonId="<instance-id>"`.
11. **stackDistribution space-between** ignores `gap`; stack has no `baseline` alignment (use center).
12. **Screenshots lag** a few seconds after applyChanges — re-request if stale.
13. Display type recipe (matches `.display`): Archivo `fontWeight="800" fontVariationAxes.wdth="112" lineHeight="0.86em" textTransform="uppercase"` + letterSpacing = −0.04em in px (fontSize × −0.04).
14. Appear effects: `appearEffect.trigger="onInView" appearEffect.threshold="0.2" appearEffect.enter.y="28" appearEffect.enter.opacity="0" appearEffect.enter.transition="tween 0.16,1,0.3,1 0.8s <delay>s"` mirrors source Reveal. Hero uses trigger onLoad→ stored as onMount.
15. Icons: Lucide set; names "Asterisk", "Arrow Right", "Arrow Down", "Arrow Up Right", "Instagram", "Menu", "X", "Check", "Moon", "Sun", "Flame", "Wind", "Package". Controls: `$control__icon`, `$control__color`, `$control__width` (stroke, use 2.5).
16. **Ink 35 token is broken on IconNode `$control__color`** — icon renders invisible. Use Ink 45 token instead (verified renders). Ember/paper/ink60/ink45 all work.
17. **vw-based type**: source uses vw sizes at 1440 viewport; Framer desktop canvas is 1200px — compute px from 1200 (e.g. 9vw → 108px), letterSpacing = fontSize × −0.04.
18. **margins on stack children are dropped** (marginTop etc.) — use parent `gap`, spacer frames, or padding.
19. **Literal `\n` in TextRun text does NOT line-break** — one TextBlock per line inside the RichTextNode.
20. **DEL not DELETE** is the DSL delete command; virtual TextBlock ids (`v:<id>:0`) can't be DEL'd — DEL the RichTextNode and rebuild.
21. To clear an attribute set earlier, `attr=null` — setting `minHeight="0px"` or `"auto"` does NOT clear it.
23. **Replica grids overflow at narrow widths:** inherited 12-col grids keep a per-column min width; at 390/810 the grid overflows and center-clips content. Fix: `gridColumnMinWidth="1px"` on EVERY multi-col grid in Tablet/Phone replicas.
24. **`height="1fr"`/`"100%"` children collapse in re-stacked replicas:** nodes that were grid children (st-rail, su-plan, su-del) keep 1fr/100% height when their replica parent becomes a vertical stack → content overlaps sections below. Set `height="auto"` in the replica.
25. **Nowrap label-row metas overflow the phone frame** (and widen screenshot canvas beyond width×1.25 — that's the overflow tell). Fix: fixed `width` + `textAlign="right"` so they wrap.
26. **Right-aligned text in fixed-width columns overflows leftward** unless the RichText children get `width="100%"`; horizontal wraps (level—temp) need `stackWrapEnabled="true"` on the wrap frame.
27. Phone screenshot canvas = 390×1.25 = 487px when clean; wider canvas ⇒ something still overflows horizontally.

## 5. Stage 4 build spec (NEXT — read source files first)

Source files: `src/sections/Origins.tsx`, `Process.tsx`, `Subscriptions.tsx`, `Wholesale.tsx`. Read each fully before building. Structure summary:
- **Origins** (`id=origins`, eyebrow 02): 4 origin cards (Ethiopia/Kenya/Colombia/Guatemala photos) with country, region, altitude, notes — check source for exact layout (likely CMS-worthy → create "Origins" collection, 4 items, collection list). Images need upload first.
- **Process** (`id=process`, eyebrow 03): numbered steps (source/roast/rest/ship style) + `process-drum.png`; hairline-ruled rows w/ display numerals.
- **Subscriptions** (`id=subscriptions`, eyebrow 05): plan cards w/ pricing, "most popular" flag, feature lists, CTA per plan. Candidate for "Plans" CMS collection or component w/ variants.
- **Wholesale** (`id=wholesale`, eyebrow 06): shorter band — statement + contact CTA (mailto) + maybe stats.
Sequence: read sources → upload images → (collections if list-like) → build each section appended to `WQLkyLRf1` in order (positions 4,5,6,7 — after Roasts, before layout-template footer takes over) → anchors + re-link nav (§4.2) → reviewChanges → screenshot each vs original (dev server or source read) → present to user, WAIT for approval.

## 6. Stage 5–7 notes

- **Stage 5:** `Voices.tsx` (testimonial cards; "Voices" CMS collection) + `FinePrint.tsx` (`id=fine-print`; FAQ accordion — use FAQ component pattern from core-examples: Open/Closed variants + `onTap.0.action="SET_VARIANT" onTap.0.controls.variant="cycle"`; + guarantee panel). Then home page Tablet/Phone breakpoints for ALL sections (home page currently has NO tablet/phone breakpoints — create per §Creating Replica Variants: Tablet 810, Phone 390, adapt grids to source's md/sm behavior).
- **Stage 6:** Roast detail page `/roasts/:slug` — WebPageNode with `path="/roasts/:slug"` bound to Roasts collection (read how-projects-work §CMS detail pages + guide "CMS Detail Pages"); layout from `src/pages/RoastDetail.tsx` (check exact filename in `src/`). Brew Guides + Visit pages from their source files; add both to nav targets (`/brew-guides`, `/visit` links already exist in TopBar/Footer).
- **Stage 7:** Code components (agreed set): Marquee ticker (port `Marquee.tsx` physics: BASE_SPEED 1.7%/s, scroll velocity ±4x factor, skew ±4deg, direction flips with scroll), AnimatedWords (per-word clip rise 0.6s stagger ≤0.04 cap 0.9s), ParallaxImage (image 128% h, top −14%, y −10%↔10% scrub), ThemeToggle (Moon/Sun 7×7 rounded border button; wire to Framer's appearance or localStorage `.dark` equivalent). Insert into: marquee band (replace static track), hero photo + footer/hero wordmarks, display headlines, TopBar right slot. Then Marketplace polish: name layers cleanly, component descriptions, remove style-guide scratch, final QA light+dark, all breakpoints.

## 7. User preferences observed

- Wants 1:1 fidelity to source; compares screenshots side-by-side and catches proportion/border-weight differences — verify against the real site before presenting.
- Approves quickly when shown accurate screenshots; asks for fixes with annotated images when not.
- Wants efficiency (token-conscious; RTK proxy in shell) and clean reusable structure (Marketplace template resale).
- Ask for evaluation after every stage; do not run ahead.
