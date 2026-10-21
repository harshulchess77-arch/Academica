import { WifiOff } from 'lucide-react'
import EmptyState from '@/components/ui/EmptyState'

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-canvas dark:bg-cobalt-ink flex items-center justify-center p-4">
      <EmptyState
        icon={WifiOff}
        title="You're Offline"
        description="Some features may be limited. Check your connection and try again."
        actionLabel="Retry"
        onAction={() => window.location.reload()}
      />
    </div>
  )
}
