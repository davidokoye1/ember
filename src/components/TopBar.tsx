import AsteriskMark from './AsteriskMark'
import { Link } from '../router'
import { ThemeToggle } from '../theme'

const NAV_LINKS = [
  { label: 'Story', href: '/#our-story' },
  { label: 'Origins', href: '/#origins' },
  { label: 'Roasts', href: '/#roasts' },
  { label: 'Brew guides', href: '/brew-guides' },
  { label: 'Visit', href: '/visit' },
  { label: 'Subscribe', href: '/#subscriptions' },
  { label: 'Wholesale', href: '/#wholesale' },
]

export default function TopBar() {
  return (
    <nav className="sticky top-0 z-50 flex h-12 items-center justify-between border-b border-ink bg-paper px-4 md:px-8">
      <Link to="/" className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.08em]">
        <AsteriskMark className="h-3.5 w-3.5 text-ember" />
        Ember<span className="align-super text-[0.6em]">®</span>
      </Link>
      <div className="hidden md:flex items-center gap-6">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            className="text-xs font-medium uppercase tracking-[0.14em] text-ink/70 hover:text-ember transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Link
          to="/#subscriptions"
          className="text-xs font-semibold uppercase tracking-[0.14em] hover:text-ember transition-colors"
        >
          Order / <span className="text-ember">(0)</span>
        </Link>
      </div>
    </nav>
  )
}
