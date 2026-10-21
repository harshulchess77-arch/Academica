import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { authStore } from '@/store'
import { Database } from '@/types'

type JournalEntry = Database['public']['Tables']['journal_entries']['Row']

export function useJournal() {
  const { profile } = authStore()
  const queryClient = useQueryClient()

  const { data: entries, isLoading } = useQuery({
    queryKey: ['journalEntries', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return []
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false })
      if (error) throw error
      return data as JournalEntry[]
    },
    enabled: !!profile?.id,
  })

  const createEntry = useMutation({
    mutationFn: async (entry: Omit<JournalEntry, 'id' | 'user_id' | 'created_at'>) => {
      if (!profile?.id) throw new Error('No user logged in')
      const { data, error } = await supabase
        .from('journal_entries')
        .insert({
          ...entry,
          user_id: profile.id,
          created_at: new Date().toISOString(),
        })
        .select()
        .single()
      if (error) throw error
      return data as JournalEntry
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journalEntries'] })
    },
  })

  const updateEntry = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<JournalEntry> & { id: string }) => {
      const { data, error } = await supabase
        .from('journal_entries')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      if (error) throw error
      return data as JournalEntry
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journalEntries'] })
    },
  })

  const deleteEntry = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('journal_entries').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journalEntries'] })
    },
  })

  return {
    entries,
    isLoading,
    createEntry: createEntry.mutate,
    updateEntry: updateEntry.mutate,
    deleteEntry: deleteEntry.mutate,
    isCreating: createEntry.isPending,
    isUpdating: updateEntry.isPending,
    isDeleting: deleteEntry.isPending,
  }
}
