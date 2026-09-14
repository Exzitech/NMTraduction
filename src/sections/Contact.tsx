import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { ContactForm } from '../components/ContactForm'
import { ArrowRightIcon, ChatIcon, MailIcon, PhoneIcon, type IconComponent } from '../components/Icons'
import { Reveal, RevealItem } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { site } from '../config/site'
import { fadeUp, stagger } from '../motion/variants'

export function Contact() {
  const { t } = useTranslation()

  const [mailbox, domain] = site.email.split('@')

  const channels: { label: string; value: ReactNode; href: string; Icon: IconComponent; external?: boolean }[] = [
    {
      label: t('contact.direct.phone'),
      value: <span dir="ltr">{site.phone.display}</span>,
      href: site.phone.href,
      Icon: PhoneIcon,
    },
    {
      label: t('contact.direct.whatsapp'),
      value: t('contact.direct.whatsappAction'),
      href: site.whatsapp,
      Icon: ChatIcon,
      external: true,
    },
    {
      label: t('contact.direct.email'),
      value: (
        <span dir="ltr">
          {mailbox}
          <wbr />@{domain}
        </span>
      ),
      href: `mailto:${site.email}`,
      Icon: MailIcon,
    },
  ]

  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={t('contact.eyebrow')} title={t('contact.title')} intro={t('contact.intro')} />

          <Reveal as="ul" variants={stagger(0.1, 0.2)} className="mt-10 space-y-3">
            {channels.map(({ label, value, href, Icon, external }) => (
              <RevealItem as="li" key={href}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center gap-4 rounded-2xl border border-rule bg-paper p-4 transition duration-300 hover:border-coral/50 hover:bg-white hover:shadow-[0_20px_40px_-30px_rgba(28,34,48,0.5)]"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-coral/12 text-coral-deep transition-colors duration-300 group-hover:bg-coral group-hover:text-night">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold tracking-[0.14em] text-graphite uppercase">
                      {label}
                    </span>
                    <span className="block font-semibold text-ink">{value}</span>
                  </span>
                  <ArrowRightIcon className="ms-auto size-4 shrink-0 text-graphite transition duration-300 group-hover:translate-x-1 group-hover:text-coral-deep rtl:group-hover:-translate-x-1" />
                </a>
              </RevealItem>
            ))}
          </Reveal>
        </div>

        <Reveal variants={fadeUp} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
