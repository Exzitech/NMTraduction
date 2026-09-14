import { readdirSync, readFileSync } from 'node:fs'

const reference = 'fr'
const others = ['nl', 'en', 'fa']
const dir = new URL('../src/i18n/locales/', import.meta.url)

const load = (lang) => JSON.parse(readFileSync(new URL(`${lang}.json`, dir), 'utf8'))

const flatten = (obj, prefix = '') =>
  Object.entries(obj).flatMap(([key, value]) =>
    value && typeof value === 'object' && !Array.isArray(value)
      ? flatten(value, `${prefix}${key}.`)
      : [`${prefix}${key}`],
  )

const expected = new Set(flatten(load(reference)))
let failed = false

for (const lang of others) {
  const actual = new Set(flatten(load(lang)))
  const missing = [...expected].filter((key) => !actual.has(key))
  const extra = [...actual].filter((key) => !expected.has(key))

  if (missing.length || extra.length) {
    failed = true
    console.error(`✗ ${lang}.json`)
    missing.forEach((key) => console.error(`  clé manquante : ${key}`))
    extra.forEach((key) => console.error(`  clé en trop   : ${key}`))
  }
}

// Clés littérales utilisées dans le code : t('a.b') doit exister dans la langue de référence.
const srcDir = new URL('../src/', import.meta.url)
const sources = readdirSync(srcDir, { recursive: true }).filter((file) => /\.tsx?$/.test(file))
const referenceData = load(reference)
const exists = (key) => key.split('.').reduce((node, part) => (node == null ? node : node[part]), referenceData) !== undefined

for (const file of sources) {
  const code = readFileSync(new URL(file.replaceAll('\\', '/'), srcDir), 'utf8')
  for (const [, key] of code.matchAll(/\bt\(\s*['"]([\w.]+)['"]/g)) {
    if (!exists(key)) {
      failed = true
      console.error(`✗ ${file} : clé inconnue « ${key} »`)
    }
  }
  for (const [, pattern] of code.matchAll(/\bt\(\s*`([\w.${}]+)`/g)) {
    const regex = new RegExp(`^${pattern.replace(/\./g, '\\.').replace(/\$\{[^}]+\}/g, '[\\w]+')}$`)
    if (![...expected].some((key) => regex.test(key) || regex.test(key.split('.').slice(0, -1).join('.')))) {
      failed = true
      console.error(`✗ ${file} : aucune clé ne correspond à « ${pattern} »`)
    }
  }
}

if (failed) process.exit(1)
console.log(`✓ Traductions cohérentes (${[reference, ...others].join(', ')})`)
