import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, Download } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { profile } from '@/data/profile'

/**
 * Local profile photo — place your photo at public/images/profile.jpg
 * (download from Drive and save it there; local files always load reliably)
 */
const photo = '/images/profile.jpg'

/** Public Google Drive link to the CV PDF */
const cvUrl = 'https://drive.google.com/file/d/1WQfFPOtuESoO_upOyafxC_KT8rjN9aP6/view?usp=drive_link'

function BrowserCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: 2.5 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-md md:max-w-none"
    >
      <div className="border-2 border-black bg-white shadow-hard-lg">
        {/* title bar */}
        <div className="flex items-center gap-2 border-b-2 border-black bg-black px-4 py-3">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>

        {/* body */}
        <div className="p-4">
          <div className="photo-slot grid aspect-[4/3] place-items-center overflow-hidden border-2 border-black bg-[#f1f1f1]">
            <img
              src={photo}
              alt={`${profile.name}, software developer`}
              className="size-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Hero() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const fade = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const shown = { opacity: 1, y: 0 }
  const rise = (delay: number) =>
    reduced
      ? { initial: false as const, animate: shown, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 24 },
          animate: shown,
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  const words = profile.name.split(' ')

  return (
    <section className="on-hero bg-hero relative overflow-hidden border-b-2 border-black">
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-[0.14]" aria-hidden />

      <motion.div style={{ opacity: fade }} className="relative mx-auto max-w-7xl px-6 pt-32 pb-20 md:px-12 md:pt-40 md:pb-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            {/* pill badge */}
            <motion.div
              {...rise(0)}
              className="mb-7 inline-flex max-w-full flex-wrap items-center gap-x-2 rounded-full border-2 border-black px-4 py-2 text-[10px] font-black tracking-wider uppercase sm:px-5 sm:text-xs"
            >
              {profile.roles[0]} &bull; {profile.location}
            </motion.div>

            {/* name: first word solid, rest outlined */}
            <h1 className="font-cabinet text-[clamp(2.1rem,12.5vw,7.5rem)] leading-[0.85] font-black tracking-tighter uppercase">
              {words.map((word, i) => (
                <motion.span
                  key={word}
                  {...rise(0.06 * i)}
                  className={`block ${i === 0 ? '' : 'stroke-text'}`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              {...rise(0.3)}
              className="mt-7 max-w-xl text-lg leading-relaxed font-medium md:text-xl"
            >
              {profile.tagline}
            </motion.p>

            {/* buttons */}
            <motion.div {...rise(0.4)} className="mt-9 flex flex-wrap gap-4">
              <a
                href="#work"
                className="inline-flex items-center gap-2 border-2 border-black bg-black px-8 py-4 font-bold text-white transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-hard hover:shadow-none"
              >
                View Projects
                <ArrowRight className="size-4" strokeWidth={2.8} />
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 border-2 border-black bg-white px-8 py-4 font-bold text-black transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-hard hover:shadow-none"
              >
                About Me
              </a>
              <a
                href={cvUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border-2 border-black bg-white px-8 py-4 font-bold text-black transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-hard hover:shadow-none"
              >
                <Download className="size-4" strokeWidth={2.8} />
                View CV
              </a>
            </motion.div>
          </div>

          <BrowserCard />
        </div>
      </motion.div>
    </section>
  )
}