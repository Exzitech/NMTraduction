import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { site } from './src/config/site.ts'
import { dirOf } from './src/i18n/languages.ts'
import en from './src/i18n/locales/en.json' with { type: 'json' }
import fa from './src/i18n/locales/fa.json' with { type: 'json' }
import fr from './src/i18n/locales/fr.json' with { type: 'json' }
import nl from './src/i18n/locales/nl.json' with { type: 'json' }

const locales = { fr, nl, en, fa }
const ogLocales: Record<keyof typeof locales, string> = { fr: 'fr_BE', nl: 'nl_BE', en: 'en_GB', fa: 'fa_IR' }

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Génère dist/fr, dist/nl et dist/en avec lang, title, description et hreflang propres à chaque langue. */
function localizedPages(): Plugin {
  let outDir = 'dist'
  return {
    name: 'localized-pages',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const indexPath = resolve(outDir, 'index.html')
      const template = readFileSync(indexPath, 'utf8')
      const alternates = [
        ...Object.keys(locales).map(
          (lang) => `<link rel="alternate" hreflang="${lang}" href="${site.url}/${lang}" />`,
        ),
        `<link rel="alternate" hreflang="x-default" href="${site.url}/" />`,
      ].join('\n    ')

      writeFileSync(indexPath, template.replace('</head>', `  ${alternates}\n  </head>`))

      for (const [lang, { meta }] of Object.entries(locales) as [keyof typeof locales, typeof fr][]) {
        const url = `${site.url}/${lang}`
        const head = [
          `<link rel="canonical" href="${url}" />`,
          alternates,
          `<meta property="og:type" content="website" />`,
          `<meta property="og:url" content="${url}" />`,
          `<meta property="og:locale" content="${ogLocales[lang]}" />`,
          `<meta property="og:site_name" content="${site.brand}" />`,
          `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
          `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
          `<meta property="og:image" content="${site.url}/og-logo.png" />`,
        ].join('\n    ')

        const html = template
          .replace(/<html lang="[^"]*"/, `<html lang="${lang}" dir="${dirOf(lang)}"`)
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)
          .replace(
            /<meta name="description" content="[^"]*"/,
            `<meta name="description" content="${escapeHtml(meta.description)}"`,
          )
          .replace('</head>', `  ${head}\n  </head>`)

        mkdirSync(resolve(outDir, lang), { recursive: true })
        writeFileSync(resolve(outDir, lang, 'index.html'), html)
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), localizedPages()],
})
