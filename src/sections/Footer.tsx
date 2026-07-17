import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Instagram, ArrowRight, Check } from 'lucide-react'
import AsteriskMark from '../components/AsteriskMark'
import AnimatedWords from '../components/AnimatedWords'

const LINKS = [
  { label: 'Our story', href: '#our-story' },
  { label: 'Origins', href: '#origins' },
  { label: 'Process', href: '#process' },
  { label: 'Roasts', href: '#roasts' },
  { label: 'Voices', href: '#voices' },
  { label: 'Subscriptions', href: '#subscriptions' },
  { label: 'Wholesale', href: '#wholesale' },
  { label: 'The fine print', href: '#fine-print' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'error' | 'done'>('idle')
  const markRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  /* The closing wordmark rises out of its own baseline, scrubbed to scroll —
     the hero's entrance played back under your thumb. */
  const { scrollYProgress } = useScroll({
    target: markRef,
    offset: ['start end', 'end end'],
  })
  const markY = useTransform(scrollYProgress, [0, 1], ['62%', '0%'])

  function subscribe(e: FormEvent) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      return
    }
    setStatus('done')
  }

  return (
    <footer>
      <div className="grid grid-cols-12 border-b border-ink">
        {/* Newsletter capture */}
        <div className="col-span-12 md:col-span-6 border-b md:border-b-0 md:border-r border-ink px-4 py-10 md:px-8 md:py-14">
          <AnimatedWords as="p" className="display max-w-md text-3xl md:text-4xl text-ink">
            Roast-day notes, once a{' '}
            <span className="whitespace-nowrap">
              week<span className="text-ember">.</span>
            </span>
          </AnimatedWords>
          <p className="mt-4 max-w-md text-sm leading-[1.6] text-ink/60">
            What we're roasting Tuesday, which lots just landed, and 10% off your first bag.
            One email a week, unsubscribe in one click.
          </p>

          {status === 'done' ? (
            <p className="mt-6 flex items-center gap-2 bg-ink px-5 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-paper">
              <Check className="h-4 w-4 text-ember" strokeWidth={3} />
              You're on the list — first note lands Tuesday
            </p>
          ) : (
            <form onSubmit={subscribe} noValidate className="mt-6 max-w-md">
              <div className="flex border border-ink">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status === 'error') setStatus('idle')
                  }}
                  placeholder="you@kitchen.com"
                  aria-invalid={status === 'error'}
                  aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                  className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm text-ink placeholder:text-ink/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ember"
                />
                <button
                  type="submit"
                  className="group flex items-center gap-2 bg-ember px-5 text-[11px] font-bold uppercase tracking-[0.16em] text-paper hover:bg-ink transition-colors"
                >
                  Sign up
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
              {status === 'error' && (
                <p id="newsletter-error" className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ember">
                  Enter a valid email address to sign up
                </p>
              )}
            </form>
          )}
        </div>

        {/* Menu */}
        <nav
          className="col-span-6 md:col-span-3 border-r border-ink px-4 py-10 md:px-8 md:py-14 flex flex-col items-start gap-2.5"
          aria-label="Footer"
        >
          <span className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/50">
            Menu
          </span>
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-ink/70 hover:text-ember transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Roastery */}
        <div className="col-span-6 md:col-span-3 px-4 py-10 md:px-8 md:py-14 flex flex-col items-start gap-2.5">
          <span className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/50">
            Roastery
          </span>
          <p className="text-sm leading-[1.6] text-ink/70">
            14 Kiln Yard
            <br />
            Portland, OR 97209
            <br />
            Sat cuppings, 10am
          </p>
          <a
            href="mailto:hello@emberroast.co"
            className="text-sm text-ink/70 hover:text-ember transition-colors"
          >
            hello@emberroast.co
          </a>
          <a
            href="https://instagram.com"
            aria-label="Ember on Instagram"
            className="mt-2 text-ink/70 hover:text-ember transition-colors"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Oversized wordmark — masked rise, scrubbed to scroll */}
      <div ref={markRef} className="overflow-hidden px-[1.5vw] text-ink">
        <motion.p
          className="display w-full whitespace-nowrap text-center text-[20vw] leading-[0.8] select-none will-change-transform"
          style={reduceMotion ? undefined : { y: markY }}
        >
          Ember<span className="text-ember">*</span>
        </motion.p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-ink px-4 py-4 md:px-8 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/50">
        <span className="flex items-center gap-2">
          <AsteriskMark className="h-3 w-3 text-ember" />© 2026 Ember Roasting Co.
        </span>
        <span>Roasted in Portland, Oregon</span>
      </div>
    </footer>
  )
}
