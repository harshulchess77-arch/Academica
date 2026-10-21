import DashboardShell from '@/components/layout/DashboardShell'
import EmptyState from '@/components/ui/EmptyState'
import { Timer } from 'lucide-react'

export default function FocusTimer() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-cobalt-900 dark:text-text-primary-dark">Focus Timer</h1>
        <EmptyState icon={Timer} title="Pomodoro Timer" description="Stay focused with timed study sessions." />
      </div>
    </DashboardShell>
  )
}
