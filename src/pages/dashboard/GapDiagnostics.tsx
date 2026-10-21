import DashboardShell from '@/components/layout/DashboardShell'
import EmptyState from '@/components/ui/EmptyState'
import { AlertTriangle } from 'lucide-react'

export default function GapDiagnostics() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-cobalt-900 dark:text-text-primary-dark">Gap Diagnostics</h1>
        <EmptyState icon={AlertTriangle} title="Knowledge Gaps" description="Identify and address your learning gaps." />
      </div>
    </DashboardShell>
  )
}
