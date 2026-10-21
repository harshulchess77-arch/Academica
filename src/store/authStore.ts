import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '@/lib/supabase'
import type { User } from '@/types'

interface AuthState {
  session: any
  profile: User | null
  isLoading: boolean
  setSession: (session: any) => void
  setProfile: (profile: User | null) => void
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

export const authStore = create<AuthState>()(
  persist(
    (set, get) => ({
      session: null,
      profile: null,
      isLoading: true,

      setSession: (session) => set({ session, isLoading: false }),

      setProfile: (profile) => set({ profile }),

      signOut: async () => {
        await supabase.auth.signOut()
        set({ session: null, profile: null })
      },

      refreshProfile: async () => {
        const { session } = get()
        if (!session) return

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (!error && data) {
          set({
            profile: {
              id: data.id,
              email: data.email,
              fullName: data.full_name || undefined,
              avatarUrl: data.avatar_url || undefined,
              role: data.role,
              tier: data.tier,
              grade: data.grade || undefined,
              country: data.country || undefined,
              dob: data.dob || undefined,
              isMinor: data.is_minor || undefined,
              parentEmail: data.parent_email || undefined,
              onboardingComplete: data.onboarding_complete,
              xpTotal: data.xp_total,
              streakCount: data.streak_count,
              lastStreakDate: data.last_streak_date || undefined,
              vaultBalance: data.vault_balance,
            },
          })
        }
      },
    }),
    {
      name: 'academica-auth',
      partialize: (state) => ({ session: state.session }),
    }
  )
)
