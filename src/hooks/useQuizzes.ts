import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { authStore } from '@/store'
import { Database } from '@/types'

type QuizAttempt = Database['public']['Tables']['quiz_attempts']['Row']

export function useQuizzes() {
  const { profile } = authStore()
  const queryClient = useQueryClient()

  const { data: attempts, isLoading } = useQuery({
    queryKey: ['quizAttempts', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return []
      const { data, error } = await supabase
        .from('quiz_attempts')
        .select('*')
        .eq('user_id', profile.id)
        .order('completed_at', { ascending: false })
      if (error) throw error
      return data as QuizAttempt[]
    },
    enabled: !!profile?.id,
  })

  const submitQuiz = useMutation({
    mutationFn: async (quizData: Omit<QuizAttempt, 'id' | 'completed_at'>) => {
      const { data, error } = await supabase
        .from('quiz_attempts')
        .insert({
          ...quizData,
          completed_at: new Date().toISOString(),
        })
        .select()
        .single()
      if (error) throw error
      return data as QuizAttempt
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizAttempts'] })
    },
  })

  return {
    attempts,
    isLoading,
    submitQuiz: submitQuiz.mutate,
    isSubmitting: submitQuiz.isPending,
  }
}
