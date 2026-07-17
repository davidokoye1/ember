import { ArrowUpRight, ArrowDown } from 'lucide-react'
import AnimatedWords from '../components/AnimatedWords'
import AsteriskMark from '../components/AsteriskMark'
import Eyebrow from '../components/Eyebrow'
import Reveal from '../components/Reveal'
import storyImg from '../assets/story-roastery.png'

export default function Story() {
  return (
    <section id="our-story" className="border-b border-ink">
      {/* Label row */}
      <div className="flex items-center justify-between border-b border-ink px-4 py-3 md:px-8">
        <Eyebrow index="01">Our story</Eyebrow>
        <span className="flex items-center gap-1.5 text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
          scroll down
          <ArrowDown className="h-3 w-3" />
        </span>
      </div>

      <div className="grid grid-cols-12 gap-x-4 px-4 py-14 md:px-8 md:py-20">
        {/* Statement */}
        <div className="col-span-12 md:col-span-9">
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

          <Reveal delay={0.15}>
            <p className="mt-10 md:mt-14 text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em] text-ink/70">
              / Established since 2019
            </p>
          </Reveal>
        </div>

        {/* Right rail — image thumb + supporting copy */}
        <div className="col-span-12 md:col-span-3 mt-10 md:mt-0 flex flex-row md:flex-col items-start justify-between md:items-end gap-6">
          <Reveal delay={0.1}>
            <figure className="w-36 md:w-44">
              <img
                src={storyImg}
                alt="Our drum roaster at dusk, surrounded by burlap sacks of green coffee"
                className="aspect-square w-full object-cover"
              />
              <figcaption className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/50">
                <AsteriskMark className="h-2.5 w-2.5 text-ember" />
                The drum, 6:42 am
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.2} className="md:mt-auto">
            <div className="flex flex-col items-start md:items-end gap-4 md:text-right">
              <p className="max-w-[16rem] text-xs md:text-sm leading-[1.6] text-ink/60">
                We buy from eleven farms across four countries, and we pay well above the commodity
                price — a roast can only be as honest as the contract behind it.
              </p>
              <a
                href="#origins"
                className="group inline-flex items-center gap-2 bg-ember px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-paper hover:bg-ink transition-colors"
              >
                More about us
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Stats rule row */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-ink">
        {[
          ['11', 'Partner farms'],
          ['04', 'Origin countries'],
          ['48h', 'Roast to ship'],
          ['12kg', 'Batch maximum'],
        ].map(([value, label], i) => (
          <div
            key={label}
            className={`flex items-baseline gap-3 px-4 py-4 md:px-8 ${i > 0 ? 'border-l border-ink' : ''}`}
          >
            <span className="display text-2xl md:text-3xl text-ink">{value}</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/50">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
