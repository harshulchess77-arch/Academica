import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { authStore } from '@/store'
import { Database } from '@/types'

type Profile = Database['public']['Tables']['profiles']['Row']

export function useAdminConsole() {
  const { profile } = authStore()

  const { data: users, isLoading } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)
      if (error) throw error
      return data as Profile[]
    },
    enabled: profile?.role === 'admin',
  })

  const { data: stats } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const [usersCount, guildsCount, attemptsCount] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('guilds').select('id', { count: 'exact', head: true }),
        supabase.from('quiz_attempts').select('id', { count: 'exact', head: true }),
      ])
      return {
        users: usersCount.count || 0,
        guilds: guildsCount.count || 0,
        attempts: attemptsCount.count || 0,
      }
    },
    enabled: profile?.role === 'admin',
  })

  return {
    users,
    stats,
    isLoading,
  }
}
