import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TimerState {
  setupStartedAt: string | null;
  pomodoroSecondsLeft: number;
  pomodoroRunning: boolean;
  lastActivityAt: string | null;
  startSetupCountdown: () => void;
  startPomodoro: (duration: number) => void;
  stopPomodoro: () => void;
  updateActivityTimer: () => void;
  devUnlock: () => void;
  reset: () => void;
}

const initialState = {
  setupStartedAt: null,
  pomodoroSecondsLeft: 25 * 60, // 25 minutes default
  pomodoroRunning: false,
  lastActivityAt: null,
};

export const useTimerStore = create<TimerState>()(
  persist(
    (set) => ({
      ...initialState,
      startSetupCountdown: () => set({ setupStartedAt: new Date().toISOString() }),
      startPomodoro: (duration) => set({ pomodoroSecondsLeft: duration, pomodoroRunning: true }),
      stopPomodoro: () => set({ pomodoroRunning: false }),
      updateActivityTimer: () => set({ lastActivityAt: new Date().toISOString() }),
      devUnlock: () => set({ setupStartedAt: new Date(Date.now() - 30 * 1000).toISOString() }), // Pretend 30s passed
      reset: () => set(initialState),
    }),
    {
      name: 'academica-timer',
    }
  )
);
