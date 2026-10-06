import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { GraduationCap, MapPin, Briefcase } from 'lucide-react'
import { timeline, type TimelineEntry } from '@/data/timeline'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SectionHeading } from './ui/SectionHeading'

function Entry({ entry, index }: { entry: TimelineEntry; index: number }) {
  const ref = useRef<HTMLLIElement>(null)
  const reduced = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' })
  const isWork = entry.kind === 'work'
  const Icon = isWork ? Briefcase : GraduationCap

  return (
    <motion.li
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 36 }}
      animate={
        reduced ? { opacity: 1, y: 0 } : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }
      }
      transition={
        reduced
          ? { duration: 0 }
          : { duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }
      }
      className={`relative w-full pl-20 md:pl-0 ${
        index % 2 === 0 ? 'md:pr-[52%]' : 'md:ml-auto md:pl-[52%]'
      }`}
    >
      {/* node */}
      <span
        className={`absolute top-2 left-[19px] z-10 grid size-11 place-items-center border-2 border-neo-white md:left-1/2 md:-translate-x-1/2 ${
          isWork ? 'bg-neo-yellow text-neo-black dark:bg-[#fbbf24] dark:text-black' : 'bg-neo-sage text-neo-black dark:bg-[#1f2937] dark:text-neo-white'
        }`}
        aria-hidden
      >
        <Icon className="size-5" strokeWidth={2.5} />
      </span>

      <div className="border-2 border-neo-white p-6 transition-all duration-200 hover:shadow-[6px_6px_0_0_#ffe17c]">
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-cabinet text-xs font-bold tracking-widest uppercase">
          <span className="accent-ink">{entry.period}</span>
          <span className="flex items-center gap-1 opacity-60">
            <MapPin className="size-3.5" strokeWidth={2.6} /> {entry.location}
          </span>
        </div>

        <h3 className="font-cabinet text-xl leading-tight font-black tracking-tight md:text-2xl">
          {entry.title}
        </h3>
        <p className="mt-1 text-sm font-bold opacity-75">{entry.org}</p>

        <ul className="mt-4 space-y-2">
          {entry.points.map((p) => (
            <li key={p} className="flex gap-2 text-sm leading-relaxed opacity-80">
              <span className="mt-2 size-1.5 shrink-0 bg-neo-yellow dark:bg-[#fbbf24]" aria-hidden />
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {entry.tags.map((t) => (
            <li
              key={t}
              className="border border-neo-white/50 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  )
}

export function Timeline() {
  return (
    <section
      id="experience"
      className="on-paper bg-paper relative overflow-hidden border-b-2 border-black px-6 py-28 md:px-12 md:py-32"
    >
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          lead="Experience &"
          accent="Education"
          outline
          sub="An internship in emerging technologies at INSA alongside a fifth-year Computer Engineering degree — both feeding the same full-stack practice."
        />

        {/* spine */}
        <div className="relative">
          <span
            className="absolute top-0 bottom-0 left-[39px] w-0.5 bg-neo-black md:left-1/2 md:-translate-x-1/2 dark:bg-neo-white"
            aria-hidden
          />
          <ul className="space-y-10 md:space-y-14">
            {timeline.map((entry, i) => (
              <Entry key={entry.id} entry={entry} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}