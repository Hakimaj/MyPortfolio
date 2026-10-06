import { useEffect } from 'react'
import { About } from '@/components/About'
import { Certificates } from '@/components/Certificates'
import { Contact } from '@/components/Contact'
import { Hero } from '@/components/Hero'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'
import { StatsStrip } from '@/components/StatsStrip'
import { Timeline } from '@/components/Timeline'

export default function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <>
      <Hero />
      <StatsStrip />
      <About />
      <Skills />
      <Projects />
      <Timeline />
      <Certificates />
      <Contact />
    </>
  )
}