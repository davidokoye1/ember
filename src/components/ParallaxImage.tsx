import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

interface ParallaxImageProps {
  src: string
  alt: string
}

/* Fills an absolutely-positioned parent (which must be overflow-hidden and
   position:relative). The image is oversized ~28% and pans vertically as the
   band crosses the viewport, so the photo feels set behind the paper. */
export default function ParallaxImage({ src, alt }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute left-0 top-[-14%] h-[128%] w-full object-cover will-change-transform"
        style={reduceMotion ? undefined : { y }}
      />
    </div>
  )
}
