import DashboardShell from '@/components/layout/DashboardShell'
import EmptyState from '@/components/ui/EmptyState'
import { Wifi } from 'lucide-react'

export default function OfflineSync() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-cobalt-900 dark:text-text-primary-dark">Offline Sync</h1>
        <EmptyState icon={Wifi} title="Offline Sync Center" description="Download content for offline learning." />
      </div>
    </DashboardShell>
  )
}
