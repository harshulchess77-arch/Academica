import { useEffect, useState } from 'react';
import type { OfflineAction } from '../types';

const OFFLINE_QUEUE_KEY = 'academica-offline-queue';

export const useOfflineSync = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [queue, setQueue] = useState<OfflineAction[]>([]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load queue from localStorage
    const savedQueue = localStorage.getItem(OFFLINE_QUEUE_KEY);
    if (savedQueue) {
      try {
        setQueue(JSON.parse(savedQueue));
      } catch {
        setQueue([]);
      }
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const addToQueue = (action: OfflineAction) => {
    const newQueue = [...queue, action];
    setQueue(newQueue);
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(newQueue));
  };

  const syncQueue = async () => {
    if (!isOnline || queue.length === 0) return;

    for (const action of queue) {
      try {
        // Sync based on action type
        if (action.type === 'journal_entry') {
          // Sync journal entry
        } else if (action.type === 'pomodoro_session') {
          // Sync pomodoro session
        } else if (action.type === 'quiz_attempt') {
          // Sync quiz attempt
        }
      } catch (error) {
        console.error('Sync failed for action:', action, error);
      }
    }

    // Clear synced items
    setQueue([]);
    localStorage.removeItem(OFFLINE_QUEUE_KEY);
  };

  return {
    isOnline,
    queue,
    addToQueue,
    syncQueue,
    queueCount: queue.length,
  };
};
