import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { authStore } from '@/store'
import { Database } from '@/types'

type Guild = Database['public']['Tables']['guilds']['Row']
type GuildMember = Database['public']['Tables']['guild_members']['Row']

export function useGuilds() {
  const { profile } = authStore()

  const { data: guilds, isLoading } = useQuery({
    queryKey: ['guilds'],
    queryFn: async () => {
      const { data, error } = await supabase.from('guilds').select('*')
      if (error) throw error
      return data as Guild[]
    },
  })

  const { data: myGuilds } = useQuery({
    queryKey: ['myGuilds', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return []
      const { data, error } = await supabase
        .from('guild_members')
        .select('*, guilds(*)')
        .eq('user_id', profile.id)
      if (error) throw error
      return data as (GuildMember & { guilds: Guild })[]
    },
    enabled: !!profile?.id,
  })

  return {
    guilds,
    myGuilds,
    isLoading,
  }
}
