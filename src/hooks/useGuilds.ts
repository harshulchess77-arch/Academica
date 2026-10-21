import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Guild, GuildMember, GuildMessage } from '../types';

export const useGuilds = () => {
  return useQuery({
    queryKey: ['guilds'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const [guildsData, membershipsData] = await Promise.all([
        supabase.from('guilds').select('*').order('member_count', { ascending: false }),
        supabase.from('guild_members').select('*').eq('user_id', user.id),
      ]);

      if (guildsData.error) throw guildsData.error;
      if (membershipsData.error) throw membershipsData.error;

      const guilds = guildsData.data as Guild[];
      const memberships = membershipsData.data as GuildMember[];

      return {
        allGuilds: guilds,
        myGuilds: guilds.filter((g) => memberships.some((m) => m.guild_id === g.id)),
        memberships,
      };
    },
  });
};

export const useJoinGuild = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (guildId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('guild_members')
        .insert({
          guild_id: guildId,
          user_id: user.id,
          role: 'member',
          joined_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guilds'] });
    },
  });
};

export const useLeaveGuild = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (guildId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('guild_members')
        .delete()
        .eq('guild_id', guildId)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guilds'] });
    },
  });
};

export const useGuildMessages = (guildId: string) => {
  return useQuery({
    queryKey: ['guild-messages', guildId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('guild_messages')
        .select('*, profiles(display_name, avatar_url)')
        .eq('guild_id', guildId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as GuildMessage[];
    },
    enabled: !!guildId,
  });
};

export const useSendGuildMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ guildId, content }: { guildId: string; content: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('guild_messages')
        .insert({
          guild_id: guildId,
          user_id: user.id,
          content,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, { guildId }) => {
      queryClient.invalidateQueries({ queryKey: ['guild-messages', guildId] });
    },
  });
};
