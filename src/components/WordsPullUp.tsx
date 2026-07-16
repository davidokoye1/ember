import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface WordsPullUpProps {
  text: string
  className?: string
  showAsterisk?: boolean
}

export default function WordsPullUp({ text, className = '', showAsterisk = false }: WordsPullUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const words = text.split(' ')

  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1
        return (
          <motion.span
            key={`${word}-${i}`}
            className="relative inline-block whitespace-nowrap"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
          >
            {word}
            {isLast && showAsterisk && (
              <span
                className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]"
                style={{ color: '#D97B4A' }}
              >
                *
              </span>
            )}
            {!isLast && ' '}
          </motion.span>
        )
      })}
    </div>
  )
}
