// Génère les images optimisées du site à partir des originaux déposés dans assets-src/ :
//   assets-src/photo.(jpg|png|webp) → portrait recadré 4:5, AVIF + WebP en plusieurs largeurs, JPEG de secours, placeholder flou
//   assets-src/logo.(png|jpg|webp)  → badge rond détouré (WebP 1x/2x), favicon et icône Apple
// Usage : npm run images
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const SRC = new URL('../assets-src/', import.meta.url)
const OUT = new URL('../src/assets/images/', import.meta.url)
const PUBLIC = new URL('../public/', import.meta.url)

const PORTRAIT_WIDTHS = [320, 480, 640, 896]
const PORTRAIT_RATIO = 5 / 4
// Zone gardée : bord gauche et haut, largeur (la hauteur suit le ratio 4:5).
const PORTRAIT_CROP = { left: 0.095, top: 0.095, width: 0.815 }

const toPath = (url) => fileURLToPath(url)

function findSource(base) {
  const name = readdirSync(SRC).find(
    (file) => file.toLowerCase().startsWith(base) && /\.(jpe?g|png|webp|avif|tiff?)$/i.test(file),
  )
  if (!name) throw new Error(`Fichier assets-src/${base}.(jpg|png|webp) introuvable`)
  return toPath(new URL(name, SRC))
}

const kb = (buffer) => `${(buffer.length / 1024).toFixed(1)} Ko`

async function write(image, name, format, options) {
  const buffer = await image.clone().toFormat(format, options).toBuffer()
  writeFileSync(new URL(name, OUT), buffer)
  console.log(`  ${name.padEnd(22)} ${kb(buffer)}`)
  return name
}

async function buildPortrait() {
  const oriented = await sharp(findSource('photo')).rotate().toBuffer()
  const { width, height } = await sharp(oriented).metadata()

  // Cadrage visage + épaules, exprimé en proportions de la photo source (indépendant de sa résolution).
  const cropWidth = Math.round(width * PORTRAIT_CROP.width)
  const cropHeight = Math.round(cropWidth * PORTRAIT_RATIO)
  const cropped = await sharp(oriented)
    .extract({
      left: Math.round(width * PORTRAIT_CROP.left),
      top: Math.min(Math.round(height * PORTRAIT_CROP.top), height - cropHeight),
      width: cropWidth,
      height: cropHeight,
    })
    .toBuffer()

  // Largeurs standard disponibles + la largeur native si elle apporte réellement plus de détail.
  const widths = PORTRAIT_WIDTHS.filter((w) => w <= cropWidth)
  if (widths.length === 0 || cropWidth - widths.at(-1) > 64) widths.push(cropWidth)

  console.log(`Portrait (source ${width}×${height}, recadrage ${cropWidth}×${cropHeight})`)
  const files = { avif: [], webp: [] }
  for (const w of widths) {
    const resized = sharp(cropped).resize(w, Math.round(w * PORTRAIT_RATIO), { fit: 'cover' })
    files.avif.push([w, await write(resized, `neda-${w}.avif`, 'avif', { quality: 50, effort: 6 })])
    files.webp.push([w, await write(resized, `neda-${w}.webp`, 'webp', { quality: 72, effort: 6 })])
  }

  const fallbackWidth = widths.includes(640) ? 640 : widths.at(-1)
  const fallback = await write(
    sharp(cropped).resize(fallbackWidth, Math.round(fallbackWidth * PORTRAIT_RATIO)),
    `neda-${fallbackWidth}.jpg`,
    'jpeg',
    { quality: 72, mozjpeg: true },
  )

  const placeholder = await sharp(cropped).resize(16, 20).blur(1).webp({ quality: 40 }).toBuffer()
  console.log(`  placeholder            ${placeholder.length} octets (inline)`)

  return { files, fallback, width: fallbackWidth, placeholder: `data:image/webp;base64,${placeholder.toString('base64')}` }
}

async function buildLogo() {
  const trimmed = await sharp(findSource('logo')).trim({ background: '#f8f8f8', threshold: 40 }).toBuffer()
  const { width, height } = await sharp(trimmed).metadata()
  // Le cercle dessiné n'est pas parfait : marge de 3 % pour que le masque rond ne le rogne pas.
  const size = Math.round(Math.max(width, height) * 1.03)

  const square = await sharp(trimmed)
    .resize(size, size, { fit: 'contain', background: '#ffffff' })
    .flatten({ background: '#ffffff' })
    .toBuffer()
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`,
  )
  const round = await sharp(square).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer()

  console.log(`Logo (détouré ${size}×${size})`)
  const sizes = [96, 192, 320]
  const files = []
  for (const s of sizes) {
    files.push([s, await write(sharp(round).resize(s, s), `logo-${s}.webp`, 'webp', { quality: 90, effort: 6 })])
  }

  const favicon = await sharp(round).resize(64, 64).png({ compressionLevel: 9 }).toBuffer()
  writeFileSync(new URL('favicon.png', PUBLIC), favicon)
  const appleIcon = await sharp(square).resize(180, 180).png({ compressionLevel: 9 }).toBuffer()
  writeFileSync(new URL('apple-touch-icon.png', PUBLIC), appleIcon)
  const ogImage = await sharp(square).resize(512, 512).png({ compressionLevel: 9 }).toBuffer()
  writeFileSync(new URL('og-logo.png', PUBLIC), ogImage)
  console.log(`  public/favicon.png ${kb(favicon)} · apple-touch-icon.png ${kb(appleIcon)} · og-logo.png ${kb(ogImage)}`)

  return files
}

mkdirSync(OUT, { recursive: true })
const portrait = await buildPortrait()
const logo = await buildLogo()

const id = (file) => file.replace(/[^a-z0-9]/gi, '_')
const all = [...portrait.files.avif, ...portrait.files.webp, ...logo].map(([, file]) => file).concat(portrait.fallback)
const srcSet = (entries, descriptor) => entries.map(([w, file]) => `\${${id(file)}} ${w}${descriptor}`).join(', ')

const manifest = `// Généré par scripts/optimize-images.mjs (npm run images) — ne pas modifier à la main.
${all.map((file) => `import ${id(file)} from './${file}'`).join('\n')}

export const portrait = {
  avif: \`${srcSet(portrait.files.avif, 'w')}\`,
  webp: \`${srcSet(portrait.files.webp, 'w')}\`,
  fallback: ${id(portrait.fallback)},
  width: ${portrait.width},
  height: ${Math.round(portrait.width * PORTRAIT_RATIO)},
  placeholder: '${portrait.placeholder}',
}

export const logo = {
  src: ${id(logo[0][1])},
  srcSet: \`${srcSet(logo, 'w')}\`,
}
`
writeFileSync(new URL('index.ts', OUT), manifest)
console.log('✓ src/assets/images/index.ts')
