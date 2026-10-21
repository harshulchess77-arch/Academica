import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { QuizAttempt } from '../types';

export const useQuizzes = (subject?: string) => {
  return useQuery({
    queryKey: ['quizzes', subject],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('quiz_attempts')
        .select('*')
        .eq('user_id', user.id)
        .eq('subject', subject || 'math')
        .order('completed_at', { ascending: false });

      if (error) throw error;
      return data as QuizAttempt[];
    },
  });
};

export const useSubmitQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      subject,
      score,
      totalQuestions,
    }: {
      subject: string;
      score: number;
      totalQuestions: number;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('quiz_attempts')
        .insert({
          user_id: user.id,
          subject,
          score,
          total_questions: totalQuestions,
          completed_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data as QuizAttempt;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['quizzes', data.subject] });
      // Award XP for quiz completion
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};
