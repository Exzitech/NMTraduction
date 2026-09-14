import '@fontsource-variable/fraunces/opsz.css'
import '@fontsource-variable/source-sans-3/wght.css'
// Sous-ensemble arabe téléchargé uniquement quand du texte persan s'affiche (unicode-range).
import '@fontsource-variable/vazirmatn/wght.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
