import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { authStore } from '@/store'

export function useLeaderboard() {
  const { profile } = authStore()

  const { data: leaderboard, isLoading } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      // Query the public leaderboard view
      const { data, error } = await supabase
        .from('leaderboard_public_view')
        .select('*')
        .order('xp_total', { ascending: false })
        .limit(50)
      if (error) throw error
      return data
    },
  })

  const { data: myRank } = useQuery({
    queryKey: ['myLeaderboardRank', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return null
      const { data, error } = await supabase
        .from('leaderboard_public_view')
        .select('*')
        .eq('user_id', profile.id)
        .single()
      if (error) throw error
      return data
    },
    enabled: !!profile?.id,
  })

  return {
    leaderboard,
    myRank,
    isLoading,
  }
}
