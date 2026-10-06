import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type SectionHeadingProps = {
  /** plain leading words */
  lead: string
  /** accented trailing word(s) */
  accent: string
  /** render the accent as outlined stroke text instead of solid colour */
  outline?: boolean
  sub?: ReactNode
  id?: string
}

/** Big neo-brutalist section title: heavy cabinet-grotesk, tight tracking. */
export function SectionHeading({ lead, accent, outline = false, sub, id }: SectionHeadingProps) {
  return (
    <Reveal className="mb-16">
      <h2
        id={id}
        className="font-cabinet text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]"
      >
        {lead}{' '}
        <span className={outline ? 'stroke-text' : 'accent-ink'}>{accent}</span>
      </h2>
      {sub ? (
        <div className="mt-6 max-w-2xl text-base md:text-lg opacity-80 leading-relaxed">{sub}</div>
      ) : null}
    </Reveal>
  )
}