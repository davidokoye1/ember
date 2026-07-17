import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import AnimatedWords from '../components/AnimatedWords'
import AsteriskMark from '../components/AsteriskMark'
import Eyebrow from '../components/Eyebrow'
import Reveal from '../components/Reveal'

const CADENCES = [
  { label: 'Every week', price: 16, interval: 1 },
  { label: 'Every 2 weeks', price: 17, interval: 2 },
  { label: 'Every month', price: 18, interval: 4 },
]

const PERKS = [
  'Roasted to order, never shelf stock',
  'Swap roasts or skip a delivery anytime',
  'Free shipping on every renewal',
  'Cancel in two clicks — no phone calls',
]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/* We roast Tuesdays (see 03 — The process), rest 48 h, and the bag lands
   Thursday. This lists the deliveries that rhythm produces over four weeks. */
function useDeliveries(cadence: number) {
  return useMemo(() => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const monday = new Date(today)
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7))

    const fmt = (d: Date) => `${DAY_NAMES[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`

    // Only promise this week's bag if Tuesday's roast hasn't happened yet
    const tuesday = new Date(monday)
    tuesday.setDate(monday.getDate() + 1)
    const firstWeek = tuesday >= today ? 0 : 1

    const deliveries: string[] = []
    for (let w = firstWeek; w < 4; w += CADENCES[cadence].interval) {
      const lands = new Date(monday)
      lands.setDate(monday.getDate() + w * 7 + 3)
      deliveries.push(fmt(lands))
    }

    return {
      deliveries,
      bags: deliveries.length,
      total: deliveries.length * CADENCES[cadence].price,
    }
  }, [cadence])
}

export default function Subscriptions() {
  const [cadence, setCadence] = useState(1)
  const reduceMotion = useReducedMotion()
  const { deliveries, bags, total } = useDeliveries(cadence)

  return (
    <section id="subscriptions" className="border-b border-ink">
      <div className="flex items-center justify-between border-b border-ink px-4 py-3 md:px-8">
        <Eyebrow index="06">Subscriptions</Eyebrow>
        <span className="pl-4 text-right text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
          Pause / swap / cancel anytime
        </span>
      </div>

      <div className="grid grid-cols-12">
        {/* Copy column */}
        <div className="col-span-12 md:col-span-5 flex flex-col border-b md:border-b-0 md:border-r border-ink px-4 py-10 md:px-8 md:py-12">
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

          <AnimatedWords
            as="p"
            delay={0.1}
            className="mt-6 max-w-md text-lg md:text-xl font-semibold leading-[1.3] tracking-[-0.01em]"
          >
            <span className="text-ink">Pick a rhythm and we put your address on the roast log.</span>{' '}
            <span className="text-ink/45">
              Your bag goes into the drum Tuesday morning, rests behind the valve, and lands with
              the roast date still fresh on the stamp.
            </span>
          </AnimatedWords>

          <Reveal delay={0.18}>
            <ul className="mt-8 flex flex-col gap-2.5">
              {PERKS.map((perk) => (
                <li
                  key={perk}
                  className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/55"
                >
                  <AsteriskMark className="h-2 w-2 shrink-0 text-ember" />
                  {perk}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.25} className="mt-auto pt-10">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/50">
              <AsteriskMark className="h-2.5 w-2.5 shrink-0 text-ember" />
              Crackle guarantee — first bag free if it isn't fresh
            </p>
          </Reveal>
        </div>

        {/* Plan column */}
        <div className="col-span-12 md:col-span-7 flex flex-col">
          {/* Cadence picker */}
          <div role="radiogroup" aria-label="Delivery cadence" className="grid grid-cols-3 border-b border-ink">
            {CADENCES.map((c, i) => {
              const selected = i === cadence
              return (
                <button
                  key={c.label}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setCadence(i)}
                  className={`flex flex-col items-start gap-1.5 border-r border-ink px-3 py-4 text-left transition-colors duration-200 last:border-r-0 md:gap-2.5 md:px-6 md:py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ember ${
                    selected ? 'bg-ink text-paper' : 'hover:bg-ink/[0.04]'
                  }`}
                >
                  <span
                    className={`text-[9px] font-semibold tracking-[0.1em] md:text-[10px] ${
                      selected ? 'text-ember' : 'text-ink/40'
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span className="text-xs font-semibold tracking-[-0.01em] md:text-base">{c.label}</span>
                  <span className="flex items-baseline gap-1.5">
                    <span className="display text-xl md:text-3xl">${c.price}</span>
                    <span
                      className={`text-[9px] font-semibold uppercase tracking-[0.14em] md:text-[10px] ${
                        selected ? 'text-paper/60' : 'text-ink/40'
                      }`}
                    >
                      / bag
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* Upcoming deliveries */}
          <div className="flex-1 px-4 py-8 md:px-8 md:py-9">
            <Reveal>
              <p className="pb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-ink/60">
                Your next four weeks — {bags} {bags === 1 ? 'delivery' : 'deliveries'}
              </p>

              <ol key={cadence} className="border-t border-ink">
                {deliveries.map((date, i) => (
                  <motion.li
                    key={date}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut', delay: reduceMotion ? 0 : 0.06 * i }}
                    className="flex items-center gap-4 border-b border-ink py-4 md:gap-6 md:py-5"
                  >
                    <span className="display text-xl text-ember md:text-2xl">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="display flex-1 text-2xl text-ink md:text-3xl">{date}</span>
                    <span className="hidden text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/45 sm:block">
                      {i === 0 ? 'First bag' : 'Free shipping'}
                    </span>
                    <AsteriskMark className="h-3 w-3 shrink-0 text-ember" />
                  </motion.li>
                ))}
              </ol>

              <p className="mt-3 flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/50 md:text-[10px]">
                <AsteriskMark className="h-2 w-2 shrink-0 text-ember" />
                Roasted Tuesday, rested 48 h, delivered Thursday
              </p>
            </Reveal>
          </div>

          {/* The math + CTA */}
          <div className="flex flex-col gap-6 border-t border-ink px-4 py-6 sm:flex-row sm:items-end sm:justify-between md:px-8">
            <div aria-live="polite">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/50">Adds up to</p>
              <p className="display mt-1.5 text-3xl text-ink md:text-4xl">
                {bags} {bags === 1 ? 'bag' : 'bags'} — ${total}
              </p>
              <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/45">
                Over the next four weeks, shipping included
              </p>
            </div>
            <button className="group inline-flex shrink-0 items-center gap-2 self-start bg-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-ink sm:self-auto">
              Subscribe — ${CADENCES[cadence].price}/bag
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
