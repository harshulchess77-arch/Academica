import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { OnboardingData, TestScore } from '../types';

interface OnboardingState {
  currentStep: number;
  dob: string;
  age: number;
  isMinor: boolean;
  parentEmail: string | null;
  country: string;
  vpnCheckPassed: boolean;
  grade: string;
  subjects: string[];
  testScores: TestScore[];
  goals: string[];
  pace: 'relaxed' | 'moderate' | 'intensive';
  avatarConfig: {
    avatarUrl: string | null;
    frameId: string | null;
    backgroundId: string | null;
  };
  selectedTier: 'free' | 'pro' | 'premium';
  setStep: (step: number) => void;
  updateField: <K extends keyof OnboardingState>(field: K, value: OnboardingState[K]) => void;
  reset: () => void;
}

const initialState = {
  currentStep: 0,
  dob: '',
  age: 0,
  isMinor: false,
  parentEmail: null,
  country: '',
  vpnCheckPassed: false,
  grade: '',
  subjects: [],
  testScores: [],
  goals: [],
  pace: 'moderate' as const,
  avatarConfig: {
    avatarUrl: null,
    frameId: null,
    backgroundId: null,
  },
  selectedTier: 'free' as const,
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      ...initialState,
      setStep: (currentStep) => set({ currentStep }),
      updateField: (field, value) => set({ [field]: value }),
      reset: () => set(initialState),
    }),
    {
      name: 'academica-onboarding',
    }
  )
);
