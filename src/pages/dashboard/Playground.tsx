import DashboardShell from '@/components/layout/DashboardShell'
import EmptyState from '@/components/ui/EmptyState'
import { Code } from 'lucide-react'

export default function Playground() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-cobalt-900 dark:text-text-primary-dark">Code Playground</h1>
        <EmptyState icon={Code} title="Code Playground" description="Practice coding with our interactive editor." />
      </div>
    </DashboardShell>
  )
}
