import { useTranslation } from 'react-i18next'
import { Logo } from '../components/Logo'
import { SECTION_IDS, site } from '../config/site'

const NAV_IDS = SECTION_IDS.filter((id) => id !== 'testimonials' || site.features.testimonials)

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const linkClasses = 'text-paper/70 transition-colors duration-300 hover:text-coral'

  return (
    <footer className="relative overflow-hidden border-t-4 border-coral bg-night text-paper">
      <p
        aria-hidden
        lang="fa"
        className="pointer-events-none absolute -bottom-10 end-4 text-[10rem] leading-none font-bold text-paper/[0.04] select-none"
      >
        ترجمه
      </p>

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo tone="dark" />
            <p className="mt-5 max-w-sm leading-relaxed text-paper/60">{t('footer.tagline')}</p>
          </div>

          <nav className="md:col-span-3" aria-label={t('footer.nav')}>
            <p className="text-xs font-semibold tracking-[0.18em] text-coral uppercase">{t('footer.nav')}</p>
            <ul className="mt-5 space-y-3">
              {NAV_IDS.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className={linkClasses}>
                    {t(`nav.${id}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="text-xs font-semibold tracking-[0.18em] text-coral uppercase">{t('footer.contact')}</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={site.phone.href} dir="ltr" className={linkClasses}>
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} dir="ltr" className={`${linkClasses} [overflow-wrap:anywhere]`}>
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-paper/10 pt-8 text-sm text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.brand} · {t('person.name')}. {t('footer.rights')}
            {site.vat && ` · ${t('footer.vat')} ${site.vat}`}
          </p>
          <a href="#top" className="transition-colors duration-300 hover:text-coral">
            {t('footer.top')} ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
