import { motion, useInView } from 'motion/react'
import { useRef, useState } from 'react'
import { SectionHeading } from './ui/SectionHeading'
import { skillBarColors, skillCategories, skills, stackGroups } from '@/data/skills'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function SkillBar({
  name,
  level,
  category,
  index,
  animate,
}: {
  name: string
  level: number
  category: string
  index: number
  animate: boolean
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="font-bold">{name}</span>
        <span className="font-cabinet text-sm font-black tabular-nums opacity-60">{level}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full border-2 border-neo-white/70 bg-neo-black">
        <motion.div
          className={`h-full ${skillBarColors[category] ?? 'bg-neo-yellow'}`}
          initial={{ width: 0 }}
          animate={animate ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 0.9, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

export function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' })
  const [active, setActive] = useState(skillCategories[0])

  const visible = skills.filter((s) => s.category === active)

  return (
    <section
      id="skills"
      className="on-band bg-band relative overflow-hidden border-b-2 border-black px-6 py-28 md:px-12 md:py-32"
    >
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden />

      <div ref={ref} className="relative mx-auto max-w-7xl">
        <SectionHeading
          lead="Skills &"
          accent="Toolbox"
          outline
          sub="A working toolkit across languages, frontend, backend, data and AI — plus the platforms that keep it all shipping."
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* grouped chips */}
          <div className="space-y-8">
            {stackGroups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-3 font-cabinet text-lg font-black tracking-tight text-neo-yellow dark:text-[#fbbf24]">
                  {group.title}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="border-2 border-neo-white px-3 py-1.5 text-sm font-bold transition-colors hover:bg-neo-white hover:text-neo-black"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* proficiency bars with category tabs */}
          <div className="border-2 border-neo-white p-6 md:p-8">
            <div className="mb-6 flex flex-wrap gap-2">
              {skillCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`border-2 px-3 py-1.5 text-xs font-black tracking-widest uppercase transition-all duration-200 ${
                    active === cat
                      ? 'border-neo-white bg-neo-white text-neo-black'
                      : 'border-neo-white/60 hover:border-neo-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-5">
              {visible.map((s, i) => (
                <SkillBar
                  key={s.name}
                  name={s.name}
                  level={s.level}
                  category={s.category}
                  index={i}
                  animate={reduced ? true : inView}
                />
              ))}
            </div>

            <p className="mt-7 text-xs font-bold tracking-widest uppercase opacity-50">
              Self-assessed proficiency
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}