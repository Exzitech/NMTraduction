import { motion } from 'motion/react'
import type { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import {
  BadgeCheckIcon,
  DocumentIcon,
  GraduationIcon,
  HeartPulseIcon,
  LandmarkIcon,
  ScaleIcon,
  SpeechIcon,
  type IconComponent,
} from '../components/Icons'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SERVICE_IDS, type ServiceId } from '../config/site'
import { cardIn, fadeUp } from '../motion/variants'

const ICONS: Record<ServiceId, IconComponent> = {
  civil: DocumentIcon,
  residence: LandmarkIcon,
  legal: ScaleIcon,
  education: GraduationIcon,
  medical: HeartPulseIcon,
  interpreting: SpeechIcon,
}

export function Services() {
  const { t } = useTranslation()

  return (
    <section id="services" className="relative bg-blush py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-2 lg:gap-20">
          <SectionHeading eyebrow={t('services.eyebrow')} title={t('services.title')} />
          <Reveal variants={fadeUp} className="lg:pb-2">
            <p className="text-lg leading-relaxed text-graphite">{t('services.intro')}</p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 text-sm font-semibold text-lapis">
              <BadgeCheckIcon className="size-4 text-coral" />
              {t('about.points.sworn.text')}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICE_IDS.map((id, index) => (
            <ServiceCard key={id} id={id} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ id, index }: { id: ServiceId; index: number }) {
  const { t } = useTranslation()
  const Icon = ICONS[id]
  const featured = id === 'interpreting'

  const trackPointer = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <motion.article
      variants={cardIn}
      custom={index % 3}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      onMouseMove={trackPointer}
      className={`group relative flex flex-col overflow-hidden rounded-[1.75rem] border p-8 transition-[border-color,box-shadow] duration-500 hover:shadow-[0_30px_60px_-35px_rgba(28,34,48,0.5)] sm:p-9 ${
        featured ? 'border-coral bg-coral text-night' : 'border-coral/15 bg-paper text-ink hover:border-coral/50'
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(22rem circle at var(--mx, 50%) var(--my, 50%), ${
            featured ? 'rgba(255,255,255,0.35)' : 'rgba(240,116,84,0.16)'
          }, transparent 65%)`,
        }}
      />

      <div className="relative flex items-start justify-between">
        <span
          className={`grid size-14 place-items-center rounded-2xl transition-all duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110 ${
            featured ? 'bg-night text-coral' : 'bg-coral/12 text-coral-deep group-hover:bg-coral group-hover:text-night'
          }`}
        >
          <Icon className="size-6" />
        </span>
        <span className={`font-display text-sm tabular-nums ${featured ? 'text-night/60' : 'text-coral-deep/70'}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3 className="relative mt-8 font-display text-2xl font-medium">{t(`services.items.${id}.title`)}</h3>
      <p className={`relative mt-3 flex-1 leading-relaxed ${featured ? 'text-night/85' : 'text-graphite'}`}>
        {t(`services.items.${id}.text`)}
      </p>

      <span
        className={`relative mt-7 inline-flex self-start rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.12em] uppercase ${
          featured ? 'border-night/30 text-night' : 'border-coral/40 bg-coral/5 text-coral-deep'
        }`}
      >
        {featured ? t('services.badgeOral') : t('services.badgeSworn')}
      </span>

      <span
        aria-hidden
        className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 rtl:origin-right ${
          featured ? 'bg-night' : 'bg-coral'
        }`}
      />
    </motion.article>
  )
}
