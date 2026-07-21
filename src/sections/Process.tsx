import { Flame, Wind, Package } from 'lucide-react'
import AnimatedWords from '../components/AnimatedWords'
import AsteriskMark from '../components/AsteriskMark'
import Eyebrow from '../components/Eyebrow'
import ParallaxImage from '../components/ParallaxImage'
import Reveal from '../components/Reveal'
import processImg from '../assets/process-drum.webp'

const STEPS = [
  {
    icon: Flame,
    n: '01',
    title: 'Roast',
    lede: 'Small 12-kilo batches, profiled by ear and by curve.',
    rest: 'First crack decides the day, not the clock.',
    specs: ['12 kg max batch', 'First crack by ear', 'Drum, gas-fired'],
  },
  {
    icon: Wind,
    n: '02',
    title: 'Rest',
    lede: 'Every roast degasses for 48 hours before it ships.',
    rest: 'Coffee poured too early tastes like the roaster, not the farm.',
    specs: ['48 h degas', 'One-way valve', 'Sealed same week'],
  },
  {
    icon: Package,
    n: '03',
    title: 'Ship',
    lede: 'Sealed with a one-way valve and stamped with the roast date,',
    rest: 'then on a truck within two days. Always.',
    specs: ['48 h to courier', 'Roast date stamped', 'Never over 7 days old'],
  },
]

export default function Process() {
  return (
    <section id="process" className="border-b border-ink">
      <div className="flex items-center justify-between border-b border-ink px-4 py-3 md:px-8">
        <Eyebrow index="03">The process</Eyebrow>
        <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
          Fire, patience, a hard deadline
        </span>
      </div>

      {/* Oversized statement + intro */}
      <div className="px-4 py-10 md:px-8 md:py-14">
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
      </div>

      {/* Spec ledger */}
      <div className="border-t border-ink">
        {STEPS.map((step, i) => (
          <Reveal key={step.title} delay={0.08 * i}>
            <div className="group grid grid-cols-12 items-start gap-x-4 gap-y-5 border-b border-ink px-4 py-8 md:px-8 md:py-10 transition-colors duration-300 hover:bg-ember/[0.06]">
              {/* Index */}
              <span className="display col-span-3 md:col-span-1 pt-1 text-2xl md:text-3xl text-ember">
                {step.n}
              </span>

              {/* Title */}
              <div className="col-span-9 md:col-span-4 flex items-baseline gap-4">
                <h3 className="display text-5xl md:text-[4.6vw] text-ink">{step.title}</h3>
                <step.icon
                  className="hidden md:block h-6 w-6 shrink-0 self-center text-ink/35 transition-colors duration-300 group-hover:text-ember"
                  aria-hidden
                />
              </div>

              {/* Body — house two-tone */}
              <p className="col-span-12 md:col-span-4 max-w-md text-base md:text-lg font-semibold leading-[1.4] tracking-[-0.01em]">
                <span className="text-ink">{step.lede}</span>{' '}
                <span className="text-ink/45">{step.rest}</span>
              </p>

              {/* Spec tags */}
              <ul className="col-span-12 md:col-span-3 flex flex-wrap md:flex-col items-start md:items-end gap-x-5 gap-y-2 md:gap-y-1.5 md:pt-1 md:text-right">
                {step.specs.map((spec) => (
                  <li
                    key={spec}
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/55"
                  >
                    <AsteriskMark className="h-2 w-2 shrink-0 text-ember" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Photography strip */}
      <figure className="relative h-[42vh] md:h-[56vh] overflow-hidden">
        <ParallaxImage src={processImg} alt="Beans mid-roast inside the drum" />
        <figcaption className="absolute bottom-0 left-0 flex items-center gap-1.5 bg-ember px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-paper">
          <AsteriskMark className="h-2.5 w-2.5" />
          Fig. 03 — First crack, 196°
        </figcaption>
      </figure>
    </section>
  )
}
