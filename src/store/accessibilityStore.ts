import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AccessibilitySettings } from '@/types'

interface AccessibilityState extends AccessibilitySettings {
  toggle: (setting: keyof AccessibilitySettings) => void
  setTtsSpeed: (speed: number) => void
}

const initialState: AccessibilitySettings = {
  dyslexicFont: false,
  highContrast: false,
  reduceMotion: false,
  ttsSpeed: 1,
  largerClickTargets: false,
  alwaysShowFocus: false,
}

export const accessibilityStore = create<AccessibilityState>()(
  persist(
    (set) => ({
      ...initialState,

      toggle: (setting) =>
        set((state) => ({ ...state, [setting]: !state[setting] })),

      setTtsSpeed: (speed) => set({ ttsSpeed: speed }),
    }),
    {
      name: 'academica-a11y',
    }
  )
)
