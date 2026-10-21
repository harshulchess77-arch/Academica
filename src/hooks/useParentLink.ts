import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { ParentStudentLink } from '../types';

export const useParentLinks = () => {
  return useQuery({
    queryKey: ['parent-links'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('parent_student_links')
        .select('*, student:profiles!parent_student_links_student_id_fkey(display_name, grade, xp_total, level, streak_count)')
        .eq('parent_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ParentStudentLink[];
    },
  });
};

export const useCreateParentLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (studentEmail: string) => {
      const { data, error } = await supabase.rpc('create_parent_link_request', {
        p_student_email: studentEmail,
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parent-links'] });
    },
  });
};

export const useApproveParentLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (linkId: string) => {
      const { data, error } = await supabase.rpc('approve_parent_link', {
        p_link_id: linkId,
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parent-links'] });
    },
  });
};

export const useRevokeParentLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (linkId: string) => {
      const { error } = await supabase
        .from('parent_student_links')
        .update({ status: 'revoked' })
        .eq('id', linkId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parent-links'] });
    },
  });
};
