import { cn } from '@/lib/utils'
import { WifiOff } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface OfflineBannerProps {
  className?: string
}

export default function OfflineBanner({ className }: OfflineBannerProps) {
  const [isOffline, setIsOffline] = useState(!navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!isOffline) return null

  return (
    <div
      className={cn(
        'fixed top-16 left-0 right-0 z-50 bg-amber-50 border-b border-amber-200 px-4 py-3 dark:bg-amber-900/30 dark:border-amber-800',
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <WifiOff className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <p className="text-sm text-amber-900 dark:text-amber-300">
            You're offline. Some features may be limited.
          </p>
        </div>
        <Link
          to="/offline"
          className="text-sm font-medium text-amber-900 hover:text-amber-700 dark:text-amber-300 dark:hover:text-amber-200"
        >
          View Offline Content
        </Link>
      </div>
    </div>
  )
}
