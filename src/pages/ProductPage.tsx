import { ArrowLeft, ArrowUpRight, Minus, Plus, Check } from 'lucide-react'
import { useState } from 'react'
import AnimatedWords from '../components/AnimatedWords'
import AsteriskMark from '../components/AsteriskMark'
import Eyebrow from '../components/Eyebrow'
import Reveal from '../components/Reveal'
import Footer from '../sections/Footer'
import { ROASTS } from '../data/roasts'
import type { Roast } from '../data/roasts'
import { Link } from '../router'

function OtherRoastCard({ roast }: { roast: Roast }) {
  return (
    <Link to={`/roasts/${roast.slug}`} className="group block border border-ink">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={roast.img}
          alt={roast.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <span className="display text-2xl text-ink">
            {roast.name}
            <span className="text-ember">*</span>
          </span>
          <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/60">
            {roast.level} — {roast.dropTemp} — {roast.price}
          </p>
        </div>
        <ArrowUpRight className="h-4 w-4 text-ink/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ember" />
      </div>
    </Link>
  )
}

export default function ProductPage({ slug }: { slug: string }) {
  const roast = ROASTS.find((r) => r.slug === slug) ?? ROASTS[1]
  const others = ROASTS.filter((r) => r.slug !== roast.slug)
  const [qty, setQty] = useState(1)
  const [grind, setGrind] = useState<'Whole bean' | 'Ground'>('Whole bean')
  const [added, setAdded] = useState(false)
  const unitPrice = Number(roast.price.replace('$', ''))

  function addToCart() {
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <main key={roast.slug}>
      {/* Breadcrumb bar */}
      <div className="flex items-center justify-between border-b border-ink px-4 py-3 md:px-8">
        <Link
          to="/#roasts"
          className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/60 hover:text-ember transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All roasts
        </Link>
        <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
          Roasted to order — ships Tuesday
        </span>
      </div>

      <div className="grid grid-cols-12 border-b border-ink">
        {/* Image */}
        <div className="col-span-12 md:col-span-6 border-b md:border-b-0 md:border-r border-ink">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] md:aspect-auto md:h-full md:min-h-[80vh] overflow-hidden">
              <img src={roast.img} alt={roast.alt} decoding="async" className="absolute inset-0 h-full w-full object-cover" />
              <span className="absolute left-4 top-4 bg-ink px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-paper">
                {roast.level} roast — {roast.dropTemp}
              </span>
            </div>
          </Reveal>
        </div>

        {/* Details */}
        <div className="col-span-12 md:col-span-6 px-4 py-10 md:px-8 md:py-14">
          <Eyebrow index={`0${ROASTS.indexOf(roast) + 1}`}>The roast</Eyebrow>
          <AnimatedWords as="h1" className="display mt-6 text-6xl md:text-8xl text-ink">
            {roast.name}
          </AnimatedWords>
          <p className="mt-3 text-sm font-semibold tracking-[0.02em] text-ember">{roast.notes}</p>

          <AnimatedWords as="p" delay={0.1} className="mt-8 max-w-lg text-lg font-semibold leading-[1.35] tracking-[-0.01em] text-ink">
            {roast.story}
          </AnimatedWords>
          <p className="mt-4 max-w-lg text-sm leading-[1.7] text-ink/60">{roast.cup}</p>

          {/* Purchase */}
          <Reveal delay={0.15}>
            <div className="mt-10 max-w-lg border border-ink">
              <div className="flex items-center justify-between border-b border-ink px-4 py-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/60">Grind</span>
                <div className="flex gap-1">
                  {(['Whole bean', 'Ground'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGrind(g)}
                      aria-pressed={grind === g}
                      className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors ${
                        grind === g ? 'bg-ink text-paper' : 'text-ink/60 hover:text-ember'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    aria-label="Decrease quantity"
                    className="flex h-7 w-7 items-center justify-center border border-ink text-ink/70 hover:text-ember hover:border-ember transition-colors"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-6 text-center text-sm font-bold">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(Math.min(9, qty + 1))}
                    aria-label="Increase quantity"
                    className="flex h-7 w-7 items-center justify-center border border-ink text-ink/70 hover:text-ember hover:border-ember transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/50">
                    × {roast.weight}
                  </span>
                </div>
                <span className="display text-2xl text-ink">${(unitPrice * qty).toFixed(2)}</span>
              </div>
              <button
                type="button"
                onClick={addToCart}
                className="group flex w-full items-center justify-between bg-ember px-4 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-paper hover:bg-ink transition-colors"
              >
                {added ? (
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4" strokeWidth={3} /> Added — roasting yours Tuesday
                  </span>
                ) : (
                  <span>Add to order — {grind.toLowerCase()}</span>
                )}
                <ArrowUpRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </Reveal>

          <p className="mt-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/50">
            <AsteriskMark className="h-2.5 w-2.5 text-ember" />
            Free shipping over $30 — first-bag guarantee applies
          </p>
        </div>
      </div>

      {/* Roast log */}
      <section className="border-b border-ink">
        <div className="flex items-center justify-between border-b border-ink px-4 py-3 md:px-8">
          <Eyebrow index="i">The roast log</Eyebrow>
          <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
            Printed on every bag
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3">
          {roast.stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.05}
              className="border-b border-r border-ink px-4 py-6 md:px-8 md:py-8"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/50">{s.label}</p>
              <p className="display mt-2 text-2xl md:text-3xl text-ink">{s.value}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Brew recipe strip */}
      <section className="border-b border-ink bg-ink text-paper">
        <div className="grid grid-cols-12 items-center gap-y-6 px-4 py-10 md:px-8 md:py-12">
          <div className="col-span-12 md:col-span-5">
            <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-paper/60">
              <AsteriskMark className="h-2.5 w-2.5 text-ember" />
              How we brew it
            </p>
            <p className="display mt-3 text-3xl md:text-4xl">{roast.brew.method}</p>
          </div>
          <div className="col-span-12 md:col-span-5 grid grid-cols-3 gap-4">
            {[
              ['Dose', roast.brew.dose],
              ['Water', roast.brew.water],
              ['Time', roast.brew.time],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-paper/50">{label}</p>
                <p className="mt-1 text-sm font-bold">{value}</p>
              </div>
            ))}
          </div>
          <Link
            to="/brew-guides"
            className="group col-span-12 md:col-span-2 flex items-center justify-between gap-2 border border-paper/30 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] hover:border-ember hover:text-ember transition-colors"
          >
            Full brew guides
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>

      {/* Other roasts */}
      <section className="border-b border-ink px-4 py-10 md:px-8 md:py-14">
        <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/50">
          <AsteriskMark className="h-2.5 w-2.5 text-ember" />
          The other two
        </p>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {others.map((r, i) => (
            <Reveal key={r.slug} delay={i * 0.1}>
              <OtherRoastCard roast={r} />
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
