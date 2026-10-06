import { Award, Boxes, Code2, Users } from 'lucide-react'
import { stats } from '@/data/profile'

const icons = [Boxes, Code2, Award, Users] as const

/** The dark stats strip that separates the hero from the rest of the page. */
export function StatsStrip() {
  return (
    <section className="on-band bg-band border-b-2 border-black py-14 md:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-6 md:grid-cols-4 md:px-12">
        {stats.map((s, i) => {
          const Icon = icons[i % icons.length]
          return (
            <div key={s.label} className="flex flex-col items-center text-center">
              <Icon className="size-7 text-neo-yellow" strokeWidth={2.2} />
              <span className="mt-3 font-cabinet text-4xl font-black tracking-tighter md:text-5xl">
                {s.value}
              </span>
              <span className="mt-1 text-sm font-bold">{s.label}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}