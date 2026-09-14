import { useTranslation } from 'react-i18next'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { site } from '../config/site'
import { cardIn } from '../motion/variants'

type Testimonial = { quote: string; author: string; role?: string }

/** Activer via site.features.testimonials et remplir testimonials.items dans les JSON. */
export function Testimonials() {
  const { t } = useTranslation()
  const items = t('testimonials.items', { returnObjects: true }) as unknown as Testimonial[]

  if (!site.features.testimonials || !Array.isArray(items) || items.length === 0) return null

  return (
    <section id="testimonials" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={t('testimonials.eyebrow')} title={t('testimonials.title')} />
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal
              as="article"
              key={item.author}
              variants={cardIn}
              custom={index % 3}
              className="flex flex-col rounded-[1.75rem] border border-rule bg-white/70 p-8"
            >
              <span aria-hidden className="font-display text-6xl leading-none text-coral">
                “
              </span>
              <blockquote className="mt-2 flex-1 text-lg leading-relaxed text-ink">{item.quote}</blockquote>
              <p className="mt-6 font-semibold text-ink">{item.author}</p>
              {item.role && <p className="text-sm text-graphite">{item.role}</p>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
