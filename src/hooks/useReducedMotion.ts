import { useEffect, useState } from 'react'

/**
 * Tracks `prefers-reduced-motion: reduce`.
 *
 * When it matches, entrance animations are skipped entirely (duration 0)
 * rather than merely reduced — visitors who ask for less motion get static
 * content instead of content that still animates.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}