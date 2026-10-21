import DashboardShell from '@/components/layout/DashboardShell'
import EmptyState from '@/components/ui/EmptyState'
import { Settings } from 'lucide-react'

export default function Accessibility() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-cobalt-900 dark:text-text-primary-dark">Accessibility Suite</h1>
        <EmptyState icon={Settings} title="Accessibility Settings" description="Customize your learning experience." />
      </div>
    </DashboardShell>
  )
}
