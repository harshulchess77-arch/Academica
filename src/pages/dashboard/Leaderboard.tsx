import DashboardShell from '@/components/layout/DashboardShell'
import EmptyState from '@/components/ui/EmptyState'
import { Award } from 'lucide-react'

export default function Leaderboard() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-cobalt-900 dark:text-text-primary-dark">Leaderboard</h1>
        <EmptyState icon={Award} title="Leaderboard" description="See how you rank among other learners." />
      </div>
    </DashboardShell>
  )
}
