import AsteriskMark from './AsteriskMark'

interface EyebrowProps {
  index: string
  children: string
}

export default function Eyebrow({ index, children }: EyebrowProps) {
  return (
    <span className="flex items-center gap-3 text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-ink">
      <AsteriskMark className="h-3 w-3 text-ember" />
      <span className="text-ember">({index})</span>
      {children}
    </span>
  )
}
