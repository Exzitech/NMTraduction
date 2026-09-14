export const LANGUAGES = [
  { code: 'fr', label: 'Français', dir: 'ltr' },
  { code: 'nl', label: 'Nederlands', dir: 'ltr' },
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'fa', label: 'فارسی · دری', dir: 'rtl' },
] as const

export type Lang = (typeof LANGUAGES)[number]['code']
export type Dir = (typeof LANGUAGES)[number]['dir']

export const LANG_CODES: Lang[] = LANGUAGES.map((l) => l.code)
export const DEFAULT_LANG: Lang = 'fr'

export const isLang = (value: unknown): value is Lang => LANG_CODES.includes(value as Lang)

export const dirOf = (lang: Lang): Dir => LANGUAGES.find((l) => l.code === lang)?.dir ?? 'ltr'
