import DashboardShell from '@/components/layout/DashboardShell'
import EmptyState from '@/components/ui/EmptyState'
import { Users } from 'lucide-react'

export default function Guilds() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-cobalt-900 dark:text-text-primary-dark">Learning Guilds</h1>
        <EmptyState icon={Users} title="Guilds" description="Join communities and learn together." />
      </div>
    </DashboardShell>
  )
}
