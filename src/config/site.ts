export const site = {
  brand: 'NM traductions',
  name: 'Neda Mesgari',
  // Domaine définitif à confirmer : sert aux balises canonical / hreflang.
  url: 'https://www.nm-traductions.be',
  phone: { display: '0494 08 53 08', href: 'tel:+32494085308' },
  whatsapp: 'https://wa.me/32494085308',
  email: 'neda.mesgari.traductions@gmail.com',
  vat: '',
  features: {
    testimonials: false,
  },
}

export const SERVICE_IDS = ['civil', 'residence', 'legal', 'education', 'medical', 'interpreting'] as const
export type ServiceId = (typeof SERVICE_IDS)[number]

export const SECTION_IDS = ['about', 'services', 'languages', 'testimonials', 'contact'] as const
export type SectionId = (typeof SECTION_IDS)[number]
