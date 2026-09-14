import { DEFAULT_LANG, isLang, type Lang } from './languages'

const STORAGE_KEY = 'nm-lang'

// Dari (prs) → version persane du site
const ALIASES: Record<string, Lang> = { prs: 'fa' }

export function langFromPath(pathname: string): Lang | null {
  const segment = pathname.split('/')[1]
  return isLang(segment) ? segment : null
}

/** URL (/fr, /nl, /en) → choix mémorisé → langue du navigateur → français. */
export function detectLang(): Lang {
  const fromPath = langFromPath(window.location.pathname)
  if (fromPath) return fromPath

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isLang(stored)) return stored
  } catch {
    // stockage indisponible (navigation privée) : on passe au navigateur
  }

  const browserLangs = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const tag of browserLangs) {
    const base = tag.toLowerCase().split('-')[0]
    const code = ALIASES[base] ?? base
    if (isLang(code)) return code
  }

  return DEFAULT_LANG
}

export function rememberLang(lang: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // sans conséquence : l'URL porte déjà la langue
  }
}

export function syncUrl(lang: Lang) {
  const path = `/${lang}`
  if (window.location.pathname !== path) {
    window.history.replaceState(null, '', path + window.location.search + window.location.hash)
  }
}
