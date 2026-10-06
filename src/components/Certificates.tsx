import { Award, ArrowUpRight } from 'lucide-react'
import { certificates } from '@/data/certificates'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'

export function Certificates() {
  return (
    <section
      id="certificates"
      className="on-paper bg-paper relative overflow-hidden border-b-2 border-black px-6 py-28 md:px-12 md:py-32"
    >
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          lead="Courses &"
          accent="Certificates"
          sub="Ten verified certifications spanning Spring Boot, Python, React, DevOps and machine learning."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((c, i) => {
            const body = (
              <>
                <span className="grid size-10 shrink-0 place-items-center border-2 border-neo-black bg-neo-yellow transition-transform duration-200 group-hover:-rotate-6 dark:bg-[#4a1d1d]">
                  <Award className="size-5" strokeWidth={2.5} />
                </span>
                <span className="min-w-0 grow">
                  <span className="block font-cabinet text-base leading-snug font-black tracking-tight">
                    {c.title}
                  </span>
                  <span className="mt-1 block text-xs font-bold tracking-widest uppercase opacity-60">
                    {c.issuer}
                  </span>
                </span>
                {c.url && (
                  <ArrowUpRight
                    className="size-5 shrink-0 opacity-40 transition-opacity group-hover:opacity-100"
                    strokeWidth={2.6}
                  />
                )}
              </>
            )

            const cls =
              'group flex items-center gap-4 border-2 border-neo-black bg-neo-white p-5 transition-all duration-200 hover:shadow-hard dark:bg-[#020817]'

            return (
              <Reveal key={c.title} delay={Math.min(i, 8) * 0.05}>
                {c.url ? (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`${cls} h-full`}
                  >
                    {body}
                  </a>
                ) : (
                  <div className={cls}>{body}</div>
                )}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}