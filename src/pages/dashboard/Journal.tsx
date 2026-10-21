import DashboardShell from '@/components/layout/DashboardShell'
import EmptyState from '@/components/ui/EmptyState'
import { BookOpen } from 'lucide-react'

export default function Journal() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-cobalt-900 dark:text-text-primary-dark">Learning Journal</h1>
        <EmptyState icon={BookOpen} title="Journal" description="Reflect on your learning journey." />
      </div>
    </DashboardShell>
  )
}
