import { useCallback, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'portfolio-theme'

/**
 * The site opens on the light (yellow/cream) palette and only switches to dark
 * when the visitor pulls the cord. It deliberately does *not* follow the OS
 * preference — the reference doesn't either, and defaulting to the system made
 * the page come up dark for anyone with dark mode enabled.
 */
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === 'dark' ? 'dark' : 'light'
}

/** Applies the `dark` class on <html> and persists the choice. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggleTheme }
}