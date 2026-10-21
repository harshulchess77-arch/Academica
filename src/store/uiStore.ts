import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  hasSeenWalkthrough: boolean;
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark' | 'system';
  setHasSeenWalkthrough: (seen: boolean) => void;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      hasSeenWalkthrough: false,
      sidebarCollapsed: false,
      theme: 'system',
      setHasSeenWalkthrough: (hasSeenWalkthrough) => set({ hasSeenWalkthrough }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'academica-ui',
    }
  )
);
