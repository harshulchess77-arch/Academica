import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AccessibilityState {
  dyslexicFont: boolean;
  highContrast: boolean;
  reduceMotion: boolean;
  ttsSpeed: number;
  largerClickTargets: boolean;
  alwaysShowFocus: boolean;
  toggle: (setting: keyof AccessibilityState) => void;
  setTtsSpeed: (speed: number) => void;
}

export const useAccessibilityStore = create<AccessibilityState>()(
  persist(
    (set) => ({
      dyslexicFont: false,
      highContrast: false,
      reduceMotion: false,
      ttsSpeed: 1,
      largerClickTargets: false,
      alwaysShowFocus: false,
      toggle: (setting) => set((state) => ({ [setting]: !state[setting] })),
      setTtsSpeed: (ttsSpeed) => set({ ttsSpeed }),
    }),
    {
      name: 'academica-a11y',
    }
  )
);
