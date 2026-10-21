import { create } from 'zustand'

interface GamificationState {
  streak: number
  xp: number
  level: number
  vaultBalance: number
  addXp: (amount: number) => void
  incrementStreak: () => void
  spendXp: (amount: number) => boolean
  calculateLevel: (xp: number) => number
}

export const gamificationStore = create<GamificationState>((set, get) => ({
  streak: 0,
  xp: 0,
  level: 1,
  vaultBalance: 0,

  addXp: (amount: number) => {
    const newXp = get().xp + amount
    const newLevel = get().calculateLevel(newXp)
    set({ xp: newXp, level: newLevel })
  },

  incrementStreak: () => set((state: GamificationState) => ({ streak: state.streak + 1 })),

  spendXp: (amount: number) => {
    const currentBalance = get().vaultBalance
    if (currentBalance < amount) return false
    set({ vaultBalance: currentBalance - amount })
    return true
  },

  calculateLevel: (xp: number) => {
    // Level formula: Level = floor(sqrt(XP / 100)) + 1
    return Math.floor(Math.sqrt(xp / 100)) + 1
  },
}))
