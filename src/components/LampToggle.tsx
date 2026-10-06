import { useCallback, useEffect, useRef } from 'react'

/**
 * Pull-cord theme toggle.
 *
 * The cord is a small verlet rope: `SEGMENTS + 1` points, the first pinned to the
 * nav, the rest falling under gravity and held together by distance constraints.
 * Drag the bulb and the rope stretches; once the stretch passes
 * `TOGGLE_STRETCH` segment lengths the theme flips, then the rope snaps back.
 *
 * Geometry values mirror the reference so the feel matches: a 176px cord made of
 * 16 segments, toggling at 20 segments of stretch and clamped at 26.
 */

const CORD_WIDTH = 64
const ANCHOR_X = CORD_WIDTH / 2
const CORD_LENGTH = 176
const SEGMENTS = 16
const SEGMENT_LENGTH = CORD_LENGTH / SEGMENTS

const GRAVITY = 1250
const DAMPING = 0.94

/** Stretch (in segment lengths) at which the theme flips. */
const TOGGLE_STRETCH = 20
/** Hard limit so the cord can never stretch forever. */
const MAX_STRETCH = 26

const MAX_STRETCH_PX = MAX_STRETCH * SEGMENT_LENGTH
const MAX_VELOCITY = 22
const SLEEP_VELOCITY = 0.15

/** Relaxation iterations for the distance constraints. More = tauter cord. */
const CONSTRAINT_PASSES = 5

const BULB_SIZE = 46
const VIEW_HEIGHT = CORD_LENGTH + BULB_SIZE

type Point = {
  x: number
  y: number
  /** previous position, for verlet velocity */
  ox: number
  oy: number
  pinned: boolean
}

const makeRope = (): Point[] =>
  Array.from({ length: SEGMENTS + 1 }, (_, i) => {
    const y = i * SEGMENT_LENGTH
    return { x: ANCHOR_X, y, ox: ANCHOR_X, oy: y, pinned: i === 0 }
  })

/** Smooth quadratic path through the points' midpoints. */
function ropePath(points: Point[]): string {
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`

  for (let i = 1; i < points.length - 1; i++) {
    const a = points[i]
    const b = points[i + 1]
    const midX = (a.x + b.x) / 2
    const midY = (a.y + b.y) / 2
    d += ` Q ${a.x.toFixed(1)} ${a.y.toFixed(1)} ${midX.toFixed(1)} ${midY.toFixed(1)}`
  }

  const end = points[points.length - 1]
  d += ` L ${end.x.toFixed(1)} ${end.y.toFixed(1)}`
  return d
}

type LampToggleProps = {
  theme: 'light' | 'dark'
  onToggle: () => void
}

export function LampToggle({ theme, onToggle }: LampToggleProps) {
  const rope = useRef<Point[]>(makeRope())
  const pathEl = useRef<SVGPathElement>(null)
  const bulbEl = useRef<SVGGElement>(null)

  const dragging = useRef(false)
  const pointerId = useRef<number | null>(null)
  const target = useRef({ x: ANCHOR_X, y: CORD_LENGTH })
  /** whether this single pull has already flipped the theme */
  const fired = useRef(false)
  const asleep = useRef(false)

  const isDark = theme === 'dark'

  /** how far the cord is stretched, measured in segment lengths */
  const stretchOf = useCallback((points: Point[]) => {
    const end = points[points.length - 1]
    const dy = Math.max(0, end.y - CORD_LENGTH)
    const dx = end.x - ANCHOR_X
    return Math.hypot(dx, dy) / SEGMENT_LENGTH
  }, [])

  const pull = useCallback(() => {
    fired.current = false
    asleep.current = false
  }, [])

  useEffect(() => {
    let frame = 0
    let last = performance.now()

    const tick = (now: number) => {
      // clamp dt so a backgrounded tab can't explode the simulation
      const dt = Math.min((now - last) / 1000, 1 / 30)
      last = now

      const points = rope.current
      const step = dt * dt

      if (!dragging.current && !asleep.current) {
        for (let i = 1; i < points.length; i++) {
          const p = points[i]
          const vx = (p.x - p.ox) * DAMPING
          const vy = (p.y - p.oy) * DAMPING

          // clamp velocity so the cord never flickers
          const speed = Math.hypot(vx, vy)
          const scale = speed > MAX_VELOCITY ? MAX_VELOCITY / speed : 1

          p.ox = p.x
          p.oy = p.y
          p.x += vx * scale
          p.y += vy * scale + GRAVITY * step
        }

        // distance constraints — several passes keep the cord taut under gravity
        for (let pass = 0; pass < CONSTRAINT_PASSES; pass++) {
          for (let i = 0; i < points.length - 1; i++) {
            const a = points[i]
            const b = points[i + 1]
            const dx = b.x - a.x
            const dy = b.y - a.y
            const dist = Math.hypot(dx, dy) || 0.0001
            const diff = (dist - SEGMENT_LENGTH) / dist

            if (a.pinned) {
              b.x -= dx * diff
              b.y -= dy * diff
            } else if (b.pinned) {
              a.x += dx * diff
              a.y += dy * diff
            } else {
              const half = diff / 2
              a.x += dx * half
              a.y += dy * half
              b.x -= dx * half
              b.y -= dy * half
            }
          }
        }

        // clamp total stretch
        const end = points[points.length - 1]
        const dx = end.x - ANCHOR_X
        const dy = end.y
        const dist = Math.hypot(dx, dy)
        if (dist > MAX_STRETCH_PX) {
          const k = MAX_STRETCH_PX / dist
          end.x = ANCHOR_X + dx * k
          end.y = dy * k
        }

        // flip the theme once the cord is pulled far enough
        if (!fired.current && stretchOf(points) > TOGGLE_STRETCH) {
          fired.current = true
          onToggle()
        }

        // go to sleep once everything has settled
        let moving = false
        for (let i = 1; i < points.length; i++) {
          if (Math.hypot(points[i].x - points[i].ox, points[i].y - points[i].oy) > SLEEP_VELOCITY) {
            moving = true
            break
          }
        }
        if (!moving) asleep.current = true
      }

      // while dragging, the bulb tracks the pointer
      if (dragging.current) {
        const end = points[points.length - 1]
        const t = target.current
        const dx = t.x - ANCHOR_X
        const dy = Math.max(0, t.y)
        const dist = Math.hypot(dx, dy)
        const k = dist > MAX_STRETCH_PX ? MAX_STRETCH_PX / dist : 1
        end.x = ANCHOR_X + dx * k
        end.y = dy * k
        end.ox = end.x
        end.oy = end.y

        // dragging past the threshold flips it too
        if (!fired.current && dist / SEGMENT_LENGTH > TOGGLE_STRETCH) {
          fired.current = true
          onToggle()
        }
      }

      const last2 = points[points.length - 1]
      pathEl.current?.setAttribute('d', ropePath(points))
      bulbEl.current?.setAttribute(
        'transform',
        `translate(${(last2.x - ANCHOR_X).toFixed(2)} ${(last2.y - CORD_LENGTH).toFixed(2)})`,
      )

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [onToggle, stretchOf])

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    e.preventDefault()
    dragging.current = true
    asleep.current = false
    pointerId.current = e.pointerId
    e.currentTarget.setPointerCapture(e.pointerId)

    const box = e.currentTarget.getBoundingClientRect()
    target.current = {
      x: e.clientX - box.left,
      y: Math.max(0, e.clientY - box.top),
    }
    pull()
  }

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragging.current) return
    const box = e.currentTarget.getBoundingClientRect()
    target.current = {
      x: e.clientX - box.left,
      y: Math.max(0, e.clientY - box.top),
    }
  }

  const release = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragging.current) return
    dragging.current = false
    asleep.current = false
    if (pointerId.current !== null && e.currentTarget.hasPointerCapture(pointerId.current)) {
      e.currentTarget.releasePointerCapture(pointerId.current)
    }
    pointerId.current = null
  }

  /** keyboard parity — the rope can't be dragged without a pointer */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onToggle()
    }
  }

  return (
    <div className="pointer-events-none absolute top-full right-4 z-40 hidden md:block lg:right-8">
      <div className="group pointer-events-auto relative flex justify-center">
        {/* hover hint */}
        <span
          className="absolute right-full top-24 mr-3 hidden -translate-y-1/2 rounded border-2 border-black bg-white px-2 py-1 text-[10px] font-black tracking-widest whitespace-nowrap text-black uppercase opacity-0 transition-opacity group-hover:opacity-100 lg:block"
          aria-hidden
        >
          Pull the cord
        </span>

        <svg
          width={CORD_WIDTH}
          height={VIEW_HEIGHT}
          viewBox={`0 0 ${CORD_WIDTH} ${VIEW_HEIGHT}`}
          className="cursor-grab touch-none overflow-visible active:cursor-grabbing"
          role="button"
          tabIndex={0}
          aria-label={isDark ? 'Pull the cord to switch to light mode' : 'Pull the cord to switch to dark mode'}
          aria-describedby="lamp-cord-help"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={release}
          onPointerCancel={release}
          onKeyDown={onKeyDown}
        >
          <desc id="lamp-cord-help">Drag the bulb downwards to toggle the colour theme.</desc>

          {/* cord */}
          <path
            ref={pathEl}
            d={`M ${ANCHOR_X} 0 L ${ANCHOR_X} ${CORD_LENGTH}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            opacity={0.75}
            vectorEffect="non-scaling-stroke"
          />

          {/* bulb, positioned each frame by the simulation */}
          <g ref={bulbEl}>
            {/* glow — lit while the dark theme is on */}
            <circle
              cx={ANCHOR_X}
              cy={CORD_LENGTH}
              r={BULB_SIZE / 2 + 7}
              fill={isDark ? '#ffe17c' : 'transparent'}
              opacity={isDark ? 0.35 : 0}
            />
            <circle
              cx={ANCHOR_X}
              cy={CORD_LENGTH}
              r={BULB_SIZE / 2}
              fill={isDark ? '#ffe17c' : '#fff'}
              stroke="currentColor"
              strokeWidth={2.5}
              vectorEffect="non-scaling-stroke"
            />
            {/* filament */}
            <path
              d={`M ${ANCHOR_X - 6} ${CORD_LENGTH - 5} v 10 M ${ANCHOR_X + 6} ${CORD_LENGTH - 5} v 10`}
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              opacity={0.55}
              vectorEffect="non-scaling-stroke"
            />
            {/* cap */}
            <rect
              x={ANCHOR_X - 7}
              y={CORD_LENGTH - BULB_SIZE / 2 - 5}
              width={14}
              height={5}
              rx={1.5}
              fill="currentColor"
            />
          </g>
        </svg>
      </div>
    </div>
  )
}