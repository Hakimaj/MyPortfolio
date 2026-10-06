import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'solid' | 'outline'
type Size = 'sm' | 'md'

type BaseProps = {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
}

const base =
  'inline-flex items-center justify-center gap-2 font-bold tracking-tight transition-all duration-200 ease-out select-none'

const variants: Record<Variant, string> = {
  // yellow plate that "presses" into the page on hover.
  // `text-black` (not text-neo-black) so the label stays dark on the plate in both themes.
  solid: 'bg-neo-yellow text-black border-neo-black shadow-hard hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none',
  outline:
    'bg-transparent text-neo-black border-neo-black shadow-hard hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-neo-yellow hover:shadow-none',
}

const sizes: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-sm border-2',
  md: 'px-8 py-4 text-base border-2',
}

export function Button({
  children,
  variant = 'solid',
  size = 'md',
  className = '',
  ...rest
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </button>
  )
}

export function ButtonLink({
  children,
  to,
  href,
  variant = 'solid',
  size = 'md',
  className = '',
  target,
  rel,
}: BaseProps & {
  to?: string
  href?: string
  target?: string
  rel?: string
}) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  const content = <>{children}</>

  if (to) {
    return (
      <Link to={to} className={cls}>
        {content}
      </Link>
    )
  }
  return (
    <a href={href} className={cls} target={target} rel={rel}>
      {content}
    </a>
  )
}