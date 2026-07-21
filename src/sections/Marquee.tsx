import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import AsteriskMark from '../components/AsteriskMark'

const ITEMS = [
  'Roasted every Tuesday',
  'Shipped within 48 hours',
  'Single-origin lots only',
  'Direct trade since 2019',
]

/* Base drift in % of track width per second — matches the old 30s CSS loop */
const BASE_SPEED = 1.7

const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

function Strip() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden>
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-6 md:px-10 text-sm md:text-base font-bold uppercase tracking-[0.14em] text-paper whitespace-nowrap">
            {item}
          </span>
          <AsteriskMark className="h-4 w-4 text-paper" />
        </span>
      ))}
    </div>
  )
}

/* The band drifts on its own, but scroll velocity feeds its speed,
   direction, and a slight skew — scroll hard and the type leans into it. */
export default function Marquee() {
  const reduceMotion = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [-1200, 0, 1200], [-4, 0, 4], {
    clamp: false,
  })
  const skewX = useTransform(smoothVelocity, [-1200, 1200], [4, -4], { clamp: true })
  const direction = useRef(-1)

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return
    const vf = velocityFactor.get()
    // Scrolling up reverses the drift; it keeps that heading afterwards
    if (vf < -0.1) direction.current = 1
    else if (vf > 0.1) direction.current = -1

    let moveBy = direction.current * BASE_SPEED * (delta / 1000)
    moveBy += moveBy * Math.abs(vf)
    baseX.set(baseX.get() + moveBy)
  })

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`)

  return (
    <div className="relative overflow-hidden border-y border-ink bg-ember py-3 md:py-4">
      <motion.div
        className="flex w-max will-change-transform"
        style={reduceMotion ? undefined : { x, skewX }}
      >
        <Strip />
        <Strip />
        <Strip />
        <Strip />
      </motion.div>
      <span className="sr-only">
        Roasted every Tuesday. Shipped within 48 hours. Single-origin lots only. Direct trade since 2019.
      </span>
    </div>
  )
}
