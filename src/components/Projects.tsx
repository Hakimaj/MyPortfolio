import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Github } from '@/components/ui/BrandIcons'
import { projectCategories, projects, type Project } from '@/data/projects'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'

const accentClass: Record<Project['accent'], string> = {
  yellow: 'bg-neo-yellow dark:bg-[#4a1d1d]',
  red: 'bg-accent-red',
  sage: 'bg-neo-sage dark:bg-[#1f2937]',
  orange: 'bg-accent-orange',
  green: 'bg-accent-green',
  white: 'bg-neo-white dark:bg-[#111827]',
}

export function Projects() {
  const [active, setActive] = useState('All')
  const reduced = useReducedMotion()

  const visible = useMemo(
    () => (active === 'All' ? projects : projects.filter((p) => p.category === active)),
    [active],
  )

  return (
    <section
      id="work"
      className="on-band bg-band relative overflow-hidden border-b-2 border-black px-6 py-28 md:px-12 md:py-32"
    >
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          lead="Featured"
          accent="Projects"
          outline
          sub="Six builds across backend services, full-stack product work and blockchain analytics — from systems presented to the National Bank of Ethiopia to software a paying customer runs on daily."
        />

        {/* filters */}
        <Reveal className="mb-12 flex flex-wrap justify-center gap-3">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`border-2 px-4 py-2 text-xs font-black tracking-widest uppercase transition-all duration-200 ${
                active === cat
                  ? 'border-neo-yellow bg-neo-yellow text-neo-black dark:border-[#fbbf24] dark:bg-[#fbbf24] dark:text-black'
                  : 'border-neo-white/60 hover:border-neo-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        {/* grid */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <motion.article
              key={p.slug}
              layout
              initial={reduced ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduced
                  ? { duration: 0 }
                  : {
                      duration: 0.45,
                      delay: Math.min(i, 5) * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
              className="group relative flex flex-col border-2 border-neo-white bg-neo-charcoal transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[8px_8px_0_0_#ffe17c] dark:bg-[#020817]"
            >
              {/* accent header */}
              <div
                className={`relative flex h-40 items-end justify-between overflow-hidden border-b-2 border-neo-white p-5 ${accentClass[p.accent]}`}
              >
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="absolute inset-0 size-full object-cover opacity-40 transition-opacity duration-300 group-hover:opacity-60"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                )}
                <span className="relative font-cabinet text-5xl font-black tracking-tighter text-black opacity-30 md:text-6xl">
                  0{i + 1}
                </span>
                <span className="relative border-2 border-neo-black bg-neo-white px-2.5 py-1 text-[10px] font-black tracking-widest uppercase text-black">
                  {p.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="mb-2 font-cabinet text-xs font-bold tracking-widest uppercase opacity-60">
                  {p.period}
                </p>
                <h3 className="font-cabinet text-xl leading-tight font-black tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 grow text-sm leading-relaxed opacity-75">{p.summary}</p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="border border-neo-white/50 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center gap-4 border-t-2 border-neo-white/25 pt-4">
                  <Link
                    to={`/project/${p.slug}`}
                    className="inline-flex items-center gap-1.5 font-bold transition-colors hover:text-neo-yellow dark:hover:text-[#fbbf24]"
                  >
                    Case study
                    <ArrowUpRight className="size-4" strokeWidth={2.6} />
                  </Link>
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.title} source code`}
                      className="ml-auto transition-colors hover:text-neo-yellow dark:hover:text-[#fbbf24]"
                    >
                      <Github className="size-5" strokeWidth={2.4} />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}