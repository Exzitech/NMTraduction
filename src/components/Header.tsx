import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SECTION_IDS, site } from '../config/site'
import { useActiveSection } from '../hooks/useActiveSection'
import { EASE, fadeUp, stagger } from '../motion/variants'
import { ButtonLink } from './Button'
import { CloseIcon, MenuIcon } from './Icons'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from './Logo'

const NAV_IDS = SECTION_IDS.filter((id) => id !== 'testimonials' || site.features.testimonials)

export function Header() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const active = useActiveSection(NAV_IDS)

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const solid = scrolled || open

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        solid ? 'bg-paper/85 shadow-[0_1px_0_var(--color-rule)] backdrop-blur-md' : ''
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation">
          {NAV_IDS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`relative py-2 text-[0.95rem] font-medium transition-colors duration-300 ${
                active === id ? 'text-ink' : 'text-graphite hover:text-ink'
              }`}
            >
              {t(`nav.${id}`)}
              {active === id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-coral"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <div className="hidden md:block">
            <ButtonLink href="#contact" className="h-10 px-5 text-sm">
              {t('nav.cta')}
            </ButtonLink>
          </div>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            className="grid size-10 place-items-center rounded-full border border-coral/30 text-ink lg:hidden"
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      <motion.div
        aria-hidden
        style={{ scaleX: scrollYProgress }}
        className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-coral/80 rtl:origin-right transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden border-t border-rule bg-paper lg:hidden"
          >
            <motion.nav
              variants={stagger(0.06, 0.1)}
              initial="hidden"
              animate="visible"
              className="flex h-[calc(100svh-4.5rem)] flex-col px-5 pt-4 pb-10 sm:px-8"
            >
              {NAV_IDS.map((id) => (
                <motion.a
                  key={id}
                  variants={fadeUp}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="border-b border-rule py-5 font-display text-3xl text-ink"
                >
                  {t(`nav.${id}`)}
                </motion.a>
              ))}
              <motion.div variants={fadeUp} className="mt-auto">
                <ButtonLink href="#contact" onClick={() => setOpen(false)} className="w-full">
                  {t('nav.cta')}
                </ButtonLink>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
