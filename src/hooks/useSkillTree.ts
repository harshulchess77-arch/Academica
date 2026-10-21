import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { authStore } from '@/store'
import { Database } from '@/types'

type SkillNode = Database['public']['Tables']['skill_nodes']['Row']
type UserSkillProgress = Database['public']['Tables']['user_skill_progress']['Row']

export function useSkillTree(subject?: string) {
  const { profile } = authStore()

  const { data: skillNodes, isLoading: nodesLoading } = useQuery({
    queryKey: ['skillNodes', subject],
    queryFn: async () => {
      let query = supabase.from('skill_nodes').select('*')
      if (subject) {
        query = query.eq('subject', subject)
      }
      const { data, error } = await query.order('order_index')
      if (error) throw error
      return data as SkillNode[]
    },
  })

  const { data: userProgress, isLoading: progressLoading } = useQuery({
    queryKey: ['userSkillProgress', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return []
      const { data, error } = await supabase
        .from('user_skill_progress')
        .select('*')
        .eq('user_id', profile.id)
      if (error) throw error
      return data as UserSkillProgress[]
    },
    enabled: !!profile?.id,
  })

  // Merge skill nodes with user progress
  const skillTree = skillNodes?.map((node) => {
    const progress = userProgress?.find((p) => p.skill_node_id === node.id)
    return {
      ...node,
      progress: progress?.mastery_percent || 0,
      isUnlocked: progress?.is_unlocked || false,
      isCompleted: progress?.mastery_percent === 100,
    }
  })

  return {
    skillTree,
    isLoading: nodesLoading || progressLoading,
  }
}
