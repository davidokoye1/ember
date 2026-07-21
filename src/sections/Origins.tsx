import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import AnimatedWords from '../components/AnimatedWords'
import AsteriskMark from '../components/AsteriskMark'
import Eyebrow from '../components/Eyebrow'
import ethiopiaImg from '../assets/origin-ethiopia.webp'
import colombiaImg from '../assets/origin-colombia.webp'
import guatemalaImg from '../assets/origin-guatemala.webp'
import kenyaImg from '../assets/origin-kenya.webp'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const ORIGINS = [
  {
    name: 'Ethiopia',
    region: 'Yirgacheffe',
    altitude: '1,950 m',
    notes: 'Jasmine / apricot / black tea',
    img: ethiopiaImg,
    alt: 'Misty highland coffee terraces in Yirgacheffe at sunrise',
  },
  {
    name: 'Colombia',
    region: 'Huila',
    altitude: '1,700 m',
    notes: 'Panela / red plum / cacao',
    img: colombiaImg,
    alt: 'Steep green coffee hillsides in Huila, Colombia',
  },
  {
    name: 'Guatemala',
    region: 'Antigua',
    altitude: '1,600 m',
    notes: 'Toffee / orange zest / smoke',
    img: guatemalaImg,
    alt: 'Volcanic coffee farmland near Antigua, Guatemala',
  },
  {
    name: 'Kenya',
    region: 'Nyeri',
    altitude: '1,800 m',
    notes: 'Blackcurrant / tomato leaf / honey',
    img: kenyaImg,
    alt: 'Red-soil coffee plantations in Nyeri, Kenya',
  },
]

export default function Origins() {
  const [active, setActive] = useState(0)

  return (
    <section id="origins" className="border-b border-ink">
      <div className="flex items-center justify-between border-b border-ink px-4 py-3 md:px-8">
        <Eyebrow index="02">Origins</Eyebrow>
        <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
          04 countries — 11 farms
        </span>
      </div>

      <div className="grid grid-cols-12">
        {/* Index list */}
        <div className="col-span-12 md:col-span-7 border-b md:border-b-0 md:border-r border-ink">
          <AnimatedWords
            as="p"
            className="px-4 pt-8 md:px-8 md:pt-12 max-w-xl text-xl md:text-2xl font-semibold leading-[1.25] tracking-[-0.02em]"
          >
            <span className="text-ink">
              One buying trip a year to each origin. Grown by people we know by name
            </span>{' '}
            <span className="text-ink/45">— hover a row to see where your cup begins.</span>
          </AnimatedWords>

          <ul className="mt-8 md:mt-12">
            {ORIGINS.map((origin, i) => {
              const isActive = i === active
              return (
                <li key={origin.name} className="border-t border-ink last:border-b">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-expanded={isActive}
                    className={`group grid w-full grid-cols-12 items-baseline gap-x-3 px-4 py-5 md:px-8 md:py-6 text-left transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ember ${
                      isActive ? 'bg-ink text-paper' : 'text-ink hover:bg-ink/[0.04]'
                    }`}
                  >
                    <span
                      className={`col-span-1 text-[10px] md:text-xs font-semibold tracking-[0.1em] ${
                        isActive ? 'text-ember' : 'text-ink/40'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="display col-span-7 text-[9vw] md:text-[3.6vw]">
                      {origin.name}
                    </span>
                    <span
                      className={`col-span-4 hidden md:flex flex-col items-end gap-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                        isActive ? 'text-paper/70' : 'text-ink/50'
                      }`}
                    >
                      <span>
                        {origin.region} — {origin.altitude}
                      </span>
                      <span className={isActive ? 'text-ember' : ''}>{origin.notes}</span>
                    </span>
                    <span className="col-span-4 md:hidden flex justify-end">
                      <ArrowUpRight
                        className={`h-4 w-4 ${isActive ? 'text-ember' : 'text-ink/40'}`}
                      />
                    </span>
                  </button>

                  {/* Mobile-only expanding image */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="overflow-hidden md:hidden"
                      >
                        <img src={origin.img} alt={origin.alt} className="h-56 w-full object-cover" loading="lazy" decoding="async" />
                        <p className="border-t border-ink px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/60">
                          {origin.region} — {origin.altitude} — {origin.notes}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Sticky image panel — desktop */}
        <div className="col-span-5 hidden md:block">
          <div className="sticky top-12 h-[calc(100vh-3rem)] max-h-[52rem] overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={ORIGINS[active].name}
                src={ORIGINS[active].img}
                alt={ORIGINS[active].alt}
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <span className="absolute bottom-0 left-0 z-10 flex items-center gap-1.5 bg-ink px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-paper">
              <AsteriskMark className="h-2.5 w-2.5 text-ember" />
              Fig. 02.{active + 1} — {ORIGINS[active].region}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
