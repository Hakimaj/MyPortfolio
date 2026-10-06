import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import Home from '@/pages/Home'
import ProjectDetail from '@/pages/ProjectDetail'
import { useTheme } from '@/hooks/useTheme'
import { useLenis } from '@/hooks/useLenis'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/** Scrolls to a hash target after navigation, or to the top when there isn't one. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  const reduced = useReducedMotion()

  useEffect(() => {
    const behavior: ScrollBehavior = reduced ? 'auto' : 'smooth'

    if (hash) {
      // let the route render before hunting for the anchor
      const id = hash.replace('#', '')
      const t = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior })
      }, 60)
      return () => window.clearTimeout(t)
    }

    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash, reduced])

  return null
}

export default function App() {
  const { theme, toggleTheme } = useTheme()
  useLenis()

  return (
    <BrowserRouter>
      <ScrollManager />
      <div id="top" className="relative min-h-screen">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}