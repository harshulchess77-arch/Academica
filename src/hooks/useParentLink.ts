import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { authStore } from '@/store'
import { Database } from '@/types'

type ParentStudentLink = Database['public']['Tables']['parent_student_links']['Row']

export function useParentLink() {
  const { profile } = authStore()
  const queryClient = useQueryClient()

  const { data: linkedStudents, isLoading } = useQuery({
    queryKey: ['parentLinks', profile?.id],
    queryFn: async () => {
      if (!profile?.id || profile.role !== 'parent') return []
      const { data, error } = await supabase
        .from('parent_student_links')
        .select('*, profiles!parent_student_links_student_id_fkey(*)')
        .eq('parent_id', profile.id)
        .eq('status', 'approved')
      if (error) throw error
      return data as (ParentStudentLink & { profiles: any })[]
    },
    enabled: !!profile?.id && profile.role === 'parent',
  })

  const requestLink = useMutation({
    mutationFn: async (studentEmail: string) => {
      if (!profile?.id) throw new Error('No user logged in')
      // In production, this would trigger an email to the student
      const { data, error } = await supabase
        .from('parent_student_links')
        .insert({
          parent_id: profile.id,
          student_id: null, // Will be resolved by email
          status: 'pending',
          created_at: new Date().toISOString(),
        })
        .select()
        .single()
      if (error) throw error
      return data as ParentStudentLink
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parentLinks'] })
    },
  })

  return {
    linkedStudents,
    isLoading,
    requestLink: requestLink.mutate,
    isRequesting: requestLink.isPending,
  }
}
