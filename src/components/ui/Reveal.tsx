import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type RevealProps = {
  children: ReactNode
  /** seconds */
  delay?: number
  y?: number
  className?: string
  once?: boolean
}

/**
 * Fade + rise on scroll entry. `once` keeps the element settled after the
 * first reveal so content doesn't flicker while scrolling back up.
 */
export function Reveal({ children, delay = 0, y = 28, className, once = true }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const inView = useInView(ref, { once, margin: '-12% 0px -12% 0px' })

  // reduced motion: land on the final state with no tween at all
  const hidden = reduced ? false : { opacity: 0, y }
  const shown = { opacity: 1, y: 0 }
  const transition = reduced
    ? { duration: 0 }
    : { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={reduced ? shown : inView ? shown : hidden}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}