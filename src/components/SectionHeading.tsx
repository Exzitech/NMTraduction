import { motion } from 'motion/react'
import { EASE, stagger } from '../motion/variants'
import { Reveal, RevealItem } from './Reveal'

type Props = {
  eyebrow: string
  title: string
  intro?: string
  tone?: 'light' | 'dark'
  className?: string
}

export function SectionHeading({ eyebrow, title, intro, tone = 'light', className = '' }: Props) {
  const dark = tone === 'dark'

  return (
    <Reveal variants={stagger(0.1)} className={className}>
      <RevealItem
        as="p"
        className={`flex items-center gap-3 text-sm font-semibold tracking-[0.18em] uppercase ${dark ? 'text-coral' : 'text-coral-deep'}`}
      >
        <motion.span
          aria-hidden
          className={`h-px w-10 origin-left rtl:origin-right ${dark ? 'bg-coral/60' : 'bg-coral-deep/50'}`}
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.9, ease: EASE } } }}
        />
        {eyebrow}
      </RevealItem>
      <RevealItem
        as="h2"
        className={`mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] font-medium tracking-[-0.02em] ${dark ? 'text-paper' : 'text-ink'}`}
      >
        {title}
      </RevealItem>
      {intro && (
        <RevealItem
          as="p"
          className={`mt-6 max-w-2xl text-lg leading-relaxed ${dark ? 'text-paper/70' : 'text-graphite'}`}
        >
          {intro}
        </RevealItem>
      )}
    </Reveal>
  )
}
