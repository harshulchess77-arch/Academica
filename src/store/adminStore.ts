import { create } from 'zustand'

interface AdminState {
  currentOrgId: string | null
  selectedClassroomId: string | null
  moderationFilters: {
    actionType?: string
    dateRange?: { start: string; end: string }
    searchQuery?: string
  }
  setOrg: (orgId: string | null) => void
  setClassroom: (classroomId: string | null) => void
  setFilters: (filters: AdminState['moderationFilters']) => void
}

export const adminStore = create<AdminState>((set) => ({
  currentOrgId: null,
  selectedClassroomId: null,
  moderationFilters: {},

  setOrg: (orgId) => set({ currentOrgId: orgId }),

  setClassroom: (classroomId) => set({ selectedClassroomId: classroomId }),

  setFilters: (filters) => set({ moderationFilters: filters }),
}))
