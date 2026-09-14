import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { site } from '../config/site'
import { DEFAULT_LANG, dirOf, LANG_CODES, type Lang } from './languages'
import en from './locales/en.json'
import fa from './locales/fa.json'
import fr from './locales/fr.json'
import nl from './locales/nl.json'
import { detectLang, syncUrl } from './routing'

export const resources = {
  fr: { translation: fr },
  nl: { translation: nl },
  en: { translation: en },
  fa: { translation: fa },
} as const

function syncDocument(lang: Lang) {
  document.documentElement.lang = lang
  document.documentElement.dir = dirOf(lang)
  document.title = i18n.t('meta.title')
  document.querySelector('meta[name="description"]')?.setAttribute('content', i18n.t('meta.description'))
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', `${site.url}/${lang}`)
  syncUrl(lang)
}

i18n.use(initReactI18next).init({
  resources,
  lng: detectLang(),
  fallbackLng: DEFAULT_LANG,
  supportedLngs: LANG_CODES,
  interpolation: { escapeValue: false },
  initAsync: false,
})

syncDocument(i18n.language as Lang)
i18n.on('languageChanged', (lng) => syncDocument(lng as Lang))

export default i18n
