import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import heroImg from '../assets/hero.webp'
import AnimatedWords from '../components/AnimatedWords'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  /* Scroll choreography: as the hero leaves, the wordmark sinks slower than
     the page (depth) and the photograph pans inside its crop. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const markY = useTransform(scrollYProgress, [0, 1], ['0%', '32%'])
  const markOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.25])
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <header ref={ref} className="flex min-h-[calc(100vh-3rem)] flex-col">
      {/* Wordmark */}
      <div className="overflow-hidden px-[1.5vw]">
        <motion.h1
          initial={reduceMotion ? false : { y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="display w-full whitespace-nowrap text-center text-[20vw] text-ink select-none"
        >
          <motion.span
            className="inline-block will-change-transform"
            style={reduceMotion ? undefined : { y: markY, opacity: markOpacity }}
          >
            Ember<span className="text-ember">*</span>
          </motion.span>
        </motion.h1>
      </div>

      {/* Meta rule row */}
      <div className="grid grid-cols-2 md:grid-cols-3 items-center border-y border-ink px-4 py-2.5 md:px-8 text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em]">
        <span>Small-batch roastery</span>
        <span className="hidden md:block text-center">Roasted weekly — shipped in 48h</span>
        <span className="text-right">Portland, OR — est. 2019</span>
      </div>

      {/* Statement row */}
      <div className="grid grid-cols-12 gap-x-4 px-4 py-8 md:px-8 md:py-10 items-start">
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
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.8, ease: EASE }}
          className="col-span-12 md:col-span-3 md:col-start-10 mt-6 md:mt-0 flex md:justify-end"
        >
          <a
            href="#roasts"
            className="group inline-flex items-center gap-2 bg-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-paper hover:bg-ink transition-colors"
          >
            Taste the roast
            <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </motion.div>
      </div>

      {/* Photography band — pans inside its crop as you scroll past */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1, ease: EASE }}
        className="relative flex-1 min-h-[38vh] overflow-hidden"
      >
        <motion.img
          src={heroImg}
          alt="Our drum roaster mid-roast, beans turning in the cooling tray"
          className="absolute left-0 top-[-14%] h-[128%] w-full object-cover will-change-transform"
          style={reduceMotion ? undefined : { y: imgY }}
        />
      </motion.div>
    </header>
  )
}
