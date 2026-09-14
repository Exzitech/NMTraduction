import { useTranslation } from 'react-i18next'
import { dirOf, type Lang } from '../i18n/languages'

/** Sens de lecture courant. `sign` inverse les valeurs horizontales des animations (1 en LTR, -1 en RTL). */
export function useDirection() {
  const { i18n } = useTranslation()
  const dir = dirOf(i18n.resolvedLanguage as Lang)
  return { dir, rtl: dir === 'rtl', sign: dir === 'rtl' ? -1 : 1 }
}
