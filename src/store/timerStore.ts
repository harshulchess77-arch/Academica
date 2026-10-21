import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TimerState {
  setupStartedAt: number | null
  pomodoroSecondsLeft: number
  pomodoroRunning: boolean
  lastActivityAt: number | null
  startSetupCountdown: () => void
  devUnlock: () => void
  resetActivityTimer: () => void
  setPomodoroRunning: (running: boolean) => void
  setPomodoroSecondsLeft: (seconds: number) => void
}

export const timerStore = create<TimerState>()(
  persist(
    (set) => ({
      setupStartedAt: null,
      pomodoroSecondsLeft: 25 * 60, // 25 minutes
      pomodoroRunning: false,
      lastActivityAt: Date.now(),

      startSetupCountdown: () => set({ setupStartedAt: Date.now() }),

      devUnlock: () => {
        if (import.meta.env.VITE_ENABLE_DEV_UNLOCK === 'true') {
          set({ setupStartedAt: 0 })
        }
      },

      resetActivityTimer: () => set({ lastActivityAt: Date.now() }),

      setPomodoroRunning: (running) => set({ pomodoroRunning: running }),

      setPomodoroSecondsLeft: (seconds) => set({ pomodoroSecondsLeft: seconds }),
    }),
    {
      name: 'academica-timer',
    }
  )
)
