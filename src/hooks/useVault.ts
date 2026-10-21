import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { VaultItem, UserInventory } from '../types';

export const useVaultItems = () => {
  return useQuery({
    queryKey: ['vault-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vault_items')
        .select('*')
        .order('cost_xp', { ascending: true });

      if (error) throw error;
      return data as VaultItem[];
    },
  });
};

export const useUserInventory = () => {
  return useQuery({
    queryKey: ['user-inventory'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('user_inventory')
        .select('*, vault_items(*)')
        .eq('user_id', user.id);

      if (error) throw error;
      return data as UserInventory[];
    },
  });
};

export const usePurchaseItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string) => {
      const { data, error } = await supabase.rpc('purchase_vault_item', {
        p_item_id: itemId,
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-inventory'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

export const useEquipItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (inventoryId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Unequip all items of the same type first
      const { data: inventory } = await supabase
        .from('user_inventory')
        .select('*, vault_items(*)')
        .eq('id', inventoryId)
        .single();

      if (!inventory) throw new Error('Item not found');

      const itemType = (inventory as any).vault_items?.item_type;
      if (!itemType) throw new Error('Invalid item');

      const { data: sameTypeItems } = await supabase
        .from('vault_items')
        .select('id')
        .eq('item_type', itemType);

      if (sameTypeItems && sameTypeItems.length > 0) {
        await supabase
          .from('user_inventory')
          .update({ equipped: false })
          .eq('user_id', user.id)
          .in('item_id', sameTypeItems.map((i) => i.id));
      }

      // Equip the selected item
      const { data, error } = await supabase
        .from('user_inventory')
        .update({ equipped: true })
        .eq('id', inventoryId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-inventory'] });
    },
  });
};
