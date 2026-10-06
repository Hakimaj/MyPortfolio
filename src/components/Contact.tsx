import { useState, type ComponentType, type FormEvent, type SVGProps } from 'react'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { Github, Linkedin } from '@/components/ui/BrandIcons'
import { profile } from '@/data/profile'
import { Reveal } from './ui/Reveal'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/** lucide icons and the inlined brand marks share this shape. */
type Icon = ComponentType<SVGProps<SVGSVGElement>>

const contactLinks: { icon: Icon; label: string; value: string; href?: string }[] = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
  { icon: Github, label: 'GitHub', value: 'github.com/Hakimaj', href: profile.github },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'in/abdulhakim-biadgo',
    href: profile.linkedin,
  },
  { icon: MapPin, label: 'Location', value: profile.location },
]

/**
 * Sits on the yellow band, like the reference. The form is a solid plate and the
 * fields are solid white boxes, so the band's dot pattern never reads through
 * the form.
 */
export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  /**
   * No backend here — the form composes a prefilled email and hands off to the
   * visitor's mail client. Swap this for a fetch() to a form endpoint (Web3Forms,
   * Formspree, Resend, a serverless function) when you want in-browser delivery.
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setStatus('error')
      return
    }

    setStatus('sending')

    const subject = form.subject?.trim() || `Portfolio enquiry from ${form.name}`
    const body = `${form.message}\n\n—\n${form.name}\n${form.email}`

    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`

    window.setTimeout(() => setStatus('sent'), 700)
  }

  return (
    <section
      id="contact"
      className="on-hero bg-hero dot-pattern relative overflow-hidden border-b-2 border-black px-6 py-28 md:px-12 md:py-32"
    >
      <div className="relative mx-auto max-w-5xl">
        <Reveal className="mb-14 text-center">
          <h2 className="font-cabinet text-5xl font-black tracking-tighter md:text-7xl">
            Let&rsquo;s{' '}
            {/* white letters with a 2px black outline, as on the reference */}
            <span className="stroke-outline">Collaborate</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-bold md:text-xl">
            Open to software engineering internships, freelance builds and backend or
            full-stack roles. Tell me what you&rsquo;re working on.
          </p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          {/* direct channels */}
          <Reveal>
            <ul className="space-y-4">
              {contactLinks.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center border-2 border-black bg-white text-black transition-transform duration-200 group-hover:-rotate-6">
                      <Icon className="size-5" strokeWidth={2.5} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-black tracking-widest uppercase opacity-60">
                        {label}
                      </span>
                      <span className="block truncate font-bold">{value}</span>
                    </span>
                  </>
                )
                const cls =
                  'group flex items-center gap-4 border-2 border-black bg-neo-yellow p-4 transition-all duration-200 hover:translate-x-1 hover:shadow-hard'

                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noreferrer' : undefined}
                        className={cls}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className={cls}>{inner}</div>
                    )}
                  </li>
                )
              })}
            </ul>
          </Reveal>

          {/* form — solid plate, so no dots behind the fields */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden border-2 border-black bg-neo-yellow p-6 shadow-hard md:p-10">
              {/* decorative corner, as on the reference */}
              <div
                className="bg-neo-white absolute top-0 right-0 z-0 h-28 w-28 rounded-bl-full border-b-2 border-l-2 border-black"
                aria-hidden
              />

              <div className="relative z-10">
                <h3 className="font-cabinet text-3xl font-black tracking-tighter md:text-4xl">
                  Send Me a Message
                </h3>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-black tracking-wide"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={form.name}
                        onChange={update('name')}
                        placeholder="John Doe"
                        className="field"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-black tracking-wide"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={form.email}
                        onChange={update('email')}
                        placeholder="you@company.com"
                        className="field"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-2 block text-sm font-black tracking-wide">
                      Subject <span className="opacity-55">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={form.subject}
                      onChange={update('subject')}
                      placeholder="Internship opportunity"
                      className="field"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-black tracking-wide"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={update('message')}
                      placeholder="Tell me about the role or project…"
                      className="field resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center justify-center gap-2 border-2 border-black bg-black px-8 py-4 font-black text-white transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-hard hover:shadow-none disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Opening mail app…' : 'Send Message'}
                    <Send className="size-4" strokeWidth={2.8} />
                  </button>

                  <p className="min-h-5 text-sm font-black" role="status" aria-live="polite">
                    {status === 'sent' && 'Sent — I&apos;ll get back to you shortly.'}
                    {status === 'error' && (
                      <span className="bg-black px-2 py-1 text-white">
                        Please fill in your details.
                      </span>
                    )}
                  </p>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}