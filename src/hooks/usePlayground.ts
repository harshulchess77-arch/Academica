import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { CodeSnippet } from '../types';

export const useCodeSnippets = () => {
  return useQuery({
    queryKey: ['code-snippets'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('code_snippets')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data as CodeSnippet[];
    },
  });
};

export const useCreateSnippet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (snippet: {
      title: string;
      language: string;
      code: string;
      description: string | null;
      isPublic: boolean;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('code_snippets')
        .insert({
          user_id: user.id,
          ...snippet,
        })
        .select()
        .single();

      if (error) throw error;
      return data as CodeSnippet;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['code-snippets'] });
    },
  });
};

export const useUpdateSnippet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<CodeSnippet>;
    }) => {
      const { data, error } = await supabase
        .from('code_snippets')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as CodeSnippet;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['code-snippets'] });
    },
  });
};

export const useDeleteSnippet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('code_snippets').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['code-snippets'] });
    },
  });
};
