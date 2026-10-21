import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { ModerationAction, ComplianceEvent } from '../types';

export const useModerationQueue = (filters?: {
  actionType?: string;
  targetType?: string;
}) => {
  return useQuery({
    queryKey: ['moderation-queue', filters],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      let query = supabase
        .from('moderation_actions')
        .select('*, profiles(display_name, email)')
        .order('created_at', { ascending: false });

      if (filters?.actionType) {
        query = query.eq('action', filters.actionType);
      }
      if (filters?.targetType) {
        query = query.eq('target_type', filters.targetType);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as ModerationAction[];
    },
  });
};

export const useComplianceAudit = () => {
  return useQuery({
    queryKey: ['compliance-audit'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('compliance_events')
        .select('*, profiles(display_name, email)')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      return data as ComplianceEvent[];
    },
  });
};

export const useCreateModerationAction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (action: {
      targetType: string;
      targetId: string;
      action: string;
      reason: string | null;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('moderation_actions')
        .insert({
          moderator_id: user.id,
          ...action,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moderation-queue'] });
    },
  });
};
