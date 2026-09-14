import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { useDirection } from '../hooks/useDirection'
import { EASE } from '../motion/variants'
import { ArrowRightIcon } from './Icons'

const SOURCE_LINES = [92, 64, 80]
const SOURCE_LINES_BOTTOM = [70, 86, 48]
const TARGET_LINES = [88, 72, 94]
const TARGET_LINES_BOTTOM = [66, 82]

const line = (delay: number) => ({
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
  transition: { duration: 0.7, ease: EASE, delay },
})

/**
 * Composition du hero : un document persan (date en calendrier solaire),
 * sa traduction française jurée, signée et tamponnée.
 * 12 Tir 1365 = 3 juillet 1986.
 */
export function DocumentVisual() {
  const { t } = useTranslation()
  const { sign } = useDirection()

  return (
    <div aria-hidden className="relative mx-auto aspect-[5/6] w-full max-w-[30rem]">
      {/* Document source */}
      <motion.div
        initial={{ opacity: 0, x: -40 * sign, rotate: -14 * sign }}
        animate={{ opacity: 1, x: 0, rotate: -7 * sign }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
        className="absolute start-0 top-0 h-[74%] w-[70%] rounded-2xl border border-rule bg-[#fffdf8] p-6 shadow-[0_30px_60px_-30px_rgba(28,34,48,0.35)] sm:p-7"
      >
        <div dir="rtl" lang="fa" className="flex h-full flex-col">
          <p className="text-xl font-bold text-ink/80 sm:text-2xl">شناسنامه</p>
          <div className="mt-3 h-px bg-rule" />
          <div className="mt-5 space-y-3">
            {SOURCE_LINES.map((width) => (
              <div key={width} className="h-2 rounded-full bg-ink/10" style={{ width: `${width}%` }} />
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between rounded-lg bg-linen/70 px-3 py-2 text-sm text-ink/70">
            <span>تاریخ تولد</span>
            <span className="font-semibold text-lapis">۱۳۶۵/۰۴/۱۲</span>
          </div>
          <div className="mt-6 space-y-3">
            {SOURCE_LINES_BOTTOM.map((width) => (
              <div key={width} className="h-2 rounded-full bg-ink/10" style={{ width: `${width}%` }} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Traduction jurée : volontairement en français dans toutes les langues du site */}
      <motion.div
        lang="fr"
        dir="ltr"
        initial={{ opacity: 0, y: 60, rotate: 10 * sign }}
        animate={{ opacity: 1, y: 0, rotate: 3 * sign }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.6 }}
        className="absolute end-0 bottom-0 flex h-[80%] w-[76%] flex-col rounded-2xl border border-rule bg-white p-6 shadow-[0_40px_80px_-30px_rgba(28,34,48,0.45)] sm:p-8"
      >
        <p className="text-[0.62rem] font-bold tracking-[0.22em] text-coral-deep uppercase">Traduction jurée</p>
        <p className="mt-2 font-display text-xl text-ink sm:text-2xl">Acte de naissance</p>
        <motion.div {...line(0.95)} className="mt-3 h-px origin-left bg-rule" />

        <div className="mt-5 space-y-3">
          {TARGET_LINES.map((width, i) => (
            <motion.div
              key={width}
              {...line(1.05 + i * 0.08)}
              className="h-2 origin-left rounded-full bg-ink/10"
              style={{ width: `${width}%` }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 1.4 }}
          className="mt-6 flex items-center justify-between rounded-lg bg-linen/70 px-3 py-2 text-sm text-ink/70"
        >
          <span>Date de naissance</span>
          <span className="font-semibold text-lapis tabular-nums">03/07/1986</span>
        </motion.div>

        <div className="mt-6 space-y-3">
          {TARGET_LINES_BOTTOM.map((width, i) => (
            <motion.div
              key={width}
              {...line(1.5 + i * 0.08)}
              className="h-2 origin-left rounded-full bg-ink/10"
              style={{ width: `${width}%` }}
            />
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between">
          <svg viewBox="0 0 120 50" className="h-10 w-24 text-ink/70 sm:h-12 sm:w-28">
            <motion.path
              d="M4 34 C 14 10, 24 10, 22 30 S 36 44, 44 22 S 58 8, 60 30 C 62 44, 76 20, 84 26 S 100 36, 116 18"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: 'easeInOut', delay: 1.7 }}
            />
          </svg>
          <Stamp />
        </div>
      </motion.div>

      {/* Conversion de date */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 2.6 }}
        className="absolute start-[-2%] bottom-[14%] z-10 sm:start-[-8%]"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 3.3 }}
          className="rounded-2xl border border-rule bg-paper/95 px-4 py-3 shadow-[0_20px_40px_-20px_rgba(28,34,48,0.45)] backdrop-blur"
        >
          <p className="text-[0.62rem] font-semibold tracking-[0.16em] text-graphite uppercase">
            {t('hero.conversion')}
          </p>
          <p className="mt-1.5 flex items-center gap-2 font-semibold">
            <span lang="fa" className="text-ink/70">
              ۱۳۶۵/۰۴/۱۲
            </span>
            <ArrowRightIcon className="size-4 text-coral" />
            <span className="text-lapis tabular-nums">03/07/1986</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

function Stamp() {
  return (
    <div className="relative size-24 sm:size-28">
      <motion.span
        className="absolute inset-0 rounded-full border-2 border-coral/50"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.9, 1.6], opacity: [0.6, 0] }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 2.25 }}
      />
      <motion.svg
        viewBox="0 0 120 120"
        className="size-full text-coral-deep"
        initial={{ opacity: 0, scale: 2.2, rotate: -40 }}
        animate={{ opacity: 0.88, scale: 1, rotate: -14 }}
        transition={{ type: 'spring', stiffness: 320, damping: 20, delay: 2.1 }}
      >
        <defs>
          <path id="stamp-circle" d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" />
        </defs>
        <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="60" cy="60" r="32" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <text fill="currentColor" fontSize="9.5" fontWeight="700" style={{ fontFamily: 'var(--font-sans)' }}>
          <textPath href="#stamp-circle" textLength="268" lengthAdjust="spacing">
            TRADUCTRICE JURÉE · NM TRADUCTIONS ·
          </textPath>
        </text>
        <text
          x="60"
          y="68"
          textAnchor="middle"
          fill="currentColor"
          fontSize="22"
          fontWeight="600"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          NM
        </text>
      </motion.svg>
    </div>
  )
}
