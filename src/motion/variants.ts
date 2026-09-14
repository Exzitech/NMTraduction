import type { Variants } from 'motion/react'

export const EASE = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: EASE } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: EASE } },
}

/** Pour les grilles : chaque carte se révèle seule, décalée selon sa colonne (custom). */
export const cardIn: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (column: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: column * 0.08 },
  }),
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
})
