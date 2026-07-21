import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

/* Window-level Lenis. `anchors` makes #links glide and respects the
   scroll-margin-top set on [id] in index.css. Reduced-motion users get
   native instant scrolling instead. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.09,
    })

    return () => lenis.destroy()
  }, [])

  return null
}
