import DashboardShell from '@/components/layout/DashboardShell'
import EmptyState from '@/components/ui/EmptyState'
import { TreeDeciduous } from 'lucide-react'

export default function SkillTree() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-cobalt-900 dark:text-text-primary-dark">Skill Tree</h1>
        <EmptyState icon={TreeDeciduous} title="Skill Tree" description="Track your progress through various subjects and topics." />
      </div>
    </DashboardShell>
  )
}
