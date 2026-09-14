import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { logo, portrait } from '../assets/images'
import { ArrowLeftRightIcon, BadgeCheckIcon, PenIcon, ShieldIcon, type IconComponent } from '../components/Icons'
import { Reveal, RevealItem } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { scaleIn, stagger } from '../motion/variants'

const POINTS: { id: 'sworn' | 'confidential' | 'precise'; Icon: IconComponent }[] = [
  { id: 'sworn', Icon: BadgeCheckIcon },
  { id: 'confidential', Icon: ShieldIcon },
  { id: 'precise', Icon: PenIcon },
]

// La carte fait au plus 28rem (448px) ; sur mobile, la largeur de l'écran moins les marges.
const PORTRAIT_SIZES = '(min-width: 480px) 448px, calc(100vw - 40px)'

export function About() {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <section ref={ref} id="about" className="relative overflow-x-clip py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20">
        <Reveal variants={scaleIn} className="lg:col-span-5">
          <div className="relative mx-auto max-w-md">
            <div className="rounded-[2.25rem] border-2 border-coral bg-paper p-2.5 shadow-[0_40px_80px_-40px_rgba(23,34,54,0.55)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-night">
              <motion.div style={{ y: photoY }} className="absolute inset-x-0 -inset-y-[5%]">
                <Portrait alt={t('about.portraitAlt')} />
              </motion.div>
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-night/85 via-night/30 to-transparent"
              />
              <div className="absolute inset-x-7 bottom-6 flex items-center justify-between gap-3 border-t border-paper/25 pt-4 text-xs font-semibold tracking-[0.2em] text-paper uppercase">
                <span>
                  {t('languages.farsi')} · {t('languages.dari')}
                </span>
                <ArrowLeftRightIcon className="size-4 shrink-0 text-coral" />
                <span>{t('languages.french')}</span>
              </div>
            </div>
            </div>
            <img
              src={logo.src}
              srcSet={logo.srcSet}
              sizes="88px"
              width={88}
              height={88}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute -end-2 -top-5 size-[72px] rounded-full shadow-[0_12px_30px_-10px_rgba(23,34,54,0.5)] ring-4 ring-paper sm:-end-6 sm:-top-6 sm:size-[88px]"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <SectionHeading eyebrow={t('about.eyebrow')} title={t('about.title')} />

          <Reveal variants={stagger(0.12)} className="mt-8 space-y-5 text-lg leading-relaxed text-graphite">
            <RevealItem as="p">{t('about.p1')}</RevealItem>
            <RevealItem as="p">{t('about.p2')}</RevealItem>
          </Reveal>

          <Reveal as="ul" variants={stagger(0.1)} className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
            {POINTS.map(({ id, Icon }) => (
              <RevealItem as="li" key={id} className="group border-t border-rule pt-5">
                <Icon className="size-6 text-coral transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" />
                <h3 className="mt-4 font-display text-xl text-ink">{t(`about.points.${id}.title`)}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-graphite">{t(`about.points.${id}.text`)}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/**
 * Portrait responsive : AVIF puis WebP puis JPEG, taille choisie par le navigateur,
 * chargé à l'approche de la section. Un aperçu flou (< 1 Ko, inline) s'affiche en attendant.
 */
function Portrait({ alt }: { alt: string }) {
  const imageRef = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (imageRef.current?.complete) setLoaded(true)
  }, [])

  return (
    <>
      <img
        aria-hidden
        alt=""
        src={portrait.placeholder}
        className="absolute inset-0 size-full scale-110 object-cover object-top blur-xl"
      />
      <picture>
        <source type="image/avif" srcSet={portrait.avif} sizes={PORTRAIT_SIZES} />
        <source type="image/webp" srcSet={portrait.webp} sizes={PORTRAIT_SIZES} />
        <img
          ref={imageRef}
          src={portrait.fallback}
          width={portrait.width}
          height={portrait.height}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 size-full object-cover object-top transition-opacity duration-700 ease-out ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </picture>
    </>
  )
}
