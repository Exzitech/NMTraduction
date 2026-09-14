import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ButtonLink } from '../components/Button'
import { DocumentVisual } from '../components/DocumentVisual'
import { ArrowLeftRightIcon, BadgeCheckIcon } from '../components/Icons'
import { RotatingWord } from '../components/RotatingWord'
import { useDirection } from '../hooks/useDirection'
import { EASE } from '../motion/variants'

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
})

export function Hero() {
  const { t, i18n } = useTranslation()
  const { rtl } = useDirection()
  const persianSite = i18n.resolvedLanguage === 'fa'
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 140])

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 lg:flex lg:min-h-svh lg:items-center lg:pb-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-48 end-[-12%] size-[44rem] rounded-full bg-coral/25 blur-3xl" />
        <div className="absolute start-[-18%] bottom-[-25%] size-[38rem] rounded-full bg-lapis/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-rule" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div style={{ y: textY }}>
          <motion.p
            {...enter(0.1)}
            className="inline-flex items-center gap-2 rounded-full border border-coral/30 bg-coral/10 px-3.5 py-1.5 text-sm font-semibold text-coral-deep"
          >
            <BadgeCheckIcon className="size-4 text-coral" />
            {t('hero.eyebrow')}
          </motion.p>

          <h1
            className={`mt-7 font-display text-[clamp(3.5rem,10vw,7.5rem)] font-medium tracking-[-0.03em] text-ink ${
              rtl ? 'leading-[1.12]' : 'leading-[0.92]'
            }`}
          >
            {t('person.name')
              .split(' ')
              .map((word, i) => (
                <span key={`${word}-${i}`} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className="block"
                    initial={{ y: '105%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1.1, ease: EASE, delay: 0.25 + i * 0.12 }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className={`mt-6 font-display text-[clamp(1.9rem,4.2vw,3rem)] text-coral-600 ${rtl ? 'leading-normal' : 'leading-tight'}`}
          >
            <RotatingWord />
          </motion.p>

          <motion.p {...enter(0.9)} className="mt-7 max-w-xl text-lg leading-relaxed text-graphite sm:text-xl">
            {t('hero.lead')}
          </motion.p>

          <motion.p
            {...enter(1)}
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold tracking-[0.14em] text-coral-deep uppercase"
          >
            <span>
              {t('languages.farsi')}
              {!persianSite && (
                <>
                  {' '}
                  <span lang="fa">فارسی</span>
                </>
              )}
            </span>
            <span className="text-rule">·</span>
            <span>
              {t('languages.dari')}
              {!persianSite && (
                <>
                  {' '}
                  <span lang="fa-AF">دری</span>
                </>
              )}
            </span>
            <ArrowLeftRightIcon className="size-4 text-coral" />
            <span>{t('languages.french')}</span>
          </motion.p>

          <motion.div {...enter(1.1)} className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href="#contact">{t('hero.ctaPrimary')}</ButtonLink>
            <ButtonLink href="#services" variant="secondary" arrow={false}>
              {t('hero.ctaSecondary')}
            </ButtonLink>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: visualY }} className="px-2 sm:px-6 lg:px-0">
          <DocumentVisual />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.8 }}
        className="absolute inset-x-0 bottom-8 mx-auto hidden w-fit flex-col items-center gap-3 text-xs font-semibold tracking-[0.2em] text-graphite uppercase lg:flex"
      >
        {t('hero.scroll')}
        <span className="relative h-12 w-px overflow-hidden bg-rule">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-coral"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.a>
    </section>
  )
}
