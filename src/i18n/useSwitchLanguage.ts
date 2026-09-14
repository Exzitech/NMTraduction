import { animate, useReducedMotion } from 'motion/react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { Lang } from './languages'
import { rememberLang } from './routing'

/** Change de langue sur place : fondu du contenu, pas de rechargement. */
export function useSwitchLanguage() {
  const { i18n } = useTranslation()
  const reduceMotion = useReducedMotion()

  return useCallback(
    async (lang: Lang) => {
      if (lang === i18n.resolvedLanguage) return
      rememberLang(lang)

      const content = document.getElementById('content')
      if (!content || reduceMotion) {
        await i18n.changeLanguage(lang)
        return
      }

      await animate(content, { opacity: 0 }, { duration: 0.18, ease: 'easeIn' })
      await i18n.changeLanguage(lang)
      await animate(content, { opacity: 1 }, { duration: 0.4, ease: 'easeOut' })
    },
    [i18n, reduceMotion],
  )
}
