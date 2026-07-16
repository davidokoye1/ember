import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import WordsPullUp from '../components/WordsPullUp'
import heroImg from '../assets/hero.png'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const NAV_LINKS = ['Our story', 'Roasts', 'Origins', 'Subscriptions', 'Wholesale']

const DESCRIPTION =
  'Ember is a small-batch specialty roastery. We source single-origin lots from growers we know by name, roast them in small batches to order, and ship within days — so every cup tastes the way the farm intended.'

export default function Hero() {
  return (
    <section className="relative h-screen p-4 md:p-6">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        {/* Ken-Burns background */}
        <motion.img
          src={heroImg}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          initial={{ scale: 1 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 22, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        />

        {/* Noise overlay */}
        <div className="noise-overlay absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

        {/* Navbar */}
        <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
            <a href="#" aria-label="Ember" className="shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4 sm:w-5 sm:h-5"
                stroke="#D97B4A"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="12" y1="3" x2="12" y2="21" />
                <line x1="4.2" y1="7.5" x2="19.8" y2="16.5" />
                <line x1="4.2" y1="16.5" x2="19.8" y2="7.5" />
              </svg>
            </a>
            {NAV_LINKS.map((label) => (
              <a
                key={label}
                href="#"
                className="text-[10px] sm:text-xs md:text-sm whitespace-nowrap text-[rgba(233,216,190,0.8)] hover:text-[#E9D8BE] transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        {/* Bottom-aligned hero content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-2 sm:px-6 sm:pb-4 md:px-10 md:pb-6">
          <div className="grid grid-cols-12 gap-x-4 gap-y-6 items-end">
            <div className="col-span-12 md:col-span-8" style={{ color: '#E9D8BE' }}>
              <WordsPullUp
                text="Ember"
                showAsterisk
                className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em]"
              />
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col items-start gap-5 md:gap-6 md:pb-[2vw] md:pl-4">
              <motion.p
                className="text-primary/70 text-xs sm:text-sm md:text-base leading-[1.2]"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
              >
                {DESCRIPTION}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
              >
                <button className="group flex items-center gap-2 hover:gap-3 bg-primary text-black font-medium text-sm sm:text-base rounded-full pl-5 sm:pl-6 pr-1.5 py-1.5 transition-all duration-300">
                  Taste the roast
                  <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#E9D8BE' }} />
                  </span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
