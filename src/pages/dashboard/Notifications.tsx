import DashboardShell from '@/components/layout/DashboardShell'
import EmptyState from '@/components/ui/EmptyState'
import { Bell } from 'lucide-react'

export default function Notifications() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-cobalt-900 dark:text-text-primary-dark">Notifications</h1>
        <EmptyState icon={Bell} title="Notifications" description="View your recent notifications." />
      </div>
    </DashboardShell>
  )
}
