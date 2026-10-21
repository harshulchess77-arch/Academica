import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { authStore } from '@/store'
import { Database } from '@/types'

type FlashcardDeck = Database['public']['Tables']['flashcard_decks']['Row']
type FlashcardItem = Database['public']['Tables']['flashcard_items']['Row']

export function useFlashcards() {
  const { profile } = authStore()
  const queryClient = useQueryClient()

  const { data: decks, isLoading } = useQuery({
    queryKey: ['flashcardDecks', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return []
      const { data, error } = await supabase
        .from('flashcard_decks')
        .select('*, flashcard_items(*)')
        .eq('user_id', profile.id)
      if (error) throw error
      return data as (FlashcardDeck & { flashcard_items: FlashcardItem[] })[]
    },
    enabled: !!profile?.id,
  })

  const createDeck = useMutation({
    mutationFn: async (deck: Omit<FlashcardDeck, 'id' | 'user_id' | 'created_at'>) => {
      if (!profile?.id) throw new Error('No user logged in')
      const { data, error } = await supabase
        .from('flashcard_decks')
        .insert({
          ...deck,
          user_id: profile.id,
          created_at: new Date().toISOString(),
        })
        .select()
        .single()
      if (error) throw error
      return data as FlashcardDeck
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flashcardDecks'] })
    },
  })

  return {
    decks,
    isLoading,
    createDeck: createDeck.mutate,
    isCreating: createDeck.isPending,
  }
}
