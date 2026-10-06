import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { Boxes, Brain, Database, ShieldCheck, type LucideIcon } from 'lucide-react'
import { profile } from '@/data/profile'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Reveal } from './ui/Reveal'

type Focus = {
  icon: LucideIcon
  title: string
  description: string
  /** alternate the plate colour, like the reference's 01–04 grid */
  plate: 'sage' | 'yellow'
}

const focuses: Focus[] = [
  {
    icon: Boxes,
    title: 'Full Stack Development',
    description:
      'End-to-end web applications with React on the front end and Spring Boot or FastAPI services behind them.',
    plate: 'sage',
  },
  {
    icon: Database,
    title: 'Backend & Data Systems',
    description:
      'Relational and document data modelling with MySQL, PostgreSQL, MongoDB and Neo4j, tuned for real workloads.',
    plate: 'yellow',
  },
  {
    icon: Brain,
    title: 'AI, ML & Graph Analytics',
    description:
      'Machine learning pipelines and Neo4j graph analytics for tracing multi-hop transactions and scoring risk.',
    plate: 'sage',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Private Platforms',
    description:
      'Privacy-first systems with PII segregation, metadata scrubbing, RBAC and idempotent payment flows.',
    plate: 'yellow',
  },
]

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' })

  return (
    <section
      id="about"
      className="on-paper bg-paper relative overflow-hidden border-b-2 border-black px-6 py-28 md:px-12 md:py-32"
    >
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <h2 className="font-cabinet text-5xl font-black tracking-tighter md:text-7xl">What I Do</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed opacity-80">{profile.bio[0]}</p>
        </Reveal>

        <div ref={ref} className="mt-16 grid gap-8 md:grid-cols-2">
          {focuses.map((f, i) => (
            <motion.article
              key={f.title}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              animate={reduced ? { opacity: 1, y: 0 } : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
              }
              className={`on-plate ${f.plate === 'sage' ? 'bg-plate-alt' : 'bg-plate'} relative border-2 border-black p-8 shadow-hard transition-transform duration-200 hover:-translate-y-1 md:p-10`}
              style={{ rotate: i % 2 === 0 ? '-0.6deg' : '0.6deg' }}
            >
              <span className="font-cabinet text-6xl font-black tracking-tighter opacity-30 md:text-7xl">
                0{i + 1}
              </span>
              <f.icon className="mt-4 size-8" strokeWidth={2.2} />
              <h3 className="mt-4 font-cabinet text-2xl font-black tracking-tight md:text-3xl">
                {f.title}
              </h3>
              <p className="mt-3 leading-relaxed opacity-85">{f.description}</p>
            </motion.article>
          ))}
        </div>

        {/* strengths + languages */}
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <Reveal>
            <h3 className="font-cabinet text-lg font-black tracking-tight">Strengths</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {profile.softSkills.map((s) => (
                <li key={s} className="border-2 border-black px-3 py-1.5 text-sm font-bold">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <h3 className="font-cabinet text-lg font-black tracking-tight">Languages</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {profile.languages.map((l, i) => (
                <li
                  key={l}
                  className={`on-plate border-2 border-black px-3 py-1.5 text-sm font-bold ${
                    i === 0 ? 'bg-plate' : ''
                  }`}
                >
                  {l}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}