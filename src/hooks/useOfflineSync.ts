import { useState, useEffect } from 'react'

interface SyncItem {
  id: string
  type: 'journal' | 'quiz' | 'pomodoro'
  data: any
  timestamp: number
}

export function useOfflineSync() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [pendingSync, setPendingSync] = useState<SyncItem[]>([])

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Load pending sync from IndexedDB
    loadPendingSync()

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const loadPendingSync = async () => {
    // In a real implementation, this would load from IndexedDB
    const stored = localStorage.getItem('academica-sync-queue')
    if (stored) {
      setPendingSync(JSON.parse(stored))
    }
  }

  const addToSyncQueue = (item: Omit<SyncItem, 'id' | 'timestamp'>) => {
    const syncItem: SyncItem = {
      ...item,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    }
    const updated = [...pendingSync, syncItem]
    setPendingSync(updated)
    localStorage.setItem('academica-sync-queue', JSON.stringify(updated))
  }

  const flushSyncQueue = async () => {
    if (!isOnline || pendingSync.length === 0) return

    // In a real implementation, this would sync to Supabase
    console.log('Flushing sync queue:', pendingSync.length, 'items')
    setPendingSync([])
    localStorage.removeItem('academica-sync-queue')
  }

  return {
    isOnline,
    pendingSync,
    addToSyncQueue,
    flushSyncQueue,
  }
}
