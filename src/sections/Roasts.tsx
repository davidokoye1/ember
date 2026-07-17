import { ArrowUpRight } from 'lucide-react'
import AnimatedWords from '../components/AnimatedWords'
import AsteriskMark from '../components/AsteriskMark'
import Eyebrow from '../components/Eyebrow'
import Reveal from '../components/Reveal'
import bagDawn from '../assets/bag-dawn.png'
import bagEmber from '../assets/bag-ember.png'
import bagChar from '../assets/bag-char.png'

const ROASTS = [
  {
    name: 'Dawn',
    level: 'Light',
    dropTemp: '196°',
    notes: 'Bergamot / apricot / black tea',
    lots: 'Ethiopia + Kenya',
    process: 'Washed',
    weight: '250 g',
    price: '$19.00',
    img: bagDawn,
    alt: 'Dawn light roast in a kraft-paper bag',
  },
  {
    name: 'Ember',
    level: 'Medium',
    dropTemp: '210°',
    notes: 'Panela / hazelnut / orange zest',
    lots: 'Colombia + Guatemala',
    process: 'Washed + honey',
    weight: '250 g',
    price: '$18.00',
    img: bagEmber,
    alt: 'Ember medium roast in a chestnut-brown bag',
  },
  {
    name: 'Char',
    level: 'Dark',
    dropTemp: '224°',
    notes: 'Dark chocolate / molasses / smoke',
    lots: 'Guatemala + Colombia',
    process: 'Natural',
    weight: '250 g',
    price: '$18.00',
    img: bagChar,
    alt: 'Char dark roast in a matte-black bag',
  },
]

function RoastCard({ roast }: { roast: (typeof ROASTS)[number] }) {
  return (
    <a
      href="#subscriptions"
      className="group relative block overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={roast.img}
          alt={roast.alt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {/* Bottom overlay */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 pt-20">
          <div className="flex flex-col gap-1">
            <span className="display text-3xl md:text-4xl text-paper">
              {roast.name}
              <span className="text-ember">*</span>
            </span>
            <span className="text-xs font-semibold tracking-[0.04em] text-paper">
              {roast.notes}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-paper/85">
              {roast.level} roast — {roast.dropTemp} — {roast.lots} — {roast.process}
            </span>
          </div>
          <AsteriskMark className="h-5 w-5 shrink-0 text-ember transition-transform duration-500 group-hover:rotate-90" />
        </div>
      </div>
      {/* Shop bar */}
      <div className="flex items-center justify-between bg-ember px-4 py-3 transition-colors duration-300 group-hover:bg-ink">
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-paper">
          Shop {roast.name} — {roast.price} / {roast.weight}
        </span>
        <ArrowUpRight className="h-3.5 w-3.5 text-paper transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ember" />
      </div>
    </a>
  )
}

export default function Roasts() {
  return (
    <section id="roasts" className="border-b border-ink">
      <div className="flex items-center justify-between border-b border-ink px-4 py-3 md:px-8">
        <Eyebrow index="04">The roasts</Eyebrow>
        <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
          One drop temperature each
        </span>
      </div>

      {/* Ghost headline — white + difference blend renders dark on paper and
          flips light wherever the cards clip over it */}
      <div className="overflow-hidden px-4 pt-8 md:px-8">
        <AnimatedWords
          as="h2"
          className="display pointer-events-none relative z-10 select-none text-[11vw] text-white mix-blend-difference md:text-[7.5vw]"
        >
          Three roasts. No endless menu.
        </AnimatedWords>
      </div>

      {/* Staggered gallery */}
      <div className="grid grid-cols-12 gap-x-4 gap-y-10 px-4 pb-16 md:px-8 md:pb-24 -mt-2 md:-mt-[3vw]">
        {/* Left column: cards 1 + 2, then the lineup block below them */}
        <div className="col-span-12 md:col-span-7 grid grid-cols-12 gap-x-4 gap-y-10">
          <Reveal className="col-span-12 sm:col-span-6">
            <RoastCard roast={ROASTS[0]} />
          </Reveal>

          <Reveal delay={0.1} className="col-span-12 sm:col-span-6 md:mt-24">
            <RoastCard roast={ROASTS[1]} />
          </Reveal>

          {/* Lineup block — fills the gap under the staggered cards */}
          <div className="col-span-12 md:pr-8">
            <AnimatedWords
              as="p"
              className="max-w-2xl text-xl md:text-2xl font-semibold leading-[1.25] tracking-[-0.02em]"
            >
              <span className="text-ink">
                Every bag is 250 grams of whole bean, roasted to order on a Tuesday,
              </span>{' '}
              <span className="text-ink/45">
                sealed behind a one-way valve the same week — ground only if you ask, and never
                older than seven days when it lands on your doorstep.
              </span>
            </AnimatedWords>

            <Reveal delay={0.1}>
              <div className="mt-10">
                <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/50">
                  <AsteriskMark className="h-2.5 w-2.5 text-ember" />
                  The lineup at a glance
                </p>
                <div className="mt-3 border-t border-ink">
                  {ROASTS.map((roast) => (
                    <div
                      key={roast.name}
                      className="grid grid-cols-12 items-baseline gap-x-3 border-b border-ink py-3.5"
                    >
                      <span className="display col-span-4 sm:col-span-3 text-xl md:text-2xl text-ink">
                        {roast.name}
                        <span className="text-ember">*</span>
                      </span>
                      <span className="col-span-3 sm:col-span-2 text-[10px] font-bold uppercase tracking-[0.12em] text-ink/60">
                        {roast.level} — {roast.dropTemp}
                      </span>
                      <span className="hidden sm:block col-span-2 text-[10px] font-bold uppercase tracking-[0.12em] text-ink/60">
                        {roast.process}
                      </span>
                      <span className="hidden md:block col-span-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink/60">
                        {roast.notes}
                      </span>
                      <span className="display col-span-5 sm:col-span-2 md:col-span-2 text-right text-lg md:text-xl text-ink">
                        {roast.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right column: text in the gap, then card 3 lower */}
        <div className="col-span-12 md:col-span-4 md:col-start-9 flex flex-col gap-10 md:mt-48">
          <AnimatedWords
            as="p"
            delay={0.15}
            className="max-w-sm text-lg md:text-xl font-semibold leading-[1.3] tracking-[-0.01em]"
          >
            <span className="text-ink">
              We believe a menu should be short enough to roast honestly.
            </span>{' '}
            <span className="text-ink/45">
              Each of our three roasts is pulled from the drum at one temperature, printed on
              every bag — because that number is the recipe. Pick your heat, and we'll keep it
              identical, batch after batch.
            </span>
          </AnimatedWords>
          <Reveal delay={0.25}>
            <RoastCard roast={ROASTS[2]} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
