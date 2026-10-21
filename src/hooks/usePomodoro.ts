import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { PomodoroSession } from '../types';
import { handleSupabaseError } from '../lib/supabase';

export const usePomodoroSessions = () => {
  return useQuery({
    queryKey: ['pomodoro-sessions'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('pomodoro_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('started_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      return data as PomodoroSession[];
    },
  });
};

export const useStartPomodoro = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      durationSeconds,
      task,
    }: {
      durationSeconds: number;
      task: string | null;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('pomodoro_sessions')
        .insert({
          user_id: user.id,
          duration_seconds: durationSeconds,
          completed: false,
          task,
          started_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data as PomodoroSession;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pomodoro-sessions'] });
    },
  });
};

export const useCompletePomodoro = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sessionId: string) => {
      const { data, error } = await supabase
        .from('pomodoro_sessions')
        .update({
          completed: true,
          completed_at: new Date().toISOString(),
        })
        .eq('id', sessionId)
        .select()
        .single();

      if (error) throw error;
      return data as PomodoroSession;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pomodoro-sessions'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

export const usePomodoroStats = () => {
  return useQuery({
    queryKey: ['pomodoro-stats'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('pomodoro_sessions')
        .select('duration_seconds, completed')
        .eq('user_id', user.id)
        .eq('completed', true);

      if (error) throw error;

      const sessions = data || [];
      const totalDuration = sessions.reduce((sum, s) => sum + s.duration_seconds, 0);
      const completedCount = sessions.length;

      return {
        totalDuration,
        completedCount,
        averageDuration: completedCount > 0 ? totalDuration / completedCount : 0,
      };
    },
  });
};
