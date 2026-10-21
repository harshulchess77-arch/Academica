import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { FlashcardDeck, FlashcardItem } from '../types';

export const useFlashcardDecks = () => {
  return useQuery({
    queryKey: ['flashcard-decks'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('flashcard_decks')
        .select('*, flashcard_items(*)')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data as FlashcardDeck[];
    },
  });
};

export const useCreateDeck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (deck: {
      title: string;
      description: string | null;
      subject: string | null;
      isPublic: boolean;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('flashcard_decks')
        .insert({
          user_id: user.id,
          ...deck,
        })
        .select()
        .single();

      if (error) throw error;
      return data as FlashcardDeck;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flashcard-decks'] });
    },
  });
};

export const useAddFlashcard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      deckId,
      front,
      back,
    }: {
      deckId: string;
      front: string;
      back: string;
    }) => {
      const { data, error } = await supabase
        .from('flashcard_items')
        .insert({
          deck_id: deckId,
          front,
          back,
          position: 0,
        })
        .select()
        .single();

      if (error) throw error;
      return data as FlashcardItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flashcard-decks'] });
    },
  });
};

export const useDeleteDeck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (deckId: string) => {
      const { error } = await supabase.from('flashcard_decks').delete().eq('id', deckId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flashcard-decks'] });
    },
  });
};
