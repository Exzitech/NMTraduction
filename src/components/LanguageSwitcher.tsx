import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '../i18n/languages'
import { useSwitchLanguage } from '../i18n/useSwitchLanguage'

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const switchLanguage = useSwitchLanguage()

  return (
    <div
      role="group"
      aria-label={t('nav.language')}
      className="relative flex rounded-full border border-coral/30 bg-paper/70 p-1"
    >
      {LANGUAGES.map(({ code, label }) => {
        const active = i18n.resolvedLanguage === code
        return (
          <button
            key={code}
            type="button"
            lang={code}
            title={label}
            aria-pressed={active}
            onClick={() => switchLanguage(code)}
            className="relative rounded-full px-2.5 py-1 text-xs font-bold tracking-[0.12em]"
          >
            {active && (
              <motion.span
                layoutId="language-pill"
                className="absolute inset-0 rounded-full bg-coral"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span
              className={`relative transition-colors duration-300 ${active ? 'text-night' : 'text-graphite hover:text-coral-deep'}`}
            >
              {code.toUpperCase()}
            </span>
            <span className="sr-only">{label}</span>
          </button>
        )
      })}
    </div>
  )
}
