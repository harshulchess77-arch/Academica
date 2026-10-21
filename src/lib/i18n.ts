import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import enCommon from '@/locales/en/common.json'
import enDashboard from '@/locales/en/dashboard.json'
import enLegal from '@/locales/en/legal.json'

const resources = {
  en: {
    common: enCommon,
    dashboard: enDashboard,
    legal: enLegal,
  },
  es: {
    common: {
      // Placeholder for Spanish translations
      welcome: 'Bienvenido',
      loading: 'Cargando...',
      error: 'Error',
      retry: 'Reintentar',
    },
    dashboard: {},
    legal: {},
  },
  fr: {
    common: {
      // Placeholder for French translations
      welcome: 'Bienvenue',
      loading: 'Chargement...',
      error: 'Erreur',
      retry: 'Réessayer',
    },
    dashboard: {},
    legal: {},
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'dashboard', 'legal'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

export default i18n
