import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navLinks, profile } from '@/data/profile'
import { LampToggle } from './LampToggle'

type NavbarProps = {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="on-hero bg-hero sticky top-0 z-50 border-b-2 border-black">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-12">
        {/* wordmark */}
        <Link to="/" className="flex items-center gap-2 font-cabinet text-xl font-black tracking-tighter">
          <span className="grid size-9 place-items-center border-2 border-black bg-black text-sm font-black text-neo-yellow">
            AJ
          </span>
          <span className="hidden sm:inline">Adbulhakim</span>
        </Link>

        {/* desktop links */}
        <div className="hidden items-center gap-10 font-bold text-[15px] md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="underline-offset-4 transition-opacity hover:underline decoration-2 hover:opacity-70"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href="#contact"
            className="hidden border-2 border-black bg-black px-6 py-3 font-bold text-white transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm hover:shadow-none md:inline-flex"
          >
            Get in Touch
          </a>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid size-10 place-items-center border-2 border-black bg-black text-white md:hidden"
          >
            {open ? <X className="size-5" strokeWidth={2.5} /> : <Menu className="size-5" strokeWidth={2.5} />}
          </button>
        </div>
      </nav>

      {/* the lamp cord hangs from the nav, like the reference */}
      <LampToggle theme={theme} onToggle={onToggleTheme} />

      {/* mobile drawer */}
      {open && (
        <div className="border-t-2 border-black bg-hero px-6 py-6 md:hidden">
          <ul className="flex flex-col font-cabinet text-3xl font-black tracking-tighter">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b-2 border-black/20 py-3"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-2 text-sm font-medium">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={`tel:${profile.phone}`}>{profile.phone}</a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>

          {/* mobile theme control (the cord is desktop-only) */}
          <button
            onClick={onToggleTheme}
            className="mt-6 w-full border-2 border-black bg-black px-6 py-3 font-bold text-white"
          >
            {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          </button>
        </div>
      )}
    </header>
  )
}