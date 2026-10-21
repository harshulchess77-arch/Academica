import DashboardShell from '@/components/layout/DashboardShell'
import EmptyState from '@/components/ui/EmptyState'
import { Mic } from 'lucide-react'

export default function VoicePractice() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-cobalt-900 dark:text-text-primary-dark">Voice Practice</h1>
        <EmptyState icon={Mic} title="Voice Practice" description="Practice pronunciation and verbal skills." />
      </div>
    </DashboardShell>
  )
}
