import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { authStore } from '@/store'
import { Database } from '@/types'

type ComplianceEvent = Database['public']['Tables']['compliance_events']['Row']

export function useComplianceAudit() {
  const { profile } = authStore()

  const { data: events, isLoading } = useQuery({
    queryKey: ['complianceEvents', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return []
      const { data, error } = await supabase
        .from('compliance_events')
        .select('*')
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false })
      if (error) throw error
      return data as ComplianceEvent[]
    },
    enabled: !!profile?.id,
  })

  return {
    events,
    isLoading,
  }
}
