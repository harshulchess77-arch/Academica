import { create } from 'zustand';

interface GamificationState {
  streak: number;
  xp: number;
  level: number;
  vaultBalance: number;
  addXp: (amount: number) => void;
  incrementStreak: () => void;
  spendXp: (amount: number) => boolean;
  setState: (state: Partial<GamificationState>) => void;
}

export const useGamificationStore = create<GamificationState>((set) => ({
  streak: 0,
  xp: 0,
  level: 1,
  vaultBalance: 0,
  addXp: (amount) => set((state) => {
    const newXp = state.xp + amount;
    const newLevel = Math.floor(newXp / 1000) + 1;
    return { xp: newXp, level: newLevel };
  }),
  incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
  spendXp: (amount) => {
    let success = false;
    set((state) => {
      if (state.vaultBalance >= amount) {
        success = true;
        return { vaultBalance: state.vaultBalance - amount };
      }
      return state;
    });
    return success;
  },
  setState: (newState) => set(newState),
}));
