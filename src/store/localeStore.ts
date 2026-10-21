import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import i18n from '@/lib/i18n'

interface LocaleState {
  locale: 'en' | 'es' | 'fr'
  setLocale: (locale: 'en' | 'es' | 'fr') => void
}

export const localeStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: 'en',

      setLocale: (locale) => {
        set({ locale })
        i18n.changeLanguage(locale)
      },
    }),
    {
      name: 'academica-locale',
    }
  )
)
