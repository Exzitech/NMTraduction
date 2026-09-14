import { logo } from '../assets/images'
import { site } from '../config/site'

export function Logo({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark'
  const size = dark ? 64 : 44

  return (
    <a
      href="#top"
      lang="fr"
      dir="ltr"
      className="group inline-flex items-center gap-2.5"
      aria-label={`${site.brand}, ${site.name}`}
    >
      <img
        src={logo.src}
        srcSet={logo.srcSet}
        sizes={`${size}px`}
        width={size}
        height={size}
        alt=""
        decoding="async"
        className={`shrink-0 rounded-full transition-transform duration-700 ease-out group-hover:-rotate-12 ${
          dark ? 'size-16 ring-4 ring-paper/10' : 'size-11 shadow-[0_6px_16px_-8px_rgba(23,34,54,0.45)]'
        }`}
      />
      <span className="inline-flex items-baseline gap-2">
        <span
          className={`font-display text-[1.6rem] leading-none font-semibold tracking-[-0.03em] ${dark ? 'text-paper' : 'text-ink'}`}
        >
          NM<span className="text-coral">.</span>
        </span>
        <span
          className={`hidden text-[0.7rem] font-semibold tracking-[0.28em] uppercase min-[440px]:inline ${dark ? 'text-paper/60' : 'text-graphite'}`}
        >
          traductions
        </span>
      </span>
    </a>
  )
}
