import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { OnboardingData } from '@/types'

interface OnboardingState extends OnboardingData {
  setStep: (step: number) => void
  updateField: <K extends keyof OnboardingData>(field: K, value: OnboardingData[K]) => void
  reset: () => void
}

const initialState: OnboardingData = {
  currentStep: 1,
  dob: undefined,
  age: undefined,
  isMinor: undefined,
  parentEmail: undefined,
  country: undefined,
  vpnCheckPassed: undefined,
  grade: undefined,
  subjects: undefined,
  testScores: undefined,
  goals: undefined,
  pace: undefined,
  avatarConfig: undefined,
  selectedTier: undefined,
}

export const onboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      ...initialState,

      setStep: (step) => set({ currentStep: step }),

      updateField: (field, value) =>
        set((state) => ({ ...state, [field]: value })),

      reset: () => set(initialState),
    }),
    {
      name: 'academica-onboarding',
    }
  )
)
