import { motion, type HTMLMotionProps, type Variants } from 'motion/react'
import { fadeUp } from '../motion/variants'

const tags = {
  div: motion.div,
  p: motion.p,
  h2: motion.h2,
  h3: motion.h3,
  ul: motion.ul,
  li: motion.li,
  article: motion.article,
}

type Tag = keyof typeof tags

type RevealProps = Omit<HTMLMotionProps<'div'>, 'variants'> & {
  as?: Tag
  variants?: Variants
  amount?: number
}

/** Déclenche ses variantes à l'entrée dans le viewport (une seule fois). */
export function Reveal({ as = 'div', variants = fadeUp, amount = 0.15, ...rest }: RevealProps) {
  const Component = tags[as] as typeof motion.div
  return (
    <Component
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount, margin: '0px 0px -8% 0px' }}
      {...rest}
    />
  )
}

/** Enfant d'un <Reveal variants={stagger()}> : hérite du déclenchement du parent. */
export function RevealItem({ as = 'div', variants = fadeUp, ...rest }: Omit<RevealProps, 'amount'>) {
  const Component = tags[as] as typeof motion.div
  return <Component variants={variants} {...rest} />
}
