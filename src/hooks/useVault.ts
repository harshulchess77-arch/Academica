import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { authStore } from '@/store'
import { Database } from '@/types'

type VaultItem = Database['public']['Tables']['vault_items']['Row']
type UserInventory = Database['public']['Tables']['user_inventory']['Row']

export function useVault() {
  const { profile } = authStore()
  const queryClient = useQueryClient()

  const { data: vaultItems, isLoading: itemsLoading } = useQuery({
    queryKey: ['vaultItems'],
    queryFn: async () => {
      const { data, error } = await supabase.from('vault_items').select('*')
      if (error) throw error
      return data as VaultItem[]
    },
  })

  const { data: inventory, isLoading: inventoryLoading } = useQuery({
    queryKey: ['userInventory', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return []
      const { data, error } = await supabase
        .from('user_inventory')
        .select('*, vault_items(*)')
        .eq('user_id', profile.id)
      if (error) throw error
      return data as (UserInventory & { vault_items: VaultItem })[]
    },
    enabled: !!profile?.id,
  })

  const purchaseItem = useMutation({
    mutationFn: async (itemId: string) => {
      if (!profile?.id) throw new Error('No user logged in')
      // In production, this would call a SECURITY DEFINER RPC
      const { data, error } = await supabase.rpc('purchase_vault_item', {
        p_user_id: profile.id,
        p_item_id: itemId,
      })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInventory'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  return {
    vaultItems,
    inventory,
    isLoading: itemsLoading || inventoryLoading,
    purchaseItem: purchaseItem.mutate,
    isPurchasing: purchaseItem.isPending,
  }
}
