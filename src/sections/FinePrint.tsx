import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, ArrowRight } from 'lucide-react'
import AsteriskMark from '../components/AsteriskMark'
import Eyebrow from '../components/Eyebrow'
import Reveal from '../components/Reveal'
import AnimatedWords from '../components/AnimatedWords'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const QUESTIONS = [
  {
    q: 'How fresh is fresh, exactly?',
    lede: 'Every bag is roasted on a Tuesday and handed to the courier within 48 hours.',
    rest: 'The roast date is stamped on the bag — it will never be more than seven days old when it lands.',
  },
  {
    q: 'Whole bean or ground?',
    lede: 'Whole bean by default, because coffee starts fading the moment it meets a burr.',
    rest: 'If you don’t have a grinder, pick your brew method at checkout and we grind for it, free.',
  },
  {
    q: 'What does shipping cost?',
    lede: 'Free on every subscription renewal, always.',
    rest: 'One-off bags ship anywhere in the US for a $6 flat rate — free over $40.',
  },
  {
    q: 'Can I pause, swap, or cancel?',
    lede: 'All three, from your account, in two clicks.',
    rest: 'No phone calls, no “are you sure” emails, no retention scripts. Your next roast simply doesn’t happen.',
  },
  {
    q: 'Can I gift a subscription?',
    lede: 'Yes — one, three, or six months, paid up front.',
    rest: 'The first box arrives with a handwritten card and a brew guide instead of an invoice.',
  },
] as const

export default function FinePrint() {
  const [open, setOpen] = useState(0)

  return (
    <section id="fine-print" className="border-b border-ink">
      <div className="flex items-center justify-between border-b border-ink px-4 py-3 md:px-8">
        <Eyebrow index="08">The fine print</Eyebrow>
        <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
          Questions we actually get
        </span>
      </div>

      <div className="grid grid-cols-12">
        {/* Guarantee rail */}
        <div className="col-span-12 md:col-span-5 border-b md:border-b-0 md:border-r border-ink">
          <div className="sticky top-12 flex flex-col px-4 py-10 md:px-8 md:py-14">
            <AnimatedWords
              as="h2"
              className="display whitespace-nowrap text-[13vw] md:text-[5.2vw] text-ink"
            >
              Read it,
              <br />
              then relax<span className="text-ember">*</span>
            </AnimatedWords>

            <Reveal delay={0.1}>
              <div className="mt-10 max-w-md border-t border-ink pt-6">
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-ember">
                  <AsteriskMark className="h-2.5 w-2.5" />
                  The crackle guarantee
                </p>
                <AnimatedWords as="p" delay={0.1} className="mt-4 text-lg md:text-xl font-semibold leading-[1.3] tracking-[-0.01em]">
                  <span className="text-ink">
                    If your first bag doesn’t hiss when you break the valve seal, your next one is
                    free.
                  </span>{' '}
                  <span className="text-ink/45">
                    No returns, no forms — keep the bag, we’ll make it right.
                  </span>
                </AnimatedWords>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <a
                href="#subscriptions"
                className="group mt-8 inline-flex items-center gap-2 self-start bg-ember px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-paper hover:bg-ink transition-colors"
              >
                Start risk-free
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>
        </div>

        {/* Accordion ledger */}
        <div className="col-span-12 md:col-span-7">
          {QUESTIONS.map((item, i) => {
            const isOpen = i === open
            return (
              <div key={item.q} className="border-b border-ink last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`fine-print-panel-${i}`}
                  className="group grid w-full grid-cols-12 items-baseline gap-x-3 px-4 py-5 md:px-8 md:py-6 text-left transition-colors duration-200 hover:bg-ink/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ember"
                >
                  <span
                    className={`col-span-2 sm:col-span-1 text-[10px] md:text-xs font-semibold tracking-[0.1em] ${
                      isOpen ? 'text-ember' : 'text-ink/40'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="col-span-8 sm:col-span-10 text-lg md:text-2xl font-semibold leading-[1.2] tracking-[-0.02em] text-ink">
                    {item.q}
                  </span>
                  <span className="col-span-2 sm:col-span-1 flex justify-end self-center">
                    <Plus
                      className={`h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 ${
                        isOpen ? 'rotate-45 text-ember' : 'text-ink/40 group-hover:text-ember'
                      }`}
                    />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`fine-print-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="grid grid-cols-12 gap-x-3 px-4 pb-6 md:px-8 md:pb-8">
                        <span className="col-span-2 sm:col-span-1" aria-hidden />
                        <span className="col-span-10 sm:col-span-10 max-w-xl text-sm md:text-base font-semibold leading-[1.5] tracking-[-0.01em]">
                          <span className="text-ink">{item.lede}</span>{' '}
                          <span className="text-ink/45">{item.rest}</span>
                        </span>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
