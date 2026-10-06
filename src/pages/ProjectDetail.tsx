import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react'
import { Github } from '@/components/ui/BrandIcons'
import { getProject, projects } from '@/data/projects'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProject(slug) : undefined

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [slug])

  if (!project) {
    return (
      <section className="grid min-h-screen place-items-center px-6 pt-24 text-center dark:bg-[#020817]">
        <div>
          <p className="font-cabinet text-7xl font-black tracking-tighter">404</p>
          <h1 className="mt-4 font-cabinet text-2xl font-black">Project not found</h1>
          <p className="mt-2 opacity-70">That case study doesn&apos;t exist or has moved.</p>
          <ButtonLink to="/" className="mt-8">
            <ArrowLeft className="size-4" strokeWidth={2.6} /> Back to home
          </ButtonLink>
        </div>
      </section>
    )
  }

  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3)

  return (
    <article className="bg-neo-white dark:bg-[#020817]">
      {/* header */}
      <header className="border-b-2 border-neo-black bg-neo-charcoal px-6 pt-28 pb-16 text-neo-white md:px-12 dark:bg-[#020817]">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 text-sm font-bold transition-colors hover:text-neo-yellow dark:hover:text-[#fbbf24]"
          >
            <ArrowLeft className="size-4" strokeWidth={2.6} /> Back to Projects
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3 font-cabinet text-xs font-bold tracking-widest uppercase">
            <span className="border-2 border-neo-white px-2.5 py-1">{project.category}</span>
            <span className="text-neo-yellow dark:text-[#fbbf24]">{project.period}</span>
          </div>

          <h1 className="mt-5 font-cabinet text-4xl leading-[0.95] font-black tracking-tighter md:text-6xl">
            {project.title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed opacity-80">{project.fullDescription}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.github && (
              <ButtonLink href={project.github} target="_blank" rel="noreferrer" size="sm">
                <Github className="size-4" strokeWidth={2.6} /> Source code
              </ButtonLink>
            )}
            <ButtonLink to="/#contact" variant="outline" size="sm">
              Discuss a similar build
              <ArrowUpRight className="size-4" strokeWidth={2.6} />
            </ButtonLink>
          </div>
        </div>
      </header>

      {/* body */}
      <div className="mx-auto max-w-4xl px-6 py-20 md:px-12">
        <Reveal>
          <h2 className="font-cabinet text-3xl font-black tracking-tight">The challenge</h2>
          <p className="mt-4 text-lg leading-relaxed opacity-80">{project.challenge}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-14 font-cabinet text-3xl font-black tracking-tight">
            <span className="accent-ink">The</span> solution
          </h2>
          <p className="mt-4 text-lg leading-relaxed opacity-80">{project.solution}</p>
        </Reveal>

        {/* results */}
        <Reveal delay={0.08}>
          <h2 className="mt-14 font-cabinet text-3xl font-black tracking-tight">Results</h2>
          <ul className="mt-6 space-y-3">
            {project.results.map((r) => (
              <li key={r} className="flex gap-3 border-2 border-neo-black p-4 dark:border-neo-white">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center border-2 border-neo-black bg-neo-yellow dark:border-neo-white dark:bg-[#fbbf24]">
                  <Check className="size-3.5" strokeWidth={3.5} />
                </span>
                <span className="font-medium leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* stack */}
        <Reveal delay={0.08}>
          <h2 className="mt-14 font-cabinet text-3xl font-black tracking-tight">Built with</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <li
                key={t}
                className="border-2 border-neo-black px-3 py-1.5 text-sm font-bold transition-colors hover:bg-neo-yellow dark:hover:bg-[#4a1d1d]"
              >
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm opacity-60">
            {project.technologies.length} technologies · {project.category}
          </p>
        </Reveal>
      </div>

      {/* more */}
      <section className="border-t-2 border-neo-black bg-neo-charcoal px-6 py-16 text-neo-white md:px-12 dark:bg-[#020817]">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-cabinet text-3xl font-black tracking-tighter md:text-4xl">
            More <span className="text-neo-yellow dark:text-[#fbbf24]">work</span>
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/project/${p.slug}`}
                  className="group flex h-full flex-col border-2 border-neo-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#ffe17c]"
                >
                  <span className="font-cabinet text-xs font-bold tracking-widest uppercase opacity-60">
                    {p.category}
                  </span>
                  <span className="mt-2 font-cabinet text-lg leading-snug font-black tracking-tight">
                    {p.title}
                  </span>
                  <span className="mt-auto pt-4 text-sm font-bold transition-colors group-hover:text-neo-yellow dark:group-hover:text-[#fbbf24]">
                    Read case study →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <ButtonLink to="/">Back to Home</ButtonLink>
          </div>
        </div>
      </section>
    </article>
  )
}