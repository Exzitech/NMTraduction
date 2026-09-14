import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EASE } from '../motion/variants'

const WORDS = [
  { text: 'Traduction', lang: 'fr' },
  { text: 'Vertaling', lang: 'nl' },
  { text: 'Translation', lang: 'en' },
  { text: 'ترجمه', lang: 'fa' },
] as const

const INTERVAL = 2600
const TRANSITION = { duration: 0.75, ease: EASE }

/** « Traduction » dans chaque langue, en boucle. Largeur et soulignement suivent le mot affiché. */
export function RotatingWord() {
  const { t, i18n } = useTranslation()
  const [tick, setTick] = useState(0)
  const [widths, setWidths] = useState<number[]>([])
  const measureRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const id = window.setInterval(() => setTick((n) => n + 1), INTERVAL)
    return () => window.clearInterval(id)
  }, [])

  // Mesure chaque mot (et re-mesure au chargement des polices ou au changement de langue).
  useLayoutEffect(() => {
    const measure = () =>
      setWidths(measureRefs.current.map((element) => element?.getBoundingClientRect().width ?? 0))
    measure()
    const observer = new ResizeObserver(measure)
    measureRefs.current.forEach((element) => element && observer.observe(element))
    return () => observer.disconnect()
  }, [i18n.resolvedLanguage])

  const start = Math.max(
    0,
    WORDS.findIndex((word) => word.lang === i18n.resolvedLanguage),
  )
  const index = (start + tick) % WORDS.length
  const word = WORDS[index]
  const wordClasses = (lang: string) => `font-display whitespace-nowrap ${lang === 'fa' ? 'font-semibold' : ''}`

  return (
    <span className="relative inline-block align-bottom">
      <span className="sr-only">{t('hero.rotatingSr')}</span>

      <span aria-hidden className="invisible absolute start-0 top-0 flex whitespace-nowrap">
        {WORDS.map((w, i) => (
          <span
            key={w.text}
            ref={(element) => {
              measureRefs.current[i] = element
            }}
            lang={w.lang}
            dir={w.lang === 'fa' ? 'rtl' : 'ltr'}
            className={wordClasses(w.lang)}
          >
            {w.text}
          </span>
        ))}
      </span>

      <motion.span
        aria-hidden
        className="inline-grid overflow-y-clip pt-[0.1em] pb-[0.18em]"
        initial={false}
        animate={widths[index] ? { width: widths[index] } : undefined}
        transition={TRANSITION}
      >
        <AnimatePresence initial={false}>
          <motion.span
            key={word.text}
            lang={word.lang}
            dir={word.lang === 'fa' ? 'rtl' : 'ltr'}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-110%', opacity: 0 }}
            transition={TRANSITION}
            className={`col-start-1 row-start-1 justify-self-start ${wordClasses(word.lang)}`}
          >
            {word.text}
          </motion.span>
        </AnimatePresence>
      </motion.span>

      <motion.span
        aria-hidden
        className="absolute inset-x-0 -bottom-1 block h-3 origin-left rtl:origin-right"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 1.1 }}
      >
        <svg viewBox="0 0 200 12" preserveAspectRatio="none" className="size-full text-lapis">
          <path
            d="M2 8 C 50 2, 120 2, 198 7"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </motion.span>
    </span>
  )
}
