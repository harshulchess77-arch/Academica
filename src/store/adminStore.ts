import { create } from 'zustand';

interface AdminState {
  currentOrgId: string | null;
  selectedClassroomId: string | null;
  moderationFilters: {
    actionType: string | null;
    targetType: string | null;
    dateRange: string | null;
  };
  setOrg: (orgId: string | null) => void;
  setClassroom: (classroomId: string | null) => void;
  setFilters: (filters: Partial<AdminState['moderationFilters']>) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  currentOrgId: null,
  selectedClassroomId: null,
  moderationFilters: {
    actionType: null,
    targetType: null,
    dateRange: null,
  },
  setOrg: (currentOrgId) => set({ currentOrgId }),
  setClassroom: (selectedClassroomId) => set({ selectedClassroomId }),
  setFilters: (newFilters) =>
    set((state) => ({
      moderationFilters: { ...state.moderationFilters, ...newFilters },
    })),
}));
