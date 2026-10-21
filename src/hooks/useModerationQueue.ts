import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { authStore } from '@/store'
import { Database } from '@/types'

type ModerationAction = Database['public']['Tables']['moderation_actions']['Row']

export function useModerationQueue() {
  const { profile } = authStore()

  const { data: queue, isLoading } = useQuery({
    queryKey: ['moderationQueue'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('moderation_actions')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data as ModerationAction[]
    },
    enabled: profile?.role === 'admin' || profile?.role === 'teacher',
  })

  return {
    queue,
    isLoading,
  }
}
