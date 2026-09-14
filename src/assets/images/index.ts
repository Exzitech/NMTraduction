// Généré par scripts/optimize-images.mjs (npm run images) — ne pas modifier à la main.
import neda_320_avif from './neda-320.avif'
import neda_480_avif from './neda-480.avif'
import neda_601_avif from './neda-601.avif'
import neda_320_webp from './neda-320.webp'
import neda_480_webp from './neda-480.webp'
import neda_601_webp from './neda-601.webp'
import logo_96_webp from './logo-96.webp'
import logo_192_webp from './logo-192.webp'
import logo_320_webp from './logo-320.webp'
import neda_601_jpg from './neda-601.jpg'

export const portrait = {
  avif: `${neda_320_avif} 320w, ${neda_480_avif} 480w, ${neda_601_avif} 601w`,
  webp: `${neda_320_webp} 320w, ${neda_480_webp} 480w, ${neda_601_webp} 601w`,
  fallback: neda_601_jpg,
  width: 601,
  height: 751,
  placeholder: 'data:image/webp;base64,UklGRoIAAABXRUJQVlA4IHYAAABQBACdASoQABQAPu1iqU2ppaQiMAgBMB2JYgCdMoMYAEv3L3XloErmA/sAAP6u4goXW3rMHa27LiN4kpvJrQGRMoiNyLL3dT0DREO1Ky5EuW1hKbzi2/YLh6I6FQsCIEAkHnPVq9JqNBHug+8kEhq7IzAqAAAA',
}

export const logo = {
  src: logo_96_webp,
  srcSet: `${logo_96_webp} 96w, ${logo_192_webp} 192w, ${logo_320_webp} 320w`,
}
