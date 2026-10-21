import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { LeaderboardEntry, LeaderboardOptIn } from '../types';

export const useLeaderboard = () => {
  return useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leaderboard_public_view')
        .select('*')
        .order('rank', { ascending: true })
        .limit(50);

      if (error) throw error;
      return data as LeaderboardEntry[];
    },
  });
};

export const useLeaderboardOptIn = () => {
  return useQuery({
    queryKey: ['leaderboard-opt-in'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('leaderboard_opt_ins')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data as LeaderboardOptIn | null;
    },
  });
};

export const useOptInLeaderboard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (displayAlias: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('leaderboard_opt_ins')
        .upsert({
          user_id: user.id,
          display_alias: displayAlias,
          opted_in: true,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaderboard-opt-in'] });
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    },
  });
};

export const useOptOutLeaderboard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('leaderboard_opt_ins')
        .update({ opted_in: false })
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaderboard-opt-in'] });
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    },
  });
};
