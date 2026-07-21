import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import AnimatedWords from '../components/AnimatedWords'
import AsteriskMark from '../components/AsteriskMark'
import Eyebrow from '../components/Eyebrow'
import Reveal from '../components/Reveal'
import Footer from '../sections/Footer'
import { ROASTS } from '../data/roasts'
import { Link } from '../router'
import subPour from '../assets/sub-pour.png'

interface Guide {
  method: string
  gear: string
  bestWith: string
  ratio: string
  grind: string
  temp: string
  time: string
  steps: string[]
}

const GUIDES: Guide[] = [
  {
    method: 'Pour over',
    gear: 'V60 / Kalita / Origami',
    bestWith: 'Dawn',
    ratio: '15 g : 250 g',
    grind: 'Medium-fine — table salt',
    temp: '96°',
    time: '2:45–3:15',
    steps: [
      'Rinse the paper, warm the vessel, discard the rinse water.',
      'Bloom with 45 g of water. Swirl once. Wait 40 seconds — fresh coffee will dome up.',
      'Pour to 150 g in slow spirals, then to 250 g by 1:30.',
      'Swirl gently, let it draw down flat. Drink before it hits 60° — that is where Dawn opens up.',
    ],
  },
  {
    method: 'French press',
    gear: 'Any press you own',
    bestWith: 'Ember',
    ratio: '30 g : 500 g',
    grind: 'Coarse — breadcrumbs',
    temp: '94°',
    time: '8:00',
    steps: [
      'Add coffee, fill to 500 g, start the clock. No stirring yet.',
      'At 4:00, break the crust with a spoon and skim the foam.',
      'At 8:00, press just below the surface — don\'t plunge to the bottom.',
      'Pour through the mesh slowly. The long steep is what gives Ember its syrup.',
    ],
  },
  {
    method: 'Espresso',
    gear: 'Any machine with a scale',
    bestWith: 'Char',
    ratio: '18 g : 38 g',
    grind: 'Fine — adjust until the time lands',
    temp: '93°',
    time: '26–30 s',
    steps: [
      'Dose 18 g, distribute, tamp level. Rest the bag 10 days off roast first.',
      'Aim for 38 g out in 26–30 seconds from first drip.',
      'Running fast and sour? Grind finer. Slow and bitter? Coarser.',
      'Char holds its chocolate through milk — a 1:4 cortado ratio is the house call.',
    ],
  },
  {
    method: 'Moka pot',
    gear: 'Bialetti, stovetop',
    bestWith: 'Char',
    ratio: 'Fill the basket, no tamping',
    grind: 'Fine-medium — finer than pour over',
    temp: 'Start with hot water',
    time: '~5:00',
    steps: [
      'Fill the boiler with pre-heated water to just below the valve.',
      'Fill the basket loosely, level with a finger, never tamp.',
      'Medium-low heat, lid open. When the stream goes from syrup to honey-blonde, kill the heat.',
      'Run the base under cold water to stop extraction dead. Pour immediately.',
    ],
  },
]

export default function BrewGuidesPage() {
  return (
    <main>
      {/* Breadcrumb bar */}
      <div className="flex items-center justify-between border-b border-ink px-4 py-3 md:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/60 hover:text-ember transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Home
        </Link>
        <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
          Four methods — zero gadget worship
        </span>
      </div>

      {/* Header */}
      <section className="border-b border-ink">
        <div className="border-b border-ink px-4 py-3 md:px-8">
          <Eyebrow index="A">Brew guides</Eyebrow>
        </div>
        <div className="grid grid-cols-12 gap-y-8 px-4 py-10 md:px-8 md:py-16">
          <div className="col-span-12 md:col-span-7">
            <AnimatedWords as="h1" className="display text-[13vw] md:text-[6.5vw] text-ink">
              Good coffee is a recipe, not a ritual.
            </AnimatedWords>
            <AnimatedWords
              as="p"
              delay={0.15}
              className="mt-8 max-w-xl text-lg md:text-xl font-semibold leading-[1.35] tracking-[-0.01em]"
            >
              <span className="text-ink">
                Every method below is the exact recipe we use at the Saturday cupping table.
              </span>{' '}
              <span className="text-ink/45">
                A scale and a timer will do more for your cup than any $300 kettle. Weigh, time,
                taste, adjust one thing at a time — that's the whole secret.
              </span>
            </AnimatedWords>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <Reveal delay={0.2}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={subPour}
                  alt="A slow pour over being brewed at the roastery bar"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="absolute bottom-4 left-4 bg-ink px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-paper">
                  Shot at the roastery bar
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Guides */}
      {GUIDES.map((guide, i) => (
        <section key={guide.method} className="border-b border-ink">
          <div className="grid grid-cols-12">
            {/* Method header */}
            <div className="col-span-12 md:col-span-5 border-b md:border-b-0 md:border-r border-ink px-4 py-8 md:px-8 md:py-12">
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/50">
                <AsteriskMark className="h-2.5 w-2.5 text-ember" />
                Method 0{i + 1}
              </p>
              <AnimatedWords as="h2" className="display mt-4 text-5xl md:text-6xl text-ink">
                {guide.method}
              </AnimatedWords>
              <p className="mt-3 text-sm text-ink/60">{guide.gear}</p>

              <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 max-w-sm">
                {[
                  ['Ratio', guide.ratio],
                  ['Grind', guide.grind],
                  ['Water', guide.temp],
                  ['Time', guide.time],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/50">{label}</p>
                    <p className="mt-1 text-sm font-bold text-ink">{value}</p>
                  </div>
                ))}
              </div>

              <Link
                to={`/roasts/${ROASTS.find((r) => r.name === guide.bestWith)?.slug ?? 'ember'}`}
                className="group mt-8 inline-flex items-center gap-2 bg-ember px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-paper hover:bg-ink transition-colors"
              >
                Best with {guide.bestWith}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Steps */}
            <div className="col-span-12 md:col-span-7">
              {guide.steps.map((step, j) => (
                <Reveal key={j} delay={j * 0.06}>
                  <div className={`grid grid-cols-12 gap-x-4 px-4 py-6 md:px-8 ${j < guide.steps.length - 1 ? 'border-b border-ink' : ''}`}>
                    <span className="display col-span-2 md:col-span-1 text-3xl text-ember">{j + 1}</span>
                    <p className="col-span-10 md:col-span-11 max-w-xl text-base md:text-lg font-medium leading-[1.5] text-ink/80">
                      {step}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Closing CTA */}
      <section className="border-b border-ink bg-ink text-paper">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-4 py-10 md:px-8 md:py-12">
          <AnimatedWords as="p" className="display max-w-2xl text-3xl md:text-5xl">
            Recipes only work with fresh beans.
          </AnimatedWords>
          <Link
            to="/#roasts"
            className="group flex shrink-0 items-center gap-2 bg-ember px-6 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-paper hover:bg-paper hover:text-ink transition-colors"
          >
            Shop the three roasts
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
