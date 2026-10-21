import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { authStore } from '@/store'
import { notificationStore } from '@/store'
import { Notification } from '@/types'

export function useNotifications() {
  const { profile } = authStore()
  const { setNotifications, setUnreadCount } = notificationStore()

  useEffect(() => {
    if (!profile?.id) return

    // Load initial notifications
    supabase
      .from('notifications')
      .select('*')
      .eq('user_id', profile.id)
      .order('created_at', { ascending: false })
      .limit(20)
      .then(({ data }) => {
        if (data) {
          setNotifications(data as Notification[])
          setUnreadCount(data.filter((n: any) => !n.read).length)
        }
      })

    // Subscribe to new notifications
    const channel = supabase
      .channel(`notifications:${profile.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${profile.id}`,
        },
        (payload) => {
          const newNotification = payload.new as Notification
          setNotifications((prev) => [newNotification, ...prev])
          setUnreadCount((prev) => prev + 1)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [profile?.id, setNotifications, setUnreadCount])
}
