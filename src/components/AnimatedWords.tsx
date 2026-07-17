import { cloneElement, isValidElement, useRef } from 'react'
import type { Key, ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* Words rise from behind per-word clip masks. Accepts
   styled children — two-tone spans, inline AsteriskMarks, <br/> — and splits
   only the text nodes, preserving every wrapper. Whitespace renders outside
   the masks so line wrapping matches unanimated text. */

interface AnimatedWordsProps {
  children: ReactNode
  as?: 'div' | 'p' | 'h2' | 'h3' | 'span'
  className?: string
  delay?: number
  stagger?: number
}

function countWords(node: ReactNode): number {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node).split(/\s+/).filter(Boolean).length
  }
  if (Array.isArray(node)) return node.reduce((n: number, child) => n + countWords(child), 0)
  if (isValidElement(node)) {
    const children = (node.props as { children?: ReactNode }).children
    if (children != null) return countWords(children)
    return node.type === 'br' ? 0 : 1
  }
  return 0
}

export default function AnimatedWords({
  children,
  as: Tag = 'div',
  className,
  delay = 0,
  stagger = 0.04,
}: AnimatedWordsProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <Tag className={className}>{children}</Tag>
  }

  /* Cap the total stagger span so long paragraphs don't crawl. */
  const per = Math.min(stagger, 0.9 / Math.max(countWords(children), 1))
  let index = 0

  const word = (content: ReactNode, key: Key) => {
    const i = index++
    return (
      <span
        key={key}
        className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]"
      >
        <motion.span
          className="inline-block"
          initial={{ y: '110%' }}
          animate={isInView ? { y: '0%' } : undefined}
          transition={{ delay: delay + i * per, duration: 0.6, ease: EASE }}
        >
          {content}
        </motion.span>
      </span>
    )
  }

  const walk = (node: ReactNode, key: Key): ReactNode => {
    if (typeof node === 'string' || typeof node === 'number') {
      /* Keep whitespace as raw text between masks — the browser wraps lines
         exactly as it would have without the animation spans. */
      return String(node)
        .split(/(\s+)/)
        .map((part, i) => (part.trim() === '' ? part : word(part, `${key}-${i}`)))
    }
    if (Array.isArray(node)) return node.map((child, i) => walk(child, `${key}-${i}`))
    if (isValidElement(node)) {
      const children = (node.props as { children?: ReactNode }).children
      if (children != null) return cloneElement(node, { key }, walk(children, key))
      /* Leaf inline element: <br/> passes through; svg marks become a word. */
      return node.type === 'br' ? cloneElement(node, { key }) : word(node, key)
    }
    return node
  }

  return (
    <Tag ref={ref as never} className={className}>
      {walk(children, 'w')}
    </Tag>
  )
}
