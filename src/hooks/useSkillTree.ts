import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { SkillNode, UserSkillProgress } from '../types';

export const useSkillTree = (subject?: string) => {
  return useQuery({
    queryKey: ['skill-tree', subject],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const [nodesData, progressData] = await Promise.all([
        supabase
          .from('skill_nodes')
          .select('*')
          .eq('subject', subject || 'math')
          .order('level', { ascending: true }),
        supabase
          .from('user_skill_progress')
          .select('*')
          .eq('user_id', user.id),
      ]);

      if (nodesData.error) throw nodesData.error;
      if (progressData.error) throw progressData.error;

      const nodes = nodesData.data as SkillNode[];
      const progress = progressData.data as UserSkillProgress[];

      return {
        nodes,
        progress,
        nodesWithProgress: nodes.map((node) => ({
          ...node,
          progress: progress.find((p) => p.node_id === node.id),
        })),
      };
    },
  });
};

export const useUnlockSkillNode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (nodeId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('user_skill_progress')
        .insert({
          user_id: user.id,
          node_id: nodeId,
          unlocked: true,
          mastery_level: 0,
          unlocked_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skill-tree'] });
    },
  });
};

export const useUpdateMastery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ nodeId, masteryLevel }: { nodeId: string; masteryLevel: number }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('user_skill_progress')
        .update({ mastery_level: masteryLevel })
        .eq('user_id', user.id)
        .eq('node_id', nodeId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skill-tree'] });
    },
  });
};
