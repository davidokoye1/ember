import { createContext, useContext, useEffect, useState } from 'react'
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react'

/* Minimal history-API router — the site has four routes and no need for a
   dependency. Paths with a #hash navigate first, then let the browser/Lenis
   handle the anchor. */

const RouteContext = createContext<string>('/')

export function usePath() {
  return useContext(RouteContext)
}

export function navigate(to: string) {
  const hash = to.split('#')[1]
  window.history.pushState(null, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
  if (hash) {
    // let the new route render before jumping to the anchor
    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView()
    })
  } else {
    window.scrollTo(0, 0)
  }
}

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string
  children: ReactNode
}

export function Link({ to, children, onClick, ...rest }: LinkProps) {
  const path = usePath()

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e)
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    const [target, hash] = to.split('#')
    if ((target || '/') === path && hash) {
      // same page — pure anchor scroll, keep Lenis' smooth glide
      window.history.pushState(null, '', to)
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    navigate(to)
  }

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}

export function Router({ children }: { children: (path: string) => ReactNode }) {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const sync = () => setPath(window.location.pathname)
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  return <RouteContext.Provider value={path}>{children(path)}</RouteContext.Provider>
}
