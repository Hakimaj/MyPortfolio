import { useState } from 'react'
import { ArrowUp, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Github, Linkedin } from '@/components/ui/BrandIcons'
import { navLinks, profile } from '@/data/profile'

export function Footer() {
  // read once on mount so the year can't drift mid-render
  const [year] = useState(() => new Date().getFullYear())

  return (
    <footer className="border-t-2 border-neo-black bg-neo-charcoal px-6 py-12 text-neo-white dark:bg-[#020817]">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-8 text-center">
          <Link
            to="/"
            className="font-cabinet text-3xl font-black tracking-tighter md:text-5xl"
          >
            Let&apos;s build
            <span className="text-neo-yellow dark:text-[#fbbf24]"> something </span>
            {' '}
            <span className="stroke-text">useful</span>
          </Link>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-bold">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="underline-offset-4 transition-colors hover:text-neo-yellow hover:underline decoration-2 dark:hover:text-[#fbbf24]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-3">
            {[
              { icon: Github, href: profile.github, label: 'GitHub' },
              { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
              { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={label}
                className="grid size-11 place-items-center border-2 border-neo-white transition-all duration-200 hover:bg-neo-yellow hover:text-neo-black dark:hover:bg-[#fbbf24] dark:hover:text-black"
              >
                <Icon className="size-5" strokeWidth={2.4} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t-2 border-neo-white/25 pt-6 text-xs font-bold tracking-widest uppercase opacity-60 sm:flex-row">
          <p>
            © {year} {profile.name}
          </p>
          <p>Built with React, TypeScript &amp; Tailwind CSS</p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 transition-colors hover:text-neo-yellow dark:hover:text-[#fbbf24]"
          >
            Back to top
            <ArrowUp className="size-4" strokeWidth={2.8} />
          </a>
        </div>
      </div>
    </footer>
  )
}