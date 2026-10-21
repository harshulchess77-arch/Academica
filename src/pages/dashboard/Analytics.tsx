import DashboardShell from '@/components/layout/DashboardShell'
import EmptyState from '@/components/ui/EmptyState'
import { BarChart3 } from 'lucide-react'

export default function Analytics() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-cobalt-900 dark:text-text-primary-dark">Analytics</h1>
        <EmptyState icon={BarChart3} title="Analytics Dashboard" description="View your learning progress and performance metrics." />
      </div>
    </DashboardShell>
  )
}
