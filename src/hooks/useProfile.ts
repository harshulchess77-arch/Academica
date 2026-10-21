import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { authStore } from '@/store'
import { Database } from '@/types'

type Profile = Database['public']['Tables']['profiles']['Row']

export function useProfile() {
  const { profile: authProfile } = authStore()
  const queryClient = useQueryClient()

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile', authProfile?.id],
    queryFn: async () => {
      if (!authProfile?.id) return null
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authProfile.id)
        .single()
      if (error) throw error
      return data as Profile
    },
    enabled: !!authProfile?.id,
  })

  const updateProfile = useMutation({
    mutationFn: async (updates: Partial<Profile>) => {
      if (!authProfile?.id) throw new Error('No user logged in')
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', authProfile.id)
        .select()
        .single()
      if (error) throw error
      return data as Profile
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['profile', authProfile?.id], data)
    },
  })

  return {
    profile,
    isLoading,
    error,
    updateProfile: updateProfile.mutate,
    isUpdating: updateProfile.isPending,
  }
}
