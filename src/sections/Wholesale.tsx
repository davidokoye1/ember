import { ArrowRight } from 'lucide-react'
import AnimatedWords from '../components/AnimatedWords'
import AsteriskMark from '../components/AsteriskMark'
import Eyebrow from '../components/Eyebrow'
import ParallaxImage from '../components/ParallaxImage'
import Reveal from '../components/Reveal'
import cafeImg from '../assets/wholesale-cafe.png'

export default function Wholesale() {
  return (
    <section id="wholesale" className="border-b border-ink">
      <div className="flex items-center justify-between border-b border-ink px-4 py-3 md:px-8">
        <Eyebrow index="07">Wholesale</Eyebrow>
        <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
          Cafés / restaurants / offices
        </span>
      </div>

      <div className="grid grid-cols-12">
        {/* Copy */}
        <div className="col-span-12 md:col-span-7 flex flex-col justify-between border-b md:border-b-0 md:border-r border-ink px-4 py-10 md:px-8 md:py-14">
          <AnimatedWords
            as="p"
            className="max-w-3xl text-2xl sm:text-3xl md:text-[2.9vw] font-semibold leading-[1.18] tracking-[-0.02em]"
          >
            <span className="text-ink">Wholesale — our roasts, your counter,</span>{' '}
            <span className="text-ink/45">
              delivered weekly{' '}
              <span className="inline-flex items-baseline gap-1 align-baseline">
                <AsteriskMark className="inline h-[0.7em] w-[0.7em] translate-y-[0.08em] text-ember" />
                <AsteriskMark className="inline h-[0.7em] w-[0.7em] translate-y-[0.08em] text-ember" />
              </span>{' '}
              training and equipment included.
            </span>
          </AnimatedWords>

          <div className="mt-10 md:mt-16 grid grid-cols-12 items-end gap-4">
            <Reveal delay={0.15} className="col-span-12 lg:col-span-7">
              <p className="max-w-[26rem] text-xs md:text-sm leading-[1.6] text-ink/60">
                Cafés, restaurants, and offices. No minimums — small accounts welcome,
                we started small too.
              </p>
            </Reveal>
            <Reveal delay={0.25} className="col-span-12 lg:col-span-5 flex lg:justify-end">
              <a
                href="mailto:wholesale@emberroast.co"
                className="group inline-flex items-center gap-2 bg-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-paper hover:bg-ink transition-colors"
              >
                Talk to our team
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>
        </div>

        {/* Image */}
        <figure className="col-span-12 md:col-span-5 relative min-h-[44vh] md:min-h-0 overflow-hidden">
          <ParallaxImage
            src={cafeImg}
            alt="An espresso machine steaming on a café bar at night"
          />
          <figcaption className="absolute bottom-0 left-0 bg-ink px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-paper">
            Fig. 07 — Partner bar, closing shift
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
