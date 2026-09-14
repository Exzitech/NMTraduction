import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { ArrowLeftRightIcon, ArrowRightIcon, CheckIcon, SpeechIcon, type IconComponent } from '../components/Icons'
import { Reveal, RevealItem } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { useDirection } from '../hooks/useDirection'
import { EASE, fadeUp, stagger } from '../motion/variants'

// Hauteur fixe des tuiles sources (lg) : le tracé SVG s'aligne sur leurs centres.
const TILE = 176
const GAP = 40
const FLOW_HEIGHT = TILE * 2 + GAP
const CENTERS = [TILE / 2, TILE + GAP + TILE / 2]

export function Languages() {
  const { t, i18n } = useTranslation()
  const { sign } = useDirection()
  const persianSite = i18n.resolvedLanguage === 'fa'

  const sources = [
    { script: 'فارسی', lang: 'fa', name: t('languages.farsi'), region: t('languages.farsiRegion') },
    { script: 'دری', lang: 'fa-AF', name: t('languages.dari'), region: t('languages.dariRegion') },
  ]

  const pair = `${t('languages.farsi')} / ${t('languages.dari')} ↔ ${t('languages.french')}`
  const modes: { id: 'written' | 'oral'; Icon: IconComponent }[] = [
    { id: 'written', Icon: ArrowLeftRightIcon },
    { id: 'oral', Icon: SpeechIcon },
  ]

  return (
    <section id="languages" className="relative isolate overflow-hidden bg-night py-28 text-paper sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 start-1/3 size-[40rem] rounded-full bg-lapis/60 blur-3xl" />
        <div className="absolute -end-32 -bottom-48 size-[34rem] rounded-full bg-coral/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading tone="dark" eyebrow={t('languages.eyebrow')} title={t('languages.title')} />

        {/* Flux farsi / dari ↔ français */}
        <div className="mt-20 grid items-center gap-6 lg:grid-cols-[1fr_12rem_1fr] lg:gap-0">
          <div className="grid gap-6 lg:gap-10">
            {sources.map((source) => (
              <Reveal
                key={source.lang}
                variants={fadeUp}
                className="flex flex-col justify-center border-b border-paper/10 pb-6 lg:h-44 lg:border-0 lg:pb-0"
              >
                <p className="text-[clamp(3.5rem,9vw,6.5rem)] leading-[1.1] font-semibold">
                  <span lang={source.lang}>{source.script}</span>
                </p>
                <p className="mt-2 text-sm tracking-[0.16em] text-paper/60 uppercase">
                  {!persianSite && <span className="font-semibold text-coral">{source.name} · </span>}
                  {source.region}
                </p>
              </Reveal>
            ))}
          </div>

          <div aria-hidden className="relative hidden lg:block" style={{ height: FLOW_HEIGHT }}>
            <svg
              viewBox={`0 0 192 ${FLOW_HEIGHT}`}
              className="absolute inset-0 size-full overflow-visible text-coral rtl:-scale-x-100"
            >
              {CENTERS.map((y, i) => (
                <motion.path
                  key={y}
                  d={`M0 ${y} C 110 ${y}, 90 ${FLOW_HEIGHT / 2}, 172 ${FLOW_HEIGHT / 2}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1.4, ease: EASE, delay: 0.2 + i * 0.15 }}
                />
              ))}
            </svg>
            <motion.span
              className="absolute end-0 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-coral text-night"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 1.3 }}
            >
              <ArrowLeftRightIcon className="size-5" />
            </motion.span>
          </div>

          <div aria-hidden className="flex justify-center lg:hidden">
            <motion.span
              className="grid size-12 place-items-center rounded-full bg-coral text-night"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            >
              <ArrowLeftRightIcon className="size-5 rotate-90" />
            </motion.span>
          </div>

          <Reveal variants={fadeUp} className="lg:ps-12">
            <p
              lang="fr"
              className="font-display text-[clamp(3.25rem,8vw,6rem)] leading-[1.05] font-medium tracking-[-0.02em] text-coral"
            >
              Français
            </p>
            <p className="mt-2 text-sm tracking-[0.16em] text-paper/60 uppercase">
              <span className="font-semibold text-coral">{t('languages.french')}</span> · {t('languages.target')}
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-5 lg:grid-cols-12">
          <Reveal variants={stagger(0.12)} className="grid gap-5 lg:col-span-5">
            {modes.map(({ id, Icon }) => (
              <RevealItem
                key={id}
                className="group rounded-3xl border border-coral/25 bg-coral/[0.06] p-8 transition-colors duration-500 hover:border-coral/60 hover:bg-coral/[0.1]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold tracking-[0.16em] text-paper/60 uppercase">
                    {t(`languages.${id}.label`)}
                  </p>
                  <Icon className="size-5 text-coral transition-transform duration-500 group-hover:scale-125" />
                </div>
                <p className="mt-4 font-display text-[1.7rem] leading-snug">{pair}</p>
                <p className="mt-5 inline-flex rounded-full bg-coral/15 px-3 py-1 text-sm font-semibold text-coral">
                  {t(`languages.${id}.note`)}
                </p>
              </RevealItem>
            ))}
          </Reveal>

          <Reveal
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl border border-coral/25 bg-gradient-to-br from-lapis to-night p-8 sm:p-10 lg:col-span-7"
          >
            <h3 className="font-display text-3xl">{t('languages.expertise.title')}</h3>
            <p className="mt-4 max-w-xl leading-relaxed text-paper/70">{t('languages.expertise.text')}</p>

            <ul className="mt-7 space-y-3">
              {(['names', 'dates', 'terms'] as const).map((id) => (
                <li key={id} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-coral/20 text-coral">
                    <CheckIcon className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span className="text-paper/85">{t(`languages.expertise.bullets.${id}`)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-paper/10 pt-8">
              <p className="text-xs font-semibold tracking-[0.18em] text-paper/50 uppercase">
                {t('languages.expertise.conversion')}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                <span lang="fa" className="text-3xl font-semibold text-paper/80 sm:text-4xl">
                  ۱۳۶۵/۰۴/۱۲
                </span>
                <motion.span
                  initial={{ x: -10 * sign, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
                >
                  <ArrowRightIcon className="size-6 text-coral" />
                </motion.span>
                <span lang="fr" className="font-display text-3xl text-paper tabular-nums sm:text-4xl">
                  03/07/1986
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
