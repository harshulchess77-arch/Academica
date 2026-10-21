import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import type { Notification } from '@/types'

interface NotificationState {
  unreadCount: number
  notifications: Notification[]
  markRead: (id: string) => Promise<void>
  markAllRead: () => Promise<void>
  subscribe: (userId: string) => () => void
  refresh: (userId: string) => Promise<void>
  setNotifications: (notifications: Notification[]) => void
  setUnreadCount: (count: number) => void
}

export const notificationStore = create<NotificationState>((set, get) => ({
  unreadCount: 0,
  notifications: [],

  setNotifications: (notifications: Notification[]) => set({ notifications }),
  setUnreadCount: (count: number) => set({ unreadCount: count }),

  markRead: async (id) => {
    await supabase.from('notifications').update({ read: true }).eq('id', id)
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }))
  },

  markAllRead: async () => {
    const { notifications } = get()
    const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id)
    if (unreadIds.length === 0) return

    await supabase.from('notifications').update({ read: true }).in('id', unreadIds)
    set({
      notifications: notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })
  },

  subscribe: (userId) => {
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        async (payload) => {
          if (payload.eventType === 'INSERT') {
            const newNotification = payload.new as Notification
            set((state) => ({
              notifications: [newNotification, ...state.notifications],
              unreadCount: state.unreadCount + 1,
            }))
          } else if (payload.eventType === 'UPDATE') {
            set((state) => ({
              notifications: state.notifications.map((n) =>
                n.id === payload.new.id ? { ...n, ...payload.new } : n
              ),
            }))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  },

  refresh: async (userId) => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50)

    if (!error && data) {
      const unreadCount = data.filter((n) => !n.read).length
      set({ notifications: data as Notification[], unreadCount })
    }
  },
}))
