import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowRightIcon } from './Icons'

type Variant = 'primary' | 'secondary' | 'light'

const variants: Record<Variant, string> = {
  primary: 'bg-coral text-night shadow-[0_14px_30px_-14px_rgba(240,116,84,0.85)] hover:bg-coral-600',
  secondary: 'border border-coral/40 text-ink hover:border-coral hover:bg-coral/10',
  light: 'bg-paper text-night hover:bg-linen',
}

export const buttonClasses = (variant: Variant = 'primary', className = '') =>
  `group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-semibold transition-colors duration-300 disabled:cursor-wait disabled:opacity-80 ${variants[variant]} ${className}`

const Arrow = () => (
  <ArrowRightIcon className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
)

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
  arrow?: boolean
  children: ReactNode
}

export function ButtonLink({ variant, arrow = true, className, children, ...rest }: LinkProps) {
  return (
    <a className={buttonClasses(variant, className)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </a>
  )
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  arrow?: boolean
  children: ReactNode
}

export function Button({ variant, arrow = false, className, children, ...rest }: ButtonProps) {
  return (
    <button className={buttonClasses(variant, className)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </button>
  )
}
