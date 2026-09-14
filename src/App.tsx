import { MotionConfig } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Header } from './components/Header'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Languages } from './sections/Languages'
import { Services } from './sections/Services'
import { Testimonials } from './sections/Testimonials'

export default function App() {
  const { t } = useTranslation()

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[70] focus:rounded-full focus:bg-lapis focus:px-4 focus:py-2 focus:text-paper"
      >
        {t('nav.skip')}
      </a>
      <Header />
      <div id="content">
        <main id="main">
          <Hero />
          <About />
          <Services />
          <Languages />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
      <div aria-hidden className="grain" />
    </MotionConfig>
  )
}
